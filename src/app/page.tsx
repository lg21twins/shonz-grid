"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { TabBar } from "@/components/layout/TabBar";
import { Footer } from "@/components/layout/Footer";
import {
  DRIVERS,
  CONSTRUCTORS,
  TEAM_COLORS,
  getNextRace,
} from "@/data/f1-2026";

type RankTab = "drivers" | "constructors";

export default function Home() {
  const [rankTab, setRankTab] = useState<RankTab>("drivers");
  const nextRace = getNextRace();

  const top5Drivers = DRIVERS.slice(0, 5);
  const top5Constructors = CONSTRUCTORS.slice(0, 5);

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
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] overflow-hidden">
          <div className="w-full aspect-[16/9] bg-gradient-to-br from-[#333] to-[#555]" />
          <div className="p-5 max-md:p-4">
            <p className="text-[11px] text-t4 mb-2">@f1 · Instagram</p>
            <h2 className="text-[17px] max-md:text-[16px] font-extrabold text-t1 leading-[1.3] mb-2">
              2026 프리시즌 테스트, 바레인에서 시작
            </h2>
            <p className="text-[14px] text-t2 leading-[1.4] mb-3 line-clamp-2">
              새로운 레귤레이션 시대의 첫 공식 테스트가 바레인에서 시작된다. 11개 팀이 모두 참가하는 이번 테스트는...
            </p>
            <p className="text-[12px] text-t4">Motorsport.com · 2시간 전</p>
          </div>
        </section>

        {/* 2. DAILY BRIEFING */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">데일리 브리핑</h2>
            <span className="text-[13px] font-medium text-t3 cursor-pointer">전체 보기 ›</span>
          </div>
          {[
            { cat: "데일리 브리핑", title: "카딜락 F1, 2026 시즌 진입 준비 순조", desc: "11번째 팀으로 합류하는 카딜락의..." },
            { cat: "드라이버 & 팀", title: "해밀턴, 페라리 첫 시트핏 완료", desc: "7회 월드 챔피언이 마라넬로에서..." },
            { cat: "데일리 브리핑", title: "피렐리, 2026 타이어 컴파운드 변경 발표", desc: "새로운 규정에 맞춘 타이어..." },
            { cat: "레이스 위켄드", title: "호주 GP 프리뷰: 알버트 파크 서킷", desc: "시즌 개막전이 열리는 멜버른..." },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-3 py-3.5 border-b border-bdr first:pt-0 last:border-b-0 last:pb-0"
            >
              <div className="w-20 h-[60px] shrink-0 rounded-[8px] bg-gradient-to-br from-[#333] to-[#555]" />
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <p className="text-[11px] font-semibold text-t3 mb-0.5">[{item.cat}]</p>
                <p className="text-[14px] font-semibold text-t1 leading-[1.3]">{item.title}</p>
                <p className="text-[12px] text-t3 mt-0.5 truncate">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 3. RACE WEEKEND SCHEDULE */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <h2 className="text-[16px] max-md:text-[15px] font-extrabold text-t1 mb-0.5">
                {nextRace.gp}
              </h2>
              <p className="text-[13px] text-t3">
                {nextRace.circuit} · {nextRace.city}
              </p>
            </div>
            <span className="font-display text-[14px] font-extrabold text-f1-red">D-14</span>
          </div>
          {[
            { day: "금", session: "프리 프랙티스 1", time: "12:30" },
            { day: "금", session: "프리 프랙티스 2", time: "16:00" },
            { day: "토", session: "프리 프랙티스 3", time: "12:30" },
            { day: "토", session: "예선", time: "16:00" },
            { day: "일", session: "결승", time: "15:00" },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center py-2.5 border-b border-bdr last:border-b-0 last:pb-0"
            >
              <span className="text-[12px] font-semibold text-t3 w-11 shrink-0">{s.day}</span>
              <span className="text-[14px] font-semibold text-t1 flex-1">{s.session}</span>
              <span className="font-display text-[13px] font-semibold text-t2">
                {s.time} <span className="text-[11px] text-t3 font-normal">KST</span>
              </span>
            </div>
          ))}
        </section>

        {/* 4. TECH ANALYSIS — Featured */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] overflow-hidden">
          <div className="w-full aspect-[16/9] bg-gradient-to-br from-[#1a1a3e] to-[#2d2d5e]" />
          <div className="p-5 max-md:p-4">
            <span className="inline-block text-[11px] font-semibold px-2 py-[3px] rounded-[6px] bg-[rgba(49,130,246,0.1)] text-f1-blue mb-2">
              기술 해설
            </span>
            <h3 className="text-[16px] max-md:text-[15px] font-bold text-t1 leading-[1.3] mb-2">
              2026 액티브 에어로 해설: F1의 미래
            </h3>
            <p className="text-[14px] text-t2 leading-[1.4] line-clamp-2">
              2026년부터 도입되는 액티브 에어로다이나믹스는 F1 역사상 가장 큰 기술적 변화다...
            </p>
          </div>
        </section>

        {/* 4b. TECH — More articles */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">기술 해설</h2>
            <span className="text-[13px] font-medium text-t3 cursor-pointer">전체 보기 ›</span>
          </div>
          {[
            { title: "2026 파워유닛 해부: 전기 출력의 시대", desc: "MGU-H 삭제, 전기 모터 강화로..." },
            { title: "그라운드 이펙트 vs 액티브 에어로 비교", desc: "2022~2025 규정과 2026 규정의..." },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-3 py-3.5 border-b border-bdr first:pt-0 last:border-b-0 last:pb-0"
            >
              <div className="w-20 h-[60px] shrink-0 rounded-[8px] bg-gradient-to-br from-[#333] to-[#555]" />
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <p className="text-[11px] font-semibold text-t3 mb-0.5">[기술 해설]</p>
                <p className="text-[14px] font-semibold text-t1 leading-[1.3]">{item.title}</p>
                <p className="text-[12px] text-t3 mt-0.5 truncate">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 5. SNS HOT CLIP */}
        <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">SNS 핫클립</h2>
            <span className="text-[13px] font-medium text-t3 cursor-pointer">전체 보기 ›</span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-5 px-5 max-md:-mx-4 max-md:px-4 scrollbar-hide">
            {[
              { platform: "Instagram · @shonzmag", title: "2026 프리시즌 테스트 하이라이트 총정리", meta: "1.2만 좋아요 · 1시간 전" },
              { platform: "Instagram · @f1", title: "노리스, MCL61 첫 시운전 비하인드", meta: "24만 좋아요 · 3시간 전" },
              { platform: "X · @ScuderiaFerrari", title: "해밀턴 페라리 슈트 핏팅 현장", meta: "18만 좋아요 · 5시간 전" },
              { platform: "YouTube · F1", title: "2026 규정 설명: 90초 요약", meta: "52만 조회 · 1일 전" },
              { platform: "TikTok · @f1", title: "카딜락 F1 팀 공장 최초 공개", meta: "89만 조회 · 2일 전" },
            ].map((clip, i) => (
              <div
                key={i}
                className="shrink-0 w-40 max-md:w-[140px] bg-bg2 rounded-[12px] overflow-hidden cursor-pointer hover:-translate-y-0.5 transition-transform"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-[#222] to-[#444] relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 rounded-full flex items-center justify-center text-white text-[14px]">
                    ▶
                  </div>
                </div>
                <div className="p-2 px-2.5">
                  <p className="text-[10px] font-semibold text-t3 mb-0.5">{clip.platform}</p>
                  <p className="text-[12px] font-semibold text-t1 leading-[1.3] line-clamp-2">{clip.title}</p>
                  <p className="text-[10px] text-t4 mt-0.5">{clip.meta}</p>
                </div>
              </div>
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
            top5Drivers.map((d) => (
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
                  style={{ background: TEAM_COLORS[d.teamId] }}
                />
                <img
                  src={d.imageUrl}
                  alt={d.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 bg-bg2"
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
            top5Constructors.map((c) => (
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
                  style={{ background: TEAM_COLORS[c.teamId] }}
                />
                <img
                  src={c.logoUrl}
                  alt={c.name}
                  className="w-8 h-8 rounded-[6px] object-contain shrink-0 bg-bg2 p-0.5"
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
