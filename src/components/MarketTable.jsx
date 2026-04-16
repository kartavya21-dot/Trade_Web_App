export default function MarketTable({ markets }) {
  return (
    <section style={{ padding: "80px 5%", background: "#0a0f1e" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
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
            background: "#0d1528",
            border: "1px solid #1e2a45",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e2a45" }}>
                {["Market", "Price (USDT)", "24h Change", "Action"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px 20px",
                      fontSize: 12,
                      color: "#556677",
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
            <tbody>
              {markets.map((m, i) => (
                <tr
                  key={m.name}
                  style={{
                    borderBottom:
                      i < markets.length - 1 ? "1px solid #1e2a45" : "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#111827")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={{ padding: "16px 20px", fontWeight: 600 }}>
                    {m.name}
                  </td>
                  <td style={{ padding: "16px 20px", color: "#cdd6f4" }}>
                    ${m.price}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      color: m.up ? "#22c55e" : "#ef4444",
                      fontWeight: 600,
                    }}
                  >
                    {m.change}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <button
                      style={{
                        padding: "6px 16px",
                        borderRadius: 6,
                        border: "none",
                        background: "rgba(99,102,241,0.15)",
                        color: "#6366f1",
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
