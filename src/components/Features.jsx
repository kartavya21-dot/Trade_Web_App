import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional: install lucide-react or use strings

const FEATURES = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaUbeEszoLKlrkvmc1DVp8Dyg0FebDZ_hWEg&s",
    title: "Lightning Fast Execution",
    desc: "Execute trades in milliseconds with our ultra-low latency infrastructure built for serious traders.",
  },
  {
    image:
      "https://www.shutterstock.com/image-vector/cybersecurity-information-protection-data-concept-260nw-2412560719.jpg",
    title: "Bank-Level Security",
    desc: "Your funds and data are protected with 256-bit encryption and multi-factor authentication.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVsGODeBP5Dmw_Z3dZT9vKuVTDl3GdWbmEGA&s",
    title: "Advanced Charts",
    desc: "Access 100+ technical indicators, customizable charts, and real-time market data.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyYv6ERkG4xMxDqxqqut1-WCO5I6PGBD4UrQ&s",
    title: "Zero Brokerage",
    desc: "Trade with complete transparency. No hidden fees, no commissions — ever.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
    title: "Trade Anywhere",
    desc: "Fully responsive platform works seamlessly on desktop, tablet, and mobile.",
  },
  {
    image:
      "https://www.shutterstock.com/image-photo/header-female-hand-showing-credit-260nw-2405853345.jpg",
    title: "Multiple Payment Methods",
    desc: "Supports UPI, bank transfer, NEFT, RTGS and more for quick fund transfers.",
  },
];

export default function Features() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      Math.floor(latest * FEATURES.length),
      FEATURES.length - 1,
    );
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Manual Navigation Logic
  const handleNavigate = (direction) => {
    if (!containerRef.current) return;

    const nextIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, FEATURES.length - 1)
        : Math.max(activeIndex - 1, 0);

    const containerHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = containerHeight - viewportHeight;

    // +0.5 targets the CENTER of each step, avoiding boundary edge cases
    const targetProgress = (nextIndex + 0.5) / FEATURES.length;

    const scrollTarget =
      containerRef.current.offsetTop + targetProgress * scrollableHeight;

    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  const cardWidth = 400;
  const x = useTransform(scrollYProgress, (value) => {
    const index = Math.min(
      Math.floor(value * FEATURES.length),
      FEATURES.length - 1,
    );
    return -(index * cardWidth);
  });

  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 });

  return (
    <div
      id="features"
      style={{ backgroundColor: "rgba(2, 6, 23, 1)" }}
      className="min-h-screen font-sans"
    >
      <section ref={containerRef} className="relative h-[450vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
          {/* Header UI (Existing) */}
          <div className="absolute top-20 left-0 w-full px-8 md:px-20 flex justify-between items-end z-10">
            <div>
              <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight">
                Powerful Features
              </h2>
              <p className="text-slate-500 mt-2 font-medium">
                Precision tools for the modern trader
              </p>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-slate-700 text-6xl font-black tabular-nums">
                0{activeIndex + 1}
              </span>
            </div>
          </div>

          {/* Stepped Track (Existing) */}
          <div className="w-full max-w-7xl mx-auto px-10 relative">
            <motion.div
              style={{ x: springX }}
              className="flex gap-12 items-center"
            >
              {FEATURES.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  index={index}
                  isActive={activeIndex === index}
                />
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-12 w-full max-w-md px-10 flex flex-col items-center gap-6">
            {/* Progress Dots (Existing) */}
            <div className="flex gap-3">
              {FEATURES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: activeIndex === i ? 32 : 8,
                    backgroundColor: activeIndex === i ? "#6366f1" : "#1e293b",
                  }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>

            {/* NEW: Left & Right Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => handleNavigate("prev")}
                disabled={activeIndex === 0}
                className="p-4 rounded-full border border-slate-800 bg-slate-900/50 text-white hover:bg-slate-800 hover:border-indigo-500/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
                aria-label="Previous Feature"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleNavigate("next")}
                disabled={activeIndex === FEATURES.length - 1}
                className="p-4 rounded-full border border-slate-800 bg-slate-900/50 text-white hover:bg-slate-800 hover:border-indigo-500/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
                aria-label="Next Feature"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ feature, index, isActive }) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.05 : 0.9,
        opacity: isActive ? 1 : 0.3,
        y: isActive ? -20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      className="flex-shrink-0 w-[350px] md:w-[400px]"
    >
      <div
        className={`
        relative group rounded-[2.5rem] overflow-hidden border transition-all duration-500
        ${isActive ? "bg-slate-900 border-indigo-500/50 shadow-2xl shadow-indigo-500/10" : "bg-slate-900/40 border-slate-800 shadow-none"}
      `}
      >
        {/* Visual Header */}
        <div className="h-56 relative overflow-hidden">
          <img
            src={feature.image}
            alt={feature.title}
            className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? "scale-105" : "scale-125 grayscale"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

          {/* Index Chip */}
          <div
            className={`
            absolute top-6 right-6 px-4 py-2 rounded-full backdrop-blur-md border font-mono text-sm font-bold transition-all
            ${isActive ? "bg-indigo-500/20 border-indigo-500 text-indigo-400" : "bg-slate-800/20 border-slate-700 text-slate-500"}
          `}
          >
            FEAT_0{index + 1}
          </div>
        </div>

        {/* Text Area */}
        <div className="p-10">
          <h3
            className={`text-2xl font-bold mb-4 transition-colors ${isActive ? "text-white" : "text-slate-500"}`}
          >
            {feature.title}
          </h3>
          <p
            className={`leading-relaxed text-sm md:text-base transition-opacity ${isActive ? "text-slate-400 opacity-100" : "text-slate-600 opacity-60"}`}
          >
            {feature.desc}
          </p>

          {/* Decorative bar */}
          <div className="mt-8 flex gap-1">
            <div
              className={`h-1 rounded-full transition-all duration-700 ${isActive ? "w-12 bg-indigo-500" : "w-4 bg-slate-800"}`}
            />
            <div
              className={`h-1 rounded-full transition-all duration-1000 ${isActive ? "w-4 bg-indigo-500/30" : "w-4 bg-slate-800"}`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
