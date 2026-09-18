"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { useLanguage } from "@/contexts/LanguageContext";

export function CybersecurityLamp({
  title,
  translationKey = "lamp.title",
  fallbackTitle = "Reality of Cyberattacks",
  containerClassName,
  headingClassName,
}) {
  const { t } = useLanguage();
  const resolvedTitle = title ?? t(translationKey, fallbackTitle);
  const resolvedHeadingClass =
    headingClassName ??
    "mt-8 bg-gradient-to-br from-pink-400 to-purple-600 py-4 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-5xl";

  return (
    <LampContainer className={containerClassName}>
      <motion.h2
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className={resolvedHeadingClass}
      >
        {resolvedTitle}
      </motion.h2>
    </LampContainer>
  );
}
