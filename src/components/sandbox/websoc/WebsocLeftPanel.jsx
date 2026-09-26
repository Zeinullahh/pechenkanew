"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import GlowButton from "./GlowButton";
import CountryTooltip from "./CountryTooltip";
import {
  ChevronDown,
  ChevronUp,
  Trash,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Ban,
  Plus,
  FileText,
  Pencil,
  Copy,
  Globe,
} from "lucide-react";
import { COUNTRIES } from "../websocMockData";

/* =========================================================================
   1. AgentSetupBox — 1:1 match of websoc/CMC/src/components/custom/agent_setup_box.jsx
   ========================================================================= */
function AgentSetupBox({ agent }) {
  const metaVerification = useMemo(() => {
    const content = (agent?.verificationKey || "").trim();
    return {
      tagName: "websoc-verification",
      content,
      html: `<meta name="websoc-verification" content="${content}" />`,
    };
  }, [agent?.verificationKey]);

  const acmeDelegation = useMemo(() => {
    return (
      agent?.acmeDelegation || {
        type: "CNAME",
        name: agent?.domain ? `_acme-challenge.${agent.domain}` : "",
        value: agent?.verificationKey
          ? `${agent.verificationKey}.acme.web-soc.silenceai.net`
          : "",
        ttl: 300,
      }
    );
  }, [agent?.acmeDelegation, agent?.domain, agent?.verificationKey]);

  const dnsRouting = agent?.dnsRouting || {
    type: "A",
    name: agent?.domain || "",
    value: "94.131.90.73",
    ttl: 300,
  };

  const asAbsoluteHostname = (value) => {
    if (!value) return "";
    return value.endsWith(".") ? value : `${value}.`;
  };

  const copyToClipboard = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="p-1 hover:bg-gray-200 rounded text-black"
          title="Open setup details"
          type="button"
        >
          <FileText size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-950 text-white border-zinc-800 max-w-2xl">
        <DialogHeader>
          <DialogTitle>Domain setup details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="rounded border border-zinc-800 bg-zinc-900 p-3 text-sm">
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <span className="font-medium">{agent?.domain}</span>
            </div>
            <p className="text-zinc-300 mt-2">
              DNS delegation: {agent?.verified ? "verified" : "not verified"}
            </p>
            <p className="text-zinc-300">
              DNS routing: {agent?.dnsRouted ? "points to WebSOC edge (active)" : "not pointed to WebSOC edge yet"}
            </p>
          </div>

          <div className="rounded border border-cyan-900 bg-zinc-900 p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-cyan-300">Step 1. Ownership meta tag</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  type="button"
                  className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => copyToClipboard(metaVerification?.content || "")}
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy key
                </Button>
                <Button
                  type="button"
                  className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => copyToClipboard(metaVerification?.html || "")}
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy tag
                </Button>
              </div>
            </div>
            <div className="bg-black/40 p-3 rounded text-xs space-y-1">
              <p><span className="text-zinc-400">Name:</span> {metaVerification.tagName}</p>
              <p><span className="text-zinc-400">Content:</span> <span className="break-all">{metaVerification.content}</span></p>
              <pre className="bg-black/60 mt-2 p-2 rounded whitespace-pre-wrap break-all">{metaVerification.html}</pre>
            </div>
          </div>

          <div className="rounded border border-cyan-900 bg-zinc-900 p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-cyan-300">Step 2. ACME delegation CNAME</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  type="button"
                  className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => copyToClipboard(acmeDelegation?.name || "")}
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy name
                </Button>
                <Button
                  type="button"
                  className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => copyToClipboard(asAbsoluteHostname(acmeDelegation?.value || ""))}
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy hostname
                </Button>
              </div>
            </div>
            <div className="bg-black/40 p-3 rounded text-xs space-y-1">
              <p><span className="text-zinc-400">Type:</span> {acmeDelegation.type}</p>
              <p><span className="text-zinc-400">Name:</span> <span className="break-all">{acmeDelegation.name}</span></p>
              <p><span className="text-zinc-400">Hostname (target):</span> <span className="break-all">{asAbsoluteHostname(acmeDelegation.value)}</span></p>
              <p><span className="text-zinc-400">TTL:</span> {acmeDelegation.ttl}</p>
            </div>
          </div>

          <div className="rounded border border-green-900 bg-zinc-900 p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-green-300">Step 3. DNS A record to route traffic via WebSOC</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  type="button"
                  className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => copyToClipboard(dnsRouting?.name || "")}
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy name
                </Button>
                <Button
                  type="button"
                  className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => copyToClipboard(dnsRouting?.value || "")}
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy IP
                </Button>
              </div>
            </div>
            <div className="bg-black/40 p-3 rounded text-xs space-y-1">
              <p><span className="text-zinc-400">Type:</span> {dnsRouting.type}</p>
              <p><span className="text-zinc-400">Name:</span> <span className="break-all">{dnsRouting.name}</span></p>
              <p><span className="text-zinc-400">IP address:</span> {dnsRouting.value}</p>
              <p><span className="text-zinc-400">TTL:</span> {dnsRouting.ttl}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* =========================================================================
   2. AgentConfigBox — 1:1 match of websoc/CMC/src/components/custom/agent_config.jsx
   ========================================================================= */
