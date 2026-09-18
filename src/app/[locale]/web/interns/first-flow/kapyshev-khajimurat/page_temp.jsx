"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Supreme2D from "@/components/Supreme2D";
import RequestDemoModal from "@/components/RequestDemoModal";
import { Download } from "lucide-react";

export default function CertificatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#01091C] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
        
       {/* Background Elements (Hidden on Print) */}
        <div className="fixed inset-0 pointer-events-none print:hidden">
             <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
        </div>

      <div className="print:hidden">
        <Header onOpenModal={openModal} />
      </div>
      
      <main className="relative flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 z-10 w-full print:p-0 print:h-screen print:justify-center">
        
        {/* Floating Abstracts (Hidden on Print) */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-32 right-10 lg:right-32 opacity-30 scale-75 lg:scale-100 pointer-events-none hidden md:block print:hidden"
        >
           <Supreme2D />
        </motion.div>

        {/* Controls (Hidden on Print) */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-24 right-8 z-50 print:hidden"
        >
            <button 
                onClick={handlePrint}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all active:scale-95 font-semibold"
            >
                <Download size={18} />
                <span>Download PDF</span>
            </button>
        </motion.div>

        {/* Certificate Container 
            We use a scaling wrapper for the viewport fit, but full size for print
        */}
        <div className="relative w-full flex justify-center items-center certificate-wrapper">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative print:transform-none w-full flex justify-center"
            >
                {/* The Certificate Card */}
                {/* Fixed aspect ratio container for 'A4 Landscape' like feel approx 1.414 */}
                <div className="relative w-full max-w-[1100px] aspect-[1.414/1] bg-[#050B14] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_60px_-15px_rgba(0,0,0,0.5)] print:shadow-none print:border-4 print:border-double print:border-gray-300 print:rounded-none print:w-full print:h-full print:max-w-none print:bg-white text-slate-900 certificate-card flex flex-col">
                    
                    {/* Background for Web (Dark) */}
                    <div className="absolute inset-0 bg-[#01091C] print:hidden"></div>
                    
                    {/* Background for Print (White/Light) */}
                    {/* We rely on browser settings for background printing or keep it minimal */}
                    
                    {/* Inner Content Wrapper */}
                    <div className="relative h-full w-full flex flex-col items-center justify-between p-12 md:p-16 print:p-8 z-20 text-white print:text-black">
                        
                         {/* Subtle Grain/Texture Overlay */}
                        <div className="absolute inset-0 bg-white/5 opacity-50 pointer-events-none mix-blend-overlay print:hidden" />

                        {/* Border Decoration */}
                        <div className="absolute inset-4 border border-white/20 rounded-[1.5rem] pointer-events-none print:inset-0 print:border-none" />
                        <div className="absolute inset-4 border border-blue-500/20 rounded-[1.5rem] pointer-events-none print:hidden blur-[1px]" />

                        {/* Top Section: Logo & Header */}
                        <div className="flex flex-col items-center gap-6 w-full mt-4 flex-shrink-0">
                            {/* Logo */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-2 print:shadow-none print:bg-transparent print:border-2 print:border-gray-900">
                                <span className="text-2xl font-bold italic text-white print:text-black">S</span>
                            </div>

                            <div className="text-center space-y-2">
                                <p className="text-sm font-bold uppercase tracking-[0.4em] text-blue-300 print:text-slate-600">
                                    Silence Internship Program
                                </p>
                                <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-white mb-2 print:text-black">
                                    Certificate of Completion
                                </h1>
                                <div className="h-[2px] w-24 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent print:bg-slate-800" />
                            </div>
                        </div>

                        {/* Middle Section: Recipient */}
                        <div className="flex flex-col items-center justify-center flex-grow py-8 w-full">
                            <p className="text-white/60 text-lg uppercase tracking-widest font-light mb-6 print:text-slate-500">
                                This is to certify that
                            </p>
                            
                            <div className="relative">
                                {/* Glow behind name */}
                                <div className="absolute -inset-8 bg-blue-500/20 blur-3xl rounded-full opacity-50 print:hidden" />
                                <h2 className="relative text-4xl md:text-6xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-100 via-white to-blue-100 print:text-black print:bg-none pb-4">
                                    Kapyshev Khajimurat
                                </h2>
                            </div>

                            <div className="max-w-2xl text-center mt-8 space-y-4">
                                <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed print:text-slate-800">
                                    Has successfully completed the <span className="font-semibold text-blue-300 print:text-slate-900">First Internship Flow</span> at Silence.
                                </p>
                                <p className="text-white/60 print:text-slate-600 text-lg">
                                    Winter Internship Batch • Developed secure software solutions
                                </p>
                            </div>
                             
                            <div className="mt-8 flex items-center gap-4 text-blue-200/80 font-mono text-sm uppercase tracking-wider print:text-slate-600 print:border p-2 print:border-slate-300 rounded-lg">
                                <span>Dec 9, 2025</span>
                                <span className="w-8 h-[1px] bg-white/20 print:bg-slate-400"></span>
                                <span>Mar 9, 2026</span>
                            </div>
                        </div>

                        {/* Bottom Section: Signatures & Details */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-end border-t border-white/10 pt-8 mb-4 print:border-black/10 flex-shrink-0">
                            
                            {/* Left: ID */}
                            <div className="text-center md:text-left order-2 md:order-1">
                                <p className="text-[10px] uppercase tracking-widest text-white/40 print:text-slate-400 mb-1">
                                    Certificate ID
                                </p>
                                <p className="font-mono text-sm text-blue-300 print:text-slate-800 font-bold">
                                    SLNC-INT-26-0903-KK
                                </p>
                            </div>

                            {/* Center: Seal */}
                            <div className="flex justify-center order-3 md:order-2">
                                <div className="w-24 h-24 relative opacity-80 print:opacity-100 print:grayscale-0">
                                   <div className="absolute inset-0 border-2 border-white/20 border-dashed rounded-full animate-spin-slow print:border-slate-300 print:animate-none"></div>
                                   <div className="absolute inset-0 flex items-center justify-center">
                                       <div className="text-center">
                                           <span className="text-[0.6rem] uppercase font-bold tracking-widest block text-blue-300 print:text-slate-800">Silence</span>
                                           <span className="text-[0.5rem] uppercase tracking-wider text-white/50 print:text-slate-500">Verified</span>
                                       </div>
                                   </div>
                                </div>
                            </div>

                            {/* Right: Signature */}
                            <div className="flex flex-col items-center md:items-end order-1 md:order-3">
                                <div className="relative w-48 h-24 mb-2 filter brightness-100 contrast-125 print:filter-none">
                                    <Image 
                                        src="/signature/signaturegen-1772818216691.png"
                                        alt="Signature of CEO"
                                        fill
                                        className="object-contain"
                                        style={{ filter: "brightness(2) contrast(1.2)" }} 
                                    />
                                </div>
                                <div className="text-center md:text-right">
                                    <p className="text-lg font-serif text-white print:text-black">Zeinullah Iman</p>
                                    <p className="text-xs uppercase tracking-[0.2em] text-blue-400/80 print:text-slate-600">CEO of Silence</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

      </main>

      <div className="print:hidden">
        <Footer />
      </div>
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

        /* Responsive Scaling Logic */
        .certificate-wrapper {
            width: 100%;
            padding: 2rem;
            min-height: calc(100vh - 200px); 
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
            }
            .certificate-wrapper {
                width: 100%;
                height: 100%;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .certificate-card {
                width: 100% !important;
                height: 100% !important;
                max-width: none !important;
                border: 2px solid #ccc !important;
                box-shadow: none !important;
                transform: none !important;
                background-color: white !important;
                color: black !important;
            }
            
            /* Invert the signature image specifically for print if it's white on transparent */
            img[alt="Signature of CEO"] {
                filter: invert(1) brightness(0) !important;
            }
        }
      `}</style>
    </div>
  );
}
