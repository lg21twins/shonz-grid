"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { TabBar } from "@/components/layout/TabBar";
import { Footer } from "@/components/layout/Footer";
import { useTheme } from "@/components/ThemeProvider";

const TEAMS = [
  { name: "McLaren", color: "#FF8000" },
  { name: "Ferrari", color: "#E8002D" },
  { name: "Red Bull", color: "#3671C6" },
  { name: "Mercedes", color: "#27F4D2" },
  { name: "Aston Martin", color: "#229971" },
  { name: "Williams", color: "#64C4FF" },
  { name: "Alpine", color: "#FF87BC" },
  { name: "Haas", color: "#B6BABD" },
  { name: "Racing Bulls", color: "#6692FF" },
  { name: "Audi", color: "#C0C0C0" },
  { name: "Cadillac", color: "#313131" },
];

export default function MyPage() {
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [teamSheetOpen, setTeamSheetOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    race: true,
    quali: true,
    result: false,
    breaking: false,
  });
  const [openInfo, setOpenInfo] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const team = TEAMS[selectedTeam];

  function toggleNotif(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="min-h-screen bg-bg2">
      <Navbar />

      <main className="mx-auto max-w-[960px] px-5 max-md:px-3.5 pt-5 max-md:pt-3.5 pb-20 md:pb-5 flex flex-col gap-3 max-md:gap-2.5">
        {/* Page Title */}
        <div className="px-0.5 pt-1">
          <h1 className="text-[24px] font-black text-t1">MY</h1>
          <p className="text-[13px] text-t3 mt-0.5">프로필 및 앱 설정</p>
        </div>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3 max-md:gap-2.5 items-start">
          {/* ===== LEFT COLUMN ===== */}
          <div className="flex flex-col gap-3 max-md:gap-2.5">
            {/* 1. Profile */}
            <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
              <p className="text-[15px] font-bold text-t2 mb-4">내 프로필</p>
              <div className="flex items-center gap-4">
                <div
                  className="w-[62px] h-[62px] rounded-full shrink-0 flex items-center justify-center font-display text-[22px] font-black text-white tracking-tight"
                  style={{
                    background: team.color,
                    boxShadow: `0 0 0 3px var(--card), 0 0 0 5.5px ${team.color}`,
                  }}
                >
                  S
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[20px] font-extrabold text-t1">SHONZ</p>
                  <p className="text-[12px] text-t3 mt-0.5">shonz@gmail.com</p>
                  <div
                    className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-[3px] rounded-full"
                    style={{ background: `${team.color}15` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: team.color }}
                    />
                    <span
                      className="text-[12px] font-bold"
                      style={{ color: team.color }}
                    >
                      {team.name}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setTeamSheetOpen(!teamSheetOpen)}
                  className="w-8 h-8 rounded-full bg-bg2 flex items-center justify-center shrink-0 hover:bg-bdr transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-t3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
              </div>

              {/* Team Sheet */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  teamSheetOpen ? "max-h-[520px] opacity-100 mt-5 pt-5 border-t border-bdr" : "max-h-0 opacity-0 mt-0 pt-0"
                }`}
              >
                <p className="text-[13px] font-bold text-t2 mb-3">응원 팀 선택</p>
                <div className="grid grid-cols-4 max-md:grid-cols-3 gap-2 max-md:gap-1.5">
                  {TEAMS.map((t, i) => (
                    <button
                      key={t.name}
                      onClick={() => setSelectedTeam(i)}
                      className={`py-2.5 px-2 rounded-[10px] text-center transition-all ${
                        selectedTeam === i
                          ? "border-[1.5px] border-f1-red bg-f1-red-bg"
                          : "bg-bg2 border-[1.5px] border-transparent"
                      }`}
                    >
                      <div
                        className="w-5 h-1 rounded-sm mx-auto mb-1.5"
                        style={{ background: t.color }}
                      />
                      <span
                        className={`text-[11px] font-semibold ${
                          selectedTeam === i ? "text-f1-red" : "text-t2"
                        }`}
                      >
                        {t.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. Notification Settings */}
            <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
              <p className="text-[15px] font-bold text-t2 mb-4">알림 설정</p>
              {[
                { key: "race" as const, icon: "🔔", iconBg: "bg-f1-red-bg", label: "레이스 시작 알림", sub: "결승 출발 30분 전에 알림" },
                { key: "quali" as const, icon: "⏱", iconBg: "bg-[rgba(245,166,35,0.08)]", label: "예선 알림", sub: "예선 시작 30분 전에 알림" },
                { key: "result" as const, icon: "🏆", iconBg: "bg-[rgba(52,199,89,0.08)]", label: "결과 알림", sub: "레이스 종료 후 최종 순위 알림" },
                { key: "breaking" as const, icon: "📰", iconBg: "bg-[rgba(49,130,246,0.08)]", label: "속보 알림", sub: "주요 뉴스 및 긴급 소식 알림" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-3 py-3.5 border-b border-bdr last:border-b-0"
                >
                  <div className={`w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0 ${item.iconBg}`}>
                    <span className="text-[18px]">{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-t1">{item.label}</p>
                    <p className="text-[12px] text-t3 mt-0.5">{item.sub}</p>
                  </div>
                  <button
                    onClick={() => toggleNotif(item.key)}
                    className={`w-12 h-7 rounded-full relative shrink-0 transition-colors ${
                      notifications[item.key] ? "bg-f1-green" : "bg-t5"
                    }`}
                  >
                    <div
                      className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-sm transition-transform ${
                        notifications[item.key] ? "left-[23px]" : "left-[3px]"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </section>
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div className="flex flex-col gap-3 max-md:gap-2.5">
            {/* 3. App Settings */}
            <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
              <p className="text-[15px] font-bold text-t2 mb-4">앱 설정</p>

              {/* Dark Mode */}
              <div className="flex items-center gap-3 py-3.5 border-b border-bdr">
                <div className="w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0 bg-[rgba(100,100,100,0.08)]">
                  <span className="text-[18px]">🌙</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-t1">다크 모드</p>
                  <p className="text-[12px] text-t3 mt-0.5">어두운 배경으로 전환</p>
                </div>
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className={`w-12 h-7 rounded-full relative shrink-0 transition-colors ${
                    isDark ? "bg-f1-green" : "bg-t5"
                  }`}
                >
                  <div
                    className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-sm transition-transform ${
                      isDark ? "left-[23px]" : "left-[3px]"
                    }`}
                  />
                </button>
              </div>

              {/* Language */}
              <div className="flex items-center gap-3 py-3.5 border-b border-bdr">
                <div className="w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0 bg-[rgba(49,130,246,0.08)]">
                  <span className="text-[18px]">🌐</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-t1">언어</p>
                  <p className="text-[12px] text-t3 mt-0.5">앱 표시 언어</p>
                </div>
                <span className="text-[13px] font-semibold text-t3 flex items-center gap-0.5">
                  한국어
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-t4"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
              </div>

              {/* Timezone */}
              <div className="flex items-center gap-3 py-3.5 border-b border-bdr">
                <div className="w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0 bg-[rgba(245,166,35,0.08)]">
                  <span className="text-[18px]">🕐</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-t1">시간대</p>
                  <p className="text-[12px] text-t3 mt-0.5">레이스 일정 표시 기준</p>
                </div>
                <span className="text-[13px] font-semibold text-t3 flex items-center gap-0.5">
                  KST +9
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-t4"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
              </div>

              {/* Cache */}
              <div className="flex items-center gap-3 py-3.5">
                <div className="w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0 bg-[rgba(142,142,147,0.1)]">
                  <span className="text-[18px]">🗑️</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-t1">캐시 지우기</p>
                  <p className="text-[12px] text-t3 mt-0.5">저장된 이미지 · 데이터 삭제</p>
                </div>
                <button className="px-3 py-1.5 rounded-[8px] border border-bdr text-[12px] font-semibold text-t2 hover:border-t3 hover:text-t1 transition-colors">
                  지우기
                </button>
              </div>
            </section>

            {/* 4. App Info */}
            <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
              <p className="text-[15px] font-bold text-t2 mb-4">앱 정보</p>

              {/* 버전 정보 */}
              <div className="flex items-center py-3.5 border-b border-bdr">
                <span className="flex-1 text-[15px] font-medium text-t1">버전 정보</span>
                <span className="inline-flex px-2.5 py-[3px] rounded-full bg-bg2 text-[12px] font-bold text-t3 font-display">
                  v1.0.0
                </span>
              </div>

              {/* 개인정보처리방침 */}
              <div className="border-b border-bdr">
                <button
                  onClick={() => setOpenInfo(openInfo === "privacy" ? null : "privacy")}
                  className="flex items-center py-3.5 w-full text-left"
                >
                  <span className="flex-1 text-[15px] font-medium text-t1">개인정보처리방침</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-t4 transition-transform ${openInfo === "privacy" ? "rotate-90" : ""}`}><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                {openInfo === "privacy" && (
                  <div className="pb-4 text-[13px] text-t2 leading-[1.6] space-y-2">
                    <p className="font-semibold text-t1">SHONZ GRID 개인정보처리방침</p>
                    <p>SHONZ GRID(이하 &quot;서비스&quot;)는 이용자의 개인정보를 중요하게 생각하며, 관련 법령에 따라 적법하게 처리합니다.</p>
                    <p className="font-semibold text-t1 pt-1">1. 수집하는 개인정보</p>
                    <p>본 서비스는 별도의 회원가입 없이 이용 가능하며, 현재 개인정보를 수집하지 않습니다. 향후 로그인 기능 도입 시 이메일, 닉네임 등 최소한의 정보만 수집합니다.</p>
                    <p className="font-semibold text-t1 pt-1">2. 개인정보의 이용 목적</p>
                    <p>수집된 정보는 서비스 제공, 맞춤 콘텐츠 추천, 알림 발송 등의 목적으로만 사용됩니다.</p>
                    <p className="font-semibold text-t1 pt-1">3. 개인정보의 보유 및 파기</p>
                    <p>이용 목적 달성 시 지체 없이 파기하며, 관련 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관합니다.</p>
                    <p className="font-semibold text-t1 pt-1">4. 문의</p>
                    <p>개인정보 관련 문의는 shonzmag@gmail.com으로 연락해 주세요.</p>
                  </div>
                )}
              </div>

              {/* 이용약관 */}
              <div className="border-b border-bdr">
                <button
                  onClick={() => setOpenInfo(openInfo === "terms" ? null : "terms")}
                  className="flex items-center py-3.5 w-full text-left"
                >
                  <span className="flex-1 text-[15px] font-medium text-t1">이용약관</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-t4 transition-transform ${openInfo === "terms" ? "rotate-90" : ""}`}><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                {openInfo === "terms" && (
                  <div className="pb-4 text-[13px] text-t2 leading-[1.6] space-y-2">
                    <p className="font-semibold text-t1">SHONZ GRID 이용약관</p>
                    <p className="font-semibold text-t1 pt-1">제1조 (목적)</p>
                    <p>본 약관은 SHONZ GRID 서비스의 이용 조건 및 절차에 관한 사항을 규정합니다.</p>
                    <p className="font-semibold text-t1 pt-1">제2조 (서비스 내용)</p>
                    <p>본 서비스는 F1 관련 뉴스, 일정, 순위, 서킷 정보 등을 한국어로 제공하는 비영리 팬 미디어 플랫폼입니다. 어떠한 형태의 광고, 유료 구독, 수익 창출 활동도 하지 않습니다.</p>
                    <p className="font-semibold text-t1 pt-1">제3조 (기사 생성 방식)</p>
                    <p>본 서비스의 한국어 기사는 해외 F1 전문 매체(Formula1.com, Motorsport.com, RaceFans 등)의 원문을 기반으로 AI(Claude)가 자동 번역·요약하여 생성합니다. 모든 기사에는 원본 출처가 명시되며, &quot;원본 기사 보기&quot; 버튼을 통해 원문을 확인할 수 있습니다.</p>
                    <p className="font-semibold text-t1 pt-1">제4조 (저작권)</p>
                    <p>원본 기사의 저작권은 각 출처 매체에 있습니다. SHONZ GRID는 비영리·정보 제공 목적의 번역·요약본을 제공하며, 저작권자의 요청 시 즉시 삭제합니다.</p>
                    <p className="font-semibold text-t1 pt-1">제5조 (면책)</p>
                    <p>AI가 생성한 기사는 번역·요약 과정에서 원문과 차이가 발생할 수 있으며, 정확성이나 완전성을 보장하지 않습니다. 정확한 내용은 반드시 원본 기사를 확인해 주세요. 베팅·투자 관련 기사는 참고용이며, 이로 인한 손실에 대해 책임지지 않습니다.</p>
                    <p className="font-semibold text-t1 pt-1">제6조 (약관 변경)</p>
                    <p>약관이 변경될 경우 서비스 내 공지를 통해 안내합니다.</p>
                  </div>
                )}
              </div>

              {/* 문의 · 피드백 */}
              <div className="border-b border-bdr">
                <button
                  onClick={() => setOpenInfo(openInfo === "contact" ? null : "contact")}
                  className="flex items-center py-3.5 w-full text-left"
                >
                  <span className="flex-1 text-[15px] font-medium text-t1">문의 · 피드백</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-t4 transition-transform ${openInfo === "contact" ? "rotate-90" : ""}`}><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                {openInfo === "contact" && (
                  <div className="pb-4 text-[13px] text-t2 leading-[1.6] space-y-3">
                    <p>서비스 이용 중 문의 사항이나 개선 의견이 있으시면 아래 채널로 연락해 주세요.</p>
                    <div className="flex flex-col gap-2">
                      <a href="mailto:shonzmag@gmail.com" className="flex items-center gap-2 text-f1-blue font-medium">
                        <span>📧</span> shonzmag@gmail.com
                      </a>
                      <a href="https://www.instagram.com/shonz_mag" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-f1-blue font-medium">
                        <span>📸</span> @shonz_mag (Instagram)
                      </a>
                    </div>
                    <p className="text-t3">보내주신 피드백은 서비스 개선에 적극 반영됩니다.</p>
                  </div>
                )}
              </div>

              {/* 오픈소스 라이선스 */}
              <div>
                <button
                  onClick={() => setOpenInfo(openInfo === "license" ? null : "license")}
                  className="flex items-center py-3.5 w-full text-left"
                >
                  <span className="flex-1 text-[15px] font-medium text-t1">오픈소스 라이선스</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-t4 transition-transform ${openInfo === "license" ? "rotate-90" : ""}`}><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                {openInfo === "license" && (
                  <div className="pb-4 text-[13px] text-t2 leading-[1.6] space-y-2">
                    <p>본 서비스는 다음 오픈소스 소프트웨어를 사용합니다.</p>
                    <div className="bg-bg2 rounded-[10px] p-3 space-y-1.5 font-mono text-[11px]">
                      <p><span className="text-t1 font-semibold">Next.js</span> — MIT License</p>
                      <p><span className="text-t1 font-semibold">React</span> — MIT License</p>
                      <p><span className="text-t1 font-semibold">Tailwind CSS</span> — MIT License</p>
                      <p><span className="text-t1 font-semibold">@notionhq/client</span> — MIT License</p>
                      <p><span className="text-t1 font-semibold">@anthropic-ai/sdk</span> — MIT License</p>
                    </div>
                    <p className="text-t3">각 라이브러리의 전체 라이선스 텍스트는 해당 프로젝트의 공식 저장소에서 확인할 수 있습니다.</p>
                  </div>
                )}
              </div>
            </section>

            {/* 5. Logout */}
            <button className="w-full py-3.5 rounded-[12px] border-[1.5px] border-[rgba(225,6,0,0.25)] text-[15px] font-semibold text-f1-red flex items-center justify-center gap-2 hover:bg-f1-red-bg hover:border-f1-red transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              로그아웃
            </button>
          </div>
        </div>

        <Footer />
      </main>

      <TabBar />
    </div>
  );
}
