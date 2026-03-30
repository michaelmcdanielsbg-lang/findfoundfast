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
| `/how-it-works` | Tabbed walkthrough: **Property manager** (default tab) → Resident → Driver; demos, chat before/after, link preview |

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