function AgentConfigBox({ agent, dispatch }) {
  const [ports, setPorts] = useState(agent?.ports || [80, 443]);
  const [twoFA, setTwoFA] = useState(agent?.enable2FA || false);
  const [ipAddress, setIpAddress] = useState(agent?.ipAddress || "");
  const [open, setOpen] = useState(false);

  const togglePort = (port) => {
    setPorts((prev) =>
      prev.includes(port) ? prev.filter((p) => p !== port) : [...prev, port]
    );
  };

  const saveConfig = () => {
    dispatch?.({
      type: "WEBSOC_UPDATE_AGENT_CONFIG",
      id: agent.id,
      ipAddress,
      ports,
      enable2FA: twoFA,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil size={18} className="cursor-pointer hover:text-blue-400 text-black" />
      </DialogTrigger>
      <DialogContent className="bg-transparent p-4 text-white backdrop-blur-md border-white/10 max-w-xl">
        <DialogHeader>
          <DialogTitle>Agent Configuration</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor={`ip-address-${agent.id}`}>IP Address</Label>
            <Input
              id={`ip-address-${agent.id}`}
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="Enter IP address"
              className="text-white bg-white/10 border-white/20 placeholder:text-gray-400"
            />
          </div>

          <div>
            <p className="mb-2 text-sm">Allowed Ports</p>
            {[22, 80, 443].map((port) => (
              <div key={port} className="flex items-center gap-2">
                <Checkbox
                  id={`port-${agent.id}-${port}`}
                  checked={ports.includes(port)}
                  onCheckedChange={() => togglePort(port)}
                />
                <label htmlFor={`port-${agent.id}-${port}`} className="text-sm">Port {port}</label>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm">Enable 2FA</p>
            <Switch checked={twoFA} onCheckedChange={setTwoFA} />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            className="bg-transparent hover:bg-transparent hover:text-blue-300 text-blue-500 border border-zinc-700 w-full py-5"
            onClick={saveConfig}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* =========================================================================
   3. AgentAddBox — 1:1 match of websoc/CMC/src/components/custom/agent_register.jsx
   ========================================================================= */
function AgentAddBox({ dispatch }) {
  const [domain, setDomain] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [verificationInfo, setVerificationInfo] = useState(null);
  const [metaVerification, setMetaVerification] = useState(null);
  const [acmeDelegation, setAcmeDelegation] = useState(null);
  const [dnsRouting, setDnsRouting] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [open, setOpen] = useState(false);

  const registerAgent = (e) => {
    e.preventDefault();
    if (!domain.trim()) return;

    const key = `ws-verif-${Math.random().toString(36).slice(2, 8)}`;
    setMetaVerification({
      tagName: "websoc-verification",
      content: key,
      html: `<meta name="websoc-verification" content="${key}" />`,
    });
    setAcmeDelegation({
      type: "CNAME",
      name: `_acme-challenge.${domain.trim().toLowerCase()}`,
      value: `${key}.acme.web-soc.silenceai.net`,
      ttl: 300,
    });
    setDnsRouting({
      type: "A",
      name: domain.trim().toLowerCase(),
      value: "94.131.90.73",
      ttl: 300,
    });
    setVerificationInfo(true);

    dispatch?.({
      type: "WEBSOC_ADD_AGENT",
      domain: domain.trim().toLowerCase(),
      ipAddress: ipAddress.trim() || "185.199.110.153",
    });
  };

  const handleVerify = () => {
    setVerificationStatus("pending");
    setTimeout(() => {
      setVerificationStatus("success");
    }, 700);
  };

  const copyToClipboard = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback
    }
  };

  const resetForm = () => {
    setDomain("");
    setIpAddress("");
    setMetaVerification(null);
    setVerificationInfo(null);
    setAcmeDelegation(null);
    setDnsRouting(null);
    setVerificationStatus(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent hover:text-blue-900 text-black border border-zinc-700 w-full py-2 rounded-full">
          <Plus className="text-blue-600" />
          Register new agent
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-transparent p-4 text-white backdrop-blur-sm border-white/10 max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg text-white">Agent registration</DialogTitle>
        </DialogHeader>

        {verificationInfo ? (
          <div className="mt-4 space-y-4">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-violet-600/30">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-sm text-violet-300 break-words">
                  Step 1. Add ownership meta tag on your origin website
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    type="button"
                    onClick={() => copyToClipboard(metaVerification?.content || "")}
                    className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Copy className="mr-1 h-3 w-3" />
                    Copy key
                  </Button>
                  <Button
                    type="button"
                    onClick={() => copyToClipboard(metaVerification?.html || "")}
                    className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Copy className="mr-1 h-3 w-3" />
                    Copy tag
                  </Button>
                </div>
              </div>
              {metaVerification && (
                <div className="bg-black/50 p-3 rounded text-sm space-y-1 overflow-x-auto">
                  <p><span className="text-gray-400">Name:</span> {metaVerification.tagName}</p>
                  <p><span className="text-gray-400">Content:</span> <span className="break-all">{metaVerification.content}</span></p>
                  <pre className="bg-black/60 mt-2 p-2 rounded text-xs whitespace-pre-wrap break-all">{metaVerification.html}</pre>
                </div>
              )}
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-600/30">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-sm text-cyan-300 break-words">
                  Step 2. Add ACME delegation CNAME
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    type="button"
                    onClick={() => copyToClipboard(acmeDelegation?.name || "")}
                    className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Copy className="mr-1 h-3 w-3" />
                    Copy name
                  </Button>
                  <Button
                    type="button"
                    onClick={() => copyToClipboard(acmeDelegation?.value || "")}
                    className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Copy className="mr-1 h-3 w-3" />
                    Copy hostname
                  </Button>
                </div>
              </div>
              {acmeDelegation && (
                <div className="bg-black/50 p-3 rounded text-sm space-y-1 overflow-x-auto">
                  <p><span className="text-gray-400">Type:</span> {acmeDelegation.type}</p>
                  <p><span className="text-gray-400">Name:</span> <span className="break-all">{acmeDelegation.name}</span></p>
                  <p><span className="text-gray-400">Hostname (target):</span> <span className="break-all">{acmeDelegation.value}</span></p>
                  <p><span className="text-gray-400">TTL:</span> {acmeDelegation.ttl}</p>
                </div>
              )}
            </div>

            {verificationStatus === "success" && (
              <div className="bg-gray-800/50 p-4 rounded-lg border border-green-600/40">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-sm text-green-300 break-words">
                    Step 3. DNS A record to add (switch traffic through WebSOC)
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      type="button"
                      onClick={() => copyToClipboard(dnsRouting?.name || "")}
                      className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Copy name
                    </Button>
                    <Button
                      type="button"
                      onClick={() => copyToClipboard(dnsRouting?.value || "")}
                      className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Copy IP
                    </Button>
                  </div>
                </div>
                {dnsRouting && (
                  <div className="bg-black/50 p-3 rounded text-sm space-y-1 overflow-x-auto">
                    <p><span className="text-gray-400">Type:</span> {dnsRouting.type}</p>
                    <p><span className="text-gray-400">Name:</span> <span className="break-all">{dnsRouting.name}</span></p>
                    <p><span className="text-gray-400">IP address:</span> {dnsRouting.value}</p>
                    <p><span className="text-gray-400">TTL:</span> {dnsRouting.ttl}</p>
                  </div>
                )}
              </div>
            )}

            {/* Verify Button and Status */}
            <div className="mt-6 space-y-4">
              <Button
                onClick={handleVerify}
                disabled={verificationStatus === "pending" || verificationStatus === "success"}
                className={`w-full py-3 text-white ${verificationStatus === "success" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {verificationStatus === "pending" ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : verificationStatus === "success" ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Ownership and DNS verified
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Verify ownership and DNS
                  </>
                )}
              </Button>
            </div>

            <DialogFooter className="mt-6">
              <Button
                className="bg-transparent hover:bg-transparent hover:text-blue-300 text-blue-500 border border-zinc-700 w-full py-3"
                onClick={resetForm}
              >
                {verificationStatus === "success" ? "Done" : "Cancel"}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={registerAgent} className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="domain-input">Domain</Label>
              <Input
                id="domain-input"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="text-white bg-white/10 border-white/20 placeholder:text-gray-400"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="ip-input">Origin IP Address</Label>
              <Input
                id="ip-input"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="192.0.2.1"
                className="text-white bg-white/10 border-white/20 placeholder:text-gray-400"
                required
              />
            </div>
            <p className="text-xs text-gray-400">
              Enter your current origin host or IP (the server WebSOC should proxy to),
              for example: <span className="break-all">origin.your-domain.com</span> or{" "}
              <span className="break-all">203.0.113.10</span>.
            </p>
            <DialogFooter>
              <Button
                className="bg-transparent hover:bg-transparent hover:text-blue-300 text-blue-500 border border-zinc-700 w-full py-5"
                type="submit"
              >
                Register
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* =========================================================================
   4. DomainSelector — 1:1 match of websoc/CMC/src/components/custom/domain_selector.jsx
   ========================================================================= */
function DomainSelector({ state, dispatch }) {
  const websoc = state.websoc;
  const agents = websoc?.agents || [];
  const selected = websoc?.selectedDomains || [];
  const [open, setOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [verifyingId, setVerifyingId] = useState(null);

  const handleToggle = (domain) => {
    dispatch({ type: "WEBSOC_DOMAIN_TOGGLE", domain });
  };

  const handleVerify = (agentId, e) => {
    e.stopPropagation();
    setVerifyingId(agentId);
    setTimeout(() => {
      dispatch({ type: "WEBSOC_VERIFY_AGENT", id: agentId });
      setVerifyingId(null);
    }, 600);
  };

  const handleDelete = (agent) => {
    setAgentToDelete(agent);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (agentToDelete) {
      dispatch({
        type: "WEBSOC_DELETE_AGENT",
        id: agentToDelete.id,
        domain: agentToDelete.domain,
      });
      setAgentToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const cancelDelete = () => {
    setAgentToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="py-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <GlowButton
            color="#FF00B7"
            className="bg-zinc-50 hover:text-blue-950 text-black text-md font-bold flex items-center gap-2"
          >
            {selected.length > 0
              ? `${selected.length} agents selected`
              : "Data source selection"}
            {open ? (
              <ChevronUp className="text-black" size={24} />
            ) : (
              <ChevronDown className="text-black" size={24} />
            )}
          </GlowButton>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[450px] max-h-80 overflow-y-auto p-2 border-zinc-800 bg-zinc-100 text-black"
        >
          <Table>
            <TableBody>
              {agents.map((agent, index) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <Checkbox
                      id={`agent-${index}`}
                      checked={selected.includes(agent.domain)}
                      onCheckedChange={() => handleToggle(agent.domain)}
                    />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-x-2">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${agent.domain}&sz=32`}
                        alt="favicon"
                        width={16}
                        height={16}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </TableCell>

                  <TableCell className="font-medium text-sm">{agent.domain}</TableCell>

                  <TableCell>
                    <span className="text-xs text-gray-800 px-2 font-mono">
                      {agent.ipAddress || "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {!agent.verified && (
                        <div className="flex items-center gap-1 text-red-600" title="ACME DNS delegation is not verified">
                          <XCircle size={16} />
                          <span className="text-xs">Delegation not verified</span>
                        </div>
                      )}
                      {agent.verified && !agent.dnsRouted && (
                        <div className="flex items-center gap-1 text-orange-600" title="Delegation verified, traffic routing pending">
                          <AlertCircle size={16} />
                          <span className="text-xs">Delegation verified / DNS pending</span>
                        </div>
                      )}
                      {agent.verified && agent.dnsRouted && (
                        <div className="flex items-center gap-1 text-green-600" title="Delegation verified and DNS routed">
                          <CheckCircle size={16} />
                          <span className="text-xs">Active</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <AgentSetupBox agent={agent} />
                  </TableCell>
                  <TableCell>
                    <AgentConfigBox agent={agent} dispatch={dispatch} />
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={(e) => handleVerify(agent.id, e)}
                      disabled={verifyingId === agent.id}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 text-black"
                      title="Verify ownership and DNS delegation"
                    >
                      <RefreshCw size={16} className={verifyingId === agent.id ? "animate-spin" : ""} />
                    </button>
                  </TableCell>
                  <TableCell>
                    <Trash
                      size={18}
                      className="cursor-pointer text-red-400 hover:text-red-600"
                      onClick={() => handleDelete(agent)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="pt-4">
            <AgentAddBox dispatch={dispatch} />
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-transparent backdrop-blur-sm border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to delete this agent? Traffic routing through WebSOC will be stopped.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={cancelDelete}
              className="bg-zinc-800/10 border-white/10 text-white hover:bg-zinc-900/50"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600/10 text-white hover:bg-red-700/50 hover:text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* =========================================================================
   5. BlackListMenu — 1:1 match of websoc/CMC/src/components/custom/blacklist.jsx
   ========================================================================= */
function BlackListMenu({ blacklist, addToBlacklist, removeFromBlacklist, allCountries }) {
  const getFlagSrc = (countryCode) =>
    `/flags/${String(countryCode || "xx").toLowerCase()}.svg`;
  const [searchValue, setSearchValue] = useState("");
  const [searchNonValue, setSearchNonValue] = useState("");
  const [menuPos, setMenuPos] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const menuRef = useRef(null);
  const containerRef = useRef(null);

  const nonBlacklisted = allCountries.filter(
    (country) => !blacklist.includes(country.code)
  );

  const filteredCountries = searchValue
    ? nonBlacklisted.filter(
        (c) =>
          c.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          c.code.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const filteredNonBlacklisted = searchNonValue
    ? nonBlacklisted.filter(
        (c) =>
          c.name.toLowerCase().includes(searchNonValue.toLowerCase()) ||
          c.code.toLowerCase().includes(searchNonValue.toLowerCase())
      )
    : nonBlacklisted;

  const handleAddAndClear = (countryCode) => {
    if (!countryCode) return;
    addToBlacklist(countryCode);
    setMenuPos(null);
    setSelectedCountry(null);
  };

  const handleRemove = (countryCode) => {
    removeFromBlacklist(countryCode);
    setMenuPos(null);
    setSelectedCountry(null);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuPos(null);
        setSelectedCountry(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openMenu = (e, country) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - containerRect.left;
    const offsetY = e.clientY - containerRect.top;

    setMenuPos({ x: offsetX, y: offsetY });
    setSelectedCountry(country);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <GlowButton
          color="#FF00B7"
          className="bg-zinc-50 text-red-700 text-md font-bold flex-shrink-0"
          style={{ minWidth: "fit-content" }}
        >
          <Ban className="text-red-600" />
          Blacklist countries
        </GlowButton>
      </DialogTrigger>
      <DialogContent
        align="start"
        className="w-2/3 h-[80%] p-0 m-0 g-0 border-zinc-600 bg-transparent text-white backdrop-blur-sm justify-normal top-10 translate-y-0 flex flex-col"
      >
        <DialogTitle className="sr-only">Blacklist Countries</DialogTitle>
        <Tabs
          ref={containerRef}
          defaultValue="blacklisted"
          className="h-full flex flex-col gap-0 relative"
        >
          <TabsList className="bg-transparent border border-zinc-700 rounded-none flex-shrink-0 w-full">
            <TabsTrigger
              className="text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-zinc-800 flex-1"
              value="blacklisted"
            >
              Blacklisted ({blacklist.length})
            </TabsTrigger>
            <TabsTrigger
              className="text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-zinc-800 flex-1"
              value="nonblacklisted"
            >
              Non-blacklisted ({nonBlacklisted.length})
            </TabsTrigger>
          </TabsList>

          {/* Blacklisted tab */}
          <TabsContent
            value="blacklisted"
            className="flex flex-col h-full overflow-hidden p-2"
          >
            <Input
              placeholder="Search country to add..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="mb-2 bg-transparent border-zinc-700 placeholder:text-zinc-300"
            />
            {searchValue.trim() !== "" && (
              <div>
                {filteredCountries.length > 0 ? (
                  <ul className="px-2 w-full flex-grow scroll-container max-h-48 overflow-y-auto">
                    {filteredCountries.map((c) => (
                      <li
                        key={c.code}
                        onClick={(e) => openMenu(e, c)}
                        className="p-2 m-1 rounded-md hover:bg-zinc-300/20 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            alt={c.code}
                            src={getFlagSrc(c.code)}
                            width={28}
                            height={20}
                            className="rounded-full"
                          />
                          <span>
                            {c.name} ({c.code})
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4 text-center text-sm text-zinc-500">
                    No matching countries found
                  </p>
                )}
              </div>
            )}

            <ul className="p-1 overflow-y-auto flex-grow scroll-container">
              {blacklist.map((code) => {
                const c = allCountries.find((country) => country.code === code);
                if (!c) return null;

                return (
                  <li
                    key={c.code}
                    onClick={(e) => openMenu(e, c)}
                    className="p-2 m-1 rounded-md hover:bg-zinc-300/20 cursor-pointer"
                  >
                    <div className="flex gap-x-2 items-center">
                      <img
                        alt={c.code}
                        src={getFlagSrc(c.code)}
                        width={28}
                        height={16}
                        className="rounded-full"
                      />
                      <span>
                        {c.name} ({c.code})
                      </span>
                    </div>
                  </li>
                );
              })}
              {blacklist.length === 0 && (
                <li className="text-sm text-gray-500 mt-2 px-2">
                  No countries blacklisted
                </li>
              )}
            </ul>
          </TabsContent>

          {/* Non-Blacklisted tab */}
          <TabsContent
            value="nonblacklisted"
            className="h-full flex flex-col overflow-hidden p-2"
          >
            <Input
              placeholder="Search non-blacklisted..."
              value={searchNonValue}
              onChange={(e) => setSearchNonValue(e.target.value)}
              className="mb-2 bg-transparent border-zinc-700 placeholder:text-zinc-300"
            />

            <ul className="px-2 w-full flex-grow scroll-container overflow-y-auto">
              {filteredNonBlacklisted.map((c) => (
                <li
                  key={c.code}
                  onClick={(e) => openMenu(e, c)}
                  className="p-2 m-1 rounded-md hover:bg-zinc-300/20 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <img
                      alt={c.code}
                      src={getFlagSrc(c.code)}
                      width={28}
                      height={20}
                      className="rounded-full"
                    />
                    <span>
                      {c.name} ({c.code})
                    </span>
                  </div>
                </li>
              ))}
              {filteredNonBlacklisted.length === 0 && (
                <li className="text-sm text-gray-500">
                  No countries available
                </li>
              )}
            </ul>
          </TabsContent>

          {/* Context popup menu */}
          {menuPos && selectedCountry && (
            <div
              ref={menuRef}
              style={{
                position: "absolute",
                top: `${menuPos.y}px`,
                left: `${menuPos.x}px`,
                zIndex: 1000,
              }}
              className="bg-zinc-800/90 border border-zinc-700 rounded-md shadow-lg p-1"
            >
              {blacklist.includes(selectedCountry.code) ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(selectedCountry.code)}
                >
                  <p className="text-red-500 bg-transparent hover:bg-transparent hover:text-red-400 py-2 px-6 font-semibold">
                    Remove
                  </p>
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="text-zinc-100 bg-transparent hover:bg-transparent hover:text-zinc-400 py-2 px-6 font-semibold"
                  onClick={() => handleAddAndClear(selectedCountry.code)}
                >
                  Add
                </Button>
              )}
            </div>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

/* =========================================================================
   6. Main WebsocLeftPanel Container
   Structure strictly per:
   absolute top-20 left-6 text-white backdrop-blur-lg z-30 rounded-l-lg flex flex-col h-[80%] justify-between gap-y-2
   ========================================================================= */
export default function WebsocLeftPanel({
  state,
  dispatch,
  hoveredCountry,
  countryValues,
}) {
  const websoc = state.websoc;
  const blacklist = websoc?.blacklist || [];

  return (
    <div className="absolute top-20 left-6 text-white backdrop-blur-lg z-30 rounded-l-lg flex flex-col h-[80%] justify-between gap-y-2 pointer-events-auto">
      <DomainSelector state={state} dispatch={dispatch} />

      {hoveredCountry && countryValues?.[hoveredCountry]?.domains && (
        <CountryTooltip
          hoveredCountry={hoveredCountry}
          countryValues={countryValues}
        />
      )}

      <BlackListMenu
        blacklist={blacklist}
        addToBlacklist={(code) => dispatch({ type: "WEBSOC_BLACKLIST_ADD", code })}
        removeFromBlacklist={(code) => dispatch({ type: "WEBSOC_BLACKLIST_REMOVE", code })}
        allCountries={COUNTRIES}
      />
    </div>
  );
}
