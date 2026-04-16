export default function Cta() {
  return (
    <section
      style={{
        padding: "100px 5%",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 800,
            margin: "0 0 20px",
            letterSpacing: -1,
          }}
        >
          Ready to trade smarter?
        </h2>
        <p
          style={{
            color: "#778899",
            fontSize: 17,
            lineHeight: 1.7,
            marginBottom: 36,
          }}
        >
          Join over 1 million traders who trust Kwik Trade for zero-brokerage,
          real-time trading.
        </p>
        <button
          style={{
            padding: "16px 40px",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Open Free Account — It's Free
        </button>
      </div>
    </section>
  );
}
