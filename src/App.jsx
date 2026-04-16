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
  { name: "BTC/USDT", price: "84,312.40", change: "+2.34%", up: true },
  { name: "ETH/USDT", price: "3,218.75", change: "+1.87%", up: true },
  { name: "SOL/USDT", price: "142.30", change: "-0.92%", up: false },
  { name: "BNB/USDT", price: "598.10", change: "+3.12%", up: true },
  { name: "XRP/USDT", price: "0.5821", change: "-1.45%", up: false },
  { name: "ADA/USDT", price: "0.4563", change: "+0.78%", up: true },
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
