# FindFoundFast — bundle for Loveable review (Cursor / Next.js)

**Regenerate:** `npm run bundle:loveable` (or `bash scripts/gen-loveable-review-bundle.sh`).

**Last synced:** run the command above to refresh this file from disk.

---

## Why this can look nothing like the Loveable preview

Loveable’s preview and this repo are **not guaranteed to be pixel-identical** unless you paste **their exact exported files** (and assets) into the same structure. Common gaps:

| Area | What to check |
|------|----------------|
| **Stack** | Loveable often ships **Vite + React**; this repo is **Next.js App Router**. Imports (`next/link`, `next/font`, file paths) differ. |
| **Tailwind** | This project uses **`tailwind.config.js`** semantic colors (`background`, `foreground`, `primary`, `card`, `border`, `muted`, `destructive`, …) **plus** legacy `fff.*` for older strings. Loveable may use **different token names** or **CSS variables** (`hsl(var(--…))`). |
| **Global CSS** | **`app/globals.css`** sets `body` background/text and `*` border color. If Loveable relied on a different `globals` or index.css, colors will drift. |
| **Fonts** | **`app/layout.js`** loads **DM Sans** + **Space Mono** via `next/font`. Body uses `dmSans.className`. If Loveable used other fonts or weights, typography won’t match. |
| **Layout** | **`container`** in Tailwind is configured with **center + padding + 2xl breakpoint** (`tailwind.config.js`). Section widths/spacing differ if Loveable used raw `max-w-*` or no container. |
| **Navbar** | **`components/Navbar.js`** is **fixed** + **mobile drawer**; **`app/page.js`** adds **`pt-16`** on `<main>` for offset. Missing padding or different nav height breaks the hero. |
| **Motion** | **Marquee** (`Testimonials`) uses **`animate-scroll`** from `tailwind.config.js` keyframes. If Loveable used Framer Motion or different animation names, behavior differs. |
| **Links** | Many CTAs still point to **`https://findfoundfast.com/...`**. Local dev uses localhost; swap to **`/get-started`** and **`/pricing`** if you want parity without leaving the dev site. |
| **Missing assets** | Images, SVGs, or Lottie files from Loveable must live under **`public/`** and be imported the Next way. |

**What to do:** Export Loveable’s **components + tailwind + global CSS + any public assets**, then diff file-by-file against the sections below. Prefer **replacing** `components/*.js` with Loveable’s JSX and **adjusting imports** (`import Link from 'next/link'`, `next/image`) until the DOM and classes match.

---

## How to use this bundle

1. Paste this **entire** `.md` file into Loveable / ChatGPT / Claude with: *“Align our Next.js repo to this bundle; list file-level diffs.”*
2. Or paste **individual code blocks** below when asking for a single component fix.

---

## Homepage composition (`app/page.js`)

Order: **`Navbar`** → **`Hero`** → **`StatsStrip`** (from `Stats.js`) → **`Comparison`** → **`HowItWorks`** → **`UseCases`** → **`Testimonials`** → **`Pricing`** (home teaser) → **`CtaFooter`** (includes inline footer links; no separate `Footer` on `/`).

---

## `AGENTS.md` (project brief)

```markdown
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

```


