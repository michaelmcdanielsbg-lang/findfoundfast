# FindFoundFast — full source bundle for external review

**Regenerate:** from repo root run `npm run bundle:review` (or `bash scripts/gen-claude-review-bundle.sh`).

Paste this entire file into Claude (or attach it). Pair it with any extra questions you have.

---

## Instructions for the reviewer (copy into your first message to Claude)

You are reviewing the FindFoundFast Next.js app (marketing site + Supabase-backed flows). The bundle below includes AGENTS.md and the main source files.

Please:
- Summarize architecture and route map.
- Note copy/UX inconsistencies, accessibility issues, and SEO/metadata gaps.
- Flag security concerns (API routes, env vars, Supabase usage).
- Suggest prioritized improvements (P0 / P1 / P2).
- Marketing uses Tailwind + `fff.*` typography tokens (`tailwind.config.js`); some app routes use inline styles and a blue accent—call out branding drift if it matters.

**Routes (marketing):** `/` (HeroSection, Header, Footer), `/pricing`, `/how-it-works` (`?audience=personal|property|campus`), `/get-started`.

**Routes (app):** `/auth/login`, `/manager`, `/resident`, `/link/[slug]` (driver view; inline styles, brand green app bar).

---

## AGENTS.md (project brief)

# FindFoundFast — Project brief (for humans & AI)

**Product:** FindFoundFast  
**Domain:** [findfoundfast.com](https://findfoundfast.com)  
**Taglines:** “Google Maps for your food and your homies” · “FFFliping Cool” (brand voice)

## What it is

A **web-based micro-location delivery guidance** product. It solves the *“I’m outside but I can’t find you”* problem at apartments, hotels, offices, hospitals, schools, and homes.

Instead of residents texting confusing directions and gate codes that get screenshot-shared forever, FindFoundFast gives drivers and guests a **single, timed link** with **step-by-step photos** and **expiring gate codes**.

## Core flows

### Property manager (one-time setup)

1. Creates a building profile (Building A, North Tower, Tower 3, etc.).
2. Uploads **4 base photos:** Parking → Entrance → Lobby → Elevator.
3. Optionally adds arrows and gate/door codes.
4. Gets **one permanent link per building** (e.g. `findfoundfast.com/link/sunny-a`).

### Resident

1. Receives a **5-character code** from the property manager.
2. Logs in once, selects **building + unit**.
3. Chooses a timer: **30 minutes, 1 hour, or 1 day**.
4. **Copies a unique timed link** and sends it to the driver or guest.

### Driver / guest (no app, no login)

1. Clicks the link.
2. Sees a **photo guide** with step numbers, descriptions, and gate code.
3. When the timer ends, **codes disappear and the link stops working** (reduces stale screenshots).

## Marketing site (this repo)

| Route | Purpose |
|-------|--------|
| `/` | Minimal landing: brand headline, value prop, **Try it free** (app), **How it works** → `/how-it-works` |
| `/how-it-works` | **Who are you?** Property vs **College campus**. Property: tabs **Manager** → Resident → Driver; campus: permanent/timed use cases. URL: `?audience=property|campus` and `?tab=manager|resident|driver` |

**Goal:** Make value obvious fast for **property managers** and show **residents** exactly what they send to drivers.

## Tech stack (current)

- **Next.js** 16+ (App Router), **React** 18  
- **Tailwind CSS** — brand tokens (`fff.*` in `tailwind.config.js`): `#0A0A0A` bg, `#00FF87` green, `#FFE135` yellow, etc.; **DM Sans** + **Space Mono** via `next/font` in `app/layout.js`  
- **Supabase** (`@supabase/ssr`, `@supabase/supabase-js`) — auth, DB, photo storage (see app routes beyond marketing pages)  
- **Deploy:** Vercel; production URL may include `findfoundfast-final.vercel.app` until DNS/slug naming is unified  

## Brand voice

Fun, bold, confident, **anti-frustration**. Speaks to residents like a friend and to property managers like a **smart business decision**.

## AI / editor notes

- Prefer **focused diffs**; don’t refactor unrelated code.  
- Marketing styling should stay aligned with **`fff` tokens** and existing header/footer patterns.  
- **App URL** for CTAs is often `https://findfoundfast-final.vercel.app` in code — consider `NEXT_PUBLIC_SITE_URL` for env-based URLs later.  

---

*Last updated: project brief synced for Cursor / agent context.*


---

## `package.json`

```json
{
  "name": "findfoundfast",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "bundle:review": "bash scripts/gen-claude-review-bundle.sh"
  },
  "dependencies": {
    "@supabase/ssr": "^0.3.0",
    "@supabase/supabase-js": "^2.43.0",
    "next": "^16.2.1",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}

```


## `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
}

module.exports = nextConfig

```


## `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // FindFoundFast brand (matches findfoundfast.com marketing)
        fff: {
          // Legacy aliases
          bg: '#0A0A0A',
          card: '#111111',
          gray: '#141414',
          green: '#00FF87',
          yellow: '#FFE135',
          white: '#F5F5F5',
          muted: '#A3A3A3',
          rose: '#FF3D3D',
          // Semantic roles
          surface: '#0A0A0A',
          'surface-elevated': '#111111',
          'surface-subtle': '#141414',
          border: '#2A2A2A',
          'text-primary': '#F5F5F5',
          'text-secondary': '#C9C9C9',
          'text-muted': '#A3A3A3',
          accent: '#00FF87',
          'accent-warm': '#FFE135',
          danger: '#FF3D3D',
        },
        sky: { DEFAULT: '#2E8FF0', dark: '#1A5FA8', light: '#EBF4FE' },
        ink: '#0D1B2A',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Marketing type scale — DM Sans body + Space Mono UI
        // Body: 16px min (mobile accessibility baseline) → ~17px on large viewports (fluid)
        'fff-body': [
          'clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)',
          { lineHeight: '1.65' },
        ],
        'fff-body-sm': ['1rem', { lineHeight: '1.55' }], // 16px — cards / tight blocks
        'fff-secondary': ['1rem', { lineHeight: '1.55' }], // 16px — subcopy
        'fff-caption': ['0.9375rem', { lineHeight: '1.55' }], // 15px — quotes / notes
        // Footer / legal — keep ≥14px (avoid “tiny print” as default body-adjacent UI)
        'fff-micro': ['0.875rem', { lineHeight: '1.5' }], // 14px
        // Mono caps: 13px + moderate tracking (wide tracking + small size hurts legibility)
        'fff-eyebrow': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em' }], // 13px uppercase labels
      },
    },
  },
  plugins: [],
}

```


## `jsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}

```


## `postcss.config.js`

```javascript
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }

```


## `app/layout.js`

```javascript
import { DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
})

export const metadata = {
  title: 'FindFoundFast — Micro-location guidance for deliveries or visitors',
  description:
    'Micro-location guidance for deliveries or visitors—timed photo links and expiring gate codes so people find the door, not just the pin. No app for guests.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fafaf9',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable}`}>
      <body
        className={`${dmSans.className} min-h-[100dvh] bg-stone-50 text-fff-body text-stone-900 antialiased`}
      >
        {children}
      </body>
    </html>
  )
}

```


## `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    /* Crisper rendering on macOS / iOS (pairs with Tailwind antialiased on body) */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: rgba(0, 255, 135, 0.35);
    color: #0c0c0c;
  }
}

```


## `lib/supabase.js`

```javascript
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => 
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

```


## `app/page.js`

```javascript
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

      <Header />

      <main className="relative z-10">
        <HeroSection />

        {/* ── WHO IS IT FOR — 4 audience cards ── */}
        <section className="border-t border-stone-200 bg-white py-12 sm:py-14 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <p className="mb-2 font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Who it&apos;s for</p>
              <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
                One product. Every place people get lost.
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/how-it-works?audience=personal"
                className={`group flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-6 transition-all hover:border-purple-300 hover:shadow-md ${focusRing}`}
              >
                <span className="mb-3 text-3xl">🙋</span>
                <h3 className="text-base font-extrabold text-stone-900">Just me</h3>
                <p className="mt-1.5 text-fff-caption text-stone-500 leading-relaxed">
                  Upload photos from parking to your door. Paste one link in your delivery app — done forever.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Free tier", "$4.99/mo"].map((t) => (
                    <span key={t} className="rounded-full bg-purple-100 px-2.5 py-1 font-mono text-fff-eyebrow font-bold uppercase text-purple-800">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-auto pt-5 font-mono text-fff-eyebrow font-bold uppercase text-purple-600 group-hover:text-purple-700">See plans →</p>
              </Link>

              <Link
                href="/how-it-works?audience=personal"
                className={`group flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-6 transition-all hover:border-amber-300 hover:shadow-md ${focusRing}`}
              >
                <span className="mb-3 text-3xl">🏡</span>
                <h3 className="text-base font-extrabold text-stone-900">Airbnb host</h3>
                <p className="mt-1.5 text-fff-caption text-stone-500 leading-relaxed">
                  Send guests a photo guide instead of a wall of check-in text. They find the lockbox. You stop getting 11pm texts.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["One-time $9.99", "No subscription"].map((t) => (
                    <span key={t} className="rounded-full bg-amber-100 px-2.5 py-1 font-mono text-fff-eyebrow font-bold uppercase text-amber-800">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-auto pt-5 font-mono text-fff-eyebrow font-bold uppercase text-amber-600 group-hover:text-amber-700">See plans →</p>
              </Link>

              <Link
                href="/how-it-works?audience=property"
                className={`group flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-6 transition-all hover:border-emerald-300 hover:shadow-md ${focusRing}`}
              >
                <span className="mb-3 text-3xl">🏢</span>
                <h3 className="text-base font-extrabold text-stone-900">Property manager</h3>
                <p className="mt-1.5 text-fff-caption text-stone-500 leading-relaxed">
                  One link per building. Residents share timed links with drivers. Codes expire automatically — no stale screenshots.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Resident portal", "From $49/mo"].map((t) => (
                    <span key={t} className="rounded-full bg-emerald-100 px-2.5 py-1 font-mono text-fff-eyebrow font-bold uppercase text-emerald-800">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-auto pt-5 font-mono text-fff-eyebrow font-bold uppercase text-emerald-600 group-hover:text-emerald-700">See plans →</p>
              </Link>

              <Link
                href="/how-it-works?audience=campus"
                className={`group flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md ${focusRing}`}
              >
                <span className="mb-3 text-3xl">🎓</span>
                <h3 className="text-base font-extrabold text-stone-900">College campus</h3>
                <p className="mt-1.5 text-fff-caption text-stone-500 leading-relaxed">
                  Graduation, move-in, tours — everyone finds the right building without calling the front desk.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Permanent links", "Custom pricing"].map((t) => (
                    <span key={t} className="rounded-full bg-blue-100 px-2.5 py-1 font-mono text-fff-eyebrow font-bold uppercase text-blue-800">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-auto pt-5 font-mono text-fff-eyebrow font-bold uppercase text-blue-600 group-hover:text-blue-700">See plans →</p>
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS — 3 steps ── */}
        <section className="py-12 sm:py-14 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <p className="mb-2 font-mono text-fff-eyebrow font-bold uppercase text-stone-400">How it works</p>
              <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
                Set up once. Share forever.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  icon: IconBuilding,
                  step: "01",
                  title: "Add your location",
                  body: "Create a profile for your building, apartment, or Airbnb. Give it a name — anything works.",
                },
                {
                  icon: IconLink,
                  step: "02",
                  title: "Upload your photos",
                  body: "Parking to entrance to lobby to your door. Add arrows. Add gate codes. Takes 15 minutes.",
                },
                {
                  icon: IconTimer,
                  step: "03",
                  title: "Share your link",
                  body: "Paste it in DoorDash, text it to a guest, or drop it on your website. Drivers follow the photos — no calls, no confusion.",
                },
              ].map((item) => {
                const FeatureIcon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-3 flex items-center gap-3">
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

        {/* ── TESTIMONIALS — 3 static cards ── */}
        <section className="border-y border-stone-200 bg-stone-50 py-12 sm:py-14" aria-label="What people are saying">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <p className="mb-2 font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">Real feedback</p>
              <h2 className="text-2xl font-extrabold tracking-tight text-stone-900">What people actually said</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  quote:
                    "I set it up once and now my Airbnb guests never get lost. They always find the lockbox on the first try.",
                  who: "Airbnb host",
                  emoji: "🏡",
                },
                {
                  quote:
                    "Gate codes were getting screenshot-shared everywhere. This makes it timed and simple — exactly what we needed.",
                  who: "Apartment resident",
                  emoji: "🏢",
                },
                {
                  quote:
                    "Move-in day used to take three staff members just for parking directions. One link changed that.",
                  who: "University housing director",
                  emoji: "🎓",
                },
              ].map((t) => (
                <div key={t.who} className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                  <span className="mb-4 text-2xl">{t.emoji}</span>
                  <p className="flex-1 text-fff-caption leading-relaxed text-stone-700">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">{t.who}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING TEASER ── */}
        <section className="bg-white py-12 sm:py-14 md:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <p className="mb-2 font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Pricing</p>
              <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
                Simple pricing for everyone
              </h2>
              <p className="mt-2 text-stone-500 text-fff-secondary">Start free. Upgrade when you need more.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Free",
                  price: "$0",
                  sub: "forever",
                  desc: "Timed links, 3 photos, no credit card.",
                  cta: "Start free",
                  featured: false,
                },
                {
                  label: "Personal guide",
                  price: "$4.99",
                  sub: "/mo",
                  desc: "Permanent link, 5 locations, unlimited photos.",
                  cta: "Get personal guide",
                  featured: true,
                },
                {
                  label: "Property plan",
                  price: "$49",
                  sub: "/mo",
                  desc: "Unlimited buildings and units. Resident portal.",
                  cta: "Get started",
                  featured: false,
                },
              ].map((p) => (
                <div
                  key={p.label}
                  className={`flex flex-col rounded-2xl border p-5 shadow-sm ${
                    p.featured ? "border-emerald-300 bg-emerald-50 shadow-md" : "border-stone-200 bg-stone-50"
                  }`}
                >
                  <p className={`font-mono text-fff-eyebrow font-bold uppercase ${p.featured ? "text-emerald-700" : "text-stone-400"}`}>{p.label}</p>
                  <div className="mt-1.5 flex items-baseline gap-0.5">
                    <span className={`text-3xl font-extrabold tabular-nums tracking-tight ${p.featured ? "text-fff-green" : "text-stone-900"}`}>{p.price}</span>
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
            <h2 className="text-2xl font-extrabold text-stone-900 md:text-3xl">Stop giving crappy directions.</h2>
            <p className="mt-2 text-fff-body text-stone-500">One link. Every photo. Codes that vanish.</p>
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

      <Footer />
    </div>
  );
}

