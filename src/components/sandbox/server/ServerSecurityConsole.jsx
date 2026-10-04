"use client";
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import {
  Activity, AlertTriangle, Ban, CheckCircle2, ChevronLeft, CircleHelp, Clock3,
  FileSearch, Loader2, LockKeyhole, RefreshCw, Search, ShieldCheck, ShieldX,
  Siren, WifiOff, XCircle,
} from "lucide-react";

import { useServerSandbox, localQuery } from "./ServerContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { normalizeIPOrCIDR, policyEntriesOverlap } from "./server-security-policy.mjs";
import {
  ACTIVE_RESPONSE_STATES, OPEN_INCIDENT_STATES, SENSOR_ORDER, deriveProtectionState,
  displaySensorName, eventFamily, evidencePairs, healthLabel, humanDetectionName,
  isTelemetryStale, severityRank, sortIncidents,
} from "./security-view-model.mjs";

function formatTime(value) {
  if (!value) return "Never";
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date) : "Unknown";
}

function relativeTime(value) {
  if (!value) return "Never";
  const seconds = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

const toneClasses = {
  healthy: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  danger: "border-rose-500/30 bg-rose-500/10 text-rose-200",
  neutral: "border-slate-700 bg-slate-900/60 text-slate-300",
};

function statusTone(value) {
  if (["HEALTHY", "ACTIVE", "APPLIED", "RESOLVED", "COMPLETE"].includes(value)) return "healthy";
  if (["FAILED", "CRITICAL", "OPEN"].includes(String(value).toUpperCase())) return "danger";
  if (["HIGH", "MEDIUM", "DEGRADED", "CONFIGURATION_REQUIRED", "SUPPRESSED", "INVESTIGATING", "SHADOW_APPROVED"].includes(String(value).toUpperCase())) return "warning";
  return "neutral";
}

function Badge({ children, tone = "neutral" }) {
  const Icon = tone === "healthy" ? CheckCircle2 : tone === "danger" ? XCircle : tone === "warning" ? AlertTriangle : CircleHelp;
  return <span className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}><Icon className="size-3.5 shrink-0" aria-hidden="true" /><span className="truncate">{children}</span></span>;
}

function StatePanel({ icon: Icon = CircleHelp, title, children, action }) {
  return <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/30 p-8 text-center"><Icon className="size-8 text-slate-500" aria-hidden="true" /><div><p className="font-medium text-slate-200">{title}</p>{children && <div className="mt-1 text-sm text-slate-400">{children}</div>}</div>{action}</div>;
}

function SectionError({ error, retry }) {
  return <StatePanel icon={WifiOff} title="Security data is unavailable" action={<Button variant="outline" onClick={retry}><RefreshCw />Try again</Button>}><p>We could not load this view. This does not mean Guard protection failed.</p><p className="mt-1 text-xs">{error?.message}</p></StatePanel>;
}

function StatCard({ label, value, detail, icon: Icon, tone = "neutral" }) {
  return <Card className="gap-3 border-slate-800 bg-slate-900/55 py-5"><CardContent className="px-5"><div className="flex items-start justify-between"><div><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p></div><span className={`rounded-lg border p-2 ${toneClasses[tone]}`}><Icon className="size-5" aria-hidden="true" /></span></div><p className="mt-2 text-xs text-slate-500">{detail}</p></CardContent></Card>;
}

function SensorGrid({ sensors, policy }) {
  const mapped = new Map(sensors.map((sensor) => [String(sensor.sensor).toLowerCase(), sensor]));
  const configured = policy?.components || {};
  return <div className="grid gap-3 @min-[768px]:grid-cols-2 @min-[1280px]:grid-cols-3">{SENSOR_ORDER.map((name) => {
    const sensor = mapped.get(name) || sensors.find((row) => String(row.sensor).toLowerCase().endsWith(name));
    const disabled = configured[name] === false;
    const stale = sensor && isTelemetryStale(sensor);
    const label = disabled ? "Disabled" : sensor ? healthLabel(sensor.state) : "No telemetry";
    const tone = disabled ? "neutral" : sensor?.state === "HEALTHY" && !stale ? "healthy" : sensor?.state === "FAILED" ? "danger" : "warning";
    const details = sensor?.details || {};
    return <article key={name} className="rounded-xl border border-slate-800 bg-slate-950/45 p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-medium text-slate-100">{displaySensorName(name)}</p><p className="mt-1 text-xs text-slate-500">{sensor?.version ? `Version ${sensor.version}` : "Version unavailable"}</p></div><Badge tone={tone}>{stale && !disabled ? "Telemetry stale" : label}</Badge></div><dl className="mt-4 grid grid-cols-2 gap-2 text-xs"><div><dt className="text-slate-500">Detecting</dt><dd className="mt-1 text-slate-200">{disabled ? "No" : details.detecting === false ? "No" : sensor ? "Yes" : "Unknown"}</dd></div><div><dt className="text-slate-500">Response</dt><dd className="mt-1 capitalize text-slate-200">{details.response_mode || policy?.response?.mode || "Not applicable"}</dd></div><div><dt className="text-slate-500">Last signal</dt><dd className="mt-1 text-slate-200">{relativeTime(sensor?.lastEventAt)}</dd></div><div><dt className="text-slate-500">Eligible</dt><dd className="mt-1 text-slate-200">{details.response_eligible === true ? "Yes" : ["crowdsec", "falco", "suricata"].includes(name) ? "Policy gated" : "Evidence dependent"}</dd></div></dl>{(sensor?.reason || stale) && <p className="mt-3 rounded-lg bg-slate-900 p-2 text-xs text-slate-400">{sensor?.reason || "CMC has not received recent telemetry. Guard firewall state is unknown, not failed."}</p>}</article>;
  })}</div>;
}

