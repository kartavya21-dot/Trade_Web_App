const STATS = [
  { value: "1M+", label: "Active Traders" },
  { value: "₹0", label: "Brokerage Fee" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

export default function Stats() {
  return (
    <section
      style={{
        padding: "60px 5%",
        background: "#0a0f1e",
        borderTop: "1px solid #1e2a45",
        borderBottom: "1px solid #1e2a45",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 40,
          textAlign: "center",
        }}
      >
        {STATS.map((s) => (
          <div key={s.label}>
            <div
              style={{
                fontSize: 42,
                fontWeight: 800,
                background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {s.value}
            </div>
            <div style={{ color: "#667788", fontSize: 14, marginTop: 6 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
