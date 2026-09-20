"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function SandboxModal({
  title,
  onClose,
  children,
  wide = false,
}) {
  const ref = useRef(null);
  const anchor = useRef(null);
  const [host, setHost] = useState(null);
  const [placement, setPlacement] = useState(null);
  const titleId = useId();
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    setHost(anchor.current.closest(".sandbox-webmail, .cmc-shell"));
  }, []);
  useEffect(() => {
    if (!host) return;
    const viewport = host.closest(".sb-viewport");
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scale = host.getBoundingClientRect().width / host.clientWidth;
        if (!scale) return;
        const visibleWidth = viewport.clientWidth / scale;
        const width = Math.min(wide ? 780 : 470, visibleWidth - 40);
        setPlacement({
          width,
          left: viewport.scrollLeft / scale + (visibleWidth - width) / 2,
        });
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    viewport.addEventListener("scroll", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      viewport.removeEventListener("scroll", update);
    };
  }, [host, wide]);
  useLayoutEffect(() => {
    if (!host) return;
    const previous = document.activeElement;
    const dialog = ref.current;
    const controls = () =>
      [
        ...dialog.querySelectorAll(
          'button, input, select, textarea, [tabindex="0"]',
        ),
      ].filter((el) => !el.disabled && el.getClientRects().length);
    (controls()[0] || dialog).focus({ preventScroll: true });
    const handleKey = (event) => {
      // An action may remove the focused button (e.g. sending the last scheduled email).
      // Escape must still close the top visible dialog when focus falls back to the body.
      if (
        !dialog.getClientRects().length ||
        host
          .querySelectorAll(".sb-modal-backdrop")
          .item(host.querySelectorAll(".sb-modal-backdrop").length - 1) !==
          dialog.parentElement
      )
        return;
      if (event.key === "Escape") {
        event.stopPropagation();
        closeRef.current();
      }
      if (event.key === "Tab") {
        const items = controls();
        const first = items[0];
        const last = items.at(-1);
        if (!first) {
          event.preventDefault();
          return;
        }
        if (!dialog.contains(document.activeElement)) {
          event.preventDefault();
          first.focus();
          return;
        }
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey, true);
    return () => {
      document.removeEventListener("keydown", handleKey, true);
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [host]);
  const dialog = (
    <div
      className="sb-modal-backdrop"
      style={
        placement
          ? {
              justifyContent: "flex-start",
              paddingLeft: placement.left,
              paddingRight: 0,
            }
          : undefined
      }
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        ref={ref}
        className={`sb-modal ${wide ? "sb-modal-wide" : ""}`}
        style={placement ? { width: placement.width } : undefined}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className="sb-modal-header">
          <h3 id={titleId}>{title}</h3>
          <button
            type="button"
            className="sb-icon"
            aria-label={`Close ${title}`}
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </header>
        <div className="sb-modal-content">{children}</div>
      </section>
    </div>
  );
  return (
    <>
      <span hidden ref={anchor} />
      {host && createPortal(dialog, host)}
    </>
  );
}