function Evidence({ value }) {
  const pairs = evidencePairs(value);
  if (!pairs.length) return <p className="text-sm text-slate-500">No structured evidence was attached.</p>;
  return <dl className="grid gap-2 @min-[640px]:grid-cols-2">{pairs.map(([key, entry], index) => <div key={`${key}-${index}`} className="min-w-0 rounded-lg bg-slate-950/60 p-3"><dt className="truncate text-xs text-slate-500">{key}</dt><dd className="mt-1 break-all text-sm text-slate-200">{entry}</dd></div>)}</dl>;
}

function IncidentDetail({ agentId, incidentId, onClose }) {
  const { server, dispatch } = useServerSandbox();
  const query = localQuery({ incident: server.incidents.find(row => row.id === incidentId) });
  const update = (status) => dispatch({ type: "SERVER_INCIDENT_STATUS", id: incidentId, status });
  const incident = query.data?.incident;
  return <Dialog open={Boolean(incidentId)} onOpenChange={(open) => !open && onClose()}><DialogContent className="max-h-[90vh] overflow-y-auto border-slate-700 bg-slate-950 text-slate-100 @min-[640px]:max-w-4xl"><DialogHeader><DialogTitle>Incident details</DialogTitle><DialogDescription>Only telemetry explicitly linked to this incident is shown.</DialogDescription></DialogHeader>{query.isLoading ? <StatePanel icon={Loader2} title="Loading incident" /> : query.error ? <SectionError error={query.error} retry={query.refetch} /> : incident && <div className="space-y-6"><div className="flex flex-wrap items-center gap-2"><Badge tone={statusTone(incident.severity)}>{incident.severity}</Badge><Badge tone={statusTone(incident.status)}>{incident.status}</Badge><span className="text-sm text-slate-400">{incident.summary}</span></div><div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={() => update("INVESTIGATING")}>Mark investigating</Button><Button size="sm" variant="outline" onClick={() => update("RESOLVED")}>Resolve</Button><Button size="sm" variant="outline" onClick={() => update("DISMISSED")}>Dismiss</Button></div><section><h3 className="mb-3 font-medium">Timeline</h3><ol className="space-y-3 border-l border-slate-700 pl-5">{(incident.events || []).map((event) => <li key={event.id || event.eventId} className="relative"><span className="absolute -left-[25px] top-1.5 size-2 rounded-full bg-cyan-400" /><p className="text-sm text-slate-200">{humanDetectionName(event)}</p><p className="mt-1 text-xs text-slate-500">{formatTime(event.occurredAt)} · {event.source}</p></li>)}</ol></section><section><h3 className="mb-3 font-medium">Evidence</h3><Evidence value={incident.evidence || incident.events?.[0]?.payload} /></section><details className="rounded-lg border border-slate-800 p-3"><summary className="cursor-pointer text-sm text-slate-300">Technical details</summary><pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all text-xs text-slate-500">{JSON.stringify(incident, null, 2)}</pre></details></div>}</DialogContent></Dialog>;
}

function IncidentsView({ agentId, query }) {
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("");
  const incidents = sortIncidents(query.data?.incidents || []).filter((item) => !status || item.status === status);
  if (query.isLoading) return <StatePanel icon={Loader2} title="Loading incidents" />;
  if (query.error) return <SectionError error={query.error} retry={query.refetch} />;
  return <><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-semibold">Incidents</h2><p className="text-sm text-slate-400">Correlated security activity requiring review.</p></div><select aria-label="Filter incidents by status" value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm"><option value="">All statuses</option>{["OPEN", "INVESTIGATING", "CONTAINED", "RESOLVED", "DISMISSED"].map((value) => <option key={value}>{value}</option>)}</select></div>{!incidents.length ? <StatePanel icon={CheckCircle2} title="No incidents in this view"><p>Individual events may still appear in the event explorer.</p></StatePanel> : <Table><TableHeader><TableRow><TableHead>Severity</TableHead><TableHead>Incident</TableHead><TableHead>Status</TableHead><TableHead>Sources</TableHead><TableHead>Source IP</TableHead><TableHead>Last seen</TableHead><TableHead>Events</TableHead></TableRow></TableHeader><TableBody>{incidents.map((incident) => <TableRow key={incident.id} className="cursor-pointer" tabIndex={0} onClick={() => setSelected(incident.id)} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && setSelected(incident.id)}><TableCell><Badge tone={statusTone(String(incident.severity).toUpperCase())}>{incident.severity}</Badge></TableCell><TableCell className="max-w-xs whitespace-normal"><p className="font-medium text-slate-100">{incident.summary || "Security incident"}</p><p className="text-xs text-slate-500">First seen {formatTime(incident.firstSeenAt)}</p></TableCell><TableCell><Badge tone={statusTone(incident.status)}>{incident.status}</Badge></TableCell><TableCell>{(incident.detectionSources || []).map(displaySensorName).join(", ") || "Unknown"}</TableCell><TableCell className="font-mono text-xs">{incident.sourceIP || "Not verified"}</TableCell><TableCell>{relativeTime(incident.lastSeenAt)}</TableCell><TableCell>{incident.eventCount}</TableCell></TableRow>)}</TableBody></Table>}<IncidentDetail agentId={agentId} incidentId={selected} onClose={() => setSelected(null)} /></>;
}

