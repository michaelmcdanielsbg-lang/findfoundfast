import Link from "next/link";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fff-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-fff-surface";

export const metadata = {
  title: "Pricing — FindFoundFast",
  description:
    "$49/month or $490/year per property (2 months free on annual). Unlimited buildings and units inside that property.",
};

export default function PricingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-fff-surface">
      <div
        className="pointer-events-none fixed inset-0 opacity-100"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,135,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <header className="relative z-10 border-b border-fff-border/50 bg-fff-surface/90 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md sm:px-6 sm:py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className={`text-lg font-extrabold tracking-tight text-fff-text-primary transition-colors hover:text-fff-text-primary/90 ${focusRing} rounded-sm`}
        >
          Find<span className="text-fff-accent">Found</span>Fast
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
          <Link
            href="/"
            className={`font-mono text-xs font-bold uppercase tracking-wide text-fff-text-primary/90 transition-colors hover:text-fff-accent sm:text-sm ${focusRing} rounded-sm`}
          >
            Home
          </Link>
          <span className="font-mono text-xs font-bold uppercase tracking-wide text-fff-accent sm:text-sm">
            Pricing
          </span>
          <Link
            href="/how-it-works?tab=manager"
            className={`font-mono text-xs font-bold uppercase tracking-wide text-fff-text-primary/90 transition-colors hover:text-fff-accent sm:text-sm ${focusRing} rounded-sm`}
          >
            How it works
          </Link>
          <Link
            href="/get-started"
            className={`inline-flex min-h-[40px] items-center justify-center rounded-lg bg-fff-accent px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wide text-fff-surface transition-colors hover:bg-fff-accent-warm ${focusRing}`}
          >
            Get started →
          </Link>
        </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 py-8 text-center sm:px-6 sm:py-12 md:py-16">
        <p className="mb-3 font-mono text-fff-eyebrow font-bold uppercase text-fff-green">Pricing</p>
        <h1 className="mb-2 max-w-2xl text-3xl font-extrabold tracking-tight text-fff-white sm:mb-3 sm:text-4xl md:text-5xl">
          Simple per-property pricing
        </h1>
        <p className="mb-5 max-w-xl text-fff-secondary leading-relaxed text-fff-white/75 sm:mb-6">
          Same coverage either way: unlimited buildings and units inside that property.
        </p>

        <div className="mb-6 flex flex-wrap justify-center gap-x-3 gap-y-1.5 font-mono text-fff-eyebrow font-bold uppercase text-fff-white/55 sm:mb-8 sm:gap-x-4">
          <span>No driver app</span>
          <span className="text-fff-white/25">·</span>
          <span>Codes expire</span>
          <span className="text-fff-white/25">·</span>
          <span>Unlimited buildings &amp; units</span>
        </div>

        <div className="mb-8 w-full max-w-md rounded-2xl border border-white/[0.1] bg-white/[0.03] px-5 py-4 text-left sm:mb-10 sm:max-w-lg sm:py-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-fff-green">
            After you sign up
          </p>
          <ol className="list-decimal space-y-2 pl-5 text-fff-secondary leading-relaxed text-fff-white/78">
            <li>We email you to confirm details and billing.</li>
            <li>You add your building profile + key photos (and you can add more).</li>
            <li>Residents get codes; drivers tap timed links—no app.</li>
          </ol>
        </div>

        <div className="mb-8 grid w-full max-w-3xl gap-4 sm:mb-10 sm:grid-cols-2 sm:gap-5">
          <div className="relative rounded-2xl border border-fff-green/35 bg-fff-green/[0.08] px-5 py-6 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-fff-green/20 sm:px-6 sm:py-8">
            <span className="mb-3 inline-block rounded-full bg-fff-yellow px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-fff-bg">
              Best value — save $98/yr
            </span>
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-fff-green">Pay once per year</p>
            <p className="font-sans text-4xl font-extrabold tabular-nums tracking-tight text-fff-green sm:text-[2.75rem]">
              $490<span className="text-xl font-bold text-fff-white/85 sm:text-2xl">/yr</span>
            </p>
            <p className="mt-1 text-sm text-fff-white/75">per property · about $41/mo when you average it out</p>

            <div className="mt-6 space-y-3 rounded-xl border border-white/[0.1] bg-fff-bg/50 px-4 py-4">
              <div className="flex items-baseline justify-between gap-3 text-fff-secondary">
                <span className="text-fff-white/65">12 months at $49/mo</span>
                <span className="font-mono tabular-nums text-fff-white/45 line-through decoration-fff-white/35">$588</span>
              </div>
              <div className="flex items-baseline justify-between gap-3 text-fff-secondary">
                <span className="font-medium text-fff-white">Annual price (same 12 months)</span>
                <span className="font-mono text-xl font-bold tabular-nums text-fff-green">$490</span>
              </div>
              <div className="border-t border-fff-green/25 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold uppercase tracking-wide text-fff-yellow">You save</span>
                  <span className="font-sans text-2xl font-extrabold text-fff-yellow">$98</span>
                </div>
                <p className="mt-2 text-xs leading-snug text-fff-white/60">
                  Same as &ldquo;2 months free&rdquo;—you only pay for 10 months, you get a full year.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] px-5 py-6 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:px-6 sm:py-8">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-fff-white/55">Billed monthly</p>
            <p className="font-sans text-4xl font-extrabold tabular-nums tracking-tight text-fff-green sm:text-[2.75rem]">
              $49<span className="text-xl font-bold text-fff-white/85 sm:text-2xl">/mo</span>
            </p>
            <p className="mt-2 text-sm font-semibold text-fff-white sm:text-base">per property</p>
            <p className="mt-5 text-fff-secondary leading-relaxed text-fff-white/72">
              Start with $49/month per property. Cancel or adjust anytime.
            </p>
          </div>
        </div>
        <Link
          href="/get-started"
          className={`inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fff-green px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-bg transition-colors hover:bg-fff-yellow ${focusRing}`}
        >
          Get started →
        </Link>
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-fff-white/55">
          Submit the short form—we’ll confirm monthly vs annual and get you live.
        </p>
        <p className="mt-4">
          <Link
            href="/how-it-works?tab=manager"
            className={`text-sm text-fff-white/65 underline-offset-4 transition-colors hover:text-fff-green ${focusRing} rounded-sm`}
          >
            See how it works →
          </Link>
        </p>
        <p className="mt-8">
          <Link href="/" className={`text-sm text-fff-white/70 underline-offset-4 transition-colors hover:text-fff-green ${focusRing} rounded-sm`}>
            ← Back to home
          </Link>
        </p>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-fff-micro text-fff-muted sm:py-8 sm:text-sm">
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
