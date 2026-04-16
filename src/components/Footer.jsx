import AnimatedLogo from "./AnimatedLogo";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "40px 5% 30px",
        background: "#060b18",
        borderTop: "1px solid #1e2a45",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <AnimatedLogo />
          </div>
          <p
            style={{
              color: "#445566",
              fontSize: 13,
              maxWidth: 220,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Fast, reliable trading platform for global financial markets.
          </p>
        </div>
        {[
          ["Product", ["Markets", "Features", "Pricing", "API"]],
          ["Company", ["About", "Blog", "Careers", "Press"]],
          ["Support", ["Help Center", "Contact", "Status", "Security"]],
        ].map(([title, links]) => (
          <div key={title}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 14,
                color: "#aabbcc",
              }}
            >
              {title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {links.map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    color: "#445566",
                    fontSize: 13,
                    textDecoration: "none",
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          borderTop: "1px solid #1e2a45",
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ color: "#334455", fontSize: 12 }}>
          © 2025 Superstock. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
            <a
              key={l}
              href="#"
              style={{ color: "#334455", fontSize: 12, textDecoration: "none" }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