function ResponsesView({ query }) {
  const [, tick] = useState(0);
  useEffect(() => { const timer = setInterval(() => tick(value => value + 1), 1000); return () => clearInterval(timer); }, []);
  if (query.isLoading) return <StatePanel icon={Loader2} title="Loading responses" />;
  if (query.error) return <SectionError error={query.error} retry={query.refetch} />;
  const rows = query.data?.responses || [];
  return <div><div className="mb-4"><h2 className="text-xl font-semibold">Active responses</h2><p className="text-sm text-slate-400">Automatic temporary responses, suppressions, failures, and completed actions.</p></div>{!rows.length ? <StatePanel icon={ShieldCheck} title="No responses recorded" /> : <Table><TableHeader><TableRow><TableHead>Source</TableHead><TableHead>Action and scope</TableHead><TableHead>Reason</TableHead><TableHead>Status</TableHead><TableHead>Started</TableHead><TableHead>Expiration</TableHead><TableHead>Policy</TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={row.id}><TableCell><p className="font-mono text-xs">{row.sourceCIDR || "No verified IP"}</p><p className="text-xs text-slate-500">{displaySensorName(row.sensor || "policy")}</p></TableCell><TableCell className="max-w-xs whitespace-normal"><p>{row.action === "deny_source_ip_protected_ports" ? "Blocked on protected ports" : row.action === "deny_source_ip_hostwide_inbound_new" ? "Hostwide NEW connections blocked" : row.action}</p><p className="text-xs text-slate-500">{row.portGroup || "Policy-defined scope"}</p></TableCell><TableCell className="max-w-xs whitespace-normal">{row.failureReason || row.reason}</TableCell><TableCell><Badge tone={statusTone(row.status)}>{row.status === "SUPPRESSED" ? `Suppressed${row.reason ? ` — ${row.reason}` : ""}` : row.status}</Badge></TableCell><TableCell>{formatTime(row.startsAt)}</TableCell><TableCell>{row.expiresAt ? `${Math.max(0, Math.ceil((new Date(row.expiresAt) - Date.now()) / 1000))}s remaining · ${formatTime(row.expiresAt)}` : "No expiry reported"}</TableCell><TableCell>{row.policyRevision || "Unknown"}</TableCell></TableRow>)}</TableBody></Table>}<p className="mt-4 text-xs text-slate-500">“Blocked” means new connections from the source are denied within the shown scope. Existing connections may remain.</p></div>;
}

