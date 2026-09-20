"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X, RotateCcw } from "lucide-react";
import { answerSecurityQuestion } from "./sandboxState";

export default function FloatingAIChat({ state, dispatch, email }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [demoTriggered, setDemoTriggered] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Здравствуйте! Я ваш AI-ассистент Silence AI. Я могу анализировать угрозы, ссылки, вложения или автоматически организовывать переписку по папкам.",
    },
  ]);
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
      const textToType = "Переведи все письма в папку Finance & Audit";
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
                  text: "Фолдер «Finance & Audit» был создан (кастомный фолдер добавлен в систему), и туда письма были перенаправлены. Вы можете просмотреть их в левом меню в разделе МОИ ПАПКИ.",
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
    const text = userText || `Переведи все письма в папку ${folderName}`;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Фолдер «${folderName}» был создан (кастомный фолдер добавлен в систему), и туда письма были перенаправлены.`,
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
    triggerFolderRouting("Finance & Audit", "Переведи все письма в папку Finance & Audit");
  }

  function ask(question) {
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
          text: answerSecurityQuestion(trimmed, email, state.emails, state.logs),
        },
      ]);
    }, 450);
  }

  return (
    <>
      <button
        type="button"
        className="sb-ai-fab"
        aria-label="Open AI Assistant"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <Sparkles size={16} className="text-purple-300" />
        <span>AI</span>
      </button>

      {open && (
        <section
          className="sb-ai-panel"
          aria-label="Ask SAI Security and Mail Assistant chat"
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
                  <strong className="text-sm font-semibold text-white">Silence AI Assistant</strong>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                    Live
                  </span>
                </div>
                <span className="text-xs text-purple-200/60">Automated Mail Organization & Security</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="sb-icon"
                aria-label="Replay AI folder demo"
                title="Повторить команду создания папки"
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
              Контекст письма: <strong>{email.subject}</strong>
            </p>
          )}

          <div className="sb-ai-messages" role="log" aria-live="polite">
            {messages.map((message, i) => (
              <div key={i} className={`sb-ai-message ${message.role}`}>
                <span>{message.role === "assistant" ? "Silence AI" : "Вы"}</span>
                <p>{message.text}</p>
              </div>
            ))}
            {isTyping && (
              <div className="sb-ai-message assistant sb-ai-typing">
                <span>Silence AI</span>
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
              "✨ Переведи письма в Finance & Audit",
              "📁 Создать папку Executive",
              "🛡️ Сводка по угрозам",
            ].map((text) => (
              <button
                type="button"
                key={text}
                onClick={() => {
                  if (text.includes("Finance & Audit")) {
                    triggerFolderRouting("Finance & Audit");
                  } else if (text.includes("Executive")) {
                    triggerFolderRouting("Executive Board");
                  } else {
                    ask(text);
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
              aria-label="Ask AI assistant or request folder routing"
              placeholder='Например: "Переведи все письма в папку Finance & Audit"…'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1500}
            />
            <button
              type="submit"
              aria-label="Send message"
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
