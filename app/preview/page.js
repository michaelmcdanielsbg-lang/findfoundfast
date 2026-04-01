import Link from 'next/link';

/** Aligned with main marketing: stone-50 canvas, white chrome, brand green CTAs */
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50';

export const metadata = {
  title: 'FindFoundFast — Preview (professional layout)',
  description:
    'Maps stop at the address; FindFoundFast gives guests one timed link with photos and expiring codes to reach the right door.',
};

function IconBuilding(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={props.className} aria-hidden>
      <path d="M3 21h18M5 21V7l7-4v18M12 21V3m0 0L5 7m7-4l7 4v14M9 9h.01M9 13h.01M15 9h.01M15 13h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLink(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={props.className} aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTimer(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={props.className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconShield(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={props.className} aria-hidden>
      <path d="M12 3l8 4v5c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V7l8-4z" strokeLinejoin="round" />
    </svg>
  );
}

export default function PreviewProfessionalPage() {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-stone-50 text-stone-900 antialiased">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[min(55vh,480px)] opacity-100"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 75% 55% at 50% -5%, rgba(0,255,135,0.07), transparent 55%)',
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

      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 md:pt-24">
          <p className="text-center font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 sm:text-xs">
            Operations &amp; property management
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.12] tracking-tight text-stone-900">
            Give every arrival a clear path from curb to door
          </h1>
          <div className="mx-auto mt-8 max-w-xl space-y-6 text-center">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500 sm:text-xs">Problem</p>
              <p className="mt-2 text-[17px] leading-relaxed text-stone-600 md:text-lg">
                Map apps stop at the street address—guests still guess parking, gates, and which path to take inside the property.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700 sm:text-xs">Solution</p>
              <p className="mt-2 text-[17px] leading-relaxed text-stone-600 md:text-lg">
                One timed link shows your approved route: photos, short directions, and access codes that expire when the visit should. No driver app.
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/get-started"
              className={`inline-flex min-h-[48px] w-full min-w-[200px] items-center justify-center rounded-lg bg-fff-green px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-bg shadow-sm shadow-emerald-900/10 transition-colors hover:bg-[#00e67a] sm:w-auto ${focusRing}`}
            >
              Get started →
            </Link>
            <Link
              href="/how-it-works?tab=manager"
              className={`inline-flex min-h-[48px] w-full min-w-[200px] items-center justify-center rounded-lg border border-stone-300 bg-white px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-stone-800 shadow-sm transition-colors hover:border-emerald-400 hover:text-emerald-800 sm:w-auto ${focusRing}`}
            >
              How it works
            </Link>
          </div>
          <p className="mt-8 text-center text-sm text-stone-500">No guest app · Works in any browser · Codes expire automatically</p>
        </section>

        <section className="border-y border-stone-200 bg-white py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-stone-400 sm:text-xs">Designed for</p>
            <p className="mt-3 text-center text-sm font-medium text-stone-600 md:text-base">
              Multifamily · Senior living · Student housing · Medical campuses · Corporate campuses · Hospitality
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">Why teams standardize on FindFoundFast</h2>
            <p className="mt-3 text-stone-600">Reduce failed deliveries, lobby congestion, and repeated “where are you?” calls—without handing out permanent codes.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: IconBuilding,
                title: 'One building profile',
                body: 'Parking, entrance, lobby, elevator—documented once. Residents share timed links; you keep control of what’s shown.',
              },
              {
                icon: IconLink,
                title: 'Single link per request',
                body: 'Residents generate a link with a chosen duration. Drivers tap once—no app install, no new accounts.',
              },
              {
                icon: IconTimer,
                title: 'Codes that expire',
                body: 'When the timer ends, sensitive codes disappear. Less screenshot drift and fewer outdated instructions in group chats.',
              },
            ].map((item) => {
              const FeatureIcon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <FeatureIcon className="h-8 w-8 text-emerald-700" />
                  <h3 className="mt-4 text-lg font-semibold text-stone-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-t border-stone-200 bg-stone-100/50 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-rose-600 sm:text-xs">The gap</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">Maps stop at the address</h2>
              <p className="mt-4 leading-relaxed text-stone-600">
                Navigation apps deliver people to the building—not the right entrance, parking level, or gate. That gap becomes your front desk’s problem, the resident’s texts, and the carrier’s failed delivery.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs">The standard</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">A guided path, every time</h2>
              <p className="mt-4 leading-relaxed text-stone-600">
                FindFoundFast turns your approved route into a shareable, time-bound experience: photos, short directions, and codes that match your access policy—presented consistently for every arrival.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="flex flex-col gap-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-8 md:flex-row md:items-center md:gap-10 md:p-10">
            <IconShield className="h-12 w-12 shrink-0 text-emerald-700 md:h-14 md:w-14" />
            <div>
              <h2 className="text-xl font-extrabold text-stone-900 md:text-2xl">Built for operational reality</h2>
              <p className="mt-2 text-stone-600">
                Timed links reduce stale instructions in the wild. Pair with your existing access and vendor policies—your team defines what’s shown; residents distribute within the window you support.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 bg-white py-20 md:py-24" id="pricing">
          <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">Simple per-property pricing</h2>
            <p className="mt-2 text-stone-500">Unlimited buildings and units within that property.</p>
            <div className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-8 shadow-sm">
              <p className="font-mono text-sm font-bold uppercase tracking-wide text-emerald-700">Starting at</p>
              <p className="mt-2 text-5xl font-extrabold tabular-nums tracking-tight text-stone-900 md:text-6xl">
                $49<span className="text-2xl font-bold text-stone-500">/mo</span>
              </p>
              <p className="mt-2 text-sm text-stone-500">per property · annual plans available</p>
              <Link
                href="/pricing"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-lg border border-stone-300 bg-white py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-stone-800 shadow-sm transition-colors hover:border-emerald-400 hover:text-emerald-800 ${focusRing}`}
              >
                View full pricing
              </Link>
              <Link
                href="/get-started"
                className={`mt-3 inline-flex w-full items-center justify-center rounded-lg bg-fff-green py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-bg shadow-sm shadow-emerald-900/10 transition-colors hover:bg-[#00e67a] ${focusRing}`}
              >
                Get started →
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 bg-stone-50 py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="text-xl font-extrabold text-stone-900 md:text-2xl">See if FindFoundFast fits your portfolio</h2>
            <p className="mt-2 text-sm text-stone-500">We’ll walk through setup, resident flow, and how timed links align with your policies.</p>
            <Link
              href="/get-started"
              className={`mt-8 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fff-green px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-bg shadow-sm shadow-emerald-900/10 transition-colors hover:bg-[#00e67a] ${focusRing}`}
            >
              Get started →
            </Link>
            <p className="mt-6">
              <Link href="/" className={`text-sm text-stone-600 underline-offset-4 transition-colors hover:text-emerald-700 ${focusRing} rounded-sm`}>
                ← Home
              </Link>
            </p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-stone-200 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-fff-micro text-stone-500 sm:py-8 sm:text-sm">
        <span className="text-stone-700">FindFoundFast</span>
        <span className="mx-1.5 text-stone-400">·</span>
        <a href="https://findfoundfast.com" rel="noopener noreferrer" className={`transition-colors hover:text-emerald-700 ${focusRing} rounded-sm`}>
          findfoundfast.com
        </a>
      </footer>
    </div>
  );
}
