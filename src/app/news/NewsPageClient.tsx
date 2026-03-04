"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { TabBar } from "@/components/layout/TabBar";
import { Footer } from "@/components/layout/Footer";
import { NextGPArticles } from "@/components/news/NextGPArticles";
import { useScrollRestore } from "@/hooks/useScrollRestore";

/* ── Types ── */
export type NewsItem = {
  slug: string;
  cat: string;
  catLabel: string;
  title: string;
  desc: string;
  time: string;
  source: string;
  thumbnail: string;
};

export type TechArticle = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
};

type Category = "all" | "daily" | "tech" | "race" | "driver" | "card";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "daily", label: "데일리 브리핑" },
  { id: "tech", label: "기술 해설" },
  { id: "race", label: "레이스 위켄드" },
  { id: "driver", label: "드라이버 & 팀" },
  { id: "card", label: "카드뉴스" },
];

const GRADIENTS = [
  "from-[#1a1a2e] to-[#e94560]",
  "from-[#0f3460] to-[#533483]",
  "from-[#1a472a] to-[#2d6a4f]",
  "from-[#162447] to-[#1f4068]",
  "from-[#4a1942] to-[#6c3483]",
  "from-[#FF8000] to-[#e67300]",
  "from-[#1F3D2C] to-[#2d5a3f]",
  "from-[#333] to-[#666]",
];

interface Props {
  featured: {
    slug: string;
    category: string;
    title: string;
    description: string;
    source: string;
    time: string;
    thumbnail: string;
  };
  techFeatured: TechArticle | null;
  techMore: TechArticle[];
  newsItems: NewsItem[];
  gpData: {
    flag: string;
    gp: string;
    fullDate: string;
    articles: { slug: string; title: string; source: string; date: string; thumbnail: string }[];
  };
  snsClips: { id: string; title: string; platform: string; handle: string; url: string; thumbnail: string }[];
}

