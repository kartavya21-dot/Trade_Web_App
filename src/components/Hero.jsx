import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../assets/assets";
import { WORDS, heroContent } from "../content/hero.js";

function HeroHeading() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const currentFullWord = WORDS[index];

      if (isDeleting) {
        setDisplayText(currentFullWord.substring(0, displayText.length - 1));
        setSpeed(50);
      } else {
        setDisplayText(currentFullWord.substring(0, displayText.length + 1));
        setSpeed(100);
      }

      if (!isDeleting && displayText === currentFullWord) {
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
        fontWeight: 500,
        lineHeight: 1.1,
        margin: "0 0 24px",
        letterSpacing: -2,
        color: "#fff",
      }}
    >
      {heroContent.heading.prefix}
      <span
        style={{
          background: "linear-gradient(135deg, #6366f1, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontStyle: "oblique",
          width: "max-content",
        }}
      >
        {heroContent.heading.highlight}
      </span>{" "}
      {heroContent.heading.suffix}
      <br />
      <span
        style={{
          background: "linear-gradient(135deg, #6366f1, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "clamp(20px, 4vw, 34px)",
          letterSpacing: "1px",
        }}
      >
        {heroContent.heading.typingPrefix}
        {displayText}
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
        // backgroundColor: "#020617",
      }}
    >
      {/* Glow Effect */}
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
        {/* Badge */}
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
            backdropFilter: "blur(4px)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              background: "#6366f1",
              borderRadius: "50%",
              display: "inline-block",
              boxShadow: "0 0 8px #6366f1",
            }}
          />
          {heroContent.badge}
        </div>

        <HeroHeading />

        {/* Primary Sub-heading */}
        <p
          style={{
            fontSize: "clamp(18px, 3vw, 28px)",
            fontWeight: 700,
            color: "#f1f5f9",
            lineHeight: 1.3,
            maxWidth: "800px",
            margin: "0 auto 16px",
            letterSpacing: "-0.01em",
          }}
        >
          {heroContent.primarySubHeading}
        </p>

        {/* Secondary Description */}
        <p
          style={{
            fontSize: "clamp(14px, 1.5vw, 18px)",
            color: "#94a3b8",
            lineHeight: 1.6,
            maxWidth: "700px",
            margin: "0 auto 32px",
          }}
        >
          {heroContent.secondaryDescription}
        </p>

        {/* Button */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-80 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all mt-4"
          >
            {heroContent.ctaButtonText}
          </motion.a>
        </div>
        <p style={{ fontSize: 13, color: "#445566", marginTop: 20 }}>
          {heroContent.noteText}
        </p>
      </div>

      {/* --- IMAGE CONTAINER WITH OVERLAY --- */}
      <div
        style={{
          position: "relative",
          maxWidth: 900, // Slightly wider for better text flow
          margin: "60px auto 0",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow:
            "rgba(0, 0, 0, 0.4) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
          border: "1px solid #1e2a45",
        }}
      >
        {/* Animated Text Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 1 }} // Appears after typing
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // Darker gradient at bottom for text contrast
            background:
              "linear-gradient(to bottom, transparent, rgba(2,6,23,0.85) 100%)",
            padding: "20px 40px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 650 }}>
            {/* Top Line: Clean Sans-Serif */}
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "white",
                fontSize: "clamp(24px, 4vw, 42px)",
                fontWeight: 800,
                display: "block",
                marginBottom: 4,
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                letterSpacing: "-0.04em",
              }}
            >
              {heroContent.overlay.line1}
            </span>

            {/* Bottom Line with Contrast Font */}
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#e2e8f0", // Subtle grey
                fontSize: "clamp(18px, 3vw, 30px)",
                fontWeight: 600,
                display: "block",
                letterSpacing: "-0.02em",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              {heroContent.overlay.line2Prefix}
              {/* --- HIGHLIGHTED PHRASE: DIFFERENT FONT --- */}
              <span
                style={{
                  // Elegant Serif Font for highlighting
                  fontFamily: "'DM Serif Display', serif",
                  // and use a bright accent color
                  color: "#22d3ee", // Cyan-400
                  fontSize: "1.1em", // Slightly larger
                  fontStyle: "italic",
                  // and add a glowing text shadow
                  textShadow: "0 0 15px rgba(34,211,238,0.4)",
                  fontWeight: 400,
                }}
              >
                {heroContent.overlay.line2Highlight}
              </span>
            </span>
          </div>
        </motion.div>

        {/* The Image */}
        <img
          src={content.hero}
          alt="Trading Platform Dashboard"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            background: "#0d1528",
            filter: "brightness(0.9)", // Subtly darkens image to help text stand out
          }}
        />
      </div>
    </section>
  );
}
