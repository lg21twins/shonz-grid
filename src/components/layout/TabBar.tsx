"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TAB_ITEMS = [
  { href: "/", label: "홈", icon: "home" },
  { href: "/news", label: "뉴스", icon: "news" },
  { href: "/data", label: "데이터", icon: "data" },
  { href: "/archive", label: "아카이브", icon: "archive" },
  { href: "/my", label: "MY", icon: "my" },
];

function TabIcon({ icon, active }: { icon: string; active: boolean }) {
  const color = active ? "var(--t1)" : "var(--t4)";

  switch (icon) {
    case "home":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
      );
    case "news":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16v16H4z" /><path d="M8 8h3v3H8z" /><path d="M14 8h2" /><path d="M14 12h2" /><path d="M8 14h8" /><path d="M8 17h8" />
        </svg>
      );
    case "data":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
        </svg>
      );
    case "archive":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </svg>
      );
    case "my":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      );
    default:
      return null;
  }
}

export function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <nav className="h-[56px] border-t border-bdr backdrop-blur-[20px] backdrop-saturate-[180%] bg-nav-bg pb-[env(safe-area-inset-bottom)]">
        <div className="flex h-full items-center justify-around">
          {TAB_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5"
              >
                <TabIcon icon={item.icon} active={isActive} />
                <span
                  className={`text-[10px] ${
                    isActive ? "font-bold text-t1" : "font-medium text-t4"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
