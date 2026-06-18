import { motion } from "framer-motion";
import { statsContent } from "../content/stats.js";

const DUPLICATED = [...statsContent, ...statsContent, ...statsContent];

function StatItem({ value, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 40,
        flexShrink: 0,
      }}
    >
      <div style={{ textAlign: "center", minWidth: 160 }}>
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
          }}
        >
          {value}
        </div>
        <div style={{ color: "#667788", fontSize: 14, marginTop: 6 }}>
          {label}
        </div>
      </div>

      <div
        style={{
          width: 1,
          height: 40,
          background: "linear-gradient(to bottom, transparent, #1e2a45, transparent)",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

export default function Stats() {
  return (
    <section
      style={{
        padding: "60px 0",
        background: "#0a0f1e",
        borderTop: "1px solid #1e2a45",
        borderBottom: "1px solid #1e2a45",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 120,
          height: "100%",
          background: "linear-gradient(to right, #0a0f1e, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 120,
          height: "100%",
          background: "linear-gradient(to left, #0a0f1e, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          width: "max-content",
        }}
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          duration: 14,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {DUPLICATED.map((s, i) => (
          <StatItem key={i} value={s.value} label={s.label} />
        ))}
      </motion.div>
    </section>
  );
}