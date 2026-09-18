"use client";
import React from "react";
import { motion } from "framer-motion";

const WorldMapKazakhstan = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced Map */}
      <motion.svg
        viewBox="0 0 1000 500"
        className="absolute left-1/2 top-[35%] w-[1800px] max-w-none 
                   -translate-x-1/2 -translate-y-1/2 opacity-[0.15]
                   hidden sm:block"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* World Map Path - Europe/Asia (main path) */}
        <motion.path
          d="M40,250 Q150,150 300,200 T560,220 T820,200 T960,260"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* North America */}
        <path
          d="M80,120 Q150,100 220,130 T350,140 T450,150"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
        />
        <path
          d="M100,140 Q170,120 240,150 T370,160 T470,170"
          fill="none"
          stroke="rgba(32,140,255,0.25)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        
        {/* South America */}
        <path
          d="M180,280 Q200,320 220,360 T250,400 T280,420"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
        />
        <path
          d="M200,290 Q220,330 240,370 T270,410 T300,430"
          fill="none"
          stroke="rgba(55,255,139,0.25)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        
        {/* Africa */}
        <path
          d="M480,220 Q500,260 520,300 T550,350 T570,380"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
        />
        <path
          d="M500,230 Q520,270 540,310 T570,360 T590,390"
          fill="none"
          stroke="rgba(255,0,183,0.25)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        
        {/* Additional map paths for depth - Asia */}
        <path
          d="M50,240 Q160,140 310,190 T570,210 T830,190 T970,250"
          fill="none"
          stroke="rgba(255,0,183,0.2)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M30,260 Q140,160 290,210 T550,230 T810,210 T950,270"
          fill="none"
          stroke="rgba(32,140,255,0.2)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        
        {/* Australia/Oceania */}
        <path
          d="M750,380 Q780,390 810,400 T870,410"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        <path
          d="M760,390 Q790,400 820,410 T880,420"
          fill="none"
          stroke="rgba(55,255,139,0.2)"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />

        {/* Enhanced Dots grid with animation */}
        {Array.from({ length: 150 }).map((_, i) => {
          const delay = (i * 0.02) % 3;
          return (
            <motion.circle
              key={i}
              cx={(i * 73) % 1000}
              cy={(i * 41) % 500}
              r="1.5"
              fill="white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
              }}
            />
          );
        })}

        {/* Enhanced Turkey Marker */}
        <g transform="translate(530 205)">
          {/* Outer pulse rings */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`ring-${i}`}
              r={18 + i * 12}
              fill="none"
              stroke="#37FF8B"
              strokeWidth="1.5"
              initial={{ opacity: 0.6, scale: 0.8 }}
              animate={{ 
                opacity: [0.6, 0, 0.6],
                scale: [0.8, 1.4, 0.8]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Glow effect */}
          <motion.circle
            r="24"
            fill="rgba(55,255,139,0.15)"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Core with glow */}
          <circle r="8" fill="#37FF8B" filter="url(#glow)" />
          <circle r="6" fill="#37FF8B" />

          {/* Label with background */}
          <g>
            <rect
              x="8"
              y="-20"
              width="70"
              height="16"
              rx="4"
              fill="rgba(0,0,0,0.6)"
              opacity="0.7"
            />
            <motion.text
              x="14"
              y="-8"
              fill="#37FF8B"
              fontSize="13"
              fontWeight="600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Turkey
            </motion.text>
          </g>

          {/* Connection lines to other regions */}
          {[
            { x: 200, y: 150, color: "rgba(255,0,183,0.3)" },
            { x: 800, y: 180, color: "rgba(32,140,255,0.3)" },
            { x: 450, y: 300, color: "rgba(55,255,139,0.2)" },
          ].map((point, i) => (
            <motion.line
              key={`line-${i}`}
              x1="530"
              y1="205"
              x2={point.x}
              y2={point.y}
              stroke={point.color}
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, delay: 1 + i * 0.3, repeat: Infinity, repeatDelay: 3 }}
            />
          ))}
        </g>

        {/* UAE Marker */}
        <g transform="translate(580 260)">
          {/* Outer pulse rings */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`ring-uae-${i}`}
              r={14 + i * 10}
              fill="none"
              stroke="#FF00B7"
              strokeWidth="1.5"
              initial={{ opacity: 0.6, scale: 0.8 }}
              animate={{ 
                opacity: [0.6, 0, 0.6],
                scale: [0.8, 1.4, 0.8]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8 + 0.4,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Glow effect */}
          <motion.circle
            r="20"
            fill="rgba(255,0,183,0.15)"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Core with glow */}
          <circle r="6" fill="#FF00B7" filter="url(#glow)" />
          <circle r="4" fill="#FF00B7" />

          {/* Label with background */}
          <g>
            <rect
              x="8"
              y="-18"
              width="45"
              height="14"
              rx="4"
              fill="rgba(0,0,0,0.6)"
              opacity="0.7"
            />
            <motion.text
              x="14"
              y="-8"
              fill="#FF00B7"
              fontSize="11"
              fontWeight="600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              UAE
            </motion.text>
          </g>
        </g>

        {/* Glow filter definition */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </motion.svg>

      {/* Enhanced Signal Waves */}
      <div className="absolute left-1/2 top-[35%] -translate-x-[10%] -translate-y-[20%]">
        {[...Array(4)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-40 h-40 rounded-full border"
            style={{
              borderColor: i % 2 === 0 ? "rgba(55,255,139,0.4)" : "rgba(32,140,255,0.3)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ 
              scale: [0.5, 2.5, 0.5],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.75,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Additional connection particles */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 80 + (i % 3) * 40;
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              background: i % 2 === 0 ? "#37FF8B" : "rgba(32,140,255,0.6)",
              boxShadow: `0 0 8px ${i % 2 === 0 ? "#37FF8B" : "rgba(32,140,255,0.8)"}`,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
            }}
            animate={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

export default WorldMapKazakhstan;