## Source files (full contents below)

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
    "bundle:review": "bash scripts/gen-claude-review-bundle.sh",
    "bundle:loveable": "bash scripts/gen-loveable-review-bundle.sh"
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
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        border: 'hsl(150 5% 15%)',
        background: 'hsl(150 10% 3%)',
        foreground: 'hsl(150 5% 95%)',
        primary: { DEFAULT: 'hsl(155 100% 45%)', foreground: 'hsl(150 10% 3%)' },
        secondary: { DEFAULT: 'hsl(150 6% 12%)', foreground: 'hsl(150 5% 80%)' },
        destructive: { DEFAULT: 'hsl(0 72% 51%)', foreground: 'hsl(0 0% 100%)' },
        muted: { DEFAULT: 'hsl(150 5% 15%)', foreground: 'hsl(150 5% 55%)' },
        accent: { DEFAULT: 'hsl(155 100% 45%)', foreground: 'hsl(150 10% 3%)' },
        card: { DEFAULT: 'hsl(150 8% 7%)', foreground: 'hsl(150 5% 95%)' },
        // FindFoundFast marketing / app utilities (bg-fff-*, text-fff-*, etc.)
        fff: {
          bg: '#0A0A0A',
          card: '#111111',
          gray: '#141414',
          green: '#00FF87',
          yellow: '#FFE135',
          white: '#F5F5F5',
          muted: '#A3A3A3',
          rose: '#FF3D3D',
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
      },
      fontSize: {
        'fff-body': ['clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)', { lineHeight: '1.65' }],
        'fff-body-sm': ['1rem', { lineHeight: '1.55' }],
        'fff-secondary': ['1rem', { lineHeight: '1.55' }],
        'fff-caption': ['0.9375rem', { lineHeight: '1.55' }],
        'fff-micro': ['0.875rem', { lineHeight: '1.5' }],
        'fff-eyebrow': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        scroll: 'scroll 25s linear infinite',
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
  title: 'FindFoundFast — Google Maps stops at the address. We take them to the door.',
  description:
    'Photo-guided directions and expiring gate codes. One link — paste it once, works forever. No app for drivers or guests.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0A0A0A',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable}`}>
      <body className={`${dmSans.className} min-h-[100dvh] antialiased`}>
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: rgba(0, 255, 135, 0.35);
    color: #0c0c0c;
  }

  * {
    border-color: hsl(150 5% 15%);
  }

  body {
    background: hsl(150 10% 3%);
    color: hsl(150 5% 95%);
  }
}

```


## `app/page.js`

```javascript
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatsStrip from '@/components/Stats'
import Comparison from '@/components/Comparison'
import HowItWorks from '@/components/HowItWorks'
import UseCases from '@/components/UseCases'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import CtaFooter from '@/components/CtaFooter'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden pt-16">
      <Navbar />
      <Hero />
      <StatsStrip />
      <Comparison />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <Pricing />
      <CtaFooter />
    </main>
  )
}

```


## `components/Navbar.js`

```javascript
'use client'
import { useState } from 'react'

const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-border/40">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="text-xl font-bold tracking-tight">
          Find<span className="text-primary">Found</span>Fast
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="https://findfoundfast.com/get-started"
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-mono text-xs font-bold tracking-wider uppercase hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Get Started
          </a>
        </div>

        <button type="button" onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
              {l.label}
            </a>
          ))}
          <a href="https://findfoundfast.com/get-started" onClick={() => setOpen(false)} className="px-5 py-3 rounded-full bg-primary text-primary-foreground font-mono text-xs font-bold text-center tracking-wider uppercase mt-2">
            Get Started
          </a>
        </div>
      )}
    </nav>
  )
}

```


## `components/Hero.js`

```javascript
export default function Hero() {
  return (
    <section className="relative pt-24 pb-0 md:pt-32 overflow-hidden min-h-screen flex flex-col">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/[0.08] blur-[120px] animate-glow-pulse pointer-events-none" />

      <div className="container max-w-6xl flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        <div className="flex-1 text-center lg:text-left z-10 pt-8 lg:pt-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-primary tracking-wider">Free to start · No app needed</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
            Maps stop at
            <br />
            the address.
            <br />
            <span className="text-primary">We go to</span>
            <br className="hidden lg:block" />
            <span className="text-primary"> the door.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8">
            Photo-guided directions. Expiring gate codes.
            One link — works forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <a
              href="https://findfoundfast.com/get-started"
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-mono text-sm font-bold tracking-wider uppercase hover:shadow-2xl hover:shadow-primary/30 transition-all"
            >
              Start for free →
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-full border border-border text-muted-foreground font-mono text-sm tracking-wider hover:border-primary/50 hover:text-foreground transition-all"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end relative">
          <div className="relative animate-float">
            <div className="absolute -inset-20 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative w-72 md:w-80 lg:w-96 aspect-[9/19] rounded-[2.5rem] border-2 border-border bg-card shadow-2xl shadow-primary/5 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-lg">📍</span>
              </div>
              <p className="text-sm font-semibold">Step-by-step guide</p>
              <p className="text-xs text-muted-foreground">Photos + directions to your exact door</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  )
}

```


## `components/Stats.js`

