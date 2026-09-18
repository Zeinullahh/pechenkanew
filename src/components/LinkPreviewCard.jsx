"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * LinkPreviewCard - Automatically fetches and displays Open Graph metadata from any URL
 * Similar to how WhatsApp/Telegram shows link previews
 * 
 * Usage: Just pass a URL and it will automatically fetch title, image, and description
 */
export default function LinkPreviewCard({ url, index = 0 }) {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/og-metadata?url=${encodeURIComponent(url)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch metadata');
        }
        
        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        console.error('Error fetching metadata:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchMetadata();
    }
  }, [url]);

  // Get a proxy URL for images that might have CORS issues
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    // If it's already a relative URL, return as is
    if (imageUrl.startsWith('/')) return imageUrl;
    // Return the image URL directly - most OG images allow cross-origin
    return imageUrl;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/5 backdrop-blur-xl h-full">
        <div className="relative aspect-[16/9] w-full bg-white/5 animate-pulse" />
        <div className="flex flex-1 flex-col p-5 space-y-3">
          <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
          <div className="h-6 bg-white/10 rounded animate-pulse" />
          <div className="h-4 bg-white/10 rounded animate-pulse w-full" />
          <div className="h-4 bg-white/10 rounded animate-pulse w-2/3" />
        </div>
      </div>
    );
  }

  // Error state - still show a clickable card
  if (error || !metadata) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/5 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-white/10 h-full"
      >
        <div className="relative aspect-[16/9] w-full bg-[#202020] flex items-center justify-center">
          <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-sm text-white/50 mb-2">External Article</p>
          <p className="text-white/70 text-sm break-all">{url}</p>
        </div>
      </a>
    );
  }

  const { title, description, image, siteName, author, readTime, publishDate } = metadata;
  const displayImage = getImageUrl(image);

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/5 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-white/10 h-full"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#202020]">
        {displayImage && !imageError ? (
          <img
            src={displayImage}
            alt={title || 'Article preview'}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-[#202020]">
            {/* Decorative pattern for missing image */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-20 h-20 border border-white/20 rounded-lg rotate-12" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border border-white/20 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-xl rotate-45" />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              {siteName && (
                <span className="text-xs text-white/40 font-medium">{siteName}</span>
              )}
            </div>
          </div>
        )}
        
        {/* Source badge */}
        {siteName && displayImage && !imageError && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 border border-white/10">
            <span className="text-xs font-medium text-white/90">{siteName}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta info */}
        <div className="flex items-center gap-2 text-xs text-white/50 mb-3 flex-wrap">
          {author && <span>{author}</span>}
          {author && (publishDate || readTime) && <span>•</span>}
          {publishDate && <span>{publishDate}</span>}
          {publishDate && readTime && <span>•</span>}
          {readTime && <span>{readTime}</span>}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {title || 'Untitled Article'}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-white/60 line-clamp-2 flex-grow">
            {description}
          </p>
        )}

        {/* Read more indicator */}
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
          <span>Read article</span>
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}
