"use client";

import React from "react";

const SupremeBox3D = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center" style={{ perspective: "1200px" }}>
      <style jsx>{`
        .supreme-cube-container {
          transform-style: preserve-3d;
          animation: spin-flip 20s linear infinite;
          width: 220px;
          height: 220px;
          position: relative;
        }

        @keyframes spin-flip {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          25% { transform: rotateX(90deg) rotateY(90deg) rotateZ(0deg); }
          50% { transform: rotateX(180deg) rotateY(180deg) rotateZ(90deg); }
          75% { transform: rotateX(270deg) rotateY(270deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(0deg); }
        }

        .face {
          position: absolute;
          width: 220px;
          height: 220px;
          background: rgba(168, 85, 247, 0.1); 
          border: 1px solid rgba(168, 85, 247, 0.3);
          backdrop-filter: blur(4px);
          backface-visibility: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 30px rgba(168, 85, 247, 0.15);
          user-select: none;
        }

        .face-content {
           text-align: center;
           color: white;
           transform: translateZ(1px); /* Prevent z-fighting with face background */
        }
        
        .logo-text {
            font-family: monospace;
            font-weight: 800;
            font-size: 2.5rem;
            line-height: 1;
            letter-spacing: -0.05em;
            text-shadow: 0 0 10px rgba(255,255,255,0.5);
        }

        .sub-text {
            font-family: monospace;
            font-size: 0.8rem;
            letter-spacing: 0.3em;
            margin-top: 0.5rem;
            color: rgba(255,255,255,0.8);
            font-weight: 600;
        }

        .side-text-lg {
             font-family: monospace;
             font-size: 1.2rem;
             font-weight: 700;
             letter-spacing: 0.1em;
        }
        .side-text-sm {
            font-family: monospace;
            font-size: 0.7rem;
            letter-spacing: 0.2em;
             color: rgba(255,255,255,0.7);
        }

        /* Inner glowing core */
        .core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(139, 92, 246, 0.4) 60%, transparent 100%);
          border-radius: 50%;
          filter: blur(20px);
          box-shadow: 0 0 60px rgba(168, 85, 247, 0.6);
          animation: pulse 4s ease-in-out infinite alternate;
        }

        @keyframes pulse {
          0% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
      
      <div className="supreme-cube-container">
        {/* Front */}
        <div className="face" style={{ transform: "translateZ(110px)" }}>
            <div className="face-content">
                <div className="logo-text">./SLNC</div>
                <div className="sub-text">SUPREME</div>
            </div>
        </div>
        
        {/* Back */}
        <div className="face" style={{ transform: "rotateY(180deg) translateZ(110px)" }}>
             <div className="face-content">
                <div className="logo-text">./SLNC</div>
                <div className="sub-text">SUPREME</div>
            </div>
        </div>
        
        {/* Right */}
        <div className="face" style={{ transform: "rotateY(90deg) translateZ(110px)" }}>
             <div className="face-content">
                <div className="side-text-lg" style={{ marginBottom: '0.2rem' }}>VSCODE</div>
                <div className="side-text-sm">EXTENSION</div>
            </div>
        </div>
        
        {/* Left */}
        <div className="face" style={{ transform: "rotateY(-90deg) translateZ(110px)" }}>
            <div className="face-content">
                <div className="side-text-lg" style={{ marginBottom: '0.2rem' }}>VSCODE</div>
                <div className="side-text-sm">EXTENSION</div>
            </div>
        </div>
        
        {/* Top */}
        <div className="face" style={{ transform: "rotateX(90deg) translateZ(110px)" }}>
             <div className="face-content">
                <div className="side-text-lg">SECURE</div>
            </div>
        </div>
        
        {/* Bottom */}
        <div className="face" style={{ transform: "rotateX(-90deg) translateZ(110px)" }}>
             <div className="face-content">
                <div className="side-text-lg">LOCAL</div>
            </div>
        </div>

        <div className="core"></div>
      </div>
    </div>
  );
};

export default SupremeBox3D;