```javascript
const features = [
  { emoji: '📍', label: 'Where to park' },
  { emoji: '🚪', label: 'How to get in' },
  { emoji: '🧭', label: 'Where to go' },
]

const stats = [
  { value: '1', unit: 'link', sub: 'per building' },
  { value: '0', unit: 'apps', sub: 'for visitors' },
  { value: '∞', unit: 'auto', sub: 'codes expire' },
]

export default function StatsStrip() {
  return (
    <section className="py-24 relative">
      <div className="container max-w-5xl">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-card border border-border hover:border-primary/30 transition-colors">
              <span>{f.emoji}</span>
              <span className="text-sm font-medium">{f.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {stats.map((s) => (
            <div key={s.unit} className="text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl md:text-7xl font-bold font-mono text-primary">{s.value}</span>
                <span className="text-lg md:text-xl text-muted-foreground font-mono">{s.unit}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

```


## `components/Comparison.js`

```javascript
function Bubble({ children, muted, destructive, primary }) {
  const style = destructive
    ? 'bg-[hsl(0_72%_51%/0.1)] text-[hsl(0_72%_51%)]'
    : primary
    ? 'bg-[hsl(155_100%_45%/0.05)] text-foreground border border-[hsl(155_100%_45%/0.1)]'
    : muted
    ? 'bg-[hsl(150_5%_15%/0.5)] text-muted-foreground italic'
    : 'bg-secondary text-secondary-foreground'

  return <div className={`px-4 py-2.5 rounded-2xl text-sm ${style}`}>{children}</div>
}

export default function Comparison() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            The difference is <span className="text-primary">one link</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-card border border-border p-8 relative overflow-hidden hover:border-destructive/30 transition-colors">
            <div className="absolute top-0 left-0 right-0 h-1 bg-destructive/60" />
            <span className="font-mono text-xs tracking-widest uppercase text-destructive mb-6 block">Without</span>
            <div className="space-y-3 mb-6">
              <Bubble>&quot;I&apos;m outside — how do I get in?&quot;</Bubble>
              <Bubble>&quot;Which entrance? There are 4 doors&quot;</Bubble>
              <Bubble muted>You type the same directions again…</Bubble>
              <Bubble destructive>&quot;Gave up. Left it at the gate. 😞&quot;</Bubble>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              Wrong door. Lost guest. Cold food. Stale gate code in a group chat.
            </p>
          </div>

          <div className="rounded-3xl bg-card border-2 border-primary/50 p-8 relative overflow-hidden hover:border-primary/70 transition-colors">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs tracking-widest uppercase text-primary">With FindFoundFast</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">✓ Delivered</span>
            </div>
            <div className="space-y-3 mb-6">
              <Bubble primary>&quot;On my way! 👋&quot;</Bubble>
              <Bubble primary>They open your link…</Bubble>
              <Bubble primary>Follow photos → park → enter → arrive ✅</Bubble>
            </div>
            <p className="text-xs text-primary font-mono font-medium">
              First try. Code vanished. Zero calls.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

```


## `components/HowItWorks.js`

```javascript
const steps = [
  {
    num: '01',
    emoji: '🧭',
    title: 'Add your spot',
    desc: 'Name your building, apartment, or Airbnb. Takes 30 seconds.',
  },
  {
    num: '02',
    emoji: '📸',
    title: 'Snap photos',
    desc: 'Parking → entrance → lobby → door. Add arrows and notes. 15 minutes tops.',
  },
  {
    num: '03',
    emoji: '🔗',
    title: 'Share one link',
    desc: 'Paste it in your delivery apps, Airbnb listing, or group chat. Works forever.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background pointer-events-none" />

      <div className="container max-w-4xl relative">
        <div className="text-center mb-20">
          <span className="font-mono text-xs tracking-widest uppercase text-primary mb-4 block">How it works</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Set up once.<br />Share forever.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 hidden md:block" />

          <div className="space-y-14">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-6 items-start group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                  {s.emoji}
                </div>
                <div className="pt-1">
                  <span className="font-mono text-xs text-primary/60 tracking-widest mb-1 block">Step {s.num}</span>
                  <h3 className="text-xl font-bold mb-1.5">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

```


## `components/UseCases.js`

