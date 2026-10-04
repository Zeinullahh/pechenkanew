"use client";
/* eslint-disable react/prop-types */

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Check, CheckCircle2, Copy, Download, HardDriveDownload, Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { useServerSandbox, localQuery } from "./ServerContext";
import { NATIVE_PACKAGES_METADATA } from "../serverMockData";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { installCommand, packagePresentation, provisioningPresentation } from "./native-package-model.mjs";

function formatBytes(value) {
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function PackageCard({ metadata, selected, onSelect }) {
  const item = packagePresentation(metadata);
  return <button type="button" role="radio" aria-checked={selected} onClick={() => onSelect(item.family)} className={`rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${selected ? "border-cyan-400 bg-cyan-500/10" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
    <div className="flex items-start justify-between gap-3"><span className="rounded-lg bg-slate-800 p-2 text-cyan-300"><HardDriveDownload className="size-5" /></span>{selected && <Check className="size-5 text-cyan-300" aria-hidden="true" />}</div>
    <h3 className="mt-4 font-semibold text-slate-100">{item.os}</h3><p className="mt-1 text-sm text-slate-400">{item.versions}</p>
    <dl className="mt-4 grid grid-cols-2 gap-2 text-xs"><dt className="text-slate-500">Architecture</dt><dd className="text-right font-mono text-slate-300">{item.architecture}</dd><dt className="text-slate-500">Package</dt><dd className="text-right text-slate-300">{item.packageType}</dd><dt className="text-slate-500">Native entry</dt><dd className="text-right text-slate-300">{item.version}</dd><dt className="text-slate-500">Size</dt><dd className="text-right text-slate-300">{formatBytes(item.size)}</dd></dl>
  </button>;
}

function CopyRow({ label, value, secret = false, disabled = false }) {
  const { toast } = useServerSandbox();
  const copy = async () => { if (disabled) return; try { await navigator.clipboard.writeText(value); toast.success(`${label} copied`); } catch { toast.error(`Could not copy ${label.toLowerCase()}`); } };
  return <div className="min-w-0 rounded-lg border border-slate-700 bg-black/30 p-3"><div className="mb-2 flex items-center justify-between gap-2"><span className="text-xs font-medium text-slate-400">{label}</span><Button type="button" size="sm" variant="ghost" aria-label={`Copy ${label.toLowerCase()}`} onClick={copy} disabled={disabled}><Copy className="size-4" />Copy</Button></div><code className={`block max-w-full overflow-x-auto whitespace-nowrap text-xs ${secret ? "text-amber-200" : "text-slate-200"}`}>{value}</code></div>;
}

export default function NativeServerSetupDialog({ open, onOpenChange, agent }) {
  const [family, setFamily] = useState(null);
  const { server, dispatch, toast } = useServerSandbox();
  const locator = server.enrollmentLocators[agent?.id] || null;
  const [issuing, setIssuing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [confirmPurpose, setConfirmPurpose] = useState(null);
  const [now, setNow] = useState(Date.now());
  const initiallyEnrolled = Boolean(agent?.machineCredentialIssuedAt);
  const catalog = localQuery({ packages: NATIVE_PACKAGES_METADATA });
  const provisioning = localQuery({ provisioning: server.byAgent[agent?.id]?.provisioning });
  const enrolled = initiallyEnrolled || Boolean(provisioning.data?.provisioning);

  useEffect(() => { if (!open) { setConfirmPurpose(null); setFamily(null); } }, [open]);
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);

  const selected = catalog.data?.packages?.find((item) => item.family === family) || null;
  const expiresAt = locator ? new Date(locator.expires_at).getTime() : 0;
  const remaining = Math.max(0, Math.ceil((expiresAt - now) / 1000));
  const expired = Boolean(locator) && remaining === 0;
  const state = useMemo(() => provisioningPresentation(provisioning.data?.provisioning, enrolled), [provisioning.data, enrolled]);

  const download = () => {
    if (!selected) return;
    setDownloading(false);
    toast.success(`Demo download ready: ${selected.filename}`);
  };
  const issue = (purpose) => {
    setIssuing(false);
    dispatch({ type: "SERVER_GENERATE_TOKEN", id: agent.id, purpose, now: Date.now(), token: `demo-${crypto.randomUUID()}` });
    setConfirmPurpose(null);
  };

  return <><Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto border-slate-700 bg-[#080b10] p-5 text-slate-100 @min-[640px]:p-6"><DialogHeader><DialogTitle>Install Server Security</DialogTitle><DialogDescription className="text-slate-400">{agent?.domain} · choose the server operating system manually. Package download does not mean the remote server is installed.</DialogDescription></DialogHeader>
    <section aria-labelledby="package-choice"><h2 id="package-choice" className="mb-3 text-sm font-semibold text-slate-200">1. Choose a native package</h2>{catalog.isLoading ? <div className="flex items-center gap-2 py-8 text-sm text-slate-400"><Loader2 className="size-4 animate-spin" />Loading verified package metadata…</div> : catalog.error ? <div role="alert" className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">{catalog.error.message}</div> : <div role="radiogroup" aria-label="Native package family" className="grid gap-3 @min-[640px]:grid-cols-2">{catalog.data?.packages?.map((item) => <PackageCard key={item.family} metadata={item} selected={family === item.family} onSelect={setFamily} />)}</div>}</section>
    {selected && <section className="space-y-3 border-t border-slate-800 pt-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-sm font-semibold">2. Download and install</h2><p className="mt-1 max-w-xl break-all text-xs text-slate-500">{selected.filename}</p></div><Button type="button" onClick={download} disabled={downloading}>{downloading ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}Download {selected.family === "deb" ? ".deb" : ".rpm"}</Button></div><CopyRow label="Install command" value={installCommand(selected)} /><details className="rounded-lg border border-slate-800 p-3 text-xs text-slate-400"><summary className="cursor-pointer text-slate-300">Package integrity details</summary><p className="mt-2">Verified by the CMC against signed native package metadata before delivery.</p><code className="mt-2 block overflow-x-auto whitespace-nowrap">SHA-256: {selected.sha256}</code></details></section>}
    <section className="space-y-3 border-t border-slate-800 pt-5"><h2 className="text-sm font-semibold">3. Enroll interactively</h2><CopyRow label="Enrollment command" value="sudo silence-server enroll" /><div className={`rounded-lg border p-3 text-sm ${state.tone === "emerald" ? "border-emerald-500/30 bg-emerald-500/10" : state.tone === "rose" ? "border-rose-500/30 bg-rose-500/10" : state.tone === "amber" ? "border-amber-500/30 bg-amber-500/10" : "border-slate-700 bg-slate-900/60"}`}><div className="flex items-center gap-2 font-medium"><ShieldCheck className="size-4" />{state.label}</div><p className="mt-1 text-xs text-slate-400">{state.detail}</p></div>
      {!enrolled ? <Button type="button" variant="outline" onClick={() => locator ? setConfirmPurpose("INITIAL") : issue("INITIAL")} disabled={issuing}>{issuing ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}{locator ? "Replace enrollment code" : "Generate enrollment code"}</Button> : <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3"><div className="flex items-center gap-2 text-sm font-medium text-emerald-300"><CheckCircle2 className="size-4" />This server is enrolled</div><p className="mt-1 text-xs text-slate-400">A normal INITIAL code is no longer available. Use re-enrollment only to recover lost local identity.</p><Button type="button" variant="outline" className="mt-3" onClick={() => setConfirmPurpose("REENROLL")}>Re-enroll server</Button></div>}
      {locator && <div role="status" className={`space-y-2 rounded-lg border p-3 ${expired ? "border-rose-500/30 bg-rose-500/10" : "border-amber-500/30 bg-amber-500/10"}`}><div className="flex items-start gap-2"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-300" /><p className="text-xs text-slate-300">Single-use secret. {expired ? "This code has expired; generate a fresh authorization." : `Expires ${new Date(locator.expires_at).toLocaleString()} (${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")} remaining). Paste it only into the interactive CLI prompt.`}</p></div><CopyRow label={locator.purpose === "REENROLL" ? "Recovery enrollment code" : "Enrollment code"} value={locator.locator} secret disabled={expired} /></div>}
    </section>
  </DialogContent></Dialog><AlertDialog open={Boolean(confirmPurpose)} onOpenChange={(value) => !value && setConfirmPurpose(null)}><AlertDialogContent className="border-slate-700 bg-slate-950 text-slate-100"><AlertDialogHeader><AlertDialogTitle>{confirmPurpose === "REENROLL" ? "Authorize server re-enrollment?" : "Replace the current enrollment code?"}</AlertDialogTitle><AlertDialogDescription>{confirmPurpose === "REENROLL" ? "A short-lived recovery code will be issued. Existing machine credentials are replaced only after that code is successfully exchanged by the native CLI." : "The current unused enrollment code will stop working when a replacement is issued."}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => issue(confirmPurpose)}>{confirmPurpose === "REENROLL" ? "Generate recovery code" : "Replace code"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></>;
}