```


## `components/Header.js`

```javascript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50";

export default function Header() {
  const pathname = usePathname();

  const navLink = (href, label) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return active ? (
      <span className="font-mono text-sm font-bold uppercase tracking-wide text-emerald-700">{label}</span>
    ) : (
      <Link
        href={href}
        className={`font-mono text-sm font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 ${focusRing} rounded-sm`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="relative z-10 border-b border-stone-200 bg-white/90 backdrop-blur-xl">
      <div className="flex flex-col gap-2 px-4 py-2.5 pt-[max(0.75rem,env(safe-area-inset-top))] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3">
        <Link
          href="/"
          className={`text-lg font-extrabold tracking-tight text-stone-900 transition-colors hover:text-stone-800 ${focusRing} rounded-sm`}
        >
          Find<span className="text-[#00c46f]">Found</span>Fast
        </Link>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6" aria-label="Main navigation">
          {navLink("/pricing", "Pricing")}
          {navLink("/how-it-works", "How it works")}
          <Link
            href="/get-started"
            className={`inline-flex min-h-[40px] items-center justify-center rounded-lg bg-fff-green px-4 py-2 font-mono text-fff-eyebrow font-bold uppercase text-fff-bg shadow-sm transition-colors hover:bg-[#00e67a] ${focusRing}`}
          >
            Get started →
          </Link>
        </nav>
      </div>
    </header>
  );
}

```


## `components/Footer.js`

```javascript
import Link from "next/link";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-stone-200 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 sm:flex-row sm:justify-between sm:px-6">
        <Link
          href="/"
          className={`font-mono text-sm font-extrabold tracking-tight text-stone-700 hover:text-stone-900 ${focusRing} rounded-sm`}
        >
          Find<span className="text-[#00c46f]">Found</span>Fast
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs font-bold uppercase tracking-wide text-stone-400">
          <Link href="/how-it-works" className={`transition-colors hover:text-stone-700 ${focusRing} rounded-sm`}>
            How it works
          </Link>
          <Link href="/pricing" className={`transition-colors hover:text-stone-700 ${focusRing} rounded-sm`}>
            Pricing
          </Link>
          <Link href="/get-started" className={`transition-colors hover:text-emerald-700 ${focusRing} rounded-sm`}>
            Get started
          </Link>
        </div>
        <p className="font-mono text-xs text-stone-400">© {new Date().getFullYear()} FindFoundFast</p>
      </div>
    </footer>
  );
}

```


## `components/HeroSection.js`

```javascript
/**
 * FindFoundFast — HeroSection (redesigned)
 * Illustrated scene above the fold, before/after panels below.
 */

import Link from "next/link";
import HeroIllustration from "./HeroIllustration";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50";