function EventCards({ events, family, empty }) {
  const rows = (events || []).filter((event) => !family || eventFamily(event) === family);
  if (!rows.length) return <StatePanel icon={FileSearch} title={empty || "No matching events"} />;
  return <div className="grid gap-3">{rows.slice(0, 100).map((event) => <article key={event.eventId} className="rounded-xl border border-slate-800 bg-slate-950/45 p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div className="min-w-0"><p className="break-words font-medium text-slate-100">{humanDetectionName(event)}</p><p className="mt-1 text-xs text-slate-500">{event.source} · {event.eventType}</p></div><Badge tone={statusTone(String(event.severity).toUpperCase())}>{event.severity}</Badge></div><div className="mt-3"><Evidence value={event.payload} /></div><p className="mt-3 text-xs text-slate-500">{formatTime(event.occurredAt)}{event.incidentId ? ` · Incident ${event.incidentId}` : ""}</p></article>)}</div>;
}

function SensorsView({ sensors, policy, events, eventsQuery }) {
  const [sensorTab, setSensorTab] = useState("health");
  return <div><div className="mb-4"><h2 className="text-xl font-semibold">Security engines</h2><p className="text-sm text-slate-400">Detection health and bounded evidence from each engine.</p></div><SensorGrid sensors={sensors} policy={policy} /><div className="mt-6 flex flex-wrap gap-2">{["health", "fim", "yarax", "crowdsec", "falco", "suricata"].map((name) => <Button key={name} size="sm" variant={sensorTab === name ? "default" : "outline"} onClick={() => setSensorTab(name)}>{name === "health" ? "All health" : displaySensorName(name)}</Button>)}</div>{sensorTab !== "health" && <div className="mt-4">{eventsQuery.error ? <SectionError error={eventsQuery.error} retry={eventsQuery.refetch} /> : eventsQuery.isLoading ? <StatePanel icon={Loader2} title="Loading detections" /> : <EventCards events={events} family={sensorTab} empty={`No recent ${displaySensorName(sensorTab)} detections`} />}</div>}</div>;
}

function PostureView({ events, query }) {
  if (query.isLoading) return <StatePanel icon={Loader2} title="Loading security posture" />;
  if (query.error) return <SectionError error={query.error} retry={query.refetch} />;
  const checks = events.filter((event) => eventFamily(event) === "sca").sort((a, b) => severityRank(b.severity) - severityRank(a.severity));
  return <div><h2 className="text-xl font-semibold">Security configuration & posture</h2><p className="mb-4 text-sm text-slate-400">Failed and regressed checks are prioritized. Guidance is shown only when supplied by the sensor.</p><EventCards events={checks} empty="No SCA findings reported" /></div>;
}

function InventoryView({ agentId, eventQuery }) {
  const [search, setSearch] = useState("");
  const { server } = useServerSandbox();
  const packages = localQuery({ packages: server.inventory.filter(row => `${row.packageName} ${row.version}`.toLowerCase().includes(search.toLowerCase())) });
  if (packages.isLoading) return <StatePanel icon={Loader2} title="Loading inventory" />;
  if (packages.error) return <SectionError error={packages.error} retry={packages.refetch} />;
  return <div><div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-xl font-semibold">Server inventory</h2><p className="text-sm text-slate-400">Packages plus structured OS, services, ports, network, account, and runtime inventory signals.</p></div><label className="relative"><Search className="absolute left-3 top-2.5 size-4 text-slate-500" /><Input aria-label="Search packages" className="w-72 border-slate-700 bg-slate-900 pl-9" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search packages" /></label></div><Card className="mb-5 border-slate-800 bg-slate-900/45"><CardHeader><CardTitle>Packages</CardTitle><CardDescription>Current package projection, paginated by the server.</CardDescription></CardHeader><CardContent>{!packages.data?.packages?.length ? <p className="text-sm text-slate-500">No packages reported.</p> : <Table><TableHeader><TableRow><TableHead>Package</TableHead><TableHead>Version</TableHead><TableHead>Ecosystem</TableHead><TableHead>Architecture</TableHead><TableHead>Last observed</TableHead></TableRow></TableHeader><TableBody>{packages.data.packages.map((row) => <TableRow key={row.id}><TableCell>{row.packageName}</TableCell><TableCell className="font-mono text-xs">{row.version}</TableCell><TableCell>{row.ecosystem}</TableCell><TableCell>{row.architecture || "—"}</TableCell><TableCell>{formatTime(row.lastObservedAt)}</TableCell></TableRow>)}</TableBody></Table>}</CardContent></Card><h3 className="mb-3 font-medium">Inventory activity</h3>{eventQuery.error ? <SectionError error={eventQuery.error} retry={eventQuery.refetch} /> : <EventCards events={eventQuery.data?.events || []} family="inventory" empty="No inventory events reported" />}</div>;
}

function EventsView({ agentId }) {
  const [filters, setFilters] = useState({ sensor: "", severity: "", type: "", page: 1 });
  const { server } = useServerSandbox();
  const matching = server.events.filter(row => (!filters.sensor || row.source.toLowerCase().includes(filters.sensor.toLowerCase())) && (!filters.type || row.eventType === filters.type) && (!filters.severity || row.severity === filters.severity));
  const query = localQuery({ events: matching.slice((filters.page - 1) * 50, filters.page * 50), next_page: matching.length > filters.page * 50 });
  return <div><h2 className="text-xl font-semibold">Security events</h2><p className="mb-4 text-sm text-slate-400">Lower-level telemetry for advanced investigation. Results are filtered and paginated on the server.</p><div className="mb-4 grid gap-2 @min-[640px]:grid-cols-3"><Input aria-label="Filter by sensor" placeholder="Sensor (for example Falco)" value={filters.sensor} onChange={(event) => setFilters({ ...filters, sensor: event.target.value, page: 1 })} /><Input aria-label="Filter by event type" placeholder="Exact event type" value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value, page: 1 })} /><select aria-label="Filter by severity" className="rounded-md border border-slate-700 bg-slate-900 px-3 text-sm" value={filters.severity} onChange={(event) => setFilters({ ...filters, severity: event.target.value, page: 1 })}><option value="">All severities</option>{["critical", "high", "medium", "low", "info"].map((value) => <option key={value}>{value}</option>)}</select></div>{query.isLoading ? <StatePanel icon={Loader2} title="Loading events" /> : query.error ? <SectionError error={query.error} retry={query.refetch} /> : <><EventCards events={query.data?.events || []} empty="No events match these filters" /><div className="mt-4 flex justify-end gap-2"><Button variant="outline" disabled={filters.page === 1} onClick={() => setFilters({ ...filters, page: filters.page - 1 })}>Previous</Button><span className="self-center text-sm text-slate-400">Page {filters.page}</span><Button variant="outline" disabled={!query.data?.next_page} onClick={() => setFilters({ ...filters, page: filters.page + 1 })}>Next</Button></div></>}</div>;
}

