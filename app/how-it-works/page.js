'use client';
import { useState } from 'react';
import Link from 'next/link';

const APP_URL = 'https://findfoundfast-final.vercel.app';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('manager');

  const driverSteps = [
    { step: 1, title: 'Parking / Drop-off', desc: 'Pull into Entrance B – any uncovered spot near the blue sign', url: 'https://i.ibb.co/1t4MWkgH/Modern-apartment-at-dusk.png' },
    { step: 2, title: 'Main Entrance', desc: 'Gate code: G7K42 – use the keypad on the left side of the door', url: 'https://i.ibb.co/BV8fW6pn/Modern-apartment-entrance-at-dusk.png' },
    { step: 3, title: 'Lobby → Elevator', desc: 'Go straight past the mailboxes, elevator is on the left', url: 'https://i.ibb.co/dwCQrWmf/Modern-residential-lobby-with-cozy-elegance.png' },
    { step: 4, title: 'Your Door', desc: 'Unit 412 – last door on the right. Leave at door. Thank you!', url: 'https://i.ibb.co/0VWt3QZk/Modern-elevator-in-sleek-lobby-setting.png' },
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
        onClick={() => setActiveTab(id)}
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

      <header className="relative z-10 flex items-center justify-between border-b border-white/[0.08] bg-fff-bg/90 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md sm:px-6 sm:py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          Find<span className="text-fff-green">Found</span>Fast
        </Link>
        <a href={APP_URL} className="font-mono text-sm font-bold uppercase tracking-wide text-fff-green transition hover:text-fff-yellow">
          Try app →
        </a>
      </header>

      <section className="relative z-10 border-b border-white/[0.08] px-4 pb-12 pt-8 text-center sm:px-6 sm:pb-16 sm:pt-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-fff-green/25 bg-fff-green/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-fff-green sm:text-xs sm:tracking-[0.2em]">
            FFFliping Cool · No App Required
          </p>
          <h1 className="mb-5 text-[clamp(1.75rem,6vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight text-fff-white sm:text-5xl md:text-6xl">
            Never text <span className="text-fff-green">&quot;where are you?&quot;</span> again
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-fff-white/55 sm:text-xl">
            One link per building. Crystal-clear photos. Codes that vanish automatically.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
        <p className="mb-4 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-fff-green/90">Pick a perspective</p>
        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3" role="tablist" aria-label="How it works by role">
          {tabBtn('manager', '🏢 Property manager')}
          {tabBtn('resident', '🏠 Resident')}
          {tabBtn('driver', '🚗 Driver')}
        </div>

        <div id="panel-manager" role="tabpanel" aria-labelledby="tab-manager" hidden={activeTab !== 'manager'}>
          {activeTab === 'manager' && (
            <div className="rounded-2xl border border-white/[0.08] bg-fff-card/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-10">
              <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-fff-white sm:text-4xl">Property manager</h2>
              <p className="mb-10 max-w-2xl text-fff-white/55">Set up once per building. Every resident inherits the guide automatically.</p>
              <div className="space-y-8">
                <div className="rounded-2xl border border-white/[0.08] bg-fff-bg/80 p-6 sm:p-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-fff-green">Step 1</span>
                  <h3 className="mt-2 text-xl font-bold text-fff-white sm:text-2xl">Add your building</h3>
                  <p className="mt-3 text-lg text-fff-green">Building A, Building B, North Tower, Tower 3, etc.</p>
                  <p className="mt-2 text-sm text-fff-muted">Label it however you want.</p>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-fff-bg/80 p-6 sm:p-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-fff-green">Step 2</span>
                  <h3 className="mt-2 text-xl font-bold text-fff-white sm:text-2xl">Take four base photos</h3>
                  <p className="mt-3 text-lg text-fff-green">Parking → Entrance → Lobby → Elevator</p>
                  <p className="mt-2 text-sm text-fff-muted">Optional: draw arrows (← → ↑ ↓) on any photo.</p>
                  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {driverSteps.map((photo) => (
                      <div key={photo.step} className="group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="h-56 w-full rounded-xl border border-white/[0.08] object-cover shadow-lg transition group-hover:border-fff-green/30 sm:h-64"
                        />
                        <p className="mt-3 text-center text-sm font-semibold text-fff-green">{photo.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 rounded-xl border border-fff-green/20 bg-fff-green/5 p-6 text-center">
                    <p className="text-base leading-relaxed text-fff-white/80 sm:text-lg">
                      One link per building = every unit in that building.
                      <br />
                      <span className="text-fff-muted">Updates instantly for every resident&apos;s link.</span>
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
              <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-fff-white sm:text-4xl">Resident</h2>
              <p className="mb-10 max-w-2xl text-fff-white/55">Your property manager gives you a 5-character code when they set up the building.</p>

              <div className="grid gap-8 lg:grid-cols-3">
                <div className="flex flex-col rounded-2xl border border-white/[0.08] bg-fff-bg/80 p-6 sm:p-8">
                  <div className="mb-4 text-4xl">🔑</div>
                  <h3 className="mb-5 text-xl font-bold text-fff-white">How you get your link</h3>
                  <ol className="flex flex-1 flex-col gap-4 text-left text-[15px] leading-relaxed text-fff-white/55">
                    <li>
                      <span className="font-semibold text-fff-green">1.</span> Log in with the code from your property manager
                    </li>
                    <li>
                      <span className="font-semibold text-fff-green">2.</span> Select your building
                    </li>
                    <li>
                      <span className="font-semibold text-fff-green">3.</span> Type your unit number
                    </li>
                    <li>
                      <span className="font-semibold text-fff-green">4.</span> Pick 30 min / 1 hr / 1 day → Copy
                    </li>
                  </ol>
                </div>

                <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2">
                  <div>
                    <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-fff-rose">Before</p>
                    <div className="flex h-full min-h-[280px] flex-col gap-3 rounded-2xl border border-white/[0.08] bg-fff-bg/90 p-4">
                      <p className="text-center text-[10px] font-mono font-bold uppercase tracking-wider text-fff-muted">Driver ↔ Resident</p>
                      <div className="rounded-xl bg-fff-gray/80 px-3 py-2.5 text-sm text-fff-white/80">I&apos;m here, how do I get in?</div>
                      <div className="rounded-xl bg-fff-gray/80 px-3 py-2.5 text-sm text-fff-white/80">No code? I can&apos;t access the building.</div>
                      <div className="ml-auto max-w-[90%] rounded-xl border border-fff-green/25 bg-fff-green/10 px-3 py-2.5 text-sm text-fff-white">
                        Go to the second entrance, turn left at the—
                      </div>
                      <div className="rounded-xl bg-fff-gray/80 px-3 py-2.5 text-sm text-fff-white/50">Order cancelled. Sorry.</div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-fff-green">After</p>
                    <div className="flex h-full min-h-[280px] flex-col gap-3 rounded-2xl border border-white/[0.08] bg-fff-bg/90 p-4">
                      <p className="text-center text-[10px] font-mono font-bold uppercase tracking-wider text-fff-muted">Driver ↔ Resident</p>
                      <div className="rounded-xl bg-fff-gray/80 px-3 py-2.5 text-sm text-fff-white/80">On the way</div>
                      <div className="ml-auto max-w-[90%] rounded-xl border border-fff-green/35 bg-fff-green/15 px-3 py-2.5 text-sm text-fff-bg">
                        Here are the instructions — tap the link:
                      </div>
                      <div className="rounded-xl border border-fff-green/25 bg-fff-card p-3 text-left text-xs">
                        <div className="font-bold text-fff-green">FindFoundFast</div>
                        <div className="mt-0.5 text-fff-white/90">Sunny Apartments · Building A</div>
                        <div className="mt-1 font-mono text-[10px] text-fff-green/90">Expires in 42 min · Step-by-step photos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="mb-6 text-center text-lg font-bold text-fff-white sm:text-xl">What your generated link looks like</h3>
                <div className="mx-auto max-w-md rounded-2xl border border-fff-green/25 bg-fff-bg/90 p-8 text-center ring-1 ring-fff-green/10">
                  <div className="font-mono text-sm text-fff-green">findfoundfast.com/link/sunny-a</div>
                  <div className="mt-3 text-2xl font-extrabold text-fff-white sm:text-3xl">
                    Expires in <span className="text-fff-green">42 minutes</span>
                  </div>
                  <div className="mt-6 rounded-xl bg-fff-green py-3.5 font-mono text-base font-bold uppercase tracking-wide text-fff-bg">Copy link</div>
                  <p className="mt-5 text-sm leading-relaxed text-fff-muted">
                    Send this to your driver or guest. They&apos;ll see photos and gate codes in one place.
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
              <p className="mx-auto mb-10 max-w-lg text-center text-fff-white/55">What they see in the browser — no install, no login.</p>
              <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-white/[0.1] bg-fff-bg shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-fff-bg px-5 py-4">
                  <span className="text-base font-extrabold text-fff-green">FindFoundFast</span>
                  <span className="font-mono text-sm font-bold text-fff-green">Expires in 42 min</span>
                </div>
                <div className="space-y-8 p-6 sm:p-8">
                  {driverSteps.map((photo) => (
                    <div key={photo.step} className="rounded-xl border border-white/[0.08] bg-fff-card/60 p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.url} alt={photo.title} className="mb-4 h-64 w-full rounded-lg object-cover sm:h-80" />
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-fff-green font-mono text-sm font-bold text-fff-bg">{photo.step}</div>
                        <div>
                          <div className="font-semibold text-fff-white">{photo.title}</div>
                          <div className="mt-1 text-sm leading-relaxed text-fff-white/50">{photo.desc}</div>
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
          Ready to make arrivals Flipping Cool for your property?
        </h2>
        <Link
          href={APP_URL}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-fff-green px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg transition active:opacity-90 sm:px-10 sm:py-4 hover:bg-fff-yellow"
        >
          Request a free demo
        </Link>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-xs text-fff-muted sm:py-8">
        FindFoundFast · findfoundfast.com
      </footer>
    </div>
  );
}
