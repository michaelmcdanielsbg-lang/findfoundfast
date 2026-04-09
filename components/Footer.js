"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-fff-bg";

export default function Footer() {
  const pathname = usePathname();
  const dark =
    pathname === "/" ||
    pathname === "/how-it-works" ||
    pathname.startsWith("/how-it-works/");

  return (
    <footer
      className={`relative z-10 border-t py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:py-6 ${
        dark ? "border-fff-border" : "border-stone-200"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 sm:flex-row sm:justify-between sm:px-6">
        <Link
          href="/"
          className={`font-mono text-sm font-extrabold tracking-tight ${
            dark
              ? "text-fff-text-primary transition-colors hover:text-fff-text-secondary"
              : "text-stone-700 transition-colors hover:text-stone-900"
          } ${focusRing} rounded-sm`}
        >
          Find<span className="text-[#00c46f]">Found</span>Fast
        </Link>
        <div
          className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs font-bold uppercase tracking-wide ${
            dark ? "text-fff-muted" : "text-stone-400"
          }`}
        >
          <Link
            href="/how-it-works"
            className={`transition-colors ${dark ? "hover:text-fff-text-primary" : "hover:text-stone-700"} ${focusRing} rounded-sm`}
          >
            How it works
          </Link>
          <Link
            href="/pricing"
            className={`transition-colors ${dark ? "hover:text-fff-text-primary" : "hover:text-stone-700"} ${focusRing} rounded-sm`}
          >
            Pricing
          </Link>
          <Link
            href="/get-started"
            className={`transition-colors ${dark ? "hover:text-emerald-400" : "hover:text-emerald-700"} ${focusRing} rounded-sm`}
          >
            Get started
          </Link>
        </div>
        <p className={`font-mono text-xs ${dark ? "text-fff-muted" : "text-stone-400"}`}>
          © {new Date().getFullYear()} FindFoundFast
        </p>
      </div>
    </footer>
  );
}