function PolicyView({ agentId, query, sensors }) {
  const [trusted, setTrusted] = useState({ cidr: "", description: "" });
  const [block, setBlock] = useState({ cidr: "", reason: "", expires_at: "" });
  const [interfaceName, setInterfaceName] = useState("");
  const [pendingMode, setPendingMode] = useState(null);
  const { dispatch, toast } = useServerSandbox();
  const [pendingAction, setPendingAction] = useState(null);
  const [moveReason, setMoveReason] = useState("");
  const mutate = (body) => dispatch({ type: "SERVER_POLICY_MUTATE", mutation: body });
  if (query.isLoading) return <StatePanel icon={Loader2} title="Loading security policy" />;
  if (query.error) return <SectionError error={query.error} retry={query.refetch} />;
  const data = query.data;
  const policy = data.policy;
  const conflicts = (cidr, entries) => { try { return entries.find((entry) => policyEntriesOverlap(cidr, entry.cidr)); } catch { return null; } };
  const addTrusted = async () => {
    try { normalizeIPOrCIDR(trusted.cidr); } catch (error) { return toast.error(error.message); }
    const conflict = conflicts(trusted.cidr, data.explicit_blocks || []);
    if (conflict) return toast.error(`This overlaps explicit block ${conflict.cidr}. Remove or move that rule first.`);
    await mutate({ action: "add_trusted", ...trusted }); setTrusted({ cidr: "", description: "" });
  };
  const addBlock = async () => {
    try { normalizeIPOrCIDR(block.cidr); } catch (error) { return toast.error(error.message); }
    const conflict = conflicts(block.cidr, data.trusted_ips || []);
    if (conflict) return toast.error(`This overlaps trusted source ${conflict.cidr}. Use “Move to explicit block” for an exact trusted entry.`);
    await mutate({ action: "add_block", ...block, expires_at: block.expires_at || null }); setBlock({ cidr: "", reason: "", expires_at: "" });
  };
  const candidateInterfaces = sensors.find((row) => String(row.sensor).toLowerCase().includes("suricata"))?.details?.candidate_interfaces || [];
  return <div className="space-y-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-xl font-semibold">Security policy</h2><p className="text-sm text-slate-400">Signed CMC policy only; the browser never talks to Guard or a sensor directly.</p></div><div className="text-right"><Badge tone={data.activation_state === "applied" ? "healthy" : "warning"}>{data.activation_state === "pending_activation" ? "Saved · pending activation" : data.activation_state}</Badge><p className="mt-2 text-xs text-slate-500">Revision {data.revision?.revision || policy.policy_revision} · {data.revision?.createdAt ? formatTime(data.revision.createdAt) : "Default policy"}</p></div></div><Card className="border-slate-800 bg-slate-900/45"><CardHeader><CardTitle>Automatic response mode</CardTitle><CardDescription>Observe records only. Shadow evaluates without enforcing. Enforce applies approved temporary blocks.</CardDescription></CardHeader><CardContent><div className="flex flex-wrap gap-2">{["observe", "shadow", "enforce"].map((mode) => <Button key={mode} variant={policy.response.mode === mode ? "default" : "outline"} onClick={() => mode === "enforce" && policy.response.mode !== "enforce" ? setPendingMode(mode) : mutate({ action: "set_mode", mode })} className="capitalize">{mode}</Button>)}</div><p className="mt-4 text-xs text-slate-500">Retention status: events {policy.retention?.events_days ?? 30} days; incidents, responses, and administrative audit {policy.retention?.incidents_days ?? 365} days. This view does not run deletion jobs.</p></CardContent></Card><div className="grid gap-5 @min-[1280px]:grid-cols-2"><Card className="border-slate-800 bg-slate-900/45"><CardHeader><CardTitle>Trusted IPs</CardTitle><CardDescription>Trusted sources are exempt from automatic security blocks, but still follow normal authentication and MFA requirements.</CardDescription></CardHeader><CardContent className="space-y-3"><div className="grid gap-2 @min-[640px]:grid-cols-2"><Input aria-label="Trusted IP or CIDR" placeholder="IPv4, IPv6, or CIDR" value={trusted.cidr} onChange={(event) => setTrusted({ ...trusted, cidr: event.target.value })} /><Input aria-label="Trusted source description" placeholder="Description (optional)" value={trusted.description} onChange={(event) => setTrusted({ ...trusted, description: event.target.value })} /></div><Button onClick={addTrusted} disabled={!trusted.cidr}>Add trusted source</Button>{(data.trusted_ips || []).map((entry) => <div key={entry.id || entry.cidr} className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 p-3"><div className="min-w-0"><p className="break-all font-mono text-sm">{entry.cidr}</p><p className="truncate text-xs text-slate-500">{entry.description || "No description"}</p></div><div className="flex shrink-0 gap-2"><Button size="sm" variant="outline" onClick={() => { setMoveReason(""); setPendingAction({ action: "move_trusted_to_block", cidr: entry.cidr }); }}>Move to block</Button><Button size="sm" variant="ghost" onClick={() => mutate({ action: "remove_trusted", cidr: entry.cidr })}>Remove</Button></div></div>)}{!data.trusted_ips?.length && <p className="text-sm text-slate-500">No trusted sources configured.</p>}</CardContent></Card><Card className="border-slate-800 bg-slate-900/45"><CardHeader><CardTitle>Explicit blocks</CardTitle><CardDescription>Administrator-enforced deny rules. They differ from automatic temporary responses and take precedence over temporary access windows.</CardDescription></CardHeader><CardContent className="space-y-3"><div className="grid gap-2 @min-[640px]:grid-cols-2"><Input aria-label="Blocked IP or CIDR" placeholder="IPv4, IPv6, or CIDR" value={block.cidr} onChange={(event) => setBlock({ ...block, cidr: event.target.value })} /><Input aria-label="Explicit block reason" placeholder="Reason (required)" value={block.reason} onChange={(event) => setBlock({ ...block, reason: event.target.value })} /><Input aria-label="Explicit block expiry" type="datetime-local" value={block.expires_at} onChange={(event) => setBlock({ ...block, expires_at: event.target.value })} /></div><Button onClick={addBlock} disabled={!block.cidr || !block.reason}>Add explicit block</Button>{(data.explicit_blocks || []).map((entry) => <div key={entry.id || entry.cidr} className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 p-3"><div className="min-w-0"><p className="break-all font-mono text-sm">{entry.cidr}</p><p className="truncate text-xs text-slate-500">{entry.reason} · {entry.expiresAt ? `expires ${formatTime(entry.expiresAt)}` : "no expiry"}</p></div><Button size="sm" variant="ghost" onClick={() => mutate({ action: "remove_block", cidr: entry.cidr })}>Remove</Button></div>)}{!data.explicit_blocks?.length && <p className="text-sm text-slate-500">No explicit blocks configured.</p>}</CardContent></Card></div><Card className="border-slate-800 bg-slate-900/45"><CardHeader><CardTitle>Sensor state</CardTitle><CardDescription>Disabling a sensor stops its detection. Guard MFA and firewall protection remain active.</CardDescription></CardHeader><CardContent className="grid gap-3 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-3">{["inventory", "fim", "sca", "yarax", "crowdsec", "falco", "suricata"].map((sensor) => <label key={sensor} className="flex items-center justify-between rounded-lg border border-slate-800 p-3"><span><span className="block text-sm">{displaySensorName(sensor)}</span><span className="text-xs capitalize text-slate-500">Response: {policy.response.sensors?.[sensor] ? policy.response.mode : "evidence only"}</span></span><Switch checked={policy.components?.[sensor] !== false} onCheckedChange={(enabled) => { if (!enabled) setPendingAction({ action: "set_sensor", sensor, enabled }); else mutate({ action: "set_sensor", sensor, enabled }); }} /></label>)}</CardContent></Card><Card className="border-slate-800 bg-slate-900/45"><CardHeader><CardTitle>Suricata monitored interface</CardTitle><CardDescription>Choose the external/server-facing capture interface when network topology is ambiguous. The selection is included in signed policy.</CardDescription></CardHeader><CardContent className="space-y-3"><div className="flex flex-wrap gap-2">{candidateInterfaces.map((candidate) => <Button key={candidate} size="sm" variant="outline" onClick={() => setInterfaceName(candidate)}>{candidate}</Button>)}</div><div className="flex gap-2"><Input aria-label="Suricata interface" placeholder="For example ens3" value={interfaceName} onChange={(event) => setInterfaceName(event.target.value)} /><Button disabled={!interfaceName} onClick={() => mutate({ action: "set_suricata_interface", interface: interfaceName })}>Save interface</Button></div></CardContent></Card><Dialog open={Boolean(pendingAction)} onOpenChange={(open) => !open && setPendingAction(null)}><DialogContent className="border-slate-700 bg-slate-950 text-slate-100"><DialogHeader><DialogTitle>{pendingAction?.action === "set_sensor" ? "Disable detection?" : "Move trusted source to explicit block?"}</DialogTitle><DialogDescription>{pendingAction?.action === "set_sensor" ? "This sensor will stop detecting. Guard MFA and firewall protection remain active." : "This source will be denied. Enter a reason for the explicit block."}</DialogDescription></DialogHeader>{pendingAction?.action === "move_trusted_to_block" && <Input aria-label="Move to block reason" value={moveReason} onChange={event => setMoveReason(event.target.value)} placeholder="Reason (required)" />}<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setPendingAction(null)}>Cancel</Button><Button disabled={pendingAction?.action === "move_trusted_to_block" && !moveReason.trim()} onClick={() => { mutate({ ...pendingAction, reason: moveReason }); setPendingAction(null); }}>Confirm</Button></div></DialogContent></Dialog><Dialog open={Boolean(pendingMode)} onOpenChange={(open) => !open && setPendingMode(null)}><DialogContent className="border-slate-700 bg-slate-950 text-slate-100"><DialogHeader><DialogTitle>Enable automatic enforcement?</DialogTitle><DialogDescription>Automatic protection will begin applying approved temporary IP blocks when detections meet policy requirements.</DialogDescription></DialogHeader><div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setPendingMode(null)}>Cancel</Button><Button onClick={async () => { await mutate({ action: "set_mode", mode: "enforce" }); setPendingMode(null); }}>Enable Enforce</Button></div></DialogContent></Dialog></div>;
}