/* ─── Parking lot photo SVG ───────────────────────────────────── */
function ParkingPhoto() {
  return (
    <svg
      width="100%"
      height="44"
      viewBox="0 0 280 54"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="280" height="36" fill="#1e3a5f" />
      <rect x="0" y="35" width="280" height="19" fill="#374151" />
      <line x1="34"  y1="35" x2="34"  y2="54" stroke="#4b6280" strokeWidth="1" />
      <line x1="78"  y1="35" x2="78"  y2="54" stroke="#4b6280" strokeWidth="1" />
      <line x1="122" y1="35" x2="122" y2="54" stroke="#4b6280" strokeWidth="1" />
      <line x1="166" y1="35" x2="166" y2="54" stroke="#4b6280" strokeWidth="1" />
      <line x1="210" y1="35" x2="210" y2="54" stroke="#4b6280" strokeWidth="1" />
      <rect x="36"  y="39" width="38" height="12" rx="2" fill="#4b5563" />
      <rect x="80"  y="39" width="38" height="12" rx="2" fill="#4b5563" />
      {/* Green directional arrow */}
      <path d="M170 17 L200 17" stroke="#00FF87" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M195 12 L200 17 L195 22" stroke="#00FF87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ─── Entrance door photo SVG ─────────────────────────────────── */
function EntrancePhoto() {
  return (
    <svg
      width="100%"
      height="38"
      viewBox="0 0 280 48"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="280" height="48" fill="#334155" />
      <rect x="100" y="4" width="80" height="42" rx="2" fill="#2d3f52" />
      <rect x="126" y="12" width="22" height="32" rx="2" fill="#1e2d3d" stroke="#4b6280" strokeWidth="1" />
      <circle cx="145" cy="28" r="2" fill="#64748b" />
      <rect x="152" y="16" width="13" height="16" rx="1.5" fill="#1e2d3d" stroke="#4b6280" strokeWidth="0.8" />
      <circle cx="156" cy="21" r="1.2" fill="#4ade80" />
      <circle cx="161" cy="21" r="1.2" fill="#4ade80" />
      <circle cx="156" cy="26" r="1.2" fill="#4ade80" />
      <circle cx="161" cy="26" r="1.2" fill="#4ade80" />
      {/* Green directional arrow */}
      <path d="M52 24 L94 24" stroke="#00FF87" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M89 19 L94 24 L89 29" stroke="#00FF87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ─── Chaos building SVG ── */
function ChaosBuilding() {
  return (
    <svg
      width="100%"
      viewBox="0 0 320 168"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="block h-auto w-full shrink-0"
    >
      <rect x="0" y="126" width="320" height="42" fill="#f5f4f1" />
      <line x1="0" y1="126" x2="320" y2="126" stroke="#ede9e4" strokeWidth="1" />
      <line x1="0" y1="146" x2="320" y2="146" stroke="#e8e4de" strokeWidth="0.5" strokeDasharray="14 8" />
      <rect x="108" y="24" width="104" height="102" rx="3" fill="#eeeeed" stroke="#d5d2cc" strokeWidth="1.5" />
      <line x1="108" y1="58" x2="212" y2="58" stroke="#e2dfda" strokeWidth="0.8" />
      <line x1="108" y1="92" x2="212" y2="92" stroke="#e2dfda" strokeWidth="0.8" />
      {[0, 1, 2, 3].flatMap((col) =>
        [0, 1, 2].map((row) => (
          <rect
            key={`w${col}-${row}`}
            x={120 + col * 24}
            y={32 + row * 34}
            width={17}
            height={12}
            rx="1.5"
            fill={
              row === 0 && col === 1 ? "#fef3c7" : row === 2 && col === 2 ? "#fef3c7" : "#fee2e2"
            }
            stroke={
              row === 0 && col === 1 ? "#fcd34d" : row === 2 && col === 2 ? "#fcd34d" : "#fca5a5"
            }
            strokeWidth="0.8"
          />
        ))
      )}
      <rect x="150" y="102" width="20" height="24" rx="1.5" fill="#fecaca" stroke="#f87171" strokeWidth="1.2" />
      <rect x="128" y="10" width="64" height="17" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="0.8" />
      <text x="160" y="22.5" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-monospace,monospace" letterSpacing="0.1em" fill="#dc2626">
        WHERE????
      </text>
      <g transform="translate(22,134) rotate(-12)">
        <rect x="-20" y="-10" width="40" height="19" rx="6" fill="#1f2937" stroke="#ef4444" strokeWidth="1.3" />
        <text x="0" y="5" textAnchor="middle" fontSize="11" fontWeight="900" fill="#ef4444" fontFamily="system-ui,sans-serif">
          ?
        </text>
      </g>
      <g transform="translate(296,131) rotate(9)">
        <rect x="-20" y="-10" width="40" height="19" rx="6" fill="#1f2937" stroke="#f59e0b" strokeWidth="1.3" />
        <text x="0" y="5" textAnchor="middle" fontSize="11" fontWeight="900" fill="#f59e0b" fontFamily="system-ui,sans-serif">
          ?
        </text>
      </g>
      <g transform="translate(64,140) rotate(6)">
        <rect x="-17" y="-9" width="34" height="17" rx="5" fill="#1f2937" stroke="#ef4444" strokeWidth="1" />
        <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="900" fill="#ef4444" fontFamily="system-ui,sans-serif">
          ?
        </text>
      </g>
      <path d="M42 126 Q74 102 106 114" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.55" />
      <path d="M276 126 Q246 102 214 112" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.55" />
      <path d="M80 134 Q102 108 108 118" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 3" fill="none" opacity="0.4" />
    </svg>
  );
}

/* ─── LEFT PANEL: Before ──────────────────────────────────────── */
function BeforePanel() {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-red-200 bg-rose-50/40 shadow-sm">
      <div className="flex min-w-0 flex-shrink-0 items-center gap-2 border-b border-red-100 bg-red-50 px-3 py-2">
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" aria-hidden />
        <span className="min-w-0 break-words font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-red-700 sm:text-[11px]">
          Without FindFoundFast
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {/* Chat — larger type, tight row gaps */}
        <div className="flex flex-shrink-0 flex-col gap-1.5 bg-[#fff8f8] px-2.5 py-2">
          <div className="flex items-end gap-1.5">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-stone-200 text-[10px]" aria-hidden>🚗</span>
            <div className="max-w-[88%] rounded-[18px] rounded-bl-md bg-[#e5e5ea] px-2.5 py-1.5 text-[13px] leading-snug text-stone-900">
              Hey I&apos;m outside, how do I get in? 😕
            </div>
          </div>
          <div className="flex items-end gap-1.5">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-stone-200 text-[10px]" aria-hidden>🚗</span>
            <div className="max-w-[90%] rounded-[18px] rounded-bl-md bg-[#e5e5ea] px-2.5 py-1.5 text-[13px] leading-snug text-stone-900">
              Which entrance? There are 4 doors here
            </div>
          </div>
          <div className="flex items-end justify-end gap-1.5">
            <div className="max-w-[92%] rounded-[18px] rounded-br-md bg-emerald-100 px-2.5 py-1.5 text-[13px] leading-snug text-emerald-900">
              Go to SECOND entrance, past mailboxes, elevator 2 not 1, floor 4, turn right, third door — gate code 4729
            </div>
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px]" aria-hidden>🏠</span>
          </div>
          <div className="flex items-end gap-1.5">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-stone-200 text-[10px]" aria-hidden>🚗</span>
            <div className="max-w-[78%] rounded-[18px] rounded-bl-md bg-rose-100 px-2.5 py-1.5 text-[13px] leading-snug text-red-800">
              Order cancelled. Sorry 😞
            </div>
          </div>
        </div>

        {/* THE RESULT */}
        <div className="flex flex-shrink-0 items-center gap-2 px-3 pb-0 pt-1">
          <div className="h-px flex-1 bg-stone-300/80" />
          <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-stone-500">
            The result
          </span>
          <div className="h-px flex-1 bg-stone-300/80" />
        </div>

        {/* Chaos — flex-1 fills when column is stretched to match “With” */}
        <div className="flex min-h-0 flex-1 flex-col justify-start bg-[#f5f4f1] pt-0.5">
          <ChaosBuilding />
        </div>
      </div>

      {/* Caption */}
      <div className="flex-shrink-0 border-t border-red-100 bg-red-50 px-3 py-2">
        <p className="text-[13px] font-semibold leading-snug text-red-700">
          Cancelled. Wrong entrance. Gate code in a stranger&apos;s group chat.
        </p>
      </div>
    </div>
  );
}

/* ─── RIGHT PANEL: After ──────────────────────────────────────── */
function AfterPanel() {
  return (
    <div
      className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl border-2 border-emerald-300 bg-white shadow-lg"
      style={{ boxShadow: "0 4px 24px rgba(0,180,100,0.10)" }}
    >
      {/* Header */}
      <div className="flex min-w-0 flex-shrink-0 items-center justify-between gap-2 border-b border-emerald-200 bg-emerald-50 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden />
          <span className="min-w-0 break-words font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 sm:text-[11px]">
            With FindFoundFast
          </span>
        </div>
        <span className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-emerald-600 sm:text-[10px]">
          ● DELIVERED
        </span>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-1.5 p-2 sm:p-2.5">

        {/* Beat 1 — driver: on my way */}
        <div className="flex items-end gap-1.5">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-stone-200 text-[10px]" aria-hidden>🚗</span>
          <div className="max-w-[62%] rounded-[18px] rounded-bl-md bg-[#e5e5ea] px-2.5 py-1.5 text-[13px] leading-snug text-stone-900">
            On my way! 👋
          </div>
        </div>

        {/* Beat 2 — resident: one tap, sends the link */}
        <div className="flex items-end justify-end gap-1.5">
          <div className="flex flex-col items-end gap-1">
            <div className="rounded-[18px] rounded-br-md bg-emerald-100 px-2.5 py-1.5 text-[13px] leading-snug text-emerald-900">
              Here&apos;s your guide 👇
            </div>
            {/* Link preview */}
            <div className="w-full max-w-[164px] overflow-hidden rounded-lg border border-emerald-200 bg-white shadow-sm">
              <div className="flex items-center gap-1.5 px-2 py-1">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-[#00FF87]">
                  <span className="text-[13px] font-black leading-none text-white">F</span>
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="text-[12px] font-bold text-stone-900">FindFoundFast</p>
                  <p className="text-[11px] text-stone-500">Sunny A · Bldg A</p>
                </div>
              </div>
              <div className="border-t border-stone-100 px-2 pb-1 pt-0.5">
                <p
                  className="truncate rounded border border-emerald-200/50 bg-emerald-50 px-1.5 py-0.5 font-mono text-[11px] leading-none text-emerald-900"
                  title="findfoundfast.com/link/sunny-412"
                >
                  findfoundfast.com/link/sunny-412
                </p>
                <p className="mt-0.5 text-[10px] leading-tight text-stone-400">📸 4 photos · 30 min</p>
              </div>
            </div>
          </div>
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px]" aria-hidden>🏠</span>
        </div>

        {/* Divider */}
        <div className="my-0 flex items-center gap-2 py-0.5">
          <div className="h-px flex-1 bg-stone-300/80" />
          <span className="whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-stone-500">
            Driver opens link
          </span>
          <div className="h-px flex-1 bg-stone-300/80" />
        </div>

        {/* Beat 3 — driver view */}
        <div className="min-h-0 w-full min-w-0 shrink-0 overflow-hidden rounded-lg" style={{ background: "#111827" }}>
          {/* App bar */}
          <div
            className="flex min-w-0 shrink-0 items-center justify-between gap-1.5 px-2 py-1"
            style={{ background: "#14532d" }}
          >
            <p className="min-w-0 truncate leading-tight text-[9px] font-bold sm:text-[10px]">
              <span className="font-mono text-[8px] font-bold tracking-tight text-emerald-300/95 sm:text-[9px]">
                FindFoundFast
              </span>
              <span className="text-white/95"> · Sunny Apts · Apt 412</span>
            </p>
            <span
              className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold tabular-nums leading-none text-emerald-400"
              style={{ background: "#166534" }}
            >
              29:41
            </span>
          </div>

          {/* Step 1 — Parking (image size unchanged; labels enlarged for readability) */}
          <div className="mx-1.5 mt-1 overflow-hidden rounded-md" style={{ background: "#1e293b" }}>
            <div className="relative" style={{ background: "#2d3f52" }}>
              <ParkingPhoto />
              <span
                className="absolute left-1.5 top-1.5 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-white"
                style={{ background: "#22c55e" }}
              >
                STEP 1
              </span>
            </div>
            <div className="px-2.5 py-1.5">
              <p className="text-[14px] font-bold leading-snug text-slate-100">Parking / Drop-off</p>
              <p className="text-[13px] leading-snug text-slate-400">Entrance B · blue sign on left</p>
            </div>
          </div>

          {/* Step 2 — Entrance */}
          <div className="mx-1.5 mt-1 overflow-hidden rounded-md" style={{ background: "#1e293b" }}>
            <div className="relative" style={{ background: "#2d3f52" }}>
              <EntrancePhoto />
              <span
                className="absolute left-1.5 top-1.5 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-white"
                style={{ background: "#22c55e" }}
              >
                STEP 2
              </span>
            </div>
            <div className="px-2.5 py-1.5">
              <p className="text-[14px] font-bold leading-snug text-slate-100">Main Entrance</p>
              <p className="text-[13px] leading-snug text-slate-400">Keypad on left · use code below</p>
            </div>
          </div>

          {/* Gate code */}
          <div className="mx-1.5 mb-1 mt-1 flex shrink-0 items-center justify-between rounded-md bg-[#00FF87] px-2 py-1.5 shadow-sm">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-950/90">
              Gate code
            </span>
            <span className="font-mono text-[19px] font-black tracking-[0.16em] text-[#0a0a0a]">
              4729
            </span>
          </div>

          {/* Progress dots */}
          <div className="mb-1 flex shrink-0 justify-center gap-0.5">
            <div className="h-0.5 w-3 rounded-full" style={{ background: "#22c55e" }} />
            <div className="h-0.5 w-3 rounded-full" style={{ background: "#22c55e" }} />
            <div className="h-0.5 w-2 rounded-full" style={{ background: "#374151" }} />
            <div className="h-0.5 w-2 rounded-full" style={{ background: "#374151" }} />
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="flex-shrink-0 border-t border-emerald-200 bg-emerald-50 px-3 py-2">
        <p className="text-[13px] font-semibold leading-snug text-emerald-700">
          Delivered first try. Code already vanished. Zero texts, zero calls.
        </p>
      </div>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section className="relative mx-auto w-full min-w-0 max-w-6xl px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-8 sm:px-6 sm:pb-14 sm:pt-10 md:pb-16 md:pt-12">

      {/* Eyebrow pills */}
      <div className="mb-5 flex justify-center">
        <p
          className="mx-auto flex max-w-[min(100%,36rem)] flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-center font-sans text-sm font-semibold leading-snug text-stone-600 sm:text-fff-caption"
          role="note"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden />
            <span>Free to start</span>
          </span>
          <span className="select-none text-stone-300" aria-hidden>
            ·
          </span>
          <span>No app for drivers</span>
          <span className="select-none text-stone-300" aria-hidden>
            ·
          </span>
          <span>Codes expire automatically</span>
        </p>
      </div>

      {/* Headline */}
      <h1 className="mx-auto max-w-[640px] px-2 text-center text-balance text-[clamp(1.75rem,4.5vw+0.5rem,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-stone-900 sm:px-0">
        Google Maps stops at the address.{" "}
        <span className="text-[#00c46f]">We take&nbsp;them to&nbsp;the&nbsp;door.</span>
      </h1>

      {/* Sub */}
      <p className="mx-auto mt-4 max-w-sm px-3 text-center text-base leading-relaxed text-stone-500 sm:px-0 sm:text-[17px]">
        Photo-guided directions. Expiring gate codes.
        <br />One link — paste it once, works forever.
      </p>

      {/* CTAs */}
      <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-7 sm:flex-row sm:items-center">
        <Link
          href="/get-started"
          className={`inline-flex min-h-[48px] w-full min-w-[180px] items-center justify-center rounded-xl bg-stone-900 px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-stone-700 sm:w-auto ${focusRing}`}
        >
          Start for free
        </Link>
        <Link
          href="/how-it-works"
          className={`inline-flex min-h-[48px] w-full min-w-[180px] items-center justify-center rounded-xl border border-stone-300 bg-white px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-stone-700 shadow-sm transition-colors hover:border-emerald-400 hover:text-emerald-800 sm:w-auto ${focusRing}`}
        >
          See how it works ↓
        </Link>
      </div>

      {/* Illustrated hero scene */}
      <div className="mt-10 sm:mt-12">
        <HeroIllustration />
      </div>

      {/* Before / After panels */}
      <div className="mt-6 grid min-h-0 w-full grid-cols-1 items-stretch gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-[1fr_1.08fr]">
        <BeforePanel />
        <AfterPanel />
      </div>

      {/* Feature pills */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5" role="list" aria-label="What each guide covers">
        {[
          { icon: "📍", label: "Where to park" },
          { icon: "🚪", label: "How to get in" },
          { icon: "🏠", label: "Where to go" },
        ].map((item) => (
          <div
            key={item.label}
            role="listitem"
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 shadow-sm"
          >
            <span className="select-none text-base leading-none" aria-hidden>{item.icon}</span>
            <span className="font-mono text-[11px] font-bold uppercase leading-none tracking-[0.06em] text-stone-700 sm:text-xs sm:tracking-[0.07em]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Stat strip — 2×2 on mobile, row on desktop */}
      <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200 shadow-sm sm:flex sm:flex-row sm:gap-0 sm:bg-white">
        {[
          { val: "1 link", sub: "per building" },
          { val: "0 apps", sub: "for drivers"  },
          { val: "Auto",   sub: "codes expire"  },
          { val: "Free",   sub: "to start"      },
        ].map((s, i, arr) => (
          <div
            key={s.val}
            className={`bg-white px-3 py-2.5 text-center sm:flex-1 sm:px-5 sm:py-3.5 ${
              i < arr.length - 1 ? "sm:border-r sm:border-stone-200" : ""
            }`}
          >
            <p className="text-lg font-extrabold tracking-tight text-stone-900 sm:text-xl md:text-2xl">{s.val}</p>
            <p className="mt-0.5 font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.08em] text-stone-400 sm:mt-1 sm:text-[11px] sm:tracking-[0.09em]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Trust line */}
      <p className="mt-4 px-2 text-center text-sm leading-relaxed text-stone-400 sm:text-[15px]">
        No guest app · Works in any browser · Codes expire automatically
      </p>
    </section>
  );
}

```


## `components/HeroIllustration.js`

```javascript
/**
 * Illustrated hero scene — phone + buildings + scooter (pure SVG).
 */
export default function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-2xl select-none" aria-hidden>
      <svg
        width="100%"
        viewBox="0 0 680 340"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#f5f3ef" />
          </linearGradient>
          <linearGradient id="buildingA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e7e5e0" />
            <stop offset="100%" stopColor="#d6d3cc" />
          </linearGradient>
          <linearGradient id="buildingB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dde3ea" />
            <stop offset="100%" stopColor="#c9d1db" />
          </linearGradient>
          <filter id="phone-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#00c46f" floodOpacity="0.18" />
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.10" />
          </filter>
        </defs>

        <rect width="680" height="340" fill="url(#sky)" />

        <rect x="0" y="270" width="680" height="70" fill="#ede9e3" />
        <rect x="0" y="270" width="680" height="2" fill="#ddd9d2" />

        <rect x="0" y="290" width="680" height="28" fill="#d6d3cc" />
        <rect x="0" y="288" width="680" height="2" fill="#c8c4bc" />
        <rect x="0" y="318" width="680" height="2" fill="#c8c4bc" />
        {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600].map((x) => (
          <rect key={x} x={x} y="303" width="36" height="3" rx="1.5" fill="#bbb8b0" opacity="0.6" />
        ))}

        <rect x="110" y="80" width="160" height="192" rx="3" fill="url(#buildingA)" stroke="#ccc8c0" strokeWidth="1" />
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`a-${row}-${col}`}
              x={126 + col * 44}
              y={96 + row * 34}
              width={26}
              height={18}
              rx="2"
              fill={row === 0 && col === 1 ? "#fef9c3" : row === 2 && col === 0 ? "#fef9c3" : "#c5d9f0"}
              opacity="0.85"
            />
          ))
        )}
        <rect x="168" y="234" width="24" height="38" rx="2" fill="#c5bfb5" stroke="#b8b2a8" strokeWidth="1" />
        <circle cx="189" cy="253" r="2" fill="#a09890" />
        <rect x="126" y="60" width="48" height="16" rx="4" fill="#00FF87" />
        <text x="150" y="72" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="ui-monospace,monospace" fill="#0a0a0a" letterSpacing="0.05em">
          BLDG A
        </text>

        <rect x="430" y="140" width="130" height="132" rx="3" fill="url(#buildingB)" stroke="#c0c8d0" strokeWidth="1" />
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => (
            <rect
              key={`b-${row}-${col}`}
              x={448 + col * 52}
              y={156 + row * 34}
              width={28}
              height={18}
              rx="2"
              fill={row === 1 && col === 1 ? "#fef9c3" : "#c5d9f0"}
              opacity="0.8"
            />
          ))
        )}
        <rect x="477" y="236" width="22" height="36" rx="2" fill="#b8c4cf" stroke="#a8b4bf" strokeWidth="1" />

        {[90, 290, 420, 590].map((x) => (
          <g key={x}>
            <rect x={x + 6} y="258" width="4" height="16" fill="#a89f8c" />
            <ellipse cx={x + 8} cy="252" rx="12" ry="14" fill="#4ade80" opacity="0.7" />
            <ellipse cx={x + 8} cy="248" rx="9" ry="10" fill="#22c55e" opacity="0.6" />
          </g>
        ))}

        <g transform="translate(42, 274)">
          <rect x="0" y="0" width="52" height="20" rx="8" fill="#1e293b" />
          <rect x="34" y="-8" width="14" height="12" rx="3" fill="#334155" stroke="#475569" strokeWidth="0.8" />
          <rect x="2" y="-10" width="26" height="16" rx="3" fill="#00FF87" />
          <text x="15" y="-1" textAnchor="middle" fontSize="7" fontWeight="800" fontFamily="ui-monospace,monospace" fill="#0a0a0a">
            FFF
          </text>
          <circle cx="10" cy="20" r="7" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <circle cx="10" cy="20" r="3" fill="#64748b" />
          <circle cx="42" cy="20" r="7" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <circle cx="42" cy="20" r="3" fill="#64748b" />
          <line x1="-8" y1="5" x2="-18" y2="5" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <line x1="-8" y1="10" x2="-22" y2="10" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <line x1="-8" y1="15" x2="-16" y2="15" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        </g>

        <g transform="translate(270, 30)" filter="url(#phone-shadow)">
          <rect x="0" y="0" width="140" height="248" rx="18" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="6" y="8" width="128" height="232" rx="14" fill="#111827" />
          <rect x="48" y="8" width="44" height="10" rx="5" fill="#0f172a" />

          <rect x="6" y="18" width="128" height="26" rx="0" fill="#14532d" />
          <rect x="6" y="30" width="128" height="14" rx="0" fill="#14532d" />
          <text x="20" y="30" fontSize="7" fontWeight="700" fontFamily="ui-monospace,monospace" fill="#86efac" letterSpacing="0.06em">
            FINDFOUNDFAST
          </text>
          <text x="20" y="40" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif" fill="#ffffff">
            Sunny Apts · Apt 412
          </text>
          <rect x="98" y="22" width="30" height="14" rx="4" fill="#166534" />
          <text x="113" y="32" textAnchor="middle" fontSize="7.5" fontWeight="700" fontFamily="ui-monospace,monospace" fill="#4ade80">
            29:41
          </text>

          <rect x="12" y="50" width="116" height="68" rx="8" fill="#1e293b" />
          <rect x="12" y="50" width="116" height="42" rx="8" fill="#1e3a5f" />
          <rect x="12" y="76" width="116" height="16" rx="0" fill="#1e3a5f" />
          <line x1="36" y1="68" x2="36" y2="92" stroke="#334155" strokeWidth="0.8" />
          <line x1="60" y1="68" x2="60" y2="92" stroke="#334155" strokeWidth="0.8" />
          <line x1="84" y1="68" x2="84" y2="92" stroke="#334155" strokeWidth="0.8" />
          <line x1="108" y1="68" x2="108" y2="92" stroke="#334155" strokeWidth="0.8" />
          <rect x="38" y="79" width="18" height="8" rx="1.5" fill="#374151" />
          <rect x="62" y="79" width="18" height="8" rx="1.5" fill="#374151" />
          <path d="M88 62 L108 62" stroke="#00FF87" strokeWidth="2" strokeLinecap="round" />
          <path d="M104 58 L108 62 L104 66" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="16" y="54" width="28" height="10" rx="3" fill="#22c55e" />
          <text x="30" y="62" textAnchor="middle" fontSize="6" fontWeight="800" fontFamily="ui-monospace,monospace" fill="#fff" letterSpacing="0.05em">
            STEP 1
          </text>
          <text x="20" y="108" fontSize="8.5" fontWeight="700" fontFamily="system-ui,sans-serif" fill="#f1f5f9">
            Parking / Drop-off
          </text>
          <text x="20" y="118" fontSize="7" fontFamily="system-ui,sans-serif" fill="#94a3b8">
            Entrance B · blue sign
          </text>

          <rect x="12" y="124" width="116" height="68" rx="8" fill="#1e293b" />
          <rect x="12" y="124" width="116" height="42" rx="8" fill="#1c2a3a" />
          <rect x="52" y="128" width="36" height="34" rx="2" fill="#162032" stroke="#2d3f52" strokeWidth="0.8" />
          <rect x="62" y="134" width="10" height="20" rx="1.5" fill="#0d1520" stroke="#2d3f52" strokeWidth="0.5" />
          <circle cx="70" cy="144" r="1.5" fill="#475569" />
          <rect x="76" y="136" width="8" height="10" rx="1" fill="#0d1520" stroke="#2d3f52" strokeWidth="0.5" />
          <circle cx="78.5" cy="139" r="0.8" fill="#4ade80" />
          <circle cx="81.5" cy="139" r="0.8" fill="#4ade80" />
          <circle cx="78.5" cy="142" r="0.8" fill="#4ade80" />
          <circle cx="81.5" cy="142" r="0.8" fill="#4ade80" />
          <path d="M22 145 L46 145" stroke="#00FF87" strokeWidth="2" strokeLinecap="round" />
          <path d="M42 141 L46 145 L42 149" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="16" y="128" width="28" height="10" rx="3" fill="#22c55e" />
          <text x="30" y="136" textAnchor="middle" fontSize="6" fontWeight="800" fontFamily="ui-monospace,monospace" fill="#fff" letterSpacing="0.05em">
            STEP 2
          </text>
          <text x="20" y="182" fontSize="8.5" fontWeight="700" fontFamily="system-ui,sans-serif" fill="#f1f5f9">
            Main Entrance
          </text>
          <text x="20" y="192" fontSize="7" fontFamily="system-ui,sans-serif" fill="#94a3b8">
            Keypad on left · code below
          </text>

          <rect x="12" y="198" width="116" height="26" rx="8" fill="#00FF87" />
          <text x="40" y="215" fontSize="7.5" fontWeight="700" fontFamily="ui-monospace,monospace" fill="#0a0a0a" letterSpacing="0.08em">
            GATE CODE
          </text>
          <text x="110" y="215" textAnchor="end" fontSize="13" fontWeight="900" fontFamily="ui-monospace,monospace" fill="#0a0a0a" letterSpacing="0.18em">
            4729
          </text>

          <rect x="48" y="228" width="16" height="3" rx="1.5" fill="#22c55e" />
          <rect x="68" y="228" width="16" height="3" rx="1.5" fill="#22c55e" />
          <rect x="88" y="228" width="10" height="3" rx="1.5" fill="#374151" />
          <rect x="102" y="228" width="10" height="3" rx="1.5" fill="#374151" />
        </g>

        <path
          d="M340 278 Q270 278 242 268"
          stroke="#00FF87"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          fill="none"
          opacity="0.5"
        />
        <circle cx="242" cy="268" r="4" fill="#00FF87" opacity="0.7" />

        <rect x="420" y="34" width="74" height="20" rx="10" fill="#00FF87" />
        <text x="457" y="48" textAnchor="middle" fontSize="8.5" fontWeight="800" fontFamily="ui-monospace,monospace" fill="#0a0a0a" letterSpacing="0.06em">
          ● DELIVERED
        </text>
      </svg>
    </div>
  );
}

