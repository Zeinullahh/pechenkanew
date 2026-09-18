"use client";

import React from "react";
import { motion } from "framer-motion";

export const SupremeVSCodeAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-br from-purple-600/30 to-blue-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
          x: [-50, 50, -50],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.3, 0.6, 0.3],
          x: [50, -50, 50],
          y: [30, -30, 30],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Main VSCode icon container with 3D effect */}
      <div
        className="relative w-48 h-48 sm:w-56 sm:h-56"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            rotateY: [0, 15, -15, 0],
            rotateX: [0, -10, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* VSCode Icon with glassmorphism */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              {/* Icon background glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/30 to-purple-500/20 blur-2xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* VSCode brackets icon */}
              <div className="relative z-10 text-7xl sm:text-8xl font-bold text-transparent bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
                &lt;/&gt;
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Rotating code lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        style={{
          filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))",
        }}
      >
        {/* Outer rotating ring with dashes */}
        <motion.circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="url(#purpleGradient)"
          strokeWidth="2"
          strokeDasharray="440"
          strokeDashoffset="0"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "200px 200px",
          }}
        />

        {/* Middle rotating ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="100"
          fill="none"
          stroke="url(#blueGradient)"
          strokeWidth="1.5"
          strokeDasharray="628"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "200px 200px",
          }}
        />

        {/* Inner scanning ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="70"
          fill="none"
          stroke="url(#cyanGradient)"
          strokeWidth="1"
          opacity="0.6"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "200px 200px",
          }}
        />

        {/* Orbiting scan lines */}
        {[0, 90, 180, 270].map((angle, i) => (
          <motion.line
            key={`line-${i}`}
            x1="200"
            y1="200"
            x2="200"
            y2="60"
            stroke={`url(#gradient${i % 2 === 0 ? "A" : "B"})`}
            strokeWidth="1.5"
            opacity="0.7"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.25,
            }}
            style={{
              transformOrigin: "200px 200px",
            }}
          />
        ))}

        {/* Pulsing nodes */}
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          // Round coordinates to 3 decimal places to avoid SSR/CSR float mismatches
          const x = Math.round((200 + Math.cos(rad) * 130) * 1000) / 1000;
          const y = Math.round((200 + Math.sin(rad) * 130) * 1000) / 1000;
          return (
            <motion.circle
              key={`node-${i}`}
              cx={x}
              cy={y}
              r={4}
              fill="rgba(168, 85, 247, 0.8)"
              animate={{
                r: [4, 8, 4],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          );
        })}

        {/* Gradients definitions */}
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(168,85,247,0.8)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.6)" />
          </linearGradient>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(99,102,241,0.7)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.5)" />
          </linearGradient>
          <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.6)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.4)" />
          </linearGradient>
          <linearGradient id="gradientA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(168,85,247,0.7)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="gradientB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.5)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center scanning rectangle (restored as requested) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ opacity: [0, 0.35, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <div className="w-24 h-24 border-2 border-purple-400/50 rounded-lg" />
      </motion.div>

      {/* Floating code symbols */}
      <motion.div
        className="absolute top-12 left-8 text-purple-400/50 text-3xl font-bold"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {"{"}
      </motion.div>

      <motion.div
        className="absolute bottom-12 right-8 text-blue-400/50 text-3xl font-bold"
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        {"}"}
      </motion.div>

      {/* Top right scanning indicator */}
      <motion.div
        className="absolute top-16 right-12 flex items-center gap-2"
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-xs text-green-400/70 font-semibold">SCANNING</span>
      </motion.div>
    </div>
  );
};
