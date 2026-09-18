import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import EdgeGlowCard from './EdgeGlowCard';
import { ShieldAlert, Globe, Zap } from 'lucide-react';

const Insights = () => {
  const { t } = useLanguage();
  const items = [
    {
      icon: <ShieldAlert className="w-10 h-10 text-pink-500 mx-auto" />,
      stat: t("aiSocInsights.items.0.stat", "Every 39 seconds"),
      suffix: t("aiSocInsights.items.0.suffix", "a hacker attack occurs"),
      description: t("aiSocInsights.items.0.description", "Global cyberattacks are increasing every year, targeting businesses of all sizes."),
    },
    {
      icon: <Zap className="w-10 h-10 text-cyan-400 mx-auto" />,
      stat: t("aiSocInsights.items.1.stat", "20.5 million"),
      suffix: t("aiSocInsights.items.1.suffix", "DDoS attacks in Q1 2025"),
      description: t("aiSocInsights.items.1.description", "Massive traffic floods can take websites and APIs offline within minutes."),
    },
    {
      icon: <Globe className="w-10 h-10 text-purple-500 mx-auto" />,
      stat: t("aiSocInsights.items.2.stat", "30,000"),
      suffix: t("aiSocInsights.items.2.suffix", "websites are hacked every day"),
      description: t("aiSocInsights.items.2.description", "From startups to enterprise platforms, web infrastructure remains a constant target."),
    },
  ];

  return (
    <div className="pb-16 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase">
          {t("aiSocInsights.title", "THE CYBERSECURITY PROBLEM TODAY")}
        </h2>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-medium">
          {t("aiSocInsights.subtitle", "Modern cyber threats are growing faster than most companies can respond.")}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((insight, index) => (
            <div key={index} className="relative group">
              <EdgeGlowCard
                mode="follow"
                outerClassName="relative z-10 h-full rounded-[26px] p-[1px]"
                innerClassName="flex h-full flex-col justify-start overflow-hidden rounded-[24px] border border-white/10 bg-black p-6 text-center"
                glowColor={index === 0 ? "#ec4899" : index === 1 ? "#22d3ee" : "#a855f7"}
                glass={false}
              >
                <div className="mb-4 opacity-90">
                  {insight.icon}
                </div>
                <h3 className="text-white mb-2 leading-tight">
                  <span className="block text-2xl sm:text-3xl font-bold text-white mb-1">
                    {insight.stat}
                  </span>
                  <span className="block text-sm font-medium text-slate-300">
                    {insight.suffix}
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed font-light">
                  {insight.description}
                </p>
              </EdgeGlowCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;
