import React from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import { howItWorksContent } from "../content/howItWorks.js";

const STEPS = howItWorksContent.steps;

export default function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: "120px 5%", backgroundColor: "rgba(2, 6, 23, 0.4)" }}
    >
      {/* Background Accents */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" /> */}

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <div
            style={{
              color: "#06b6d4",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {howItWorksContent.badge}
          </div>
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {howItWorksContent.heading}
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 40,
            position: "relative",
          }}
        >
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-slate-800 -z-10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
            />
          </div>

          {STEPS.map((s, index) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              style={{ textAlign: "center", position: "relative" }}
            >
              {/* Number Circle */}
              <div
                className="group cursor-default"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "20px", // Squircle shape for a modern look
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 28px",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />

                <span
                  style={{
                    fontWeight: 800,
                    fontSize: 20,
                    background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {s.num}
                </span>

                {/* Orbit Ring */}
                <div className="absolute inset-[-4px] border border-indigo-500/20 rounded-[24px] scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>

              {/* Text Content */}
              <h3
                className="text-white"
                style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px" }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "#94a3b8",
                  lineHeight: 1.6,
                  margin: "0 auto",
                  maxWidth: "240px",
                }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
