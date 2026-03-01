import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "뉴스",
  description: "F1 최신 뉴스, 데일리 브리핑, 기술 해설, 레이스 위켄드 소식을 한국어로 만나보세요.",
  openGraph: {
    title: "뉴스 | SHONZ GRID",
    description: "F1 최신 뉴스, 데일리 브리핑, 기술 해설, 레이스 위켄드 소식.",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
