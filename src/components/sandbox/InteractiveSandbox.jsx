"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Info,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import CmcView from "./CmcView";
import WebmailView from "./WebmailView";
import WebSocView from "./WebSocView";
import { createInitialState, sandboxReducer } from "./sandboxState";
import "./webmail-reference.css";
import "./sandbox.css";

const TABS = [
  { id: "cmc", label: "Email CMC", endpointX: 83 },
  { id: "webmail", label: "Email Web Security", endpointX: 250 },
  { id: "websoc", label: "Web Security CMC", endpointX: 417 },
];

export default function InteractiveSandbox() {
  const [state, dispatch] = useReducer(
    sandboxReducer,
    undefined,
    createInitialState,
  );
  const [expanded, setExpanded] = useState(false);
  const [scale, setScale] = useState(1);
  const [hoveredTab, setHoveredTab] = useState(null);
  const viewport = useRef(null);

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) {
        setScale(w / 1384);
      }
    };
    update();
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) {
        setScale(w / 1384);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!state.toast) return;
    const timer = setTimeout(() => dispatch({ type: "DISMISS_TOAST" }), 5500);
    return () => clearTimeout(timer);
  }, [state.toast]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded]);

  const mode = state.mode;

  return (
    <section
      className={`silence-sandbox ${expanded ? "sb-expanded" : ""}`}
      aria-label="Interactive Sandbox Demo"
      id="interactive-sandbox"
    >
      <div className="sb-introduction">
        <span className="sb-eyebrow">
          <Sparkles size={14} /> LIVE INTERACTIVE SANDBOX
        </span>
        <h3>Three perspectives. One unified line of defense.</h3>
        <p>
          Explore Email CMC, Email Web Security, and Web Security CMC (WAF & Traffic SOC).
          Simulate attacks, inspect evidence, and protect your organization.
        </p>
      </div>

      {/* Architecture / Product Selector (Exact Pricing block style) */}
      <div className="relative z-10 mb-8 flex flex-col items-center justify-center sm:mb-10">
        <div className="w-full max-w-[640px]">
          <svg
            viewBox="0 0 500 75"
            className="h-auto w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {TABS.map((tab) => (
              <path
                key={tab.id}
                d={`M250 3 L${tab.endpointX} 70`}
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={`transition-all duration-500 ease-out ${
                  mode === tab.id ? "opacity-100 stroke-[2px]" : "opacity-35"
                }`}
              />
            ))}
          </svg>

          <div
            className="grid grid-cols-3 items-start"
            role="tablist"
            aria-label="Silence AI products"
          >
            {TABS.map((tab) => {
              const isActive = mode === tab.id;
              const isHighlighted = (hoveredTab ?? mode) === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`sb-tab-${tab.id}`}
                  onClick={() => dispatch({ type: "MODE", mode: tab.id })}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  onFocus={() => setHoveredTab(tab.id)}
                  onBlur={() => setHoveredTab(null)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`sb-panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className="flex min-w-0 justify-center bg-transparent px-2 py-3 text-center focus:outline-none sm:px-4"
                >
                  <div className="flex min-w-0 flex-col items-center">
                    <span
                      className="text-xs font-semibold leading-tight text-white drop-shadow-[0_1px_8px_rgba(255,255,255,0.2)] transition-colors duration-300 sm:text-sm md:text-base whitespace-nowrap"
                    >
                      {tab.label}
                    </span>
                    {isHighlighted && (
                      <motion.div
                        layoutId="sandbox-pricing-type-underline"
                        className="mt-2 h-[2px] w-full min-w-16 bg-[#3B82F6]"
                        transition={{
                          type: "spring",
                          stiffness: 360,
                          damping: 32,
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Application Container */}
      <div className="sb-browser">
        {/* Sleek App Strip Header */}
        <div className="sb-toolbar-strip">
          <div className="sb-toolbar-left">
            <span className="sb-live-indicator">
              <span className="sb-live-pulse" /> LIVE SANDBOX
            </span>
            <span className="sb-active-label">
              {mode === "cmc"
                ? "Email CMC · silenceai.net"
                : mode === "webmail"
                ? "Email Web Security · Elena Rostova"
                : "Web Security CMC · web-soc.silenceai.net"}
            </span>
          </div>

          <div className="sb-toolbar-actions">
            <button
              type="button"
              className="sb-attack"
              onClick={() => dispatch({ type: "ATTACK" })}
            >
              <Zap size={14} /> <span>Simulate Attack</span>
            </button>
            <button
              type="button"
              className="sb-reset"
              onClick={() => dispatch({ type: "RESET" })}
            >
              <RotateCcw size={13} /> <span>Reset Demo</span>
            </button>
            <button
              type="button"
              className="sb-icon"
              aria-label={expanded ? "Exit expanded demo" : "Expand demo"}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>
          </div>
        </div>

        {/* Viewport with scaled stage */}
        <div className="sb-viewport" ref={viewport}>
          <div
            className="sb-scaled-space"
            style={{ width: "100%", height: 950 * scale }}
          >
            <div
              className="sb-stage"
              style={{ transform: `scale(${scale})`, transformOrigin: "0 0" }}
              key={state.resetVersion}
            >
              <div
                id="sb-panel-cmc"
                role="tabpanel"
                aria-labelledby="sb-tab-cmc"
                hidden={mode !== "cmc"}
              >
                <CmcView state={state} dispatch={dispatch} />
              </div>
              <div
                id="sb-panel-webmail"
                role="tabpanel"
                aria-labelledby="sb-tab-webmail"
                hidden={mode !== "webmail"}
              >
                <WebmailView state={state} dispatch={dispatch} />
              </div>
              <div
                id="sb-panel-websoc"
                role="tabpanel"
                aria-labelledby="sb-tab-websoc"
                hidden={mode !== "websoc"}
              >
                <WebSocView state={state} dispatch={dispatch} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer scenario bar */}
        <footer className="sb-scenario-bar">
          <Info size={15} />
          <span>
            <strong>Try it:</strong> Switch between Email CMC, Webmail, and Web Security CMC →
            Simulate an attack to see threats quarantined and WAF edge rate limiting engage →
            Inspect the 3D globe and telemetry.
          </span>
          <span className="sb-scenario-end">Local demo · resets on reload</span>
        </footer>

        {/* Live Toasts */}
        {state.toast && (
          <div
            className={`sb-toast ${state.toast.type}`}
            role="status"
            aria-live="polite"
          >
            {state.toast.type === "critical" ? (
              <Zap size={21} />
            ) : (
              <CheckCircle2 size={21} />
            )}
            <div>
              <strong>{state.toast.title}</strong>
              <p>{state.toast.detail}</p>
            </div>
            <button
              type="button"
              className="sb-icon"
              aria-label="Dismiss notification"
              onClick={() => dispatch({ type: "DISMISS_TOAST" })}
            >
              <X size={15} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
