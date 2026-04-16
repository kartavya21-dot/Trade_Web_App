import React, { useState } from "react";

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        padding: "4px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The "K" Box */}
      <div
        style={{
          width: 36,
          height: 36,
          background: "linear-gradient(135deg, #6366f1, #06b6d4)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 16,
          color: "#fff",
          zIndex: 2, // Keeps the icon on top
        }}
      >
        K
      </div>

      {/* The Sliding Text Container */}
      <div
        style={{
          maxWidth: isHovered ? "150px" : "0px", // Animates the width
          opacity: isHovered ? 1 : 0,           // Fades in/out
          overflow: "hidden",                   // Clips the text while sliding
          transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth "springy" feel
          whiteSpace: "nowrap",                 // Prevents text wrapping during slide
          display: "flex",
          alignItems: "center",
        }}
      >
        <span 
          style={{ 
            fontWeight: 800, 
            fontSize: 20, 
            letterSpacing: -0.5,
            paddingLeft: 10, // Space between K and Text
            color: "#1e293b" // Adjust based on your theme
          }}
        >
          Kwik<span style={{ color: "#6366f1" }}>Trade</span>
        </span>
      </div>
    </div>
  );
};

export default AnimatedLogo;