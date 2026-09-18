"use client";

import React from "react";
import { motion } from "framer-motion";

const spotlightConfig = [
  {
    size: 420,
    className: "from-[#FF00B7]/35 to-transparent",
    style: { top: "-12%", left: "-18%" },
    delay: 0,
  },
  {
    size: 360,
    className: "from-[#00BFFF]/25 to-transparent",
    style: { top: "10%", right: "-12%" },
    delay: 0.15,
  },
  {
    size: 340,
    className: "from-[#FB00FF]/22 to-transparent",
    style: { bottom: "-18%", left: "28%" },
    delay: 0.25,
  },
  {
    size: 320,
    className: "from-[#FF00B7]/30 to-transparent",
    style: { bottom: "15%", right: "-10%" },
    delay: 0.35,
  },
];

const Spotlights = () => (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    {spotlightConfig.map((spotlight, index) => (
      <motion.div
        key={index}
        className={`absolute rounded-full bg-gradient-radial ${spotlight.className} blur-[150px]`}
        style={{
          width: spotlight.size,
          height: spotlight.size,
          ...spotlight.style,
        }}
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: spotlight.delay, ease: "easeOut" }}
      />
    ))}
  </div>
);

export default Spotlights;
