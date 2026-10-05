"use client";

import { useLanguage } from "@/contexts/LanguageContext";

// The same key is used for static JSX and for copy stored in comparison data.
export function homepageTextKey(copy) {
  const source = String(copy);
  const slug = source.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 72);
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash = Math.imul(hash ^ source.charCodeAt(index), 16777619);
  }
  return `${slug || "text"}_${(hash >>> 0).toString(36)}`;
}

const topologySubjects = new Set([
  "Your account activity summary",
  "Your workspace is ready",
  "Security notification",
  "Your weekly update",
  "Account confirmation",
  "Your service receipt",
  "New activity in your workspace",
]);

const topologyPreview = "Hello {name}, your {domain} workspace update is ready to review.";
const safeReplyTemplate = "Hello {sender},\n\nThank you for your message regarding “{subject}”. I will review the details and follow up shortly.\n\nBest regards,\nElena";
const threatReplyTemplate = "Security team,\n\nPlease review the quarantined message “{subject}” from {senderEmail}. AI-CSD reported: {summary}\n\nPlease verify the sender through a trusted channel before taking any action.\n\nElena";
const topologyBody = "Hello {name},\n\n{subject}.\n\nYour workspace activity has been processed successfully. You can review the summary at your next sign-in. No changes to your account are required.\n\nThank you,\nThe {domain} team";

export function useHomepageText() {
  const { t } = useLanguage();
  const exact = (copy, values) => t(`homepageText.${homepageTextKey(copy)}`, copy, values);
  const translate = (copy, values) => {
    if (copy == null) return "";
    const source = String(copy);
    if (values) return exact(source, values);
    if (source.startsWith("Re: ")) return `Re: ${translate(source.slice(4))}`;
    const subjectMatch = /^([^\n]+) — (.+)$/.exec(source);
    if (subjectMatch && topologySubjects.has(subjectMatch[2])) {
      return `${subjectMatch[1]} — ${exact(subjectMatch[2])}`;
    }
    const previewMatch = /^Hello ([^,\n]+), your (.+) workspace update is ready to review\.$/.exec(source);
    if (previewMatch) return exact(topologyPreview, { name: previewMatch[1], domain: previewMatch[2] });
    const bodyMatch = /^Hello ([^,\n]+),\n\n(.+)\.\n\nYour workspace activity has been processed successfully\. You can review the summary at your next sign-in\. No changes to your account are required\.\n\nThank you,\nThe (.+) team$/s.exec(source);
    if (bodyMatch) return exact(topologyBody, { name: bodyMatch[1], subject: translate(bodyMatch[2]), domain: bodyMatch[3] });
    const safeReplyMatch = /^Hello ([^,\n]+),\n\nThank you for your message regarding “(.+)”\. I will review the details and follow up shortly\.\n\nBest regards,\nElena$/s.exec(source);
    if (safeReplyMatch) return exact(safeReplyTemplate, { sender: translate(safeReplyMatch[1]), subject: translate(safeReplyMatch[2]) });
    const threatReplyMatch = /^Security team,\n\nPlease review the quarantined message “(.+)” from (\S+)\. AI-CSD reported: (.+)\n\nPlease verify the sender through a trusted channel before taking any action\.\n\nElena$/s.exec(source);
    if (threatReplyMatch) return exact(threatReplyTemplate, { subject: translate(threatReplyMatch[1]), senderEmail: threatReplyMatch[2], summary: translate(threatReplyMatch[3]) });
    const macroMatch = /^Macro Malware: Updated vendor rates #(\d+)$/.exec(source);
    if (macroMatch) return exact("Macro Malware: Updated vendor rates #{number}", { number: macroMatch[1] });
    const fraudMatch = /^CEO Fraud: Confidential wire authorization #(\d+)$/.exec(source);
    if (fraudMatch) return exact("CEO Fraud: Confidential wire authorization #{number}", { number: fraudMatch[1] });
    return exact(source);
  };
  return translate;
}

export default function HomepageText({ fallback }) {
  const translate = useHomepageText();
  return translate(fallback);
}
