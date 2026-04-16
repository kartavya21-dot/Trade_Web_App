import React, { useState } from "react";
// Import the WhatsApp icon from the Font Awesome (fa) set
import { FaWhatsapp } from "react-icons/fa";
import { wp } from "../utils/wp";

const ConnectButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  // WhatsApp Brand Colors
  const whatsappGreen = "#25D366";
  const hoverGreen = "#128C7E";

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 20px",
    borderRadius: 8,
    border: "none",
    background: isHovered ? hoverGreen : whatsappGreen,
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: isHovered ? "0 4px 12px rgba(37, 211, 102, 0.3)" : "none",
  };

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <button
        style={buttonStyle}
        onClick={wp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FaWhatsapp size={20} />
        Connect
      </button>
    </div>
  );
};

export default ConnectButton;