export function NewsPageClient({ featured, techFeatured, techMore, newsItems, gpData, snsClips }: Props) {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("cat") as Category) || "all";
  const [activeCat, setActiveCat] = useState<Category>(initialCat);
  const [search, setSearch] = useState("");
  const saveScroll = useScrollRestore("news-scroll");

  const filtered = newsItems
    .filter((n) => activeCat === "all" || n.cat === activeCat)
    .filter(
      (n) =>
        !search ||
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.desc.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <div className="min-h-screen bg-bg2">
      <Navbar />

      <main className="mx-auto max-w-[960px] px-5 max-md:px-3.5 pt-5 max-md:pt-3.5 pb-20 md:pb-5 flex flex-col gap-3 max-md:gap-2.5">
        {/* Page Title */}
        <div className="px-0.5 pt-1">
          <h1 className="text-[24px] font-black text-t1">뉴스</h1>
          <p className="text-[13px] text-t3 mt-0.5">F1 최신 소식과 분석</p>
        </div>

        {/* 1. FEATURED NEWS */}
        <Link href={`/news/${featured.slug}`} onClick={saveScroll}>
          <section className="bg-card rounded-[16px] max-md:rounded-[14px] overflow-hidden">
            {featured.thumbnail ? (
              <img
                src={featured.thumbnail}
                alt={featured.title}
                className="w-full aspect-[5/2] max-md:aspect-[2/1] object-cover"
              />
            ) : (
              <div className="w-full aspect-[5/2] max-md:aspect-[2/1] bg-gradient-to-br from-[#1a1a2e] to-[#e94560]" />
            )}
            <div className="p-5 max-md:p-4">
              <span className="inline-block text-[11px] font-bold px-2.5 py-[3px] rounded-[6px] bg-f1-red-bg text-f1-red mb-2">
                {featured.category}
              </span>
              <h2 className="text-[18px] max-md:text-[16px] font-extrabold text-t1 leading-[1.35] mb-2">
                {featured.title}
              </h2>
              <p className="text-[14px] max-md:text-[13px] text-t2 leading-[1.4] mb-2.5">
                {featured.description}
              </p>
              <p className="text-[12px] text-t4">
                {featured.time} · {featured.source}
              </p>
            </div>
          </section>
        </Link>

        {/* GP ARTICLE COLLECTION */}
        <NextGPArticles {...gpData} />

        {/* 2. TECH ANALYSIS */}
        {(techFeatured || techMore.length > 0) && (
          <section className="bg-card rounded-[16px] max-md:rounded-[14px] overflow-hidden">
            <div className="flex items-center justify-between p-5 max-md:p-4 pb-0 max-md:pb-0">
              <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">기술 해설</h2>
            </div>

            {techFeatured && (
              <Link href={`/news/${techFeatured.slug}`} onClick={saveScroll}>
                <div className="px-5 max-md:px-4 pt-4">
                  <div className="rounded-[12px] overflow-hidden">
                    {techFeatured.thumbnail ? (
                      <img
                        src={techFeatured.thumbnail}
                        alt={techFeatured.title}
                        className="w-full aspect-[16/9] object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-[16/9] bg-gradient-to-br from-[#1a1a3e] to-[#2d2d5e]" />
                    )}
                  </div>
                  <h3 className="text-[16px] max-md:text-[15px] font-bold text-t1 leading-[1.3] mt-3 mb-1">
                    {techFeatured.title}
                  </h3>
                  <p className="text-[14px] text-t2 leading-[1.4] line-clamp-2">
                    {techFeatured.description}
                  </p>
                </div>
              </Link>
            )}

            {techMore.length > 0 && (
              <div className="px-5 max-md:px-4 pt-3 pb-5 max-md:pb-4">
                {techMore.map((item, i) => (
                  <Link key={item.slug} href={`/news/${item.slug}`} onClick={saveScroll}>
                    <div
                      className={`flex gap-3 py-3.5 ${i === 0 && techFeatured ? "border-t border-bdr pt-3.5" : ""} ${i < techMore.length - 1 ? "border-b border-bdr" : "pb-0"}`}
                    >
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-20 h-[60px] shrink-0 rounded-[8px] object-cover"
                        />
                      ) : (
                        <div className="w-20 h-[60px] shrink-0 rounded-[8px] bg-gradient-to-br from-[#333] to-[#555]" />
                      )}
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <p className="text-[14px] font-semibold text-t1 leading-[1.3]">{item.title}</p>
                        <p className="text-[12px] text-t3 mt-0.5 truncate">{item.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* SNS HOT CLIP */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">SNS 핫클립</h2>
            <a
              href="https://www.instagram.com/shonz_mag"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-t3"
            >
              전체 보기 ›
            </a>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-5 px-5 max-md:-mx-4 max-md:px-4 scrollbar-hide">
            {(snsClips.length > 0
              ? snsClips.map((clip) => ({
                  key: clip.id,
                  platform: clip.platform,
                  handle: clip.handle,
                  title: clip.title,
                  url: clip.url,
                  thumbnail: clip.thumbnail,
                }))
              : [
                  { key: "ig-shonz", platform: "Instagram", handle: "@shonz_mag", title: "SHONZ MAG 공식 인스타그램", url: "https://www.instagram.com/shonz_mag", thumbnail: "" },
                  { key: "ig-f1", platform: "Instagram", handle: "@f1", title: "Formula 1 공식 인스타그램", url: "https://www.instagram.com/f1", thumbnail: "" },
                  { key: "x-f1", platform: "X", handle: "@F1", title: "Formula 1 공식 X", url: "https://x.com/F1", thumbnail: "" },
                  { key: "yt-f1", platform: "YouTube", handle: "Formula 1", title: "Formula 1 공식 유튜브", url: "https://www.youtube.com/@Formula1", thumbnail: "" },
                  { key: "tt-f1", platform: "TikTok", handle: "@f1", title: "Formula 1 공식 틱톡", url: "https://www.tiktok.com/@f1", thumbnail: "" },
                ]
            ).map((clip) => (
              <a
                key={clip.key}
                href={clip.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-40 max-md:w-[140px] bg-bg2 rounded-[12px] overflow-hidden hover:-translate-y-0.5 transition-transform"
              >
                {clip.thumbnail ? (
                  <img
                    src={clip.thumbnail}
                    alt={clip.title}
                    className="w-full aspect-square object-cover"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-[#222] to-[#444] flex items-center justify-center">
                    <span className="text-[24px] text-t3">
                      {clip.platform === "YouTube" ? "▶" : clip.platform === "TikTok" ? "♪" : "📸"}
                    </span>
                  </div>
                )}
                <div className="p-2 px-2.5">
                  <p className="text-[10px] font-semibold text-t3 mb-0.5">{clip.platform} · {clip.handle}</p>
                  <p className="text-[12px] font-semibold text-t1 leading-[1.3] line-clamp-2">{clip.title}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 3. LATEST NEWS */}
        <section id="latest" className="scroll-mt-[72px] max-md:scroll-mt-[64px] bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">
              최신 뉴스
            </h2>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-t4"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="기사 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-[10px] bg-bg2 text-[13px] text-t1 placeholder:text-t4 outline-none focus:ring-1 focus:ring-bdr2 transition-shadow"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`shrink-0 px-[18px] py-2 rounded-[8px] text-[13px] font-semibold transition-colors ${
                  activeCat === c.id
                    ? "bg-t1 text-card"
                    : "bg-bg2 text-t3 hover:text-t1"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* News List */}
          <div className="md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-4">
            {filtered.map((news, i) => (
              <Link key={i} href={`/news/${news.slug}`} onClick={saveScroll}>
                <div className="flex gap-3 py-3.5 max-md:border-b max-md:border-bdr max-md:last:border-b-0 max-md:last:pb-0">
                  {news.thumbnail ? (
                    <img
                      src={news.thumbnail}
                      alt={news.title}
                      className="w-[88px] max-md:w-[76px] h-[66px] max-md:h-[57px] shrink-0 rounded-[8px] object-cover"
                    />
                  ) : (
                    <div
                      className={`w-[88px] max-md:w-[76px] h-[66px] max-md:h-[57px] shrink-0 rounded-[8px] bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}
                    />
                  )}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <p className="text-[11px] font-semibold text-t3 mb-0.5">
                      {news.catLabel} · {news.time}
                      <span className="hidden md:inline">
                        {" "}
                        · {news.source}
                      </span>
                    </p>
                    <p className="text-[14px] max-md:text-[13px] font-semibold text-t1 leading-[1.3] mb-0.5">
                      {news.title}
                    </p>
                    <p className="text-[12px] text-t3 truncate">{news.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center pt-4">
            <button className="inline-block px-8 py-3 rounded-[12px] border border-bdr text-[14px] font-semibold text-t3 hover:text-t1 hover:border-t3 transition-colors">
              더 보기
            </button>
          </div>
        </section>

        <Footer />
      </main>

      <TabBar />
    </div>
  );
}
