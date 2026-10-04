const IP_OR_CIDR = /^[0-9A-Fa-f:.]+(?:\/[0-9]{1,3})?$/;
const RESPONSE_ACTIONS = new Set([
  "deny_source_ip_protected_ports",
  "deny_source_ip_hostwide_inbound_new",
  "terminate_existing_session",
]);
const RESPONSE_SEVERITIES = new Set(["info", "low", "medium", "high", "critical"]);

function requireObject(value, name) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${name} must be an object`);
  }
  return value;
}

export function normalizeIPOrCIDR(value) {
  if (typeof value !== "string" || !IP_OR_CIDR.test(value.trim())) {
    throw new TypeError("IP policy entry must be an IPv4, IPv6, or CIDR value");
  }
  const trimmed = value.trim();
  const [address, length] = trimmed.split("/");
  if (address.includes(":")) {
    const normalized = normalizeIPv6(address);
    if (length !== undefined && (!Number.isInteger(Number(length)) || Number(length) < 0 || Number(length) > 128)) {
      throw new TypeError("IPv6 CIDR prefix must be between 0 and 128");
    }
    return length === undefined ? normalized : `${normalized}/${Number(length)}`;
  }
  const octets = address.split(".");
  if (octets.length !== 4 || octets.some((part) => !/^[0-9]{1,3}$/.test(part) || Number(part) > 255)) {
    throw new TypeError("Invalid IPv4 address");
  }
  if (length !== undefined && (!Number.isInteger(Number(length)) || Number(length) < 0 || Number(length) > 32)) {
    throw new TypeError("IPv4 CIDR prefix must be between 0 and 32");
  }
  const normalized = octets.map((part) => String(Number(part))).join(".");
  return length === undefined ? normalized : `${normalized}/${Number(length)}`;
}

function normalizeIPv6(address) {
  const raw = address.toLowerCase();
  if (!/^[0-9a-f:]+$/.test(raw) || raw.includes(":::") || raw.split("::").length > 2) throw new TypeError("Invalid IPv6 address");
  const [left, right] = raw.split("::");
  const leftParts = left ? left.split(":") : [];
  const rightParts = right ? right.split(":") : [];
  if ([...leftParts, ...rightParts].some((part) => !/^[0-9a-f]{1,4}$/.test(part))) throw new TypeError("Invalid IPv6 address");
  const omitted = 8 - leftParts.length - rightParts.length;
  if ((raw.includes("::") && omitted < 1) || (!raw.includes("::") && omitted !== 0)) throw new TypeError("Invalid IPv6 address");
  const groups = [...leftParts, ...Array(Math.max(0, omitted)).fill("0"), ...rightParts].map((part) => Number.parseInt(part, 16));
  let bestStart = -1; let bestLength = 0;
  for (let index = 0; index < groups.length;) {
    if (groups[index] !== 0) { index += 1; continue; }
    let end = index; while (end < groups.length && groups[end] === 0) end += 1;
    if (end - index > bestLength && end - index >= 2) { bestStart = index; bestLength = end - index; }
    index = end;
  }
  const rendered = groups.map((group) => group.toString(16));
  if (bestStart < 0) return rendered.join(":");
  const before = rendered.slice(0, bestStart).join(":");
  const after = rendered.slice(bestStart + bestLength).join(":");
  return before && after ? `${before}::${after}` : before ? `${before}::` : after ? `::${after}` : "::";
}

function ipv4Value(address) {
  return address.split(".").reduce((value, octet) => (value << 8n) | BigInt(octet), 0n);
}

function ipv6Value(address) {
  const normalized = normalizeIPv6(address);
  const [left, right] = normalized.split("::");
  const leftParts = left ? left.split(":") : [];
  const rightParts = right ? right.split(":") : [];
  const groups = normalized.includes("::")
    ? [...leftParts, ...Array(8 - leftParts.length - rightParts.length).fill("0"), ...rightParts]
    : leftParts;
  return groups.reduce((value, group) => (value << 16n) | BigInt(`0x${group || "0"}`), 0n);
}

function cidrRange(value) {
  const normalized = normalizeIPOrCIDR(value);
  const [address, rawPrefix] = normalized.split("/");
  const bits = address.includes(":") ? 128 : 32;
  const prefix = rawPrefix === undefined ? bits : Number(rawPrefix);
  const numeric = address.includes(":") ? ipv6Value(address) : ipv4Value(address);
  const hostBits = BigInt(bits - prefix);
  const mask = prefix === 0 ? 0n : ((1n << BigInt(bits)) - 1n) ^ ((1n << hostBits) - 1n);
  const start = numeric & mask;
  return { family: bits, start, end: start + ((1n << hostBits) - 1n) };
}

export function policyEntriesOverlap(left, right) {
  const a = cidrRange(left);
  const b = cidrRange(right);
  return a.family === b.family && a.start <= b.end && b.start <= a.end;
}

function normalizeEntries(entries, name) {
  if (!Array.isArray(entries)) throw new TypeError(`${name} must be an array`);
  const seen = new Set();
  return entries.map((entry) => {
    const item = requireObject(entry, `${name} entry`);
    const cidr = normalizeIPOrCIDR(item.cidr);
    if (seen.has(cidr)) throw new TypeError(`${name} contains duplicate ${cidr}`);
    seen.add(cidr);
    return {
      cidr,
      reason: typeof item.reason === "string" ? item.reason.trim() : "",
      expires_at: item.expires_at ?? null,
    };
  });
}

export function validateServerSecurityPolicy(input) {
  const policy = requireObject(input, "server_security");
  if (!Number.isSafeInteger(policy.policy_revision) || policy.policy_revision < 1) {
    throw new TypeError("server_security.policy_revision must be a positive integer");
  }
  const trusted = normalizeEntries(policy.trusted_ips ?? [], "trusted_ips");
  const explicit = normalizeEntries(policy.explicit_blocks ?? [], "explicit_blocks");
  for (const entry of trusted) {
    const conflict = explicit.find((blocked) => policyEntriesOverlap(entry.cidr, blocked.cidr));
    if (conflict) {
      throw new TypeError(`trusted_ips and explicit_blocks conflict: ${entry.cidr} overlaps ${conflict.cidr}`);
    }
  }
  const response = requireObject(policy.response ?? {}, "server_security.response");
  const actions = response.allowed_actions ?? ["deny_source_ip_protected_ports"];
  if (!Array.isArray(actions) || actions.some((action) => !RESPONSE_ACTIONS.has(action))) {
    throw new TypeError("server_security.response.allowed_actions contains an unsupported action");
  }
  const mode = response.mode ?? "observe";
  if (!["observe", "shadow", "enforce"].includes(mode)) {
    throw new TypeError("server_security.response.mode must be observe, shadow, or enforce");
  }
  const minimumConfidence = response.minimum_confidence ?? 1;
  if (typeof minimumConfidence !== "number" || !Number.isFinite(minimumConfidence) || minimumConfidence < 0 || minimumConfidence > 1) {
    throw new TypeError("server_security.response.minimum_confidence must be between 0 and 1");
  }
  const minimumSeverity = String(response.minimum_severity ?? "medium").toLowerCase();
  if (!RESPONSE_SEVERITIES.has(minimumSeverity)) throw new TypeError("server_security.response.minimum_severity is invalid");
  const defaultTTL = response.default_ttl_seconds ?? 900;
  const maximumTTL = response.maximum_ttl_seconds ?? 86400;
  if (!Number.isSafeInteger(defaultTTL) || !Number.isSafeInteger(maximumTTL) || defaultTTL < 1 || maximumTTL < defaultTTL || maximumTTL > 86400) {
    throw new TypeError("server_security.response TTL bounds are invalid");
  }
  const actionTTLDefaults = {
    deny_source_ip_protected_ports: maximumTTL,
    deny_source_ip_hostwide_inbound_new: Math.min(maximumTTL, 3600),
    terminate_existing_session: Math.min(maximumTTL, 300),
  };
  const configuredActionTTLs = requireObject(
    response.maximum_ttl_seconds_by_action ?? {},
    "server_security.response.maximum_ttl_seconds_by_action",
  );
  if (Object.keys(configuredActionTTLs).some((action) => !RESPONSE_ACTIONS.has(action))) {
    throw new TypeError("server_security.response.maximum_ttl_seconds_by_action contains an unsupported action");
  }
  const maximumTTLByAction = {};
  for (const action of actions) {
    const limit = configuredActionTTLs[action] ?? actionTTLDefaults[action];
    if (!Number.isSafeInteger(limit) || limit < 1 || limit > maximumTTL) throw new TypeError(`server_security.response maximum TTL for ${action} is invalid`);
    maximumTTLByAction[action] = limit;
  }
  const sensors = {};
  for (const [name, raw] of Object.entries(response.sensors ?? {})) {
    if (!name.trim()) throw new TypeError("server_security.response sensor name is empty");
    const sensor = requireObject(raw, `server_security.response.sensors.${name}`);
    const sensorActions = sensor.allowed_actions ?? [];
    if (!Array.isArray(sensorActions) || sensorActions.some((action) => !RESPONSE_ACTIONS.has(action))) {
      throw new TypeError(`server_security.response.sensors.${name}.allowed_actions is invalid`);
    }
    const confidence = sensor.minimum_confidence;
    if (confidence !== undefined && (typeof confidence !== "number" || !Number.isFinite(confidence) || confidence < 0 || confidence > 1)) {
      throw new TypeError(`server_security.response.sensors.${name}.minimum_confidence is invalid`);
    }
    const severity = sensor.minimum_severity === undefined ? undefined : String(sensor.minimum_severity).toLowerCase();
    if (severity !== undefined && !RESPONSE_SEVERITIES.has(severity)) throw new TypeError(`server_security.response.sensors.${name}.minimum_severity is invalid`);
    sensors[name] = {
      enabled: sensor.enabled ?? true,
      allowed_actions: [...new Set(sensorActions)].sort(),
      ...(confidence === undefined ? {} : { minimum_confidence: confidence }),
      ...(severity === undefined ? {} : { minimum_severity: severity }),
      allowed_categories: [...new Set(sensor.allowed_categories ?? [])].sort(),
      allowed_rules: [...new Set(sensor.allowed_rules ?? [])].sort(),
      require_verified_attribution: sensor.require_verified_attribution ?? true,
    };
  }
  return {
    policy_revision: policy.policy_revision,
    expires_at: policy.expires_at ?? null,
    rollback: policy.rollback ?? { authorized: false },
    trusted_ips: trusted,
    explicit_blocks: explicit,
    response: {
	  enabled: response.enabled ?? true,
      mode,
      allowed_actions: [...new Set(actions)].sort(),
      minimum_confidence: minimumConfidence,
      minimum_severity: minimumSeverity,
      default_ttl_seconds: defaultTTL,
      maximum_ttl_seconds: maximumTTL,
      maximum_ttl_seconds_by_action: maximumTTLByAction,
      sensors,
    },
    components: policy.components ?? {},
    retention: policy.retention ?? {
      events_days: 30,
      incidents_days: 365,
      responses_days: 365,
      admin_audit_days: 365,
    },
  };
}

export { RESPONSE_ACTIONS };
