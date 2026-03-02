import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  RichTextItemResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

/* ── Notion client ── */
const NOTION_TOKEN = process.env.NOTION_TOKEN ?? "";
const notion = new Client({ auth: NOTION_TOKEN });

const ARTICLES_DB = process.env.NOTION_ARTICLES_DB ?? "";

/* ── Direct REST helper (SDK dataSources.query uses wrong endpoint) ── */
async function queryDatabase(body: Record<string, unknown>) {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${ARTICLES_DB}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      next: { revalidate: 300 },
    },
  );
  if (!res.ok) return { results: [] };
  return res.json();
}

/* ── Types ── */
export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  source: string;
  sourceUrl: string;
  thumbnail: string;
  date: string;
  published: boolean;
}

export interface ArticleBlock {
  id: string;
  type: string;
  text?: string;
  url?: string;
  caption?: string;
}

/* ── Helpers ── */
function richTextToPlain(rt: RichTextItemResponse[]): string {
  return rt.map((t) => t.plain_text).join("");
}

function pageToArticle(page: PageObjectResponse): Article {
  const props = page.properties;

  const titleProp = props["제목"] ?? props["Title"] ?? props["Name"];
  const title =
    titleProp?.type === "title" ? richTextToPlain(titleProp.title) : "";

  const descProp = props["설명"] ?? props["Description"];
  const description =
    descProp?.type === "rich_text" ? richTextToPlain(descProp.rich_text) : "";

  const catProp = props["카테고리"] ?? props["Category"];
  const category =
    catProp?.type === "select" ? (catProp.select?.name ?? "뉴스") : "뉴스";

  const sourceProp = props["출처"] ?? props["Source"];
  const source =
    sourceProp?.type === "rich_text"
      ? richTextToPlain(sourceProp.rich_text)
      : "SHONZ GRID";

  const slugProp = props["슬러그"] ?? props["Slug"];
  const slug =
    slugProp?.type === "rich_text"
      ? richTextToPlain(slugProp.rich_text)
      : page.id;

  const thumbProp = props["썸네일"] ?? props["Thumbnail"];
  const thumbnail =
    thumbProp?.type === "url" ? (thumbProp.url ?? "") : "";

  const dateProp = props["날짜"] ?? props["Date"];
  const date =
    dateProp?.type === "date" ? (dateProp.date?.start ?? "") : "";

  const sourceUrlProp = props["원본URL"];
  const sourceUrl =
    sourceUrlProp?.type === "rich_text"
      ? richTextToPlain(sourceUrlProp.rich_text)
      : "";

  const pubProp = props["게시"] ?? props["Published"];
  const published =
    pubProp?.type === "checkbox" ? pubProp.checkbox : true;

  return {
    id: page.id,
    slug,
    title,
    description,
    category,
    source,
    sourceUrl,
    thumbnail,
    date,
    published,
  };
}

/* ── Fetch articles list ── */
export async function getArticles(
  category?: string,
  limit = 20,
): Promise<Article[]> {
  if (!ARTICLES_DB) return [];

  const response = await queryDatabase({
    filter: {
      and: [
        { property: "게시", checkbox: { equals: true } },
        ...(category && category !== "all"
          ? [{ property: "카테고리", select: { equals: category } }]
          : []),
      ],
    },
    sorts: [{ property: "날짜", direction: "descending" }],
    page_size: limit,
  });

  return (response.results as PageObjectResponse[])
    .filter((p) => "properties" in p)
    .map(pageToArticle);
}

/* ── Fetch single article by slug ── */
export async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  if (!ARTICLES_DB) return null;

  const response = await queryDatabase({
    filter: {
      and: [
        { property: "슬러그", rich_text: { equals: slug } },
        { property: "게시", checkbox: { equals: true } },
      ],
    },
    sorts: [{ property: "날짜", direction: "descending" }],
    page_size: 1,
  });

  const page = response.results[0];
  if (!page || !("properties" in page)) return null;
  return pageToArticle(page as PageObjectResponse);
}

/* ── Fetch articles by keywords (for GP article collection) ── */
export async function getArticlesByKeywords(
  keywords: string[],
  limit = 4,
): Promise<Article[]> {
  if (!ARTICLES_DB || keywords.length === 0) return [];

  const orFilters = keywords.flatMap((kw) => [
    { property: "제목", title: { contains: kw } },
    { property: "설명", rich_text: { contains: kw } },
  ]);

  const response = await queryDatabase({
    filter: {
      and: [
        { property: "게시", checkbox: { equals: true } },
        { or: orFilters },
      ],
    },
    sorts: [{ property: "날짜", direction: "descending" }],
    page_size: limit,
  });

  return (response.results as PageObjectResponse[])
    .filter((p) => "properties" in p)
    .map(pageToArticle);
}

