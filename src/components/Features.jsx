import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FEATURES = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaUbeEszoLKlrkvmc1DVp8Dyg0FebDZ_hWEg&s",
    title: "Lightning Fast Execution",
    desc: "Execute trades in milliseconds with our ultra-low latency infrastructure built for serious traders.",
  },
  {
    image: "https://www.shutterstock.com/image-vector/cybersecurity-information-protection-data-concept-260nw-2412560719.jpg",
    title: "Bank-Level Security",
    desc: "Your funds and data are protected with 256-bit encryption and multi-factor authentication.",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVsGODeBP5Dmw_Z3dZT9vKuVTDl3GdWbmEGA&s",
    title: "Advanced Charts",
    desc: "Access 100+ technical indicators, customizable charts, and real-time market data.",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyYv6ERkG4xMxDqxqqut1-WCO5I6PGBD4UrQ&s",
    title: "Zero Brokerage",
    desc: "Trade with complete transparency. No hidden fees, no commissions — ever.",
  },
  {
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
    title: "Trade Anywhere",
    desc: "Fully responsive platform works seamlessly on desktop, tablet, and mobile.",
  },
  {
    image: "https://www.shutterstock.com/image-photo/header-female-hand-showing-credit-260nw-2405853345.jpg",
    title: "Multiple Payment Methods",
    desc: "Supports UPI, bank transfer, NEFT, RTGS and more for quick fund transfers.",
  },
];

export default function Features() {
  const [isMobile, setIsMobile] = useState(false);

  // Handle Screen Resize for Logic Branching
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile) {
    return <MobileFeaturesView />;
  }

  return <DesktopFeaturesView />;
}

// --- MOBILE VIEW (Standard Vertical Scroll) ---
function MobileFeaturesView() {
  return (
    <section className="bg-slate-950 px-6 py-20 font-sans">
      <div className="mb-12">
        <h2 className="text-white text-4xl font-bold tracking-tight">
          Powerful Features
        </h2>
        <p className="text-slate-500 mt-2 font-medium">
          Precision tools for the modern trader
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden"
          >
            <div className="h-48 relative">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
            </div>
            <div className="p-8">
              <span className="text-indigo-400 font-mono text-xs font-bold mb-2 block">
                FEAT_0{index + 1}
              </span>
              <h3 className="text-white text-xl font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- DESKTOP VIEW (Horizontal Scroll Jack) ---
function DesktopFeaturesView() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      Math.floor(latest * FEATURES.length),
      FEATURES.length - 1
    );
    if (index !== activeIndex) setActiveIndex(index);
  });

  const handleNavigate = (direction) => {
    if (!containerRef.current) return;
    const nextIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, FEATURES.length - 1)
        : Math.max(activeIndex - 1, 0);

    const containerHeight = containerRef.current.offsetHeight;
    const scrollableHeight = containerHeight - window.innerHeight;
    const targetProgress = (nextIndex + 0.5) / FEATURES.length;
    const scrollTarget = containerRef.current.offsetTop + targetProgress * scrollableHeight;

    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  const cardWidth = 450; 
  const x = useTransform(scrollYProgress, (value) => {
    const index = Math.min(Math.floor(value * FEATURES.length), FEATURES.length - 1);
    return -(index * cardWidth);
  });

  const springX = useSpring(x, { stiffness: 100, damping: 20 });

  return (
    <div id="features" className="bg-slate-950 font-sans">
      <section ref={containerRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
          {/* Header UI */}
          <div className="absolute top-20 left-0 w-full px-20 flex justify-between items-end z-10">
            <div>
              <h2 className="text-white text-5xl font-bold tracking-tight">Powerful Features</h2>
              <p className="text-slate-500 mt-2 font-medium">Precision tools for the modern trader</p>
            </div>
            <div className="text-slate-700 text-7xl font-black tabular-nums">
              0{activeIndex + 1}
            </div>
          </div>

          {/* Stepped Track */}
          <div className="w-full max-w-7xl mx-auto px-10 relative">
            <motion.div style={{ x: springX }} className="flex gap-12 items-center">
              {FEATURES.map((feature, index) => (
                <div key={index} style={{ width: cardWidth }} className="flex-shrink-0">
                   <FeatureCard
                    feature={feature}
                    index={index}
                    isActive={activeIndex === index}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-12 w-full flex flex-col items-center gap-6">
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

            <div className="flex gap-4">
              <NavBtn onClick={() => handleNavigate("prev")} disabled={activeIndex === 0} icon={<ChevronLeft />} />
              <NavBtn onClick={() => handleNavigate("next")} disabled={activeIndex === FEATURES.length - 1} icon={<ChevronRight />} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function FeatureCard({ feature, index, isActive }) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.2,
      }}
      className={`relative rounded-[2.5rem] overflow-hidden border transition-all duration-500 ${
        isActive ? "bg-slate-900 border-indigo-500/50 shadow-2xl" : "bg-slate-900/40 border-slate-800"
      }`}
    >
      <div className="h-64 overflow-hidden">
        <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-10">
        <h3 className="text-white text-2xl font-bold mb-4">{feature.title}</h3>
        <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

function NavBtn({ onClick, disabled, icon }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-4 rounded-full border border-slate-800 bg-slate-900/50 text-white hover:border-indigo-500 disabled:opacity-10 transition-all"
    >
      {icon}
    </button>
  );
}