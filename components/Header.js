"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-fff-bg";

export default function Header() {
  const pathname = usePathname();
  const dark =
    pathname === "/how-it-works" ||
    pathname.startsWith("/how-it-works/");

  const navLink = (href, label) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return active ? (
      <span className="font-mono text-sm font-bold uppercase tracking-wide text-emerald-400">{label}</span>
    ) : (
      <Link
        href={href}
        className={`font-mono text-sm font-bold uppercase tracking-wide ${dark ? "text-fff-muted transition-colors hover:text-fff-text-primary" : "text-stone-600 transition-colors hover:text-stone-900"} ${focusRing} rounded-sm`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className={`relative z-10 border-b backdrop-blur-xl ${
        dark ? "border-fff-border bg-fff-bg/90" : "border-stone-200 bg-white/90"
      }`}
    >
      <div className="flex flex-col gap-2 px-4 py-2.5 pt-[max(0.75rem,env(safe-area-inset-top))] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3">
        <Link
          href="/"
          className={`text-lg font-extrabold tracking-tight ${dark ? "text-fff-text-primary transition-colors hover:text-fff-text-secondary" : "text-stone-900 transition-colors hover:text-stone-800"} ${focusRing} rounded-sm`}
        >
          Find<span className="text-[#00c46f]">Found</span>Fast
        </Link>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6" aria-label="Main navigation">
          {navLink("/pricing", "Pricing")}
          {navLink("/how-it-works", "How it works")}
          <Link
            href="/get-started"
            className={`inline-flex min-h-[40px] items-center justify-center rounded-lg bg-fff-green px-4 py-2 font-mono text-fff-eyebrow font-bold uppercase text-fff-bg shadow-sm transition-colors hover:bg-[#00e67a] ${focusRing}`}
          >
            Get started →
          </Link>
        </nav>
      </div>
    </header>
  );
}
