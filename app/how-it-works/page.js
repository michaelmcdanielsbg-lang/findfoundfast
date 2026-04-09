"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-fff-bg";

export default function HowItWorks() {
  const [audience, setAudience] = useState("property");

  const selectAudience = useCallback((id) => {
    setAudience(id);
    if (typeof window !== 'undefined') {
      const u = new URL(window.location.href);
      u.searchParams.set('audience', id);
      u.searchParams.delete('tab');
      window.history.replaceState({}, '', u.pathname + u.search);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const a = params.get('audience');
    if (a === 'campus') setAudience('campus');
    else if (a === 'personal') setAudience('personal');
    else if (a === 'property') setAudience('property');
    if (['manager', 'resident', 'driver'].includes(params.get('tab'))) {
      setAudience('property');
    }
    if (params.get('tab')) {
      const u = new URL(window.location.href);
      u.searchParams.delete('tab');
      window.history.replaceState({}, '', u.pathname + u.search);
    }
  }, []);

  const driverSteps = [
    { step: 1, title: 'Parking / Drop-off', desc: 'Pull into Entrance B - any uncovered spot near the blue sign', url: 'https://i.ibb.co/1t4MWkgH/Modern-apartment-at-dusk.png' },
    { step: 2, title: 'Main Entrance', desc: 'Gate code: G7K42 - use the keypad on the left side of the door', url: 'https://i.ibb.co/BV8fW6pn/Modern-apartment-entrance-at-dusk.png' },
    { step: 3, title: 'Lobby to Elevator', desc: 'Go straight past the mailboxes, elevator is on the left', url: 'https://i.ibb.co/dwCQrWmf/Modern-residential-lobby-with-cozy-elegance.png' },
    { step: 4, title: 'Your Door', desc: 'Unit 412 - last door on the right. Leave at door. Thank you!', url: 'https://i.ibb.co/0VWt3QZk/Modern-elevator-in-sleek-lobby-setting.png' },
  ];

  const photoFillClass = (step) =>
    step === 3 || step === 4 ? 'object-cover object-center' : 'object-contain object-center';

  const campusUseCases = [
    { emoji: '🎓', title: 'Graduation and move-in', desc: 'Hundreds of families arriving at once. Send one link and everyone finds parking and the right building without calling the front desk.' },
    { emoji: '📦', title: 'Deliveries and vendors', desc: 'Loading dock, service entrance, right building. Drivers find it on the first try without a phone call.' },
    { emoji: '👨‍👩‍👧', title: 'Visiting families and guests', desc: 'Parents visiting students, game-day guests, campus tour walk-ups — guided from the parking lot to the exact destination.' },
    { emoji: '🏥', title: 'Medical and admin buildings', desc: 'Student health, financial aid, registrar. Guide visitors from the parking lot step by step.' },
  ];

  const personalUseCases = [
    { emoji: '🛵', title: 'Heavy delivery users', desc: 'DoorDash, Uber Eats, Amazon — paste your personal link once into delivery notes and never type directions again.' },
    { emoji: '🏡', title: 'Airbnb and short-term hosts', desc: 'Send guests a photo guide instead of a wall of check-in instructions. They find the lockbox. You stop getting texts at 11pm.' },
    { emoji: '🏢', title: 'Hard-to-find apartments', desc: 'Stop explaining the same directions every week. One link. Anyone who needs it taps and follows the photos.' },
    { emoji: '🎉', title: 'Party hosts and event planners', desc: 'Drop the link in the invite. Your guests park in the right lot, walk through the right door. No stragglers.' },
  ];

  const audienceCard = (id, emoji, title, desc, tags) => {
    const isActive = audience === id;
    const styles =
      {
        property: {
          active: "border-emerald-500/50 bg-emerald-950/40",
          inactive: "border-fff-border bg-fff-card hover:border-emerald-500/40 hover:bg-emerald-950/25",
          tag: "bg-emerald-950/50 text-emerald-300",
        },
        campus: {
          active: "border-blue-500/40 bg-blue-950/40",
          inactive: "border-fff-border bg-fff-card hover:border-blue-500/40 hover:bg-blue-950/25",
          tag: "bg-blue-950/50 text-blue-300",
        },
        personal: {
          active: "border-purple-500/40 bg-purple-950/40",
          inactive: "border-fff-border bg-fff-card hover:border-purple-500/40 hover:bg-purple-950/25",
          tag: "bg-purple-950/50 text-purple-300",
        },
      }[id] || {
        active: "border-amber-500/40 bg-amber-950/40",
        inactive: "border-fff-border bg-fff-card hover:border-amber-500/40 hover:bg-amber-950/25",
        tag: "bg-amber-950/50 text-amber-300",
      };

    return (
      <button
        type="button"
        onClick={() => selectAudience(id)}
        className={`group w-full rounded-2xl border-2 p-5 text-left transition-all ${isActive ? styles.active : styles.inactive} ${focusRing}`}
      >
        <span className="mb-3 block text-2xl">{emoji}</span>
        <p className="text-base font-extrabold text-fff-text-primary">{title}</p>
        <p className="mt-1 text-fff-caption text-fff-text-secondary">{desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className={`rounded-full px-2.5 py-1 font-mono text-fff-eyebrow font-bold uppercase ${styles.tag}`}>
              {tag}
            </span>
          ))}
        </div>
      </button>
    );
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-fff-bg font-sans text-fff-text-primary antialiased">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[min(55vh,480px)]"
        aria-hidden
        style={{ background: 'radial-gradient(ellipse 75% 55% at 50% -5%, rgba(0,255,135,0.07), transparent 55%)' }}
      />

      <Header />

      <main className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">

        {/* Page title */}
        <div className="mb-10 text-center">
          <p className="mb-3 font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">Product tour</p>
          <h1 className="mx-auto max-w-2xl text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.12] tracking-tight text-fff-text-primary">
            Works wherever people get lost
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-fff-secondary leading-relaxed text-fff-text-secondary sm:text-fff-body-sm">
            One timed link, step-by-step photos, and gate codes — so nobody circles the block or texts &ldquo;which entrance?&rdquo;
          </p>
        </div>

        {/* Audience picker — 3 cards */}
        <div className="mb-8">
          <p className="mb-4 text-center font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">Who are you?</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {audienceCard("personal", "🙋", "Just me / Airbnb host", "Residents, Airbnb hosts, delivery regulars", ["Free tier", "Permanent links", "$4.99/mo"])}
            {audienceCard("property", "🏢", "Property manager", "Apartments, senior living, offices", ["Timed links", "Resident portal", "From $49/mo"])}
            {audienceCard("campus", "🎓", "College campus", "Universities, medical centers, large campuses", ["Permanent links", "Events", "Graduation"])}
          </div>
        </div>

        {/* Content panel */}
        <div
          className={`rounded-2xl border bg-fff-card shadow-sm ${
            audience === "campus"
              ? "border-blue-500/30"
              : audience === "personal"
                ? "border-purple-500/30"
                : "border-fff-border"
          }`}
        >

          {/* ── PERSONAL / AIRBNB ── */}
          {audience === "personal" && (
            <div className="p-5 sm:p-8 md:p-10">
              <p className="font-mono text-fff-eyebrow font-bold uppercase text-purple-400">For individuals &amp; Airbnb hosts</p>
              <h2 className="mb-2 mt-2 text-2xl font-extrabold tracking-tight text-fff-text-primary sm:text-3xl">
                Your own photo guide. Your personal link.
              </h2>
              <p className="mb-8 max-w-2xl text-fff-secondary leading-relaxed text-fff-text-secondary sm:text-fff-body-sm">
                No property manager needed. Sign up, upload your photos from parking to your door, add your gate code, and get a personal link that works forever. Perfect for heavy delivery users and Airbnb hosts.
              </p>

              <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-950/35 p-5 sm:p-6">
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-amber-400">🏡 Airbnb hosts</p>
                <p className="mt-2 text-fff-body leading-relaxed text-fff-text-secondary">
                  Instead of sending guests a wall of check-in instructions, you send <span className="font-semibold text-fff-text-primary">one link</span>. They tap it and follow the photos — parking spot, lockbox, front door. No 11pm texts asking where the key is.
                </p>
                <p className="mt-3 text-fff-caption text-fff-text-secondary">
                  The one-time $9.99 plan is perfect: one permanent link, one location, no monthly fee.
                </p>
              </div>

              <div className="mb-8 rounded-2xl border border-fff-border bg-fff-bg p-5 sm:p-7">
                <span className="font-mono text-sm font-bold uppercase tracking-wide text-purple-400">Step 1</span>
                <h3 className="mt-2 text-xl font-bold text-fff-text-primary">Name your place</h3>
                <p className="mt-2 text-fff-secondary text-fff-text-secondary">
                  Create a profile — your apartment, Airbnb, or &ldquo;spot B by the garage.&rdquo; That becomes the label on your link.
                </p>
              </div>

              <div className="mb-10 rounded-2xl border border-fff-border bg-fff-bg p-5 sm:p-7">
                <span className="font-mono text-sm font-bold uppercase tracking-wide text-purple-400">Step 2</span>
                <h3 className="mt-2 text-xl font-bold text-fff-text-primary">Upload key photos</h3>
                <p className="mt-2 text-fff-secondary text-fff-text-secondary">
                  Parking to Entrance to Lobby to Your Door. Add arrows on any photo. Add your gate or door code.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {driverSteps.map((photo) => (
                    <div key={photo.step} className="group">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className={`aspect-[4/3] w-full rounded-xl border border-fff-border bg-fff-surface-subtle shadow-sm transition group-hover:border-purple-300 ${photoFillClass(photo.step)}`}
                      />
                      <p className="mt-2 text-center text-fff-caption font-semibold text-purple-400">{photo.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="mb-4 text-lg font-bold text-fff-text-primary">Before &amp; after you share a link</h3>
              <div className="mb-8 grid gap-4 sm:gap-6 lg:grid-cols-2">
                <div>
                  <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-rose-400">Before</p>
                  <div className="flex h-full min-h-[220px] flex-col gap-3 rounded-2xl border border-fff-border bg-fff-surface-subtle p-4 shadow-inner">
                    <p className="text-center font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">You and your driver</p>
                    <div className="rounded-xl border border-fff-border bg-fff-card px-3 py-2.5 text-fff-caption text-fff-text-primary">I&apos;m here, how do I get in?</div>
                    <div className="rounded-xl border border-fff-border bg-fff-card px-3 py-2.5 text-fff-caption text-fff-text-primary">No code? I can&apos;t access the building.</div>
                    <div className="ml-auto max-w-[90%] rounded-xl border border-purple-500/30 bg-purple-950/40 px-3 py-2.5 text-fff-caption font-medium text-fff-text-primary">Go to the second entrance, turn left at the—</div>
                    <div className="rounded-xl border border-fff-border bg-fff-card px-3 py-2.5 text-fff-caption text-fff-text-secondary">Order cancelled. Sorry.</div>
                  </div>
                </div>
                <div>
                  <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-purple-400">After</p>
                  <div className="flex h-full min-h-[220px] flex-col gap-3 rounded-2xl border border-fff-border bg-fff-surface-subtle p-4 shadow-inner">
                    <p className="text-center font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">You and your driver</p>
                    <div className="rounded-xl border border-fff-border bg-fff-card px-3 py-2.5 text-fff-caption text-fff-text-primary">On the way</div>
                    <div className="ml-auto max-w-[90%] rounded-xl border border-purple-500/40 bg-purple-950/40 px-3 py-2.5 text-fff-caption font-medium text-fff-text-primary shadow-sm">Here are the instructions — tap the link:</div>
                    <div className="rounded-xl border border-fff-border bg-fff-card p-3.5 shadow-sm">
                      <div className="text-fff-caption font-bold text-purple-400">FindFoundFast</div>
                      <div className="mt-1 text-fff-caption text-fff-text-primary">Your address · Unit 4B</div>
                      <div className="mt-1.5 font-mono text-fff-eyebrow text-purple-400">Expires in 42 min · Step-by-step photos</div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="mb-1.5 text-center text-xl font-extrabold tracking-tight text-fff-text-primary sm:text-2xl">What the driver sees</h3>
              <p className="mx-auto mb-6 max-w-lg text-center text-fff-secondary leading-relaxed text-fff-text-secondary">No install, no login. Works on any phone.</p>
              <div className="mx-auto mb-10 max-w-lg overflow-hidden rounded-2xl border border-fff-border bg-fff-bg shadow-lg">
                <div className="flex items-center justify-between border-b border-fff-border bg-fff-card px-4 py-3 sm:px-5">
                  <span className="text-fff-caption font-extrabold text-purple-400">FindFoundFast</span>
                  <span className="font-mono text-sm font-bold text-purple-400">Expires in 42 min</span>
                </div>
                <div className="space-y-4 p-4 sm:p-6">
                  {driverSteps.map((photo) => (
                    <div key={photo.step} className="rounded-xl border border-fff-border bg-fff-card p-2.5 sm:p-3">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className={`mb-3 aspect-[4/3] w-full rounded-lg bg-fff-surface-subtle sm:aspect-[16/10] ${photoFillClass(photo.step)}`}
                      />
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-fff-green font-mono text-sm font-bold text-fff-bg">{photo.step}</div>
                        <div>
                          <div className="font-semibold text-fff-text-primary">{photo.title}</div>
                          <div className="mt-0.5 text-fff-caption leading-relaxed text-fff-text-secondary">{photo.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-emerald-500/30 bg-emerald-950/30 px-4 py-3 text-center text-fff-micro text-emerald-300">
                  When the timer ends, codes hide and the link stops working.
                </div>
              </div>

              <h3 className="mb-4 mt-10 text-lg font-bold text-fff-text-primary">Perfect for</h3>
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                {personalUseCases.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-fff-border bg-fff-bg p-5">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h4 className="font-bold text-fff-text-primary">{item.title}</h4>
                      <p className="mt-1 text-fff-caption leading-relaxed text-fff-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Free", price: "$0", desc: "Timed links · 3 photos · Try it now", cta: "Start free", href: "/get-started" },
                  { label: "Personal guide", price: "$4.99/mo", desc: "Permanent link · 5 locations · Unlimited photos", cta: "Get guide", href: "/get-started", featured: true },
                  { label: "One-time", price: "$9.99", desc: "1 permanent link forever · No subscription", cta: "Buy once", href: "/get-started" },
                ].map((p) => (
                  <div key={p.label} className={`flex flex-col rounded-2xl border p-5 ${p.featured ? "border-emerald-500/40 bg-emerald-950/35" : "border-fff-border bg-fff-card"}`}>
                    <p className={`font-mono text-fff-eyebrow font-bold uppercase ${p.featured ? "text-emerald-400" : "text-fff-muted"}`}>{p.label}</p>
                    <p className={`mt-1 text-xl font-extrabold ${p.featured ? "text-fff-green" : "text-fff-text-primary"}`}>{p.price}</p>
                    <p className="mt-1 text-fff-eyebrow text-fff-text-secondary leading-relaxed">{p.desc}</p>
                    <Link
                      href={p.href}
                      className={`mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg px-4 py-2.5 font-mono text-sm font-bold uppercase tracking-wide shadow-sm transition-colors ${p.featured ? `bg-fff-green text-fff-bg hover:bg-[#00e67a] ${focusRing}` : `border border-fff-border bg-fff-card text-fff-text-primary hover:border-emerald-400 ${focusRing}`}`}
                    >
                      {p.cta} →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PROPERTY — scroll: manager → resident → driver ── */}
          {audience === "property" && (
            <div className="p-5 sm:p-8 md:p-10">
              <p className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-400">Property managers</p>
              <h2 className="mb-2 mt-1 text-2xl font-extrabold tracking-tight text-fff-text-primary sm:text-3xl">Set up the building once</h2>
              <p className="mb-8 max-w-2xl text-fff-body-sm leading-relaxed text-fff-text-secondary">
                Residents, visitors, and deliveries find the right place every time — fewer front-desk calls, fewer wrong turns. Scroll down to see how residents share links and what drivers see.
              </p>

              <div className="space-y-5">
                <div className="rounded-2xl border border-fff-border bg-fff-bg p-5 sm:p-7">
                  <span className="font-mono text-sm font-bold uppercase tracking-wide text-emerald-400">Step 1</span>
                  <h3 className="mt-2 text-xl font-bold text-fff-text-primary">Add your building</h3>
                  <p className="mt-2 text-fff-secondary text-fff-text-secondary">Building A, North Tower, Tower 3 — label it however you want. One link covers every unit inside.</p>
                </div>
                <div className="rounded-2xl border border-fff-border bg-fff-bg p-5 sm:p-7">
                  <span className="font-mono text-sm font-bold uppercase tracking-wide text-emerald-400">Step 2</span>
                  <h3 className="mt-2 text-xl font-bold text-fff-text-primary">Upload key photos</h3>
                  <p className="mt-2 text-fff-secondary text-fff-text-secondary">Parking to Entrance to Lobby to Elevator. Add arrows on any photo to point the way.</p>
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {driverSteps.map((photo) => (
                      <div key={photo.step} className="group">
                        <img src={photo.url} alt={photo.title} className={`aspect-[4/3] w-full rounded-xl border border-fff-border bg-fff-surface-subtle shadow-sm transition group-hover:border-emerald-300 ${photoFillClass(photo.step)}`} />
                        <p className="mt-2 text-center text-fff-caption font-semibold text-emerald-400">{photo.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-5 text-center">
                    <p className="text-fff-secondary leading-relaxed text-fff-text-secondary">One link per building = every unit in that building.<br /><span className="text-fff-text-secondary">Updates instantly for every resident&apos;s link.</span></p>
                  </div>
                </div>
              </div>

              <div className="my-10 border-t border-fff-border pt-10">
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">Residents</p>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-fff-text-primary sm:text-2xl">Before &amp; after they share a timed link</h3>
                <div className="mt-6 grid gap-4 sm:gap-6 lg:grid-cols-2">
                  <div>
                    <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-rose-400">Before</p>
                    <div className="flex h-full min-h-[220px] flex-col gap-3 rounded-2xl border border-fff-border bg-fff-surface-subtle p-4 shadow-inner">
                      <p className="text-center font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">Driver and Resident</p>
                      <div className="rounded-xl border border-fff-border bg-fff-card px-3 py-2.5 text-fff-caption text-fff-text-primary">I&apos;m here, how do I get in?</div>
                      <div className="rounded-xl border border-fff-border bg-fff-card px-3 py-2.5 text-fff-caption text-fff-text-primary">No code? I can&apos;t access the building.</div>
                      <div className="ml-auto max-w-[90%] rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-2.5 text-fff-caption font-medium text-fff-text-primary">Go to the second entrance, turn left at the—</div>
                      <div className="rounded-xl border border-fff-border bg-fff-card px-3 py-2.5 text-fff-caption text-fff-text-secondary">Order cancelled. Sorry.</div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-emerald-400">After</p>
                    <div className="flex h-full min-h-[220px] flex-col gap-3 rounded-2xl border border-fff-border bg-fff-surface-subtle p-4 shadow-inner">
                      <p className="text-center font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">Driver and Resident</p>
                      <div className="rounded-xl border border-fff-border bg-fff-card px-3 py-2.5 text-fff-caption text-fff-text-primary">On the way</div>
                      <div className="ml-auto max-w-[90%] rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3 py-2.5 text-fff-caption font-medium text-fff-text-primary shadow-sm">Here are the instructions — tap the link:</div>
                      <div className="rounded-xl border border-fff-border bg-fff-card p-3.5 shadow-sm">
                        <div className="text-fff-caption font-bold text-emerald-400">FindFoundFast</div>
                        <div className="mt-1 text-fff-caption text-fff-text-primary">Sunny Apts · Bldg A</div>
                        <div className="mt-1.5 font-mono text-fff-eyebrow text-emerald-400">Expires in 42 min · Step-by-step photos</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="mx-auto max-w-md rounded-2xl border border-fff-border bg-fff-bg p-6 text-center sm:p-8">
                    <div className="font-mono text-sm text-emerald-400">findfoundfast.com/link/sunny-a</div>
                    <div className="mt-3 text-2xl font-extrabold text-fff-text-primary">Expires in <span className="text-emerald-400">42 minutes</span></div>
                    <div className="mt-5 rounded-xl bg-fff-green py-3 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg">Copy link</div>
                    <p className="mt-4 text-fff-caption leading-relaxed text-fff-text-secondary">Send to your driver or guest. Photos and gate codes in one place — no app.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-fff-border pt-10">
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-fff-muted">Drivers &amp; guests</p>
                <h3 className="mt-2 text-center text-xl font-extrabold tracking-tight text-fff-text-primary sm:text-2xl">What they see</h3>
                <p className="mx-auto mb-6 mt-2 max-w-lg text-center text-fff-secondary leading-relaxed text-fff-text-secondary">In the browser — no install, no login. Works on any phone.</p>
                <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-fff-border bg-fff-bg shadow-lg">
                  <div className="flex items-center justify-between border-b border-fff-border bg-fff-card px-4 py-3 sm:px-5">
                    <span className="text-fff-caption font-extrabold text-emerald-400">FindFoundFast</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">Expires in 42 min</span>
                  </div>
                  <div className="space-y-4 p-4 sm:p-6">
                    {driverSteps.map((photo) => (
                      <div key={photo.step} className="rounded-xl border border-fff-border bg-fff-card p-2.5 sm:p-3">
                        <img src={photo.url} alt={photo.title} className={`mb-3 aspect-[4/3] w-full rounded-lg bg-fff-surface-subtle sm:aspect-[16/10] ${photoFillClass(photo.step)}`} />
                        <div className="flex gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-fff-green font-mono text-sm font-bold text-fff-bg">{photo.step}</div>
                          <div>
                            <div className="font-semibold text-fff-text-primary">{photo.title}</div>
                            <div className="mt-0.5 text-fff-caption leading-relaxed text-fff-text-secondary">{photo.desc}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-emerald-500/30 bg-emerald-950/30 px-4 py-3 text-center text-fff-micro text-emerald-300">
                    When the timer ends, codes hide and the link stops working.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── CAMPUS ── */}
          {audience === "campus" && (
            <div className="p-5 sm:p-8 md:p-10">
              <p className="font-mono text-fff-eyebrow font-bold uppercase text-blue-400">For colleges and universities</p>
              <h2 className="mb-2 mt-2 text-2xl font-extrabold tracking-tight text-fff-text-primary sm:text-3xl">
                Large campus. Thousands of visitors. One link gets them there.
              </h2>
              <p className="mb-8 max-w-2xl text-fff-secondary leading-relaxed text-fff-text-secondary sm:text-fff-body-sm">
                Graduation day, move-in weekend, campus tours — your visitors should not need a map, a staff member, or three wrong turns to find the right building.
              </p>
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                {campusUseCases.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-fff-border bg-fff-bg p-5">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h3 className="font-bold text-fff-text-primary">{item.title}</h3>
                      <p className="mt-1 text-fff-caption leading-relaxed text-fff-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-blue-500/30 bg-blue-950/40 p-6">
                  <p className="font-mono text-fff-eyebrow font-bold uppercase text-blue-400">Permanent links</p>
                  <h3 className="mb-2 mt-2 text-lg font-bold text-fff-text-primary">Embed on your website. Always on.</h3>
                  <p className="mb-4 text-fff-caption leading-relaxed text-fff-text-secondary">Drop it on your admissions page, event invitation, or email signature. Share it once — works forever.</p>
                  <div className="rounded-xl border border-blue-500/30 bg-fff-surface-subtle px-4 py-3 font-mono text-sm text-blue-400">findfoundfast.com/link/state-u-main</div>
                </div>
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/35 p-6">
                  <p className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-400">Timed links work too</p>
                  <h3 className="mb-2 mt-2 text-lg font-bold text-fff-text-primary">Gate codes for events? Covered.</h3>
                  <p className="mb-4 text-fff-caption leading-relaxed text-fff-text-secondary">For stadium gates, graduation venues, or restricted parking — set a timer and codes vanish when the event ends.</p>
                  <div className="rounded-xl border border-emerald-200 bg-fff-card px-4 py-3">
                    <div className="font-mono text-sm font-bold text-emerald-400">Expires in 3 hours</div>
                    <div className="mt-1 text-sm text-fff-muted">Code disappears when the timer ends</div>
                  </div>
                </div>
              </div>
              <div className="mb-8 rounded-2xl border border-fff-border bg-fff-bg p-6 sm:p-8">
                <h3 className="mb-6 text-lg font-bold text-fff-text-primary">How it works for your campus</h3>
                <div className="grid gap-6 sm:grid-cols-3">
                  {[
                    { num: '1', title: 'Set up your buildings', body: 'Add each campus building or destination. Upload photos of parking, entrance, lobby, and key waypoints. About 15 minutes per location.' },
                    { num: '2', title: 'Share the link', body: 'Post it on your website, include it in event emails, or text it to families. Permanent links never expire — set it once.' },
                    { num: '3', title: 'Visitors follow the photos', body: 'Step-by-step from the parking lot to the exact destination. No app, no login, no calling the front desk.' },
                  ].map((s) => (
                    <div key={s.num} className="flex flex-col gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-mono text-sm font-bold text-white">{s.num}</div>
                      <h4 className="font-bold text-fff-text-primary">{s.title}</h4>
                      <p className="text-fff-caption leading-relaxed text-fff-text-secondary">{s.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-blue-500/25 bg-blue-950/40 p-6 text-center sm:p-8">
                <h3 className="mb-2 text-xl font-extrabold text-fff-text-primary">Ready to guide your campus visitors?</h3>
                <p className="mb-6 text-fff-caption text-fff-text-secondary">We will walk through setup for your specific buildings and events.</p>
                <Link href="/get-started" className={`inline-flex min-h-[48px] items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-blue-700 ${focusRing}`}>
                  Talk to us about your campus →
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="relative z-10 border-t border-fff-border bg-fff-surface-subtle px-4 py-10 text-center sm:px-6 sm:py-14">
        <h2 className="mx-auto mb-5 max-w-xl text-xl font-extrabold tracking-tight text-fff-text-primary sm:text-3xl">
          Ready to make arrivals FFFLipping Cool?
        </h2>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/get-started" className={`inline-flex min-h-[48px] items-center justify-center rounded-xl bg-fff-green px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg shadow-sm transition hover:bg-[#00e67a] ${focusRing}`}>
            Get started free →
          </Link>
          <Link href="/pricing" className={`inline-flex min-h-[48px] items-center justify-center rounded-xl border border-fff-border bg-fff-card px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-text-secondary shadow-sm transition hover:border-emerald-500 hover:text-emerald-300 ${focusRing}`}>
            View pricing →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
