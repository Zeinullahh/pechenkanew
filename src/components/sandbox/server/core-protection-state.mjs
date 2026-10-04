// Shared read-time decision. Installation reports and historic health are evidence,
// never independent authorities for current protection.
export function deriveProtectionState(sensors = [], provisioning = null, now = Date.now()) {
  const result = (protection, coverage, tone = "warning") => ({ protection, coverage, tone });
  if (provisioning?.stage === "uninstalled") return result("REMOVED", "Security stack removed", "neutral");
  if (provisioning?.stage === "failed" || provisioning?.protection === "FAILED") return result("FAILED", "Provisioning failed", "danger");
  const guard = sensors.find(sensor => sensor.sensor === "guard");
  if (!guard) return result("CONFIGURATION REQUIRED", "Waiting for Guard health");
  if (guard.state === "FAILED") return result("FAILED", "Core protection failed", "danger");
  const observed = new Date(guard.observedAt).getTime();
  if (guard.state !== "HEALTHY" || !Number.isFinite(observed) || observed <= 0 || observed > now + 30_000 || now - observed > 60_000)
    return result("DEGRADED", "Current core protection is not verified");
  if (!["complete", "degraded"].includes(provisioning?.stage) || !provisioning?.releaseVersion || !provisioning?.manifestId)
    return result("PENDING", "Waiting for completed release provisioning");
  const policy = provisioning.policyActivation;
  const revision = String(guard.details?.policy_revision ?? "");
  if (!policy?.activatedAt || !/^[1-9][0-9]*$/.test(revision) || revision !== String(policy.revision) ||
      !Number.isFinite(new Date(policy.activatedAt).getTime()) || new Date(policy.activatedAt).getTime() > now + 30_000 ||
      (policy.expiresAt && (!Number.isFinite(new Date(policy.expiresAt).getTime()) || new Date(policy.expiresAt).getTime() <= now)))
    return result("PENDING", "Waiting for current signed policy activation");
  const components = provisioning.componentState || provisioning.components || {};
  const falcoDisabled = policy.components?.falco === false || (policy.components?.falco === undefined && components.falco === "disabled_by_release");
  const falcoExpected = !falcoDisabled && (policy.components?.falco === true || Object.hasOwn(components,"falco") || sensors.some(s=>s.sensor==="falco"));
  const falco = sensors.find(s=>s.sensor==="falco");
  const proof = new Date(falco?.details?.functional_evidence_at).getTime();
  const observedFalco = new Date(falco?.observedAt).getTime();
  const falcoProblem = falcoExpected && (!falco || falco.state !== "HEALTHY" || falco.details?.functional_state !== "FUNCTIONAL" ||
    falco.details?.driver !== "modern_bpf" || falco.details?.detecting !== true || !Number.isFinite(proof) || proof <= 0 || proof > now || now-proof > 60_000 ||
    !Number.isFinite(observedFalco) || observedFalco > now + 30_000 || now-observedFalco > 60_000);
  const suricataDisabled = policy.components?.suricata === false || (policy.components?.suricata === undefined && components.suricata === "disabled_by_release");
  const suricataExpected = !suricataDisabled && (policy.components?.suricata === true || Object.hasOwn(components,"suricata") || sensors.some(s=>s.sensor==="suricata"));
  const suricata = sensors.find(s=>s.sensor==="suricata");
  const suricataProof = new Date(suricata?.details?.functional_evidence_at).getTime();
  const observedSuricata = new Date(suricata?.observedAt).getTime();
  const suricataProblem = suricataExpected && (!suricata || suricata.state !== "HEALTHY" || suricata.details?.functional_state !== "FUNCTIONAL" ||
    suricata.details?.detecting !== true || !Number.isFinite(suricataProof) || suricataProof <= 0 || suricataProof > now || now-suricataProof > 60_000 ||
    !Number.isFinite(observedSuricata) || observedSuricata > now + 30_000 || now-observedSuricata > 60_000);
  const disabledExempt = (name) => (falcoDisabled && ["falco","falco_adapter"].includes(name)) || (suricataDisabled && ["suricata","suricata_adapter"].includes(name));
  const optionalProblem = falcoProblem || suricataProblem || (provisioning.stage === "degraded" && !((falcoDisabled || suricataDisabled) && Object.entries(components).every(([name,state])=>disabledExempt(name)||state==="healthy"))) || Object.entries(components).some(([name, state]) => name !== "guard" && !disabledExempt(name) &&
    ["degraded", "configuration_required", "not_installed", "not_yet_available", "pending_phase_implementation"].includes(state)) || sensors.some(sensor => sensor !== guard && !disabledExempt(sensor.sensor) &&
    (["FAILED", "DEGRADED", "CONFIGURATION_REQUIRED", "UNSUPPORTED", "STALE"].includes(sensor.state) ||
      (sensor.state === "HEALTHY" && (!Number.isFinite(new Date(sensor.observedAt).getTime()) || now-new Date(sensor.observedAt).getTime()>300_000))));
  return optionalProblem ? result("DEGRADED", "Core protection verified; advanced detection degraded") : result("ACTIVE", "Full configured detection coverage", "healthy");
}
