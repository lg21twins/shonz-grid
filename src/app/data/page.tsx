"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { TabBar } from "@/components/layout/TabBar";
import { Footer } from "@/components/layout/Footer";
import {
  DRIVERS,
  CONSTRUCTORS,
  RACES,
  CIRCUITS,
  TEAM_COLORS,
  getNextRace,
  getNextCircuit,
} from "@/data/f1-2026";

type PageTab = "standings" | "calendar" | "circuits";
type RankTab = "drivers" | "constructors";

export default function DataPage() {
  const [pageTab, setPageTab] = useState<PageTab>("standings");
  const [rankTab, setRankTab] = useState<RankTab>("drivers");
  const [openCalItems, setOpenCalItems] = useState<Set<number>>(new Set());

  const nextRace = getNextRace();
  const nextCircuit = getNextCircuit();

  function toggleCalItem(round: number) {
    setOpenCalItems((prev) => {
      const next = new Set(prev);
      if (next.has(round)) next.delete(round);
      else next.add(round);
      return next;
    });
  }

  function posClass(pos: number) {
    if (pos === 1) return "text-f1-red";
    if (pos === 2) return "text-t2";
    if (pos === 3) return "text-f1-amber";
    return "text-t4";
  }

  return (
    <div className="min-h-screen bg-bg2">
      <Navbar />

      <main className="mx-auto max-w-[960px] px-3.5 md:px-5 pt-4 pb-20 md:pb-4 flex flex-col gap-2.5 md:gap-3">
        {/* Page Tabs */}
        <div className="bg-card rounded-[16px] p-3">
          <div className="flex flex-wrap gap-2">
            {(["standings", "calendar", "circuits"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setPageTab(tab)}
                className={`px-[18px] py-2 rounded-[8px] text-[13px] font-semibold transition-colors ${
                  pageTab === tab
                    ? "bg-t1 text-card"
                    : "bg-bg2 text-t3 hover:text-t1"
                }`}
              >
                {tab === "standings" ? "순위" : tab === "calendar" ? "캘린더" : "서킷"}
              </button>
            ))}
          </div>
        </div>

        {/* ===== TAB: STANDINGS ===== */}
        {pageTab === "standings" && (
          <div className="bg-card rounded-[16px] p-5 max-md:p-4">
            <div className="mb-4">
              <h1 className="text-[18px] font-extrabold text-t1">2026 시즌 순위</h1>
              <p className="text-[12px] text-t4 mt-0.5">시즌 시작 전 · 예상 순위</p>
            </div>

            {/* Rank Sub-tabs */}
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

            {/* Driver Standings */}
            {rankTab === "drivers" && (
              <div>
                {DRIVERS.map((d) => (
                  <div
                    key={d.pos}
                    className="flex items-center gap-3 py-3 border-b border-bdr last:border-b-0"
                  >
                    <span
                      className={`font-display font-black text-[16px] max-md:text-[14px] w-6 max-md:w-5 text-center shrink-0 ${posClass(d.pos)}`}
                    >
                      {d.pos}
                    </span>
                    <div
                      className="w-8 h-8 max-md:w-7 max-md:h-7 rounded-full shrink-0 bg-cover bg-top flex items-center justify-center text-[11px] max-md:text-[10px] font-bold text-white font-display"
                      style={{
                        backgroundColor: TEAM_COLORS[d.teamId],
                        backgroundImage: d.imageUrl
                          ? `url('${d.imageUrl}')`
                          : undefined,
                      }}
                    >
                      {!d.imageUrl &&
                        d.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                    </div>
                    <span className="flex-1 text-[14px] max-md:text-[13px] font-semibold text-t1">
                      {d.name}
                    </span>
                    <span className="text-[12px] max-md:text-[11px] text-t3 shrink-0">
                      {d.team}
                    </span>
                    <span className="font-display text-[14px] font-bold text-t2 w-8 text-right shrink-0">
                      {d.points ?? "—"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Constructor Standings */}
            {rankTab === "constructors" && (
              <div>
                {CONSTRUCTORS.map((c) => (
                  <div
                    key={c.pos}
                    className="flex items-center gap-3 py-3 border-b border-bdr last:border-b-0"
                  >
                    <span
                      className={`font-display font-black text-[16px] w-6 text-center shrink-0 ${posClass(c.pos)}`}
                    >
                      {c.pos}
                    </span>
                    <div
                      className="w-8 h-8 rounded-full shrink-0 bg-contain bg-center bg-no-repeat flex items-center justify-center text-[11px] font-bold text-white font-display"
                      style={{
                        backgroundColor: TEAM_COLORS[c.teamId],
                        backgroundImage: c.logoUrl
                          ? `url('${c.logoUrl}')`
                          : undefined,
                      }}
                    >
                      {!c.logoUrl && c.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="flex-1 text-[14px] font-semibold text-t1">
                      {c.name}
                    </span>
                    <span className="font-display text-[14px] font-bold text-t2 w-8 text-right shrink-0">
                      {c.points ?? "—"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== TAB: CALENDAR ===== */}
        {pageTab === "calendar" && (
          <>
            {/* Next Race Featured */}
            <div className="bg-card rounded-[16px] p-5 max-md:p-4">
              <div className="bg-bg2 rounded-[14px] p-5 max-md:p-4">
                <p className="text-[11px] font-bold text-f1-red uppercase tracking-wide mb-2">
                  다가오는 레이스 · Round {nextRace.round}
                </p>
                <h2 className="text-[20px] max-md:text-[18px] font-extrabold text-t1 mb-0.5">
                  {nextRace.gp}
                </h2>
                <p className="text-[13px] text-t3 mb-4">
                  {nextRace.circuit}, {nextRace.city} · {nextRace.fullDate}
                </p>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2">
                  {nextRace.sessions.map((s) => (
                    <div
                      key={s.session}
                      className={`flex justify-between items-center px-3 py-2.5 rounded-[10px] ${
                        s.isRace
                          ? "col-span-2 max-md:col-span-1 border border-f1-red bg-f1-red-bg"
                          : "bg-card"
                      }`}
                    >
                      <span
                        className={`text-[12px] font-semibold ${
                          s.isRace ? "text-f1-red font-bold" : "text-t2"
                        }`}
                      >
                        {s.session}
                      </span>
                      <span
                        className={`font-display text-[12px] font-bold ${
                          s.isRace ? "text-f1-red" : "text-t1"
                        }`}
                      >
                        {s.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Full Calendar */}
            <div className="bg-card rounded-[16px] p-5 max-md:p-4">
              <div className="mb-4">
                <h2 className="text-[18px] font-extrabold text-t1">전체 일정</h2>
                <p className="text-[12px] text-t4 mt-0.5">
                  전체 {RACES.length}전 · 탭하여 세부 일정 확인
                </p>
              </div>
              <div>
                {RACES.map((race) => {
                  const isOpen = openCalItems.has(race.round);
                  return (
                    <div
                      key={race.round}
                      className="border-b border-bdr last:border-b-0 cursor-pointer"
                      onClick={() => toggleCalItem(race.round)}
                    >
                      <div className="flex items-center gap-3 py-3.5">
                        <span
                          className={`font-display text-[12px] font-extrabold w-7 shrink-0 ${
                            isOpen ? "text-f1-red" : "text-t4"
                          }`}
                        >
                          R{race.round}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] max-md:text-[13px] font-bold text-t1">
                            {race.flag} {race.gp}
                          </p>
                          <p className="text-[12px] text-t3 mt-0.5">
                            {race.circuit}
                          </p>
                        </div>
                        <span className="font-display text-[12px] font-semibold text-t3 shrink-0">
                          {race.date}
                        </span>
                      </div>
                      {isOpen && (
                        <div className="pl-10 pb-3 text-[12px] text-t3 leading-[2]">
                          {race.sessions.map((s) => (
                            <div key={s.session}>
                              {s.session}: {s.time}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ===== TAB: CIRCUITS ===== */}
        {pageTab === "circuits" && (
          <>
            {/* Featured Circuit */}
            <div className="bg-card rounded-[16px] overflow-hidden">
              {nextCircuit.trackImageUrl && (
                <div
                  className="w-full aspect-[16/9] bg-contain bg-no-repeat bg-center bg-bg2 p-5"
                  style={{
                    backgroundImage: `url('${nextCircuit.trackImageUrl}')`,
                  }}
                />
              )}
              <div className="p-5 max-md:p-4">
                <p className="text-[11px] font-bold text-f1-red uppercase tracking-wide mb-2">
                  다가오는 레이스 서킷
                </p>
                <p className="text-[13px] font-bold text-f1-red mb-1">
                  Round {nextCircuit.round}
                </p>
                <h2 className="text-[20px] max-md:text-[18px] font-extrabold text-t1 mb-0.5">
                  {nextCircuit.gp}
                </h2>
                <p className="text-[13px] text-t3 mb-4">
                  {nextCircuit.name} · {RACES[0].city}
                </p>
                <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3 max-md:gap-2.5">
                  <div className="text-center">
                    <p className="font-display text-[18px] max-md:text-[16px] font-extrabold text-t1">
                      {nextCircuit.lengthKm} km
                    </p>
                    <p className="text-[10px] text-t4 mt-0.5">총 거리</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-[18px] max-md:text-[16px] font-extrabold text-t1">
                      {nextCircuit.laps} 랩
                    </p>
                    <p className="text-[10px] text-t4 mt-0.5">레이스 랩 수</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-[18px] max-md:text-[16px] font-extrabold text-t1">
                      {nextCircuit.corners}개
                    </p>
                    <p className="text-[10px] text-t4 mt-0.5">코너 수</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-[18px] max-md:text-[16px] font-extrabold text-t1">
                      {nextCircuit.lapRecord ?? "—"}
                    </p>
                    <p className="text-[10px] text-t4 mt-0.5">랩 레코드</p>
                  </div>
                </div>
              </div>
            </div>

            {/* All Circuits */}
            <div className="bg-card rounded-[16px] p-5 max-md:p-4">
              <div className="mb-4">
                <h2 className="text-[18px] font-extrabold text-t1">전체 서킷</h2>
                <p className="text-[12px] text-t4 mt-0.5">2026 시즌 주요 서킷</p>
              </div>
              <div>
                {CIRCUITS.map((cir) => (
                  <div
                    key={cir.round}
                    className="flex items-center gap-4 max-md:gap-3 py-3.5 border-b border-bdr last:border-b-0"
                  >
                    <span className="font-display text-[13px] font-extrabold text-f1-red min-w-[28px]">
                      R{cir.round}
                    </span>
                    <div className="min-w-0 w-[140px] max-md:w-auto max-md:flex-1 shrink-0">
                      <p className="text-[15px] max-md:text-[14px] font-bold text-t1">
                        {cir.country}
                      </p>
                      <p className="text-[12px] text-t3 mt-0.5 truncate">
                        {cir.name}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0 hidden md:block">
                      <p className="text-[13px] font-semibold text-t2 whitespace-nowrap">
                        {cir.gp}
                      </p>
                      <p className="text-[12px] text-t3 mt-0.5">{cir.fullDate}</p>
                    </div>
                    <div className="flex gap-3 max-md:gap-2.5 shrink-0">
                      <div className="text-right">
                        <p className="font-display text-[13px] max-md:text-[12px] font-bold text-t1">
                          {cir.lengthKm}
                        </p>
                        <p className="text-[10px] text-t4 mt-0.5">km</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-[13px] max-md:text-[12px] font-bold text-t1">
                          {cir.laps}
                        </p>
                        <p className="text-[10px] text-t4 mt-0.5">랩</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-[13px] max-md:text-[12px] font-bold text-t1">
                          {cir.corners}
                        </p>
                        <p className="text-[10px] text-t4 mt-0.5">코너</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Footer />
      </main>

      <TabBar />
    </div>
  );
}
