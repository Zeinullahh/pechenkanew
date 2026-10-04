"use client";

import { useEffect, useReducer, useRef, useState } from "react";
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
import ServerSecurityView from "./ServerSecurityView";
import WebSocView from "./WebSocView";
import { createInitialServerState, serverSandboxReducer, createInitialEmailState, createInitialWebState, emailSandboxReducer, webSandboxReducer } from "./sandboxState";
import "./webmail-reference.css";
import "./sandbox.css";

const EMAIL_MODES = [
  { id: "cmc", label: "Email CMC" },
  { id: "webmail", label: "Email Workspace" },
];

export default function InteractiveSandbox({ product = "email" }) {
  const isServer = product === "server";
  const isWeb = product === "web";
  const [state, dispatch] = useReducer(
    isServer ? serverSandboxReducer : isWeb ? webSandboxReducer : emailSandboxReducer,
    undefined,
    isServer ? () => createInitialServerState(Date.now()) : isWeb ? createInitialWebState : createInitialEmailState,
  );
  const [expanded, setExpanded] = useState(false);
  const [scale, setScale] = useState(1);
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
      if (e.key === "Escape" && !e.defaultPrevented && !viewport.current?.querySelector('[role="dialog"], [role="alertdialog"]')) setExpanded(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded]);

  const mode = isServer ? state.server.view : isWeb ? "websoc" : state.mode;

  return (
    <section
      className={`silence-sandbox ${expanded ? "sb-expanded" : ""}`}
      aria-label={isServer ? "Server Security Sandbox Demo" : isWeb ? "Web Security Sandbox Demo" : "Email System Sandbox Demo"}
      id={isServer ? "server-security-sandbox" : isWeb ? "web-security-sandbox" : "email-system-sandbox"}
    >
      <div className="sb-introduction">
        <span className="sb-eyebrow">
          <Sparkles size={14} /> LIVE INTERACTIVE SANDBOX
        </span>
        <h3>{isServer ? "Server Security Sandbox" : isWeb ? "Web Security Sandbox" : "Email System Sandbox"}</h3>
        <p>{isServer ? "Explore Server Security Console, inspect engine telemetry, test policy rules, and simulate native server enrollment and attacks." : isWeb
          ? "Explore the Web Security CMC, simulate attacks, and inspect WAF traffic telemetry."
          : "Explore Email CMC and Email Workspace. Simulate attacks and inspect email security evidence."}</p>
      </div>

      {!isWeb && !isServer && (
        <div className="sb-product-switch" role="group" aria-label="Email sandbox view">
          <span className="sb-product-slider" style={{ transform: mode === "cmc" ? "translateX(0)" : "translateX(100%)" }} aria-hidden="true" />
          {EMAIL_MODES.map(({ id, label }) => (
            <button key={id} type="button" aria-pressed={mode === id}
              onClick={() => dispatch({ type: "MODE", mode: id })}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Interactive Application Container */}
      <div className="sb-browser">
        {/* Sleek App Strip Header */}
        <div className="sb-toolbar-strip">
          <div className="sb-toolbar-left">
            <span className="sb-live-indicator">
              <span className="sb-live-pulse" /> LIVE SANDBOX
            </span>
            <span className="sb-active-label">
              {isServer ? "Server Security Console · prod-app-01.silenceai.net" : mode === "cmc"
                ? "Email CMC · silenceai.net"
                : mode === "webmail"
                ? "Email Workspace · Elena Rostova"
                : "Web Security CMC · web-soc.silenceai.net"}
            </span>
          </div>

          {isServer && <div className="sb-product-switch sb-server-view-switch" role="group" aria-label="Server sandbox view">
            <span className="sb-product-slider" style={{ transform: mode === "console" ? "translateX(0)" : "translateX(100%)" }} aria-hidden="true" />
            {[{ id: "console", label: "Security Console" }, { id: "fleet", label: "Servers & Onboarding" }].map(({ id, label }) => <button key={id} type="button" aria-pressed={mode === id} onClick={() => dispatch({ type: "SERVER_SET_VIEW", view: id })}>{label}</button>)}
          </div>}

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
              {!isWeb && !isServer && <div
                id="sb-panel-cmc"
                hidden={mode !== "cmc"}
              >
                <CmcView state={state} dispatch={dispatch} />
              </div>}
              {!isWeb && !isServer && <div
                id="sb-panel-webmail"
                hidden={mode !== "webmail"}
              >
                <WebmailView state={state} dispatch={dispatch} />
              </div>}
              {isServer && <div id="sb-panel-server"><ServerSecurityView state={state} dispatch={dispatch} /></div>}
              {isWeb && <div
                id="sb-panel-websoc"
              >
                <WebSocView state={state} dispatch={dispatch} />
              </div>}
            </div>
          </div>
        </div>

        {/* Footer scenario bar */}
        <footer className="sb-scenario-bar">
          <Info size={15} />
          <span>
            <strong>Try it:</strong> {isServer ? "Switch between Security Console and Servers Fleet, simulate an attack to see CrowdSec auto-block rogue IPs, or customize signed policy." : isWeb
              ? "Simulate an attack to see WAF rate limiting engage, then inspect the globe and telemetry."
              : "Switch between Email CMC and Email Workspace, then simulate an attack and inspect quarantined messages."}
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
