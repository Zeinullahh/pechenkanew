"use client";

import React from "react";

const Supreme2D = () => {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center p-10" style={{ perspective: "1000px" }}>
      <style jsx>{`
        .cube-wrapper {
          position: relative;
          width: 140px;
          height: 140px;
          transform-style: preserve-3d;
          /* The angle: Isometric view matching the reference picture */
          /* transform: rotateX(25deg) rotateY(-40deg); REMOVED static transform */
          animation: spin-flip-2d 20s linear infinite;
        }

        @keyframes spin-flip-2d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        .face {
          position: absolute;
          width: 140px;
          height: 140px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(1px); 
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px; /* Slight rounded corners for the outer box */
        }

        /* Face positions */
        .front  { transform: translateZ(70px); }
        .back   { transform: rotateY(180deg) translateZ(70px); }
        .right  { transform: rotateY(90deg) translateZ(70px); }
        .left   { transform: rotateY(-90deg) translateZ(70px); }
        .top    { transform: rotateX(90deg) translateZ(70px); background: rgba(255, 255, 255, 0.06); } 
        .bottom { transform: rotateX(-90deg) translateZ(70px); }

        /* Inner Glowing Cube */
        .core-wrapper {
           width: 70px;
           height: 70px;
           position: absolute;
           top: 35px; left: 35px;
           transform-style: preserve-3d;
           /* Floating animation */
           animation: float-inner 5s ease-in-out infinite;
           transform: translateZ(0); 
        }

        .core-face {
            position: absolute;
            width: 70px;
            height: 70px;
            background: rgba(139, 92, 246, 0.5); /* Violet-500 equivalent */
            border: 1px solid rgba(167, 139, 250, 0.4);
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
            backdrop-filter: blur(4px);
            border-radius: 12px;
       }

       /* Core faces need to be closer together */
       .cf-front  { transform: translateZ(35px); }
       .cf-back   { transform: rotateY(180deg) translateZ(35px); }
       .cf-right  { transform: rotateY(90deg) translateZ(35px); }
       .cf-left   { transform: rotateY(-90deg) translateZ(35px); }
       .cf-top    { transform: rotateX(90deg) translateZ(35px); background: rgba(167, 139, 250, 0.6); }
       .cf-bottom { transform: rotateX(-90deg) translateZ(35px); }

       /* Core Glow Animation -- REMOVED per user request
       @keyframes breathe-core-glow {
           0%, 100% { opacity: 0.3; transform: scale(1.5); }
           50% { opacity: 0.6; transform: scale(1.8); }
       }
       */
       
       @keyframes float-inner {
           0%, 100% { transform: translateY(-4px); }
           50% { transform: translateY(4px); }
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
            
            {/* Inner light source / Volumetric glow - REMOVED */}
            {/* <div className="absolute inset-0 bg-purple-600 blur-[30px] rounded-full animate-pulse" 
                 style={{ transform: 'scale(1.5)', zIndex: -1 }}></div> */}
        </div>

        {/* Outer Glass Cube - Rendered AFTER so it wraps the inner one (transparency order matters somewhat in CSS 3D typically, but we'll see)
            Actually, CSS doesn't do true depth sorting for intersecting planes perfectly. 
            Since the outer cube is larger, it should generally wrap the inner one.
        */}
        <div className="face front">
            <div className="flex flex-col items-center justify-center transform translate-z-[1px]">
              <span className="font-mono text-3xl font-bold text-white tracking-widest">./SLNC</span>
              <span className="text-[10px] tracking-[0.4em] text-purple-100 mt-2 font-semibold uppercase opacity-80">Supreme</span>
           </div>
        </div>
        <div className="face back"></div>
        <div className="face right">
            <div className="flex flex-col items-center justify-center transform translate-z-[1px] rotate-0 px-1 text-center">
                <span className="text-[7px] font-black tracking-[0.15em] text-purple-300 uppercase border-b border-white/20 pb-1 mb-1 leading-tight">WORLD'S FIRST</span>
                <span className="text-[6px] font-bold tracking-[0.1em] text-white/90 uppercase leading-snug">MCP-BASED</span>
            </div>
        </div>
        <div className="face left"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
      </div>
    </div>
  );
};

export default Supreme2D;
