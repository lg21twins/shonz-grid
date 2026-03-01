"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { TabBar } from "@/components/layout/TabBar";
import { Footer } from "@/components/layout/Footer";

type GuideTab = "intro" | "dict";
type DictCat = "all" | "기술" | "전략" | "규정" | "일반" | "2026";

/* ===== Guide cards data ===== */
const GUIDE_CARDS = [
  {
    icon: "🏎️", iconBg: "bg-f1-red-bg", iconColor: "text-f1-red",
    title: "F1이란?", sub: "포뮬러 원 기본 소개",
    body: "F1(Formula 1)은 세계에서 가장 빠른 싱글 시터 오픈 휠 자동차로 경주하는 모터스포츠 최고봉입니다. 매년 3월부터 12월까지 전 세계 20개 이상의 서킷에서 열리며, 10~11개 팀(컨스트럭터)이 각 2명의 드라이버를 출전시켜 드라이버 챔피언십과 컨스트럭터 챔피언십을 동시에 다툽니다.",
  },
  {
    icon: "📅", iconBg: "bg-[rgba(49,130,246,0.1)]", iconColor: "text-f1-blue",
    title: "레이스 위켄드", sub: "금·토·일 일정 구조",
    body: "일반적인 레이스 위켄드는 3일간 진행됩니다.\n\n금요일: 프리 프랙티스 1 (FP1) / 프리 프랙티스 2 (FP2)\n토요일: 프리 프랙티스 3 (FP3) / 예선 (Qualifying)\n일요일: 결승 (Race)\n\n스프린트 주말에는 금요일에 스프린트 예선, 토요일에 스프린트 레이스가 추가됩니다.",
  },
  {
    icon: "🏆", iconBg: "bg-[rgba(245,166,35,0.08)]", iconColor: "text-f1-amber",
    title: "포인트 시스템", sub: "순위별 획득 포인트",
    body: "결승 포인트: 1위 25점 / 2위 18점 / 3위 15점 / 4위 12점 / 5위 10점 / 6위 8점 / 7위 6점 / 8위 4점 / 9위 2점 / 10위 1점\n\n추가로 패스티스트 랩(최속 랩)을 기록한 드라이버가 10위 이내 완주 시 +1점을 받습니다.\n\n스프린트 레이스: 1위 8점 / 2위 7점 / ... / 8위 1점",
  },
  {
    icon: "🔴", iconBg: "bg-f1-red-bg", iconColor: "text-f1-red",
    title: "타이어 전략", sub: "컴파운드 종류와 전략",
    body: "F1에서는 피렐리가 독점 공급하는 5종의 타이어를 사용합니다.",
    tires: [
      { color: "#FF0000", name: "소프트", desc: "가장 빠른 그립, 짧은 수명 (15~25랩)" },
      { color: "#F5A623", name: "미디엄", desc: "균형 잡힌 성능과 내구성 (25~35랩)" },
      { color: "#FFFFFF", name: "하드", desc: "느리지만 가장 긴 수명 (35~50랩)", textColor: "#191F28" },
      { color: "#34C759", name: "인터미디어", desc: "약한 비에 사용하는 젖은 노면용" },
      { color: "#3182F6", name: "웻", desc: "폭우 시 사용, 가장 많은 배수 홈" },
    ],
  },
  {
    icon: "⚡", iconBg: "bg-[rgba(49,130,246,0.1)]", iconColor: "text-f1-blue",
    title: "2026 새 규정", sub: "2026년 기술 규정 변경 사항",
    body: "2026 시즌부터 F1에 대대적인 기술 규정 변화가 적용됩니다.\n\n• 액티브 에어로다이나믹스 도입 (가변 공력 장치)\n• 전기 모터 출력 대폭 강화 (ICE:EV = 50:50)\n• MGU-H 삭제, 단순화된 파워유닛\n• 지속가능 연료 100% 사용\n• 차량 경량화 (최소 중량 감소)\n• 새로운 오버테이크 모드 추가",
  },
  {
    icon: "🚩", iconBg: "bg-[rgba(52,199,89,0.08)]", iconColor: "text-f1-green",
    title: "깃발 시스템", sub: "F1 깃발의 의미",
    body: "F1에서 사용하는 주요 깃발들입니다.",
    flags: [
      { color: "#34C759", name: "그린 플래그", desc: "트랙 클리어. 주행 시작 또는 위험 해제를 알림" },
      { color: "#F5A623", name: "옐로 플래그", desc: "전방 위험. 감속 필수, 추월 금지. 더블 옐로는 정지 준비" },
      { color: "#E10600", name: "레드 플래그", desc: "세션 중단. 심각한 사고나 악천후 시 즉시 정지" },
      { color: "#3182F6", name: "블루 플래그", desc: "랩 다운 차량에게 빠른 차를 양보하라는 신호" },
      { color: "#191F28", name: "블랙 플래그", desc: "해당 드라이버 실격. 즉시 피트로 복귀해야 함" },
      { color: "#FFFFFF", name: "체커기", desc: "세션 종료. 결승에서 가장 먼저 받는 드라이버가 우승", textColor: "#191F28", border: true },
    ],
  },
  {
    icon: "👥", iconBg: "bg-[rgba(100,100,100,0.08)]", iconColor: "text-t2",
    title: "2026 팀 & 드라이버", sub: "11개 팀, 22명의 드라이버",
    body: "2026 시즌에는 사상 처음 11개 팀이 참가합니다.\n\nMcLaren: 노리스 / 피아스트리\nRed Bull: 베르스타펜 / 하자르\nFerrari: 르클레르 / 해밀턴\nMercedes: 러셀 / 안토넬리\nAston Martin: 알론소 / 스트롤\nWilliams: 사인츠 / 알본\nAlpine: 가슬리 / 콜라핀토\nHaas: 오콘 / 베어만\nRacing Bulls: 로슨 / 린드블라드\nAudi: 휠켄베르크 / 보르톨레토\nCadillac: 페레즈 / 보타스",
  },
  {
    icon: "👀", iconBg: "bg-[rgba(245,166,35,0.08)]", iconColor: "text-f1-amber",
    title: "관전 포인트", sub: "F1을 더 재미있게 보는 법",
    body: "• 예선 (토요일): 스타팅 그리드가 결정됩니다. Q1→Q2→Q3 삼단계로 진행\n• 스타트: 신호등이 꺼지는 순간이 가장 극적입니다\n• 피트스톱: 2초대 타이어 교환의 긴장감\n• 전략: 언더컷과 오버컷의 심리전\n• 날씨: 비가 오면 모든 것이 바뀝니다\n• 팀 라디오: 드라이버와 엔지니어의 실시간 소통\n• DRS 존: 오버테이크가 가장 많이 일어나는 구간",
  },
];

