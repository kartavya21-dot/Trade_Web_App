import { useState } from "react";
import { faqContent } from "../content/faq.js";

const FAQS = faqContent.faqs;

export default function Faq() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <section id="about" style={{ padding: "80px 5%", background: "#0a0f1e" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 800,
              margin: 0,
            }}
          >
            {faqContent.heading}
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((f, i) => (
            <div
              key={i}
              style={{
                background: "#0d1528",
                border: "1px solid #1e2a45",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "18px 20px",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {f.q}
                <span
                  style={{
                    fontSize: 20,
                    color: "#6366f1",
                    transform: activeFaq === i ? "rotate(45deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                >
                  +
                </span>
              </button>
              {activeFaq === i && (
                <div
                  style={{
                    padding: "0 20px 18px",
                    color: "#778899",
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
