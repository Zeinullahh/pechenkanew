"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Supreme2D from "@/components/Supreme2D";
import RequestDemoModal from "@/components/RequestDemoModal";


const Signature = () => (
    <div className="flex flex-col items-center justify-center group cursor-pointer" title="Signed by CEO">
        <svg
            width="200"
            height="100"
            viewBox="0 0 200 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-400 -rotate-6 filter drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"
        >
            <path
                d="M40 50 C 40 50, 45 30, 60 40 C 75 50, 50 80, 80 60 C 100 45, 120 40, 140 50 C 160 60, 150 70, 180 50"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                className="path-animate"
            />
             <path
                d="M 50 70 L 160 65"
                stroke="currentColor"
                strokeWidth="1.5"
                 strokeLinecap="round"
                 className="opacity-60 path-animate delay-100"
            />
        </svg>
        <div className="mt-1 text-center font-serif">
            <p className="text-xl text-white/90 font-medium tracking-wide">Zeinullah Iman</p>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-400/80 mt-1">CEO of Silence</p>
        </div>
    </div>
);


export default function CertificatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#01091C] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      
       {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
             <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
        </div>

      <Header onOpenModal={openModal} />
      
      <main className="relative flex flex-col items-center justify-center min-h-screen py-24 px-4 sm:px-6 z-10 w-full">
        
        {/* Floating Abstracts */}
        
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-32 right-10 lg:right-32 opacity-30 scale-75 lg:scale-100 pointer-events-none hidden md:block"
        >
           <Supreme2D />
        </motion.div>



        {/* Certificate Container */}
        <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-5xl"
        >
            {/* The Glass Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_-15px_rgba(0,0,0,0.5)]">
                
                {/* Inner Glow Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-50 pointer-events-none" />
                
                {/* Horizontal Gradient Line Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />

                <div className="relative p-10 md:p-20 flex flex-col items-center text-center space-y-12">
                    
                    {/* Header */}
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center gap-4"
                        >
                            {/* Logo Placeholder (Simple Circle or actual logo if available) */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center ring-4 ring-white/5 shadow-lg shadow-blue-500/20 mb-2">
                                <span className="text-2xl font-bold italic">S</span>
                            </div>

                            <span className="text-sm md:text-base font-bold uppercase tracking-[0.4em] text-blue-300">
                                Silence Internship Program
                            </span>
                        </motion.div>

                        <h1 className="text-4xl md:text-7xl font-serif tracking-tight text-white drop-shadow-lg">
                            Certificate of Completion
                        </h1>
                        
                        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto opacity-70" />
                    </div>

                    {/* Recipient */}
                    <div className="space-y-4 py-2 w-full">
                        <p className="text-white/50 text-lg uppercase tracking-widest font-light">Presented to</p>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                            className="relative inline-block"
                        >
                             <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-full opacity-50" />
                             <h2 className="relative text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white pb-2 selection:bg-purple-500/30">
                                Kapyshev Khajimurat
                             </h2>
                        </motion.div>
                    </div>

                    {/* Description */}
                    <div className="max-w-3xl mx-auto space-y-6 text-white/80 leading-relaxed text-lg md:text-xl font-light">
                        <p>
                            For successfully completing the <span className="text-blue-300 font-medium">First Internship Flow</span> at Silence.
                            Demonstrating outstanding technical skills, creativity, and dedication during the Winter Internship Batch.
                        </p>
                        <div className="flex justify-center items-center gap-2 text-sm md:text-base font-mono text-blue-200/60 uppercase tracking-wider border border-white/5 bg-white/5 px-6 py-2 rounded-full mx-auto w-fit">
                            <span>Dec 9, 2025</span>
                            <span>—</span>
                            <span>Mar 9, 2026</span>
                        </div>
                    </div>

                    {/* Footer / Signature */}
                    <div className="pt-16 w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 items-end">
                        
                        {/* ID */}
                        <div className="text-center md:text-left order-2 md:order-1">
                             <div className="inline-block p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md">
                                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Certificate ID</p>
                                <p className="font-mono text-sm text-blue-300">SLNC-INT-25-01-KK</p>
                             </div>
                        </div>

                        {/* Seal */}
                         <div className="text-center flex justify-center order-3 md:order-2">
                             <div className="relative w-32 h-32 flex items-center justify-center">
                                 <div className="absolute inset-0 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                                 <div className="absolute inset-2 border border-blue-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                                     <span className="text-[8px] uppercase tracking-[0.2em] text-white/40 text-center font-bold">
                                         Official<br/>Silence<br/>Document
                                     </span>
                                 </div>
                             </div>
                        </div>

                        {/* Signature */}
                        <div className="text-center md:text-right flex flex-col items-center md:items-end order-1 md:order-3">
                            <Signature />
                        </div>
                    </div>

                </div>
            </div>
            
             {/* Bottom Reflection */}
             <div className="absolute -bottom-8 left-10 right-10 h-12 bg-gradient-to-t from-blue-500/10 to-transparent blur-xl rounded-full opacity-40 pointer-events-none" />
        </motion.div>

      </main>

      <Footer />
      <RequestDemoModal isOpen={isModalOpen} onClose={closeModal} />
      
      <style jsx global>{`
        @keyframes draw {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .path-animate {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw 2s ease-out forwards 0.8s;
        }
      `}</style>
    </div>
  );
}
