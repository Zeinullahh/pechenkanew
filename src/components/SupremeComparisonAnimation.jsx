"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, ShieldCheck, Brain, FileText, User, ArrowDown, Activity, ScrollText } from "lucide-react";

export const SupremeComparisonAnimation = () => {
  return (
    <div className="w-full">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* LIGHT MODE - Manual Process */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
          
          <div className="relative z-10 mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Supreme 2 Light</h3>
              <p className="text-sm text-slate-400">Manual remediation workflow</p>
            </div>
            <div className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
              FREE
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 py-4">
            {/* Step 1: Scan */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 border border-white/10">
                <ShieldCheck className="h-6 w-6 text-slate-300" />
              </div>
              <span className="text-xs text-slate-400">Scan</span>
            </div>

            <ArrowDown className="text-slate-600" />

            {/* Step 2: Report */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-900/30 border border-indigo-500/30">
                <FileText className="h-6 w-6 text-indigo-300" />
              </div>
              <span className="text-xs text-slate-400">Report</span>
            </div>

            <ArrowDown className="text-slate-600" />

            {/* Step 3: Manual Fix */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 border border-white/10">
                <User className="h-6 w-6 text-slate-300" />
              </div>
              <span className="text-xs text-slate-400">Manual Fix</span>
            </div>
          </div>

          <div className="relative z-10 mt-6 rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-200 border border-red-500/20">
            <X className="inline-block h-4 w-4 mr-1 -mt-0.5" />
            No automated fixing loop
          </div>
        </div>

        {/* MAX MODE - Automated Loop with Threat Intel & LLM Report */}
        <div className="relative overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-900/10 to-purple-900/10 p-6 backdrop-blur-xl">
          <div className="absolute inset-0 bg-fuchsia-500/5 blur-3xl" />
          
          <div className="relative z-10 mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Supreme 2 MAX</h3>
              <p className="text-sm text-fuchsia-200">AI-driven auto-fix loop</p>
            </div>
            <div className="rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 px-3 py-1 text-xs font-semibold text-fuchsia-300">
              MCP POWERED
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 py-4">
             
             {/* Step 1: Scan Only */}
             <div className="flex flex-col items-center text-center relative group">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-900/40 border border-fuchsia-500/50 shadow-[0_0_15px_rgba(192,38,211,0.3)]">
                <ShieldCheck className="h-6 w-6 text-fuchsia-300" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-fuchsia-200 leading-tight">Full Repo<br/>Scan</span>
            </div>

            {/* Stream 1 */}
             <div className="flex items-center justify-center">
                 <ArrowDown className="h-4 w-4 text-fuchsia-500/50" />
                 {/* Replaced horizontal animation with vertical logic if desired, or just simpler arrow */}
             </div>

            {/* Step 2: MCP Server & LLM Report */}
            <div className="flex flex-col items-center text-center relative">
               <motion.div 
                 animate={{ y: [2, -2, 2] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-500/20 border border-violet-400/30 px-1.5 py-0.5 rounded text-[8px] text-violet-200 whitespace-normal text-center"
               >
                 JSON Output
               </motion.div>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-violet-900/40 border border-violet-500/50">
                <ScrollText className="h-6 w-6 text-violet-300" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-violet-200 leading-tight">MCP Server<br/><span className="text-blue-300">LLM-Friendly Report</span></span>
            </div>

            {/* Stream 2 */}
             <div className="flex items-center justify-center">
                 <ArrowDown className="h-4 w-4 text-fuchsia-500/50" />
             </div>

            {/* Step 3: LLM Fix */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-900/40 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Brain className="h-6 w-6 text-blue-300" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-blue-200 leading-tight">LLM Reads &<br/><span className="text-green-300">Fixes Code</span></span>
            </div>
          </div>

          <div className="relative z-10 mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-indigo-500/10 p-3 text-center text-xs text-indigo-200 border border-indigo-500/20">
              <Activity className="inline-block h-3 w-3 mr-1.5 -mt-0.5" />
              Runs as MCP Server
            </div>
            <div className="rounded-lg bg-green-500/10 p-3 text-center text-xs text-green-200 border border-green-500/20">
              <Check className="inline-block h-3 w-3 mr-1.5 -mt-0.5" />
              Auto-Remediation Loop
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
