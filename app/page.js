import Link from "next/link";
import HeroSection from "@/components/HeroSection";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50";

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

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-stone-50 text-stone-900 antialiased">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[min(55vh,480px)]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% -5%, rgba(0,255,135,0.07), transparent 55%)",
        }}
      />

      {/* ── Header ── */}
      <header className="relative z-10 border-b border-stone-200 bg-white/90 backdrop-blur-xl">
        <div className="flex flex-col gap-2 px-4 py-2.5 pt-[max(0.75rem,env(safe-area-inset-top))] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3">
          <Link href="/" className={`text-lg font-extrabold tracking-tight text-stone-900 transition-colors hover:text-stone-800 ${focusRing} rounded-sm`}>
            Find<span className="text-[#00c46f]">Found</span>Fast
          </Link>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
            <Link href="/pricing" className={`font-mono text-sm font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 ${focusRing} rounded-sm`}>Pricing</Link>
            <Link href="/how-it-works" className={`font-mono text-sm font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 ${focusRing} rounded-sm`}>How it works</Link>
            <Link href="/get-started" className={`inline-flex min-h-[40px] items-center justify-center rounded-lg bg-fff-green px-4 py-2 font-mono text-fff-eyebrow font-bold uppercase text-fff-bg shadow-sm transition-colors hover:bg-[#00e67a] ${focusRing}`}>
              Get started →
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">

        {/* ── Hero ── */}
        <HeroSection />

        {/* ── WHO IS IT FOR — 3 audience cards ── */}
        <section className="border-t border-stone-200 bg-white py-12 sm:py-14 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="mb-2 font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Made for everyone</p>
              <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
                Whether it is your apartment, your property, or your campus
              </h2>
              <p className="mt-3 text-fff-body text-stone-500">
                Same product. Same photo-guided experience. Pick the version that fits you.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">

              {/* Individual */}
              <Link href="/how-it-works?audience=personal" className={`group flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-6 transition-all hover:border-purple-300 hover:shadow-md ${focusRing}`}>
                <span className="mb-3 text-3xl">🙋</span>
                <h3 className="text-lg font-extrabold text-stone-900">Just me</h3>
                <p className="mt-1.5 text-fff-caption text-stone-500 leading-relaxed">
                  Upload your own photos from parking to your door. Get a personal link. Paste it in your delivery app — done forever.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Free tier', 'Permanent links', '$4.99/mo'].map((t) => (
                    <span key={t} className="rounded-full bg-purple-100 px-2.5 py-1 font-mono text-fff-eyebrow font-bold uppercase text-purple-800">{t}</span>
                  ))}
                </div>
                <p className="mt-auto pt-5 font-mono text-fff-eyebrow font-bold uppercase text-purple-600 group-hover:text-purple-700">
                  See personal plans →
                </p>
              </Link>

              {/* Property */}
              <Link href="/how-it-works?audience=property" className={`group flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-6 transition-all hover:border-emerald-300 hover:shadow-md ${focusRing}`}>
                <span className="mb-3 text-3xl">🏢</span>
                <h3 className="text-lg font-extrabold text-stone-900">Property manager</h3>
                <p className="mt-1.5 text-fff-caption text-stone-500 leading-relaxed">
                  One link per building. Residents share timed links with drivers and guests. Codes expire automatically — no stale screenshots.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Timed links', 'Resident portal', 'From $49/mo'].map((t) => (
                    <span key={t} className="rounded-full bg-emerald-100 px-2.5 py-1 font-mono text-fff-eyebrow font-bold uppercase text-emerald-800">{t}</span>
                  ))}
                </div>
                <p className="mt-auto pt-5 font-mono text-fff-eyebrow font-bold uppercase text-emerald-600 group-hover:text-emerald-700">
                  See property plans →
                </p>
              </Link>

              {/* Campus */}
              <Link href="/how-it-works?audience=campus" className={`group flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md ${focusRing}`}>
                <span className="mb-3 text-3xl">🎓</span>
                <h3 className="text-lg font-extrabold text-stone-900">College campus</h3>
                <p className="mt-1.5 text-fff-caption text-stone-500 leading-relaxed">
                  Permanent links on your website. Graduation, move-in, campus tours — everyone finds the right building without calling the front desk.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Permanent links', 'Event mode', 'Custom pricing'].map((t) => (
                    <span key={t} className="rounded-full bg-blue-100 px-2.5 py-1 font-mono text-fff-eyebrow font-bold uppercase text-blue-800">{t}</span>
                  ))}
                </div>
                <p className="mt-auto pt-5 font-mono text-fff-eyebrow font-bold uppercase text-blue-600 group-hover:text-blue-700">
                  See campus plans →
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS — 3 steps ── */}
        <section className="py-12 sm:py-14 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="mb-2 font-mono text-fff-eyebrow font-bold uppercase text-stone-400">How it works</p>
              <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
                Set up once. Share forever.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                {
                  icon: IconBuilding,
                  step: '01',
                  title: 'Add your location',
                  body: 'Create a profile for your building, apartment, or spot. Give it a name — anything works.',
                },
                {
                  icon: IconLink,
                  step: '02',
                  title: 'Upload your photos',
                  body: 'Parking to entrance to lobby to your door. Add arrows. Add gate codes. Takes 15 minutes.',
                },
                {
                  icon: IconTimer,
                  step: '03',
                  title: 'Share your link',
                  body: 'Paste it in DoorDash, text it to a guest, or drop it on your website. Drivers follow the photos — no calls, no confusion.',
                },
              ].map((item) => {
                const FeatureIcon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-fff-eyebrow font-bold text-stone-300">{item.step}</span>
                      <FeatureIcon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-stone-900">{item.title}</h3>
                    <p className="mt-2 text-fff-caption leading-relaxed text-stone-600">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PROBLEM / SOLUTION ── */}
        <section className="border-y border-stone-200 bg-stone-100/50 py-12 sm:py-14 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:items-start">
            <div>
              <p className="font-mono text-fff-eyebrow font-bold uppercase text-rose-600">The problem</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
                Google Maps stops at the address.
              </h2>
              <p className="mt-3 text-fff-body leading-relaxed text-stone-600">
                Your driver is outside. They have no idea which entrance, which parking lot, or which building. So they text you. You stop what you are doing. You type the same directions you have typed a hundred times. Or your food gets left at the wrong door.
              </p>
            </div>
            <div>
              <p className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">The fix</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
                One link. Every step. No calls.
              </h2>
              <p className="mt-3 text-fff-body leading-relaxed text-stone-600">
                FindFoundFast turns your photos into a step-by-step guide — from the parking lot to your exact door. Share it once. Use it forever. Gate codes vanish when the timer ends so nothing gets screenshot-shared into the wrong hands.
              </p>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL TICKER ── */}
        <section className="w-full py-10 md:py-12" aria-label="What people are saying">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="mb-2 font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">Real notes</p>
            <p className="mx-auto max-w-lg text-fff-caption text-stone-500">
              FFFLipping Cool — what residents were tired of saying in the group chat.
            </p>
          </div>
          <div className="mt-5 w-full px-4 sm:px-6 lg:mt-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-stone-100 lg:rounded-2xl">
              <style>{`
                @keyframes ff-slow-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                @media (prefers-reduced-motion: reduce) { .ff-marquee-track { animation: none !important; } }
              `}</style>
              <div className="ff-marquee-track flex w-max gap-4 px-4 py-4 sm:px-5 lg:gap-5 lg:px-6 lg:py-5"
                style={{ animation: "ff-slow-marquee 46s linear infinite" }}>
                {[
                  "My friends and family can never find my apartment.",
                  "My food delivery was left at the wrong building again.",
                  "I want one link that does the directions for me.",
                  "Stop reposting screenshots — make it simple and timed.",
                  "Gate codes get lost in chat. This makes it easy.",
                  "I set it up once and now my Airbnb guests never get lost.",
                  "Move-in day used to take three staff members just for parking directions.",
                  "My food delivery was left at the wrong building again.",
                  "I want one link that does the directions for me.",
                  "Stop reposting screenshots — make it simple and timed.",
                  "Gate codes get lost in chat. This makes it easy.",
                  "I set it up once and now my Airbnb guests never get lost.",
                ].map((t, idx) => (
                  <div key={idx} className="w-[300px] flex-shrink-0 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
                    <p className="text-fff-caption leading-relaxed text-stone-700">{t}</p>
                    <p className="mt-2 font-mono text-fff-eyebrow font-bold uppercase text-emerald-700/90">
                      {idx === 6 ? 'University housing director' : 'Resident'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING TEASER — shows both ── */}
        <section className="border-t border-stone-200 bg-white py-12 sm:py-14 md:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
                Simple pricing for everyone
              </h2>
              <p className="mt-2 text-stone-500 text-fff-secondary">Start free. Upgrade when you need more.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: 'Free',
                  price: '$0',
                  sub: 'forever',
                  desc: 'Timed links, 3 photos, no credit card.',
                  cta: 'Start free',
                  color: 'stone',
                },
                {
                  label: 'Personal guide',
                  price: '$4.99',
                  sub: '/mo',
                  desc: 'Permanent link, 5 locations, unlimited photos.',
                  cta: 'Get personal guide',
                  featured: true,
                  color: 'emerald',
                },
                {
                  label: 'Property plan',
                  price: '$49',
                  sub: '/mo',
                  desc: 'Unlimited buildings and units. Resident portal.',
                  cta: 'Get started',
                  color: 'stone',
                },
              ].map((p) => (
                <div
                  key={p.label}
                  className={`flex flex-col rounded-2xl border p-5 shadow-sm ${
                    p.featured
                      ? 'border-emerald-300 bg-emerald-50 shadow-md'
                      : 'border-stone-200 bg-stone-50'
                  }`}
                >
                  <p className={`font-mono text-fff-eyebrow font-bold uppercase ${p.featured ? 'text-emerald-700' : 'text-stone-400'}`}>{p.label}</p>
                  <div className="mt-1.5 flex items-baseline gap-0.5">
                    <span className={`text-3xl font-extrabold tabular-nums tracking-tight ${p.featured ? 'text-fff-green' : 'text-stone-900'}`}>{p.price}</span>
                    <span className="text-stone-500 text-fff-caption">{p.sub}</span>
                  </div>
                  <p className="mt-2 text-fff-caption text-stone-500 leading-relaxed">{p.desc}</p>
                  <Link
                    href="/pricing"
                    className={`mt-5 inline-flex min-h-[44px] items-center justify-center rounded-lg px-4 py-2.5 font-mono text-sm font-bold uppercase tracking-wide shadow-sm transition-colors ${
                      p.featured
                        ? `bg-fff-green text-fff-bg hover:bg-[#00e67a] ${focusRing}`
                        : `border border-stone-300 bg-white text-stone-800 hover:border-emerald-400 hover:text-emerald-800 ${focusRing}`
                    }`}
                  >
                    {p.cta} →
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center">
              <Link href="/pricing" className={`text-fff-caption text-stone-500 underline-offset-4 transition-colors hover:text-emerald-700 ${focusRing} rounded-sm`}>
                View all plans and compare →
              </Link>
            </p>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="border-t border-stone-200 bg-stone-50 py-12 sm:py-14 md:py-16">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-extrabold text-stone-900 md:text-3xl">
              Stop giving crappy directions.
            </h2>
            <p className="mt-2 text-fff-body text-stone-500">One link. Every photo. Codes that vanish. FFFliping done.</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/get-started"
                className={`inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-fff-green px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg shadow-sm transition-colors hover:bg-[#00e67a] sm:w-auto ${focusRing}`}
              >
                Get started free →
              </Link>
              <Link
                href="/how-it-works"
                className={`inline-flex min-h-[48px] w-full items-center justify-center rounded-lg border border-stone-300 bg-white px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-stone-700 shadow-sm transition-colors hover:border-emerald-400 hover:text-emerald-800 sm:w-auto ${focusRing}`}
              >
                See how it works
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-stone-200 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center font-mono text-fff-micro text-stone-500 sm:py-6">
        <span className="text-stone-700">FindFoundFast</span>
        <span className="mx-1.5 text-stone-400">·</span>
        <a href="https://findfoundfast.com" rel="noopener noreferrer" className={`transition-colors hover:text-emerald-700 ${focusRing} rounded-sm`}>
          findfoundfast.com
        </a>
      </footer>
    </div>
  );
}
