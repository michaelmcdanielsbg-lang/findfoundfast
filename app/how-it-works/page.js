'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50';

export default function HowItWorks() {
  /** Property manager first — default for “How it works” */
  const [activeTab, setActiveTab] = useState('manager');

  const selectTab = useCallback((id) => {
    setActiveTab(id);
    if (typeof window !== 'undefined') {
      const u = new URL(window.location.href);
      u.searchParams.set('tab', id);
      window.history.replaceState({}, '', u.pathname + u.search);
    }
  }, []);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get('tab');
    if (raw === 'manager' || raw === 'resident' || raw === 'driver') {
      setActiveTab(raw);
    }
  }, []);

  const driverSteps = [
    { step: 1, title: 'Parking / Drop-off', desc: 'Pull into Entrance B – any uncovered spot near the blue sign', url: 'https://i.ibb.co/1t4MWkgH/Modern-apartment-at-dusk.png' },
    { step: 2, title: 'Main Entrance', desc: 'Gate code: G7K42 – use the keypad on the left side of the door', url: 'https://i.ibb.co/BV8fW6pn/Modern-apartment-entrance-at-dusk.png' },
    { step: 3, title: 'Lobby → Elevator', desc: 'Go straight past the mailboxes, elevator is on the left', url: 'https://i.ibb.co/dwCQrWmf/Modern-residential-lobby-with-cozy-elegance.png' },
    { step: 4, title: 'Your Door', desc: 'Unit 412 – last door on the right. Leave at door. Thank you!', url: 'https://i.ibb.co/0VWt3QZk/Modern-elevator-in-sleek-lobby-setting.png' },
  ];

  const photoFillClass = (step) =>
    step === 3 || step === 4 ? 'object-cover object-center' : 'object-contain object-center';

  const tabBtn = (id, label) => {
    const on = activeTab === id;
    return (
      <button
        type="button"
        role="tab"
        aria-selected={on}
        id={`tab-${id}`}
        aria-controls={`panel-${id}`}
        onClick={() => selectTab(id)}
        className={`min-h-[44px] rounded-xl px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wide transition active:opacity-90 sm:min-h-0 sm:px-7 sm:py-3.5 sm:text-sm ${
          on
            ? 'bg-fff-green text-fff-bg shadow-md shadow-emerald-900/10'
            : 'border border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stone-50 font-sans text-stone-900 antialiased">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[min(55vh,480px)] opacity-100"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 75% 55% at 50% -5%, rgba(0,255,135,0.07), transparent 55%)',
        }}
      />

      <header className="relative z-10 border-b border-stone-200 bg-white/90 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-xl sm:px-6 sm:py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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
            <Link
              href="/pricing"
              className={`font-mono text-xs font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 sm:text-sm ${focusRing} rounded-sm`}
            >
              Pricing
            </Link>
            <span className="font-mono text-xs font-bold uppercase tracking-wide text-emerald-700 sm:text-sm">
              How it works
            </span>
            <Link
              href="/get-started"
              className={`inline-flex min-h-[40px] items-center justify-center rounded-lg bg-fff-green px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wide text-fff-bg shadow-sm shadow-emerald-900/10 transition-colors hover:bg-[#00e67a] ${focusRing}`}
            >
              Get started →
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 border-b border-stone-200 px-4 pb-3 pt-4 text-center sm:px-6 sm:pb-4 sm:pt-7 md:pt-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[clamp(1.45rem,4.8vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            <span className="text-stone-900">Micro-location guidance for deliveries or visitors</span>
          </h1>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-5">
        <p className="mb-3 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-stone-500 sm:mb-4">
          Pick a perspective
        </p>
        <div className="mb-6 flex flex-wrap justify-center gap-2 sm:mb-8 sm:gap-3" role="tablist" aria-label="How it works by role">
          {tabBtn('manager', '🏢 Property manager')}
          {tabBtn('resident', '🏠 Resident')}
          {tabBtn('driver', '🚗 Driver')}
        </div>

        <div id="panel-manager" role="tabpanel" aria-labelledby="tab-manager" hidden={activeTab !== 'manager'}>
          {activeTab === 'manager' && (
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8 md:p-10">
              <h2 className="mb-1.5 text-2xl font-extrabold tracking-tight text-stone-900 sm:mb-2 sm:text-3xl md:text-4xl">Property manager</h2>
              <p className="mb-6 max-w-2xl text-[16px] leading-relaxed text-stone-600 sm:mb-8 sm:text-[17px]">
                Improve your property flow in minutes—fewer circling cars, wrong parking, and jams. Residents, visitors, and delivery stay in sync; fewer front-desk calls.
              </p>
              <div className="space-y-5 sm:space-y-7">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-7">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">Step 1</span>
                  <h3 className="mt-2 text-xl font-bold text-stone-900 sm:text-2xl">Add your building</h3>
                  <p className="mt-3 text-lg text-emerald-700">Building A, Building B, North Tower, Tower 3, etc.</p>
                  <p className="mt-2 text-[15px] text-stone-500">Label it however you want.</p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-7">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">Step 2</span>
                  <h3 className="mt-2 text-xl font-bold text-stone-900 sm:text-2xl">Add key photos</h3>
                  <p className="mt-3 text-lg text-emerald-700">
                    Parking → Entrance → Lobby → Elevator <span className="text-stone-500">(plus any extras)</span>
                  </p>
                  <p className="mt-2 text-[15px] text-stone-500">Optional: draw arrows (← → ↑ ↓) on any photo.</p>
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5">
                    {driverSteps.map((photo) => (
                      <div key={photo.step} className="group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className={`aspect-[4/3] w-full rounded-xl border border-stone-200 bg-stone-100 shadow-sm transition group-hover:border-emerald-300 ${photoFillClass(photo.step)}`}
                        />
                        <p className="mt-3 text-center text-sm font-semibold text-emerald-700">{photo.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center sm:mt-8 sm:p-6">
                    <p className="text-[15px] leading-relaxed text-stone-700 sm:text-base md:text-lg">
                      One link per building = every unit in that building.
                      <br />
                      <span className="text-stone-500">Updates instantly for every resident&apos;s link.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div id="panel-resident" role="tabpanel" aria-labelledby="tab-resident" hidden={activeTab !== 'resident'}>
          {activeTab === 'resident' && (
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8 md:p-10">
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-stone-900 sm:mb-6 sm:text-3xl md:text-4xl">Resident</h2>

              <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                <div>
                  <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-rose-600">Before</p>
                  <div className="flex h-full min-h-[280px] flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-100 p-4 shadow-inner">
                    <p className="text-center text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                      Driver ↔ Resident
                    </p>
                    <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm leading-snug text-stone-800">
                      I&apos;m here, how do I get in?
                    </div>
                    <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm leading-snug text-stone-800">
                      No code? I can&apos;t access the building.
                    </div>
                    <div className="ml-auto max-w-[90%] rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium leading-snug text-stone-900">
                      Go to the second entrance, turn left at the—
                    </div>
                    <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm leading-snug text-stone-600">
                      Order cancelled. Sorry.
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">After</p>
                  <div className="flex h-full min-h-[280px] flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-100 p-4 shadow-inner">
                    <p className="text-center text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                      Driver ↔ Resident
                    </p>
                    <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm leading-snug text-stone-800">
                      On the way
                    </div>
                    <div className="ml-auto max-w-[90%] rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2.5 text-sm font-medium leading-snug text-stone-900 shadow-sm">
                      Here are the instructions — tap the link:
                    </div>
                    <div className="rounded-xl border border-stone-200 bg-white p-3.5 text-left shadow-sm">
                      <div className="text-sm font-bold text-emerald-700">FindFoundFast</div>
                      <div className="mt-1 text-sm text-stone-800">Sunny Apartments · Building A</div>
                      <div className="mt-2 font-mono text-[11px] font-medium leading-snug text-emerald-700">
                        Expires in 42 min · Step-by-step photos
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <h3 className="mb-4 text-center text-lg font-bold text-stone-900 sm:mb-5 sm:text-xl">
                  What your generated link looks like
                </h3>
                <div className="mx-auto max-w-md rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center ring-1 ring-stone-100 sm:p-8">
                  <div className="font-mono text-sm text-emerald-700">findfoundfast.com/link/sunny-a</div>
                  <div className="mt-3 text-2xl font-extrabold text-stone-900 sm:text-3xl">
                    Expires in <span className="text-emerald-700">42 minutes</span>
                  </div>
                  <div className="mt-6 rounded-xl bg-fff-green py-3.5 font-mono text-base font-bold uppercase tracking-wide text-fff-bg shadow-sm">
                    Copy link
                  </div>
                  <p className="mt-5 text-[15px] leading-relaxed text-stone-600">
                    Send this to your driver or guest. They&apos;ll see photos and gate codes in one place—no app.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div id="panel-driver" role="tabpanel" aria-labelledby="tab-driver" hidden={activeTab !== 'driver'}>
          {activeTab === 'driver' && (
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8 md:p-10">
              <h2 className="mb-1.5 text-center text-2xl font-extrabold tracking-tight text-stone-900 sm:mb-2 sm:text-3xl md:text-4xl">Driver view</h2>
              <p className="mx-auto mb-6 max-w-lg text-center text-[16px] leading-relaxed text-stone-600 sm:mb-8 sm:text-[17px]">
                What they see in the browser—no install, no login.
              </p>
              <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 bg-white px-4 py-3 sm:px-5 sm:py-4">
                  <span className="text-sm font-extrabold text-emerald-700 sm:text-base">FindFoundFast</span>
                  <span className="font-mono text-xs font-bold text-emerald-700 sm:text-sm">Expires in 42 min</span>
                </div>
                <div className="space-y-5 p-4 sm:space-y-6 sm:p-6 md:p-8">
                  {driverSteps.map((photo) => (
                    <div key={photo.step} className="rounded-xl border border-stone-200 bg-white p-2.5 sm:p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className={`mb-4 aspect-[4/3] w-full rounded-lg bg-stone-100 sm:aspect-[16/10] ${photoFillClass(photo.step)}`}
                      />
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-fff-green font-mono text-sm font-bold text-fff-bg">{photo.step}</div>
                        <div>
                          <div className="font-semibold text-stone-900">{photo.title}</div>
                          <div className="mt-1 text-[15px] leading-relaxed text-stone-600">{photo.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-emerald-200 bg-emerald-50 px-4 py-4 text-center text-[13px] leading-snug text-emerald-800 sm:text-sm">
                  When the timer ends, codes hide and the link stops working — no stale screenshots.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="relative z-10 border-t border-stone-200 bg-white px-4 py-10 text-center sm:px-6 sm:py-14 md:py-16">
        <h2 className="mx-auto mb-5 max-w-xl text-xl font-extrabold tracking-tight text-stone-900 sm:mb-6 sm:text-3xl md:text-4xl">
          Ready to make arrivals FFFLipping Cool for your property?
        </h2>
        <Link
          href="/get-started"
          className={`inline-flex min-h-[48px] items-center justify-center rounded-xl bg-fff-green px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg shadow-sm shadow-emerald-900/10 transition hover:bg-[#00e67a] active:opacity-90 sm:px-10 sm:py-4 ${focusRing}`}
        >
          Get started →
        </Link>
      </section>

      <footer className="relative z-10 border-t border-stone-200 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-[13px] text-stone-500 sm:py-8 sm:text-sm">
        <span className="text-stone-700">FindFoundFast</span>
        <span className="mx-1.5 text-stone-400">·</span>
        <a href="https://findfoundfast.com" rel="noopener noreferrer" className={`transition-colors hover:text-emerald-700 ${focusRing} rounded-sm`}>
          findfoundfast.com
        </a>
      </footer>
    </div>
  );
}