/* ===== Dictionary data ===== */
const DICT_ITEMS: { term: string; cat: DictCat; body: string }[] = [
  { term: "DRS", cat: "기술", body: "Drag Reduction System. 뒤쪽 윙의 플랩을 열어 공기저항을 줄이고 직선 속도를 높이는 장치. 앞 차와 1초 이내일 때만 사용 가능합니다." },
  { term: "다운포스", cat: "기술", body: "공기역학적으로 차를 노면에 눌러붙게 하는 힘. 다운포스가 클수록 코너링 속도가 빨라지지만, 직선 속도는 감소합니다." },
  { term: "슬립스트림", cat: "기술", body: "앞 차 뒤에 붙어 공기저항을 줄이는 기법. 직선 구간에서 뒷차가 속도 이점을 얻을 수 있습니다." },
  { term: "에이펙스", cat: "기술", body: "코너의 가장 안쪽 지점. 최적의 에이펙스를 찍어야 가장 빠른 코너링이 가능합니다." },
  { term: "락업", cat: "기술", body: "제동 시 타이어가 잠겨 미끄러지는 현상. 플랫스팟이 생기고 타이어 수명이 크게 줄어듭니다." },
  { term: "언더컷", cat: "전략", body: "상대보다 먼저 피트스톱을 하여 신선한 타이어로 빠른 랩타임을 기록, 트랙 위에서 앞서나가는 전략입니다." },
  { term: "오버컷", cat: "전략", body: "상대보다 늦게 피트스톱을 하여 이미 빠져나간 상대가 트래픽에 걸리는 동안 갭을 벌리는 전략입니다." },
  { term: "세이프티카", cat: "규정", body: "심각한 사고나 위험 상황 시 출동하여 모든 차량을 선도하며 속도를 제한하는 안전 차량입니다." },
  { term: "폴 포지션", cat: "규정", body: "예선 1위를 차지한 드라이버가 결승에서 출발하는 가장 앞자리. 그리드 첫 번째 위치입니다." },
  { term: "페널티", cat: "규정", body: "규정 위반 시 부과되는 벌칙. 시간 페널티(5초, 10초), 드라이브 스루, 그리드 강등 등이 있습니다." },
  { term: "포메이션 랩", cat: "규정", body: "결승 출발 전 그리드 위치에서 한 바퀴를 돌며 타이어를 워밍업하는 랩입니다." },
  { term: "피트레인", cat: "일반", body: "피트 박스가 있는 도로. 제한 속도(보통 80km/h)가 적용되며 위반 시 페널티를 받습니다." },
  { term: "해트트릭", cat: "일반", body: "같은 GP에서 폴 포지션, 우승, 패스티스트 랩을 모두 달성하는 것을 말합니다." },
  { term: "마샬", cat: "일반", body: "서킷 곳곳에 배치되어 깃발 신호, 사고 처리, 잔해 제거 등을 담당하는 자원봉사 요원입니다." },
  { term: "그리드", cat: "일반", body: "결승 출발 시 차량들이 위치하는 자리. 예선 결과에 따라 배정됩니다." },
  { term: "그라운드 이펙트", cat: "기술", body: "차체 하부의 공기흐름을 이용해 다운포스를 만드는 설계. 2022년부터 현대 F1의 핵심 공력 원리입니다." },
  { term: "오버스티어", cat: "기술", body: "코너에서 차 뒤쪽이 미끄러져 나가는 현상. 차가 코너 안쪽으로 과도하게 회전합니다." },
  { term: "언더스티어", cat: "기술", body: "코너에서 차가 충분히 돌지 않고 바깥으로 밀려나는 현상. 앞바퀴 그립 부족이 원인입니다." },
  { term: "ERS", cat: "기술", body: "Energy Recovery System. 제동 에너지와 열에너지를 전기로 회수하여 가속 시 추가 동력으로 사용하는 시스템입니다." },
  { term: "피트스톱", cat: "전략", body: "레이스 중 피트에 들어와 타이어 교환, 프론트 윙 조정 등을 하는 것. 보통 2~3초 내에 완료됩니다." },
  { term: "원스톱 / 투스톱", cat: "전략", body: "레이스 중 피트스톱 횟수에 따른 전략 구분. 원스톱은 타이어 관리가 핵심, 투스톱은 공격적 전략입니다." },
  { term: "팀 오더", cat: "전략", body: "팀이 챔피언십 전략에 따라 드라이버에게 순위를 양보하도록 지시하는 것입니다." },
  { term: "VSC (버추얼 세이프티카)", cat: "규정", body: "실제 세이프티카 대신 속도 제한을 전자적으로 적용하는 제도. 갭이 유지된 채 속도만 줄어듭니다." },
  { term: "코스트캡 (예산 상한제)", cat: "규정", body: "팀별 연간 지출 한도. 2026년 기준 약 1억 3500만 달러로 팀 간 경쟁력 균형을 맞추는 제도입니다." },
  { term: "스프린트", cat: "규정", body: "일부 그랑프리에서 진행되는 약 100km 단거리 레이스. 상위 8명에게 포인트가 부여됩니다." },
  { term: "DNF", cat: "일반", body: "Did Not Finish. 기계 결함, 사고 등으로 레이스를 완주하지 못한 경우를 뜻합니다." },
  { term: "백마커", cat: "일반", body: "선두 차량에게 랩 다운(한 바퀴 이상 뒤처진)된 뒤쪽 차량을 칭하는 표현입니다." },
  { term: "액티브 에어로", cat: "2026", body: "2026 신규 규정. 직선과 코너에서 윙의 각도가 자동으로 변하여 최적의 다운포스/드래그 비율을 만드는 시스템입니다." },
  { term: "오버테이크 모드", cat: "2026", body: "2026 신규. DRS를 대체하는 시스템으로, 버튼 한 번으로 윙 각도와 전기 부스트를 동시에 활성화합니다." },
  { term: "부스트 모드", cat: "2026", body: "2026 신규. 전기 모터의 추가 출력을 일시적으로 사용하여 가속력을 높이는 모드입니다." },
  { term: "지속가능 연료", cat: "2026", body: "2026 신규. 100% 지속가능한 합성 연료를 사용하여 탄소 배출을 크게 줄이는 규정입니다." },
  { term: "50:50 파워 스플릿", cat: "2026", body: "2026 신규. 내연기관(ICE)과 전기 모터(MGU-K)의 출력 비율이 각각 50%로 설계된 파워유닛 구조입니다." },
];

