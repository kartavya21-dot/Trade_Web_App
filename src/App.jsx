import { useState, useEffect } from "react";

const NAV_LINKS = ["Home", "Markets", "Features", "Pricing", "About", "Contact"];

const STATS = [
  { value: "1M+", label: "Active Traders" },
  { value: "₹0", label: "Brokerage Fee" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "Lightning Fast Execution",
    desc: "Execute trades in milliseconds with our ultra-low latency infrastructure built for serious traders.",
  },
  {
    icon: "🔒",
    title: "Bank-Level Security",
    desc: "Your funds and data are protected with 256-bit encryption and multi-factor authentication.",
  },
  {
    icon: "📊",
    title: "Advanced Charts",
    desc: "Access 100+ technical indicators, customizable charts, and real-time market data.",
  },
  {
    icon: "💸",
    title: "Zero Brokerage",
    desc: "Trade with complete transparency. No hidden fees, no commissions — ever.",
  },
  {
    icon: "📱",
    title: "Trade Anywhere",
    desc: "Fully responsive platform works seamlessly on desktop, tablet, and mobile.",
  },
  {
    icon: "🤝",
    title: "Multiple Payment Methods",
    desc: "Supports UPI, bank transfer, NEFT, RTGS and more for quick fund transfers.",
  },
];

const MARKETS = [
  { name: "BTC/USDT", price: "84,312.40", change: "+2.34%", up: true },
  { name: "ETH/USDT", price: "3,218.75", change: "+1.87%", up: true },
  { name: "SOL/USDT", price: "142.30", change: "-0.92%", up: false },
  { name: "BNB/USDT", price: "598.10", change: "+3.12%", up: true },
  { name: "XRP/USDT", price: "0.5821", change: "-1.45%", up: false },
  { name: "ADA/USDT", price: "0.4563", change: "+0.78%", up: true },
];

const STEPS = [
  { num: "01", title: "Create Account", desc: "Sign up in under 1 minute with just your email and phone number." },
  { num: "02", title: "Verify Identity", desc: "Complete quick KYC verification to unlock full trading features." },
  { num: "03", title: "Add Funds", desc: "Deposit via UPI, bank transfer or other supported payment methods." },
  { num: "04", title: "Start Trading", desc: "Access global markets and start trading with advanced tools instantly." },
];

const FAQS = [
  { q: "Is Kwik Trade really zero brokerage?", a: "Yes! We offer zero brokerage trading with complete transparency. No hidden charges." },
  { q: "How secure is my data and money?", a: "Your data is protected with bank-level 256-bit encryption and security measures." },
  { q: "What payment methods are supported?", a: "We support UPI, bank transfer, NEFT, RTGS, and more." },
  { q: "Can I trade on mobile?", a: "Yes, our platform is fully responsive and works seamlessly on all devices." },
  { q: "How quickly can I open an account?", a: "Apply for a trading account in just 1 minute with our streamlined onboarding." },
];

