/**
 * Problem / Solution art — shared building + vehicle geometry; animated SVG loops (video-like, no raster).
 */

/* Frame fills a fixed 420:220 box so Problem & Solution match pixel-perfect */
const ILLUSTRATION_SVG =
  'block h-full w-full rounded-xl border bg-[#1a1a1a] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]';
/** min-w-0 avoids flex/grid children clipping the SVG on narrow viewports */
const ILLUSTRATION_WRAP = 'w-full min-w-0 max-w-[420px] shrink-0 aspect-[420/220]';

/** Footprint: 160×112 @ (130,58). Door: ~1.25× stick-figure height (~27), narrow like a real entry. */
const DOOR = { x: 203, y: 134, w: 14, h: 34, rx: 2 };

/** Wrong-unit window for problem scene (row 1, col 2) — “X” overlay */
const BAD_WIN = { row: 1, col: 2 };
function badWindowTextXY() {
  const { row, col } = BAD_WIN;
  return { x: 142 + col * 26 + 7, y: 70 + row * 22 + 10 };
}

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
      <rect
        x={DOOR.x}
        y={DOOR.y}
        width={DOOR.w}
        height={DOOR.h}
        rx={DOOR.rx}
        fill={doorFill}
        stroke={doorStroke}
      />
    </>
  );
}

function CarProblem({ x, y, rotation, accent, animClass }) {
  const stroke = accent === 'yellow' ? 'rgba(255,225,53,0.75)' : 'rgba(255,61,61,0.8)';
  const fillQ = accent === 'yellow' ? '#FFE135' : '#FF3D3D';
  const tf =
    animClass == null ? `translate(${x},${y}) rotate(${rotation})` : undefined;
  return (
    <g className={animClass || undefined} transform={tf}>
      <rect x="-26" y="-11" width="52" height="22" rx="8" fill="#222222" stroke={stroke} strokeWidth="1.5" />
      <circle cx="-16" cy="11" r="4" fill="#2e2e2e" stroke="#666" strokeWidth="0.6" />
      <circle cx="16" cy="11" r="4" fill="#2e2e2e" stroke="#666" strokeWidth="0.6" />
      <text x="0" y="5" textAnchor="middle" fill={fillQ} fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="800">
        ?
      </text>
    </g>
  );
}

