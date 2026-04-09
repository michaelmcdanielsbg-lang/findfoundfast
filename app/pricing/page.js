'use client';
import { useState } from 'react';
import Link from 'next/link';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-fff-bg';

export default function PricingPage() {
  const [mode, setMode] = useState('personal'); // 'personal' | 'property'

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-fff-bg text-fff-text-primary antialiased">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[min(55vh,480px)]"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% -5%, rgba(0,255,135,0.07), transparent 55%)',
        }}
      />

      {/* ── Header ── */}
      <header className="relative z-10 border-b border-fff-border bg-fff-bg/90 backdrop-blur-xl">
        <div className="flex flex-col gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <Link href="/" className={`text-lg font-extrabold tracking-tight text-fff-text-primary transition-colors hover:text-fff-text-primary ${focusRing} rounded-sm`}>
            Find<span className="text-[#00c46f]">Found</span>Fast
          </Link>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
            <Link href="/" className={`font-mono text-sm font-bold uppercase tracking-wide text-fff-text-secondary transition-colors hover:text-fff-text-primary ${focusRing} rounded-sm`}>Home</Link>
            <span className="font-mono text-sm font-bold uppercase tracking-wide text-emerald-400">Pricing</span>
            <Link href="/how-it-works" className={`font-mono text-sm font-bold uppercase tracking-wide text-fff-text-secondary transition-colors hover:text-fff-text-primary ${focusRing} rounded-sm`}>How it works</Link>
            <Link href="/get-started" className={`inline-flex min-h-[40px] items-center justify-center rounded-lg bg-fff-green px-4 py-2 font-mono text-fff-eyebrow font-bold uppercase text-fff-bg shadow-sm transition-colors hover:bg-[#00e67a] ${focusRing}`}>
              Get started →
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 py-10 sm:px-6 sm:py-14 md:py-16">

        {/* ── Title ── */}
        <p className="mb-3 font-mono text-fff-eyebrow font-bold uppercase text-emerald-400">Pricing</p>
        <h1 className="mb-3 max-w-2xl text-center text-3xl font-extrabold tracking-tight text-fff-text-primary sm:text-4xl md:text-5xl">
          Start free. Pay only when it fits.
        </h1>
        <p className="mb-8 max-w-lg text-center text-fff-secondary leading-relaxed text-fff-text-secondary">
          Whether you are sending your first delivery link or guiding arrivals across a 500-unit property — there is a plan that fits.
        </p>

        {/* ── Toggle ── */}
        <div className="mb-10 flex items-center gap-1 rounded-2xl border border-fff-border bg-fff-card p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setMode('personal')}
            className={`rounded-xl px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-wide transition-all ${
              mode === 'personal'
                ? 'bg-fff-green text-fff-bg shadow-sm'
                : 'text-fff-muted hover:text-fff-text-primary'
            }`}
          >
            🙋 Just me
          </button>
          <button
            type="button"
            onClick={() => setMode('property')}
            className={`rounded-xl px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-wide transition-all ${
              mode === 'property'
                ? 'bg-fff-green text-fff-bg shadow-sm'
                : 'text-fff-muted hover:text-fff-text-primary'
            }`}
          >
            🏢 My property
          </button>
        </div>

        {/* ══════════════════════════════════════════════════ */}
        {/* PERSONAL / B2C PRICING                            */}
        {/* ══════════════════════════════════════════════════ */}
        {mode === 'personal' && (
          <div className="w-full max-w-4xl">
            <p className="mb-6 text-center text-fff-caption text-fff-text-secondary">
              No property manager needed. Sign up, upload your photos, get your personal link.
            </p>

            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">

              {/* Free tier */}
              <div className="flex flex-col rounded-2xl border border-fff-border bg-fff-card px-5 py-6 shadow-sm sm:px-6 sm:py-7">
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">Free</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight text-fff-text-primary">$0</span>
                </div>
                <p className="mt-1 text-fff-caption text-fff-text-secondary">forever</p>
                <p className="mt-4 text-fff-caption leading-relaxed text-fff-text-secondary">
                  Try it out. Perfect for occasional deliveries or one-time guests.
                </p>
                <ul className="mt-5 flex flex-col gap-2.5 text-fff-caption text-fff-text-secondary">
                  {[
                    'Timed links — 15 or 30 min',
                    'Up to 3 photos',
                    'Share via text or DM',
                    'No credit card needed',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-500 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Link
                    href="/get-started"
                    className={`inline-flex w-full items-center justify-center rounded-lg border border-fff-border bg-fff-card min-h-[44px] py-3 font-mono text-sm font-bold uppercase tracking-wide text-fff-text-primary shadow-sm transition-colors hover:border-emerald-500 hover:text-emerald-300 ${focusRing}`}
                  >
                    Start free →
                  </Link>
                </div>
              </div>

              {/* Personal Guide — featured */}
              <div className="relative flex flex-col rounded-2xl border-2 border-emerald-500/50 bg-emerald-950/35 px-5 py-6 shadow-md sm:px-6 sm:py-7">
                <span className="mb-3 inline-block self-start rounded-full bg-fff-yellow px-2.5 py-1 font-mono text-fff-eyebrow font-bold uppercase text-fff-bg">
                  Most popular
                </span>
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-400">Personal guide</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight text-fff-text-primary">$4.99</span>
                  <span className="text-lg font-bold text-fff-text-secondary">/mo</span>
                </div>
                <p className="mt-1 text-fff-caption text-fff-text-secondary">or $47.88/yr — 20% off</p>
                <p className="mt-4 text-fff-caption leading-relaxed text-fff-text-secondary">
                  For heavy delivery users, Airbnb hosts, and anyone tired of giving the same directions.
                </p>
                <ul className="mt-5 flex flex-col gap-2.5 text-fff-caption text-fff-text-secondary">
                  {[
                    'Permanent link — never expires',
                    '5 links for 5 locations',
                    'Unlimited photos per location',
                    'Add gate and door codes',
                    'Update photos or codes anytime',
                    'Your own URL: findfoundfast.com/r/you',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-600 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Link
                    href="/get-started"
                    className={`inline-flex w-full items-center justify-center rounded-lg bg-fff-green min-h-[44px] py-3 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg shadow-sm transition-colors hover:bg-[#00e67a] ${focusRing}`}
                  >
                    Get personal guide →
                  </Link>
                </div>
              </div>

              {/* One-Time */}
              <div className="flex flex-col rounded-2xl border border-fff-border bg-fff-card px-5 py-6 shadow-sm sm:px-6 sm:py-7">
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">One-time</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight text-fff-text-primary">$9.99</span>
                </div>
                <p className="mt-1 text-fff-caption text-fff-text-secondary">pay once, yours forever</p>
                <p className="mt-4 text-fff-caption leading-relaxed text-fff-text-secondary">
                  One permanent link for one location. No subscription, no monthly fee — ever.
                </p>
                <ul className="mt-5 flex flex-col gap-2.5 text-fff-caption text-fff-text-secondary">
                  {[
                    '1 permanent link forever',
                    '1 location',
                    'Unlimited photos',
                    'Add gate and door codes',
                    'No monthly fee — ever',
                    'Perfect for Airbnb hosts',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-500 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Link
                    href="/get-started"
                    className={`inline-flex w-full items-center justify-center rounded-lg border border-fff-border bg-fff-card min-h-[44px] py-3 font-mono text-sm font-bold uppercase tracking-wide text-fff-text-primary shadow-sm transition-colors hover:border-emerald-500 hover:text-emerald-300 ${focusRing}`}
                  >
                    Buy once →
                  </Link>
                </div>
              </div>
            </div>

            {/* Perfect for callout */}
            <div className="mt-10 rounded-2xl border border-fff-border bg-fff-card p-6 sm:p-8">
              <p className="mb-5 text-center font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">Perfect for</p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {[
                  { emoji: '🛵', label: 'Heavy delivery users', desc: 'DoorDash, Uber Eats, Amazon. Paste your link once — done forever.' },
                  { emoji: '🏡', label: 'Airbnb hosts', desc: 'Send guests a photo guide instead of a wall of check-in text.' },
                  { emoji: '🏢', label: 'Hard-to-find apartments', desc: 'Stop explaining the same directions to every person every week.' },
                  { emoji: '🎉', label: 'Party hosts', desc: 'One link in the invite. Everyone finds the place.' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-2 rounded-xl border border-fff-border bg-fff-bg p-4">
                    <span className="text-xl">{item.emoji}</span>
                    <p className="font-bold text-fff-text-primary text-fff-caption">{item.label}</p>
                    <p className="text-fff-eyebrow leading-relaxed text-fff-text-secondary">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-fff-caption text-fff-text-secondary">
              Not sure which plan?{' '}
              <Link href="/how-it-works?audience=personal" className="text-emerald-400 underline-offset-2 hover:underline">
                See how it works for individuals →
              </Link>
            </p>
          </div>
        )}

        {/* ══════════════════════════════════════════════════ */}
        {/* PROPERTY / B2B PRICING                            */}
        {/* ══════════════════════════════════════════════════ */}
        {mode === 'property' && (
          <div className="w-full max-w-3xl">
            <p className="mb-6 text-center text-fff-caption text-fff-text-secondary">
              One price per property. Unlimited buildings, units, and residents inside it.
            </p>

            <div className="mb-5 flex flex-wrap justify-center gap-x-4 gap-y-1.5 font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">
              <span>No driver app</span>
              <span className="text-fff-muted">·</span>
              <span>Codes expire automatically</span>
              <span className="text-fff-muted">·</span>
              <span>Unlimited buildings and units</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">

              {/* Annual — featured */}
              <div className="relative flex flex-col rounded-2xl border-2 border-emerald-500/50 bg-emerald-950/35 px-5 py-6 shadow-md sm:px-6 sm:py-8">
                <span className="mb-3 inline-block self-start rounded-full bg-fff-yellow px-2.5 py-1 font-mono text-fff-eyebrow font-bold uppercase text-fff-bg">
                  Best value — save $98/yr
                </span>
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-400">Pay once per year</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight text-fff-green sm:text-[2.75rem]">$490</span>
                  <span className="text-xl font-bold text-fff-text-secondary">/yr</span>
                </div>
                <p className="mt-1 text-fff-caption text-fff-text-secondary">per property · about $41/mo</p>

                <div className="mt-6 space-y-3 rounded-xl border border-fff-border bg-fff-surface-subtle/90 px-4 py-4">
                  <div className="flex items-baseline justify-between gap-3 text-fff-caption">
                    <span className="text-fff-text-secondary">12 months at $49/mo</span>
                    <span className="font-mono tabular-nums text-fff-muted line-through">$588</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 text-fff-caption">
                    <span className="font-medium text-fff-text-primary">Annual price</span>
                    <span className="font-mono text-xl font-bold tabular-nums text-fff-green">$490</span>
                  </div>
                  <div className="border-t border-emerald-500/30 pt-3 flex items-center justify-between">
                    <span className="text-fff-caption font-semibold uppercase tracking-wide text-amber-400">You save</span>
                    <span className="text-2xl font-extrabold text-amber-400">$98</span>
                  </div>
                </div>

                <ul className="mt-5 flex flex-col gap-2.5 text-fff-caption text-fff-text-secondary">
                  {[
                    'Unlimited buildings and units',
                    'One permanent link per building',
                    'Resident portal included',
                    'Timed links with expiring codes',
                    'Photo guide with arrows',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-600 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Link
                    href="/get-started"
                    className={`inline-flex w-full min-h-[44px] items-center justify-center rounded-lg bg-fff-green py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg shadow-sm transition-colors hover:bg-[#00e67a] ${focusRing}`}
                  >
                    Get started →
                  </Link>
                </div>
              </div>

              {/* Monthly */}
              <div className="flex flex-col rounded-2xl border border-fff-border bg-fff-card px-5 py-6 shadow-sm sm:px-6 sm:py-8">
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">Billed monthly</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight text-fff-green sm:text-[2.75rem]">$49</span>
                  <span className="text-xl font-bold text-fff-text-secondary">/mo</span>
                </div>
                <p className="mt-1 text-fff-caption text-fff-text-secondary">per property · cancel anytime</p>
                <p className="mt-5 text-fff-secondary leading-relaxed text-fff-text-secondary">
                  Start with one property and scale from there. No contracts, no setup fees.
                </p>

                <ul className="mt-5 flex flex-col gap-2.5 text-fff-caption text-fff-text-secondary">
                  {[
                    'Unlimited buildings and units',
                    'One permanent link per building',
                    'Resident portal included',
                    'Timed links with expiring codes',
                    'Photo guide with arrows',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-500 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Link
                    href="/get-started"
                    className={`inline-flex w-full items-center justify-center rounded-lg border border-fff-border bg-fff-card py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-text-primary shadow-sm transition-colors hover:border-emerald-500 hover:text-emerald-300 ${focusRing}`}
                  >
                    Start monthly →
                  </Link>
                </div>
              </div>
            </div>

            {/* Campus callout */}
            <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-950/40 p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-fff-eyebrow font-bold uppercase text-blue-400">College campus plan</p>
                  <p className="mt-1 font-bold text-fff-text-primary">Multiple buildings, events, graduation, permanent public links</p>
                  <p className="mt-1 text-fff-caption text-fff-text-secondary">Pricing based on campus size — let's talk.</p>
                </div>
                <Link
                  href="/get-started"
                  className={`inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-mono text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-blue-700 ${focusRing}`}
                >
                  Talk to us →
                </Link>
              </div>
            </div>

            <p className="mt-6 text-center text-fff-caption text-fff-text-secondary">
              Submit the form — we will confirm monthly vs annual and get you live.
            </p>
          </div>
        )}

        {/* ── FAQ strip ── */}
        <div className="mt-12 w-full max-w-2xl">
          <p className="mb-5 text-center font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">Common questions</p>
          <div className="flex flex-col divide-y divide-fff-border rounded-2xl border border-fff-border bg-fff-card shadow-sm">
            {[
              { q: 'Can I switch between plans?', a: 'Yes — upgrade, downgrade, or cancel anytime. No penalties.' },
              { q: 'Do drivers need an account?', a: 'Never. Drivers and guests just tap the link in their browser. No app, no login, no friction.' },
              { q: 'What happens when a timed link expires?', a: 'The gate codes vanish and the link stops working. No stale screenshots floating around.' },
              { q: 'Can I update my photos and codes?', a: 'Yes, anytime on Personal Guide or any property plan. Your link stays the same — only the content updates.' },
              { q: 'What is the difference between timed and permanent links?', a: 'Timed links expire after 15, 30, or 60 minutes — great when you want the code to disappear after a delivery. Permanent links stay live forever — great for Airbnb, your apartment entrance, or a campus website.' },
            ].map((item, i) => (
              <div key={i} className="px-5 py-4 sm:px-6">
                <p className="font-semibold text-fff-text-primary text-fff-caption">{item.q}</p>
                <p className="mt-1 text-fff-caption text-fff-text-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/get-started" className={`inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fff-green px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg shadow-sm transition-colors hover:bg-[#00e67a] ${focusRing}`}>
            Get started →
          </Link>
          <Link href="/" className={`text-fff-caption text-fff-text-secondary underline-offset-4 transition-colors hover:text-emerald-400 ${focusRing} rounded-sm`}>
            ← Back to home
          </Link>
        </div>
      </main>

      <footer className="relative z-10 border-t border-fff-border py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-fff-micro text-fff-text-secondary sm:py-8">
        <span className="text-fff-text-secondary">FindFoundFast</span>
        <span className="mx-1.5 text-fff-muted">·</span>
        <a href="https://findfoundfast.com" rel="noopener noreferrer" className={`text-fff-text-secondary transition-colors hover:text-emerald-400 ${focusRing} rounded-sm`}>
          findfoundfast.com
        </a>
      </footer>
    </div>
  );
}
