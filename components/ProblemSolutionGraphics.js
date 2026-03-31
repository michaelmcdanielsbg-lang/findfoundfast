/**
 * Problem / Solution art — shared building + vehicle geometry; color/story only differs.
 */

/* Frame fills a fixed 420:220 box so Problem & Solution match pixel-perfect */
const ILLUSTRATION_SVG =
  'block h-full w-full rounded-xl border bg-[#1a1a1a] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]';
/** min-w-0 avoids flex/grid children clipping the SVG on narrow viewports */
const ILLUSTRATION_WRAP = 'w-full min-w-0 max-w-[420px] shrink-0 aspect-[420/220]';

/** Same footprint as Problem: 160×112 @ (130,58), 3×5 windows @ 14×12, door @ (188,152) */
function BuildingFacade({ variant }) {
  const sol = variant === 'solution';
  const winFill = sol ? 'rgba(0,255,135,0.14)' : 'rgba(255,61,61,0.55)';
  const winStroke = sol ? 'rgba(0,255,135,0.45)' : 'rgba(255,61,61,0.45)';
  const doorFill = sol ? 'rgba(0,255,135,0.35)' : 'rgba(255,61,61,0.7)';
  const doorStroke = sol ? '#00FF87' : 'rgba(255,61,61,0.55)';

  return (
    <>
      <rect
        x="130"
        y="58"
        width="160"
        height="112"
        rx="6"
        stroke="rgba(0,255,135,0.45)"
        strokeWidth="2"
        fill="rgba(0,255,135,0.07)"
      />
      {Array.from({ length: 3 }).flatMap((_, row) =>
        Array.from({ length: 5 }).map((__, col) => (
          <rect
            key={`bf-${variant}-${row}-${col}`}
            x={142 + col * 26}
            y={70 + row * 22}
            width="14"
            height="12"
            rx="2"
            fill={winFill}
            stroke={winStroke}
          />
        ))
      )}
      <rect x="188" y="152" width="44" height="14" rx="2" fill={doorFill} stroke={doorStroke} />
    </>
  );
}

function CarProblem({ x, y, rotation, accent }) {
  const stroke = accent === 'yellow' ? 'rgba(255,225,53,0.75)' : 'rgba(255,61,61,0.8)';
  const fillQ = accent === 'yellow' ? '#FFE135' : '#FF3D3D';
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      <rect x="-26" y="-11" width="52" height="22" rx="8" fill="#222222" stroke={stroke} strokeWidth="1.5" />
      <circle cx="-16" cy="11" r="4" fill="#2e2e2e" stroke="#666" strokeWidth="0.6" />
      <circle cx="16" cy="11" r="4" fill="#2e2e2e" stroke="#666" strokeWidth="0.6" />
      <text x="0" y="5" textAnchor="middle" fill={fillQ} fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="800">
        ?
      </text>
    </g>
  );
}

/** Same dash language as problem arrows */
function RouteToDoor({ d, color = '#00FF87' }) {
  return (
    <path
      d={d}
      stroke={color}
      strokeWidth="2"
      strokeDasharray="6 5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.92"
    />
  );
}

export function ProblemVisual({ className = '' }) {
  return (
    <div className={`${ILLUSTRATION_WRAP} ${className}`} role="img" aria-label="Drivers arrive confused—many paths, no clear entrance">
      <svg
        viewBox="0 0 420 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className={`${ILLUSTRATION_SVG} border-white/[0.1]`}
      >
        <title>Problem — where to go</title>
        <path
          d="M 52 172 Q 95 125 145 145"
          stroke="#FF3D3D"
          strokeWidth="2"
          strokeDasharray="6 5"
          opacity="0.9"
          fill="none"
        />
        <path
          d="M 82 192 Q 135 155 175 158"
          stroke="#FFE135"
          strokeWidth="2"
          strokeDasharray="5 5"
          opacity="0.8"
          fill="none"
        />
        <path
          d="M 372 178 Q 305 128 255 148"
          stroke="#FF3D3D"
          strokeWidth="2"
          strokeDasharray="6 5"
          opacity="0.85"
          fill="none"
        />
        <path
          d="M 318 198 Q 265 168 228 162"
          stroke="#FFE135"
          strokeWidth="2"
          strokeDasharray="4 6"
          opacity="0.75"
          fill="none"
        />

        <rect x="138" y="12" width="144" height="36" rx="6" fill="rgba(255,61,61,0.22)" stroke="rgba(255,61,61,0.55)" />
        <text
          x="210"
          y="36"
          textAnchor="middle"
          fill="#F5F5F5"
          fontFamily="ui-monospace, monospace"
          fontSize="18"
          fontWeight="800"
          letterSpacing="0.16em"
        >
          WHERE?
        </text>

        <BuildingFacade variant="problem" />
        {[
          [0, 2],
          [0, 4],
          [1, 0],
          [2, 3],
        ].map(([row, col]) => (
          <text
            key={`win-q-${row}-${col}`}
            x={142 + col * 26 + 7}
            y={70 + row * 22 + 10}
            textAnchor="middle"
            fill="#FFE135"
            fontFamily="system-ui, sans-serif"
            fontSize="11"
            fontWeight="800"
            opacity="0.95"
          >
            ?
          </text>
        ))}

        <CarProblem x={40} y={176} rotation={-14} accent="rose" />
        <CarProblem x={78} y={192} rotation={16} accent="yellow" />
        <CarProblem x={332} y={182} rotation={-22} accent="rose" />
        <CarProblem x={290} y={200} rotation={10} accent="yellow" />
      </svg>
    </div>
  );
}

function SolutionMapSvg() {
  /* Top-right unit window: row 0, col 4 */
  const checkCx = 142 + 4 * 26 + 7;
  const checkCy = 70 + 7;
  /* Door center x = 210; path matches problem dashed style */
  const routeD = `M 72 198 L 210 198 L 210 152 L ${checkCx} ${checkCy}`;

  return (
    <svg
      viewBox="0 0 420 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={`${ILLUSTRATION_SVG} border-fff-green/30`}
    >
      <title>Clear path — same building & vehicle style as problem</title>

      <rect x="138" y="12" width="144" height="36" rx="6" fill="rgba(0,255,135,0.12)" stroke="rgba(0,255,135,0.45)" />
      <text
        x="210"
        y="36"
        textAnchor="middle"
        fill="#00FF87"
        fontFamily="ui-monospace, monospace"
        fontSize="18"
        fontWeight="800"
        letterSpacing="0.14em"
      >
        CLEAR PATH
      </text>

      <BuildingFacade variant="solution" />

      {/* Dashed route matches problem arrow style; on top of facade so path to window reads */}
      <RouteToDoor d={routeD} />

      <path
        d={`M ${checkCx - 5} ${checkCy} L ${checkCx - 1} ${checkCy + 4} L ${checkCx + 6} ${checkCy - 4}`}
        stroke="#00FF87"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Same pill car as problem — green outline, no ? */}
      <g transform="translate(40, 198) rotate(-8)">
        <rect x="-26" y="-11" width="52" height="22" rx="8" fill="#222222" stroke="#00FF87" strokeWidth="1.5" />
        <circle cx="-16" cy="11" r="4" fill="#2e2e2e" stroke="#666" strokeWidth="0.6" />
        <circle cx="16" cy="11" r="4" fill="#2e2e2e" stroke="#666" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

export function SolutionVisual({ className = '' }) {
  return (
    <div className={`${ILLUSTRATION_WRAP} ${className}`} role="img" aria-label="Delivery route into the building; checkmark on the destination window">
      <SolutionMapSvg />
    </div>
  );
}
