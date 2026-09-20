"use client";

import { useState } from "react";
import {
  Ban,
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Paperclip,
  ShieldCheck,
} from "lucide-react";
import SandboxModal from "./SandboxModal";

// A valid, local PDF fixture. No original attachment is requested from a service.
export function createDemoPdf() {
  const stream =
    "BT /F1 18 Tf 50 760 Td (Silence AI - Enterprise SLA) Tj 0 -32 Td /F1 11 Tf (Demonstration agreement - Q4 2026) Tj 0 -25 Td (Dedicated enterprise node and email security review.) Tj 0 -20 Td (Staging handoff: Tuesday. Contact: Sarah Jenkins.) Tj ET";
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join(
      "",
    )}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}
function download(attachment) {
  const url = URL.createObjectURL(
    new Blob([createDemoPdf()], { type: "application/pdf" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = attachment?.name || "SLA_Agreement.pdf";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export default function AttachmentHandler({ attachments = [] }) {
  const [expanded, setExpanded] = useState(true);
  const [details, setDetails] = useState({});
  const [preview, setPreview] = useState(null);
  if (!attachments.length) return null;
  return (
    <div className="attachments-container">
      <button
        type="button"
        className="attachments-header"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="attachments-title">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <Paperclip size={16} />
          Attachments ({attachments.length})
        </span>
      </button>
      {expanded && (
        <div className="attachments-list">
          {attachments.map((att, i) => {
            const hash = att?.sha256 ?? att?.hash ?? att?.sha256_hash ?? "";
            const malicious = Boolean(att?.isMalicious);
            return (
              <div
                className={`attachment-item ${malicious ? "blocked" : "safe"}`}
                key={att?.id || att?.name || i}
              >
                <div className="attachment-icon">
                  <FileText size={23} />
                </div>
                <div className="attachment-info">
                  <div className="attachment-name">
                    {att?.name || "Unnamed attachment"}
                  </div>
                  <div className="attachment-details">
                    <span className="attachment-size">
                      {att?.size || "Size unavailable"}
                    </span>
                    <span
                      className={`security-badge ${malicious ? "blocked" : "safe"}`}
                    >
                      {malicious ? (
                        <Ban size={12} />
                      ) : (
                        <ShieldCheck size={12} />
                      )}
                      {malicious ? "Download blocked" : "Clean"}
                    </span>
                    <button
                      type="button"
                      className="attachment-details-toggle"
                      aria-expanded={Boolean(details[i])}
                      onClick={() =>
                        setDetails({ ...details, [i]: !details[i] })
                      }
                    >
                      {details[i] ? "Hide details" : "Show details"}
                    </button>
                  </div>
                  {details[i] && (
                    <div className="attachment-scan-details">
                      <p>
                        VirusTotal:{" "}
                        {att?.virusTotalVerdict || "No scan result available"}
                      </p>
                      <div className="attachment-hash">
                        <span className="attachment-hash-label">SHA-256</span>
                        <span className="attachment-hash-value" title={hash}>
                          {hash || "Not available"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="attachment-actions">
                  <button
                    type="button"
                    className="sb-icon"
                    disabled={malicious}
                    aria-label={
                      malicious
                        ? "Download blocked: malware detected"
                        : `Download ${att?.name}`
                    }
                    onClick={() => download(att)}
                  >
                    {malicious ? <Ban size={18} /> : <Download size={18} />}
                  </button>
                  <button
                    type="button"
                    className="sb-icon"
                    aria-label={`Preview ${att?.name}`}
                    onClick={() => setPreview(att)}
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {preview && (
        <SandboxModal
          title={preview?.name || "Attachment preview"}
          onClose={() => setPreview(null)}
          wide
        >
          {preview?.isMalicious ? (
            <div className="sb-form">
              <h4>Attachment isolated</h4>
              <p>{preview?.virusTotalVerdict}</p>
              <p>
                The macro payload is blocked. Only its scan report is available.
              </p>
            </div>
          ) : (
            <div className="sb-document-preview">
              <span>SILENCE AI / ENTERPRISE</span>
              <h2>Service Level Agreement</h2>
              <p>Q4 2026 · FinTech Partners International</p>
              <hr />
              <h4>Dedicated enterprise node</h4>
              <p>
                This demonstration agreement covers the dedicated staging node,
                email security integration, and technical handoff described in
                Sarah Jenkins’s message.
              </p>
              <h4>Deployment schedule</h4>
              <p>Staging handoff: Tuesday. Review contact: Sarah Jenkins.</p>
              <button
                type="button"
                className="sb-primary"
                onClick={() => download(preview)}
              >
                <Download size={16} />
                Download PDF
              </button>
            </div>
          )}
        </SandboxModal>
      )}
    </div>
  );
}
