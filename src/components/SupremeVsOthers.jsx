"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Shield, Server, Lock, Globe, AlertTriangle, Zap, Database } from "lucide-react";

export const SupremeVsOthers = () => {
  return (
    <div className="w-full">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* OTHERS - Cloud Based */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-30" />
          
          <div className="relative z-10 mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Globe className="h-6 w-6 text-slate-400" />
              Other Scanners
            </h3>
            <p className="text-sm text-slate-400 mt-1">Standard SaaS Approach</p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                <Server className="h-5 w-5 text-red-300" />
              </div>
              <div>
                <h4 className="font-semibold text-red-200">Cloud-Based Logic</h4>
                <p className="text-sm text-slate-400 mt-1">Your code is uploaded to external servers for analysis, exposing intellectual property.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="h-5 w-5 text-red-300" />
              </div>
              <div>
                <h4 className="font-semibold text-red-200">High False Positives</h4>
                <p className="text-sm text-slate-400 mt-1">Generic rule sets often flag harmless patterns, wasting developer time on noise.</p>
              </div>
            </div>

             <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                <Database className="h-5 w-5 text-red-300" />
              </div>
              <div>
                <h4 className="font-semibold text-red-200">Data Retention Risks</h4>
                <p className="text-sm text-slate-400 mt-1">Scanned code may be stored or used to train models on third-party servers.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SUPREME - Local & Private */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-900/10 to-transparent p-8 backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-violet-500/5 blur-3xl" />
          
          <div className="relative z-10 mb-8">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-fuchsia-300" />
                Supreme 2
                </h3>
            </div>
            
            <p className="text-sm text-fuchsia-200 mt-1">Privacy-First Architecture</p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Lock className="h-5 w-5 text-fuchsia-300" />
              </div>
              <div>
                <h4 className="font-semibold text-white">100% Local Execution</h4>
                <p className="text-sm text-slate-300 mt-1">Zero code exfiltration. Analysis happens on your machine, ensuring full data sovereignty.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Check className="h-5 w-5 text-fuchsia-300" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Highest Detection Rate</h4>
                <p className="text-sm text-slate-300 mt-1">Advanced 4-tier scanning engine catches deep logic flaws with minimal false positives or noise.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Zap className="h-5 w-5 text-fuchsia-300" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Unlimited Usage</h4>
                <p className="text-sm text-slate-300 mt-1">No limitations in the number of Security scans. Run as many checks as you need without quotas or paywalls.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
