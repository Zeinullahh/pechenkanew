"use client";
import React from "react";
import { FloatingDock } from "./ui/floating-dock";
import { IconBrandX, IconBrandYoutube, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function FloatingText({ className }) {
  const { t } = useLanguage();
  const links = [
    {
      title: "X",
      icon: (
        <IconBrandX className="h-full w-full text-black" />
      ),
      href: "https://x.com/silence_codes",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-[#0077B5]" />
      ),
      href: "https://www.linkedin.com/company/silence-ai",
    },
    {
      title: "YouTube",
      icon: (
        <IconBrandYoutube className="h-full w-full text-[#FF0000]" />
      ),
      href: "https://www.youtube.com/@silence_codes",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-[#E4405F]" />
      ),
      href: "https://www.instagram.com/silence.eng/",
    },
  ];
  const text1 = t("floatingText.headline", "Learn how hackers think");
  const text2 = t("floatingText.description", "Follow our daily research on real attacks and cyber threats");
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <p className="text-white text-3xl font-bold tracking-tighter sm:text-5xl text-center">
        {text1}
      </p>
      <p className="text-white mb-4 text-lg text-center">
        {text2}
      </p>
      <FloatingDock
        items={links}
      />
    </div>
  );
}
