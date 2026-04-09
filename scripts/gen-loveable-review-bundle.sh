#!/usr/bin/env bash
# docs/LOVABLE_REVIEW_BUNDLE.md — full marketing + config for Loveable to diff against their export.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/docs/LOVABLE_REVIEW_BUNDLE.md"

append_file() {
  local rel="$1"
  local path="$ROOT/$rel"
  if [[ ! -f "$path" ]]; then
    echo "WARN: missing $rel (skipping)" >&2
    return 0
  fi
  echo "## \`$rel\`" >> "$OUT"
  echo "" >> "$OUT"
  local ext="${rel##*.}"
  local lang="txt"
  case "$ext" in
    js) lang="javascript" ;;
    jsx) lang="javascript" ;;
    ts) lang="typescript" ;;
    tsx) lang="typescript" ;;
    json) lang="json" ;;
    css) lang="css" ;;
    mjs) lang="javascript" ;;
  esac
  echo "\`\`\`$lang" >> "$OUT"
  cat "$path" >> "$OUT"
  printf '\n```\n\n\n' >> "$OUT"
}

: > "$OUT"

cat >> "$OUT" << 'HEADER'
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

HEADER

echo "## \`AGENTS.md\` (project brief)" >> "$OUT"
echo "" >> "$OUT"
echo '```markdown' >> "$OUT"
cat "$ROOT/AGENTS.md" >> "$OUT"
printf '\n```\n\n\n' >> "$OUT"

echo "## Source files (full contents below)" >> "$OUT"
echo "" >> "$OUT"

FILES=(
  "package.json"
  "next.config.js"
  "tailwind.config.js"
  "jsconfig.json"
  "postcss.config.js"
  "lib/site.js"
  "lib/design-tokens.js"
  "ARCHITECTURE.md"
  "app/layout.js"
  "app/globals.css"
  "app/page.js"
  "components/Navbar.js"
  "components/Hero.js"
  "components/Stats.js"
  "components/Comparison.js"
  "components/HowItWorks.js"
  "components/UseCases.js"
  "components/Testimonials.js"
  "components/Pricing.js"
  "components/CtaFooter.js"
  "components/Footer.js"
  "components/Header.js"
  "lib/supabase.js"
  "app/pricing/layout.js"
  "app/pricing/page.js"
  "app/how-it-works/page.js"
  "app/get-started/page.js"
)

for f in "${FILES[@]}"; do
  append_file "$f"
done

echo "*End of Loveable bundle. Files: ${FILES[*]}*" >> "$OUT"
echo "Wrote $OUT ($(wc -c < "$OUT" | tr -d ' ') bytes)" >&2
