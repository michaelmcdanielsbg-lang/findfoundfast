# FindFoundFast — Project brief (reference)

**Product:** FindFoundFast — [findfoundfast.com](https://findfoundfast.com)

**Taglines (alternate):**

- “Google Maps for your food and your homies”
- “FFFLipping Cool” (brand voice — playful spelling intentional)

## What it is

A **web-based micro-location delivery guidance** platform. It solves the **“I’m outside but I can’t find you”** problem at apartment complexes, hotels, offices, hospitals, schools, and homes.

Instead of residents texting confusing directions and gate codes that get screenshot-shared forever, FindFoundFast gives drivers/guests a **single, timed link** that shows clear **step-by-step photos** and **expiring gate codes**.

## Core flow

### Property manager (one-time setup)

- Creates a **building profile** (Building A, North Tower, Tower 3, etc.).
- Uploads **4 base photos:** Parking → Entrance → Lobby → Elevator.
- Adds optional **arrows** and **gate/door codes**.
- Gets **one permanent link per building** (e.g. `findfoundfast.com/link/sunny-a`).

### Resident

- Receives a **5-character code** from the property manager.
- **Logs in once**, selects building + unit.
- Chooses timer: **30 minutes, 1 hour, or 1 day**.
- Copies a **unique timed link** and sends it to driver/guest.

### Driver / guest (no app, no login)

- Clicks the link.
- Sees **large photo guide** with step numbers, descriptions, and gate code.
- **Code expires when the timer ends** → link dies (prevents stale screenshots).

## How-it-works page (`/how-it-works`)

Three tabs:

1. **Property manager** — Full-width instructions, 2×2 photo grid with labels, benefit text.
2. **Resident** — Messy chat vs clean chat, “how you get your link” steps, preview of generated link.
3. **Driver** — Interactive demo: large photos, numbered steps, expiration notice.

## Tech stack

- **Next.js** (App Router)
- **Tailwind CSS** (dark theme, emerald accents)
- **Supabase** (auth, database, photo storage)
- **Vercel** deploy  
- **Live domain:** findfoundfast.com

## Brand voice

Fun, bold, confident, **anti-frustration**. Speaks to residents like a friend and to property managers like a smart business decision.

## Page goals

Make it **simple and visual** so property managers immediately see the value and residents see exactly what they will send to drivers.

---

*Last synced from product conversation — update this file when positioning changes.*
