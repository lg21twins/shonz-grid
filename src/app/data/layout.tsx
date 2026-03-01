import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "데이터",
  description: "F1 2026 드라이버 & 컨스트럭터 순위, 레이스 캘린더, 서킷 정보를 한눈에.",
  openGraph: {
    title: "데이터 | SHONZ GRID",
    description: "F1 2026 순위, 캘린더, 서킷 정보.",
  },
};

export default function DataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
