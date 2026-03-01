import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  RichTextItemResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

/* ── Notion client ── */
const notion = new Client({ auth: process.env.NOTION_TOKEN });

const ARTICLES_DB = process.env.NOTION_ARTICLES_DB ?? "";

/* ── Types ── */
export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  source: string;
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

  const response = await notion.dataSources.query({
    data_source_id: ARTICLES_DB,
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

  return response.results
    .filter((p): p is PageObjectResponse => "properties" in p)
    .map(pageToArticle);
}

/* ── Fetch single article by slug ── */
export async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  if (!ARTICLES_DB) return null;

  const response = await notion.dataSources.query({
    data_source_id: ARTICLES_DB,
    filter: {
      and: [
        { property: "슬러그", rich_text: { equals: slug } },
        { property: "게시", checkbox: { equals: true } },
      ],
    },
    page_size: 1,
  });

  const page = response.results[0];
  if (!page || !("properties" in page)) return null;
  return pageToArticle(page as PageObjectResponse);
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
