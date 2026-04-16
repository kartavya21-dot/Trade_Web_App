export default function MarketTable({ markets }) {
  return (
    <section className="relative overflow-hidden" style={{ padding: "80px 5%", background: "#020617" }}>
      
      {/* --- FUTURISTIC BACKGROUND ELEMENTS --- */}
      {/* 1. Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
        }}
      />

      {/* 2. Floating Blue "Orbs" for depth */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
      
      {/* 3. Dot Overlay (Optional - for that "tech" texture) */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: 'radial-gradient(#6366f1 0.5px, transparent 0.5px)', 
          backgroundSize: '24px 24px' 
        }} 
      />
      {/* --- END BACKGROUND ELEMENTS --- */}

      <div className="relative z-10" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              color: "#6366f1",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Live Markets
          </div>
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 800,
              margin: 0,
            }}
          >
            Trade top assets in real time
          </h2>
        </div>

        <div
          style={{
            background: "rgba(13, 21, 40, 0.8)", // Slight transparency to see grid
            backdropFilter: "blur(8px)", // Glassmorphism effect
            border: "1px solid rgba(30, 42, 69, 1)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e2a45", background: "rgba(30, 42, 69, 0.3)" }}>
                {["Market", "Price (INR)", "24h Change", "Action"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "18px 20px",
                      fontSize: 12,
                      color: "#94a3b8",
                      fontWeight: 600,
                      textAlign: "left",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-white">
              {markets.map((m, i) => (
                <tr
                  key={m.name}
                  style={{
                    borderBottom: i < markets.length - 1 ? "1px solid #1e2a45" : "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(99, 102, 241, 0.05)";
                    e.currentTarget.style.boxShadow = "inset 4px 0 0 #6366f1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <td style={{ padding: "20px", fontWeight: 600 }}>
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
                       {m.name}
                    </div>
                  </td>
                  <td style={{ padding: "20px", color: "#f8fafc", fontFamily: 'monospace' }}>
                    ₹ {m.price}
                  </td>
                  <td
                    style={{
                      padding: "20px",
                      color: m.up ? "#4ade80" : "#fb7185",
                      fontWeight: 600,
                    }}
                  >
                    {m.up ? "↑" : "↓"} {m.change}
                  </td>
                  <td style={{ padding: "20px" }}>
                    <button
                      className="hover:scale-105 active:scale-95 transition-transform"
                      style={{
                        padding: "8px 20px",
                        borderRadius: 8,
                        border: "1px solid rgba(99,102,241,0.4)",
                        background: "rgba(99,102,241,0.1)",
                        color: "#818cf8",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}