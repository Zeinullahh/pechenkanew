"use client";

import React, { useState } from "react";
import Image from "next/image";
import EdgeGlowCard from "@/components/EdgeGlowCard";

/**
 * MediumArticleCard Component
 * Displays an article with image, title, description, and metadata
 * For static export compatibility, requires manual metadata or uses fallbacks
 */
export default function MediumArticleCard({ article, index = 0 }) {
  const glowColors = ["#8B5CF6", "#EC4899", "#3B82F6", "#10B981"];
  const glowColor = glowColors[index % glowColors.length];
  
  // Handle both string URLs and objects
  const articleData = typeof article === 'string' ? { url: article } : article;
  
  const [imageError, setImageError] = useState(false);
  
  // Extract data with fallbacks
  const title = articleData.title || "Featured Article";
  const description = articleData.description || "Click to read the full article from Silence.";
  const url = articleData.url;
  
  // For LinkedIn posts, try to construct OG image URL
  // LinkedIn OG images typically follow a pattern, but may not always work due to CORS
  const getImageUrl = () => {
    if (articleData.image) return articleData.image;
    
    // For LinkedIn posts, use a fallback gradient instead of trying to fetch
    if (url?.includes('linkedin.com')) {
      return null; // Will show gradient background
    }
    
    return "/solution/page1.png";
  };
  
  const image = getImageUrl();
  const date = articleData.date || "Recent";
  const readTime = articleData.readTime || "2 min read";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <EdgeGlowCard
        mode="follow"
        glowColor={glowColor}
        secondaryGlowColor="rgba(255,255,255,0.2)"
        outerClassName="group h-full rounded-[26px] p-[1px]"
        innerClassName="h-full overflow-hidden rounded-[24px] bg-black"
        glass={false}
      >
        <div className="relative z-10 h-full flex flex-col">
          {/* Article Image */}
          {!imageError && image && (
            <div className="relative h-48 w-full overflow-hidden rounded-t-[23px]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          )}

          {/* Article Content */}
          <div className="p-6 flex flex-col flex-grow gap-3">
            {/* Meta info */}
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span>{date}</span>
              <span>•</span>
              <span>{readTime}</span>
            </div>

            {/* Title */}
            <h3 className="line-clamp-2 text-xl font-semibold text-white">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/70 line-clamp-3 flex-grow">
              {description}
            </p>

            {/* Read more link */}
            <div className="mt-auto flex items-center gap-2 pt-4 text-sm font-semibold text-blue-300">
              Read on LinkedIn
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </EdgeGlowCard>
    </a>
  );
}