function Overview({ agent, sensors, incidents, responses, events, provisioning, policy }) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);
  const state = deriveProtectionState(sensors, provisioning, now);
  const open = incidents.filter((incident) => OPEN_INCIDENT_STATES.has(incident.status));
  const active = responses.filter((response) => ACTIVE_RESPONSE_STATES.has(response.status) && (!response.expiresAt || new Date(response.expiresAt) > new Date()));
  const critical = events.filter((event) => event.severity === "critical").length;
  const latest = events[0];
  const stale = sensors.some((sensor) => isTelemetryStale(sensor));
  return <div className="space-y-6"><section className={`rounded-2xl border p-6 ${toneClasses[state.tone]}`}><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="mb-3 flex items-center gap-2 text-sm font-medium"><ShieldCheck className="size-5" />Server protection</div><h2 className="text-3xl font-semibold tracking-tight">{state.protection}</h2><p className="mt-2 text-sm opacity-80">{state.coverage}</p></div><div className="text-right text-sm"><p className="font-medium">{agent?.domain || "Server"}</p><p className="mt-1 font-mono text-xs opacity-70">{agent?.ipAddress || agent?.id}</p><p className="mt-3 capitalize">Response mode: {policy?.response?.mode || "unknown"}</p></div></div>{stale && <div className="mt-5 flex items-start gap-2 rounded-lg border border-amber-400/20 bg-black/15 p-3 text-sm"><Clock3 className="mt-0.5 size-4 shrink-0" /><span>Telemetry is stale for at least one component. This is a CMC visibility warning, not proof that Guard firewall protection stopped.</span></div>}</section><section className="grid gap-3 @min-[640px]:grid-cols-2 @min-[1280px]:grid-cols-4"><StatCard label="Active incidents" value={open.length} detail={open.length ? "Open or under investigation" : "No correlated incident needs attention"} icon={Siren} tone={open.some((row) => row.severity === "critical") ? "danger" : open.length ? "warning" : "healthy"} /><StatCard label="Active automatic blocks" value={active.filter((row) => row.status === "APPLIED").length} detail="Approved new-connection blocks" icon={Ban} tone={active.length ? "warning" : "neutral"} /><StatCard label="Critical findings" value={critical} detail="Within the recent event window" icon={AlertTriangle} tone={critical ? "danger" : "healthy"} /><StatCard label="Last security event" value={latest ? relativeTime(latest.occurredAt) : "None"} detail={latest ? humanDetectionName(latest) : "No telemetry reported"} icon={Activity} /></section><section><div className="mb-3 flex items-end justify-between"><div><h2 className="text-xl font-semibold">Sensor health</h2><p className="text-sm text-slate-400">Guard is the core availability signal; optional sensor issues reduce coverage.</p></div></div><SensorGrid sensors={sensors} policy={policy} /></section><section className="grid gap-4 @min-[1024px]:grid-cols-2"><Card className="border-slate-800 bg-slate-900/45"><CardHeader><CardTitle>Provisioning</CardTitle><CardDescription>Latest installation lifecycle report.</CardDescription></CardHeader><CardContent>{provisioning ? <dl className="grid grid-cols-2 gap-3 text-sm"><div><dt className="text-slate-500">Stage</dt><dd className="mt-1 capitalize">{String(provisioning.stage).replaceAll("_", " ")}</dd></div><div><dt className="text-slate-500">Protection</dt><dd className="mt-1"><Badge tone={statusTone(state.protection)}>{state.protection}</Badge></dd></div><div><dt className="text-slate-500">Release</dt><dd className="mt-1">{provisioning.releaseVersion || "Unknown"}</dd></div><div><dt className="text-slate-500">Updated</dt><dd className="mt-1">{formatTime(provisioning.createdAt)}</dd></div>{provisioning.failureMessage && <div className="col-span-2"><dt className="text-slate-500">Issue</dt><dd className="mt-1 text-amber-200">{provisioning.failureMessage}</dd></div>}</dl> : <p className="text-sm text-slate-500">No provisioning report received.</p>}</CardContent></Card><Card className="border-slate-800 bg-slate-900/45"><CardHeader><CardTitle>Guard access security</CardTitle><CardDescription>Protected services: {(agent?.ports || []).join(", ") || "not reported"}</CardDescription></CardHeader><CardContent><p className="text-sm text-slate-300">SSH/Kubernetes access requires a TOTP verification before the protected port temporarily opens for the verified source IP.</p><p className="mt-3 text-xs text-slate-500">Trusted sources remain subject to normal authentication and MFA requirements.</p></CardContent></Card></section></div>;
}

