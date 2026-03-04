import { Suspense } from "react";
import { getArticles, getArticlesByKeywords, getSnsClips, type Article } from "@/lib/notion";
import { getNextRace } from "@/data/f1-2026";
import { RACE_KEYWORDS } from "@/data/race-keywords";
import { NewsPageClient, type NewsItem, type TechArticle } from "./NewsPageClient";

/* ── Dummy fallback data (used when Notion is not configured) ── */
const DUMMY_FEATURED = {
  slug: "preseason-test-bahrain-2026",
  category: "속보",
  title: "2026 프리시즌 테스트, 바레인 3일간 확정",
  description:
    "FIA가 2026 시즌 프리시즌 테스트 일정을 공식 발표. 새 레귤레이션 첫 주행이 시작된다.",
  source: "SHONZ GRID",
  time: "2시간 전",
  thumbnail: "",
};

const DUMMY_TECH: TechArticle[] = [];

const DUMMY_NEWS: NewsItem[] = [
  { slug: "australia-gp-preview", cat: "race", catLabel: "레이스 위켄드", title: "호주 GP 프리뷰: 알버트 파크 서킷", desc: "시즌 개막전 멜버른 서킷 분석", time: "8시간 전", source: "Formula1.com", thumbnail: "" },
  { slug: "norris-defending-champion", cat: "driver", catLabel: "드라이버 & 팀", title: "노리스, 챔피언의 첫 시즌 각오", desc: "맥라렌 란도 노리스 디펜딩", time: "10시간 전", source: "Motorsport.com", thumbnail: "" },
  { slug: "cadillac-f1-first-season", cat: "daily", catLabel: "데일리 브리핑", title: "카딜락 F1, 첫 시즌 목표는 '학습'", desc: "11번째 팀 합류 카딜락", time: "1일 전", source: "Autosport", thumbnail: "" },
  { slug: "pirelli-2026-compound", cat: "daily", catLabel: "데일리 브리핑", title: "피렐리, 2026 타이어 컴파운드 변경", desc: "새 규정 맞춤 타이어 라인업", time: "1일 전", source: "RaceFans", thumbnail: "" },
];

const CAT_MAP: Record<string, string> = {
  "데일리 브리핑": "daily",
  "기술 해설": "tech",
  "레이스 위켄드": "race",
  "드라이버 & 팀": "driver",
  "카드뉴스": "card",
};

function articleToNewsItem(a: Article): NewsItem {
  const catId = CAT_MAP[a.category] ?? "daily";
  return {
    slug: a.slug,
    cat: catId,
    catLabel: a.category,
    title: a.title,
    desc: a.description,
    time: a.date,
    source: a.source,
    thumbnail: a.thumbnail,
  };
}

export const revalidate = 300;

export default async function NewsPage() {
  const nextRace = getNextRace();
  const raceKeywords = RACE_KEYWORDS[nextRace.round] ?? [];

  const [articles, techArticles, gpArticlesRaw, snsClipsRaw] = await Promise.all([
    getArticles(),
    getArticles("기술 해설", 3),
    getArticlesByKeywords(raceKeywords, 4),
    getSnsClips(10),
  ]);

  const gpData = {
    flag: nextRace.flag,
    gp: nextRace.gp,
    fullDate: nextRace.fullDate,
    articles: gpArticlesRaw.map((a) => ({
      slug: a.slug,
      title: a.title,
      source: a.source,
      date: a.date,
      thumbnail: a.thumbnail,
    })),
  };

  // Tech articles — exclude featured to avoid duplication
  const featuredSlug = articles[1]?.slug;
  const techFiltered = techArticles.filter((a) => a.slug !== featuredSlug);
  const techFeatured = techFiltered[0]
    ? { slug: techFiltered[0].slug, title: techFiltered[0].title, description: techFiltered[0].description, thumbnail: techFiltered[0].thumbnail }
    : null;
  const techMore = techFiltered.slice(1, 3).map((a) => ({
    slug: a.slug, title: a.title, description: a.description, thumbnail: a.thumbnail,
  }));

  if (articles.length > 1) {
    const featured = {
      slug: articles[1].slug,
      category: articles[1].category,
      title: articles[1].title,
      description: articles[1].description,
      source: articles[1].source,
      time: articles[1].date,
      thumbnail: articles[1].thumbnail,
    };
    const newsItems = [articles[0], ...articles.slice(2)].map(articleToNewsItem);

    return (
      <Suspense>
        <NewsPageClient
          featured={featured}
          techFeatured={techFeatured}
          techMore={techMore}
          newsItems={newsItems}
          gpData={gpData}
          snsClips={snsClipsRaw}
        />
      </Suspense>
    );
  }

  return (
    <Suspense>
      <NewsPageClient
        featured={DUMMY_FEATURED}
        techFeatured={null}
        techMore={DUMMY_TECH}
        newsItems={DUMMY_NEWS}
        gpData={gpData}
        snsClips={snsClipsRaw}
      />
    </Suspense>
  );
}
