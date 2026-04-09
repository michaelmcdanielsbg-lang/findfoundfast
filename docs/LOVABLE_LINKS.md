# Loveable → app links (copy into buttons on findfoundfast.com)

**Rule:** The **marketing site** lives on **`https://findfoundfast.com`** (Loveable).  
All **sign-in, sign-up, and product** actions go to **`https://app.findfoundfast.com`** (this Next.js app).

Use **full URLs** in Loveable so links work from email, social, and bookmarks.

---

## Primary CTAs (most buttons)

| Button label (examples) | Paste this URL |
|---------------------------|----------------|
| Start for free · Get started · Try it · Sign up | `https://app.findfoundfast.com/auth/login` |
| Same, but **property managers** see manager onboarding | `https://app.findfoundfast.com/auth/login?as=manager` |

`https://app.findfoundfast.com/get-started` also works — it **redirects** to `/auth/login`.

---

## Deeper pages (optional — still on the app)

| If the button should open… | URL |
|----------------------------|-----|
| Pricing (Next.js page) | `https://app.findfoundfast.com/pricing` |
| How it works (tabs) | `https://app.findfoundfast.com/how-it-works` |
| Talk to us / lead form (sales) | `https://app.findfoundfast.com/request-demo` |

---

## What stays on Loveable only

- Homepage story, motion, testimonials, **pricing copy** (if you don’t link to app pricing)
- Anything that is **read-only marketing** with **no** login or data

---

## Checklist when you change Loveable

1. Every **“Get started” / “Start free”** → **`https://app.findfoundfast.com/auth/login`** (or `?as=manager` for manager-focused sections).
2. No links to **`findfoundfast.com/auth/login`** — that path does **not** exist on marketing; login is only on **`app.`**.
3. After publishing Loveable, click each button once and confirm you land on **`app.findfoundfast.com`**.
