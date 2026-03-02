"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { TabBar } from "@/components/layout/TabBar";
import { Footer } from "@/components/layout/Footer";
import { NextGPArticles } from "@/components/news/NextGPArticles";

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
  editorPicks: {
    slug: string;
    cat: string;
    title: string;
    meta: string;
    thumbnail: string;
  }[];
  newsItems: NewsItem[];
  gpData: {
    flag: string;
    gp: string;
    fullDate: string;
    articles: { slug: string; title: string; source: string; date: string; thumbnail: string }[];
  };
}

export function NewsPageClient({ featured, editorPicks, newsItems, gpData }: Props) {
  const [activeCat, setActiveCat] = useState<Category>("all");
  const [search, setSearch] = useState("");

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
        {/* 1. FEATURED NEWS */}
        <Link href={`/news/${featured.slug}`}>
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

        {/* 2. EDITOR'S PICK */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
          <div className="mb-4">
            <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">
              에디터 픽
            </h2>
            <p className="text-[12px] text-t4 mt-0.5">오늘의 추천 기사</p>
          </div>
          <div className="grid grid-cols-2 gap-3 max-md:gap-2">
            {editorPicks.map((pick, i) => (
              <Link key={i} href={`/news/${pick.slug}`}>
                <div className="bg-bg2 rounded-[12px] overflow-hidden cursor-pointer hover:-translate-y-0.5 transition-transform">
                  {pick.thumbnail ? (
                    <img
                      src={pick.thumbnail}
                      alt={pick.title}
                      className="w-full aspect-[16/10] object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full aspect-[16/10] bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}
                    />
                  )}
                  <div className="p-2.5 max-md:p-2">
                    <p className="text-[11px] font-medium text-t4 mb-1">
                      {pick.cat}
                    </p>
                    <p className="text-[14px] max-md:text-[12px] font-bold text-t1 leading-[1.3] mb-1.5 max-md:mb-1 line-clamp-2">
                      {pick.title}
                    </p>
                    <p className="text-[11px] max-md:text-[10px] text-t4">
                      {pick.meta}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. LATEST NEWS */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
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
              <Link key={i} href={`/news/${news.slug}`}>
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
