import Link from 'next/link';

const ring =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fff-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-fff-surface';

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
    <div className="min-h-[100dvh] bg-fff-surface text-fff-text-primary">
      {/* Accent wash — low saturation so UI stays calm (green = action, not wallpaper) */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[min(60vh,520px)] opacity-100"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,255,135,0.055), transparent 58%)',
        }}
      />

      <header className="relative z-20 border-b border-fff-border/55 bg-fff-surface/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/preview" className={`text-[17px] font-semibold tracking-tight text-fff-text-primary ${ring} rounded`}>
            Find<span className="text-fff-accent">Found</span>Fast
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-fff-text-secondary sm:flex">
            <Link href="/pricing" className={`transition hover:text-fff-text-primary ${ring} rounded`}>
              Pricing
            </Link>
            <Link href="/how-it-works?tab=manager" className={`transition hover:text-fff-text-primary ${ring} rounded`}>
              Product tour
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className={`hidden text-xs font-medium text-fff-text-muted underline-offset-4 hover:text-fff-text-primary sm:inline ${ring} rounded`}
            >
              Current site
            </Link>
            <Link
              href="/get-started"
              className={`inline-flex min-h-[40px] items-center justify-center rounded-lg bg-fff-accent px-4 py-2 text-sm font-semibold text-fff-surface shadow-sm shadow-fff-accent/15 transition hover:bg-fff-accent/92 ${ring}`}
            >
              Request access
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 md:pt-24">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-fff-accent/85">Operations &amp; property management</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-fff-text-primary">
            Give every arrival a clear path from curb to door
          </h1>
          <div className="mx-auto mt-8 max-w-xl space-y-6 text-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fff-text-muted">Problem</p>
              <p className="mt-2 text-[17px] leading-relaxed text-fff-text-secondary md:text-lg">
                Map apps stop at the street address—guests still guess parking, gates, and which path to take inside the property.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fff-accent">Solution</p>
              <p className="mt-2 text-[17px] leading-relaxed text-fff-text-secondary md:text-lg">
                One timed link shows your approved route: photos, short directions, and access codes that expire when the visit should. No driver app.
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/get-started"
              className={`inline-flex min-h-[48px] w-full min-w-[200px] items-center justify-center rounded-lg bg-fff-accent px-8 py-3 text-sm font-semibold text-fff-surface shadow-lg shadow-fff-accent/12 transition hover:bg-fff-accent/92 sm:w-auto ${ring}`}
            >
              Schedule onboarding
            </Link>
            <Link
              href="/how-it-works?tab=manager"
              className={`inline-flex min-h-[48px] w-full min-w-[200px] items-center justify-center rounded-lg border border-fff-border/70 bg-fff-surface-elevated/40 px-8 py-3 text-sm font-semibold text-fff-text-primary transition hover:border-fff-border hover:bg-fff-surface-elevated/70 sm:w-auto ${ring}`}
            >
              View product tour
            </Link>
          </div>
          <p className="mt-8 text-center text-sm text-fff-text-muted">No guest app · Works in any browser · Codes expire automatically</p>
        </section>

        {/* Trust strip */}
        <section className="border-y border-fff-border/45 bg-fff-surface-elevated/35 py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-fff-text-muted">Designed for</p>
            <p className="mt-3 text-center text-sm font-medium text-fff-text-secondary md:text-base">
              Multifamily · Senior living · Student housing · Medical campuses · Corporate campuses · Hospitality
            </p>
          </div>
        </section>

        {/* Value props */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-fff-text-primary md:text-3xl">Why teams standardize on FindFoundFast</h2>
            <p className="mt-3 text-fff-text-secondary">Reduce failed deliveries, lobby congestion, and repeated “where are you?” calls—without handing out permanent codes.</p>
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
                className="rounded-2xl border border-fff-border/50 bg-fff-surface-elevated/55 p-6 shadow-sm shadow-black/25"
              >
                <FeatureIcon className="h-8 w-8 text-fff-accent" />
                <h3 className="mt-4 text-lg font-semibold text-fff-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fff-text-secondary">{item.body}</p>
              </div>
            );
            })}
          </div>
        </section>

        {/* Problem / solution — text-forward */}
        <section className="border-t border-fff-border/40 bg-fff-surface-subtle/30 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fff-danger/85">The gap</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-fff-text-primary md:text-3xl">Maps stop at the address</h2>
              <p className="mt-4 leading-relaxed text-fff-text-secondary">
                Navigation apps deliver people to the building—not the right entrance, parking level, or gate. That gap becomes your front desk’s problem, the resident’s texts, and the carrier’s failed delivery.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fff-accent">The standard</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-fff-text-primary md:text-3xl">A guided path, every time</h2>
              <p className="mt-4 leading-relaxed text-fff-text-secondary">
                FindFoundFast turns your approved route into a shareable, time-bound experience: photos, short directions, and codes that match your access policy—presented consistently for every arrival.
              </p>
            </div>
          </div>
        </section>

        {/* Security / ops note */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="flex flex-col gap-6 rounded-2xl border border-fff-accent/22 bg-fff-accent/[0.045] p-8 md:flex-row md:items-center md:gap-10 md:p-10">
            <IconShield className="h-12 w-12 shrink-0 text-fff-accent md:h-14 md:w-14" />
            <div>
              <h2 className="text-xl font-semibold text-fff-text-primary md:text-2xl">Built for operational reality</h2>
              <p className="mt-2 text-fff-text-secondary">
                Timed links reduce stale instructions in the wild. Pair with your existing access and vendor policies—your team defines what’s shown; residents distribute within the window you support.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t border-fff-border/40 py-20 md:py-24" id="pricing">
          <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-fff-text-primary md:text-3xl">Simple per-property pricing</h2>
            <p className="mt-2 text-fff-text-muted">Unlimited buildings and units within that property.</p>
            <div className="mt-10 rounded-2xl border border-fff-border/55 bg-fff-surface-elevated/50 p-8">
              <p className="font-mono text-sm text-fff-accent">Starting at</p>
              <p className="mt-2 text-5xl font-semibold tabular-nums tracking-tight text-fff-text-primary md:text-6xl">
                $49<span className="text-2xl font-medium text-fff-text-muted">/mo</span>
              </p>
              <p className="mt-2 text-sm text-fff-text-muted">per property · annual plans available</p>
              <Link
                href="/pricing"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-lg border border-fff-border/70 py-3 text-sm font-semibold text-fff-text-primary transition hover:bg-fff-surface-elevated/60 ${ring}`}
              >
                Compare plans
              </Link>
              <Link
                href="/get-started"
                className={`mt-3 inline-flex w-full items-center justify-center rounded-lg bg-fff-accent py-3 text-sm font-semibold text-fff-surface transition hover:bg-fff-accent/92 ${ring}`}
              >
                Contact sales
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-fff-border/40 bg-fff-surface-elevated/25 py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="text-xl font-semibold text-fff-text-primary md:text-2xl">See if FindFoundFast fits your portfolio</h2>
            <p className="mt-2 text-sm text-fff-text-muted">We’ll walk through setup, resident flow, and how timed links align with your policies.</p>
            <Link
              href="/get-started"
              className={`mt-8 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fff-accent px-8 py-3 text-sm font-semibold text-fff-surface transition hover:bg-fff-accent/92 ${ring}`}
            >
              Get started
            </Link>
            <p className="mt-6">
              <Link href="/" className={`text-sm text-fff-text-muted underline-offset-4 hover:text-fff-text-primary ${ring} rounded`}>
                ← Back to current marketing site
              </Link>
            </p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-fff-border/45 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-fff-text-muted sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} FindFoundFast</span>
          <div className="flex gap-6">
            <Link href="/pricing" className={`hover:text-fff-text-primary ${ring} rounded`}>
              Pricing
            </Link>
            <Link href="/how-it-works?tab=manager" className={`hover:text-fff-text-primary ${ring} rounded`}>
              Product tour
            </Link>
            <a href="https://findfoundfast.com" className={`hover:text-fff-text-primary ${ring} rounded`} rel="noopener noreferrer">
              findfoundfast.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