```javascript
const cases = [
  { emoji: '👤', title: 'Delivery', desc: 'One link for all your delivery apps. Drivers follow photos to your exact door — no more calls.', tag: 'Free / $4.99' },
  { emoji: '🏠', title: 'Airbnb & Guests', desc: "Guests get photo directions + expiring gate codes. No more \"I'm lost\" texts at midnight.", tag: 'From $4.99/mo' },
  { emoji: '🏢', title: 'Property Managers', desc: 'Links for every building. Resident portal. Auto-expiring codes for maintenance & visitors.', tag: 'From $49/mo' },
  { emoji: '🎓', title: 'Campuses & Events', desc: 'Move-in day, tours, conferences. Guided wayfinding for hundreds — zero lost visitors.', tag: 'Custom' },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-primary mb-4 block">Use cases</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Built for <span className="text-primary">everyone</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Whether you&apos;re getting a pizza delivered or managing 200 units — one link solves it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {cases.map((c) => (
            <div key={c.title} className="group rounded-2xl bg-card border border-border p-8 hover:border-primary/40 hover:bg-primary/[0.03] transition-all duration-300">
              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl group-hover:scale-110 transition-transform inline-block">{c.emoji}</span>
                <span className="font-mono text-xs text-muted-foreground tracking-wider bg-secondary px-3 py-1 rounded-full">{c.tag}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

```


## `components/Testimonials.js`

```javascript
const testimonials = [
  { quote: 'My delivery driver calls me every. single. time.', who: 'Apartment dweller' },
  { quote: "I set it up once — Airbnb guests never get lost.", who: 'Airbnb host' },
  { quote: 'Gate codes get lost in chat. This makes it easy.', who: 'Gated community' },
  { quote: 'Move-in day used to take three staff members.', who: 'Property manager' },
  { quote: 'My friends can never find my apartment.', who: 'Condo owner' },
  { quote: 'I want one link that does the directions for me.', who: 'Busy parent' },
  { quote: 'Stop reposting screenshots — make it timed.', who: 'HOA board member' },
]

export default function Testimonials() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container max-w-5xl text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Sound familiar<span className="text-primary">?</span>
        </h2>
        <p className="text-muted-foreground mt-3">Real problems. One simple fix.</p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll gap-5 w-max">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="shrink-0 w-80 rounded-2xl bg-card border border-border p-6 flex flex-col gap-3 hover:border-primary/20 transition-colors">
              <p className="text-sm text-foreground leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <span className="text-xs text-muted-foreground font-mono">— {t.who}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

```


## `components/Pricing.js`

```javascript
const plans = [
  {
    name: 'Free', price: '$0', period: 'forever', desc: 'Try it out — no credit card.',
    features: ['1 location', 'Timed links (24 hr)', '3 photos per step', 'Basic gate codes'],
    href: 'https://findfoundfast.com/pricing', cta: 'Start free', featured: false,
  },
  {
    name: 'Personal', price: '$4.99', period: '/mo', desc: 'Perfect for your home or Airbnb.',
    features: ['5 locations', 'Permanent links', 'Unlimited photos', 'Expiring gate codes', 'Custom branding'],
    href: 'https://findfoundfast.com/pricing', cta: 'Get started', featured: true,
  },
  {
    name: 'Property', price: '$49', period: '/mo', desc: 'For managers with multiple buildings.',
    features: ['Unlimited buildings', 'Resident portal', 'Auto-expiring codes', 'Analytics dashboard', 'Priority support'],
    href: 'https://findfoundfast.com/pricing', cta: 'Get started', featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />

      <div className="container max-w-5xl relative">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-primary mb-4 block">Pricing</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Simple. Transparent.</h2>
          <p className="text-muted-foreground mt-4">No hidden fees. Upgrade or cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-3xl p-8 relative flex flex-col ${
              p.featured ? 'bg-card border-2 border-primary shadow-2xl shadow-primary/10 scale-[1.02]' : 'bg-card border border-border'
            }`}>
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-mono font-bold">
                  Most Popular
                </div>
              )}

              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className="text-muted-foreground text-sm">{p.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{p.desc}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-secondary-foreground">
                    <span className="text-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href={p.href} className={`block text-center px-6 py-3.5 rounded-full font-mono text-sm font-bold tracking-wide transition-all ${
                p.featured
                  ? 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary border border-border'
              }`}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

```


## `components/CtaFooter.js`

