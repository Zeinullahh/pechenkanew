"use client";

import React from "react";

const GlowButton = ({ children, glowColor = "#FF00B7", className = "", ...props }) => {
  const handleGlowMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      onMouseMove={handleGlowMouseMove}
      className={`group relative rounded-full p-[1.5px] overflow-hidden card-glow ${className}`}
      style={{ "--glow-color": glowColor }}
      {...props}
    >
      <div className="relative w-full z-10 flex items-center justify-center gap-2 px-8 py-2 bg-white rounded-full transition-colors hover:bg-gray-200 cursor-pointer">
        {children}
      </div>
    </div>
  );
};

export default GlowButton;
