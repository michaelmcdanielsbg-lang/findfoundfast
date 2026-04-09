#!/usr/bin/env bash
# Regenerates docs/CLAUDE_REVIEW_BUNDLE.md — paste that file into Claude for full-site context.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/docs/CLAUDE_REVIEW_BUNDLE.md"

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
  printf "\n\`\`\`\n\n\n" >> "$OUT"
}

: > "$OUT"

cat >> "$OUT" << 'HEADER'
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

**Routes (marketing):** `/` (Navbar, Hero, Stats, Comparison, section components, CtaFooter), `/pricing`, `/how-it-works` (`?audience=personal|property|campus`), `/get-started`.

**Routes (app):** `/auth/login`, `/manager`, `/resident`, `/link/[slug]` (driver view; inline styles, brand green app bar).

---

## AGENTS.md (project brief)

HEADER

# Inline AGENTS.md (same as repo root — keep in sync)
cat "$ROOT/AGENTS.md" >> "$OUT"
printf "\n\n---\n\n" >> "$OUT"

FILES=(
  "package.json"
  "next.config.js"
  "tailwind.config.js"
  "jsconfig.json"
  "postcss.config.js"
  "app/layout.js"
  "app/globals.css"
  "lib/supabase.js"
  "app/page.js"
  "components/Header.js"
  "components/Footer.js"
  "components/Navbar.js"
  "components/Hero.js"
  "components/Stats.js"
  "components/Comparison.js"
  "components/HowItWorks.js"
  "components/UseCases.js"
  "components/Testimonials.js"
  "components/Pricing.js"
  "components/CtaFooter.js"
  "app/pricing/page.js"
  "app/pricing/layout.js"
  "app/how-it-works/page.js"
  "app/get-started/page.js"
  "app/preview/page.js"
  "app/api/demo/route.js"
  "app/auth/login/page.js"
  "app/manager/page.js"
  "app/resident/page.js"
  "app/link/[slug]/page.js"
)

for f in "${FILES[@]}"; do
  append_file "$f"
done

echo "*End of bundle. File list: ${FILES[*]}*" >> "$OUT"
echo "Wrote $OUT ($(wc -c < "$OUT" | tr -d ' ') bytes)" >&2
