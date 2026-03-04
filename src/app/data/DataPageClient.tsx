"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { TabBar } from "@/components/layout/TabBar";
import { Footer } from "@/components/layout/Footer";
import type { Driver, Constructor, Race, Circuit } from "@/data/f1-2026";
type PageTab = "standings" | "calendar" | "circuits";
type RankTab = "drivers" | "constructors";

interface Props {
  drivers: Driver[];
  constructors: Constructor[];
  races: Race[];
  circuits: Circuit[];
  teamColors: Record<string, string>;
  nextRaceRound: number;
  nextCircuitRound: number;
  standingsRound: number | null;
}

export function DataPageClient({
  drivers,
  constructors,
  races,
  circuits,
  teamColors,
  nextRaceRound,
  nextCircuitRound,
  standingsRound,
}: Props) {
  const [pageTab, setPageTab] = useState<PageTab>("standings");
  const [rankTab, setRankTab] = useState<RankTab>("drivers");
  const [openCalItems, setOpenCalItems] = useState<Set<number>>(new Set());
  const [selectedCircuitRound, setSelectedCircuitRound] = useState<number | null>(null);


  const nextRace = races.find((r) => r.round === nextRaceRound) ?? races[0];
  const nextCircuit = circuits.find((c) => c.round === nextCircuitRound) ?? circuits[0];

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
        {/* Page Title */}
        <div className="px-0.5 pt-1">
          <h1 className="text-[24px] font-black text-t1">데이터</h1>
          <p className="text-[13px] text-t3 mt-0.5">순위, 일정, 서킷 정보</p>
        </div>

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
              <p className="text-[12px] text-t4 mt-0.5">
                {standingsRound ? `Round ${standingsRound} 기준` : "시즌 시작 전 · 예상 순위"}
              </p>
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
                {/* Podium Top 3 — order: 2nd, 1st, 3rd */}
                <div className="grid grid-cols-3 max-md:grid-cols-3 gap-2.5 mb-4 items-end">
                  {[drivers[1], drivers[0], drivers[2]].filter(Boolean).map((d) => {
                    const tc = teamColors[d.teamId] ?? "#333";
                    const isFirst = d.pos === 1;
                    return (
                      <div
                        key={d.pos}
                        className={`relative overflow-hidden rounded-[14px] ${
                          isFirst ? "aspect-[3/4.2] max-md:aspect-[3/4.5]" : "aspect-[3/3.8] max-md:aspect-[3/4]"
                        }`}
                        style={{ backgroundColor: tc }}
                      >
                        {/* Gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                        {/* Driver image — full bleed */}
                        {d.imageUrl && (
                          <div
                            className="absolute inset-0 bg-cover bg-top"
                            style={{ backgroundImage: `url('${d.imageUrl}')` }}
                          />
                        )}

                        {/* Bottom gradient over image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                        {/* Bottom info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 max-md:p-2.5">
                          <span className="font-display font-black leading-none text-white/90 drop-shadow-lg text-[40px] max-md:text-[32px]">
                            {d.pos}
                          </span>
                          <p className="font-bold text-white truncate mt-1 text-[16px] max-md:text-[13px]">
                            {d.name}
                          </p>
                          <p className="text-[10px] max-md:text-[9px] text-white/60 mt-0.5">{d.team}</p>
                          <p className="font-display font-extrabold text-white mt-1.5 text-[18px] max-md:text-[15px]">
                            {d.points ?? "—"}
                            <span className="text-[10px] max-md:text-[9px] font-semibold text-white/50 ml-0.5">pt</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 4th onwards */}
                {drivers.slice(3).map((d) => (
                  <div
                    key={d.pos}
                    className="flex items-center gap-3 py-3 border-b border-bdr last:border-b-0"
                  >
                    <span
                      className="font-display font-black text-[16px] max-md:text-[14px] w-6 max-md:w-5 text-center shrink-0 text-t4"
                    >
                      {d.pos}
                    </span>
                    <div
                      className="w-8 h-8 max-md:w-7 max-md:h-7 rounded-full shrink-0 bg-cover bg-top flex items-center justify-center text-[11px] max-md:text-[10px] font-bold text-white font-display"
                      style={{
                        backgroundColor: teamColors[d.teamId],
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
                {/* Podium Top 3 — order: 2nd, 1st, 3rd */}
                <div className="grid grid-cols-3 max-md:grid-cols-3 gap-2.5 mb-4 items-end">
                  {[constructors[1], constructors[0], constructors[2]].filter(Boolean).map((c) => {
                    const tc = teamColors[c.teamId] ?? "#333";
                    const isFirst = c.pos === 1;
                    return (
                      <div
                        key={c.pos}
                        className={`relative overflow-hidden rounded-[14px] ${
                          isFirst ? "aspect-[3/4.2] max-md:aspect-[3/4.5]" : "aspect-[3/3.8] max-md:aspect-[3/4]"
                        }`}
                        style={{ backgroundColor: tc }}
                      >
                        {/* Car image — full bleed */}
                        {c.carImageUrl && (
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${c.carImageUrl}')` }}
                          />
                        )}

                        {/* Bottom gradient over image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                        {/* Position badge — top left */}
                        <span className="absolute top-2.5 left-2.5 max-md:top-2 max-md:left-2 font-display font-black leading-none text-white/90 text-[28px] max-md:text-[22px]">
                          {c.pos}
                        </span>

                        {/* Bottom info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 max-md:p-2.5">
                          {c.logoUrl && (
                            <img src={c.logoUrl} alt="" className="w-10 h-10 max-md:w-8 max-md:h-8 rounded-full object-contain bg-white p-[5px] max-md:p-1 mb-1.5 shadow-lg" />
                          )}
                          <p className="font-bold text-white truncate text-[16px] max-md:text-[13px]">
                            {c.name}
                          </p>
                          <p className="font-display font-extrabold text-white mt-1.5 text-[18px] max-md:text-[15px]">
                            {c.points ?? "—"}
                            <span className="text-[10px] max-md:text-[9px] font-semibold text-white/50 ml-0.5">pt</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 4th onwards */}
                {constructors.slice(3).map((c) => (
                  <div
                    key={c.pos}
                    className="flex items-center gap-3 py-3 border-b border-bdr last:border-b-0"
                  >
                    <span
                      className="font-display font-black text-[16px] w-6 text-center shrink-0 text-t4"
                    >
                      {c.pos}
                    </span>
                    <img
                      src={c.logoUrl ?? ""}
                      alt={c.name}
                      className="w-8 h-8 rounded-full shrink-0 object-contain bg-white p-1.5"
                    />
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
                  전체 {races.length}전 · 탭하여 세부 일정 확인
                </p>
              </div>
              <div>
                {races.map((race) => {
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
                            {race.gp}
                          </p>
                          <p className="text-[12px] text-t3 mt-0.5">
                            {race.circuit}
                          </p>
                        </div>
                        <span className="font-display text-[12px] font-semibold text-t3 shrink-0">
                          2026.{race.date}
                        </span>
                      </div>
                      {isOpen && (
                        <div className="pb-4 pl-10 max-md:pl-0">
                          <div className="bg-bg2 rounded-[12px] p-4 max-md:p-3.5">
                            <p className="text-[12px] text-t3 mb-3">
                              {race.circuit}, {race.city} · {race.fullDate}
                            </p>
                            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2">
                              {race.sessions.map((s) => (
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
            {/* Next Race Circuit (fixed) */}
            <div className="bg-card rounded-[16px] overflow-hidden">
              {nextCircuit.trackImageUrl && (
                <div
                  className="w-full aspect-[16/9] bg-contain bg-no-repeat bg-center bg-bg2 p-5"
                  style={{ backgroundImage: `url('${nextCircuit.trackImageUrl}')` }}
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
                  {nextCircuit.name} · {nextRace.city}
                </p>
                <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3 max-md:gap-2.5">
                  <div className="text-center">
                    <p className="font-display text-[18px] max-md:text-[16px] font-extrabold text-t1">{nextCircuit.lengthKm} km</p>
                    <p className="text-[10px] text-t4 mt-0.5">총 거리</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-[18px] max-md:text-[16px] font-extrabold text-t1">{nextCircuit.laps} 랩</p>
                    <p className="text-[10px] text-t4 mt-0.5">레이스 랩 수</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-[18px] max-md:text-[16px] font-extrabold text-t1">{nextCircuit.corners}개</p>
                    <p className="text-[10px] text-t4 mt-0.5">코너 수</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-[18px] max-md:text-[16px] font-extrabold text-t1">{nextCircuit.lapRecord ?? "—"}</p>
                    <p className="text-[10px] text-t4 mt-0.5">랩 레코드</p>
                  </div>
                </div>
              </div>
            </div>

            {/* All Circuits */}
            <div className="bg-card rounded-[16px] p-5 max-md:p-4">
              <div className="mb-4">
                <h2 className="text-[18px] font-extrabold text-t1">전체 서킷</h2>
                <p className="text-[12px] text-t4 mt-0.5">2026 시즌 주요 서킷 · 탭하여 상세 정보 확인</p>
              </div>
              <div>
                {circuits.map((cir) => {
                  const isOpen = selectedCircuitRound === cir.round;
                  const race = races.find((r) => r.round === cir.round);
                  return (
                    <div key={cir.round} className="border-b border-bdr last:border-b-0">
                      <div
                        onClick={() => setSelectedCircuitRound(isOpen ? null : cir.round)}
                        className="flex items-center gap-4 max-md:gap-3 py-3.5 cursor-pointer hover:bg-bg2 -mx-2 px-2 rounded-[8px] transition-colors"
                      >
                        <span className={`font-display text-[13px] font-extrabold min-w-[28px] ${isOpen ? "text-f1-red" : "text-t4"}`}>
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
                          <p className="text-[13px] font-semibold text-t2 whitespace-nowrap">{cir.gp}</p>
                          <p className="text-[12px] text-t3 mt-0.5">{cir.fullDate}</p>
                        </div>
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          className={`text-t4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>

                      {isOpen && (
                        <div className="pb-4 -mx-2 px-2">
                          <div className="bg-bg2 rounded-[12px] overflow-hidden">
                            {cir.trackImageUrl && (
                              <div
                                className="w-full aspect-[16/9] bg-contain bg-no-repeat bg-center p-4"
                                style={{ backgroundImage: `url('${cir.trackImageUrl}')` }}
                              />
                            )}
                            <div className="p-4">
                              <p className="text-[13px] text-t3 mb-3">
                                {cir.name} · {race?.city ?? cir.country} · {cir.fullDate}
                              </p>
                              <div className="grid grid-cols-4 gap-2">
                                <div className="text-center">
                                  <p className="font-display text-[15px] font-extrabold text-t1">{cir.lengthKm}</p>
                                  <p className="text-[10px] text-t4">km</p>
                                </div>
                                <div className="text-center">
                                  <p className="font-display text-[15px] font-extrabold text-t1">{cir.laps}</p>
                                  <p className="text-[10px] text-t4">랩</p>
                                </div>
                                <div className="text-center">
                                  <p className="font-display text-[15px] font-extrabold text-t1">{cir.corners}</p>
                                  <p className="text-[10px] text-t4">코너</p>
                                </div>
                                <div className="text-center">
                                  <p className="font-display text-[15px] font-extrabold text-t1">{cir.lapRecord ?? "—"}</p>
                                  <p className="text-[10px] text-t4">랩 레코드</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
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
