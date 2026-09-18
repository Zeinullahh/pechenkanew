"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const StickyScrollAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-10 bg-transparent">
      <motion.div
        className="w-[30rem] h-[30rem] bg-gradient-to-br from-[#2563eb]/20 to-[#06b6d4]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-[500px] max-h-[500px]">
          {/* Abstract circles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border border-[#3b82f6]/30 rounded-full"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i
              }}
            />
          ))}
          {/* Glowing orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-20 h-20 bg-[#00BFFF] rounded-full blur-xl opacity-50"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-[#2563eb] rounded-full blur-xl opacity-40"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </div>
    </div>
  );
};
