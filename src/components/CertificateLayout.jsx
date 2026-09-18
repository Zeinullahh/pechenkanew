"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import RequestDemoModal from "@/components/RequestDemoModal";
import useCertificateDownload from "@/lib/useCertificateDownload";
import { Download, Loader2, Smartphone } from "lucide-react";

const CERT_WIDTH = 1123; // A4 width at 96PPI
const CERT_ASPECT = 297 / 210; // Exact A4 aspect ratio
const CERT_HEIGHT = Math.round(CERT_WIDTH / CERT_ASPECT); // A4 height at 96PPI

export default function CertificateLayout({ name, certId, role }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const certRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { handleDownload, isGenerating } = useCertificateDownload(
    certRef,
    certId
  );

  useEffect(() => {
    const handleResize = () => {
      // Certificate should take exactly 70% of screen's height
      const targetHeight = window.innerHeight * 0.7;
      let newScale = targetHeight / CERT_HEIGHT;

      // Ensure it doesn't overflow horizontally on very narrow screens
      const padding = 32; // 16px padding on each side
      const maxWidth = window.innerWidth - padding;
      
      if (CERT_WIDTH * newScale > maxWidth) {
        newScale = maxWidth / CERT_WIDTH;
      }

      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scaledWidth = CERT_WIDTH * scale;
  const scaledHeight = CERT_HEIGHT * scale;

  return (
    <div className="min-h-screen bg-[#01091C] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden flex flex-col relative">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none print:hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="print:hidden relative z-20 header-container">
        <Header onOpenModal={openModal} />
      </div>

      {/* Main Content */}
      <main className="certificate-main relative flex-grow flex flex-col items-center justify-start pt-20 px-0 pb-10 z-10 w-full print:p-0 print:pb-0 print:pt-0">
        {/* Download Button — bottom-center on mobile, top-right on desktop */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 md:bottom-auto md:top-24 md:right-8 md:left-auto md:translate-x-0 z-50 print:hidden">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className={`flex items-center gap-2 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full shadow-lg transition-all font-semibold text-sm md:text-base ${
              isGenerating
                ? "bg-blue-600/60 cursor-wait"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Generating…</span>
              </>
            ) : (
              <>
                <Download size={18} />
                <span>Download</span>
              </>
            )}
          </button>
        </div>

        {/* Rotation Overlay for Portrait Mobile (moved to top of main) */}
        <div className="rotate-overlay hidden flex-col items-center justify-start w-full mt-4 md:hidden">
          <div className="relative mb-6">
            <Smartphone size={56} className="text-blue-400 animate-phone-rotate" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-3 text-white px-4">
            Please Rotate Your Device
          </h2>
          <p className="text-center text-blue-200/80 text-base max-w-[280px] px-4 leading-relaxed">
            This certificate is designed for landscape viewing. Turn your phone horizontally to view it.
          </p>
        </div>

        {/* Certificate Container providing exact bounding box for centered scaling */}
        <div
          className="relative flex justify-center items-center w-full mt-4 mb-10 overflow-hidden"
          style={{ height: `${scaledHeight}px` }}
        >
          {/* Certificate Wrapper */}
          <div
            className="relative flex justify-center items-center certificate-wrapper"
            style={{
              width: `${scaledWidth}px`,
              height: `${scaledHeight}px`,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: scale * 0.9 }}
              animate={{ opacity: 1, scale: scale }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-0 left-0 origin-top-left print:!scale-100 print:!transform-none print:!position-static"
              style={{
                width: `${CERT_WIDTH}px`,
                height: `${CERT_HEIGHT}px`,
                transformOrigin: "0 0"
              }}
            >
              {/* The Certificate Card */}
              <div
                ref={certRef}
                className="relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] text-slate-900 certificate-card flex flex-col mx-auto font-sans"
                suppressHydrationWarning
                style={{
                  width: `${CERT_WIDTH}px`,
                  height: `${CERT_HEIGHT}px`,
                  minWidth: `${CERT_WIDTH}px`,
                  minHeight: `${CERT_HEIGHT}px`,
                  maxWidth: `${CERT_WIDTH}px`,
                  maxHeight: `${CERT_HEIGHT}px`,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background:
                    "radial-gradient(ellipse at center, #1a2a50, #0d1530 50%, #060a18)",
                }}
              >
              {/* Rendering Overlay */}
              <AnimatePresence>
                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#060a18]/80 backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-400 animate-spin" />
                        <div
                          className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-b-purple-400/60 animate-spin"
                          style={{
                            animationDirection: "reverse",
                            animationDuration: "1.5s",
                          }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-white text-xl font-semibold tracking-wide">
                          Rendering Certificate
                        </p>
                        <p className="text-blue-300/70 text-sm mt-2 font-mono">
                          Generating high-quality image…
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Background Pattern (Faint Code Snippets) */}
              <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none overflow-hidden font-mono text-[10px] leading-relaxed text-blue-200 select-none flex flex-col justify-start z-0"
                style={{ transform: "rotate(-5deg) scale(1.2)" }}
              >
                <pre className="whitespace-pre-wrap p-10">
                  {`const verify_handshake = (node) => {
 let payload = encryption.rsa({ id: node.uuid, secret: process.env.SALT });
 return network.transmit(payload).then(res => res.integrity === true);
};

export class SandboxContext {
 constructor(domain) {
 this.domain = domain;
 this.isolated = true;
 }
 async initialize() {
 await sys.kernel.allocate(this.domain);
 console.log("Kernel allocated.");
 }
}

function establish_tunnel(ip, port) {
 const socket = new SecSocket(ip, port);
 socket.on('data', data => parse_stream(data));
 socket.connect();
}

// ... initializing zero-trust architecture ...
let _ZT = new ZeroTrustModule();
_ZT.requireMFA(true);
window.addEventListener('access', _ZT.handler);

function parse_stream(buffer) {
 const decoded = Buffer.from(buffer, 'base64').toString('utf-8');
 if (decoded.includes('EXPLOIT')) {
 sys.firewall.block_source();
 }
}

const deploy_node = async () => {
 let instance = await cloud.deploy('c5.xlarge');
 instance.install('silence-core');
 instance.start();
};`}
                </pre>
                <pre className="whitespace-pre-wrap p-10 absolute top-1/2 left-1/4">
                  {`class QuantumEncryptor {
 static generateKeys() {
 return Q.runAlgorithms('Shor').then(res => {
 return { pub: res.public, priv: res.private };
 });
 }
}

function init_protocol() {
 let p = new Protocol();
 p.bind(8080);
 p.listen();
}`}
                </pre>
              </div>

              {/* Moonrise background */}
              <div
                className="absolute bottom-[-30%] w-full h-[600px] pointer-events-none opacity-80 mix-blend-screen overflow-hidden flex items-end z-0"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)",
                  maskImage:
                    "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)",
                }}
              >
                <Image
                  src="/moonrise.webp"
                  alt="Moonrise Background"
                  fill
                  className="object-cover object-bottom"
                  priority
                />
              </div>

              {/* Inner Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-between p-12 z-20 text-white pointer-events-none">
                {/* Top: Logo & Header */}
                <div className="flex flex-col items-center gap-4 w-full mt-2 flex-shrink-0 z-20">
                  <div className="relative w-40 h-10 mb-2">
                    <Image
                      src="/logo.svg"
                      alt="Silence Logo"
                      fill
                      className="object-contain opacity-90"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="text-center space-y-4 relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.6em] text-blue-400/80">
                      Silence Internship Program
                    </p>
                    <h1 className="text-6xl font-sans font-bold tracking-tight text-white mb-1 drop-shadow-md pb-1 whitespace-nowrap">
                      Certificate of Completion
                    </h1>
                    <div className="flex items-center justify-center gap-4 w-full opacity-100 mt-2">
                      <div className="h-[2px] w-24 bg-gradient-to-l from-blue-400 to-transparent shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
                      <div className="w-2 h-2 rotate-45 border border-blue-300 bg-blue-400/40 shadow-[0_0_12px_rgba(96,165,250,1)]" />
                      <div className="h-[2px] w-24 bg-gradient-to-r from-blue-400 to-transparent shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
                    </div>
                  </div>
                </div>

                {/* Middle: Recipient */}
                <div className="flex flex-col items-center justify-center flex-grow w-full z-10">
                  <p className="text-blue-100 text-sm uppercase tracking-[0.3em] font-medium mb-6 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)] whitespace-nowrap">
                    This is to certify that
                  </p>
                  <div className="relative z-10 mt-2 mb-6">
                    <div className="absolute -inset-8 bg-blue-500/10 blur-2xl rounded-full opacity-80" />
                    <h2
                      suppressHydrationWarning
                      className="relative text-8xl font-bold text-center text-white tracking-tight whitespace-nowrap leading-[1.05]"
                      style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)", fontWeight: 700 }}
                    >
                      {name}
                    </h2>
                  </div>
                  <div className="max-w-3xl text-center space-y-6 relative z-10 flex flex-col items-center">
                    <p suppressHydrationWarning className="text-3xl text-white/90 font-light leading-relaxed whitespace-nowrap">
                      Has successfully completed{" "}
                      <span className="font-medium text-blue-300 border-b border-blue-400/30 pb-1">
                        Internship Flow 1
                      </span>
                    </p>
                    <p className="text-white/50 text-lg uppercase tracking-widest text-sm">
                      Winter Internship Batch • {role}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-6 text-blue-200/90 font-mono text-sm uppercase tracking-widest p-2 rounded-full bg-white/[0.03] backdrop-blur-md px-8 py-3 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                    <span>Dec 6, 2025</span>
                    <span className="w-16 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
                    <span>Mar 6, 2026</span>
                  </div>
                </div>

                {/* Bottom: Signatures & Details */}
                <div className="w-full flex justify-between items-end flex-shrink-0 z-20">
                  <div className="text-left pb-2 flex-grow">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2 font-medium">
                      Certificate ID
                    </p>
                    <p className="font-mono text-base text-blue-300 font-bold mb-3">
                      {certId}
                    </p>
                    <p className="text-xs font-mono text-white/80 break-all max-w-full whitespace-nowrap">
                      silence.codes/interns/flow-1/{certId}
                    </p>
                  </div>
                  <div className="flex flex-col items-end relative pb-2 min-w-[250px]">
                    <div className="absolute bottom-16 right-0 w-64 h-32 pr-4 pointer-events-none flex justify-end z-0">
                      <Image
                        src="/signature/signaturegen-1772818216691.png"
                        alt="Signature of CEO"
                        fill
                        className="object-contain object-right-bottom opacity-90 drop-shadow-lg"
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    </div>
                    <div className="text-right border-t border-white/20 pt-3 min-w-[200px] z-10 relative">
                      <p className="text-lg font-sans font-medium text-white tracking-wide">
                        Zeinullah Iman
                      </p>
                      <p className="text-[10px] left-0 uppercase tracking-[0.3em] text-blue-400/70 mt-1">
                        CEO of Silence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </main>

      <RequestDemoModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Global & Print Styles */}
      <style jsx global>{`
        html,
        body {
          overflow-x: hidden;
        }
        @keyframes phone-rotate {
          0%, 10% { transform: rotate(0deg); }
          40%, 60% { transform: rotate(90deg); }
          90%, 100% { transform: rotate(0deg); }
        }
        .animate-phone-rotate {
          animation: phone-rotate 2.5s ease-in-out infinite;
          transform-origin: center center;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @media screen and (max-width: 767px) and (orientation: portrait) {
          .certificate-wrapper {
            display: none !important;
          }
          .rotate-overlay {
            display: flex !important;
          }
        }
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
          body {
            background: #01091c !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          main {
            display: flex;
            height: 100vh;
            width: 100vw;
            padding: 0;
            margin: 0;
            overflow: hidden;
          }
          .certificate-wrapper {
            width: 100vw !important;
            height: 100vh !important;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 0 !important;
            margin-top: 0 !important;
          }
          .certificate-card {
            width: 100vw !important;
            height: calc(100vw * 210 / 297) !important;
            max-height: 100vh !important;
            max-width: calc(100vh * 297 / 210) !important;
            aspect-ratio: 297 / 210 !important;
            border-radius: 0 !important;
            border: none !important;
            box-shadow: none !important;
            transform: none !important;
          }
          footer {
            display: none !important;
          }
          [role="dialog"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
