import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import ConnectButton from "./ConnectButton";
import AnimatedLogo from "./AnimatedLogo";

const NAV_LINKS = [
  "Home",
  "Features",
  "About",
  "Contact",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(6,11,24,0.1)",
        backdropFilter: "blur(5px)",
        borderBottom: "1px solid #1e2a45",
        padding: "0 5%",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <AnimatedLogo />
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: "#8899bb",
                fontSize: 14,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#fff")}
              onMouseLeave={(e) => (e.target.style.color = "#8899bb")}
            >
              {l}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}
