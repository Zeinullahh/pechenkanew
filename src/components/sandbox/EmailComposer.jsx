"use client";

import { useState } from "react";
import { CalendarClock, FileEdit, Send } from "lucide-react";
import SandboxModal from "./SandboxModal";

export default function EmailComposer({ initial, state, dispatch, onClose }) {
  const [to, setTo] = useState(initial?.recipient || "");
  const [subject, setSubject] = useState(initial?.subject || "");
  const [body, setBody] = useState(initial?.body || "");
  const [schedule, setSchedule] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("2026-09-21T09:00");
  const [error, setError] = useState("");
  function submit(folder) {
    if (
      folder !== "drafts" &&
      (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to.trim()) ||
        !subject.trim() ||
        !body.trim())
    ) {
      setError("Enter a valid recipient, subject, and message.");
      return;
    }
    if (
      folder === "scheduled" &&
      (!scheduledAt || Date.parse(`${scheduledAt}:00Z`) <= state.now)
    ) {
      setError("Choose a time after the demo clock.");
      return;
    }
    dispatch({
      type: "COMPOSE",
      email: {
        id: initial?.id,
        recipient: to.trim(),
        subject: subject.trim() || "(No subject)",
        body,
        folder,
        scheduledAt: folder === "scheduled" ? `${scheduledAt}:00Z` : undefined,
      },
    });
    onClose();
  }
  return (
    <SandboxModal
      title={initial ? "Edit draft" : "New message"}
      onClose={onClose}
      wide
    >
      <form
        className="sb-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit(schedule ? "scheduled" : "sent");
        }}
      >
        <label>
          To
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="recipient@company.com"
          />
        </label>
        <label>
          Subject
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
          />
        </label>
        <label>
          Message
          <textarea
            aria-label="Message"
            rows={9}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your message…"
          />
        </label>
        {schedule && (
          <label>
            Send at (UTC)
            <input
              aria-label="Send at (UTC)"
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
            />
            <small>
              Demo clock:{" "}
              {new Date(state.now).toISOString().slice(0, 16).replace("T", " ")}{" "}
              UTC
            </small>
          </label>
        )}
        {error && (
          <p className="sb-error" role="alert">
            {error}
          </p>
        )}
        <div className="sb-actions">
          <button
            type="button"
            className="sb-secondary"
            onClick={() => submit("drafts")}
          >
            <FileEdit size={15} />
            Save draft
          </button>
          <button
            type="button"
            className="sb-secondary"
            aria-pressed={schedule}
            onClick={() => setSchedule(!schedule)}
          >
            <CalendarClock size={15} />
            Schedule
          </button>
          <button type="submit" className="sb-primary">
            <Send size={15} />
            {schedule ? "Schedule send" : "Send"}
          </button>
        </div>
      </form>
    </SandboxModal>
  );
}
