import Link from "next/link";
import { ProblemVisual, SolutionVisual } from "@/components/ProblemSolutionGraphics";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fff-green/55 focus-visible:ring-offset-2 focus-visible:ring-offset-fff-bg";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-fff-bg">
      <div
        className="pointer-events-none fixed inset-0 opacity-100"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,135,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="pointer-events-none fixed top-[5%] left-1/2 h-[min(70vh,520px)] w-[min(90vw,640px)] -translate-x-1/2 rounded-full opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,255,135,0.07) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      <header className="relative z-10 border-b border-white/[0.08] bg-fff-bg/90 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md sm:px-6 sm:py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className={`text-lg font-extrabold tracking-tight text-fff-white transition-colors hover:text-fff-white/90 ${focusRing} rounded-sm`}
        >
          Find<span className="text-fff-green">Found</span>Fast
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
          <Link
            href="/pricing"
            className={`font-mono text-xs font-bold uppercase tracking-wide text-fff-white/90 transition-colors hover:text-fff-green sm:text-sm ${focusRing} rounded-sm`}
          >
            Pricing
          </Link>
          <Link
            href="/how-it-works?tab=manager"
            className={`font-mono text-xs font-bold uppercase tracking-wide text-fff-white/90 transition-colors hover:text-fff-green sm:text-sm ${focusRing} rounded-sm`}
          >
            How it works
          </Link>
          <Link
            href="/get-started"
            className={`inline-flex min-h-[40px] items-center justify-center rounded-lg bg-fff-green px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wide text-fff-bg transition-colors hover:bg-fff-yellow ${focusRing}`}
          >
            Get started →
          </Link>
        </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-4 pb-6 text-center sm:px-5 sm:pt-5 sm:pb-8 md:pb-10">
        <p className="mb-1 max-w-xl px-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-fff-green sm:text-xs">
          For property &amp; ops teams
        </p>
        <p className="mb-2 max-w-xl px-2 font-sans text-[16px] font-medium leading-snug tracking-normal text-fff-white/92 sm:mb-3 sm:text-base">
          Apartments · Hospitals · Offices · Events
        </p>

        <h1 className="mb-2 max-w-xl text-[clamp(2.1rem,7vw,3.35rem)] font-extrabold leading-[1.05] tracking-tight sm:mb-3 sm:text-5xl md:text-6xl">
          <span className="text-fff-green">Find</span>
          <span className="text-fff-white">Found</span>
          <span className="text-fff-green">Fast</span>
        </h1>

        <p className="mb-4 max-w-md font-mono text-[15px] leading-relaxed text-fff-yellow sm:mb-5 sm:text-base sm:leading-snug">
          Get every driver and guest to the right place
        </p>

        <section
          className="mb-5 w-full max-w-xl rounded-2xl border border-white/[0.09] bg-white/[0.03] px-4 py-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:mb-6 sm:px-5 sm:py-5 lg:max-w-6xl lg:py-5"
          aria-label="Problem and solution"
        >
          <div className="flex min-w-0 flex-col gap-0 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-6">
            <div className="flex min-h-0 min-w-0 flex-col gap-2 border-b border-white/[0.08] pb-3 sm:pb-4 lg:h-full lg:justify-between lg:border-b-0 lg:pb-0 lg:pr-5 lg:border-r lg:border-white/[0.08]">
              <div className="text-left">
                <h2
                  id="problem-heading"
                  className="mb-1.5 font-mono text-sm font-bold uppercase tracking-[0.18em] text-fff-rose/95 sm:text-base lg:text-lg"
                >
                  Problem
                </h2>
                <p className="text-[16px] leading-relaxed text-fff-white/92 sm:text-base sm:leading-snug">
                  Google Maps gets them to the address.{' '}
                  <span className="font-semibold text-fff-yellow">Now what?</span>
                </p>
              </div>
              <div className="flex w-full shrink-0 justify-center">
                <ProblemVisual />
              </div>
            </div>

            <div className="relative flex items-center justify-center py-2 lg:hidden" aria-hidden>
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/[0.1]" />
              <span className="relative rounded-full border border-white/[0.12] bg-fff-bg px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-fff-white/55 sm:px-4 sm:text-[11px]">
                vs
              </span>
            </div>

            <div className="flex min-h-0 min-w-0 flex-col gap-2 sm:gap-2 lg:h-full lg:justify-between lg:pl-1">
              <div className="text-left">
                <h2
                  id="solution-heading"
                  className="mb-1 font-mono text-sm font-bold uppercase tracking-[0.18em] text-fff-green sm:mb-1.5 sm:text-base lg:text-lg"
                >
                  Solution
                </h2>
                <p className="text-[16px] font-semibold leading-snug text-fff-white sm:text-base sm:leading-snug">
                  A Guide: Park, Door, Gate, Lobby
                </p>
              </div>
              <div className="flex w-full shrink-0 justify-center pt-0">
                <SolutionVisual />
              </div>
            </div>
          </div>
        </section>

        <p className="mb-5 max-w-xl text-[16px] leading-relaxed text-fff-white/82 sm:mb-6 sm:text-base sm:leading-relaxed">
          Help drivers and guests find your resident—not just the building. A perk for property teams and the people who live there.
        </p>

        <section
          id="pricing"
          className="mb-8 w-full max-w-sm rounded-2xl border border-fff-green/20 bg-fff-green/[0.06] px-5 py-5 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] sm:mb-9 sm:px-6 sm:py-6 lg:max-w-md"
          aria-labelledby="pricing-heading"
        >
          <h2
            id="pricing-heading"
            className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-fff-green"
          >
            Pricing
          </h2>
          <p className="mb-1 font-sans text-4xl font-extrabold tracking-tight text-fff-green sm:text-5xl">
            $49<span className="text-xl font-bold text-fff-white/85 sm:text-2xl">/mo</span>
          </p>
          <p className="text-base font-semibold text-fff-white sm:text-lg">per property</p>
          <p className="mx-auto mt-3 max-w-xs text-[15px] leading-snug text-fff-white/80">
            Unlimited buildings &amp; units.
          </p>
          <Link
            href="/get-started"
            className={`mt-5 inline-block font-mono text-xs font-bold uppercase tracking-wide text-fff-green underline-offset-4 transition-colors hover:text-fff-yellow ${focusRing} rounded-sm`}
          >
            Get started →
          </Link>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-fff-white/45">
            or{' '}
            <Link href="/pricing" className="text-fff-white/60 underline-offset-2 hover:text-fff-green">
              view full pricing
            </Link>
          </p>
        </section>

        <div className="flex w-full max-w-md flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 lg:max-w-xl">
          <Link
            href="/how-it-works?tab=manager"
            className={`inline-flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-lg border border-white/[0.18] bg-transparent px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-white transition-colors active:bg-white/5 sm:w-auto sm:min-w-[200px] sm:px-8 hover:border-fff-green/50 hover:text-fff-green ${focusRing}`}
          >
            How it works
          </Link>
          <Link
            href="/get-started"
            className={`inline-flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-lg bg-fff-green px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-bg transition-colors active:opacity-90 sm:w-auto sm:px-8 hover:bg-fff-yellow ${focusRing}`}
          >
            Get started →
          </Link>
        </div>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-fff-green/25 bg-fff-green/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-fff-green sm:mt-8 sm:text-xs sm:tracking-[0.2em]">
          FFFLipping Cool · No app required
        </p>

        <section
          className="mt-6 w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-fff-card/40 px-4 py-3.5 sm:mt-8 sm:px-5 sm:py-4"
          aria-label="What people are saying"
        >
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-fff-green/90 sm:text-[11px] sm:tracking-[0.22em]">
              Real notes
            </p>
            <p className="font-mono text-[11px] text-fff-white/45">
              Auto-scrolling
            </p>
          </div>

          <div className="relative mt-3 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0f0f0f]/40">
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
              style={{ animation: 'ff-slow-marquee 46s linear infinite' }}
            >
              {[
                'My friends and family can never find my apartment.',
                'My food delivery was left at the wrong building again.',
                'I’m tired of sending instructions to navigate this large building.',
                'I want one link that does the directions for me.',
                'Stop reposting screenshots—make it simple and timed.',
                'Gate codes get lost in chat. This makes it easy.',
              ]
                .concat([
                  'My friends and family can never find my apartment.',
                  'My food delivery was left at the wrong building again.',
                  'I’m tired of sending instructions to navigate this large building.',
                  'I want one link that does the directions for me.',
                  'Stop reposting screenshots—make it simple and timed.',
                  'Gate codes get lost in chat. This makes it easy.',
                ])
                .map((t, idx) => (
                  <div
                    // Using idx for stable keys across duplicates
                    key={idx}
                    className="w-[320px] flex-shrink-0 rounded-xl border border-white/[0.08] bg-[#111] px-4 py-3"
                  >
                    <p className="text-[14px] leading-relaxed text-fff-white/85">
                      {t}
                    </p>
                    <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-fff-green/70">
                      Resident
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-[13px] text-fff-muted sm:py-8 sm:text-sm">
        <span className="text-fff-white/70">FindFoundFast</span>
        <span className="mx-1.5 text-fff-muted/80">·</span>
        <a
          href="https://findfoundfast.com"
          rel="noopener noreferrer"
          className={`text-fff-muted transition-colors hover:text-fff-green ${focusRing} rounded-sm`}
        >
          findfoundfast.com
        </a>
      </footer>
    </div>
  );
}
