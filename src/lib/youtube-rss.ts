/* ── YouTube RSS Feed Fetcher ── */

export interface YouTubeVideo {
  videoId: string;
  title: string;
  channelName: string;
  url: string;
  thumbnail: string;
  published: string;
}

/** YouTube channels to track — add channel IDs here */
const YOUTUBE_CHANNELS = [
  { channelId: "UCB_qr75-ydFVKSF9Dmo6izg", name: "Formula 1" },
];

function extractTag(xml: string, tag: string): string {
  const open = `<${tag}`;
  const close = `</${tag}>`;
  const start = xml.indexOf(open);
  if (start === -1) return "";
  const contentStart = xml.indexOf(">", start) + 1;
  const end = xml.indexOf(close, contentStart);
  if (end === -1) return "";
  return xml.slice(contentStart, end).trim();
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const tagStart = xml.indexOf(`<${tag}`);
  if (tagStart === -1) return "";
  const tagEnd = xml.indexOf(">", tagStart);
  const tagStr = xml.slice(tagStart, tagEnd);
  const attrMatch = tagStr.match(new RegExp(`${attr}="([^"]*)"`));
  return attrMatch?.[1] ?? "";
}

function parseEntry(entryXml: string, channelName: string): YouTubeVideo | null {
  const videoId = extractAttr(entryXml, "yt:videoId", "");
  // yt:videoId is a self-contained tag, extract text content
  const vidId = extractTag(entryXml, "yt:videoId");
  if (!vidId) return null;

  const title = extractTag(entryXml, "title");
  const published = extractTag(entryXml, "published");

  return {
    videoId: vidId,
    title,
    channelName,
    url: `https://www.youtube.com/watch?v=${vidId}`,
    thumbnail: `https://i.ytimg.com/vi/${vidId}/hqdefault.jpg`,
    published,
  };
}

export async function fetchYouTubeFeeds(maxPerChannel = 5): Promise<YouTubeVideo[]> {
  const all: YouTubeVideo[] = [];

  for (const ch of YOUTUBE_CHANNELS) {
    try {
      const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${ch.channelId}`;
      const res = await fetch(feedUrl, { next: { revalidate: 0 } });
      if (!res.ok) continue;

      const xml = await res.text();

      // Split entries
      const entries: string[] = [];
      let cursor = 0;
      while (true) {
        const start = xml.indexOf("<entry>", cursor);
        if (start === -1) break;
        const end = xml.indexOf("</entry>", start);
        if (end === -1) break;
        entries.push(xml.slice(start, end + 8));
        cursor = end + 8;
      }

      for (const entry of entries.slice(0, maxPerChannel)) {
        const video = parseEntry(entry, ch.name);
        if (video) all.push(video);
      }
    } catch {
      // skip failed channel
    }
  }

  return all;
}
