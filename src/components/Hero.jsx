import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Indian Commodities", "Indian Stocks", "Future & Options"];

function HeroHeading() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const currentFullWord = WORDS[index];

      if (isDeleting) {
        // Deleting text
        setDisplayText(currentFullWord.substring(0, displayText.length - 1));
        setSpeed(50); // Speed up when deleting
      } else {
        // Typing text
        setDisplayText(currentFullWord.substring(0, displayText.length + 1));
        setSpeed(100);
      }

      // Logic to switch states
      if (!isDeleting && displayText === currentFullWord) {
        // Pause at the end of the word
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % WORDS.length);
      }
    };

    const timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, speed]);

  return (
    <h1
      style={{
        fontSize: "clamp(30px, 6vw, 50px)",
        fontWeight: 800,
        lineHeight: 1.1,
        margin: "0 0 24px",
        letterSpacing: -2,
        color: "#fff",
      }}
    >
      Trade Smarter,
      <br />
      <span
        style={{
          background: "linear-gradient(135deg, #6366f1, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Trade in <span style={{ fontStyle: "italic" }}>{displayText}</span>
        {/* Animated Cursor */}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={{
            display: "inline-block",
            marginLeft: "4px",
            width: "4px",
            height: "1em",
            background: "#06b6d4",
            verticalAlign: "middle",
          }}
        />
      </span>
    </h1>
  );
}

export default function Hero({ markets }) {
  return (
    <section
      id="home"
      style={{
        padding: "100px 5% 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#020617", // Dark background to make grid pop
      }}
    >
      {/* --- FUTURISTIC GRID START --- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          // Creating the grid lines
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          // Perspective effect
          transform: "perspective(500px) rotateX(60deg) translateY(-100px)",
          transformOrigin: "top",
          // Fade the grid out so it's subtle
          maskImage:
            "linear-gradient(to bottom, transparent, black, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black, transparent)",
          pointerEvents: "none",
        }}
      />
      {/* --- FUTURISTIC GRID END --- */}

      {/* Your existing glow effect (keep this) */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 600,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ... Rest of your code (Badge, H1, P, etc.) ... */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 100,
            padding: "6px 16px",
            fontSize: 13,
            color: "#a5b4fc",
            marginBottom: 28,
            backdropFilter: "blur(4px)", // Added for extra glass effect
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              background: "#6366f1",
              borderRadius: "50%",
              display: "inline-block",
              boxShadow: "0 0 8px #6366f1", // Added glow to the dot
            }}
          />
          Build by Traders, For Traders
        </div>

        <HeroHeading />
        {/* Primary Sub-heading (The "Unlock Bigger..." part) */}
        <p
          style={{
            // Scalable: min 18px on mobile, max 28px on desktop
            fontSize: "clamp(18px, 3vw, 28px)",
            fontWeight: 700,
            color: "#f1f5f9", // Brighter color for better readability
            lineHeight: 1.3,
            maxWidth: "800px",
            margin: "0 auto 16px",
            letterSpacing: "-0.01em",
          }}
        >
          Unlock Bigger Profits with the Lowest Brokerage
        </p>

        {/* Secondary Description (The "Passionate about..." part) */}
        <p
          style={{
            // Scalable: min 14px on mobile, max 18px on desktop
            fontSize: "clamp(14px, 1.5vw, 18px)",
            color: "#94a3b8", // Muted slate color
            lineHeight: 1.6,
            maxWidth: "700px",
            margin: "0 auto 32px",
          }}
        >
          Passionate about making money? Take your trading to the next level
          with a platform designed for simplicity, speed, and success.
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-80 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all mt-4"
          >
            Get in Touch
          </motion.button>
        </div>
        <p style={{ fontSize: 13, color: "#445566", marginTop: 20 }}>
          Apply in just 1 minute · No credit card required
        </p>
      </div>

      <div
        style={{
          maxWidth: 900,
          margin: "60px auto 0",
          background: "#0d1528",
          border: "1px solid #1e2a45",
          borderRadius: 16,
          padding: 24,
          textAlign: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: "#556677" }}>
              Portfolio Value
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#fff" }}>
              ₹2,45,820.50
            </div>
            <div style={{ fontSize: 14, color: "#22c55e" }}>
              ↑ +₹12,430 (+5.32%) today
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["1D", "1W", "1M", "1Y"].map((t) => (
              <button
                key={t}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: "1px solid #1e2a45",
                  background: t === "1D" ? "#6366f1" : "transparent",
                  color: t === "1D" ? "#fff" : "#556677",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 820 120" style={{ width: "100%", height: 120 }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,90 C40,85 80,70 120,65 C160,60 200,80 240,60 C280,40 320,50 360,35 C400,20 440,40 480,30 C520,20 560,10 600,15 C640,20 680,10 720,5 C760,0 790,8 820,5 L820,120 L0,120 Z"
            fill="url(#chartGrad)"
          />
          <path
            d="M0,90 C40,85 80,70 120,65 C160,60 200,80 240,60 C280,40 320,50 360,35 C400,20 440,40 480,30 C520,20 560,10 600,15 C640,20 680,10 720,5 C760,0 790,8 820,5"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
          />
        </svg>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 12,
            marginTop: 20,
          }}
        >
          {markets.slice(0, 4).map((m) => (
            <div
              key={m.name}
              style={{
                background: "#0a0f1e",
                borderRadius: 10,
                padding: "12px 14px",
                border: "1px solid #1e2a45",
              }}
            >
              <div style={{ fontSize: 12, color: "#556677", marginBottom: 4 }}>
                {m.name}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>₹{m.price}</div>
              <div
                style={{ fontSize: 12, color: m.up ? "#22c55e" : "#ef4444" }}
              >
                {m.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
