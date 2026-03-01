import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MY",
  description: "프로필, 알림 설정, 앱 설정을 관리하세요.",
  openGraph: {
    title: "MY | SHONZ GRID",
    description: "프로필 및 앱 설정.",
  },
};

export default function MyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