```


## `app/pricing/page.js`

```javascript
'use client';
import { useState } from 'react';
import Link from 'next/link';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50';

export default function PricingPage() {
  const [mode, setMode] = useState('personal'); // 'personal' | 'property'

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-stone-50 text-stone-900 antialiased">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[min(55vh,480px)]"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% -5%, rgba(0,255,135,0.07), transparent 55%)',
        }}
      />

      {/* ── Header ── */}
      <header className="relative z-10 border-b border-stone-200 bg-white/90 backdrop-blur-xl">
        <div className="flex flex-col gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <Link href="/" className={`text-lg font-extrabold tracking-tight text-stone-900 transition-colors hover:text-stone-800 ${focusRing} rounded-sm`}>
            Find<span className="text-[#00c46f]">Found</span>Fast
          </Link>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
            <Link href="/" className={`font-mono text-sm font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 ${focusRing} rounded-sm`}>Home</Link>
            <span className="font-mono text-sm font-bold uppercase tracking-wide text-emerald-700">Pricing</span>
            <Link href="/how-it-works" className={`font-mono text-sm font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 ${focusRing} rounded-sm`}>How it works</Link>
            <Link href="/get-started" className={`inline-flex min-h-[40px] items-center justify-center rounded-lg bg-fff-green px-4 py-2 font-mono text-fff-eyebrow font-bold uppercase text-fff-bg shadow-sm transition-colors hover:bg-[#00e67a] ${focusRing}`}>
              Get started →
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 py-10 sm:px-6 sm:py-14 md:py-16">

        {/* ── Title ── */}
        <p className="mb-3 font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">Pricing</p>
        <h1 className="mb-3 max-w-2xl text-center text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
          Start free. Pay only when it fits.
        </h1>
        <p className="mb-8 max-w-lg text-center text-fff-secondary leading-relaxed text-stone-500">
          Whether you are sending your first delivery link or guiding arrivals across a 500-unit property — there is a plan that fits.
        </p>

        {/* ── Toggle ── */}
        <div className="mb-10 flex items-center gap-1 rounded-2xl border border-stone-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setMode('personal')}
            className={`rounded-xl px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-wide transition-all ${
              mode === 'personal'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            🙋 Just me
          </button>
          <button
            type="button"
            onClick={() => setMode('property')}
            className={`rounded-xl px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-wide transition-all ${
              mode === 'property'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
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
            <p className="mb-6 text-center text-fff-caption text-stone-500">
              No property manager needed. Sign up, upload your photos, get your personal link.
            </p>

            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">

              {/* Free tier */}
              <div className="flex flex-col rounded-2xl border border-stone-200 bg-white px-5 py-6 shadow-sm sm:px-6 sm:py-7">
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Free</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight text-stone-900">$0</span>
                </div>
                <p className="mt-1 text-fff-caption text-stone-500">forever</p>
                <p className="mt-4 text-fff-caption leading-relaxed text-stone-600">
                  Try it out. Perfect for occasional deliveries or one-time guests.
                </p>
                <ul className="mt-5 flex flex-col gap-2.5 text-fff-caption text-stone-700">
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
                    className={`inline-flex w-full items-center justify-center rounded-lg border border-stone-300 bg-white min-h-[44px] py-3 font-mono text-sm font-bold uppercase tracking-wide text-stone-800 shadow-sm transition-colors hover:border-emerald-400 hover:text-emerald-800 ${focusRing}`}
                  >
                    Start free →
                  </Link>
                </div>
              </div>

              {/* Personal Guide — featured */}
              <div className="relative flex flex-col rounded-2xl border-2 border-emerald-400 bg-emerald-50 px-5 py-6 shadow-md sm:px-6 sm:py-7">
                <span className="mb-3 inline-block self-start rounded-full bg-fff-yellow px-2.5 py-1 font-mono text-fff-eyebrow font-bold uppercase text-fff-bg">
                  Most popular
                </span>
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">Personal guide</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight text-stone-900">$4.99</span>
                  <span className="text-lg font-bold text-stone-500">/mo</span>
                </div>
                <p className="mt-1 text-fff-caption text-stone-500">or $47.88/yr — 20% off</p>
                <p className="mt-4 text-fff-caption leading-relaxed text-stone-600">
                  For heavy delivery users, Airbnb hosts, and anyone tired of giving the same directions.
                </p>
                <ul className="mt-5 flex flex-col gap-2.5 text-fff-caption text-stone-700">
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
              <div className="flex flex-col rounded-2xl border border-stone-200 bg-white px-5 py-6 shadow-sm sm:px-6 sm:py-7">
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-stone-400">One-time</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight text-stone-900">$9.99</span>
                </div>
                <p className="mt-1 text-fff-caption text-stone-500">pay once, yours forever</p>
                <p className="mt-4 text-fff-caption leading-relaxed text-stone-600">
                  One permanent link for one location. No subscription, no monthly fee — ever.
                </p>
                <ul className="mt-5 flex flex-col gap-2.5 text-fff-caption text-stone-700">
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
                    className={`inline-flex w-full items-center justify-center rounded-lg border border-stone-300 bg-white min-h-[44px] py-3 font-mono text-sm font-bold uppercase tracking-wide text-stone-800 shadow-sm transition-colors hover:border-emerald-400 hover:text-emerald-800 ${focusRing}`}
                  >
                    Buy once →
                  </Link>
                </div>
              </div>
            </div>

            {/* Perfect for callout */}
            <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <p className="mb-5 text-center font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Perfect for</p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {[
                  { emoji: '🛵', label: 'Heavy delivery users', desc: 'DoorDash, Uber Eats, Amazon. Paste your link once — done forever.' },
                  { emoji: '🏡', label: 'Airbnb hosts', desc: 'Send guests a photo guide instead of a wall of check-in text.' },
                  { emoji: '🏢', label: 'Hard-to-find apartments', desc: 'Stop explaining the same directions to every person every week.' },
                  { emoji: '🎉', label: 'Party hosts', desc: 'One link in the invite. Everyone finds the place.' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-2 rounded-xl border border-stone-100 bg-stone-50 p-4">
                    <span className="text-xl">{item.emoji}</span>
                    <p className="font-bold text-stone-900 text-fff-caption">{item.label}</p>
                    <p className="text-fff-eyebrow leading-relaxed text-stone-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-fff-caption text-stone-500">
              Not sure which plan?{' '}
              <Link href="/how-it-works?audience=personal" className="text-emerald-700 underline-offset-2 hover:underline">
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
            <p className="mb-6 text-center text-fff-caption text-stone-500">
              One price per property. Unlimited buildings, units, and residents inside it.
            </p>

            <div className="mb-5 flex flex-wrap justify-center gap-x-4 gap-y-1.5 font-mono text-fff-eyebrow font-bold uppercase text-stone-400">
              <span>No driver app</span>
              <span className="text-stone-300">·</span>
              <span>Codes expire automatically</span>
              <span className="text-stone-300">·</span>
              <span>Unlimited buildings and units</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">

              {/* Annual — featured */}
              <div className="relative flex flex-col rounded-2xl border-2 border-emerald-400 bg-emerald-50 px-5 py-6 shadow-md sm:px-6 sm:py-8">
                <span className="mb-3 inline-block self-start rounded-full bg-fff-yellow px-2.5 py-1 font-mono text-fff-eyebrow font-bold uppercase text-fff-bg">
                  Best value — save $98/yr
                </span>
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">Pay once per year</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight text-fff-green sm:text-[2.75rem]">$490</span>
                  <span className="text-xl font-bold text-stone-500">/yr</span>
                </div>
                <p className="mt-1 text-fff-caption text-stone-500">per property · about $41/mo</p>

                <div className="mt-6 space-y-3 rounded-xl border border-stone-200 bg-white/80 px-4 py-4">
                  <div className="flex items-baseline justify-between gap-3 text-fff-caption">
                    <span className="text-stone-500">12 months at $49/mo</span>
                    <span className="font-mono tabular-nums text-stone-400 line-through">$588</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 text-fff-caption">
                    <span className="font-medium text-stone-900">Annual price</span>
                    <span className="font-mono text-xl font-bold tabular-nums text-fff-green">$490</span>
                  </div>
                  <div className="border-t border-emerald-200 pt-3 flex items-center justify-between">
                    <span className="text-fff-caption font-semibold uppercase tracking-wide text-amber-800">You save</span>
                    <span className="text-2xl font-extrabold text-amber-700">$98</span>
                  </div>
                </div>

                <ul className="mt-5 flex flex-col gap-2.5 text-fff-caption text-stone-700">
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
              <div className="flex flex-col rounded-2xl border border-stone-200 bg-white px-5 py-6 shadow-sm sm:px-6 sm:py-8">
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Billed monthly</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight text-fff-green sm:text-[2.75rem]">$49</span>
                  <span className="text-xl font-bold text-stone-500">/mo</span>
                </div>
                <p className="mt-1 text-fff-caption text-stone-500">per property · cancel anytime</p>
                <p className="mt-5 text-fff-secondary leading-relaxed text-stone-600">
                  Start with one property and scale from there. No contracts, no setup fees.
                </p>

                <ul className="mt-5 flex flex-col gap-2.5 text-fff-caption text-stone-700">
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
                    className={`inline-flex w-full items-center justify-center rounded-lg border border-stone-300 bg-white py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-stone-800 shadow-sm transition-colors hover:border-emerald-400 hover:text-emerald-800 ${focusRing}`}
                  >
                    Start monthly →
                  </Link>
                </div>
              </div>
            </div>

            {/* Campus callout */}
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-fff-eyebrow font-bold uppercase text-blue-600">College campus plan</p>
                  <p className="mt-1 font-bold text-stone-900">Multiple buildings, events, graduation, permanent public links</p>
                  <p className="mt-1 text-fff-caption text-stone-500">Pricing based on campus size — let's talk.</p>
                </div>
                <Link
                  href="/get-started"
                  className={`inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-mono text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-blue-700 ${focusRing}`}
                >
                  Talk to us →
                </Link>
              </div>
            </div>

            <p className="mt-6 text-center text-fff-caption text-stone-500">
              Submit the form — we will confirm monthly vs annual and get you live.
            </p>
          </div>
        )}

        {/* ── FAQ strip ── */}
        <div className="mt-12 w-full max-w-2xl">
          <p className="mb-5 text-center font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Common questions</p>
          <div className="flex flex-col divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white shadow-sm">
            {[
              { q: 'Can I switch between plans?', a: 'Yes — upgrade, downgrade, or cancel anytime. No penalties.' },
              { q: 'Do drivers need an account?', a: 'Never. Drivers and guests just tap the link in their browser. No app, no login, no friction.' },
              { q: 'What happens when a timed link expires?', a: 'The gate codes vanish and the link stops working. No stale screenshots floating around.' },
              { q: 'Can I update my photos and codes?', a: 'Yes, anytime on Personal Guide or any property plan. Your link stays the same — only the content updates.' },
              { q: 'What is the difference between timed and permanent links?', a: 'Timed links expire after 15, 30, or 60 minutes — great when you want the code to disappear after a delivery. Permanent links stay live forever — great for Airbnb, your apartment entrance, or a campus website.' },
            ].map((item, i) => (
              <div key={i} className="px-5 py-4 sm:px-6">
                <p className="font-semibold text-stone-900 text-fff-caption">{item.q}</p>
                <p className="mt-1 text-fff-caption text-stone-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/get-started" className={`inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fff-green px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg shadow-sm transition-colors hover:bg-[#00e67a] ${focusRing}`}>
            Get started →
          </Link>
          <Link href="/" className={`text-fff-caption text-stone-500 underline-offset-4 transition-colors hover:text-emerald-700 ${focusRing} rounded-sm`}>
            ← Back to home
          </Link>
        </div>
      </main>

      <footer className="relative z-10 border-t border-stone-200 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-fff-micro text-stone-500 sm:py-8">
        <span className="text-stone-700">FindFoundFast</span>
        <span className="mx-1.5 text-stone-400">·</span>
        <a href="https://findfoundfast.com" rel="noopener noreferrer" className={`text-stone-500 transition-colors hover:text-emerald-700 ${focusRing} rounded-sm`}>
          findfoundfast.com
        </a>
      </footer>
    </div>
  );
}

```


## `app/pricing/layout.js`

```javascript
export const metadata = {
  title: 'Pricing — FindFoundFast',
  description:
    'Simple pricing for everyone. Free tier available. Personal guides from $4.99/mo. Property plans from $49/mo.',
};

export default function PricingLayout({ children }) {
  return children;
}

```


## `app/how-it-works/page.js`

```javascript
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50";

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
          active: "border-emerald-400 bg-emerald-50",
          inactive: "border-stone-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/40",
          tag: "bg-emerald-100 text-emerald-800",
        },
        campus: {
          active: "border-blue-400 bg-blue-50",
          inactive: "border-stone-200 bg-white hover:border-blue-200 hover:bg-blue-50/40",
          tag: "bg-blue-100 text-blue-800",
        },
        personal: {
          active: "border-purple-400 bg-purple-50",
          inactive: "border-stone-200 bg-white hover:border-purple-200 hover:bg-purple-50/40",
          tag: "bg-purple-100 text-purple-800",
        },
      }[id] || {
        active: "border-amber-400 bg-amber-50",
        inactive: "border-stone-200 bg-white hover:border-amber-200 hover:bg-amber-50/40",
        tag: "bg-amber-100 text-amber-800",
      };

    return (
      <button
        type="button"
        onClick={() => selectAudience(id)}
        className={`group w-full rounded-2xl border-2 p-5 text-left transition-all ${isActive ? styles.active : styles.inactive} ${focusRing}`}
      >
        <span className="mb-3 block text-2xl">{emoji}</span>
        <p className="text-base font-extrabold text-stone-900">{title}</p>
        <p className="mt-1 text-fff-caption text-stone-500">{desc}</p>
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
    <div className="relative min-h-screen overflow-x-hidden bg-stone-50 font-sans text-stone-900 antialiased">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[min(55vh,480px)]"
        aria-hidden
        style={{ background: 'radial-gradient(ellipse 75% 55% at 50% -5%, rgba(0,255,135,0.07), transparent 55%)' }}
      />

      <Header />

      <main className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">

        {/* Page title */}
        <div className="mb-10 text-center">
          <p className="mb-3 font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Product tour</p>
          <h1 className="mx-auto max-w-2xl text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.12] tracking-tight text-stone-900">
            Works wherever people get lost
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-fff-secondary leading-relaxed text-stone-500 sm:text-fff-body-sm">
            One timed link, step-by-step photos, and gate codes — so nobody circles the block or texts &ldquo;which entrance?&rdquo;
          </p>
        </div>

        {/* Audience picker — 3 cards */}
        <div className="mb-8">
          <p className="mb-4 text-center font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Who are you?</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {audienceCard("personal", "🙋", "Just me / Airbnb host", "Residents, Airbnb hosts, delivery regulars", ["Free tier", "Permanent links", "$4.99/mo"])}
            {audienceCard("property", "🏢", "Property manager", "Apartments, senior living, offices", ["Timed links", "Resident portal", "From $49/mo"])}
            {audienceCard("campus", "🎓", "College campus", "Universities, medical centers, large campuses", ["Permanent links", "Events", "Graduation"])}
          </div>
        </div>

        {/* Content panel */}
        <div
          className={`rounded-2xl border bg-white shadow-sm ${
            audience === "campus" ? "border-blue-200" : audience === "personal" ? "border-purple-200" : "border-stone-200"
          }`}
        >

          {/* ── PERSONAL / AIRBNB ── */}
          {audience === "personal" && (
            <div className="p-5 sm:p-8 md:p-10">
              <p className="font-mono text-fff-eyebrow font-bold uppercase text-purple-600">For individuals &amp; Airbnb hosts</p>
              <h2 className="mb-2 mt-2 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
                Your own photo guide. Your personal link.
              </h2>
              <p className="mb-8 max-w-2xl text-fff-secondary leading-relaxed text-stone-500 sm:text-fff-body-sm">
                No property manager needed. Sign up, upload your photos from parking to your door, add your gate code, and get a personal link that works forever. Perfect for heavy delivery users and Airbnb hosts.
              </p>

              <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 sm:p-6">
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-amber-700">🏡 Airbnb hosts</p>
                <p className="mt-2 text-fff-body leading-relaxed text-stone-700">
                  Instead of sending guests a wall of check-in instructions, you send <span className="font-semibold text-stone-900">one link</span>. They tap it and follow the photos — parking spot, lockbox, front door. No 11pm texts asking where the key is.
                </p>
                <p className="mt-3 text-fff-caption text-stone-500">
                  The one-time $9.99 plan is perfect: one permanent link, one location, no monthly fee.
                </p>
              </div>

              <div className="mb-8 rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-7">
                <span className="font-mono text-sm font-bold uppercase tracking-wide text-purple-700">Step 1</span>
                <h3 className="mt-2 text-xl font-bold text-stone-900">Name your place</h3>
                <p className="mt-2 text-fff-secondary text-stone-500">
                  Create a profile — your apartment, Airbnb, or &ldquo;spot B by the garage.&rdquo; That becomes the label on your link.
                </p>
              </div>

              <div className="mb-10 rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-7">
                <span className="font-mono text-sm font-bold uppercase tracking-wide text-purple-700">Step 2</span>
                <h3 className="mt-2 text-xl font-bold text-stone-900">Upload key photos</h3>
                <p className="mt-2 text-fff-secondary text-stone-500">
                  Parking to Entrance to Lobby to Your Door. Add arrows on any photo. Add your gate or door code.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {driverSteps.map((photo) => (
                    <div key={photo.step} className="group">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className={`aspect-[4/3] w-full rounded-xl border border-stone-200 bg-stone-100 shadow-sm transition group-hover:border-purple-300 ${photoFillClass(photo.step)}`}
                      />
                      <p className="mt-2 text-center text-fff-caption font-semibold text-purple-700">{photo.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="mb-4 text-lg font-bold text-stone-900">Before &amp; after you share a link</h3>
              <div className="mb-8 grid gap-4 sm:gap-6 lg:grid-cols-2">
                <div>
                  <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-rose-600">Before</p>
                  <div className="flex h-full min-h-[220px] flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-100 p-4 shadow-inner">
                    <p className="text-center font-mono text-fff-eyebrow font-bold uppercase text-stone-400">You and your driver</p>
                    <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-fff-caption text-stone-800">I&apos;m here, how do I get in?</div>
                    <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-fff-caption text-stone-800">No code? I can&apos;t access the building.</div>
                    <div className="ml-auto max-w-[90%] rounded-xl border border-purple-200 bg-purple-50 px-3 py-2.5 text-fff-caption font-medium text-stone-900">Go to the second entrance, turn left at the—</div>
                    <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-fff-caption text-stone-500">Order cancelled. Sorry.</div>
                  </div>
                </div>
                <div>
                  <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-purple-700">After</p>
                  <div className="flex h-full min-h-[220px] flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-100 p-4 shadow-inner">
                    <p className="text-center font-mono text-fff-eyebrow font-bold uppercase text-stone-400">You and your driver</p>
                    <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-fff-caption text-stone-800">On the way</div>
                    <div className="ml-auto max-w-[90%] rounded-xl border border-purple-300 bg-purple-50 px-3 py-2.5 text-fff-caption font-medium text-stone-900 shadow-sm">Here are the instructions — tap the link:</div>
                    <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
                      <div className="text-fff-caption font-bold text-purple-700">FindFoundFast</div>
                      <div className="mt-1 text-fff-caption text-stone-800">Your address · Unit 4B</div>
                      <div className="mt-1.5 font-mono text-fff-eyebrow text-purple-700">Expires in 42 min · Step-by-step photos</div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="mb-1.5 text-center text-xl font-extrabold tracking-tight text-stone-900 sm:text-2xl">What the driver sees</h3>
              <p className="mx-auto mb-6 max-w-lg text-center text-fff-secondary leading-relaxed text-stone-500">No install, no login. Works on any phone.</p>
              <div className="mx-auto mb-10 max-w-lg overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-lg">
                <div className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3 sm:px-5">
                  <span className="text-fff-caption font-extrabold text-purple-700">FindFoundFast</span>
                  <span className="font-mono text-sm font-bold text-purple-700">Expires in 42 min</span>
                </div>
                <div className="space-y-4 p-4 sm:p-6">
                  {driverSteps.map((photo) => (
                    <div key={photo.step} className="rounded-xl border border-stone-200 bg-white p-2.5 sm:p-3">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className={`mb-3 aspect-[4/3] w-full rounded-lg bg-stone-100 sm:aspect-[16/10] ${photoFillClass(photo.step)}`}
                      />
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-fff-green font-mono text-sm font-bold text-fff-bg">{photo.step}</div>
                        <div>
                          <div className="font-semibold text-stone-900">{photo.title}</div>
                          <div className="mt-0.5 text-fff-caption leading-relaxed text-stone-500">{photo.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-fff-micro text-emerald-800">
                  When the timer ends, codes hide and the link stops working.
                </div>
              </div>

              <h3 className="mb-4 mt-10 text-lg font-bold text-stone-900">Perfect for</h3>
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                {personalUseCases.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h4 className="font-bold text-stone-900">{item.title}</h4>
                      <p className="mt-1 text-fff-caption leading-relaxed text-stone-500">{item.desc}</p>
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
                  <div key={p.label} className={`flex flex-col rounded-2xl border p-5 ${p.featured ? "border-emerald-300 bg-emerald-50" : "border-stone-200 bg-white"}`}>
                    <p className={`font-mono text-fff-eyebrow font-bold uppercase ${p.featured ? "text-emerald-700" : "text-stone-400"}`}>{p.label}</p>
                    <p className={`mt-1 text-xl font-extrabold ${p.featured ? "text-fff-green" : "text-stone-900"}`}>{p.price}</p>
                    <p className="mt-1 text-fff-eyebrow text-stone-500 leading-relaxed">{p.desc}</p>
                    <Link
                      href={p.href}
                      className={`mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg px-4 py-2.5 font-mono text-sm font-bold uppercase tracking-wide shadow-sm transition-colors ${p.featured ? `bg-fff-green text-fff-bg hover:bg-[#00e67a] ${focusRing}` : `border border-stone-300 bg-white text-stone-800 hover:border-emerald-400 ${focusRing}`}`}
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
              <p className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">Property managers</p>
              <h2 className="mb-2 mt-1 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">Set up the building once</h2>
              <p className="mb-8 max-w-2xl text-fff-body-sm leading-relaxed text-stone-600">
                Residents, visitors, and deliveries find the right place every time — fewer front-desk calls, fewer wrong turns. Scroll down to see how residents share links and what drivers see.
              </p>

              <div className="space-y-5">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-7">
                  <span className="font-mono text-sm font-bold uppercase tracking-wide text-emerald-700">Step 1</span>
                  <h3 className="mt-2 text-xl font-bold text-stone-900">Add your building</h3>
                  <p className="mt-2 text-fff-secondary text-stone-500">Building A, North Tower, Tower 3 — label it however you want. One link covers every unit inside.</p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-7">
                  <span className="font-mono text-sm font-bold uppercase tracking-wide text-emerald-700">Step 2</span>
                  <h3 className="mt-2 text-xl font-bold text-stone-900">Upload key photos</h3>
                  <p className="mt-2 text-fff-secondary text-stone-500">Parking to Entrance to Lobby to Elevator. Add arrows on any photo to point the way.</p>
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {driverSteps.map((photo) => (
                      <div key={photo.step} className="group">
                        <img src={photo.url} alt={photo.title} className={`aspect-[4/3] w-full rounded-xl border border-stone-200 bg-stone-100 shadow-sm transition group-hover:border-emerald-300 ${photoFillClass(photo.step)}`} />
                        <p className="mt-2 text-center text-fff-caption font-semibold text-emerald-700">{photo.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                    <p className="text-fff-secondary leading-relaxed text-stone-700">One link per building = every unit in that building.<br /><span className="text-stone-500">Updates instantly for every resident&apos;s link.</span></p>
                  </div>
                </div>
              </div>

              <div className="my-10 border-t border-stone-200 pt-10">
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Residents</p>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-stone-900 sm:text-2xl">Before &amp; after they share a timed link</h3>
                <div className="mt-6 grid gap-4 sm:gap-6 lg:grid-cols-2">
                  <div>
                    <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-rose-600">Before</p>
                    <div className="flex h-full min-h-[220px] flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-100 p-4 shadow-inner">
                      <p className="text-center font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Driver and Resident</p>
                      <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-fff-caption text-stone-800">I&apos;m here, how do I get in?</div>
                      <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-fff-caption text-stone-800">No code? I can&apos;t access the building.</div>
                      <div className="ml-auto max-w-[90%] rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-fff-caption font-medium text-stone-900">Go to the second entrance, turn left at the—</div>
                      <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-fff-caption text-stone-500">Order cancelled. Sorry.</div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-emerald-700">After</p>
                    <div className="flex h-full min-h-[220px] flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-100 p-4 shadow-inner">
                      <p className="text-center font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Driver and Resident</p>
                      <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-fff-caption text-stone-800">On the way</div>
                      <div className="ml-auto max-w-[90%] rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2.5 text-fff-caption font-medium text-stone-900 shadow-sm">Here are the instructions — tap the link:</div>
                      <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
                        <div className="text-fff-caption font-bold text-emerald-700">FindFoundFast</div>
                        <div className="mt-1 text-fff-caption text-stone-800">Sunny Apts · Bldg A</div>
                        <div className="mt-1.5 font-mono text-fff-eyebrow text-emerald-700">Expires in 42 min · Step-by-step photos</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="mx-auto max-w-md rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center sm:p-8">
                    <div className="font-mono text-sm text-emerald-700">findfoundfast.com/link/sunny-a</div>
                    <div className="mt-3 text-2xl font-extrabold text-stone-900">Expires in <span className="text-emerald-700">42 minutes</span></div>
                    <div className="mt-5 rounded-xl bg-fff-green py-3 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg">Copy link</div>
                    <p className="mt-4 text-fff-caption leading-relaxed text-stone-500">Send to your driver or guest. Photos and gate codes in one place — no app.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-10">
                <p className="font-mono text-fff-eyebrow font-bold uppercase text-stone-400">Drivers &amp; guests</p>
                <h3 className="mt-2 text-center text-xl font-extrabold tracking-tight text-stone-900 sm:text-2xl">What they see</h3>
                <p className="mx-auto mb-6 mt-2 max-w-lg text-center text-fff-secondary leading-relaxed text-stone-500">In the browser — no install, no login. Works on any phone.</p>
                <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-lg">
                  <div className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3 sm:px-5">
                    <span className="text-fff-caption font-extrabold text-emerald-700">FindFoundFast</span>
                    <span className="font-mono text-sm font-bold text-emerald-700">Expires in 42 min</span>
                  </div>
                  <div className="space-y-4 p-4 sm:p-6">
                    {driverSteps.map((photo) => (
                      <div key={photo.step} className="rounded-xl border border-stone-200 bg-white p-2.5 sm:p-3">
                        <img src={photo.url} alt={photo.title} className={`mb-3 aspect-[4/3] w-full rounded-lg bg-stone-100 sm:aspect-[16/10] ${photoFillClass(photo.step)}`} />
                        <div className="flex gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-fff-green font-mono text-sm font-bold text-fff-bg">{photo.step}</div>
                          <div>
                            <div className="font-semibold text-stone-900">{photo.title}</div>
                            <div className="mt-0.5 text-fff-caption leading-relaxed text-stone-500">{photo.desc}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-fff-micro text-emerald-800">
                    When the timer ends, codes hide and the link stops working.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── CAMPUS ── */}
          {audience === "campus" && (
            <div className="p-5 sm:p-8 md:p-10">
              <p className="font-mono text-fff-eyebrow font-bold uppercase text-blue-600">For colleges and universities</p>
              <h2 className="mb-2 mt-2 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
                Large campus. Thousands of visitors. One link gets them there.
              </h2>
              <p className="mb-8 max-w-2xl text-fff-secondary leading-relaxed text-stone-500 sm:text-fff-body-sm">
                Graduation day, move-in weekend, campus tours — your visitors should not need a map, a staff member, or three wrong turns to find the right building.
              </p>
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                {campusUseCases.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h3 className="font-bold text-stone-900">{item.title}</h3>
                      <p className="mt-1 text-fff-caption leading-relaxed text-stone-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
                  <p className="font-mono text-fff-eyebrow font-bold uppercase text-blue-600">Permanent links</p>
                  <h3 className="mb-2 mt-2 text-lg font-bold text-stone-900">Embed on your website. Always on.</h3>
                  <p className="mb-4 text-fff-caption leading-relaxed text-stone-600">Drop it on your admissions page, event invitation, or email signature. Share it once — works forever.</p>
                  <div className="rounded-xl border border-blue-200 bg-white px-4 py-3 font-mono text-sm text-blue-600">findfoundfast.com/link/state-u-main</div>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                  <p className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">Timed links work too</p>
                  <h3 className="mb-2 mt-2 text-lg font-bold text-stone-900">Gate codes for events? Covered.</h3>
                  <p className="mb-4 text-fff-caption leading-relaxed text-stone-600">For stadium gates, graduation venues, or restricted parking — set a timer and codes vanish when the event ends.</p>
                  <div className="rounded-xl border border-emerald-200 bg-white px-4 py-3">
                    <div className="font-mono text-sm font-bold text-emerald-700">Expires in 3 hours</div>
                    <div className="mt-1 text-sm text-stone-400">Code disappears when the timer ends</div>
                  </div>
                </div>
              </div>
              <div className="mb-8 rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
                <h3 className="mb-6 text-lg font-bold text-stone-900">How it works for your campus</h3>
                <div className="grid gap-6 sm:grid-cols-3">
                  {[
                    { num: '1', title: 'Set up your buildings', body: 'Add each campus building or destination. Upload photos of parking, entrance, lobby, and key waypoints. About 15 minutes per location.' },
                    { num: '2', title: 'Share the link', body: 'Post it on your website, include it in event emails, or text it to families. Permanent links never expire — set it once.' },
                    { num: '3', title: 'Visitors follow the photos', body: 'Step-by-step from the parking lot to the exact destination. No app, no login, no calling the front desk.' },
                  ].map((s) => (
                    <div key={s.num} className="flex flex-col gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-mono text-sm font-bold text-white">{s.num}</div>
                      <h4 className="font-bold text-stone-900">{s.title}</h4>
                      <p className="text-fff-caption leading-relaxed text-stone-500">{s.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center sm:p-8">
                <h3 className="mb-2 text-xl font-extrabold text-stone-900">Ready to guide your campus visitors?</h3>
                <p className="mb-6 text-fff-caption text-stone-500">We will walk through setup for your specific buildings and events.</p>
                <Link href="/get-started" className={`inline-flex min-h-[48px] items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-blue-700 ${focusRing}`}>
                  Talk to us about your campus →
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="relative z-10 border-t border-stone-200 bg-white px-4 py-10 text-center sm:px-6 sm:py-14">
        <h2 className="mx-auto mb-5 max-w-xl text-xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
          Ready to make arrivals FFFLipping Cool?
        </h2>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/get-started" className={`inline-flex min-h-[48px] items-center justify-center rounded-xl bg-fff-green px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg shadow-sm transition hover:bg-[#00e67a] ${focusRing}`}>
            Get started free →
          </Link>
          <Link href="/pricing" className={`inline-flex min-h-[48px] items-center justify-center rounded-xl border border-stone-300 bg-white px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-stone-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-800 ${focusRing}`}>
            View pricing →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

```


## `app/get-started/page.js`

```javascript
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50';

const inputClass = `rounded-xl border border-stone-200 bg-white px-4 py-3 font-sans text-fff-secondary text-stone-900 outline-none transition-colors placeholder:text-stone-400 ${focusRing}`;

export default function GetStartedPage() {
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('Apartments');
  const [units, setUnits] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const propertyTypeOptions = useMemo(
    () => [
      'Apartments',
      'Offices',
      'Nursing homes',
      'Hospitals',
      'Schools',
      'Homes',
      'Other',
    ],
    []
  );

  const canSubmit =
    propertyName.trim().length > 0 &&
    units.trim().length > 0 &&
    name.trim().length > 0 &&
    email.trim().length > 0;

  async function onSubmit(e) {
    e.preventDefault();
    setError('');

    if (!canSubmit) {
      setError('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property: propertyName,
          type: propertyType,
          units: Number(units),
          name,
          email,
          phone,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Request failed. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-stone-50 text-stone-900 antialiased">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[min(55vh,480px)] opacity-100"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% -5%, rgba(0,255,135,0.07), transparent 55%)',
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
              className={`font-mono text-sm font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 ${focusRing} rounded-sm`}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className={`font-mono text-sm font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 ${focusRing} rounded-sm`}
            >
              Pricing
            </Link>
            <Link
              href="/how-it-works?audience=property"
              className={`font-mono text-sm font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 ${focusRing} rounded-sm`}
            >
              How it works
            </Link>
            <span className="font-mono text-sm font-bold uppercase tracking-wide text-emerald-700">
              Get started
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <div className="w-full max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 font-mono text-fff-eyebrow font-bold uppercase text-emerald-800 sm:mb-5">
            Get started
          </p>

          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
            Tell us about your property
          </h1>
          <p className="mb-2 max-w-2xl text-fff-body-sm leading-relaxed text-stone-600 sm:mb-3 sm:text-fff-body">
            We’ll reach out by email. Fill in the basics below and we’ll take it from there.
          </p>
          <p className="mb-6 max-w-2xl text-fff-caption text-stone-500 sm:mb-8 sm:text-fff-secondary">
            Typical reply: <span className="text-stone-700">within one business day</span> with next steps
            and billing (monthly or annual—your call).
          </p>

          {submitted ? (
            <div className="rounded-2xl border border-stone-200 bg-white px-6 py-8 shadow-sm">
              <h2 className="mb-2 text-xl font-extrabold text-emerald-700">Thanks — we got it.</h2>
              <p className="text-fff-secondary leading-relaxed text-stone-600">
                Next step: we’ll email you soon with a couple quick questions and
                how to set up your building guide.
              </p>
              <div className="mt-6">
                <Link
                  href="/how-it-works?audience=property"
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fff-green px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg shadow-sm shadow-emerald-900/10 transition-colors hover:bg-[#00e67a] ${focusRing}`}
                >
                  See how it works →
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-stone-200 bg-white px-5 py-7 shadow-sm sm:px-6 sm:py-8"
            >
              {error ? (
                <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-fff-caption text-rose-900">
                  {error}
                </div>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">
                    Property name*
                  </span>
                  <input
                    required
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Sunny Apartments"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">
                    Property type*
                  </span>
                  <select
                    required
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className={inputClass}
                  >
                    {propertyTypeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">
                    Contact name*
                  </span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">
                    Email*
                  </span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">
                    Phone / contact number
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. (555) 123-4567"
                  />
                </label>

                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">
                    Approx. # of units*
                  </span>
                  <input
                    required
                    inputMode="numeric"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 120"
                  />
                </label>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fff-green px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg shadow-sm shadow-emerald-900/10 transition-colors hover:bg-[#00e67a] disabled:opacity-60 disabled:hover:bg-fff-green ${focusRing}`}
                >
                  {submitting ? 'Sending…' : 'Submit →'}
                </button>

                <p className="text-fff-micro leading-relaxed text-stone-500 sm:text-fff-caption">
                  By submitting, you’re asking us to contact you about FindFoundFast.
                </p>
              </div>
            </form>
          )}
        </div>
      </main>

      <footer className="relative z-10 border-t border-stone-200 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-fff-micro text-stone-500 sm:py-8">
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

```


## `app/preview/page.js`

```javascript
import { permanentRedirect } from 'next/navigation';

/** Former preview URL — homepage now uses this layout. */
export default function PreviewRedirect() {
  permanentRedirect('/');
}

```


## `app/api/demo/route.js`

```javascript
import { NextResponse } from 'next/server'
import { createBrowserClient } from '@supabase/ssr'

const DEFAULT_INBOX = 'michaelmcdaniel.sbg@gmail.com'

async function sendLeadNotificationEmail(body) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_INBOX_EMAIL || DEFAULT_INBOX
  if (!apiKey) {
    console.warn('[demo] RESEND_API_KEY not set; skipping email notification')
    return { skipped: true }
  }

  const from =
    process.env.RESEND_FROM || 'FindFoundFast <onboarding@resend.dev>'

  const lines = [
    'New FindFoundFast lead (get started / demo)',
    '',
    `Contact name: ${body.name ?? ''}`,
    `Email: ${body.email ?? ''}`,
    `Phone: ${body.phone ?? '(not provided)'}`,
    `Property: ${body.property ?? ''}`,
    `Property type: ${body.type ?? '(not provided)'}`,
    `Approx. units: ${body.units ?? ''}`,
  ]

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: body.email,
      subject: `FindFoundFast lead: ${body.property || 'Unknown property'}`,
      text: lines.join('\n'),
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('[demo] Resend error', res.status, errText)
    throw new Error('Email notification failed')
  }

  return { skipped: false }
}

async function insertDemoRequest(supabase, body) {
  const base = {
    name: body.name,
    email: body.email,
    property_name: body.property,
    unit_count: body.units,
  }
  const withPhoneAttempts = [
    { ...base, phone: body.phone || null },
    { ...base, contact_number: body.phone || null },
    { ...base, phone_number: body.phone || null },
    base,
  ]

  if (body.type) {
    const attempts = withPhoneAttempts.flatMap((row) => [
      { ...row, property_type: body.type },
      { ...row, type: body.type },
      row,
    ])
    for (const row of attempts) {
      const { error } = await supabase.from('demo_requests').insert(row)
      if (!error) return
    }
    throw new Error('Failed to save demo request')
  }

  for (const row of withPhoneAttempts) {
    const { error } = await supabase.from('demo_requests').insert(row)
    if (!error) return
  }
  throw new Error('Failed to save demo request')
}

export async function POST(request) {
  try {
    const body = await request.json()
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    await insertDemoRequest(supabase, body)

    try {
      await sendLeadNotificationEmail(body)
    } catch (e) {
      console.error('[demo] notify error:', e)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

```


## `app/auth/login/page.js`

```javascript
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (mode === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
      if (profile?.role === 'manager') router.push('/manager')
      else router.push('/resident')
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } })
      if (error) { setError(error.message); setLoading(false); return }
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) return (
    <div style={{minHeight:'100vh',background:'#EBF4FE',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',maxWidth:'360px',width:'100%',textAlign:'center'}}>
        <div style={{fontSize:'40px',marginBottom:'16px'}}>📬</div>
        <h2 style={{fontWeight:'700',marginBottom:'8px'}}>Check your email</h2>
        <p style={{color:'#666',fontSize:'14px'}}>We sent a confirmation link to <strong>{email}</strong>.</p>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#EBF4FE',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',maxWidth:'360px',width:'100%'}}>
        <a href="/" style={{display:'block',textAlign:'center',fontSize:'20px',fontWeight:'800',textDecoration:'none',color:'#0D1B2A',marginBottom:'24px'}}>Find<span style={{color:'#2E8FF0'}}>Found</span>Fast</a>
        <div style={{display:'flex',borderRadius:'10px',border:'1px solid #eee',marginBottom:'24px',overflow:'hidden'}}>
          {['login','signup'].map(m=>(
            <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:'10px',fontSize:'14px',fontWeight:'500',border:'none',cursor:'pointer',background:mode===m?'#2E8FF0':'transparent',color:mode===m?'#fff':'#666'}}>
              {m==='login'?'Sign in':'Create account'}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {mode==='signup'&&<input style={{padding:'12px 16px',border:'1px solid #dce5ed',borderRadius:'10px',fontSize:'14px'}} placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required/>}
          <input style={{padding:'12px 16px',border:'1px solid #dce5ed',borderRadius:'10px',fontSize:'14px'}} placeholder="Email address" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <input style={{padding:'12px 16px',border:'1px solid #dce5ed',borderRadius:'10px',fontSize:'14px'}} placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
          {error&&<p style={{color:'red',fontSize:'12px'}}>{error}</p>}
          <button type="submit" disabled={loading} style={{background:'#2E8FF0',color:'#fff',padding:'12px',borderRadius:'10px',border:'none',fontSize:'15px',fontWeight:'600',cursor:'pointer'}}>
            {loading?'Please wait...':mode==='login'?'Sign in':'Create account'}
          </button>
        </form>
        <p style={{textAlign:'center',marginTop:'16px',fontSize:'13px'}}><a href="/" style={{color:'#2E8FF0'}}>Back to home</a></p>
      </div>
    </div>
  )
}
export const dynamic = "force-dynamic";

```


## `app/manager/page.js`

```javascript
'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function ManagerDashboard() {
  const [user, setUser] = useState(null)
  const [org, setOrg] = useState(null)
  const [buildings, setBuildings] = useState([])
  const [view, setView] = useState('buildings')
  const [selected, setSelected] = useState(null)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [nb, setNb] = useState({name:'',address:'',slug:'',gate_code:'',lobby_code:'',notes:''})
  const [uploading, setUploading] = useState(false)
  const [pf, setPf] = useState({label:'',caption:'',step_number:1})
  const fileRef = useRef()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => { init() }, [])

  async function init() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth/login'); return }
    setUser(user)

    const { data: profile } = await supabase.from('profiles').select('*, organizations(*)').eq('id', user.id).single()
    if (profile?.organizations) setOrg(profile.organizations)

    if (profile?.org_id) {
      const { data: blds } = await supabase.from('buildings').select('*').eq('org_id', profile.org_id).order('created_at')
      setBuildings(blds || [])
    }
    setLoading(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>

  return (
    <div style={{minHeight:'100vh',background:'#f8f9fa',fontFamily:'system-ui,sans-serif',padding:'20px'}}>
      <h1>Manager Dashboard - FindFoundFast</h1>
      <p>This page now builds correctly with @/ alias.</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}
export const dynamic = "force-dynamic";

```


## `app/resident/page.js`

```javascript
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function ResidentPortal() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => { 
    init() 
  }, [])

  async function init() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth/login'); return }
    setUser(user)
    setLoading(false)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{minHeight:'100vh',background:'#EBF4FE',padding:'40px',fontFamily:'system-ui,sans-serif'}}>
      <h1>Resident Portal - FindFoundFast</h1>
      <p>Welcome! Your delivery link manager will be here.</p>
    </div>
  )
}
export const dynamic = "force-dynamic";

```


## `app/link/[slug]/page.js`

```javascript
import { createClient } from "@supabase/supabase-js";

export default async function DriverLinkPage({ params, searchParams }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const slug = resolvedParams.slug;
  const unit = resolvedSearch?.u || null;

  const { data: building } = await supabase
    .from("buildings")
    .select("*, building_photos(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!building) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8f9f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "320px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <h1 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px", color: "#0f172a" }}>
            Link not found
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6" }}>
            This link may have expired or never existed. Ask your contact to send a new one.
          </p>
          <div style={{ marginTop: "24px" }}>
            <a
              href="/"
              style={{
                display: "inline-block",
                color: "#00c46f",
                fontFamily: "ui-monospace, monospace",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                textDecoration: "none",
              }}
            >
              FindFoundFast →
            </a>
          </div>
        </div>
      </div>
    );
  }

  const photos = (building.building_photos || []).sort((a, b) => a.step_number - b.step_number);

  let sessionActive = false;
  if (unit) {
    const { data: session } = await supabase
      .from("sessions")
      .select("*")
      .eq("building_id", building.id)
      .eq("unit_number", unit)
      .eq("is_active", true)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    sessionActive = !!session;
  }
  const showCodes = !unit || sessionActive;

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {/* App bar — dark green, brand-aligned */}
      <div style={{ background: "#14532d", padding: "16px 20px 14px" }}>
        <p
          style={{
            color: "rgba(134,239,172,0.85)",
            fontSize: "10px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontFamily: "ui-monospace, monospace",
            marginBottom: "4px",
          }}
        >
          FindFoundFast
        </p>
        <h1 style={{ color: "#fff", fontWeight: "700", fontSize: "18px", marginBottom: "2px" }}>{building.name}</h1>
        {building.address && (
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>{building.address}</p>
        )}
        {unit && sessionActive && (
          <div
            style={{
              marginTop: "10px",
              display: "inline-block",
              background: "#00FF87",
              borderRadius: "20px",
              padding: "4px 14px",
            }}
          >
            <span
              style={{
                color: "#0a0a0a",
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              Delivering to Unit {unit}
            </span>
          </div>
        )}
      </div>

      {building.notes && (
        <div
          style={{
            background: "#fefce8",
            borderBottom: "1px solid #fde047",
            padding: "12px 20px",
          }}
        >
          <p style={{ fontSize: "14px", color: "#854d0e", lineHeight: "1.5" }}>📝 {building.notes}</p>
        </div>
      )}

      {showCodes && (building.gate_code || building.lobby_code) && (
        <div
          style={{
            background: "#f0fdf4",
            borderBottom: "1px solid #bbf7d0",
            padding: "16px 20px",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              fontWeight: "700",
              color: "#14532d",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "ui-monospace, monospace",
              marginBottom: "12px",
            }}
          >
            Access codes
          </p>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {building.gate_code && (
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginBottom: "2px",
                    fontFamily: "ui-monospace, monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Gate code
                </p>
                <p
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "28px",
                    fontWeight: "900",
                    color: "#14532d",
                    letterSpacing: "0.2em",
                  }}
                >
                  {building.gate_code}
                </p>
              </div>
            )}
            {building.lobby_code && (
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginBottom: "2px",
                    fontFamily: "ui-monospace, monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Lobby code
                </p>
                <p
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "28px",
                    fontWeight: "900",
                    color: "#14532d",
                    letterSpacing: "0.2em",
                  }}
                >
                  {building.lobby_code}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "24px 16px" }}>
        {photos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
            <p style={{ fontSize: "40px", marginBottom: "12px" }}>📸</p>
            <p style={{ fontSize: "15px" }}>No photos uploaded yet.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {photos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={photo.public_url}
                    alt={photo.label}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      maxHeight: "280px",
                      display: "block",
                      background: "#f1f5f9",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "#00FF87",
                      color: "#0a0a0a",
                      fontSize: "10px",
                      fontWeight: "800",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontFamily: "ui-monospace, monospace",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Step {photo.step_number}
                  </div>
                </div>
                <div style={{ padding: "14px 16px", background: "#fff" }}>
                  <p style={{ fontWeight: "700", fontSize: "15px", marginBottom: "3px", color: "#0f172a" }}>
                    {photo.label}
                  </p>
                  {photo.caption && (
                    <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.55" }}>{photo.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid #e2e8f0",
            textAlign: "center",
          }}
        >
          <a href="/" style={{ textDecoration: "none" }}>
            <p
              style={{
                fontWeight: "800",
                fontSize: "15px",
                color: "#0f172a",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              Find<span style={{ color: "#00c46f" }}>Found</span>Fast
            </p>
          </a>
          <p
            style={{
              marginTop: "4px",
              fontSize: "11px",
              color: "#94a3b8",
              fontFamily: "ui-monospace, monospace",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Micro-location guidance
          </p>
        </div>
      </div>
    </div>
  );
}

```


*End of bundle. File list: package.json next.config.js tailwind.config.js jsconfig.json postcss.config.js app/layout.js app/globals.css lib/supabase.js app/page.js components/Header.js components/Footer.js components/HeroSection.js components/HeroIllustration.js app/pricing/page.js app/pricing/layout.js app/how-it-works/page.js app/get-started/page.js app/preview/page.js app/api/demo/route.js app/auth/login/page.js app/manager/page.js app/resident/page.js app/link/[slug]/page.js*
