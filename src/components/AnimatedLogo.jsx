import React, { useState } from "react";
import { content } from "../assets/assets";

const AnimatedLogo = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        padding: "4px",
      }}
    >
      {/* The Image Logo Box */}
      <div
        style={{
          width: 200,
          height: 58,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          // border: "1px solid red",
          overflow: "hidden", // Ensures image stays within rounded corners
        }}
      >
        <img 
          src={content.logoPng} 
          alt="Logo"
          style={{ 
            scale: 3.4,
            marginTop: "10px",
            width: "100%", // Adjust this percentage to control padding inside the box
            height: "100%", 
            objectFit: "contain" // Keeps aspect ratio without stretching
          }} 
        />
      </div>

    </div>
  );
};

export default AnimatedLogo;