```javascript
export default function CtaFooter() {
  return (
    <>
      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

        <div className="container max-w-3xl text-center relative">
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4">
            Stop giving
            <br />
            <span className="text-primary">crappy directions.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Create your guide in 15 minutes. Share one link. Never explain directions again.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://findfoundfast.com/get-started"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-primary text-primary-foreground font-mono text-sm font-bold tracking-wider uppercase hover:shadow-2xl hover:shadow-primary/30 transition-all"
            >
              Start for free →
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-full border border-border text-muted-foreground font-mono text-sm tracking-wider hover:border-primary/50 hover:text-foreground transition-all"
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="container max-w-5xl mt-28 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm font-bold">Find<span className="text-primary">Found</span>Fast</span>
            <div className="flex items-center gap-6">
              <a href="#how-it-works" className="text-xs text-muted-foreground hover:text-foreground transition-colors">How it works</a>
              <a href="#use-cases" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Use cases</a>
              <a href="#pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            </div>
            <p className="text-xs text-muted-foreground">© 2025 FindFoundFast. All rights reserved.</p>
          </div>
        </div>
      </section>
    </>
  )
}

```


## `components/Footer.js`

```javascript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-fff-bg";

export default function Footer() {
  const pathname = usePathname();
  const dark =
    pathname === "/" ||
    pathname === "/how-it-works" ||
    pathname.startsWith("/how-it-works/");

  return (
    <footer
      className={`relative z-10 border-t py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:py-6 ${
        dark ? "border-fff-border" : "border-stone-200"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 sm:flex-row sm:justify-between sm:px-6">
        <Link
          href="/"
          className={`font-mono text-sm font-extrabold tracking-tight ${
            dark
              ? "text-fff-text-primary transition-colors hover:text-fff-text-secondary"
              : "text-stone-700 transition-colors hover:text-stone-900"
          } ${focusRing} rounded-sm`}
        >
          Find<span className="text-[#00c46f]">Found</span>Fast
        </Link>
        <div
          className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs font-bold uppercase tracking-wide ${
            dark ? "text-fff-muted" : "text-stone-400"
          }`}
        >
          <Link
            href="/how-it-works"
            className={`transition-colors ${dark ? "hover:text-fff-text-primary" : "hover:text-stone-700"} ${focusRing} rounded-sm`}
          >
            How it works
          </Link>
          <Link
            href="/pricing"
            className={`transition-colors ${dark ? "hover:text-fff-text-primary" : "hover:text-stone-700"} ${focusRing} rounded-sm`}
          >
            Pricing
          </Link>
          <Link
            href="/get-started"
            className={`transition-colors ${dark ? "hover:text-emerald-400" : "hover:text-emerald-700"} ${focusRing} rounded-sm`}
          >
            Get started
          </Link>
        </div>
        <p className={`font-mono text-xs ${dark ? "text-fff-muted" : "text-stone-400"}`}>
          © {new Date().getFullYear()} FindFoundFast
        </p>
      </div>
    </footer>
  );
}

```


## `components/Header.js`

```javascript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-fff-bg";

export default function Header() {
  const pathname = usePathname();
  const dark =
    pathname === "/how-it-works" ||
    pathname.startsWith("/how-it-works/");

  const navLink = (href, label) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return active ? (
      <span className="font-mono text-sm font-bold uppercase tracking-wide text-emerald-400">{label}</span>
    ) : (
      <Link
        href={href}
        className={`font-mono text-sm font-bold uppercase tracking-wide ${dark ? "text-fff-muted transition-colors hover:text-fff-text-primary" : "text-stone-600 transition-colors hover:text-stone-900"} ${focusRing} rounded-sm`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className={`relative z-10 border-b backdrop-blur-xl ${
        dark ? "border-fff-border bg-fff-bg/90" : "border-stone-200 bg-white/90"
      }`}
    >
      <div className="flex flex-col gap-2 px-4 py-2.5 pt-[max(0.75rem,env(safe-area-inset-top))] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3">
        <Link
          href="/"
          className={`text-lg font-extrabold tracking-tight ${dark ? "text-fff-text-primary transition-colors hover:text-fff-text-secondary" : "text-stone-900 transition-colors hover:text-stone-800"} ${focusRing} rounded-sm`}
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


## `lib/supabase.js`

```javascript
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => 
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

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


## `app/pricing/page.js`

```javascript
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

```


## `app/how-it-works/page.js`

```javascript
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


*End of Loveable bundle. Files: package.json next.config.js tailwind.config.js jsconfig.json postcss.config.js app/layout.js app/globals.css app/page.js components/Navbar.js components/Hero.js components/Stats.js components/Comparison.js components/HowItWorks.js components/UseCases.js components/Testimonials.js components/Pricing.js components/CtaFooter.js components/Footer.js components/Header.js lib/supabase.js app/pricing/layout.js app/pricing/page.js app/how-it-works/page.js app/get-started/page.js*
