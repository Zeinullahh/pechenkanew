"use client";
import HomepageText, { useHomepageText } from "@/components/HomepageText";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X, RotateCcw } from "lucide-react";
import { answerSecurityQuestion } from "./sandboxState";

export default function FloatingAIChat({ state, dispatch, email }) {
  const localize = useHomepageText();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [demoTriggered, setDemoTriggered] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: "Hello! I can analyze threats, links, and attachments or organize your messages into folders." }]);
  const bottom = useRef(null);
  const inputRef = useRef(null);
  const typingTimer = useRef(null);

  useEffect(() => {
    if (open) {
      bottom.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [messages, open, isTyping]);

  // Automated demonstration animation: opens AI chat and demonstrates folder routing
  useEffect(() => {
    if (demoTriggered) return;

    // Trigger after user opens webmail
    const timer = setTimeout(() => {
      setOpen(true);
      setDemoTriggered(true);

      // Start typing simulation after opening
      const textToType = localize("Move all messages to Finance & Audit");
      let charIndex = 0;

      const typingInterval = setInterval(() => {
        if (charIndex <= textToType.length) {
          setInput(textToType.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);

          // Simulated submit after typing finishes
          setTimeout(() => {
            setInput("");
            setMessages((prev) => [
              ...prev,
              { role: "user", text: textToType },
            ]);
            setIsTyping(true);

            setTimeout(() => {
              setIsTyping(false);
              setMessages((prev) => [
                ...prev,
                {
                  role: "assistant",
                  text: localize("Created {folder} and moved matching messages there. Find them under My Folders.", { folder: "Finance & Audit" }),
                },
              ]);

              if (dispatch) {
                dispatch({
                  type: "AI_CREATE_AND_MOVE_FOLDER",
                  folderName: "Finance & Audit",
                  folderId: "finance",
                });
              }
            }, 800);
          }, 600);
        }
      }, 45);

      typingTimer.current = typingInterval;
    }, 1200);

    return () => {
      clearTimeout(timer);
      if (typingTimer.current) clearInterval(typingTimer.current);
    };
  }, [demoTriggered, dispatch]);

  function triggerFolderRouting(folderName = "Finance & Audit", userText = null) {
    const text = userText || localize("Move all messages to {folder}", { folder: folderName });
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: localize("Created {folder} and moved matching messages there. Find them under My Folders.", { folder: folderName }),
        },
      ]);

      const folderId = folderName.toLowerCase().includes("audit") || folderName.toLowerCase().includes("finance")
        ? "finance"
        : folderName.toLowerCase().replace(/[^a-z0-9]/g, "-");

      if (dispatch) {
        dispatch({
          type: "AI_CREATE_AND_MOVE_FOLDER",
          folderName,
          folderId,
        });
      }
    }, 600);
  }

  function handleReplayDemo() {
    triggerFolderRouting("Finance & Audit", localize("Move all messages to Finance & Audit"));
  }

  function ask(question, intent = null) {
    if (!question.trim()) return;
    const trimmed = question.trim();

    // Check if user is asking to create/move folders
    if (/переведи|перенаправ|папк|фолдер|folder|move.*to/i.test(trimmed)) {
      let folderName = "Finance & Audit";
      if (/audit|аудит/i.test(trimmed) && !/finance|финанс/i.test(trimmed)) {
        folderName = "Audit";
      } else if (/executive|руковод/i.test(trimmed)) {
        folderName = "Executive Board";
      }
      triggerFolderRouting(folderName, trimmed);
      return;
    }

    setMessages((previous) => [
      ...previous,
      { role: "user", text: trimmed },
    ]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: answerSecurityQuestion(intent || trimmed, email, state.emails, state.logs, localize),
        },
      ]);
    }, 450);
  }

  return (
    <>
      <button
        type="button"
        className="sb-ai-fab"
        aria-label={localize("Open AI Assistant")}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <Sparkles size={16} className="text-purple-300" />
        <span>AI</span>
      </button>

      {open && (
        <section
          className="sb-ai-panel"
          aria-label={localize("Ask SAI Security and Mail Assistant chat")}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              setOpen(false);
            }
          }}
        >
          <header className="sb-ai-panel-header">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <Bot size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-sm font-semibold text-white"><HomepageText fallback="Silence AI Assistant" /></strong>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                    <HomepageText fallback="Live" />
                  </span>
                </div>
                <span className="text-xs text-purple-200/60"><HomepageText fallback="Automated Mail Organization & Security" /></span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="sb-icon"
                aria-label="Replay AI folder demo"
                title={localize("Replay folder demo")}
                onClick={handleReplayDemo}
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                className="sb-icon"
                aria-label="Close AI chat"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
          </header>

          {email && (
            <p className="sb-ai-context">
              {localize("Email context:")} <strong>{localize(email.subject)}</strong>
            </p>
          )}

          <div className="sb-ai-messages" role="log" aria-live="polite">
            {messages.map((message, i) => (
              <div key={i} className={`sb-ai-message ${message.role}`}>
                <span>{message.role === "assistant" ? "Silence AI" : localize("You")}</span>
                <p>{localize(message.text)}</p>
              </div>
            ))}
            {isTyping && (
              <div className="sb-ai-message assistant sb-ai-typing">
                <span><HomepageText fallback="Silence AI" /></span>
                <div className="sb-typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={bottom} />
          </div>

          <div className="sb-ai-suggestions">
            {[
              { id: "finance", text: localize("Move messages to Finance & Audit") },
              { id: "executive", text: localize("Create an Executive folder") },
              { id: "summary", text: localize("Summarize threats") },
            ].map(({ id, text }) => (
              <button
                type="button"
                key={text}
                onClick={() => {
                  if (id === "finance") {
                    triggerFolderRouting("Finance & Audit");
                  } else if (id === "executive") {
                    triggerFolderRouting("Executive Board");
                  } else {
                    ask(text, "summary");
                  }
                }}
              >
                {text}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              ref={inputRef}
              aria-label={localize("Ask AI assistant or request folder routing")}
              placeholder={localize("For example: Move all messages to Finance & Audit")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1500}
            />
            <button
              type="submit"
              aria-label={localize("Send message")}
              disabled={!input.trim()}
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
