"use client";
import React, { useState } from 'react';
import GlowButton from './GlowButton.jsx';
import TooltipCard from './TooltipCard';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = ({ onOpenModal }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const { t } = useLanguage();
  const fullText = t("hero.headline", "AI-CSD — AI-Powered Cybersecurity Department");

  const tooltipContent = {
    "web-attack-protection": {
      title: t("hero.tooltips.web.title", "Web Attack Protection"),
      content: t(
        "hero.tooltips.web.content",
        "Protection against major web attacks including DDoS, SQL injection, and other network threats. Business logic vulnerabilities are not included."
      ),
    },
    "email-attack-protection": {
      title: t("hero.tooltips.email.title", "Email Attack Protection"),
      content: t(
        "hero.tooltips.email.content",
        "AI analyzes incoming and outgoing emails to detect phishing, spoofing attempts, malicious links, and other email-based attacks."
      ),
    },
    "unified-monitoring": {
      title: t("hero.tooltips.unified.title", "Unified security monitoring and threat detection"),
      content: t(
        "hero.tooltips.unified.content",
        "AI-CSD provides centralized monitoring of web infrastructure and email communications within a single security platform."
      ),
    },
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-14 leading-tight text-white text-center">
        {fullText}
      </h1>
      <div className="flex flex-col lg:flex-row items-center gap-14">
        <div className="w-full lg:w-1/2 text-white lg:mt-0">
          <p className="font-bold mb-4 text-base sm:text-lg">
          {t(
            "hero.subheading",
            "A unified AI cybersecurity platform that combines Web Security and Email Security in a single control center."
          )}
        </p>
        <div className="space-y-4 mb-8">
          {[
            {
              key: "web-attack-protection",
              label: t("hero.bullets.web", "Real-time protection for web infrastructure and APIs"),
            },
            {
              key: "email-attack-protection",
              label: t("hero.bullets.email", "Advanced protection against phishing, spoofing, and malicious email threats"),
            },
            {
              key: "unified-monitoring",
              label: t("hero.bullets.unified", "Unified security monitoring and threat detection"),
            },
          ].map((item) => (
            <div key={item.key} className="flex items-start sm:items-center gap-2 text-sm sm:text-base">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span className="leading-snug">{item.label}</span>
              <div
                className="relative hidden sm:flex items-start flex-shrink-0"
                onMouseEnter={() => setActiveTooltip(item.key)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {activeTooltip === item.key && (
                  <TooltipCard className="z-[9999] w-72 sm:w-80 max-w-[calc(100vw-3rem)] rounded-2xl border border-white/20 bg-black/90 backdrop-blur-xl p-4 text-white shadow-2xl">
                    <h4 className="mb-2 font-bold text-white">{tooltipContent[item.key].title}</h4>
                    <p className="text-sm text-gray-200">{tooltipContent[item.key].content}</p>
                  </TooltipCard>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <GlowButton onClick={onOpenModal} className="w-full sm:w-auto">
            {t("header.cta.get", "Get Started")}
          </GlowButton>
        </div>
      </div>
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0 relative flex justify-center lg:justify-end">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(14,165,233,0.45)]">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/bkWexp4vku8"
              title="AI-CSD Video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Hero;