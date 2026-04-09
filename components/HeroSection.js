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
