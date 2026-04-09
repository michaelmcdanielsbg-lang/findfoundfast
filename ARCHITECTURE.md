# FindFoundFast — project architecture

## Two-repo split

| Concern | Tool | Repo | Domain |
|---------|------|------|--------|
| **Marketing site** | Lovable | Lovable-connected GitHub repo (React + Vite + Tailwind) | `findfoundfast.com` |
| **App (auth, dashboard, API, Supabase)** | Cursor | This repo — Next.js + Supabase | `app.findfoundfast.com` |

Replace “Lovable-connected GitHub repo” with your actual repo name in GitHub settings.

## Who does what

**Lovable is not running the product.** It’s the **design surface** for the public marketing site (layout, visuals, motion, copy) deployed at `findfoundfast.com`.

**You still run everything else in Cursor / this repo:** authentication, Supabase, manager and resident flows, link delivery, API routes, business logic, data, env, Vercel config, integrations, and any app or marketing-adjacent pages you keep in Next (e.g. `/pricing`, `/how-it-works`, `/get-started`). The **app** at **`app.findfoundfast.com`** is this codebase — that’s the real product.

## Rules

1. **Lovable provides:** Marketing **design** (and its repo hosts that static/marketing build at `findfoundfast.com`). CTAs there should point to **`https://app.findfoundfast.com/get-started`**.
2. **This repo (Cursor) runs:** The **application** — everything beyond that designed marketing shell: auth, dashboards, APIs, Supabase, link pages, etc. Deployed at **`app.findfoundfast.com`**.
3. **No duplication:** Prefer not rebuilding the same marketing homepage in Next.js if Lovable already ships it; don’t put auth/backend in the Lovable repo.
4. **GitHub:** Lovable’s repo and this Next repo stay **separate** unless you intentionally merge or copy files.
5. **Shared branding:** **`lib/design-tokens.js`** + **`tailwind.config.js`**. Align fonts/colors with Lovable when you want visual parity; accent green **`hsl(155 100% 45%)`** (`primary` in Tailwind).

## CTA link convention

All marketing CTAs: **`https://app.findfoundfast.com/get-started`**

In this repo, use **`appUrl()`** from **`lib/site.js`** so origins stay env-driven (`NEXT_PUBLIC_APP_ORIGIN`).

## Next.js app structure (this repo)

| Area | Path / notes |
|------|----------------|
| Marketing (legacy / optional) | `app/page.js` + `components/*` — prefer not duplicating Lovable; useful for local preview or redirects. |
| Auth | `app/auth/login/` |
| App surfaces | `app/manager/`, `app/resident/` |
| Driver link view | `app/link/[slug]/` |
| Pricing / how-it-works (detailed) | `app/pricing/`, `app/how-it-works/` |
| Lead / demo API | `app/api/demo/` |
| Supabase client | `lib/supabase.js` |
| URL helpers | `lib/site.js` (app vs marketing origins) |
| Design constants | `lib/design-tokens.js` (accent, shared HSL notes) |

## Related docs

- **`AGENTS.md`** — product brief, flows, brand voice.
- **`docs/LOVABLE_REVIEW_BUNDLE.md`** — regenerate with `npm run bundle:loveable` when syncing context for Loveable.
