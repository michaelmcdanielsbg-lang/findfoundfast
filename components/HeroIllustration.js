/**
 * Illustrated hero scene — phone + buildings + scooter (pure SVG).
 */
export default function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-2xl select-none" aria-hidden>
      <svg
        width="100%"
        viewBox="0 0 680 340"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#f5f3ef" />
          </linearGradient>
          <linearGradient id="buildingA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e7e5e0" />
            <stop offset="100%" stopColor="#d6d3cc" />
          </linearGradient>
          <linearGradient id="buildingB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dde3ea" />
            <stop offset="100%" stopColor="#c9d1db" />
          </linearGradient>
          <filter id="phone-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#00c46f" floodOpacity="0.18" />
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.10" />
          </filter>
        </defs>

        <rect width="680" height="340" fill="url(#sky)" />

        <rect x="0" y="270" width="680" height="70" fill="#ede9e3" />
        <rect x="0" y="270" width="680" height="2" fill="#ddd9d2" />

        <rect x="0" y="290" width="680" height="28" fill="#d6d3cc" />
        <rect x="0" y="288" width="680" height="2" fill="#c8c4bc" />
        <rect x="0" y="318" width="680" height="2" fill="#c8c4bc" />
        {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600].map((x) => (
          <rect key={x} x={x} y="303" width="36" height="3" rx="1.5" fill="#bbb8b0" opacity="0.6" />
        ))}

        <rect x="110" y="80" width="160" height="192" rx="3" fill="url(#buildingA)" stroke="#ccc8c0" strokeWidth="1" />
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`a-${row}-${col}`}
              x={126 + col * 44}
              y={96 + row * 34}
              width={26}
              height={18}
              rx="2"
              fill={row === 0 && col === 1 ? "#fef9c3" : row === 2 && col === 0 ? "#fef9c3" : "#c5d9f0"}
              opacity="0.85"
            />
          ))
        )}
        <rect x="168" y="234" width="24" height="38" rx="2" fill="#c5bfb5" stroke="#b8b2a8" strokeWidth="1" />
        <circle cx="189" cy="253" r="2" fill="#a09890" />
        <rect x="126" y="60" width="48" height="16" rx="4" fill="#00FF87" />
        <text x="150" y="72" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="ui-monospace,monospace" fill="#0a0a0a" letterSpacing="0.05em">
          BLDG A
        </text>

        <rect x="430" y="140" width="130" height="132" rx="3" fill="url(#buildingB)" stroke="#c0c8d0" strokeWidth="1" />
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => (
            <rect
              key={`b-${row}-${col}`}
              x={448 + col * 52}
              y={156 + row * 34}
              width={28}
              height={18}
              rx="2"
              fill={row === 1 && col === 1 ? "#fef9c3" : "#c5d9f0"}
              opacity="0.8"
            />
          ))
        )}
        <rect x="477" y="236" width="22" height="36" rx="2" fill="#b8c4cf" stroke="#a8b4bf" strokeWidth="1" />

        {[90, 290, 420, 590].map((x) => (
          <g key={x}>
            <rect x={x + 6} y="258" width="4" height="16" fill="#a89f8c" />
            <ellipse cx={x + 8} cy="252" rx="12" ry="14" fill="#4ade80" opacity="0.7" />
            <ellipse cx={x + 8} cy="248" rx="9" ry="10" fill="#22c55e" opacity="0.6" />
          </g>
        ))}

        <g transform="translate(42, 274)">
          <rect x="0" y="0" width="52" height="20" rx="8" fill="#1e293b" />
          <rect x="34" y="-8" width="14" height="12" rx="3" fill="#334155" stroke="#475569" strokeWidth="0.8" />
          <rect x="2" y="-10" width="26" height="16" rx="3" fill="#00FF87" />
          <text x="15" y="-1" textAnchor="middle" fontSize="7" fontWeight="800" fontFamily="ui-monospace,monospace" fill="#0a0a0a">
            FFF
          </text>
          <circle cx="10" cy="20" r="7" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <circle cx="10" cy="20" r="3" fill="#64748b" />
          <circle cx="42" cy="20" r="7" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <circle cx="42" cy="20" r="3" fill="#64748b" />
          <line x1="-8" y1="5" x2="-18" y2="5" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <line x1="-8" y1="10" x2="-22" y2="10" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <line x1="-8" y1="15" x2="-16" y2="15" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        </g>

        <g transform="translate(270, 30)" filter="url(#phone-shadow)">
          <rect x="0" y="0" width="140" height="248" rx="18" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="6" y="8" width="128" height="232" rx="14" fill="#111827" />
          <rect x="48" y="8" width="44" height="10" rx="5" fill="#0f172a" />

          <rect x="6" y="18" width="128" height="26" rx="0" fill="#14532d" />
          <rect x="6" y="30" width="128" height="14" rx="0" fill="#14532d" />
          <text x="20" y="30" fontSize="7" fontWeight="700" fontFamily="ui-monospace,monospace" fill="#86efac" letterSpacing="0.06em">
            FINDFOUNDFAST
          </text>
          <text x="20" y="40" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif" fill="#ffffff">
            Sunny Apts · Apt 412
          </text>
          <rect x="98" y="22" width="30" height="14" rx="4" fill="#166534" />
          <text x="113" y="32" textAnchor="middle" fontSize="7.5" fontWeight="700" fontFamily="ui-monospace,monospace" fill="#4ade80">
            29:41
          </text>

          <rect x="12" y="50" width="116" height="68" rx="8" fill="#1e293b" />
          <rect x="12" y="50" width="116" height="42" rx="8" fill="#1e3a5f" />
          <rect x="12" y="76" width="116" height="16" rx="0" fill="#1e3a5f" />
          <line x1="36" y1="68" x2="36" y2="92" stroke="#334155" strokeWidth="0.8" />
          <line x1="60" y1="68" x2="60" y2="92" stroke="#334155" strokeWidth="0.8" />
          <line x1="84" y1="68" x2="84" y2="92" stroke="#334155" strokeWidth="0.8" />
          <line x1="108" y1="68" x2="108" y2="92" stroke="#334155" strokeWidth="0.8" />
          <rect x="38" y="79" width="18" height="8" rx="1.5" fill="#374151" />
          <rect x="62" y="79" width="18" height="8" rx="1.5" fill="#374151" />
          <path d="M88 62 L108 62" stroke="#00FF87" strokeWidth="2" strokeLinecap="round" />
          <path d="M104 58 L108 62 L104 66" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="16" y="54" width="28" height="10" rx="3" fill="#22c55e" />
          <text x="30" y="62" textAnchor="middle" fontSize="6" fontWeight="800" fontFamily="ui-monospace,monospace" fill="#fff" letterSpacing="0.05em">
            STEP 1
          </text>
          <text x="20" y="108" fontSize="8.5" fontWeight="700" fontFamily="system-ui,sans-serif" fill="#f1f5f9">
            Parking / Drop-off
          </text>
          <text x="20" y="118" fontSize="7" fontFamily="system-ui,sans-serif" fill="#94a3b8">
            Entrance B · blue sign
          </text>

          <rect x="12" y="124" width="116" height="68" rx="8" fill="#1e293b" />
          <rect x="12" y="124" width="116" height="42" rx="8" fill="#1c2a3a" />
          <rect x="52" y="128" width="36" height="34" rx="2" fill="#162032" stroke="#2d3f52" strokeWidth="0.8" />
          <rect x="62" y="134" width="10" height="20" rx="1.5" fill="#0d1520" stroke="#2d3f52" strokeWidth="0.5" />
          <circle cx="70" cy="144" r="1.5" fill="#475569" />
          <rect x="76" y="136" width="8" height="10" rx="1" fill="#0d1520" stroke="#2d3f52" strokeWidth="0.5" />
          <circle cx="78.5" cy="139" r="0.8" fill="#4ade80" />
          <circle cx="81.5" cy="139" r="0.8" fill="#4ade80" />
          <circle cx="78.5" cy="142" r="0.8" fill="#4ade80" />
          <circle cx="81.5" cy="142" r="0.8" fill="#4ade80" />
          <path d="M22 145 L46 145" stroke="#00FF87" strokeWidth="2" strokeLinecap="round" />
          <path d="M42 141 L46 145 L42 149" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="16" y="128" width="28" height="10" rx="3" fill="#22c55e" />
          <text x="30" y="136" textAnchor="middle" fontSize="6" fontWeight="800" fontFamily="ui-monospace,monospace" fill="#fff" letterSpacing="0.05em">
            STEP 2
          </text>
          <text x="20" y="182" fontSize="8.5" fontWeight="700" fontFamily="system-ui,sans-serif" fill="#f1f5f9">
            Main Entrance
          </text>
          <text x="20" y="192" fontSize="7" fontFamily="system-ui,sans-serif" fill="#94a3b8">
            Keypad on left · code below
          </text>

          <rect x="12" y="198" width="116" height="26" rx="8" fill="#00FF87" />
          <text x="40" y="215" fontSize="7.5" fontWeight="700" fontFamily="ui-monospace,monospace" fill="#0a0a0a" letterSpacing="0.08em">
            GATE CODE
          </text>
          <text x="110" y="215" textAnchor="end" fontSize="13" fontWeight="900" fontFamily="ui-monospace,monospace" fill="#0a0a0a" letterSpacing="0.18em">
            4729
          </text>

          <rect x="48" y="228" width="16" height="3" rx="1.5" fill="#22c55e" />
          <rect x="68" y="228" width="16" height="3" rx="1.5" fill="#22c55e" />
          <rect x="88" y="228" width="10" height="3" rx="1.5" fill="#374151" />
          <rect x="102" y="228" width="10" height="3" rx="1.5" fill="#374151" />
        </g>

        <path
          d="M340 278 Q270 278 242 268"
          stroke="#00FF87"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          fill="none"
          opacity="0.5"
        />
        <circle cx="242" cy="268" r="4" fill="#00FF87" opacity="0.7" />

        <rect x="420" y="34" width="74" height="20" rx="10" fill="#00FF87" />
        <text x="457" y="48" textAnchor="middle" fontSize="8.5" fontWeight="800" fontFamily="ui-monospace,monospace" fill="#0a0a0a" letterSpacing="0.06em">
          ● DELIVERED
        </text>
      </svg>
    </div>
  );
}
