"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  LockKeyhole,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import CmcView from "./CmcView";
import WebmailView from "./WebmailView";
import { createInitialState, sandboxReducer } from "./sandboxState";
import "./webmail-reference.css";
import "./sandbox.css";
import { SLNC_LOGO } from "./brandAsset";

export default function InteractiveSandbox() {
  const [state, dispatch] = useReducer(
    sandboxReducer,
    undefined,
    createInitialState,
  );
  const [expanded, setExpanded] = useState(false);
  const [scale, setScale] = useState(1);
  const viewport = useRef(null);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setScale(Math.max(1000, entry.contentRect.width) / 1384),
    );
    observer.observe(viewport.current);
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
        <h3>Two perspectives. One line of defense.</h3>
        <p>
          Explore Email Visualizer and Email Protector. Simulate an attack,
          inspect the evidence, and remove it across your organization.
        </p>
      </div>
      <div className="sb-browser">
        <div className="sb-browser-top">
          <div className="sb-window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div
            className="sb-tabs"
            role="tablist"
            aria-label="Silence AI products"
          >
            {[
              ["cmc", "Email Visualizer"],
              ["webmail", "Email Protector"],
            ].map(([id, label]) => (
              <button
                type="button"
                key={id}
                id={`sb-tab-${id}`}
                role="tab"
                aria-selected={mode === id}
                aria-controls={`sb-panel-${id}`}
                tabIndex={mode === id ? 0 : -1}
                onKeyDown={(e) => {
                  if (
                    ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
                  ) {
                    e.preventDefault();
                    const next =
                      e.key === "Home"
                        ? "cmc"
                        : e.key === "End"
                          ? "webmail"
                          : mode === "cmc"
                            ? "webmail"
                            : "cmc";
                    dispatch({ type: "MODE", mode: next });
                    document.getElementById(`sb-tab-${next}`)?.focus();
                  }
                }}
                onClick={() => dispatch({ type: "MODE", mode: id })}
              >
                {/* The supplied bitmap is the product's original branding. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={SLNC_LOGO} alt="./SLNC" width="35" height="20" />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="sb-browser-actions">
            <button
              type="button"
              className="sb-attack"
              onClick={() => dispatch({ type: "ATTACK" })}
            >
              <Zap size={14} /> <span>Simulate Attack</span>
            </button>
            <button type="button" onClick={() => dispatch({ type: "RESET" })}>
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
        <div className="sb-address-row">
          <ArrowLeft size={14} aria-hidden="true" />
          <ArrowRight size={14} aria-hidden="true" />
          <div className="sb-address">
            <LockKeyhole size={13} />
            <span>
              http://localhost:3000/{mode === "cmc" ? "visualization" : "inbox"}
            </span>
          </div>
          <span className="sb-local-indicator">Interactive demo</span>
        </div>
        <div className="sb-viewport" ref={viewport}>
          <div
            className="sb-scaled-space"
            style={{ width: 1384 * scale, height: 950 * scale }}
          >
            <div
              className="sb-stage"
              style={{ transform: `scale(${scale})` }}
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
            </div>
          </div>
        </div>
        <footer className="sb-scenario-bar">
          <Info size={15} />
          <span>
            <strong>Try it:</strong> Simulate an attack → open Quarantine or the
            pink Threat Grid button → inspect the email → purge it → check both
            products.
          </span>
          <span className="sb-scenario-end">Local demo · resets on reload</span>
        </footer>
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
