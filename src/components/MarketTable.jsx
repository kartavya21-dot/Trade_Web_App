import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pointer } from "lucide-react";

const markets = [
  [
    { name: "NIFTY", price: "24,196.40", change: "+2.34%", up: true },
    { name: "SENSEX", price: "77,988.75", change: "+1.87%", up: true },
    { name: "BANK NIFTY", price: "56,086.30", change: "-0.92%", up: false },
    { name: "FINIFTY", price: "26,343.10", change: "+3.12%", up: true },
    { name: "NIFTY 100", price: "25,042.30", change: "-1.45%", up: false },
  ],
  [
    { name: "RELIANCE", price: "24,196.40", change: "+2.34%", up: true },
    { name: "SBIN", price: "11,988.75", change: "+1.27%", up: true },
    { name: "ADANIENSOL", price: "4,388.75", change: "-1.01%", up: false },
    { name: "ADANIENT", price: "7,988.75", change: "+4.87%", up: true },
    { name: "ADANIPORTS", price: "7,788.75", change: "+0.7%", up: true },
  ],
  [
    { name: "GOLD", price: "1,53,102.00", change: "+2.34%", up: true },
    { name: "SILVER", price: "2,51,542.01", change: "+1.37%", up: true },
    { name: "CRUDEOIL", price: "8,461.00", change: "-1.01%", up: false },
    { name: "NATURALGAS", price: "250.1", change: "+4.87%", up: true },
    { name: "COPPER", price: "1,276.5", change: "+0.7%", up: true },
  ],
];

const handleSubmit = (m) => {
    const ownerEmail = "owner@example.com"; // Replace with your email
    const subject = encodeURIComponent(`Trading Onboarding Request`);
    
    // Constructing the body text
    const body = encodeURIComponent(
      `Hello,\n\nI am interested in starting my trading journey. I want info related to ${m.name}\n\n` +
      `Please get in touch with me for onboarding.`
    );

    // Redirecting the user
    window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
  };

// Breakpoints
const BP_MOBILE = 600;
const BP_TABLET = 900;

// --- THE MISSING HOOK ---
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function MarketCard({ market, isMobile, isTablet }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  const cardStyle = {
    width: "100%",
    background: "rgba(13, 21, 40, 0.85)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(30, 42, 69, 1)",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
  };

  const thStyle = {
    padding: isMobile ? "12px 12px" : isTablet ? "14px 14px" : "18px 20px",
    fontSize: isMobile ? 7 : 12,
    color: "#94a3b8",
    fontWeight: 600,
    textAlign: "left",
    textTransform: "uppercase",
    letterSpacing: 1,
    whiteSpace: "nowrap",
  };

  const tdStyle = (i) => ({
    padding: isMobile ? "12px 12px" : isTablet ? "14px 14px" : "18px 20px",
    color: "white",
    fontWeight: 600,
    fontSize: isMobile ? 10 : 12,
    whiteSpace: "nowrap",
    borderBottom: i < market.length - 1 ? "1px solid #1e2a45" : "none",
    transition: "background 0.2s, box-shadow 0.2s",
    background: hoveredRow === i ? "rgba(99,102,241,0.05)" : "transparent",
  });

  return (
    <div style={cardStyle}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr
            style={{
              borderBottom: "1px solid #1e2a45",
              background: "rgba(30,42,69,0.3)",
            }}
          >
            <th style={thStyle}>Market</th>
            <th style={thStyle}>Price (INR)</th>
            <th style={thStyle}>24h Change</th>
          </tr>
        </thead>
        <tbody>
          {market.map((m, i) => (
            <tr
              key={m.name}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              onClick={() => handleSubmit(m)}
              style={{
                cursor: "pointer",
                boxShadow: hoveredRow === i ? "inset 4px 0 0 #6366f1" : "none",
                transition: "box-shadow 0.2s",
              }}
            >
              <td style={tdStyle(i)}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#6366f1",
                      boxShadow: "0 0 8px #6366f1",
                      flexShrink: 0,
                    }}
                  />
                  <span>{m.name}</span>
                </div>
              </td>
              <td
                style={{
                  ...tdStyle(i),
                  fontFamily: "monospace",
                  color: "#f8fafc",
                  fontWeight: 400,
                }}
              >
                ₹ {m.price}
              </td>
              <td
                style={{
                  ...tdStyle(i),
                  color: m.up ? "#4ade80" : "#fb7185",
                }}
              >
                {m.up ? "↑" : "↓"} {m.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MarketTable() {
  const width = useWindowWidth();
  const isMobile = width <= BP_MOBILE;
  const isTablet = width > BP_MOBILE && width <= BP_TABLET;

  const cardWidth = isMobile ? width * 0.9 : isTablet ? 420 : 520;
  const gap = 20;
  const duration = isMobile ? 20 : isTablet ? 30 : 40;

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: isMobile ? "48px 0" : "80px 0",
        // backgroundColor: "#020617",
        minHeight: "40vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          marginBottom: isMobile ? 32 : 48,
          padding: "0 5%",
        }}
      >
        <div
          style={{
            color: "#6366f1",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Live Markets
        </div>
        <h2
          style={{
            color: "white",
            fontSize: `clamp(22px, 4vw, 38px)`,
            fontWeight: 800,
            margin: 0,
          }}
        >
          Trade top assets in real time
        </h2>
      </div>

      {/* Continuous Marquee (Mobile & Desktop) */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: duration, repeat: Infinity }}
          style={{ display: "flex", width: "max-content", gap: gap }}
          whileHover={{ animationPlayState: "paused" }}
          whileTap={{ animationPlayState: "paused" }} // Stops on touch for mobile
        >
          {[...markets, ...markets].map((market, i) => (
            <div key={i} style={{ width: cardWidth, flexShrink: 0 }}>
              <MarketCard
                market={market}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
