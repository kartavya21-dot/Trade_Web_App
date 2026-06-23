import Navbar from "./components/Navbar.jsx";
import Ticker from "./components/Ticker.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import Features from "./components/Features.jsx";
import MarketTable from "./components/MarketTable.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Faq from "./components/Faq.jsx";
import Footer from "./components/Footer.jsx";
import Reviews from "./components/Reviews.jsx";
import ContactForm from "./components/ContactForm.jsx";
import LegalModal from "./components/LegalModal.jsx";
import ContactModal from "./components/ContactModal.jsx"; // Import the new modal
import { useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import PaymentSelector from "./components/PaymentSelector.jsx";
import WhyChoose from "./components/WhyChoose.jsx";

const MARKETS = [
  // ... (market data remains the same)
  { name: "NIFTY 50", price: "24,196.40", change: "+2.34%", up: true },
  { name: "SENSEX", price: "77,988.75", change: "+1.87%", up: true },
  { name: "BANK NIFTY", price: "56,086.30", change: "-0.92%", up: false },
  { name: "FINIFTY", price: "26,343.10", change: "+3.12%", up: true },
  { name: "NIFTY 100", price: "25,042.30", change: "-1.45%", up: false },
];

export default function KwikTrade() {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "terms",
  });
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Timer to open the contact modal after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContactModalOpen(true);
    }, 3000);
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "rgba(6, 11, 24, 0.97)",
        color: "#fff",
        minHeight: "100vh",
        position: "relative", // Needed for absolute children
      }}
    >
      {/* --- GLOBAL STATIC BACKGROUND GRID --- */}
      <div
        style={{
          position: "fixed", // Key change: Fixed keeps it static during scroll
          inset: 0,
          zIndex: 0,
          pointerEvents: "none", // Ensures users can still click buttons/links
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          // Perspective effect
          transform: "perspective(500px) rotateX(60deg) translateY(-100px)",
          transformOrigin: "top",
          // Fades the grid out toward the bottom
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      />

      {/* --- CONTENT LAYER --- */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero markets={MARKETS} />
        <WhyChoose />
        <Stats />
        <Features />
        <MarketTable />
        <HowItWorks />
        <PaymentSelector />
        <Reviews />
        <ContactForm />
        <Footer modalConfig={modalConfig} setModalConfig={setModalConfig} />
      </div>

      <LegalModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
