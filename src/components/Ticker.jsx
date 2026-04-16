import { useState, useEffect } from "react";

export default function Ticker({ markets }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setOffset((p) => (p - 1) % 800), 20);
    return () => clearInterval(id);
  }, []);

  const items = [...markets, ...markets];
  return (
    <div
      style={{
        background: "#0a0f1e",
        borderBottom: "1px solid #1e2a45",
        overflow: "hidden",
        padding: "10px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 40,
          transform: `translateX(${offset}px)`,
          transition: "none",
          whiteSpace: "nowrap",
        }}
      >
        {items.map((m, i) => (
          <span
            key={i}
            style={{
              fontSize: 13,
              color: "#8899bb",
              gap: 8,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#fff", fontWeight: 600 }}>{m.name}</span>
            <span style={{ color: "#cdd6f4" }}>${m.price}</span>
            <span style={{ color: m.up ? "#22c55e" : "#ef4444" }}>
              {m.change}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
