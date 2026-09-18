"use client";
import React from 'react';

const LoadingSpinner = ({ isLoading }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
        isLoading
          ? 'backdrop-blur-md opacity-100 visible'
          : 'backdrop-blur-0 opacity-0 invisible pointer-events-none'
      }`}
    >
      <div className="relative w-[54px] h-[54px]">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[5.4px] h-[13.5px] bg-white/90 rounded-[3px] left-1/2 top-1/2 origin-center"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-200%)`,
              animation: `sonner-spin 1.2s linear infinite`,
              animationDelay: `${-1.2 + i * 0.1}s`,
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes sonner-spin {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.15;
          }
        }
        
        .absolute {
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
