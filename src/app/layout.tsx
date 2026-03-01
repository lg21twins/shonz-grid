import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SHONZ GRID — 한국어 F1 뉴스",
    template: "%s | SHONZ GRID",
  },
  description:
    "한국 F1 팬을 위한 한국어 뉴스. 데일리 브리핑, 기술 해설, 순위, 캘린더까지.",
  keywords: ["F1", "포뮬러원", "한국어", "뉴스", "순위", "캘린더", "Formula 1", "2026"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "SHONZ GRID",
    title: "SHONZ GRID — 한국어 F1 뉴스",
    description: "한국 F1 팬을 위한 한국어 뉴스. 데일리 브리핑, 기술 해설, 순위, 캘린더까지.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHONZ GRID — 한국어 F1 뉴스",
    description: "한국 F1 팬을 위한 한국어 뉴스.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#17171C" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