/* ── Fetch article body blocks ── */
function blockToArticleBlock(block: BlockObjectResponse): ArticleBlock | null {
  switch (block.type) {
    case "paragraph":
      return {
        id: block.id,
        type: "paragraph",
        text: richTextToPlain(block.paragraph.rich_text),
      };
    case "heading_1":
      return {
        id: block.id,
        type: "heading_1",
        text: richTextToPlain(block.heading_1.rich_text),
      };
    case "heading_2":
      return {
        id: block.id,
        type: "heading_2",
        text: richTextToPlain(block.heading_2.rich_text),
      };
    case "heading_3":
      return {
        id: block.id,
        type: "heading_3",
        text: richTextToPlain(block.heading_3.rich_text),
      };
    case "bulleted_list_item":
      return {
        id: block.id,
        type: "bulleted_list_item",
        text: richTextToPlain(block.bulleted_list_item.rich_text),
      };
    case "numbered_list_item":
      return {
        id: block.id,
        type: "numbered_list_item",
        text: richTextToPlain(block.numbered_list_item.rich_text),
      };
    case "quote":
      return {
        id: block.id,
        type: "quote",
        text: richTextToPlain(block.quote.rich_text),
      };
    case "image": {
      const img = block.image;
      const url = img.type === "file" ? img.file.url : img.type === "external" ? img.external.url : "";
      const caption = img.caption ? richTextToPlain(img.caption) : "";
      return { id: block.id, type: "image", url, caption };
    }
    case "divider":
      return { id: block.id, type: "divider" };
    default:
      return null;
  }
}

export async function getArticleBlocks(
  pageId: string,
): Promise<ArticleBlock[]> {
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  return response.results
    .filter((b): b is BlockObjectResponse => "type" in b)
    .map(blockToArticleBlock)
    .filter((b): b is ArticleBlock => b !== null);
}

/* ── Get recent source URLs for deduplication ── */
export async function getRecentSourceUrls(): Promise<Set<string>> {
  if (!ARTICLES_DB) return new Set();

  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const response = await queryDatabase({
    filter: {
      property: "날짜",
      date: { on_or_after: threeDaysAgo },
    },
    page_size: 100,
  });

  const urls = new Set<string>();
  for (const page of response.results as PageObjectResponse[]) {
    if (!("properties" in page)) continue;
    // Check 원본URL first (new field), fallback to 출처 (legacy)
    const urlProp = page.properties["원본URL"] ?? page.properties["출처"];
    if (urlProp?.type === "rich_text") {
      const url = richTextToPlain(urlProp.rich_text);
      if (url.startsWith("http")) urls.add(url);
    }
  }
  return urls;
}

/* ── Create article in Notion ── */
export async function createArticle(article: {
  title: string;
  slug: string;
  description: string;
  category: string;
  source: string;
  sourceUrl?: string;
  thumbnail: string;
  date: string;
  published?: boolean;
}): Promise<string> {
  const response = await notion.pages.create({
    parent: { database_id: ARTICLES_DB },
    properties: {
      "제목": {
        title: [{ text: { content: article.title } }],
      },
      "슬러그": {
        rich_text: [{ text: { content: article.slug } }],
      },
      "설명": {
        rich_text: [{ text: { content: article.description } }],
      },
      "카테고리": {
        select: { name: article.category },
      },
      "출처": {
        rich_text: [{ text: { content: article.source } }],
      },
      "원본URL": {
        rich_text: [{ text: { content: article.sourceUrl ?? "" } }],
      },
      "썸네일": {
        url: article.thumbnail || null,
      },
      "날짜": {
        date: { start: article.date },
      },
      "게시": {
        checkbox: article.published ?? true,
      },
    },
  });

  return response.id;
}

/* ── Add body paragraphs to article page ── */
export async function addArticleBody(
  pageId: string,
  paragraphs: string[],
  sourceUrl?: string,
): Promise<void> {
  const children: Parameters<
    typeof notion.blocks.children.append
  >[0]["children"] = paragraphs.map((text) => ({
    object: "block" as const,
    type: "paragraph" as const,
    paragraph: {
      rich_text: [{ type: "text" as const, text: { content: text } }],
    },
  }));

  // Add source link at the end
  if (sourceUrl) {
    children.push({
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          { type: "text", text: { content: "원본 기사: " } },
          {
            type: "text",
            text: { content: sourceUrl, link: { url: sourceUrl } },
          },
        ],
      },
    });
  }

  await notion.blocks.children.append({
    block_id: pageId,
    children,
  });
}
