"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
// Footer removed to avoid duplication with LayoutWrapper
import Supreme2D from "@/components/Supreme2D";
import RequestDemoModal from "@/components/RequestDemoModal";
import { Download } from "lucide-react";

export default function CertificatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const handleResize = () => {
      const targetWidth = 1100;
      const availableWidth = window.innerWidth * 0.95; 
      const availableHeight = (window.innerHeight - 150) * 0.95;

      const scaleW = availableWidth / targetWidth;
      const targetHeight = targetWidth / 1.414;
      const scaleH = availableHeight / targetHeight;

      const newScale = Math.min(1, scaleW, scaleH);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#01091C] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden flex flex-col relative">
        
       {/* Background Elements (Hidden on Print) */}
        <div className="fixed inset-0 pointer-events-none print:hidden z-0">
             <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
        </div>

      {/* Header hidden on print */}
      <div className="print:hidden relative z-20">
        <Header onOpenModal={openModal} />
      </div>
      
      {/* Main Content */}
      <main className="relative flex-grow flex flex-col items-center justify-start pt-0 px-4 sm:px-6 z-10 w-full print:p-0 print:h-screen print:justify-center overflow-hidden">
        
        {/* Floating Abstracts (Hidden on Print) */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-32 right-10 lg:right-32 opacity-30 scale-75 lg:scale-100 pointer-events-none hidden md:block print:hidden"
        >
           <Supreme2D />
        </motion.div>

        {/* Print Button */}
        <div className="fixed top-24 right-8 z-50 print:hidden">
            <button 
                onClick={handlePrint}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all active:scale-95 font-semibold"
            >
                <Download size={18} />
                <span>Download PDF</span>
            </button>
        </div>

        {/* Certificate Wrapper */}
        <div className="relative w-full flex justify-center items-start certificate-wrapper" style={{ marginTop: '0px' }}>
            <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: scale }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative print:!scale-100 print:!transform-none origin-top-center"
                style={{ transformOrigin: 'top center' }}
            >
                {/* The Certificate Card - New Color: Dark Slate Blue Gradient */}
                <div 
                    className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] print:shadow-none print:border-4 print:border-double print:border-gray-300 print:rounded-none print:w-full print:h-full print:max-w-none print:bg-white text-slate-900 certificate-card flex flex-col"
                    style={{ 
                        width: '1100px', 
                        aspectRatio: '1.414/1',
                    }}
                >
                    
                    {/* Background Pattern for Web */}
                    <div className="absolute inset-0 opacity-30 print:hidden pointer-events-none">
                        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
                    </div>
                    
                    {/* Inner Content Wrapper */}
                    <div className="relative h-full w-full flex flex-col items-center justify-between p-16 print:p-8 z-20 text-white print:text-black">
                        
                        {/* Decorative Corner Accents */}
                        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-blue-400/30 rounded-tl-3xl pointer-events-none print:border-black/20"></div>
                        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-blue-400/30 rounded-tr-3xl pointer-events-none print:border-black/20"></div>
                        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-blue-400/30 rounded-bl-3xl pointer-events-none print:border-black/20"></div>
                        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-blue-400/30 rounded-br-3xl pointer-events-none print:border-black/20"></div>

                        {/* Top Section: Logo & Header */}
                        <div className="flex flex-col items-center gap-6 w-full mt-4 flex-shrink-0">
                             {/* Correct Logo from Project (Assuming /logo.svg or similar works, fallback to text if image fails) */}
                             <div className="relative w-48 h-12 mb-2 print:filter-none">
                                <Image 
                                    src="/logo.svg" 
                                    alt="Silence Logo" 
                                    fill
                                    className="object-contain print:invert"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                                {/* Fallback if logo not found */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
                                     <span className="text-2xl font-bold italic">Silence</span>
                                </div>
                             </div>

                            <div className="text-center space-y-2 relative">
                                <p className="text-sm font-bold uppercase tracking-[0.4em] text-blue-300 print:text-slate-600">
                                    Silence Internship Program
                                </p>
                                <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-white mb-2 print:text-black drop-shadow-md">
                                    Certificate of Completion
                                </h1>
                                <div className="h-[2px] w-32 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent print:bg-slate-800" />
                            </div>
                        </div>

                        {/* Middle Section: Recipient */}
                        <div className="flex flex-col items-center justify-center flex-grow py-4 w-full">
                            <p className="text-white/70 text-lg uppercase tracking-widest font-light mb-6 print:text-slate-500">
                                This is to certify that
                            </p>
                            
                            <div className="relative z-10">
                                {/* Glow behind name */}
                                <div className="absolute -inset-10 bg-blue-500/20 blur-3xl rounded-full opacity-60 print:hidden" />
                                <h2 className="relative text-6xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white print:text-black print:bg-none pb-4 filter drop-shadow-lg">
                                    Kapyshev Khajimurat
                                </h2>
                            </div>

                            <div className="max-w-3xl text-center mt-6 space-y-4 relative z-10">
                                <p className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed print:text-slate-800">
                                    Has successfully completed the <span className="font-semibold text-blue-300 print:text-slate-900">First Internship Flow</span> at Silence.
                                </p>
                                <p className="text-white/60 print:text-slate-600 text-lg">
                                    Winter Internship Batch • Developed secure software solutions
                                </p>
                            </div>
                             
                            <div className="mt-8 flex items-center gap-4 text-blue-200/80 font-mono text-sm uppercase tracking-wider print:text-slate-600 print:border p-2 print:border-slate-300 rounded-lg bg-white/5 backdrop-blur-sm px-6 py-2 border border-white/10 print:bg-transparent">
                                <span>Dec 9, 2025</span>
                                <span className="w-8 h-[1px] bg-white/20 print:bg-slate-400"></span>
                                <span>Mar 9, 2026</span>
                            </div>
                        </div>

                        {/* Bottom Section: Signatures & Details */}
                        <div className="w-full grid grid-cols-3 gap-8 items-end border-t border-white/10 pt-8 mb-2 print:border-black/10 flex-shrink-0">
                            
                            {/* Left: ID & Verify URL */}
                            <div className="text-left">
                                <p className="text-[10px] uppercase tracking-widest text-white/40 print:text-slate-400 mb-1">
                                    Certificate ID
                                </p>
                                <p className="font-mono text-sm text-blue-300 print:text-slate-800 font-bold mb-2">
                                    SLNC-INT-26-0903-KK
                                </p>
                                <p className="text-[9px] text-white/30 print:text-slate-500 font-mono break-all max-w-[200px]">
                                    web/interns/first-flow/SLNC-INT-26-0903-KK
                                </p>
                            </div>

                            {/* Center: Seal */}
                            <div className="flex justify-center">
                                <div className="w-28 h-28 relative opacity-90 print:opacity-100 print:grayscale-0">
                                   <div className="absolute inset-0 border-[3px] border-white/20 border-double rounded-full print:border-slate-400"></div>
                                   <div className="absolute inset-2 border border-blue-400/30 rounded-full animate-spin-slow print:animate-none print:border-slate-300"></div>
                                   <div className="absolute inset-0 flex items-center justify-center">
                                       <div className="text-center">
                                           <span className="text-[0.65rem] uppercase font-bold tracking-widest block text-blue-300 print:text-slate-800">Silence</span>
                                           <div className="w-8 h-[1px] bg-white/30 mx-auto my-1 print:bg-slate-400"></div>
                                           <span className="text-[0.55rem] uppercase tracking-wider text-white/50 print:text-slate-500">Official<br/>Document</span>
                                       </div>
                                   </div>
                                </div>
                            </div>

                            {/* Right: Signature */}
                            <div className="flex flex-col items-end">
                                <div className="relative w-56 h-24 mb-1 filter brightness-100 contrast-125 print:filter-none">
                                    <Image 
                                        src="/signature/signaturegen-1772818216691.png"
                                        alt="Signature of CEO"
                                        fill
                                        className="object-contain"
                                        style={{ filter: "brightness(2) contrast(1.2)" }} 
                                    />
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-serif text-white print:text-black">Zeinullah Iman</p>
                                    <p className="text-xs uppercase tracking-[0.2em] text-blue-400/80 print:text-slate-600 mt-1">CEO of Silence</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

      </main>

      {/* Footer Removed (The global layout wrapper likely adds one, so removing from here handles duplication)
          If this page is rendered within the main layout, LayoutWrapper adds a footer.
          However, LayoutWrapper is usually wrapping {children} in layout.jsx.
          This page is a child.
          So LayoutWrapper (parent) renders <Footer />.
          Inside this page, we rendered <Footer /> manually before.
          Removing <Footer /> from here solves the duplication issue.
      */}
      <RequestDemoModal isOpen={isModalOpen} onClose={closeModal} />
      
      {/* Global & Print Styles */}
      <style jsx global>{`
        /* Custom Scrollbar prevention for main page */
        html, body {
            overflow-x: hidden;
        }

        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
        }

        /* Print Specific Styles */
        @media print {
            @page {
                size: landscape;
                margin: 0;
            }
            body { 
                background: white; 
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important; 
            }
            main {
                display: block;
                height: 100vh;
                width: 100vw;
                padding: 0;
                margin: 0;
                overflow: visible;
            }
            .certificate-wrapper {
                width: 100%;
                height: 100%;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 0 !important;
                margin-top: 0 !important;
            }
            .certificate-card {
                width: 100% !important;
                height: 100% !important;
                max-width: none !important;
                border: 2px solid #ccc !important;
                box-shadow: none !important;
                transform: none !important; /* Disable JS scale for print */
                background-color: white !important;
                
                color: black !important;
                /* Remove gradient for print */
                background-image: none !important;
            }
            
            /* Invert the signature image specifically for print if it's white on transparent */
            img[alt="Signature of CEO"] {
                filter: invert(1) brightness(0) !important;
            }
            img[alt="Silence Logo"] {
                filter: invert(1) brightness(0) !important;
            }
        }
      `}</style>
    </div>
  );
}
