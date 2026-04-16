import Navbar from "./components/Navbar.jsx";
import Ticker from "./components/Ticker.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import Features from "./components/Features.jsx";
import MarketTable from "./components/MarketTable.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Faq from "./components/Faq.jsx";
import Cta from "./components/Cta.jsx";
import Footer from "./components/Footer.jsx";

const MARKETS = [
  { name: "NIFTY 50", price: "24,196.40", change: "+2.34%", up: true },
  { name: "SENSEX", price: "77,988.75", change: "+1.87%", up: true },
  { name: "BANK NIFTY", price: "56,086.30", change: "-0.92%", up: false },
  { name: "FINIFTY", price: "26,343.10", change: "+3.12%", up: true },
  { name: "NIFTY 100", price: "25,042.30", change: "-1.45%", up: false },
];

export default function KwikTrade() {
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#060b18",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      {/* <Ticker markets={MARKETS} /> */}
      <Hero markets={MARKETS} />
      <Stats />
      <Features />
      <MarketTable markets={MARKETS} />
      <HowItWorks />
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
}
