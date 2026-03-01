"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/news", label: "뉴스" },
  { href: "/data", label: "데이터" },
  { href: "/guide", label: "가이드" },
  { href: "/my", label: "MY" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 h-[52px] border-b border-bdr backdrop-blur-[20px] backdrop-saturate-[180%] bg-nav-bg">
      <div className="mx-auto flex h-full max-w-[960px] items-center justify-between px-5 md:px-6">
        <Link href="/" className="flex items-center">
          <Logo className="h-[14px] w-auto text-t1" />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] transition-colors ${
                  isActive
                    ? "font-bold text-t1"
                    : "font-medium text-t3 hover:text-t1"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
