import { NextRequest, NextResponse } from "next/server";
import { fetchAllFeeds } from "@/lib/rss";
import { categorizeArticle } from "@/lib/categorize";
import { translateAndGenerate } from "@/lib/translate";
import {
  getRecentSourceUrls,
  createArticle,
  addArticleBody,
} from "@/lib/notion";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/-$/, "");
}

export async function GET(request: NextRequest) {
  // Verify Vercel Cron or manual trigger with secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Fetch RSS feeds (includes og:image extraction)
    const feedItems = await fetchAllFeeds();

    // 2. Get existing article URLs for deduplication (single query)
    const existingUrls = await getRecentSourceUrls();

    let created = 0;
    let skipped = 0;
    let errors = 0;
    const errorDetails: string[] = [];

    for (const item of feedItems) {
      try {
        // 3. Dedup check
        if (existingUrls.has(item.link)) {
          skipped++;
          continue;
        }

        // 4. Categorize
        const category = categorizeArticle(item.title, item.description);

        // 5. Translate + generate full Korean article
        const content = await translateAndGenerate(
          item.title,
          item.description,
          item.source,
        );

        // 6. Generate slug from English title
        const slug = generateSlug(item.title);

        // 7. Parse date
        const date = item.pubDate
          ? new Date(item.pubDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0];

        // 8. Create article page in Notion
        const pageId = await createArticle({
          title: content.title,
          slug,
          description: content.description,
          category,
          source: item.source,
          sourceUrl: item.link,
          thumbnail: item.thumbnailUrl,
          date,
          published: true,
        });

        // 9. Add body paragraphs + source link as blocks
        if (content.body.length > 0) {
          await addArticleBody(pageId, content.body, item.link);
        }

        // Mark as processed to avoid duplicates within same batch
        existingUrls.add(item.link);
        created++;

        // Small delay to respect Notion rate limits
        await new Promise((resolve) => setTimeout(resolve, 350));
      } catch (err) {
        errors++;
        const msg =
          err instanceof Error ? err.message : JSON.stringify(err);
        errorDetails.push(
          `${item.title.slice(0, 40)}: ${msg.slice(0, 100)}`,
        );
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        totalFeedItems: feedItems.length,
        created,
        skipped,
        errors,
        ...(errorDetails.length > 0 && {
          errorSamples: errorDetails.slice(0, 3),
        }),
      },
    });
  } catch (err) {
    console.error("Cron collect-news failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
