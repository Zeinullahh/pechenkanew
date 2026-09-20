import { ShieldCheck, ShieldAlert } from "lucide-react";

export default function EmailHeader({ email, locale = "en" }) {
  const safe = email.threatType === "secure";
  const labels =
    locale === "ru" ? ["От", "Кому", "Дата"] : ["From", "To", "Date"];
  const date = new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(email.timestamp));
  return (
    <section className="email-metadata-simple">
      <div className="email-metadata-row">
        <span className="email-metadata-label">{labels[0]}</span>
        <div className="email-metadata-from-group">
          <span className="email-metadata-value" title={email.senderEmail}>
            {email.senderName} &lt;{email.senderEmail}&gt;
          </span>
          <div className="email-metadata-inline-status">
            <span
              className={`email-secure-badge ${safe ? "status-secure" : "status-phishing"}`}
            >
              {safe ? <ShieldCheck size={13} /> : <ShieldAlert size={13} />}
              {safe ? "Verified" : "Quarantined"}
            </span>
          </div>
        </div>
      </div>
      <div className="email-metadata-row">
        <span className="email-metadata-label">{labels[1]}</span>
        <span className="email-metadata-value">{email.recipient}</span>
      </div>
      <div className="email-metadata-row">
        <span className="email-metadata-label">{labels[2]}</span>
        <span className="email-metadata-value">{date} UTC</span>
      </div>
    </section>
  );
}
