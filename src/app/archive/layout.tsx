import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "F1 가이드",
  description: "F1 입문 가이드와 용어 사전. 포뮬러원이 처음이라면 여기서 시작하세요.",
  openGraph: {
    title: "F1 가이드 | SHONZ GRID",
    description: "F1 입문 가이드와 용어 사전.",
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
