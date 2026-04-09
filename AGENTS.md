# FindFoundFast — Project brief (for humans & AI)

**Product:** FindFoundFast  
**Domain:** [findfoundfast.com](https://findfoundfast.com)  
**Taglines:** “Google Maps for your food and your homies” · “FFFliping Cool” (brand voice)

## What it is

A simple **web-based micro-location guidance** product for apartment complexes, nursing homes, hospitals, offices, hotels, schools, and large residential communities.

Property managers set up each building once. Residents then use either a **Permanent link** (never expires) or a **Timed link** (30 minutes / 1 hour / 1 day) so drivers and guests can follow step-by-step photos and reach the right door fast.

## Core flows

### Property manager (one-time setup)

1. Creates a building profile (Building A, North Tower, Tower 3, etc.).
2. Uploads **4 base photos:** Parking → Entrance → Lobby → Elevator.
3. Optionally adds arrows and gate/door codes.
4. Decides whether gate codes are part of that building setup.
5. Residents in that building automatically use the same guidance setup.

### Resident

1. Receives a **5-character code** from the property manager.
2. Logs in once (first-time setup), selects **building + unit**.
3. After that, simply opens FindFoundFast to immediately see building links.
4. Chooses a link type:
   - **Permanent link** (never expires; no gate code required)
   - **Timed link** (**30 minutes, 1 hour, or 1 day**) when auto-expiring code visibility is needed
5. Copies the link into delivery apps, text messages, or guest chats.

### Driver / guest (no app, no login)

1. Clicks the link.
2. Sees a **photo guide** with step numbers and descriptions.
3. If it is a **timed link**, gate code details appear and then expire with the timer.
4. If it is a **permanent link**, the guide stays active with no expiration.

## Marketing site (this repo)

| Route | Purpose |
|-------|--------|
| `/` | Minimal landing: brand headline, value prop, **Try it free** (app), **How it works** → `/how-it-works` |
| `/how-it-works` | **Who are you?** Property vs **College campus**. Property: tabs **Manager** → Resident → Driver; campus: permanent/timed use cases. URL: `?audience=property|campus` and `?tab=manager|resident|driver` |

**Goal:** Make value obvious fast for **property managers** and show **residents** exactly how Permanent and Timed links work in real life.

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

*Last updated: concept brief refreshed for one-time resident login + Permanent/Timed link model.*
