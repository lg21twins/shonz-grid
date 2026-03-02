/* ── RSS Feed Fetcher & Parser ── */

export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  thumbnailUrl: string;
}

const RSS_FEEDS = [
  {
    url: "https://www.formula1.com/en/latest/all.xml",
    name: "Formula1.com",
  },
  {
    url: "https://www.motorsport.com/rss/f1/news/",
    name: "Motorsport.com",
  },
  {
    url: "https://www.racefans.net/feed/",
    name: "RaceFans",
  },
];

/* ── XML helpers ── */

function extractTag(xml: string, tag: string): string {
  // CDATA
  const cdata = xml.match(
    new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`),
  );
  if (cdata) return cdata[1].trim();

  // Regular
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? match[1].trim() : "";
}

function extractThumbnail(itemXml: string): string {
  const mediaContent = itemXml.match(/<media:content[^>]+url="([^"]+)"/);
  if (mediaContent) return mediaContent[1];

  const mediaThumb = itemXml.match(/<media:thumbnail[^>]+url="([^"]+)"/);
  if (mediaThumb) return mediaThumb[1];

  const enclosure =
    itemXml.match(/<enclosure[^>]+url="([^"]+)"[^>]+type="image/)?.[1] ??
    itemXml.match(/<enclosure[^>]+type="image[^"]*"[^>]+url="([^"]+)"/)?.[1];
  if (enclosure) return enclosure;

  const imgSrc = itemXml.match(
    /src="(https?:\/\/[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i,
  );
  if (imgSrc) return imgSrc[1];

  return "";
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ── Parse RSS XML ── */

function parseRSSXml(xml: string, sourceName: string): RSSItem[] {
  const items: RSSItem[] = [];
  const itemMatches = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;

  for (const itemXml of itemMatches) {
    const title = stripHtml(extractTag(itemXml, "title"));
    const link = extractTag(itemXml, "link");
    const rawDesc = extractTag(itemXml, "description");
    const description = stripHtml(rawDesc).slice(0, 200);
    const pubDate = extractTag(itemXml, "pubDate");
    const thumbnailUrl = extractThumbnail(itemXml);

    if (!title || !link) continue;

    // Skip items older than 48 hours
    if (pubDate) {
      const pubTime = new Date(pubDate).getTime();
      if (!isNaN(pubTime) && pubTime < cutoff) continue;
    }

    items.push({
      title,
      link: link.trim(),
      description,
      pubDate: pubDate
        ? new Date(pubDate).toISOString()
        : new Date().toISOString(),
      source: sourceName,
      thumbnailUrl,
    });
  }

  return items;
}

/* ── Fetch og:image from article page ── */

async function fetchOgImage(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      redirect: "follow",
    });
    clearTimeout(timeout);

    if (!res.ok) return "";

    // Only read first 15KB to find meta tags (avoid downloading full page)
    const reader = res.body?.getReader();
    if (!reader) return "";

    let html = "";
    while (html.length < 15_000) {
      const { done, value } = await reader.read();
      if (done) break;
      html += new TextDecoder().decode(value);
    }
    reader.cancel();

    const ogImage =
      html.match(
        /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/,
      )?.[1] ??
      html.match(
        /<meta[^>]+content="([^"]+)"[^>]+property="og:image"/,
      )?.[1] ??
      "";

    return ogImage;
  } catch {
    return "";
  }
}

/* ── Fetch all feeds ── */

export async function fetchAllFeeds(): Promise<RSSItem[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);

      try {
        const res = await fetch(feed.url, {
          signal: controller.signal,
          redirect: "follow",
        });
        if (!res.ok) return [];
        const xml = await res.text();
        return parseRSSXml(xml, feed.name);
      } finally {
        clearTimeout(timeout);
      }
    }),
  );

  const allItems: RSSItem[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    }
  }

  // Fetch og:image for items without thumbnails (in parallel, max 5 at a time)
  const needsImage = allItems.filter((item) => !item.thumbnailUrl);
  const batches = [];
  for (let i = 0; i < needsImage.length; i += 5) {
    batches.push(needsImage.slice(i, i + 5));
  }
  for (const batch of batches) {
    const ogResults = await Promise.allSettled(
      batch.map((item) => fetchOgImage(item.link)),
    );
    ogResults.forEach((result, idx) => {
      if (result.status === "fulfilled" && result.value) {
        batch[idx].thumbnailUrl = result.value;
      }
    });
  }

  // Sort by date, newest first
  allItems.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  );

  return allItems;
}
