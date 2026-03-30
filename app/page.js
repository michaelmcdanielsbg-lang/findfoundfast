import Link from "next/link";

const APP_URL = "https://findfoundfast-final.vercel.app";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-fff-bg">
      {/* Grid + glow — brand green #00FF87 */}
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
          Try app →
        </a>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6 sm:py-20">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-fff-green/25 bg-fff-green/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-fff-green sm:text-xs sm:tracking-[0.2em]">
          FFFliping Cool · No App Required
        </div>

        <h1 className="mb-6 max-w-4xl text-[clamp(2.5rem,10vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          <span className="text-fff-green">Find.</span>
          <br />
          <span className="text-fff-white">Found.</span>
          <br />
          <span className="text-fff-green">Fast.</span>
        </h1>

        <p className="mb-12 max-w-xl font-mono text-sm text-fff-yellow sm:text-base">
          Google Maps for your food & your homies 🗺️
        </p>

        <p className="mb-10 max-w-lg text-[15px] leading-relaxed text-fff-white/55 sm:mb-12 sm:text-lg">
          One link per building. Expires automatically. Gate codes that vanish. Your driver stops guessing and starts arriving.
        </p>

        {/* Primary = product; secondary = story (matches findfoundfast.com intent) */}
        <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
          <a
            href={APP_URL}
            className="inline-flex min-h-[48px] min-w-0 items-center justify-center rounded-lg bg-fff-green px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-bg transition active:opacity-90 sm:px-8 hover:bg-fff-yellow"
          >
            Try it free →
          </a>
          <Link
            href="/how-it-works"
            className="inline-flex min-h-[48px] min-w-0 items-center justify-center rounded-lg border border-white/[0.18] bg-transparent px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-white transition active:bg-white/5 sm:px-8 hover:border-fff-green/50 hover:text-fff-green"
          >
            How it works
          </Link>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-xs text-fff-muted sm:py-8">
        FindFoundFast · findfoundfast.com
      </footer>
    </div>
  );
}
