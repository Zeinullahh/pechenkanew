"use client";

import React from "react";

const SupremeHeroBox = () => {
  return (
    <div className="relative w-full h-[320px] flex items-center justify-center pointer-events-none select-none" style={{ perspective: "1000px" }}>
      <style jsx>{`
        .cube-wrapper {
          position: relative;
          width: 220px;
          height: 220px;
          transform-style: preserve-3d;
          animation: spin-flip-hero 20s linear infinite;
        }

        @keyframes spin-flip-hero {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        .face {
          position: absolute;
          width: 220px;
          height: 220px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(2px); 
          box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 28px;
        }

        /* Face positions (translateZ = width/2 = 110px) */
        .front  { transform: translateZ(110px); }
        .back   { transform: rotateY(180deg) translateZ(110px); }
        .right  { transform: rotateY(90deg) translateZ(110px); }
        .left   { transform: rotateY(-90deg) translateZ(110px); }
        .top    { transform: rotateX(90deg) translateZ(110px); background: rgba(255, 255, 255, 0.06); } 
        .bottom { transform: rotateX(-90deg) translateZ(110px); }

        /* Inner Glowing Cube */
        .core-wrapper {
           width: 110px;
           height: 110px;
           position: absolute;
           top: 55px; left: 55px;
           transform-style: preserve-3d;
           animation: float-inner 5s ease-in-out infinite;
           transform: translateZ(0); 
        }

        .core-face {
            position: absolute;
            width: 110px;
            height: 110px;
            background: rgba(139, 92, 246, 0.5);
            border: 1px solid rgba(167, 139, 250, 0.4);
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
            backdrop-filter: blur(6px);
            border-radius: 16px;
       }

       /* Core faces need to be closer together (translateZ = 55px) */
       .cf-front  { transform: translateZ(55px); }
       .cf-back   { transform: rotateY(180deg) translateZ(55px); }
       .cf-right  { transform: rotateY(90deg) translateZ(55px); }
       .cf-left   { transform: rotateY(-90deg) translateZ(55px); }
       .cf-top    { transform: rotateX(90deg) translateZ(55px); background: rgba(167, 139, 250, 0.6); }
       .cf-bottom { transform: rotateX(-90deg) translateZ(55px); }
       
       @keyframes float-inner {
           0%, 100% { transform: translateY(-6px); }
           50% { transform: translateY(6px); }
       }
      `}</style>
      
      <div className="cube-wrapper">
        {/* Internal Glowing Cube */}
        <div className="core-wrapper">
            <div className="core-face cf-front"></div>
            <div className="core-face cf-back"></div>
            <div className="core-face cf-right"></div>
            <div className="core-face cf-left"></div>
            <div className="core-face cf-top"></div>
            <div className="core-face cf-bottom"></div>
        </div>

        {/* Outer Glass Cube */}
        <div className="face front">
            <div className="flex flex-col items-center justify-center transform translate-z-[1px]">
              <span className="font-mono text-5xl font-bold text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">./SLNC</span>
              <span className="text-lg tracking-[0.4em] text-purple-100 mt-3 font-semibold uppercase opacity-80">Supreme</span>
           </div>
        </div>
        <div className="face back"></div>
        <div className="face right">
            <div className="flex flex-col items-center justify-center transform translate-z-[1px] rotate-0 px-2 text-center">
                <span className="text-[10px] font-black tracking-[0.15em] text-purple-300 uppercase border-b border-white/20 pb-1.5 mb-1.5 leading-tight shadow-md">WORLD'S FIRST</span>
                <span className="text-[9px] font-bold tracking-[0.1em] text-white/90 uppercase leading-snug">MCP-BASED</span>
            </div>
        </div>
        <div className="face left"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
      </div>
    </div>
  );
};

export default SupremeHeroBox;
