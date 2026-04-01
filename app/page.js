import Link from "next/link";
import { ProblemVisual, SolutionVisual } from "@/components/ProblemSolutionGraphics";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-stone-50 text-stone-900 antialiased">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[min(55vh,480px)] opacity-100"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% -5%, rgba(0,255,135,0.07), transparent 55%)",
        }}
      />

      <header className="relative z-10 border-b border-stone-200 bg-white/90 backdrop-blur-xl">
        <div className="flex flex-col gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <Link
            href="/"
            className={`text-lg font-extrabold tracking-tight text-stone-900 transition-colors hover:text-stone-800 ${focusRing} rounded-sm`}
          >
            Find<span className="text-[#00c46f]">Found</span>Fast
          </Link>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
            <Link
              href="/pricing"
              className={`font-mono text-xs font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 sm:text-sm ${focusRing} rounded-sm`}
            >
              Pricing
            </Link>
            <Link
              href="/how-it-works?tab=manager"
              className={`font-mono text-xs font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 sm:text-sm ${focusRing} rounded-sm`}
            >
              How it works
            </Link>
            <Link
              href="/get-started"
              className={`inline-flex min-h-[40px] items-center justify-center rounded-lg bg-fff-green px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wide text-fff-bg shadow-sm shadow-emerald-900/10 transition-colors hover:bg-[#00e67a] ${focusRing}`}
            >
              Get started →
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-4 pb-6 text-center sm:px-5 sm:pt-5 sm:pb-8 md:pb-10">
        <p className="mb-1 max-w-xl px-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 sm:text-xs">
          For property &amp; ops teams
        </p>
        <p className="mb-2 max-w-xl px-2 font-sans text-fff-body-sm font-medium leading-snug tracking-normal text-stone-600 sm:mb-3">
          Apartments · Hospitals · Offices · Events
        </p>

        <h1 className="mb-2 max-w-xl text-[clamp(2.1rem,7vw,3.35rem)] font-extrabold leading-[1.05] tracking-tight sm:mb-3 sm:text-5xl md:text-6xl">
          <span className="text-fff-green">Find</span>
          <span className="text-stone-900">Found</span>
          <span className="text-fff-green">Fast</span>
        </h1>

        <p className="mb-4 max-w-md font-mono text-fff-secondary font-semibold leading-relaxed text-amber-700 sm:mb-5 sm:leading-snug">
          Get every driver and guest to the right place
        </p>

        <section
          className="mb-5 w-full max-w-xl rounded-2xl border border-stone-200 bg-white px-4 py-4 shadow-sm sm:mb-6 sm:px-5 sm:py-5 lg:max-w-6xl lg:py-5"
          aria-label="Problem and solution"
        >
          <div className="flex min-w-0 flex-col gap-0 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-6">
            <div className="flex min-h-0 min-w-0 flex-col gap-2 border-b border-stone-200 pb-3 sm:pb-4 lg:h-full lg:justify-between lg:border-b-0 lg:pb-0 lg:pr-5 lg:border-r lg:border-stone-200">
              <div className="text-left">
                <h2
                  id="problem-heading"
                  className="mb-1.5 font-sans text-fff-eyebrow font-bold uppercase text-rose-600 sm:text-xs"
                >
                  Problem
                </h2>
                <p className="text-fff-body-sm font-normal leading-relaxed text-stone-700 sm:leading-snug">
                  Google Maps gets them to the address.{" "}
                  <span className="font-semibold text-amber-700">Now what?</span>
                </p>
              </div>
              <div className="flex w-full shrink-0 justify-center rounded-xl bg-stone-100 p-2">
                <ProblemVisual />
              </div>
            </div>

            <div className="relative flex items-center justify-center py-2 lg:hidden" aria-hidden>
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-stone-200" />
              <span className="relative rounded-full border border-stone-200 bg-stone-100 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 sm:px-4 sm:text-[11px]">
                vs
              </span>
            </div>

            <div className="flex min-h-0 min-w-0 flex-col gap-2 sm:gap-2 lg:h-full lg:justify-between lg:pl-1">
              <div className="text-left">
                <h2
                  id="solution-heading"
                  className="mb-1.5 font-sans text-fff-eyebrow font-bold uppercase text-emerald-700 sm:text-xs"
                >
                  Solution
                </h2>
                <p className="text-fff-body-sm font-medium leading-snug text-stone-900 sm:leading-snug">
                  A Guide: Park, Door, Gate, Lobby
                </p>
              </div>
              <div className="flex w-full shrink-0 justify-center rounded-xl bg-stone-100 p-2 pt-0">
                <SolutionVisual />
              </div>
            </div>
          </div>
        </section>

        <p className="mb-5 max-w-prose text-fff-body-sm font-normal leading-relaxed text-stone-600 sm:mb-6">
          Help drivers and guests find your resident—not just the building. A perk for property teams and the people who live there.
        </p>

        <section
          id="pricing"
          className="mb-8 w-full max-w-sm rounded-2xl border border-emerald-200/80 bg-emerald-50/80 px-5 py-5 text-center shadow-sm sm:mb-9 sm:px-6 sm:py-6 lg:max-w-md"
          aria-labelledby="pricing-heading"
        >
          <h2
            id="pricing-heading"
            className="mb-4 font-mono text-fff-eyebrow font-bold uppercase text-emerald-700"
          >
            Pricing
          </h2>
          <p className="mb-1 font-sans text-4xl font-extrabold tabular-nums tracking-tight text-fff-green sm:text-5xl">
            $49<span className="text-xl font-bold text-stone-600 sm:text-2xl">/mo</span>
          </p>
          <p className="text-base font-semibold text-stone-900 sm:text-lg">per property</p>
          <p className="mx-auto mt-3 max-w-xs text-fff-secondary leading-snug text-stone-600">
            Unlimited buildings &amp; units.
          </p>
          <Link
            href="/get-started"
            className={`mt-5 inline-block font-mono text-xs font-bold uppercase tracking-wide text-emerald-700 underline-offset-4 transition-colors hover:text-emerald-900 ${focusRing} rounded-sm`}
          >
            Get started →
          </Link>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500">
            or{" "}
            <Link href="/pricing" className="text-stone-600 underline-offset-2 hover:text-emerald-700">
              view full pricing
            </Link>
          </p>
        </section>

        <div className="flex w-full max-w-md flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 lg:max-w-xl">
          <Link
            href="/how-it-works?tab=manager"
            className={`inline-flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-lg border border-stone-300 bg-white px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-stone-800 transition-colors active:bg-stone-50 sm:w-auto sm:min-w-[200px] sm:px-8 hover:border-emerald-400 hover:text-emerald-800 ${focusRing}`}
          >
            How it works
          </Link>
          <Link
            href="/get-started"
            className={`inline-flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-lg bg-fff-green px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-bg shadow-sm shadow-emerald-900/10 transition-colors active:opacity-90 sm:w-auto sm:px-8 hover:bg-[#00e67a] ${focusRing}`}
          >
            Get started →
          </Link>
        </div>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-800 sm:mt-8 sm:text-xs sm:tracking-[0.2em]">
          FFFLipping Cool · No app required
        </p>

        <section
          className="mt-6 w-full max-w-3xl rounded-2xl border border-stone-200 bg-white px-4 py-3.5 shadow-sm sm:mt-8 sm:px-5 sm:py-4"
          aria-label="What people are saying"
        >
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 sm:text-[11px] sm:tracking-[0.22em]">
              Real notes
            </p>
            <p className="font-mono text-[11px] text-stone-400">Auto-scrolling</p>
          </div>

          <div className="relative mt-3 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
            <style>{`
              @keyframes ff-slow-marquee {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              @media (prefers-reduced-motion: reduce) {
                .ff-marquee-track {
                  animation: none !important;
                  transform: none !important;
                }
              }
            `}</style>

            <div
              className="ff-marquee-track flex w-max gap-4 px-4 py-4"
              style={{ animation: "ff-slow-marquee 46s linear infinite" }}
            >
              {[
                "My friends and family can never find my apartment.",
                "My food delivery was left at the wrong building again.",
                "I’m tired of sending instructions to navigate this large building.",
                "I want one link that does the directions for me.",
                "Stop reposting screenshots—make it simple and timed.",
                "Gate codes get lost in chat. This makes it easy.",
              ]
                .concat([
                  "My friends and family can never find my apartment.",
                  "My food delivery was left at the wrong building again.",
                  "I’m tired of sending instructions to navigate this large building.",
                  "I want one link that does the directions for me.",
                  "Stop reposting screenshots—make it simple and timed.",
                  "Gate codes get lost in chat. This makes it easy.",
                ])
                .map((t, idx) => (
                  <div
                    key={idx}
                    className="w-[320px] flex-shrink-0 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm"
                  >
                    <p className="text-fff-caption leading-relaxed text-stone-700">{t}</p>
                    <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700/90">
                      Resident
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-stone-200 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-fff-micro text-stone-500 sm:py-8 sm:text-sm">
        <span className="text-stone-700">FindFoundFast</span>
        <span className="mx-1.5 text-stone-400">·</span>
        <a
          href="https://findfoundfast.com"
          rel="noopener noreferrer"
          className={`text-stone-500 transition-colors hover:text-emerald-700 ${focusRing} rounded-sm`}
        >
          findfoundfast.com
        </a>
      </footer>
    </div>
  );
}
