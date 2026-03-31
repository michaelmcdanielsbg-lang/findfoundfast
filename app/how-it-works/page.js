'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fff-green/55 focus-visible:ring-offset-2 focus-visible:ring-offset-fff-bg';

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

  const testimonials = [
    'My friends and family can never find my apartment.',
    'My food delivery was left at the wrong building again.',
    'I’m tired of sending instructions to navigate this large building.',
    'Gate codes get lost in the chat—then everyone shows up confused.',
    'I want one link that does the directions for me.',
    'Stop reposting screenshots—make it simple and timed.',
  ];

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
            ? 'bg-fff-green text-fff-bg shadow-lg shadow-fff-green/20'
            : 'border border-white/[0.12] bg-fff-card text-fff-white/80 hover:border-fff-green/30 hover:text-fff-green'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-fff-bg font-sans text-fff-white antialiased">
      <div
        className="pointer-events-none fixed inset-0 opacity-100"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,135,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="pointer-events-none fixed top-[8%] left-1/2 h-[min(70vh,520px)] w-[min(90vw,640px)] -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,255,135,0.07) 0%, transparent 65%)',
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
            href="/"
            className={`font-mono text-xs font-bold uppercase tracking-wide text-fff-white/90 transition-colors hover:text-fff-green sm:text-sm ${focusRing} rounded-sm`}
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className={`font-mono text-xs font-bold uppercase tracking-wide text-fff-white/90 transition-colors hover:text-fff-green sm:text-sm ${focusRing} rounded-sm`}
          >
            Pricing
          </Link>
          <span className="font-mono text-xs font-bold uppercase tracking-wide text-fff-green sm:text-sm">
            How it works
          </span>
          <Link
            href="/get-started"
            className={`inline-flex min-h-[40px] items-center justify-center rounded-lg bg-fff-green px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wide text-fff-bg transition-colors hover:bg-fff-yellow ${focusRing}`}
          >
            Get started →
          </Link>
        </div>
        </div>
      </header>

      <section className="relative z-10 border-b border-white/[0.08] px-4 pb-4 pt-5 text-center sm:px-6 sm:pb-5 sm:pt-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[clamp(1.5rem,5vw,2.75rem)] font-extrabold leading-[1.15] tracking-tight text-fff-white sm:text-4xl md:text-5xl">
            <span className="text-fff-white/95">Micro-location guidance for deliveries or visitors</span>
          </h1>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
        <p className="mb-4 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-fff-green">Pick a perspective</p>
        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3" role="tablist" aria-label="How it works by role">
          {tabBtn('manager', '🏢 Property manager')}
          {tabBtn('resident', '🏠 Resident')}
          {tabBtn('driver', '🚗 Driver')}
        </div>

        <div id="panel-manager" role="tabpanel" aria-labelledby="tab-manager" hidden={activeTab !== 'manager'}>
          {activeTab === 'manager' && (
            <div className="rounded-2xl border border-white/[0.08] bg-fff-card/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-10">
              <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-fff-white sm:text-4xl">Property manager</h2>
              <p className="mb-10 max-w-2xl text-[16px] leading-relaxed text-fff-white/85 sm:text-[17px] sm:text-fff-white/78">
                Improve your property flow in minutes—fewer circling cars, wrong parking, and jams. Residents, visitors, and delivery stay in sync; fewer front-desk calls.
              </p>
              <div className="space-y-8">
                <div className="rounded-2xl border border-white/[0.08] bg-fff-bg/80 p-6 sm:p-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-fff-green">Step 1</span>
                  <h3 className="mt-2 text-xl font-bold text-fff-white sm:text-2xl">Add your building</h3>
                  <p className="mt-3 text-lg text-fff-green">Building A, Building B, North Tower, Tower 3, etc.</p>
                  <p className="mt-2 text-[15px] text-fff-muted">Label it however you want.</p>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-fff-bg/80 p-6 sm:p-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-fff-green">Step 2</span>
                  <h3 className="mt-2 text-xl font-bold text-fff-white sm:text-2xl">Add key photos</h3>
                  <p className="mt-3 text-lg text-fff-green">
                    Parking → Entrance → Lobby → Elevator <span className="text-fff-white/55">(plus any extras)</span>
                  </p>
                  <p className="mt-2 text-[15px] text-fff-muted">Optional: draw arrows (← → ↑ ↓) on any photo.</p>
                  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {driverSteps.map((photo) => (
                      <div key={photo.step} className="group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="aspect-[4/3] w-full rounded-xl border border-white/[0.08] bg-[#0d0d0d] object-contain object-center shadow-lg transition group-hover:border-fff-green/30"
                        />
                        <p className="mt-3 text-center text-sm font-semibold text-fff-green">{photo.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 rounded-xl border border-fff-green/20 bg-fff-green/5 p-6 text-center">
                    <p className="text-base leading-relaxed text-fff-white/80 sm:text-lg">
                      One link per building = every unit in that building.
                      <br />
                      <span className="text-fff-white/65">Updates instantly for every resident&apos;s link.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div id="panel-resident" role="tabpanel" aria-labelledby="tab-resident" hidden={activeTab !== 'resident'}>
          {activeTab === 'resident' && (
            <div className="rounded-2xl border border-white/[0.08] bg-fff-card/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-10">
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-fff-white sm:mb-8 sm:text-4xl">Resident</h2>

              <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-fff-rose">Before</p>
                    <div className="flex h-full min-h-[280px] flex-col gap-3 rounded-2xl border border-white/[0.14] bg-[#161616] p-4 shadow-inner shadow-black/20">
                      <p className="text-center text-[11px] font-mono font-bold uppercase tracking-wider text-fff-white/65">
                        Driver ↔ Resident
                      </p>
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.07] px-3 py-2.5 text-sm leading-snug text-fff-white/92">
                        I&apos;m here, how do I get in?
                      </div>
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.07] px-3 py-2.5 text-sm leading-snug text-fff-white/92">
                        No code? I can&apos;t access the building.
                      </div>
                      <div className="ml-auto max-w-[90%] rounded-xl border border-fff-green/40 bg-fff-green/20 px-3 py-2.5 text-sm font-medium leading-snug text-fff-white">
                        Go to the second entrance, turn left at the—
                      </div>
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.07] px-3 py-2.5 text-sm leading-snug text-fff-white/80">
                        Order cancelled. Sorry.
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-fff-green">After</p>
                    <div className="flex h-full min-h-[280px] flex-col gap-3 rounded-2xl border border-white/[0.14] bg-[#161616] p-4 shadow-inner shadow-black/20">
                      <p className="text-center text-[11px] font-mono font-bold uppercase tracking-wider text-fff-white/65">
                        Driver ↔ Resident
                      </p>
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.07] px-3 py-2.5 text-sm leading-snug text-fff-white/92">
                        On the way
                      </div>
                      <div className="ml-auto max-w-[90%] rounded-xl border border-fff-green/50 bg-fff-green/25 px-3 py-2.5 text-sm font-medium leading-snug text-fff-white shadow-sm shadow-fff-green/10">
                        Here are the instructions — tap the link:
                      </div>
                      <div className="rounded-xl border border-fff-green/35 bg-[#1e1e1e] p-3.5 text-left shadow-sm shadow-black/30">
                        <div className="text-sm font-bold text-fff-green">FindFoundFast</div>
                        <div className="mt-1 text-sm text-fff-white/95">Sunny Apartments · Building A</div>
                        <div className="mt-2 font-mono text-[11px] font-medium leading-snug text-fff-green">
                          Expires in 42 min · Step-by-step photos
                        </div>
                      </div>
                    </div>
                  </div>
              </div>

              <div className="mt-8 sm:mt-10">
                <h3 className="mb-6 text-center text-lg font-bold text-fff-white sm:text-xl">What your generated link looks like</h3>
                <div className="mx-auto max-w-md rounded-2xl border border-fff-green/25 bg-fff-bg/90 p-8 text-center ring-1 ring-fff-green/10">
                  <div className="font-mono text-sm text-fff-green">findfoundfast.com/link/sunny-a</div>
                  <div className="mt-3 text-2xl font-extrabold text-fff-white sm:text-3xl">
                    Expires in <span className="text-fff-green">42 minutes</span>
                  </div>
                  <div className="mt-6 rounded-xl bg-fff-green py-3.5 font-mono text-base font-bold uppercase tracking-wide text-fff-bg">Copy link</div>
                  <p className="mt-5 text-[15px] leading-relaxed text-fff-white/70">
                    Send this to your driver or guest. They&apos;ll see photos and gate codes in one place—no app.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div id="panel-driver" role="tabpanel" aria-labelledby="tab-driver" hidden={activeTab !== 'driver'}>
          {activeTab === 'driver' && (
            <div className="rounded-2xl border border-white/[0.08] bg-fff-card/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-10">
              <h2 className="mb-2 text-center text-3xl font-extrabold tracking-tight text-fff-white sm:text-4xl">Driver view</h2>
              <p className="mx-auto mb-10 max-w-lg text-center text-[16px] leading-relaxed text-fff-white/85 sm:text-[17px] sm:text-fff-white/78">
                What they see in the browser—no install, no login.
              </p>
              <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-white/[0.1] bg-fff-bg shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-fff-bg px-5 py-4">
                  <span className="text-base font-extrabold text-fff-green">FindFoundFast</span>
                  <span className="font-mono text-sm font-bold text-fff-green">Expires in 42 min</span>
                </div>
                <div className="space-y-8 p-6 sm:p-8">
                  {driverSteps.map((photo) => (
                    <div key={photo.step} className="rounded-xl border border-white/[0.08] bg-fff-card/60 p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="mb-4 aspect-[4/3] w-full rounded-lg bg-[#0d0d0d] object-contain object-center sm:aspect-[16/10]"
                      />
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-fff-green font-mono text-sm font-bold text-fff-bg">{photo.step}</div>
                        <div>
                          <div className="font-semibold text-fff-white">{photo.title}</div>
                          <div className="mt-1 text-[15px] leading-relaxed text-fff-white/82 sm:text-fff-white/72">{photo.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-fff-green/15 bg-fff-green/5 px-4 py-5 text-center text-sm text-fff-green">
                  When the timer ends, codes hide and the link stops working — no stale screenshots.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="relative z-10 border-t border-white/[0.08] bg-fff-bg px-4 py-12 text-center sm:px-6 sm:py-20">
        <h2 className="mx-auto mb-6 max-w-xl text-2xl font-extrabold tracking-tight text-fff-white sm:text-3xl md:text-4xl">
          Ready to make arrivals FFFLipping Cool for your property?
        </h2>
        <Link
          href="/get-started"
          className={`inline-flex min-h-[48px] items-center justify-center rounded-xl bg-fff-green px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg transition active:opacity-90 sm:px-10 sm:py-4 hover:bg-fff-yellow ${focusRing}`}
        >
          Get started →
        </Link>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-[13px] text-fff-muted sm:py-8 sm:text-sm">
        <span className="text-fff-white/80">FindFoundFast</span>
        <span className="mx-1.5 text-fff-muted/90">·</span>
        <a href="https://findfoundfast.com" rel="noopener noreferrer" className="transition-colors hover:text-fff-green">
          findfoundfast.com
        </a>
      </footer>
    </div>
  );
}
