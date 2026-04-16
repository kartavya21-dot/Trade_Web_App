const STEPS = [
  {
    num: "01",
    title: "Create Account",
    desc: "Sign up in under 1 minute with just your email and phone number.",
  },
  {
    num: "02",
    title: "Verify Identity",
    desc: "Complete quick KYC verification to unlock full trading features.",
  },
  {
    num: "03",
    title: "Add Funds",
    desc: "Deposit via UPI, bank transfer or other supported payment methods.",
  },
  {
    num: "04",
    title: "Start Trading",
    desc: "Access global markets and start trading with advanced tools instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "100px 5%" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              color: "#06b6d4",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Get Started
          </div>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 800,
              margin: 0,
            }}
          >
            Start trading in 4 simple steps
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 32,
            position: "relative",
          }}
        >
          {STEPS.map((s) => (
            <div key={s.num} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 18,
                  margin: "0 auto 20px",
                }}
              >
                {s.num}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px" }}>
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#667788",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
