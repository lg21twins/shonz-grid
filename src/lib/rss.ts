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

function decodeXmlEntities(str: string): string {
  return str
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/gi, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    );
}

function extractThumbnail(itemXml: string): string {
  const mediaContent = itemXml.match(/<media:content[^>]+url="([^"]+)"/);
  if (mediaContent) return decodeXmlEntities(mediaContent[1]);

  const mediaThumb = itemXml.match(/<media:thumbnail[^>]+url="([^"]+)"/);
  if (mediaThumb) return decodeXmlEntities(mediaThumb[1]);

  const enclosure =
    itemXml.match(/<enclosure[^>]+url="([^"]+)"[^>]+type="image/)?.[1] ??
    itemXml.match(/<enclosure[^>]+type="image[^"]*"[^>]+url="([^"]+)"/)?.[1];
  if (enclosure) return decodeXmlEntities(enclosure);

  const imgSrc = itemXml.match(
    /src="(https?:\/\/[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i,
  );
  if (imgSrc) return decodeXmlEntities(imgSrc[1]);

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

    const reader = res.body?.getReader();
    if (!reader) return "";

    let html = "";
    while (html.length < 50_000) {
      const { done, value } = await reader.read();
      if (done) break;
      html += new TextDecoder().decode(value);
    }
    reader.cancel();

    // Try og:image, then twitter:image
    const ogImage =
      html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/)?.[1] ??
      html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/)?.[1] ??
      html.match(/<meta[^>]+name="og:image"[^>]+content="([^"]+)"/)?.[1] ??
      html.match(/<meta[^>]+name="twitter:image"[^>]+content="([^"]+)"/)?.[1] ??
      html.match(/<meta[^>]+content="([^"]+)"[^>]+name="twitter:image"/)?.[1] ??
      "";

    return ogImage;
  } catch {
    return "";
  }
}

/* ── Fetch Formula1.com article thumbnails from listing page ── */

async function fetchF1ComThumbnails(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const res = await fetch("https://www.formula1.com/en/latest/all", {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return map;
    const html = await res.text();

    // Extract image+link pairs: image appears before article href
    const pattern = /https:\/\/media\.formula1\.com\/image\/upload\/[^"]+|href="(\/en\/latest\/article\/[^"]+)"/g;
    let lastImage = "";
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const full = match[0];
      if (full.startsWith("https://media.formula1.com")) {
        // Skip small driver/logo images (w_48, w_64)
        if (!full.includes("/w_48/") && !full.includes("/w_64/") && !full.includes(",w_48") && !full.includes(",w_64")) {
          lastImage = full;
        }
      } else if (match[1] && lastImage) {
        // Article link — pair with last image, upgrade to larger size
        const articlePath = match[1];
        const fullUrl = `https://www.formula1.com${articlePath}`;
        const largeImage = lastImage.replace(/c_fill,w_\d+/, "c_fill,w_960");
        map.set(fullUrl, largeImage);
        lastImage = "";
      }
    }
  } catch {
    // ignore
  }
  return map;
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

  // Fetch Formula1.com listing page thumbnails (SPA — no og:image in article pages)
  const f1Thumbs = await fetchF1ComThumbnails();
  for (const item of allItems) {
    if (!item.thumbnailUrl && f1Thumbs.has(item.link)) {
      item.thumbnailUrl = f1Thumbs.get(item.link)!;
    }
  }

  // Fetch og:image for remaining items without thumbnails (non-F1.com sources)
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