export default function ServerSecurityConsole() {
  const { server, dispatch, toast } = useServerSandbox();
  const agentId = server.activeServerId;
  const router = { push: () => dispatch({ type: "SERVER_SET_VIEW", view: "fleet" }) };
  const tab = server.tab;
  const setTab = (tab) => dispatch({ type: "SERVER_SET_TAB", tab });
  const refresh = () => { dispatch({ type: "SERVER_HEARTBEAT", now: Date.now() }); toast.success("Security telemetry refreshed"); };
  const agentQuery = localQuery(server.servers.find(row => row.id === agentId));
  const health = localQuery({ sensors: server.sensors }, refresh);
  const incidents = localQuery({ incidents: server.incidents }, refresh);
  const responses = localQuery({ responses: server.responses }, refresh);
  const events = localQuery({ events: server.events }, refresh);
  const policy = localQuery(server.policy, refresh);
  const provisioning = localQuery({ provisioning: server.provisioning }, refresh);
  const sensorRows = health.data?.sensors || [];
  const incidentRows = incidents.data?.incidents || [];
  const responseRows = responses.data?.responses || [];
  const eventRows = events.data?.events || [];
  const overviewQueryError = [health, incidents, responses, events, policy, provisioning].find((query) => query.error);
  const overviewLoading = [health, incidents, responses, events, policy, provisioning].some((query) => query.isLoading);
  return <main className="min-h-full bg-[radial-gradient(circle_at_top_right,rgba(8,145,178,.13),transparent_32%),#05070a] px-4 py-6 text-slate-100 @min-[640px]:px-6 @min-[1024px]:px-8"><div className="mx-auto max-w-7xl"><header className="mb-6 flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" aria-label="Back to servers" onClick={() => router.push("/servers")}><ChevronLeft /></Button><div><p className="text-xs font-medium uppercase tracking-[.2em] text-cyan-400">Silence AI</p><h1 className="text-2xl font-semibold tracking-tight @min-[640px]:text-3xl">Server Security</h1><p className="mt-1 text-sm text-slate-400">{agentQuery.data.domain} · {agentQuery.data.ipAddress || "IP not reported"}</p></div></div><div className="flex items-center gap-2"><Badge tone="neutral"><LockKeyhole />Tenant isolated</Badge><Button variant="outline" onClick={refresh}><RefreshCw />Refresh</Button></div></header><Tabs value={tab} onValueChange={setTab}><div className="mb-6 overflow-x-auto pb-1"><TabsList className="h-auto min-w-max border border-slate-800 bg-slate-900/80 p-1">{[["overview", "Overview"], ["incidents", "Incidents"], ["responses", "Responses"], ["sensors", "Sensors"], ["posture", "Posture"], ["inventory", "Inventory"], ["events", "Events"], ["policy", "Policy"]].map(([value, label]) => <TabsTrigger key={value} value={value} className="px-3 py-2 data-[state=active]:bg-slate-700">{label}</TabsTrigger>)}</TabsList></div><TabsContent value="overview">{overviewLoading ? <StatePanel icon={Loader2} title="Loading security overview" /> : overviewQueryError ? <SectionError error={overviewQueryError.error} retry={() => Promise.all([health.refetch(), incidents.refetch(), responses.refetch(), events.refetch(), policy.refetch(), provisioning.refetch()])} /> : <Overview agent={{ ...agentQuery.data, id: agentId }} sensors={sensorRows} incidents={incidentRows} responses={responseRows} events={eventRows} provisioning={provisioning.data?.provisioning} policy={policy.data?.policy} />}</TabsContent><TabsContent value="incidents"><IncidentsView agentId={agentId} query={incidents} /></TabsContent><TabsContent value="responses"><ResponsesView query={responses} /></TabsContent><TabsContent value="sensors">{health.isLoading ? <StatePanel icon={Loader2} title="Loading sensor health" /> : health.error ? <SectionError error={health.error} retry={health.refetch} /> : <SensorsView sensors={sensorRows} policy={policy.data?.policy} events={eventRows} eventsQuery={events} />}</TabsContent><TabsContent value="posture"><PostureView events={eventRows} query={events} /></TabsContent><TabsContent value="inventory"><InventoryView agentId={agentId} eventQuery={events} /></TabsContent><TabsContent value="events"><EventsView agentId={agentId} /></TabsContent><TabsContent value="policy"><PolicyView agentId={agentId} query={policy} sensors={sensorRows} /></TabsContent></Tabs></div></main>;
}
