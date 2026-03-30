import Link from "next/link";

const APP_URL = "https://findfoundfast-final.vercel.app";

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

      <header className="relative z-10 flex items-center justify-between border-b border-white/[0.08] bg-fff-bg/90 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md sm:px-6 sm:py-4">
        <div className="text-lg font-extrabold tracking-tight text-fff-white">
          Find<span className="text-fff-green">Found</span>Fast
        </div>
        <a
          href={APP_URL}
          className="font-mono text-sm font-bold uppercase tracking-wide text-fff-green transition hover:text-fff-yellow"
        >
          Try it free →
        </a>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fff-green/25 bg-fff-green/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-fff-green sm:mb-8 sm:text-xs sm:tracking-[0.2em]">
          FFFliping Cool · No App Required
        </div>

        <h1 className="mb-5 max-w-4xl text-[clamp(2.5rem,10vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight sm:mb-6 sm:text-6xl md:text-7xl">
          <span className="text-fff-green">Find.</span>
          <br />
          <span className="text-fff-white">Found.</span>
          <br />
          <span className="text-fff-green">Fast.</span>
        </h1>

        <p className="mb-6 max-w-md font-mono text-sm leading-snug text-fff-yellow sm:mb-8 sm:text-base">
          Google Maps for your food & your homies — and for every building tired of the &quot;I&apos;m outside&quot; loop.
        </p>

        {/* Problem + concept — speaks to property / ops without a long scroll */}
        <div className="mb-6 max-w-lg space-y-3 text-[15px] leading-relaxed text-fff-white/60 sm:mb-8 sm:text-base">
          <p>
            <span className="text-fff-white/85">The problem:</span> Drivers and guests stall at gates and lobbies;
            residents fire off directions and codes that get screenshot-shared forever.
          </p>
          <p>
            <span className="text-fff-green">The idea:</span> One timed link per building—your step-by-step photos
            and gate codes that expire when the timer ends.{' '}
            <span className="text-fff-white/70">No app for whoever&apos;s walking in.</span>
          </p>
        </div>

        <p className="mb-8 max-w-md font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-fff-muted sm:mb-10 sm:text-[11px] sm:tracking-[0.22em]">
          Property & ops teams · multifamily · offices · hotels · hospitals · homes
        </p>

        <div className="flex w-full max-w-md flex-col items-center gap-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-5">
          <a
            href={APP_URL}
            className="inline-flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-lg bg-fff-green px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-bg transition active:opacity-90 sm:w-auto sm:px-8 hover:bg-fff-yellow"
          >
            Try it free →
          </a>
          <div className="flex w-full flex-col items-center gap-1.5 sm:w-auto">
            <Link
              href="/how-it-works?tab=manager"
              className="inline-flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-lg border border-white/[0.18] bg-transparent px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-white transition active:bg-white/5 sm:w-auto sm:min-w-[200px] sm:px-8 hover:border-fff-green/50 hover:text-fff-green"
            >
              How it works
            </Link>
            <span className="font-mono text-[10px] text-fff-muted">
              Property manager → resident → driver · ~2 min
            </span>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-xs text-fff-muted sm:py-8">
        FindFoundFast · findfoundfast.com
      </footer>
    </div>
  );
}
