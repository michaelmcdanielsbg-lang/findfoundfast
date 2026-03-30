"use client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --g: #00FF87; --dark: #0A0A0A; --card: #111; --gray: #141414;
          --muted: #555; --white: #F5F5F5; --red: #FF3D3D; --yellow: #FFE135;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--dark); color: var(--white); font-family: 'DM Sans', sans-serif; overflow-x: hidden; font-size: 15px; }
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 14px 32px; background: rgba(10,10,10,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0,255,135,0.08); }
        .logo { font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: 18px; color: var(--g); letter-spacing: -0.5px; }
        .logo span { color: var(--white); }
        .nav-btn { background: var(--g); color: var(--dark); font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; padding: 9px 18px; border-radius: 6px; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: all .2s; text-decoration: none; }
        .nav-btn:hover { background: var(--yellow); transform: translateY(-1px); }
        .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 120px 24px 80px; position: relative; overflow: hidden; }
        .hgrid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,255,135,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.04) 1px, transparent 1px); background-size: 40px 40px; }
        .hglow { position: absolute; top: 5%; left: 50%; transform: translateX(-50%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(0,255,135,0.07) 0%, transparent 65%); pointer-events: none; }
        .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(0,255,135,0.1); border: 1px solid rgba(0,255,135,0.25); color: var(--g); font-family: 'Space Mono', monospace; font-size: 10px; padding: 5px 14px; border-radius: 100px; margin-bottom: 24px; letter-spacing: 1.5px; text-transform: uppercase; position: relative; z-index: 1; }
        .bdot { width: 6px; height: 6px; background: var(--g); border-radius: 50%; animation: bpulse 2s infinite; }
        @keyframes bpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.6)} }
        h1 { font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: clamp(40px,6vw,72px); line-height: 1; letter-spacing: -2px; position: relative; z-index: 1; margin-bottom: 4px; }
        h1 .g { color: var(--g); }
        .tagline { font-family: 'Space Mono', monospace; font-size: clamp(12px,1.6vw,15px); color: var(--yellow); background: rgba(255,225,53,0.07); padding: 9px 20px; border-radius: 8px; border: 1px solid rgba(255,225,53,0.18); display: inline-block; margin: 16px 0; position: relative; z-index: 1; }
        .hero-sub { font-size: clamp(14px,1.4vw,16px); color: rgba(245,245,245,0.55); max-width: 480px; line-height: 1.7; margin: 0 auto; position: relative; z-index: 1; }
        .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 32px; position: relative; z-index: 1; }
        .btn-p { background: var(--g); color: var(--dark); font-family: 'Space Mono', monospace; font-weight: 700; font-size: 12px; padding: 13px 28px; border-radius: 8px; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: all .2s; text-decoration: none; display: inline-block; }
        .btn-p:hover { background: var(--yellow); transform: translateY(-2px); box-shadow: 0 10px 36px rgba(0,255,135,.25); }
        .btn-o { background: transparent; color: var(--white); font-family: 'Space Mono', monospace; font-weight: 700; font-size: 12px; padding: 13px 28px; border-radius: 8px; border: 1px solid rgba(245,245,245,0.18); cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: all .2s; text-decoration: none; display: inline-block; }
        .btn-o:hover { border-color: var(--g); color: var(--g); transform: translateY(-2px); }
        .ticker-wrap { overflow: hidden; background: rgba(0,255,135,0.05); border-top: 1px solid rgba(0,255,135,0.08); border-bottom: 1px solid rgba(0,255,135,0.08); padding: 12px 0; }
        .ticker { display: flex; animation: tick 24s linear infinite; white-space: nowrap; }
        .ti { font-family: 'Space Mono', monospace; font-size: 11px; color: rgba(0,255,135,.45); padding: 0 36px; text-transform: uppercase; letter-spacing: 2px; }
        @keyframes tick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .stats { background: var(--g); padding: 20px 32px; display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }
        .stat .n { font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: 28px; color: var(--dark); line-height: 1; }
        .stat .l { font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(10,10,10,.55); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
        .flow-wrap { background: var(--dark); padding: 80px 24px; }
        .flow-inner { max-width: 1060px; margin: 0 auto; }
        .sec-label { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--g); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 12px; }
        .sec-h2 { font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: clamp(26px,3.5vw,44px); line-height: 1.05; letter-spacing: -1.5px; margin-bottom: 0; }
        .flow-diagram { margin-top: 48px; display: grid; grid-template-columns: 1fr 40px 1fr 40px 1fr; gap: 0; align-items: start; }
        .flow-col { display: flex; flex-direction: column; gap: 0; }
        .flow-role { font-family: 'Space Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; padding: 6px 14px; border-radius: 100px; margin-bottom: 14px; display: inline-block; align-self: flex-start; }
        .role-mgr { background: rgba(0,255,135,0.1); color: var(--g); border: 1px solid rgba(0,255,135,.2); }
        .role-res { background: rgba(255,225,53,0.1); color: var(--yellow); border: 1px solid rgba(255,225,53,.2); }
        .role-drv { background: rgba(255,61,61,0.1); color: var(--red); border: 1px solid rgba(255,61,61,.2); }
        .flow-card { background: var(--card); border: 1px solid rgba(245,245,245,0.07); border-radius: 12px; padding: 18px; margin-bottom: 10px; }
        .flow-card h4 { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 15px; margin-bottom: 5px; }
        .flow-card p { font-size: 13px; color: rgba(245,245,245,.45); line-height: 1.6; }
        .flow-card .tag { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--g); background: rgba(0,255,135,.08); padding: 3px 8px; border-radius: 4px; margin-bottom: 6px; display: inline-block; }
        .arrow-col { display: flex; align-items: center; justify-content: center; padding-top: 52px; opacity: .35; }
        .token-wrap { background: #0D0D0D; padding: 80px 24px; border-top: 1px solid rgba(245,245,245,0.05); }
        .token-inner { max-width: 860px; margin: 0 auto; text-align: center; }
        .token-inner h2 { font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: clamp(26px,3.5vw,44px); letter-spacing: -1.5px; margin-bottom: 10px; line-height: 1.05; }
        .token-inner .sub { font-size: 15px; color: rgba(245,245,245,.45); margin-bottom: 40px; line-height: 1.65; }
        .token-flow { display: flex; align-items: stretch; gap: 0; }
        .token-step { flex: 1; background: var(--card); border: 1px solid rgba(245,245,245,.07); padding: 20px 16px; }
        .token-step:first-child { border-radius: 12px 0 0 12px; }
        .token-step:last-child { border-radius: 0 12px 12px 0; }
        .ts-num { font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: 32px; color: rgba(0,255,135,.12); line-height: 1; margin-bottom: 6px; }
        .ts-icon { font-size: 20px; margin-bottom: 6px; display: block; }
        .token-step h4 { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 14px; margin-bottom: 5px; }
        .token-step p { font-size: 12px; color: rgba(245,245,245,.4); line-height: 1.6; }
        .ts-arr { display: flex; align-items: center; justify-content: center; font-size: 16px; color: rgba(0,255,135,.4); padding: 0 4px; }
        .timer-demo { background: var(--gray); border: 1px solid rgba(0,255,135,.15); border-radius: 14px; padding: 28px; max-width: 440px; margin: 40px auto 0; text-align: left; }
        .td-label { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--g); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 14px; }
        .timer-btns { display: flex; gap: 8px; margin-bottom: 16px; }
        .t-btn { flex: 1; padding: 10px; border-radius: 8px; border: 1px solid rgba(245,245,245,.12); background: transparent; color: rgba(245,245,245,.5); font-family: 'Space Mono', monospace; font-size: 11px; cursor: pointer; transition: all .2s; font-weight: 700; }
        .t-btn.active, .t-btn:hover { background: rgba(0,255,135,.1); border-color: var(--g); color: var(--g); }
        .copy-row { display: flex; gap: 8px; align-items: center; }
        .fake-link { flex: 1; background: #0A0A0A; border: 1px solid rgba(245,245,245,.08); border-radius: 8px; padding: 9px 12px; font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(0,255,135,.7); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
        .copy-btn { background: var(--g); color: var(--dark); font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; padding: 9px 14px; border-radius: 8px; border: none; cursor: pointer; white-space: nowrap; transition: all .2s; }
        .copy-btn:hover { background: var(--yellow); }
        .expire-note { font-size: 11px; color: rgba(245,245,245,.3); margin-top: 10px; font-family: 'Space Mono', monospace; }
        .expire-note span { color: var(--yellow); }
        .who-wrap { background: var(--dark); padding: 80px 24px; }
        .who-inner { max-width: 1060px; margin: 0 auto; }
        .who-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 40px; }
        .who-card { background: var(--card); border: 1px solid rgba(245,245,245,.07); border-radius: 12px; padding: 24px 20px; transition: all .3s; }
        .who-card:hover { border-color: var(--g); transform: translateY(-3px); }
        .wi { font-size: 30px; margin-bottom: 12px; display: block; }
        .who-card h3 { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 16px; margin-bottom: 5px; }
        .who-card p { font-size: 12px; color: rgba(245,245,245,.4); line-height: 1.55; }
        .pitch-wrap { background: #0D0D0D; padding: 80px 24px; border-top: 1px solid rgba(245,245,245,.05); }
        .pitch-inner { max-width: 1060px; margin: 0 auto; }
        .pitch-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 48px; align-items: start; }
        .plist { display: flex; flex-direction: column; gap: 20px; }
        .pi { display: flex; gap: 12px; align-items: flex-start; }
        .pcheck { width: 20px; height: 20px; background: var(--g); border-radius: 5px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 3px; font-size: 11px; font-weight: 700; color: var(--dark); }
        .pi h4 { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 15px; margin-bottom: 3px; }
        .pi p { font-size: 13px; color: rgba(245,245,245,.45); line-height: 1.6; }
        .price-card { background: var(--card); border: 2px solid rgba(0,255,135,.25); border-radius: 18px; padding: 32px; text-align: center; position: sticky; top: 80px; }
        .pc-eye { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--g); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
        .pc-price { font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: 56px; color: var(--white); line-height: 1; letter-spacing: -2px; }
        .pc-per { font-size: 12px; color: rgba(245,245,245,.35); margin: 5px 0 20px; font-family: 'Space Mono', monospace; }
        .pc-feat { text-align: left; display: flex; flex-direction: column; gap: 9px; margin-bottom: 24px; }
        .pf { display: flex; gap: 8px; font-size: 13px; align-items: center; }
        .pf::before { content: '✓'; color: var(--g); font-weight: 700; }
        .pc-note { font-size: 11px; color: rgba(245,245,245,.25); margin-top: 10px; font-family: 'Space Mono', monospace; }
        .fcta { background: linear-gradient(135deg, var(--g) 0%, #00C86A 100%); padding: 80px 24px; text-align: center; }
        .fcta h2 { font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: clamp(30px,4.5vw,56px); letter-spacing: -2px; line-height: 1; color: var(--dark); margin-bottom: 14px; }
        .fcta p { font-size: 16px; color: rgba(10,10,10,.6); margin-bottom: 32px; }
        footer { background: var(--dark); padding: 24px; text-align: center; border-top: 1px solid rgba(245,245,245,.05); }
        footer p { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--muted); }
        footer span { color: var(--g); }
        @media(max-width:700px) { .pitch-grid { grid-template-columns: 1fr; } .flow-diagram { grid-template-columns: 1fr; } .arrow-col { display: none; } }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>

      <nav>
        <div className="logo">Find<span>Found</span>Fast</div>
        <a href="#pitch" className="nav-btn">Get Early Access →</a>
      </nav>

      <section className="hero">
        <div className="hgrid"></div>
        <div className="hglow"></div>
        <div className="badge"><span className="bdot"></span>FFFliping Cool · No App Required</div>
        <h1><span className="g">Find.</span><br/><span>Found.</span><br/><span className="g">Fast.</span></h1>
        <div className="tagline">Google Maps for your food & your homies 🗺️</div>
        <p className="hero-sub">One link per building. Expires automatically. Gate codes that vanish. Your driver stops guessing and starts arriving.</p>
        <div className="hero-btns">
          <a href="https://findfoundfast.vercel.app" className="btn-p">Try It Free →</a>
          <Link href="/how-it-works" className="btn-o">See How It Works</Link>
        </div>
      </section>

      <div className="ticker-wrap"><div className="ticker">
        <span className="ti">• One Link Per Building</span><span className="ti">• Auto-Expiring Codes</span><span className="ti">• No App Needed</span><span className="ti">• Set It Once Forever</span><span className="ti">• Works Any Phone</span><span className="ti">• FFFliping Cool</span><span className="ti">• Gate Codes That Vanish</span><span className="ti">• One Link Per Building</span><span className="ti">• Auto-Expiring Codes</span><span className="ti">• No App Needed</span><span className="ti">• Set It Once Forever</span><span className="ti">• Works Any Phone</span><span className="ti">• FFFliping Cool</span><span className="ti">• Gate Codes That Vanish</span>
      </div></div>

      <div className="stats">
        <div className="stat"><div className="n">1</div><div className="l">Link Per Building</div></div>
        <div className="stat"><div className="n">0</div><div className="l">Apps to Download</div></div>
        <div className="stat"><div className="n">∞</div><div className="l">Drivers Found</div></div>
        <div className="stat"><div className="n">60s</div><div className="l">Max Setup Time</div></div>
      </div>

      <div className="flow-wrap" id="how">
        <div className="flow-inner">
          <div className="sec-label">How It Works ⚡</div>
          <h2 className="sec-h2">Three people.<br/>One smooth handoff.</h2>
          <div className="flow-diagram">
            <div className="flow-col">
              <span className="flow-role role-mgr">Manager</span>
              <div className="flow-card"><div className="tag">Once</div><h4>Set up each building</h4><p>Upload parking, entrance, lobby and elevator photos. Add gate and door codes. Get a permanent link per building or tower.</p></div>
              <div className="flow-card"><div className="tag">Example</div><h4>4 buildings = 4 links</h4><p>Building A, B, C, D each get their own permanent URL. No per-resident setup. Ever.</p></div>
            </div>
            <div className="arrow-col">
              <svg width="24" height="40" viewBox="0 0 24 40"><path d="M12 0 L12 32 M4 24 L12 36 L20 24" stroke="#00FF87" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="flow-col">
              <span className="flow-role role-res">Resident</span>
              <div className="flow-card"><div className="tag">Log In</div><h4>See your building link</h4><p>Log in once. Your building link is right there. Pick your timer — 15, 30, or 60 minutes — then hit Copy.</p></div>
              <div className="flow-card"><div className="tag">Magic</div><h4>Paste anywhere</h4><p>Drop it in Uber Eats chat, DoorDash, a text message, anywhere. The link handles the rest.</p></div>
            </div>
            <div className="arrow-col">
              <svg width="24" height="40" viewBox="0 0 24 40"><path d="M12 0 L12 32 M4 24 L12 36 L20 24" stroke="#00FF87" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="flow-col">
              <span className="flow-role role-drv">Driver / Guest</span>
              <div className="flow-card"><div className="tag">No App</div><h4>Open link in browser</h4><p>Taps the link on any phone. No download, no login. Step-by-step photos walk them in from the street.</p></div>
              <div className="flow-card"><div className="tag">Secure</div><h4>Codes visible. Then gone.</h4><p>Gate and door codes show during the active window. When the timer expires, codes disappear. Link is dead. Done.</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="token-wrap">
        <div className="token-inner">
          <div className="sec-label" style={{textAlign:'center'}}>The Link System 🔐</div>
          <h2>One building.<br/>Infinite secure links.</h2>
          <p className="sub">Every time a resident copies their building link, a fresh time-limited token is generated. Codes vanish when time is up.</p>
          <div className="token-flow">
            <div className="token-step"><div className="ts-num">01</div><span className="ts-icon">🏢</span><h4>Permanent building URL</h4><p>findfoundfast.com/link/sunnyside-b — this never changes.</p></div>
            <div className="ts-arr">→</div>
            <div className="token-step"><div className="ts-num">02</div><span className="ts-icon">⏱️</span><h4>Resident hits Copy</h4><p>A unique token is generated. Live for 15, 30, or 60 minutes.</p></div>
            <div className="ts-arr">→</div>
            <div className="token-step"><div className="ts-num">03</div><span className="ts-icon">📦</span><h4>Driver opens it</h4><p>Photos and gate codes visible. No app, no login. Any phone.</p></div>
            <div className="ts-arr">→</div>
            <div className="token-step"><div className="ts-num">04</div><span className="ts-icon">💥</span><h4>Timer hits zero</h4><p>Token expires. Gate codes vanish. Link is dead.</p></div>
          </div>
          <div className="timer-demo">
            <div className="td-label">Try It — Pick Your Timer</div>
            <div className="timer-btns">
              <button className="t-btn active" onClick={(e)=>{document.querySelectorAll('.t-btn').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');document.getElementById('expire-label').textContent='15 minutes'}}>15 min</button>
              <button className="t-btn" onClick={(e)=>{document.querySelectorAll('.t-btn').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');document.getElementById('expire-label').textContent='30 minutes'}}>30 min</button>
              <button className="t-btn" onClick={(e)=>{document.querySelectorAll('.t-btn').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');document.getElementById('expire-label').textContent='60 minutes'}}>60 min</button>
            </div>
            <div className="copy-row">
              <div className="fake-link">findfoundfast.com/link/sunnyside-b?t=<span id="token-val">a3f9k</span></div>
              <button className="copy-btn" onClick={()=>{const tokens=['x7m2q','b5t8r','k1p4w','n9c3j','d6h0v'];const el=document.getElementById('token-val');const btn=document.querySelector('.copy-btn');btn.textContent='Copied! ✓';btn.style.background='#00C86A';setTimeout(()=>{el.textContent=tokens[Math.floor(Math.random()*tokens.length)];btn.textContent='Copy 📋';btn.style.background=''},1200)}}>Copy 📋</button>
            </div>
            <div className="expire-note">Expires in <span id="expire-label">15 minutes</span> · Link burns after timer</div>
          </div>
        </div>
      </div>

      <div className="who-wrap">
        <div className="who-inner">
          <div className="sec-label">Who Its For 🎯</div>
          <h2 className="sec-h2">Any address.<br/>Any visitor.</h2>
          <div className="who-grid">
            <div className="who-card"><span className="wi">🏢</span><h3>Apartment Complexes</h3><p>One link per building. Residents activate when needed. Property manager sets it up once.</p></div>
            <div className="who-card"><span className="wi">🏥</span><h3>Hospitals and Clinics</h3><p>Right entrance, right floor, every time. Reduce confused visitors and front-desk chaos.</p></div>
            <div className="who-card"><span className="wi">🏨</span><h3>Hotels and Resorts</h3><p>Check-in, parking, amenities. One link in the confirmation. Zero lost guests.</p></div>
            <div className="who-card"><span className="wi">🏠</span><h3>Homeowners</h3><p>Dinner party, Airbnb, dog walker. Send your building link and never give directions again.</p></div>
            <div className="who-card"><span className="wi">🏫</span><h3>Schools and Offices</h3><p>Visitor parking, loading docks, delivery rooms. Secure codes that expire automatically.</p></div>
          </div>
        </div>
      </div>

      <div className="pitch-wrap" id="pitch">
        <div className="pitch-inner">
          <div className="sec-label">For Property Owners 🏆</div>
          <h2 className="sec-h2">Your residents<br/>will love you.</h2>
          <div className="pitch-grid">
            <div className="plist">
              <div className="pi"><div className="pcheck">✓</div><div><h4>One link per building not per resident</h4><p>100-unit building? Still just one link to manage per tower. Massively simpler than per-unit systems.</p></div></div>
              <div className="pi"><div className="pcheck">✓</div><div><h4>Auto-expiring security tokens</h4><p>Every copy generates a fresh time-limited link. No stale screenshots. Codes vanish when time is up.</p></div></div>
              <div className="pi"><div className="pcheck">✓</div><div><h4>Photo-guided step by step</h4><p>Upload parking, entrance, lobby, elevator once. Every visitor gets the same perfect experience forever.</p></div></div>
              <div className="pi"><div className="pcheck">✓</div><div><h4>Works on any phone no app</h4><p>Driver opens a browser link. No App Store, no friction, no excuses for being lost.</p></div></div>
              <div className="pi"><div className="pcheck">✓</div><div><h4>QR codes for every entrance</h4><p>Print a QR code for each building. Walk-up visitors scan and get the full guided experience.</p></div></div>
            </div>
            <div className="price-card">
              <div className="pc-eye">Early Access Pricing</div>
              <div className="pc-price">$49</div>
              <div className="pc-per">per building / month</div>
              <div className="pc-feat">
                <div className="pf">Unlimited residents</div>
                <div className="pf">Unlimited link generations</div>
                <div className="pf">Unlimited photos per building</div>
                <div className="pf">Auto-expiring secure tokens</div>
                <div className="pf">QR code generator</div>
                <div className="pf">Analytics dashboard</div>
                <div className="pf">Priority support</div>
              </div>
              <a href="https://findfoundfast.vercel.app" className="btn-p" style={{width:'100%',textAlign:'center',display:'block',fontSize:'12px'}}>Get Early Access →</a>
              <div className="pc-note">No credit card · 30-day free trial</div>
            </div>
          </div>
        </div>
      </div>

      <div className="fcta">
        <h2>Stop giving<br/>crappy directions.</h2>
        <p>One link. Every photo. Codes that vanish. FFFliping done.</p>
        <a href="https://findfoundfast.vercel.app" className="btn-p" style={{fontSize:'14px',padding:'16px 40px',background:'#0A0A0A',color:'#00FF87'}}>Start Free Today →</a>
      </div>

      <footer><p><span>FindFoundFast</span> · Built different · <span>FFFliping Cool</span> · findfoundfast.com</p></footer>
    </>
  );
}
