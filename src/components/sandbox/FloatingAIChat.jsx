"use client";

import { useEffect, useRef, useState } from "react";
import { Send, ShieldCheck, X } from "lucide-react";
import { answerSecurityQuestion } from "./sandboxState";

export default function FloatingAIChat({ state, email }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello, I’m SAI. Ask me about sender authentication, suspicious links, attachment scans, or the incidents in this inbox.",
    },
  ]);
  const bottom = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (open) {
      bottom.current?.scrollIntoView({ block: "nearest" });
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [messages, open]);
  function ask(question) {
    if (!question.trim()) return;
    setMessages((previous) => [
      ...previous,
      { role: "user", text: question.trim() },
      {
        role: "assistant",
        text: answerSecurityQuestion(question, email, state.emails, state.logs),
      },
    ]);
    setInput("");
  }
  return (
    <>
      <button
        type="button"
        className="sb-ai-fab"
        aria-label="Ask SAI Security"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        AI
      </button>
      {open && (
        <section
          className="sb-ai-panel"
          aria-label="Ask SAI Security chat"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              setOpen(false);
            }
          }}
        >
          <header>
            <div>
              <ShieldCheck size={20} />
              <div>
                <strong>Ask SAI Security</strong>
                <span>Incident assistant</span>
              </div>
            </div>
            <button
              type="button"
              className="sb-icon"
              aria-label="Close SAI chat"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </header>
          {email && <p className="sb-ai-context">Context: {email.subject}</p>}
          <div className="sb-ai-messages" role="log" aria-live="polite">
            {messages.map((message, i) => (
              <div key={i} className={`sb-ai-message ${message.role}`}>
                <span>{message.role === "assistant" ? "SAI" : "You"}</span>
                <p>{message.text}</p>
              </div>
            ))}
            <div ref={bottom} />
          </div>
          <div className="sb-ai-suggestions">
            {[
              "Why was this flagged?",
              "Quarantine summary",
              "Inspect attachments",
            ].map((question) => (
              <button
                type="button"
                key={question}
                onClick={() => ask(question)}
              >
                {question}
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
              aria-label="Ask a security question"
              placeholder="Ask about this incident…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1500}
            />
            <button
              type="submit"
              aria-label="Send question"
              disabled={!input.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
