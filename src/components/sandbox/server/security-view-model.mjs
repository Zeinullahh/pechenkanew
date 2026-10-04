export const SENSOR_ORDER = ["guard", "hostsensor", "inventory", "fim", "sca", "yarax", "crowdsec", "falco", "suricata"];
export const OPEN_INCIDENT_STATES = new Set(["OPEN", "INVESTIGATING", "CONTAINED"]);
export const ACTIVE_RESPONSE_STATES = new Set(["REQUESTED", "APPROVED", "APPLIED"]);

export function displaySensorName(value) {
  const names = { guard: "Guard", hostsensor: "Host Sensor", inventory: "Inventory", fim: "File Integrity", sca: "Security Configuration", yarax: "YARA-X", yara: "YARA-X", crowdsec: "CrowdSec", falco: "Falco", suricata: "Suricata" };
  const key = String(value || "").toLowerCase().replace(/^guard[._-](?:hostsensor[._-])?/, "");
  return names[key] || names[String(value || "").toLowerCase()] || String(value || "Unknown");
}

export function healthLabel(state) {
  return ({ HEALTHY: "Healthy", DEGRADED: "Degraded", CONFIGURATION_REQUIRED: "Needs configuration", DISABLED: "Disabled", UNSUPPORTED: "Unsupported", FAILED: "Failed", STALE: "Telemetry stale" })[state] || "Unknown";
}

export function isTelemetryStale(sensor, now = Date.now(), thresholdMs = 5 * 60_000) {
  const observed = new Date(sensor?.observedAt || sensor?.lastEventAt || 0).getTime();
  return Number.isFinite(observed) && observed > 0 && now - observed > thresholdMs;
}

export { deriveProtectionState } from "./core-protection-state.mjs";

export function severityRank(value) {
  return ({ critical: 5, high: 4, medium: 3, low: 2, info: 1 })[String(value || "").toLowerCase()] || 0;
}

export function sortIncidents(incidents = []) {
  return [...incidents].sort((a, b) => Number(OPEN_INCIDENT_STATES.has(b.status)) - Number(OPEN_INCIDENT_STATES.has(a.status)) || severityRank(b.severity) - severityRank(a.severity) || new Date(b.lastSeenAt) - new Date(a.lastSeenAt));
}

export function eventFamily(event) {
  const source = `${event?.source || ""} ${event?.eventType || ""}`.toLowerCase();
  if (source.includes("suricata") || source.includes("network.ids")) return "suricata";
  if (source.includes("crowdsec")) return "crowdsec";
  if (source.includes("falco") || source.includes("runtime")) return "falco";
  if (source.includes("yara") || source.includes("malware")) return "yarax";
  if (source.includes("fim") || source.includes("file_integrity")) return "fim";
  if (source.includes("sca") || source.includes("posture")) return "sca";
  if (source.includes("inventory")) return "inventory";
  return "other";
}

export function humanDetectionName(event) {
  const payload = event?.payload || {};
  const technical = payload.rule?.name || payload.subject?.scenario || event?.eventType || "Security event";
  const known = {
    "crowdsecurity/ssh-bf": "Repeated SSH login attempts",
    "Write below binary dir": "Unexpected modification of a protected system location",
    "Guard execution from temporary directory": "Program executed from a temporary location",
  };
  return known[technical] || technical;
}

export function evidencePairs(value, maximum = 16) {
  const pairs = [];
  const visit = (entry, prefix, depth) => {
    if (pairs.length >= maximum || depth > 2 || entry === null || entry === undefined) return;
    if (["string", "number", "boolean"].includes(typeof entry)) {
      pairs.push([prefix, String(entry)]);
      return;
    }
    if (Array.isArray(entry)) {
      if (entry.every((item) => ["string", "number", "boolean"].includes(typeof item))) pairs.push([prefix, entry.join(", ")]);
      return;
    }
    if (typeof entry === "object") for (const [key, child] of Object.entries(entry)) visit(child, prefix ? `${prefix}.${key}` : key, depth + 1);
  };
  visit(value, "", 0);
  return pairs;
}
