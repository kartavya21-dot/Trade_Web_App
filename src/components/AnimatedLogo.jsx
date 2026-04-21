import React from "react";
import { content } from "../assets/assets";

const AnimatedLogo = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        padding: "4px",
        position: "relative", // Required for the absolute blur background
      }}
    >
      {/* ─── DISTORTED BLUR BACKGROUND ─── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 200, // Size of the blur
          height: 38,
          // Use the logo's green/blue colors or white for the glow
          // background: "radial-gradient(circle,rgba(189, 189, 255, 1) 0%, rgba(255, 255, 255, 1) 51%, rgba(195, 181, 255, 0.91) 100%)",
          filter: "blur(25px)", // This creates the distortion
          borderRadius: "50%", // Circular/Oval makes it feel less like a box
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ─── LOGO CONTAINER ─── */}
      <div
        style={{
          width: 200,
          height: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img 
          src={content.logoPngCont} 
          alt="Logo"
          style={{ 
            scale: 3.7,
            marginTop: "10px",
            width: "100%", 
            height: "100%", 
            objectFit: "contain",
            zIndex: 2,
            // Optional: subtle drop shadow to make logo pop from the blur
            filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))" 
          }} 
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;