"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { TabBar } from "@/components/layout/TabBar";
import { Footer } from "@/components/layout/Footer";

type Category = "all" | "daily" | "tech" | "race" | "driver" | "card";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "daily", label: "데일리 브리핑" },
  { id: "tech", label: "기술 해설" },
  { id: "race", label: "레이스 위켄드" },
  { id: "driver", label: "드라이버 & 팀" },
  { id: "card", label: "카드뉴스" },
];

const EDITOR_PICKS = [
  { cat: "기술 해설", title: "액티브 에어로 작동 원리", meta: "3시간 전 · Motorsport.com", gradient: "from-[#0f3460] to-[#533483]" },
  { cat: "드라이버 & 팀", title: "페라리, 해밀턴 합류 첫 사진", meta: "5시간 전 · Formula1.com", gradient: "from-[#1a472a] to-[#2d6a4f]" },
  { cat: "기술 해설", title: "PU 규정: 전기 출력 2배", meta: "12시간 전 · Autosport", gradient: "from-[#162447] to-[#1f4068]" },
  { cat: "카드뉴스", title: "2026 팀별 드라이버 라인업", meta: "1일 전 · SHONZ GRID", gradient: "from-[#4a1942] to-[#6c3483]" },
];

const NEWS_ITEMS: { cat: Category; catLabel: string; title: string; desc: string; time: string; source: string; gradient: string }[] = [
  { cat: "race", catLabel: "레이스 위켄드", title: "호주 GP 프리뷰: 알버트 파크 서킷", desc: "시즌 개막전 멜버른 서킷 분석", time: "8시간 전", source: "Formula1.com", gradient: "from-[#1a1a2e] to-[#e94560]" },
  { cat: "driver", catLabel: "드라이버 & 팀", title: "노리스, 챔피언의 첫 시즌 각오", desc: "맥라렌 란도 노리스 디펜딩", time: "10시간 전", source: "Motorsport.com", gradient: "from-[#FF8000] to-[#e67300]" },
  { cat: "daily", catLabel: "데일리 브리핑", title: "카딜락 F1, 첫 시즌 목표는 '학습'", desc: "11번째 팀 합류 카딜락", time: "1일 전", source: "Autosport", gradient: "from-[#1F3D2C] to-[#2d5a3f]" },
  { cat: "daily", catLabel: "데일리 브리핑", title: "피렐리, 2026 타이어 컴파운드 변경", desc: "새 규정 맞춤 타이어 라인업", time: "1일 전", source: "RaceFans", gradient: "from-[#333] to-[#666]" },
  { cat: "race", catLabel: "레이스 위켄드", title: "바레인 GP: 사키르의 밤", desc: "야간 레이스 바레인 서킷 정보", time: "2일 전", source: "PlanetF1", gradient: "from-[#1a1a2e] to-[#16213e]" },
  { cat: "card", catLabel: "카드뉴스", title: "인포그래픽: 2026 팀별 드라이버", desc: "11팀 22드라이버 한눈에", time: "2일 전", source: "SHONZ GRID", gradient: "from-[#4a1942] to-[#6c3483]" },
];

export default function NewsPage() {
  const [activeCat, setActiveCat] = useState<Category>("all");

  const filtered = activeCat === "all" ? NEWS_ITEMS : NEWS_ITEMS.filter((n) => n.cat === activeCat);

  return (
    <div className="min-h-screen bg-bg2">
      <Navbar />

      <main className="mx-auto max-w-[960px] px-5 max-md:px-3.5 pt-5 max-md:pt-3.5 pb-20 md:pb-5 flex flex-col gap-3 max-md:gap-2.5">
        {/* 1. FEATURED NEWS */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] overflow-hidden">
          <div className="w-full aspect-[5/2] max-md:aspect-[2/1] bg-gradient-to-br from-[#1a1a2e] to-[#e94560]" />
          <div className="p-5 max-md:p-4">
            <span className="inline-block text-[11px] font-bold px-2.5 py-[3px] rounded-[6px] bg-f1-red-bg text-f1-red mb-2">
              속보
            </span>
            <h2 className="text-[18px] max-md:text-[16px] font-extrabold text-t1 leading-[1.35] mb-2">
              2026 프리시즌 테스트, 바레인 3일간 확정
            </h2>
            <p className="text-[14px] max-md:text-[13px] text-t2 leading-[1.4] mb-2.5">
              FIA가 2026 시즌 프리시즌 테스트 일정을 공식 발표. 새 레귤레이션 첫 주행이 시작된다.
            </p>
            <p className="text-[12px] text-t4">2시간 전 · SHONZ GRID</p>
          </div>
        </section>

        {/* 2. EDITOR'S PICK */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
          <div className="mb-4">
            <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">에디터 픽</h2>
            <p className="text-[12px] text-t4 mt-0.5">오늘의 추천 기사</p>
          </div>
          <div className="grid grid-cols-2 gap-3 max-md:gap-2">
            {EDITOR_PICKS.map((pick, i) => (
              <div
                key={i}
                className="bg-bg2 rounded-[12px] overflow-hidden cursor-pointer hover:-translate-y-0.5 transition-transform"
              >
                <div className={`w-full aspect-[16/10] bg-gradient-to-br ${pick.gradient}`} />
                <div className="p-2.5 max-md:p-2">
                  <p className="text-[11px] font-medium text-t4 mb-1">{pick.cat}</p>
                  <p className="text-[14px] max-md:text-[12px] font-bold text-t1 leading-[1.3] mb-1.5 max-md:mb-1 line-clamp-2">
                    {pick.title}
                  </p>
                  <p className="text-[11px] max-md:text-[10px] text-t4">{pick.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. LATEST NEWS */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
          <div className="mb-4">
            <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">최신 뉴스</h2>
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
              <div
                key={i}
                className="flex gap-3 py-3.5 max-md:border-b max-md:border-bdr max-md:last:border-b-0 max-md:last:pb-0"
              >
                <div
                  className={`w-[88px] max-md:w-[76px] h-[66px] max-md:h-[57px] shrink-0 rounded-[8px] bg-gradient-to-br ${news.gradient}`}
                />
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <p className="text-[11px] font-semibold text-t3 mb-0.5">
                    {news.catLabel} · {news.time}
                    <span className="hidden md:inline"> · {news.source}</span>
                  </p>
                  <p className="text-[14px] max-md:text-[13px] font-semibold text-t1 leading-[1.3] mb-0.5">
                    {news.title}
                  </p>
                  <p className="text-[12px] text-t3 truncate">{news.desc}</p>
                </div>
              </div>
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
