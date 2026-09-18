"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { solutionContent } from "../lib/solutionContent";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import EdgeGlowCard from "./EdgeGlowCard";

export function StickyScrollSolution() {
  const { t } = useLanguage();

  // Fallback content mapping
  const fallbackContent = {
    webSecurity: {
      title: "Step 1 · Connect your infrastructure",
      description: "Add your website domain and server IP address to connect AI-CSD protection."
    },
    ciaMonitoring: {
      title: "Step 2 · Real-time traffic monitoring",
      description: "Monitor traffic activity across countries, users, bandwidth, and requests per second."
    },
    userGrowth: {
      title: "Step 3 · Interactive global traffic visualization",
      description: "The 3D globe displays traffic patterns and geographic activity in real time."
    },
    aiEmailProtection: {
      title: "Step 4 · Email security monitoring",
      description: "Administrators can monitor and manage corporate email flows and detect threats."
    },
    emailVisualization: {
      title: "Step 4 · Email security monitoring",
      description: "Administrators can monitor and manage corporate email flows and detect threats."
    },
    secureWebmail: {
      title: "Step 4 · Email security monitoring",
      description: "Administrators can monitor and manage corporate email flows and detect threats."
    }
  };

  const localizedContent = solutionContent.map((item) => {
    const fallback = fallbackContent[item.id] || { title: "", description: "" };
    const title = t(`stickySolution.${item.id}.title`, fallback.title);
    const description = t(`stickySolution.${item.id}.description`, fallback.description);

    return {
      ...item,
      title,
      description,
      desktop: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <div className="w-full aspect-video overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.imagePath}
                initial={{ opacity: 0, backgroundColor: "#000000" }}
                animate={{ opacity: 1, backgroundColor: "transparent" }}
                exit={{ opacity: 0, backgroundColor: "#000000" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <img
                  src={item.imagePath}
                  className="w-full h-full object-contain"
                  alt={title}
                  onError={(e) => {
                    console.error(`Failed to load image: ${item.imagePath}`);
                    e.target.style.display = 'none';
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ),
    };
  });

  const desktopContent = localizedContent.map((item) => ({
    title: item.title,
    description: item.description,
    content: item.desktop,
  }));

  return (
    <div className="w-full">
      <div className="hidden lg:block">
        <StickyScroll
          content={desktopContent}
          contentClassName="aspect-video max-w-4xl bg-transparent"
        />
      </div>
      <div className="lg:hidden flex flex-col gap-10 px-4 py-12">
        {localizedContent.map((item) => (
          <EdgeGlowCard
            key={item.id}
            mode="static"
            outerClassName="rounded-[26px] p-[2px]"
            innerClassName="glass-card p-6 space-y-4 rounded-[24px]"
            glowColor="#FF00B7"
            secondaryGlowColor="rgba(0,191,255,0.7)"
            topColor="#FF00B7"
            leftColor="#FF00B7"
            rightColor="rgba(0,191,255,0.7)"
            bottomColor="rgba(0,191,255,0.7)"
          >
            <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black/60">
              <img
                src={item.imagePath}
                className="w-full h-full object-contain"
                alt={item.title}
                onError={(e) => {
                  console.error(`Failed to load image: ${item.imagePath}`);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </EdgeGlowCard>
        ))}
      </div>
    </div>
  );
}
