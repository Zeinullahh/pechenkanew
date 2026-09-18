import React from "react";
import Image from "next/image";
import Link from "next/link";
import EdgeGlowCard from "@/components/EdgeGlowCard";

export default function MediumFeedsWrapper() {
  const posts = [
    // You can replace these with real Medium API data if desired,
    // or keep them as manual featured entries.
    {
      title: "The Future of AI in SOC: Automation vs. Human Insight",
      description: "How AI copilots are transforming security operations centers by handling noise so analysts can focus on threats.",
      link: "https://medium.com/@slnc/future-of-ai-soc",
      date: "Oct 24, 2024",
      image: "/solution/page1.png", // adapting existing assets as placeholders
      tags: ["AI", "Cybersecurity"],
    },
    {
      title: "Building Air-Gapped Environments for LLM Development",
      description: "A technical deep dive into SLNC-env's architecture for keeping sensitive model training completely offline.",
      link: "https://medium.com/@slnc/air-gapped-llm-dev",
      date: "Nov 12, 2024",
      image: "/solution/page2.png",
      tags: ["DevOps", "LLM"],
    },
    {
      title: "Zero-Trust Deployment Pipelines: A Practical Guide",
      description: "Implementing 0-egress CI/CD pipelines that scan every commit before it hits production infrastructure.",
      link: "https://medium.com/@slnc/zero-trust-pipelines",
      date: "Dec 05, 2024",
      image: "/solution/page3.png",
      tags: ["DevSecOps", "Tutorial"],
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, idx) => (
        <a 
          key={idx} 
          href={post.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block h-full"
        >
          <EdgeGlowCard
            mode="static"
            glowColor={idx === 1 ? "#34D399" : "#60A5FA"}
            secondaryGlowColor="rgba(255,255,255,0.1)"
            outerClassName="group h-full rounded-3xl p-[1px] transition-transform duration-300 hover:-translate-y-1"
            innerClassName="rounded-[23px] bg-black/40 h-full overflow-hidden flex flex-col group-hover:bg-black/50 transition-colors"
          >
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden border-b border-white/5">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-4 flex gap-2">
                {post.tags.map(tag => (
                   <span key={tag} className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-white/10 backdrop-blur-md rounded text-white/90 border border-white/10">
                     {tag}
                   </span>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1 gap-3 relative">
               <div className="text-xs text-white/50 font-medium">{post.date}</div>
               <h3 className="text-lg font-bold text-white leading-tight group-hover:text-blue-300 transition-colors">
                 {post.title}
               </h3>
               <p className="text-sm text-white/70 line-clamp-3">
                 {post.description}
               </p>
               
               <div className="mt-auto pt-4 flex items-center text-xs font-semibold text-white/60 uppercase tracking-widest group-hover:text-white transition-colors">
                  Read on LinkedIn <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
               </div>
            </div>
          </EdgeGlowCard>
        </a>
      ))}
    </div>
  );
}