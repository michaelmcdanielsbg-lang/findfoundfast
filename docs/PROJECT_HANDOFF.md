# FindFoundFast — handoff & operations (read if chat context is lost)

This file summarizes **how the project is wired**, **where things live**, and **what to do when something breaks**.  
Product brief: **`AGENTS.md`**. Architecture split: **`ARCHITECTURE.md`**. Loveable button URLs only: **`docs/LOVABLE_LINKS.md`**.

---

## 1. What this product is (one paragraph)

**FindFoundFast** gives drivers and guests a **timed link** with **step-by-step photos** and **expiring gate codes** so they can find the door without calling. **Property managers** set up buildings once; **residents** create timed links; **drivers** open a link (no app). Marketing tells the story; the **app** holds accounts, Supabase data, and link pages.

---

## 2a. Navigation behavior (why “back” felt wrong)

Links on **`app.findfoundfast.com`** that used **`href="/"`** sent people to the **Next.js homepage on the app subdomain**, not Loveable — so after “Start for free” it felt like a second marketing site.

**Fix in code:** logo and “home” / “back to marketing” style links use **`marketingUrl()`** from **`lib/site.js`** (`NEXT_PUBLIC_MARKETING_ORIGIN`, default `https://findfoundfast.com`). CTAs to sign in use **`appUrl('/auth/login')`**.

The **browser Back** button still follows real history: Loveable → app → Back returns to Loveable. **In-app** links to “home” now jump to the marketing site explicitly.

---

## 2. Two sites — do not mix them up

| Site | Domain | Built with | Purpose |
|------|--------|------------|---------|
| **Marketing** | `https://findfoundfast.com` | **Loveable** | Story, pricing copy, CTAs that **link out** to the app. |
| **App (product)** | `https://app.findfoundfast.com` | **This repo** — Next.js on **Vercel** | Login, Google/Apple, manager dashboard, resident area, `/link/[slug]` driver pages, APIs, Supabase. |

**Critical:** Paths like **`/auth/login`** exist **only on `app.findfoundfast.com`**, not on the bare marketing domain.  
If someone uses **`findfoundfast.com/auth/login`**, they get **404** — that is expected. Fix **Loveable links**, not “the app is down.”

**Canonical CTA URLs** are listed in **`docs/LOVABLE_LINKS.md`**. Default sign-up/sign-in:  
`https://app.findfoundfast.com/auth/login`  
Property-manager signup hint: add **`?as=manager`**.

---

## 3. Repo + deploy

- **GitHub:** push `main`; **Vercel** builds this repo for **`app.findfoundfast.com`**.
- **Vercel project** is linked locally via **`.vercel/project.json`** (CLI: `vercel link`).
- **Production deploy:** `vercel deploy --prod` (or push to `main` if Git integration is on).
- **Do not commit secrets.** **`/.env.local`** is gitignored; keys live in **Vercel → Settings → Environment Variables** and locally in `.env.local`.

**Required env vars (names):**

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_ORIGIN` — e.g. `https://app.findfoundfast.com`
- `NEXT_PUBLIC_MARKETING_ORIGIN` — e.g. `https://findfoundfast.com`
- Optional: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `RESEND_FROM`, `LEAD_INBOX_EMAIL` (for `/api/demo` lead emails)

See **`.env.example`**.

---

## 4. DNS (Namecheap / registrar)

- **`@` and `www`** on `findfoundfast.com` typically point to **Loveable** (or their IPs) — marketing stays there.
- **`app`** subdomain must point to **Vercel**:
  - **Recommended:** **CNAME** `app` → `cname.vercel-dns.com`
  - **Do not** set **both** an **A** and a **CNAME** for the same host `app` — remove the duplicate; **CNAME only** for `app` is the usual fix.
- Add **`app.findfoundfast.com`** under **Vercel → Project → Domains** and wait until it shows **Valid**.

**If the browser shows `DNS_PROBE_FINISHED_NXDOMAIN` for `app`:**
- DNS for `app` is missing or conflicting — fix records at the registrar.
- Or local **DNS cache** — try another network, incognito, or flush DNS (`sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` on Mac).

**Fallback URL** that always resolves on Vercel:  
`https://findfoundfast-final.vercel.app` (project production URL; same app as `app.` when DNS is correct).

---

## 5. Supabase

- **Dashboard:** SQL Editor — run migration files in order from **`supabase/migrations/`** (or use Supabase CLI `db push` if linked).
- Main files:
  - **`20250331000000_findfoundfast_schema.sql`** — tables, RLS, `handle_new_user`, `get_session_by_token`, etc.
  - **`20250331000001_manager_org_storage.sql`** — org RPC, storage bucket `building-photos`, photo policies.
  - **`20250409000000_oauth_profile_names.sql`** — Google/Apple **full_name** mapping on signup.
- **Auth → URL configuration:** **Site URL** should match the app, e.g. `https://app.findfoundfast.com`. **Redirect URLs** must include:
  - `https://app.findfoundfast.com/auth/callback`
  - `http://localhost:3000/auth/callback` (local dev)
- **Google OAuth:** Google Cloud OAuth client → authorized redirect URI is Supabase’s **`https://<project-ref>.supabase.co/auth/v1/callback`**. Paste Client ID/secret in **Supabase → Authentication → Providers → Google**. Same idea for Apple when configured.

---

## 6. App routes (this repo)

| Path | Role |
|------|------|
| `/auth/login` | Email/password, Google, Apple; `?as=manager` for manager metadata on email signup. |
| `/auth/callback` | OAuth return — exchanges code for session, then redirects to `/manager` or `/resident` by profile role. |
| `/get-started` | **Redirects to `/auth/login`** (marketing “Get started” should land on sign-in). |
| `/request-demo` | Lead form → `POST /api/demo` (Resend optional). |
| `/manager` | Property manager setup (org, buildings, photos, shareable `/link/{slug}`). |
| `/resident` | Resident portal (to be expanded). |
| `/link/[slug]` | Public driver view (building + photos; sessions/codes per product rules). |

**Helpers:** `lib/site.js` — `appUrl()`, `marketingUrl()`, `getAppOrigin()` using `NEXT_PUBLIC_*`.

---

## 7. Common mistakes (quick fixes)

| Symptom | Likely cause | Fix |
|---------|----------------|-----|
| 404 on `findfoundfast.com/auth/login` | Login is not on marketing | Use **`app.findfoundfast.com/auth/login`**. Update Loveable links (`docs/LOVABLE_LINKS.md`). |
| “Get started” shows old contact form | Before redirect, `/get-started` was the form | Current behavior: **`/get-started` → `/auth/login`**. Lead form is **`/request-demo`**. Deploy latest. |
| `NXDOMAIN` on `app.` | No or bad DNS for `app` | CNAME `app` → `cname.vercel-dns.com`; remove duplicate A on `app`. |
| Vercel shows apex `findfoundfast.com` invalid | Apex is for Loveable, not this Next app | Remove apex from Vercel project if marketing owns it; keep **`app`** domain on Vercel. |

---

## 8. Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Copy **`.env.example`** → **`.env.local`** and add Supabase URL + anon key from the Supabase dashboard.

---

## 9. Related docs in this repo

| File | Contents |
|------|----------|
| `AGENTS.md` | Product brief, flows, stack. |
| `ARCHITECTURE.md` | Loveable vs Cursor split, CTA conventions. |
| `docs/LOVABLE_LINKS.md` | Paste-this table for Loveable buttons. |
| `supabase/migrations/*.sql` | Database + storage + triggers. |

---

*Last updated: handoff doc for continuity if chat history is unavailable.*
