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
  return (
    <section style={{ padding: "100px 5%", backgroundColor: "#020617" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ color: "#6366f1", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
            Why Kwik Trade
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, margin: 0, letterSpacing: -1, color: "#fff" }}>
            Everything you need to trade like a pro
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#0d1528",
                border: "1px solid #1e2a45",
                borderRadius: 20,
                overflow: "hidden", // Important to clip the image
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-12px)";
                e.currentTarget.style.borderColor = "#6366f1";
                e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(99, 102, 241, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#1e2a45";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Image Area */}
              <div style={{ width: "100%", height: 180, overflow: "hidden" }}>
                <img 
                  src={f.image} 
                  alt={f.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }}
                />
              </div>

              {/* Text Content */}
              <div style={{ padding: "24px" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#fff" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}