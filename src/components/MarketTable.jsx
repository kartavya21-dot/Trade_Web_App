import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pointer } from "lucide-react";
import { marketsContent } from "../content/marketTable.js";

const markets = marketsContent.markets;

const handleSubmit = (m) => {
  const phoneNumber = marketsContent.whatsapp.phoneNumber;
  const message = marketsContent.whatsapp.messageTemplate(m.name);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
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
    background:
      hoveredRow === i
        ? "rgba(99,102,241,0.05)"
        : market[i].up
          ? "rgba(74, 222, 128, 0.05)"
          : "rgba(251, 113, 133, 0.05)",
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
            <th style={thStyle}>{marketsContent.headers.market}</th>
            <th style={thStyle}>{marketsContent.headers.price}</th>
            <th style={thStyle}>{marketsContent.headers.change}</th>
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
                <motion.span
                  key={m.price}
                  initial={{ opacity: 0.5, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  ₹ {m.price}
                </motion.span>
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
  const duration = isMobile ? 20 : isTablet ? 90 : 40;

  const [marketsData, setMarketsData] = useState(markets);

  useEffect(() => {
    // each stock gets its own trend memory
    const trends = {};

    const interval = setInterval(() => {
      setMarketsData((prev) =>
        prev.map((group, gi) =>
          group.map((item, ii) => {
            const key = `${gi}-${ii}`;

            if (!trends[key]) {
              trends[key] = {
                direction: Math.random() > 0.5 ? 1 : -1,
                strength: Math.random() * 0.3 + 0.1, // smoothness
              };
            }

            // occasionally flip trend (like real market sentiment)
            if (Math.random() < 0.1) {
              trends[key].direction *= -1;
            }

            const basePrice = parseFloat(item.price.replace(/,/g, ""));

            const movement =
              trends[key].direction * (Math.random() * trends[key].strength);

            const newPrice = basePrice * (1 + movement / 100);

            const change = ((newPrice - basePrice) / basePrice) * 100;

            return {
              ...item,
              price: newPrice.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              change: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
              up: change >= 0,
            };
          }),
        ),
      );
    }, 2500); // every ~1.2 sec feels natural

    return () => clearInterval(interval);
  }, []);

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
          {marketsContent.badge}
        </div>
        <h2
          style={{
            color: "white",
            fontSize: `clamp(22px, 4vw, 38px)`,
            fontWeight: 800,
            margin: 0,
          }}
        >
          {marketsContent.heading}
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
          {[...marketsData, ...marketsData].map((market, i) => (
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
