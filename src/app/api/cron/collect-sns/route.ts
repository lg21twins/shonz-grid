import { NextRequest, NextResponse } from "next/server";
import { fetchYouTubeFeeds } from "@/lib/youtube-rss";
import { getRecentSnsUrls, createSnsClip } from "@/lib/notion";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Fetch YouTube RSS feeds
    const videos = await fetchYouTubeFeeds(5);

    // 2. Get existing URLs for deduplication
    const existingUrls = await getRecentSnsUrls();

    let created = 0;
    let skipped = 0;

    for (const video of videos) {
      if (existingUrls.has(video.url)) {
        skipped++;
        continue;
      }

      await createSnsClip({
        title: video.title,
        platform: "YouTube",
        handle: video.channelName,
        url: video.url,
        thumbnail: video.thumbnail,
        date: video.published
          ? new Date(video.published).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      });

      existingUrls.add(video.url);
      created++;

      // Respect Notion rate limits
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    return NextResponse.json({
      success: true,
      summary: { totalVideos: videos.length, created, skipped },
    });
  } catch (err) {
    console.error("Cron collect-sns failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
