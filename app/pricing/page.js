import Link from "next/link";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50";

export const metadata = {
  title: "Pricing — FindFoundFast",
  description:
    "$49/month or $490/year per property (2 months free on annual). Unlimited buildings and units inside that property.",
};

export default function PricingPage() {
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
              href="/"
              className={`font-mono text-xs font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 sm:text-sm ${focusRing} rounded-sm`}
            >
              Home
            </Link>
            <span className="font-mono text-xs font-bold uppercase tracking-wide text-emerald-700 sm:text-sm">
              Pricing
            </span>
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

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 py-8 text-center sm:px-6 sm:py-12 md:py-16">
        <p className="mb-3 font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">Pricing</p>
        <h1 className="mb-2 max-w-2xl text-3xl font-extrabold tracking-tight text-stone-900 sm:mb-3 sm:text-4xl md:text-5xl">
          Simple per-property pricing
        </h1>
        <p className="mb-5 max-w-xl text-fff-secondary leading-relaxed text-stone-600 sm:mb-6">
          Same coverage either way: unlimited buildings and units inside that property.
        </p>

        <div className="mb-6 flex flex-wrap justify-center gap-x-3 gap-y-1.5 font-mono text-fff-eyebrow font-bold uppercase text-stone-500 sm:mb-8 sm:gap-x-4">
          <span>No driver app</span>
          <span className="text-stone-300">·</span>
          <span>Codes expire</span>
          <span className="text-stone-300">·</span>
          <span>Unlimited buildings &amp; units</span>
        </div>

        <div className="mb-8 w-full max-w-md rounded-2xl border border-stone-200 bg-white px-5 py-4 text-left shadow-sm sm:mb-10 sm:max-w-lg sm:py-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
            After you sign up
          </p>
          <ol className="list-decimal space-y-2 pl-5 text-fff-secondary leading-relaxed text-stone-700">
            <li>We email you to confirm details and billing.</li>
            <li>You add your building profile + key photos (and you can add more).</li>
            <li>Residents get codes; drivers tap timed links—no app.</li>
          </ol>
        </div>

        <div className="mb-8 grid w-full max-w-3xl gap-4 sm:mb-10 sm:grid-cols-2 sm:gap-5">
          <div className="relative rounded-2xl border border-emerald-300/80 bg-emerald-50 px-5 py-6 text-left shadow-sm ring-1 ring-emerald-200/60 sm:px-6 sm:py-8">
            <span className="mb-3 inline-block rounded-full bg-fff-yellow px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-fff-bg">
              Best value — save $98/yr
            </span>
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
              Pay once per year
            </p>
            <p className="font-sans text-4xl font-extrabold tabular-nums tracking-tight text-fff-green sm:text-[2.75rem]">
              $490<span className="text-xl font-bold text-stone-600 sm:text-2xl">/yr</span>
            </p>
            <p className="mt-1 text-sm text-stone-600">per property · about $41/mo when you average it out</p>

            <div className="mt-6 space-y-3 rounded-xl border border-stone-200 bg-white/80 px-4 py-4">
              <div className="flex items-baseline justify-between gap-3 text-fff-secondary">
                <span className="text-stone-600">12 months at $49/mo</span>
                <span className="font-mono tabular-nums text-stone-400 line-through decoration-stone-300">
                  $588
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3 text-fff-secondary">
                <span className="font-medium text-stone-900">Annual price (same 12 months)</span>
                <span className="font-mono text-xl font-bold tabular-nums text-fff-green">$490</span>
              </div>
              <div className="border-t border-emerald-200 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold uppercase tracking-wide text-amber-800">You save</span>
                  <span className="font-sans text-2xl font-extrabold text-amber-700">$98</span>
                </div>
                <p className="mt-2 text-xs leading-snug text-stone-500">
                  Same as &ldquo;2 months free&rdquo;—you only pay for 10 months, you get a full year.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white px-5 py-6 text-left shadow-sm sm:px-6 sm:py-8">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
              Billed monthly
            </p>
            <p className="font-sans text-4xl font-extrabold tabular-nums tracking-tight text-fff-green sm:text-[2.75rem]">
              $49<span className="text-xl font-bold text-stone-600 sm:text-2xl">/mo</span>
            </p>
            <p className="mt-2 text-sm font-semibold text-stone-900 sm:text-base">per property</p>
            <p className="mt-5 text-fff-secondary leading-relaxed text-stone-600">
              Start with $49/month per property. Cancel or adjust anytime.
            </p>
          </div>
        </div>
        <Link
          href="/get-started"
          className={`inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fff-green px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-bg shadow-sm shadow-emerald-900/10 transition-colors hover:bg-[#00e67a] ${focusRing}`}
        >
          Get started →
        </Link>
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-stone-500">
          Submit the short form—we’ll confirm monthly vs annual and get you live.
        </p>
        <p className="mt-4">
          <Link
            href="/how-it-works?tab=manager"
            className={`text-sm text-stone-600 underline-offset-4 transition-colors hover:text-emerald-700 ${focusRing} rounded-sm`}
          >
            See how it works →
          </Link>
        </p>
        <p className="mt-8">
          <Link
            href="/"
            className={`text-sm text-stone-600 underline-offset-4 transition-colors hover:text-emerald-700 ${focusRing} rounded-sm`}
          >
            ← Back to home
          </Link>
        </p>
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