function Ticker() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset(p => (p - 1) % 800), 20);
    return () => clearInterval(id);
  }, []);

  const items = [...MARKETS, ...MARKETS];
  return (
    <div style={{ background: "#0a0f1e", borderBottom: "1px solid #1e2a45", overflow: "hidden", padding: "10px 0" }}>
      <div style={{ display: "flex", gap: 40, transform: `translateX(${offset}px)`, transition: "none", whiteSpace: "nowrap" }}>
        {items.map((m, i) => (
          <span key={i} style={{ fontSize: 13, color: "#8899bb", gap: 8, display: "inline-flex", alignItems: "center" }}>
            <span style={{ color: "#fff", fontWeight: 600 }}>{m.name}</span>
            <span style={{ color: "#cdd6f4" }}>${m.price}</span>
            <span style={{ color: m.up ? "#22c55e" : "#ef4444" }}>{m.change}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function KwikTrade() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#060b18", color: "#fff", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(6,11,24,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1e2a45", padding: "0 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #6366f1, #06b6d4)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16 }}>K</div>
            <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>Kwik<span style={{ color: "#6366f1" }}>Trade</span></span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <a key={l} href="#" style={{ color: "#8899bb", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#8899bb"}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ padding: "9px 20px", borderRadius: 8, border: "1px solid #334", background: "transparent", color: "#fff", fontSize: 14, cursor: "pointer" }}>Login</button>
            <button style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Get Started</button>
          </div>
        </div>
      </nav>

      <Ticker />

      {/* HERO */}
      <section style={{ padding: "100px 5% 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 100, padding: "6px 16px", fontSize: 13, color: "#a5b4fc", marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, background: "#6366f1", borderRadius: "50%", display: "inline-block" }} />
            Build by Traders, For Traders
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 24px", letterSpacing: -2 }}>
            Trade Smarter,<br />
            <span style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Trade Kwiker
            </span>
          </h1>
          <p style={{ fontSize: 18, color: "#8899bb", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px" }}>
            Fast, reliable platform for trading global financial markets. Zero brokerage, advanced tools, and 24/7 support.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ padding: "14px 32px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
              Open Free Account
            </button>
            <button style={{ padding: "14px 32px", borderRadius: 10, border: "1px solid #334", background: "transparent", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              ▶ Watch Demo
            </button>
          </div>
          <p style={{ fontSize: 13, color: "#445566", marginTop: 20 }}>Apply in just 1 minute · No credit card required</p>
        </div>

        {/* Mock dashboard card */}
        <div style={{ maxWidth: 900, margin: "60px auto 0", background: "#0d1528", border: "1px solid #1e2a45", borderRadius: 16, padding: 24, textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, color: "#556677" }}>Portfolio Value</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#fff" }}>₹2,45,820.50</div>
              <div style={{ fontSize: 14, color: "#22c55e" }}>↑ +₹12,430 (+5.32%) today</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["1D","1W","1M","1Y"].map(t => (
                <button key={t} style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid #1e2a45", background: t === "1D" ? "#6366f1" : "transparent", color: t === "1D" ? "#fff" : "#556677", fontSize: 13, cursor: "pointer" }}>{t}</button>
              ))}
            </div>
          </div>
          {/* Fake chart */}
          <svg viewBox="0 0 820 120" style={{ width: "100%", height: 120 }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,90 C40,85 80,70 120,65 C160,60 200,80 240,60 C280,40 320,50 360,35 C400,20 440,40 480,30 C520,20 560,10 600,15 C640,20 680,10 720,5 C760,0 790,8 820,5 L820,120 L0,120 Z" fill="url(#chartGrad)"/>
            <path d="M0,90 C40,85 80,70 120,65 C160,60 200,80 240,60 C280,40 320,50 360,35 C400,20 440,40 480,30 C520,20 560,10 600,15 C640,20 680,10 720,5 C760,0 790,8 820,5" fill="none" stroke="#6366f1" strokeWidth="2.5"/>
          </svg>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginTop: 20 }}>
            {MARKETS.slice(0, 4).map(m => (
              <div key={m.name} style={{ background: "#0a0f1e", borderRadius: 10, padding: "12px 14px", border: "1px solid #1e2a45" }}>
                <div style={{ fontSize: 12, color: "#556677", marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>${m.price}</div>
                <div style={{ fontSize: 12, color: m.up ? "#22c55e" : "#ef4444" }}>{m.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "60px 5%", background: "#0a0f1e", borderTop: "1px solid #1e2a45", borderBottom: "1px solid #1e2a45" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40, textAlign: "center" }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 42, fontWeight: 800, background: "linear-gradient(135deg, #6366f1, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
              <div style={{ color: "#667788", fontSize: 14, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#6366f1", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Why Kwik Trade</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, margin: 0, letterSpacing: -1 }}>Everything you need to trade like a pro</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ background: "#0d1528", border: "1px solid #1e2a45", borderRadius: 16, padding: "28px 24px", transition: "border-color 0.2s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#6366f1"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1e2a45"}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 10px", color: "#fff" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#667788", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETS TABLE */}
      <section style={{ padding: "80px 5%", background: "#0a0f1e" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: "#6366f1", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Live Markets</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, margin: 0 }}>Trade top assets in real time</h2>
          </div>
          <div style={{ background: "#0d1528", border: "1px solid #1e2a45", borderRadius: 16, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1e2a45" }}>
                  {["Market", "Price (USDT)", "24h Change", "Action"].map(h => (
                    <th key={h} style={{ padding: "14px 20px", fontSize: 12, color: "#556677", fontWeight: 600, textAlign: "left", textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MARKETS.map((m, i) => (
                  <tr key={m.name} style={{ borderBottom: i < MARKETS.length - 1 ? "1px solid #1e2a45" : "none", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#111827"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>{m.name}</td>
                    <td style={{ padding: "16px 20px", color: "#cdd6f4" }}>${m.price}</td>
                    <td style={{ padding: "16px 20px", color: m.up ? "#22c55e" : "#ef4444", fontWeight: 600 }}>{m.change}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <button style={{ padding: "6px 16px", borderRadius: 6, border: "none", background: "rgba(99,102,241,0.15)", color: "#6366f1", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Trade</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "#06b6d4", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Get Started</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, margin: 0 }}>Start trading in 4 simple steps</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, position: "relative" }}>
            {STEPS.map((s, i) => (
              <div key={s.num} style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, margin: "0 auto 20px" }}>{s.num}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px" }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#667788", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 5%", background: "#0a0f1e" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, margin: 0 }}>Frequently asked questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ background: "#0d1528", border: "1px solid #1e2a45", borderRadius: 12, overflow: "hidden" }}>
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={{ width: "100%", padding: "18px 20px", background: "none", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {f.q}
                  <span style={{ fontSize: 20, color: "#6366f1", transform: activeFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </button>
                {activeFaq === i && (
                  <div style={{ padding: "0 20px 18px", color: "#778899", fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 5%", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, margin: "0 0 20px", letterSpacing: -1 }}>Ready to trade smarter?</h2>
          <p style={{ color: "#778899", fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>Join over 1 million traders who trust Kwik Trade for zero-brokerage, real-time trading.</p>
          <button style={{ padding: "16px 40px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
            Open Free Account — It's Free
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 5% 30px", background: "#060b18", borderTop: "1px solid #1e2a45" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, background: "linear-gradient(135deg, #6366f1, #06b6d4)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>K</div>
              <span style={{ fontWeight: 800, fontSize: 17 }}>KwikTrade</span>
            </div>
            <p style={{ color: "#445566", fontSize: 13, maxWidth: 220, lineHeight: 1.7, margin: 0 }}>Fast, reliable trading platform for global financial markets.</p>
          </div>
          {[["Product", ["Markets", "Features", "Pricing", "API"]], ["Company", ["About", "Blog", "Careers", "Press"]], ["Support", ["Help Center", "Contact", "Status", "Security"]]].map(([title, links]) => (
            <div key={title}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "#aabbcc" }}>{title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {links.map(l => <a key={l} href="#" style={{ color: "#445566", fontSize: 13, textDecoration: "none" }}>{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1e2a45", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "#334455", fontSize: 12 }}>© 2025 KwikTrade. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <a key={l} href="#" style={{ color: "#334455", fontSize: 12, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}