/** Deliverer — no scratch arm (used on solution path) */
function SolutionWalker({ animClass }) {
  const c = '#E8E8E8';
  return (
    <g className={animClass || undefined}>
      <circle cx="0" cy="-9" r="3.2" fill={c} />
      <line x1="0" y1="-6" x2="0" y2="7" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="0" y1="-2" x2="-7" y2="4" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="0" y1="-2" x2="7" y2="4" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="0" y1="7" x2="-5" y2="18" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="0" y1="7" x2="5" y2="18" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

/** Simple stick figure: optional scratch pose (arm toward head) */
function StickFigure({ x, y, hue, animClass }) {
  const c = hue;
  const tf = animClass == null ? `translate(${x},${y})` : undefined;
  return (
    <g className={animClass || undefined} transform={tf}>
      <circle cx="0" cy="-9" r="3.2" fill={c} opacity="0.95" />
      <line x1="0" y1="-6" x2="0" y2="7" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="0" y1="-2" x2="-7" y2="4" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="0" y1="-2" x2="7" y2="4" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="0" y1="7" x2="-5" y2="18" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="0" y1="7" x2="5" y2="18" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      {/* confused scratch */}
      <line x1="4" y1="-4" x2="1" y2="-12" stroke={c} strokeWidth="1.2" strokeLinecap="round" className="ff-p-scratch" />
    </g>
  );
}

/** Same dash language as problem arrows */
function RouteToDoor({ d, color = '#00FF87', className = '' }) {
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
      className={className}
    />
  );
}

const problemStyle = (
  <style>{`
    .ff-p-path { animation: ff-p-dash 2.2s linear infinite; }
    @keyframes ff-p-dash {
      to { stroke-dashoffset: -28; }
    }
    /* 16s: staggered pull-ups → people out & walk → wrong window X */
    .ff-p-car-a { animation: ff-p-car-a 16s linear infinite; }
    .ff-p-car-b { animation: ff-p-car-b 16s linear infinite; }
    .ff-p-car-c { animation: ff-p-car-c 16s linear infinite; }
    .ff-p-car-d { animation: ff-p-car-d 16s linear infinite; }
    @keyframes ff-p-car-a {
      0%, 2% { opacity: 0; transform: translate(-48px, 204px) rotate(-6deg); }
      4% { opacity: 1; }
      20% { transform: translate(58px, 194px) rotate(-11deg); }
      26%, 100% { opacity: 1; transform: translate(58px, 194px) rotate(-11deg); }
    }
    @keyframes ff-p-car-b {
      0%, 10% { opacity: 0; transform: translate(430px, 200px) rotate(5deg); }
      12% { opacity: 1; }
      28% { transform: translate(318px, 192px) rotate(14deg); }
      34%, 100% { opacity: 1; transform: translate(318px, 192px) rotate(14deg); }
    }
    @keyframes ff-p-car-c {
      0%, 6% { opacity: 0; transform: translate(198px, 232px) rotate(2deg); }
      8% { opacity: 1; }
      24% { transform: translate(202px, 206px) rotate(7deg); }
      30%, 100% { opacity: 1; transform: translate(202px, 206px) rotate(7deg); }
    }
    @keyframes ff-p-car-d {
      0%, 14% { opacity: 0; transform: translate(120px, 228px) rotate(-3deg); }
      16% { opacity: 1; }
      32% { transform: translate(124px, 198px) rotate(-9deg); }
      38%, 100% { opacity: 1; transform: translate(124px, 198px) rotate(-9deg); }
    }
    .ff-p-stick-1 { animation: ff-p-walk-1 16s linear infinite; }
    .ff-p-stick-2 { animation: ff-p-walk-2 16s linear infinite; }
    .ff-p-stick-3 { animation: ff-p-walk-3 16s linear infinite; }
    /* One person: out of car → sidewalk → door → up into doorway → gone */
    @keyframes ff-p-walk-1 {
      0%, 22% { opacity: 0; transform: translate(62px, 198px); }
      24% { opacity: 1; transform: translate(62px, 198px); }
      34% { opacity: 1; transform: translate(118px, 198px); }
      42% { opacity: 1; transform: translate(168px, 198px); }
      48% { opacity: 1; transform: translate(205px, 198px); }
      50% { opacity: 1; transform: translate(210px, 198px); }
      52% { opacity: 1; transform: translate(210px, 190px); }
      54% { opacity: 1; transform: translate(210px, 178px); }
      56% { opacity: 1; transform: translate(210px, 168px); }
      58% { opacity: 0; transform: translate(210px, 158px); }
      100% { opacity: 0; transform: translate(210px, 158px); }
    }
    /* Wanderers: to building front, then mill about (never enter) */
    @keyframes ff-p-walk-2 {
      0%, 28% { opacity: 0; transform: translate(308px, 198px); }
      30% { opacity: 1; transform: translate(304px, 198px); }
      38% { opacity: 1; transform: translate(248px, 198px); }
      44% { opacity: 1; transform: translate(200px, 188px); }
      50% { opacity: 1; transform: translate(175px, 178px); }
      56% { opacity: 1; transform: translate(218px, 176px); }
      63% { opacity: 1; transform: translate(188px, 174px); }
      70% { opacity: 1; transform: translate(228px, 178px); }
      78% { opacity: 1; transform: translate(165px, 176px); }
      86% { opacity: 1; transform: translate(205px, 180px); }
      94% { opacity: 1; transform: translate(192px, 177px); }
      100% { opacity: 1; transform: translate(210px, 176px); }
    }
    @keyframes ff-p-walk-3 {
      0%, 30% { opacity: 0; transform: translate(118px, 198px); }
      32% { opacity: 1; transform: translate(122px, 198px); }
      40% { opacity: 1; transform: translate(158px, 198px); }
      46% { opacity: 1; transform: translate(185px, 186px); }
      52% { opacity: 1; transform: translate(210px, 178px); }
      58% { opacity: 1; transform: translate(232px, 176px); }
      65% { opacity: 1; transform: translate(170px, 178px); }
      72% { opacity: 1; transform: translate(200px, 174px); }
      80% { opacity: 1; transform: translate(148px, 180px); }
      88% { opacity: 1; transform: translate(218px, 176px); }
      96% { opacity: 1; transform: translate(178px, 178px); }
      100% { opacity: 1; transform: translate(195px, 176px); }
    }
    .ff-p-bad-x { animation: ff-p-bad-x 16s linear infinite; }
    @keyframes ff-p-bad-x {
      0%, 58% { opacity: 0; }
      61% { opacity: 1; }
      100% { opacity: 1; }
    }
    .ff-p-scratch { animation: ff-p-scratch 0.9s ease-in-out infinite; transform-origin: 4px -4px; }
    @keyframes ff-p-scratch {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-18deg); }
    }
    @media (prefers-reduced-motion: reduce) {
      .ff-p-path,
      .ff-p-car-a, .ff-p-car-b, .ff-p-car-c, .ff-p-car-d,
      .ff-p-stick-1, .ff-p-stick-2, .ff-p-stick-3,
      .ff-p-bad-x,
      .ff-p-scratch {
        animation: none !important;
      }
      .ff-p-car-a { transform: translate(58px, 194px) rotate(-11deg); opacity: 1; }
      .ff-p-car-b { transform: translate(318px, 192px) rotate(14deg); opacity: 1; }
      .ff-p-car-c { transform: translate(202px, 206px) rotate(7deg); opacity: 1; }
      .ff-p-car-d { transform: translate(124px, 198px) rotate(-9deg); opacity: 1; }
      .ff-p-stick-1 { opacity: 0; }
      .ff-p-stick-2 { opacity: 1; transform: translate(195px, 178px); }
      .ff-p-stick-3 { opacity: 1; transform: translate(195px, 176px); }
      .ff-p-bad-x { opacity: 1; }
    }
  `}</style>
);

export function ProblemVisual({ className = '' }) {
  const badWin = badWindowTextXY();
  return (
    <div className={`${ILLUSTRATION_WRAP} ${className}`} role="img" aria-label="Cars park; one person enters the wrong unit; others linger outside confused">
      <svg
        viewBox="0 0 420 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className={`${ILLUSTRATION_SVG} border-white/[0.1]`}
      >
        <title>Problem — where to go</title>
        {problemStyle}
        <path
          d="M 52 172 Q 95 125 145 145"
          stroke="#FF3D3D"
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeDashoffset="0"
          opacity="0.9"
          fill="none"
          className="ff-p-path"
        />
        <path
          d="M 82 192 Q 135 155 175 158"
          stroke="#FFE135"
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeDashoffset="0"
          opacity="0.8"
          fill="none"
          className="ff-p-path"
        />
        <path
          d="M 372 178 Q 305 128 255 148"
          stroke="#FF3D3D"
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeDashoffset="0"
          opacity="0.85"
          fill="none"
          className="ff-p-path"
        />
        <path
          d="M 318 198 Q 265 168 228 162"
          stroke="#FFE135"
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeDashoffset="0"
          opacity="0.75"
          fill="none"
          className="ff-p-path"
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

        <CarProblem x={0} y={0} rotation={0} accent="rose" animClass="ff-p-car-a" />
        <CarProblem x={0} y={0} rotation={0} accent="yellow" animClass="ff-p-car-b" />
        <CarProblem x={0} y={0} rotation={0} accent="rose" animClass="ff-p-car-c" />
        <CarProblem x={0} y={0} rotation={0} accent="yellow" animClass="ff-p-car-d" />

        <StickFigure x={0} y={0} hue="#E8E8E8" animClass="ff-p-stick-1" />
        <StickFigure x={0} y={0} hue="#D0D0D0" animClass="ff-p-stick-2" />
        <StickFigure x={0} y={0} hue="#BDBDBD" animClass="ff-p-stick-3" />

        <text
          x={badWin.x}
          y={badWin.y}
          textAnchor="middle"
          className="ff-p-bad-x"
          fill="#0A0A0A"
          fontFamily="system-ui, sans-serif"
          fontSize="13"
          fontWeight="900"
        >
          X
        </text>
      </svg>
    </div>
  );
}

const solutionStyle = (
  <style>{`
    /* 16s story loop: park → walk to door → fade inside → ~1s pause → window + check highlight */
    .ff-s-route { animation: ff-s-dash 2.5s linear infinite; }
    @keyframes ff-s-dash {
      to { stroke-dashoffset: -24; }
    }
    .ff-s-car {
      animation: ff-s-car-park 16s ease-in-out infinite;
    }
    @keyframes ff-s-car-park {
      0% { transform: translate(36px, 202px) rotate(-7deg); }
      14% { transform: translate(88px, 200px) rotate(-3deg); }
      100% { transform: translate(88px, 200px) rotate(-3deg); }
    }
    /* Walker snaps to dashed path: car → (88,198) → (210,198) → (210,152); linear feels like following the line */
    .ff-s-person {
      animation: ff-s-person 16s linear infinite;
    }
    @keyframes ff-s-person {
      0%, 14% { opacity: 0; transform: translate(88px, 200px); }
      15% { opacity: 1; transform: translate(88px, 200px); }
      16% { opacity: 1; transform: translate(88px, 198px); }
      20% { opacity: 1; transform: translate(118px, 198px); }
      24% { opacity: 1; transform: translate(148px, 198px); }
      28% { opacity: 1; transform: translate(178px, 198px); }
      32% { opacity: 1; transform: translate(210px, 198px); }
      36% { opacity: 1; transform: translate(210px, 182px); }
      40% { opacity: 1; transform: translate(210px, 166px); }
      44% { opacity: 1; transform: translate(210px, 152px); }
      48% { opacity: 0; transform: translate(210px, 152px); }
      100% { opacity: 0; transform: translate(210px, 152px); }
    }
    /* ~1s after person fades (48%) → arrival ~54%: window + check fade in, soft beams ramp ~2s then hold (no bounce) */
    .ff-s-dest-frame {
      animation: ff-s-dest-frame 16s ease-out infinite;
    }
    @keyframes ff-s-dest-frame {
      0%, 53% { opacity: 0; }
      54% { opacity: 0; }
      55.5% { opacity: 1; }
      56%, 100% { opacity: 1; }
    }
    /* ~1s soft bright wash (no line rays) — then off; window frame + check stay */
    .ff-s-beam-glow {
      animation: ff-s-beam-glow 16s ease-out infinite;
    }
    @keyframes ff-s-beam-glow {
      0%, 53% { opacity: 0; }
      54% { opacity: 0; }
      54.5% { opacity: 0.35; }
      56% { opacity: 0.95; }
      57.5% { opacity: 0.88; }
      59% { opacity: 0.4; }
      60%, 100% { opacity: 0; }
    }
    .ff-s-check {
      animation: ff-s-check 16s ease-out infinite;
    }
    @keyframes ff-s-check {
      0%, 53% { opacity: 0; }
      54% { opacity: 0; }
      55% { opacity: 0; }
      56% { opacity: 1; }
      57%, 100% { opacity: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
      .ff-s-route {
        animation: none !important;
      }
      .ff-s-car {
        animation: none !important;
        transform: translate(88px, 200px) rotate(-3deg);
      }
      .ff-s-person {
        animation: none !important;
        opacity: 0;
      }
      .ff-s-dest-frame {
        animation: none !important;
        opacity: 1;
      }
      .ff-s-beam-glow {
        animation: none !important;
        opacity: 0;
      }
      .ff-s-check {
        animation: none !important;
        opacity: 1;
      }
    }
  `}</style>
);

function SolutionMapSvg() {
  const checkCx = 142 + 4 * 26 + 7;
  const checkCy = 70 + 7;
  /* Path: pull in to park → door (person walks ground) → up to destination window */
  const routeD = `M 36 202 L 88 200 L 88 198 L 210 198 L 210 152 L ${checkCx} ${checkCy}`;

  const destWinX = 142 + 4 * 26;
  const destWinY = 70;
  const winMidX = destWinX + 7;
  const winMidY = destWinY + 6;

  return (
    <svg
      viewBox="0 0 420 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={`${ILLUSTRATION_SVG} border-fff-green/30`}
    >
      <title>Clear path — park, walk in, arrival at the window</title>
      {solutionStyle}

      <defs>
        <radialGradient id="ff-s-arrival-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00FF87" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#00FF87" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00FF87" stopOpacity="0" />
        </radialGradient>
      </defs>

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

      <RouteToDoor d={routeD} className="ff-s-route" />

      <g className="ff-s-car">
        <rect x="-26" y="-11" width="52" height="22" rx="8" fill="#222222" stroke="#00FF87" strokeWidth="1.5" />
        <circle cx="-16" cy="11" r="4" fill="#2e2e2e" stroke="#666" strokeWidth="0.6" />
        <circle cx="16" cy="11" r="4" fill="#2e2e2e" stroke="#666" strokeWidth="0.6" />
      </g>

      <SolutionWalker animClass="ff-s-person" />

      <ellipse
        cx={winMidX}
        cy={winMidY}
        rx="44"
        ry="36"
        fill="url(#ff-s-arrival-glow)"
        className="ff-s-beam-glow"
      />

      <rect
        x={destWinX - 2}
        y={destWinY - 2}
        width="18"
        height="16"
        rx="3"
        fill="rgba(0,255,135,0.14)"
        stroke="#00FF87"
        strokeWidth="2"
        className="ff-s-dest-frame"
      />

      <path
        d={`M ${checkCx - 5} ${checkCy} L ${checkCx - 1} ${checkCy + 4} L ${checkCx + 6} ${checkCy - 4}`}
        stroke="#00FF87"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="ff-s-check"
      />
    </svg>
  );
}

export function SolutionVisual({ className = '' }) {
  return (
    <div
      className={`${ILLUSTRATION_WRAP} ${className}`}
      role="img"
      aria-label="Delivery vehicle parks; courier walks in; destination window confirms arrival"
    >
      <SolutionMapSvg />
    </div>
  );
}
