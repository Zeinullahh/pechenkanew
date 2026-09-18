"use client";

import React from "react";
import clsx from "clsx";
import BorderGlow from "./BorderGlow";

const GlowButton = ({
  children,
  glowColor = "#FF00B7",
  className = "",
  innerClassName = "",
  type = "button",
  disabled = false,
  variant,
  ...props
}) => {
  return (
    <BorderGlow
      borderRadius={999}
      backgroundColor="transparent"
      glowColor="275 85 72"
      glowRadius={24}
      glowIntensity={0.9}
      fillOpacity={0.3}
      colors={["#c084fc", "#f472b6", "#38bdf8"]}
      className={clsx(
        "group inline-flex cursor-pointer rounded-full",
        className
      )}
    >
      {/* A real <button> is required: BorderGlow renders a div, so props like
          onClick/type/disabled only work when attached to an interactive element. */}
      <button
        type={type}
        disabled={disabled}
        className={clsx(
          "relative z-10 flex items-center justify-center whitespace-nowrap rounded-full bg-[#3B82F6] px-6 py-3 text-base font-normal text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60",
          innerClassName
        )}
        {...props}
      >
        {children}
      </button>
    </BorderGlow>
  );
};

export default GlowButton;
