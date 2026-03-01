"use client";

import { use } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { TabBar } from "@/components/layout/TabBar";
import { Footer } from "@/components/layout/Footer";

/* ── placeholder article data (will be replaced by Notion CMS) ── */
const ARTICLES: Record<
  string,
  {
    category: string;
    title: string;
    desc: string;
    source: string;
    date: string;
    gradient: string;
    body: string[];
    related: { slug: string; title: string; cat: string; time: string }[];
  }
> = {
  "preseason-test-bahrain-2026": {
    category: "속보",
    title: "2026 프리시즌 테스트, 바레인 3일간 확정",
    desc: "FIA가 2026 시즌 프리시즌 테스트 일정을 공식 발표. 새 레귤레이션 첫 주행이 시작된다.",
    source: "SHONZ GRID",
    date: "2026년 3월 1일",
    gradient: "from-[#1a1a2e] to-[#e94560]",
    body: [
      "FIA는 오늘 2026 시즌 프리시즌 테스트가 바레인 사키르 인터내셔널 서킷에서 3일간 진행될 것이라고 공식 발표했다.",
      "새로운 레귤레이션이 적용되는 첫 시즌인 만큼, 이번 테스트는 11개 팀 모두에게 중요한 의미를 갖는다. 특히 액티브 에어로다이나믹스와 강화된 전기 파워유닛이 실전에서 어떤 성능을 보여줄지에 대한 첫 번째 힌트가 될 것이다.",
      "테스트는 2월 말부터 3월 초까지 진행되며, 각 팀은 하루에 두 명의 드라이버를 번갈아 투입할 수 있다. FIA는 추가적으로 루키 전용 세션도 검토 중인 것으로 알려졌다.",
      "올해 새로 합류하는 카딜락 F1 팀에게는 이번 테스트가 특히 중요하다. 11번째 팀으로서의 첫 공식 주행이 될 예정이며, 팀 대표는 \"모든 랩이 학습의 기회\"라고 밝혔다.",
      "바레인 테스트 이후 시즌 개막전은 호주 멜버른 알버트 파크 서킷에서 열린다.",
    ],
    related: [
      { slug: "active-aero-explained", title: "액티브 에어로 작동 원리 해설", cat: "기술 해설", time: "3시간 전" },
      { slug: "cadillac-f1-first-season", title: "카딜락 F1, 첫 시즌 목표는 '학습'", cat: "데일리 브리핑", time: "1일 전" },
      { slug: "pirelli-2026-compound", title: "피렐리, 2026 타이어 컴파운드 변경", cat: "데일리 브리핑", time: "1일 전" },
    ],
  },
};

/* fallback for unknown slugs */
const FALLBACK = {
  category: "뉴스",
  title: "기사를 불러오는 중...",
  desc: "잠시 후 다시 시도해 주세요.",
  source: "SHONZ GRID",
  date: "",
  gradient: "from-[#333] to-[#555]",
  body: ["이 기사는 아직 준비 중입니다. Notion CMS 연동 후 실제 콘텐츠가 표시됩니다."],
  related: [] as { slug: string; title: string; cat: string; time: string }[],
};

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const article = ARTICLES[slug] ?? FALLBACK;

  return (
    <div className="min-h-screen bg-bg2">
      <Navbar />

      <main className="mx-auto max-w-[720px] px-5 max-md:px-3.5 pt-5 max-md:pt-3.5 pb-20 md:pb-5 flex flex-col gap-3 max-md:gap-2.5">
        {/* Back */}
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-t3 hover:text-t1 transition-colors w-fit"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          뉴스 목록
        </Link>

        {/* Hero Image */}
        <div className={`w-full aspect-[2/1] rounded-[16px] max-md:rounded-[14px] bg-gradient-to-br ${article.gradient}`} />

        {/* Article Card */}
        <article className="bg-card rounded-[16px] max-md:rounded-[14px] p-6 max-md:p-4">
          {/* Category badge */}
          <span className="inline-block text-[11px] font-bold px-2.5 py-[3px] rounded-[6px] bg-f1-red-bg text-f1-red mb-3">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-[22px] max-md:text-[19px] font-extrabold text-t1 leading-[1.35] mb-2">
            {article.title}
          </h1>

          {/* Meta */}
          <p className="text-[13px] text-t3 mb-6">
            {article.source} · {article.date}
          </p>

          {/* Description highlight */}
          <div className="border-l-[3px] border-f1-red pl-4 mb-6">
            <p className="text-[15px] max-md:text-[14px] text-t2 leading-[1.6] font-medium">
              {article.desc}
            </p>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-4">
            {article.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-[15px] max-md:text-[14px] text-t1 leading-[1.75]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Related Articles */}
        {article.related.length > 0 && (
          <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
            <p className="text-[15px] font-bold text-t2 mb-4">관련 기사</p>
            {article.related.map((r) => (
              <Link
                key={r.slug}
                href={`/news/${r.slug}`}
                className="flex items-center gap-3 py-3.5 border-b border-bdr last:border-b-0 last:pb-0 hover:bg-bg2 -mx-2 px-2 rounded-[8px] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-t3 mb-0.5">
                    {r.cat} · {r.time}
                  </p>
                  <p className="text-[14px] font-semibold text-t1 leading-[1.3]">
                    {r.title}
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-t4 shrink-0"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
            ))}
          </section>
        )}

        <Footer />
      </main>

      <TabBar />
    </div>
  );
}
