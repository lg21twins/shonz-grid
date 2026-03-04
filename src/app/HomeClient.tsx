"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { TabBar } from "@/components/layout/TabBar";
import { Footer } from "@/components/layout/Footer";
import { NextGPArticles } from "@/components/news/NextGPArticles";
import { useScrollRestore } from "@/hooks/useScrollRestore";
import type { Driver, Constructor, RaceSession } from "@/data/f1-2026";

/* ── Types ── */
interface HeadlineArticle {
  slug: string;
  title: string;
  description: string;
  source: string;
  date: string;
  thumbnail: string;
}

interface BriefingArticle {
  slug: string;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface TechArticle {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface GPData {
  flag: string;
  gp: string;
  fullDate: string;
  articles: { slug: string; title: string; source: string; date: string; thumbnail: string }[];
}

interface RaceSchedule {
  gp: string;
  circuit: string;
  city: string;
  daysUntil: number;
  sessions: RaceSession[];
}

interface SnsClip {
  id: string;
  title: string;
  platform: string;
  handle: string;
  url: string;
  thumbnail: string;
}

interface Props {
  headline: HeadlineArticle | null;
  briefing: BriefingArticle[];
  gpData: GPData;
  raceSchedule: RaceSchedule;
  techFeatured: TechArticle | null;
  techMore: TechArticle[];
  snsClips: SnsClip[];
  drivers: Driver[];
  constructors: Constructor[];
  teamColors: Record<string, string>;
}

type RankTab = "drivers" | "constructors";

export function HomeClient({
  headline,
  briefing,
  gpData,
  raceSchedule,
  techFeatured,
  techMore,
  snsClips,
  drivers,
  constructors,
  teamColors,
}: Props) {
  const [rankTab, setRankTab] = useState<RankTab>("drivers");
  const saveScroll = useScrollRestore("home-scroll");

  function posClass(pos: number) {
    if (pos === 1) return "text-f1-red";
    if (pos === 2) return "text-t2";
    if (pos === 3) return "text-f1-amber";
    return "text-t3";
  }

  return (
    <div className="min-h-screen bg-bg2">
      <Navbar />

      <main className="mx-auto max-w-[960px] px-5 max-md:px-3.5 pt-5 max-md:pt-3.5 pb-20 md:pb-5 flex flex-col gap-3 max-md:gap-2.5">
        {/* 1. HEADLINE */}
        {headline ? (
          <Link href={`/news/${headline.slug}`} onClick={saveScroll}>
            <section className="bg-card rounded-[16px] max-md:rounded-[14px] overflow-hidden">
              {headline.thumbnail ? (
                <img
                  src={headline.thumbnail}
                  alt={headline.title}
                  className="w-full aspect-[16/9] object-cover"
                />
              ) : (
                <div className="w-full aspect-[16/9] bg-gradient-to-br from-[#333] to-[#555]" />
              )}
              <div className="p-5 max-md:p-4">
                <h2 className="text-[18px] max-md:text-[16px] font-extrabold text-t1 leading-[1.3] mb-2">
                  {headline.title}
                </h2>
                <p className="text-[14px] text-t2 leading-[1.4] mb-3 line-clamp-2">
                  {headline.description}
                </p>
                <p className="text-[12px] text-t4">{headline.source} · {headline.date}</p>
              </div>
            </section>
          </Link>
        ) : (
          <section className="bg-card rounded-[16px] max-md:rounded-[14px] overflow-hidden">
            <div className="w-full aspect-[16/9] bg-gradient-to-br from-[#333] to-[#555]" />
            <div className="p-5 max-md:p-4">
              <h2 className="text-[18px] max-md:text-[16px] font-extrabold text-t1 leading-[1.3] mb-2">
                기사를 불러오는 중...
              </h2>
            </div>
          </section>
        )}

        {/* 2. DAILY BRIEFING */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">데일리 브리핑</h2>
            <Link href="/news#latest" className="text-[13px] font-medium text-t3">전체 보기 ›</Link>
          </div>
          {briefing.map((item, i) => (
            <Link key={item.slug} href={`/news/${item.slug}`} onClick={saveScroll}>
              <div
                className={`flex gap-3 py-3.5 ${i === 0 ? "pt-0" : ""} ${i < briefing.length - 1 ? "border-b border-bdr" : "pb-0"}`}
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
                  <p className="text-[11px] font-semibold text-t3 mb-0.5">[{item.category}]</p>
                  <p className="text-[14px] font-semibold text-t1 leading-[1.3]">{item.title}</p>
                  <p className="text-[12px] text-t3 mt-0.5 truncate">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* GP ARTICLE COLLECTION */}
        <NextGPArticles {...gpData} />

        {/* 3. RACE WEEKEND SCHEDULE */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1 mb-0.5">
                {raceSchedule.gp}
              </h2>
              <p className="text-[13px] text-t3">
                {raceSchedule.circuit} · {raceSchedule.city}
              </p>
            </div>
            <span className="font-display text-[14px] font-extrabold text-f1-red">
              D-{raceSchedule.daysUntil}
            </span>
          </div>
          {raceSchedule.sessions.map((s, i) => (
            <div
              key={i}
              className={`flex items-center py-2.5 ${i < raceSchedule.sessions.length - 1 ? "border-b border-bdr" : "pb-0"}`}
            >
              <span className="text-[14px] font-semibold text-t1 flex-1">{s.session}</span>
              <span className="font-display text-[13px] font-semibold text-t2">
                {s.time} <span className="text-[11px] text-t3 font-normal">KST</span>
              </span>
            </div>
          ))}
        </section>

        {/* 4. TECH ANALYSIS */}
        {(techFeatured || techMore.length > 0) && (
          <section className="bg-card rounded-[16px] max-md:rounded-[14px] overflow-hidden">
            <div className="flex items-center justify-between px-5 max-md:px-4 pt-5 max-md:pt-4">
              <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">기술 해설</h2>
              <Link href="/news?cat=tech" className="text-[13px] font-medium text-t3">전체 보기 ›</Link>
            </div>

            {/* Featured */}
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

            {/* More articles */}
            {techMore.length > 0 && (
              <div className="px-5 max-md:px-4 pt-3 pb-5 max-md:pb-4">
                {techMore.map((item, i) => (
                  <Link key={item.slug} href={`/news/${item.slug}`} onClick={saveScroll}>
                    <div
                      className={`flex gap-3 py-3.5 ${i === 0 ? "border-t border-bdr pt-3.5" : ""} ${i < techMore.length - 1 ? "border-b border-bdr" : "pb-0"}`}
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

        {/* 5. SNS HOT CLIP */}
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

        {/* 6. STANDINGS */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">순위</h2>
            <span className="text-[13px] font-medium text-t3 cursor-pointer">전체 보기 ›</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-bg2 rounded-[10px] p-[3px] mb-4">
            {(["drivers", "constructors"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setRankTab(tab)}
                className={`flex-1 text-center text-[13px] font-semibold py-2 px-3 rounded-[8px] transition-colors ${
                  rankTab === tab ? "bg-t1 text-card" : "text-t3"
                }`}
              >
                {tab === "drivers" ? "드라이버" : "컨스트럭터"}
              </button>
            ))}
          </div>

          {/* Driver standings */}
          {rankTab === "drivers" &&
            drivers.map((d) => (
              <div
                key={d.pos}
                className="flex items-center gap-2.5 py-[11px] border-b border-bdr last:border-b-0 last:pb-0"
              >
                <span
                  className={`font-display font-black text-[17px] w-[26px] text-center shrink-0 ${posClass(d.pos)}`}
                >
                  {d.pos}
                </span>
                <div
                  className="w-[3px] h-6 rounded-sm shrink-0"
                  style={{ background: teamColors[d.teamId] }}
                />
                <img
                  src={d.imageUrl}
                  alt={d.name}
                  className="w-8 h-8 rounded-full object-cover object-top shrink-0 bg-bg2"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-t1 mb-px">{d.name}</p>
                  <p className="text-[12px] text-t3">{d.team}</p>
                </div>
                <span className="font-display text-[14px] font-semibold text-t2 w-9 text-right shrink-0">
                  {d.points ?? "—"}
                </span>
              </div>
            ))}

          {/* Constructor standings */}
          {rankTab === "constructors" &&
            constructors.map((c) => (
              <div
                key={c.pos}
                className="flex items-center gap-2.5 py-[11px] border-b border-bdr last:border-b-0 last:pb-0"
              >
                <span
                  className={`font-display font-black text-[17px] w-[26px] text-center shrink-0 ${posClass(c.pos)}`}
                >
                  {c.pos}
                </span>
                <div
                  className="w-[3px] h-[18px] rounded-sm shrink-0"
                  style={{ background: teamColors[c.teamId] }}
                />
                <img
                  src={c.logoUrl ?? ""}
                  alt={c.name}
                  className="w-8 h-8 rounded-full shrink-0 object-contain bg-white p-1.5"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-t1">{c.name}</p>
                </div>
                <span className="font-display text-[14px] font-semibold text-t2 w-9 text-right shrink-0">
                  {c.points ?? "—"}
                </span>
              </div>
            ))}
        </section>

        <Footer />
      </main>

      <TabBar />
    </div>
  );
}