export default function GuidePage() {
  const [guideTab, setGuideTab] = useState<GuideTab>("intro");
  const [openCards, setOpenCards] = useState<Set<number>>(new Set());
  const [openDicts, setOpenDicts] = useState<Set<number>>(new Set());
  const [dictSearch, setDictSearch] = useState("");
  const [dictCat, setDictCat] = useState<DictCat>("all");

  function toggleCard(idx: number) {
    setOpenCards((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function toggleDict(idx: number) {
    setOpenDicts((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  const filteredDict = DICT_ITEMS.filter((item) => {
    const matchSearch = dictSearch === "" || item.term.toLowerCase().includes(dictSearch.toLowerCase());
    const matchCat = dictCat === "all" || item.cat === dictCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-bg2">
      <Navbar />

      <main className="mx-auto max-w-[960px] px-5 max-md:px-3.5 pt-5 max-md:pt-3.5 pb-20 md:pb-5 flex flex-col gap-3 max-md:gap-2.5">
        {/* Tab Buttons */}
        <div className="bg-card rounded-[16px] max-md:rounded-[14px] py-3 px-4">
          <div className="flex flex-wrap gap-2">
            {(["intro", "dict"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setGuideTab(tab); setOpenCards(new Set()); setOpenDicts(new Set()); }}
                className={`px-[18px] py-2 rounded-full text-[13px] font-semibold transition-colors ${
                  guideTab === tab ? "bg-t1 text-bg2" : "bg-card text-t3 hover:text-t1"
                }`}
              >
                {tab === "intro" ? "입문 가이드" : "용어 사전"}
              </button>
            ))}
          </div>
        </div>

        {/* ===== TAB: 입문 가이드 ===== */}
        {guideTab === "intro" && (
          <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
            <div className="mb-4">
              <h1 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">F1 입문 가이드</h1>
              <p className="text-[12px] text-t4 mt-0.5">F1이 처음이신가요? 여기서 시작하세요</p>
            </div>

            {GUIDE_CARDS.map((card, i) => {
              const isOpen = openCards.has(i);
              return (
                <div
                  key={i}
                  className={`bg-bg2 rounded-[12px] p-[18px] max-md:p-4 cursor-pointer ${i > 0 ? "mt-2.5" : ""}`}
                  onClick={() => toggleCard(i)}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${card.iconBg}`}>
                      <span className="text-[20px]">{card.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] max-md:text-[14px] font-bold text-t1">{card.title}</p>
                      <p className="text-[12px] text-t3 mt-0.5">{card.sub}</p>
                    </div>
                    <span className={`text-t4 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                  </div>

                  {/* Body */}
                  {isOpen && (
                    <div className="pt-3.5 mt-3.5 border-t border-bdr text-[14px] max-md:text-[13px] text-t2 leading-[1.8] whitespace-pre-line" onClick={(e) => e.stopPropagation()}>
                      {card.body}
                      {/* Tire rows */}
                      {card.tires && (
                        <div className="mt-3">
                          {card.tires.map((tire, ti) => (
                            <div key={ti} className="flex items-center gap-3 py-2.5 border-b border-bdr last:border-b-0">
                              <div
                                className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold"
                                style={{ background: tire.color, color: tire.textColor || "#fff" }}
                              />
                              <div className="flex-1">
                                <p className="text-[14px] font-bold text-t1">{tire.name}</p>
                                <p className="text-[12px] text-t3 mt-0.5">{tire.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Flag rows */}
                      {card.flags && (
                        <div className="mt-3">
                          {card.flags.map((flag, fi) => (
                            <div key={fi} className="flex items-center gap-3 py-2.5 border-b border-bdr last:border-b-0">
                              <div
                                className="w-7 h-7 rounded-full shrink-0"
                                style={{
                                  background: flag.color,
                                  border: flag.border ? "1.5px solid var(--bdr)" : undefined,
                                }}
                              />
                              <div className="flex-1">
                                <p className="text-[14px] font-bold text-t1">{flag.name}</p>
                                <p className="text-[12px] text-t3 mt-0.5">{flag.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        )}

        {/* ===== TAB: 용어 사전 ===== */}
        {guideTab === "dict" && (
          <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
            <div className="mb-4">
              <h1 className="text-[18px] max-md:text-[17px] font-extrabold text-t1">F1 용어 사전</h1>
              <p className="text-[12px] text-t4 mt-0.5">
                {DICT_ITEMS.length}개 용어 수록
              </p>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="용어 검색..."
              value={dictSearch}
              onChange={(e) => setDictSearch(e.target.value)}
              className="w-full py-3 px-4 rounded-[12px] bg-bg2 border border-bdr text-[14px] text-t1 placeholder-t4 outline-none mb-3.5"
            />

            {/* Category Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(["all", "기술", "전략", "규정", "일반", "2026"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setDictCat(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
                    dictCat === cat ? "bg-t1 text-bg2" : "bg-bg2 text-t3"
                  }`}
                >
                  {cat === "all" ? "전체" : cat === "2026" ? "2026 신규" : cat}
                </button>
              ))}
            </div>

            {/* Dictionary Items */}
            {filteredDict.length === 0 && (
              <div className="text-center py-8 text-[13px] text-t4">
                검색 결과가 없습니다
              </div>
            )}
            {filteredDict.map((item) => {
              const globalIdx = DICT_ITEMS.indexOf(item);
              const isOpen = openDicts.has(globalIdx);
              return (
                <div
                  key={globalIdx}
                  className="py-3.5 border-b border-bdr last:border-b-0 cursor-pointer"
                  onClick={() => toggleDict(globalIdx)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] max-md:text-[14px] font-semibold text-t1 flex-1">{item.term}</span>
                    <span className="text-[11px] font-medium text-t4">{item.cat === "2026" ? "2026 신규" : item.cat}</span>
                    <span className={`text-t4 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                  </div>
                  {isOpen && (
                    <div className="pt-2 text-[13px] text-t3 leading-[1.7]" onClick={(e) => e.stopPropagation()}>
                      {item.body}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        )}

        <Footer />
      </main>

      <TabBar />
    </div>
  );
}
