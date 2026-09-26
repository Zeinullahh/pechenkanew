"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceDot,
  ReferenceLine,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronUp as ChevronUpIcon, ChevronDown as ChevronDownIcon, ArrowDown, ArrowUp } from "lucide-react";
import { CHART_COLORS } from "@/lib/colors";

function toFiniteNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatHour(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* =========================================================================
   SelectionEdgeMarker — 1:1 match of websoc/CMC/src/components/custom/server_load_chart.jsx
   ========================================================================= */
function SelectionEdgeMarker({
  label,
  timeLabel,
  leftPercent,
  colorClass,
  lineClass,
  dotClass,
}) {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 z-20"
      style={{ left: `${leftPercent}%` }}
    >
      <div
        className={`absolute top-0 -translate-x-1/2 rounded-md border border-white/30 bg-black/70 px-2 py-0.5 text-[10px] font-semibold ${colorClass}`}
      >
        {label}
      </div>
      <div className="absolute top-6 bottom-2 left-0 -translate-x-1/2">
        <div className={`h-full w-px ${lineClass}`} />
      </div>
      <div
        className={`absolute bottom-1 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border ${dotClass}`}
      />
      <div className="absolute bottom-[-14px] left-0 -translate-x-1/2 text-[10px] text-zinc-300">
        {timeLabel}
      </div>
    </div>
  );
}

/* =========================================================================
   CustomTooltip — 1:1 match of websoc/CMC/src/components/custom/server_load_chart.jsx
   ========================================================================= */
const CustomTooltip = ({ active, payload, label, coordinate, type }) => {
  if (active && payload && payload.length && coordinate) {
    const unit =
      type === "bandwidth" ? "KB/30s" : type === "ips" ? "IP" : "RPS";
    return (
      <div
        className="absolute z-50 bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm text-sm w-32"
        style={{
          left: `${coordinate.x}px`,
          top: `-45px`,
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      >
        <div className="flex justify-between">
          <div className="font-semibold">{`${payload[0].value} ${unit}`}</div>
          <div className="text-zinc-400 font-medium">{label}</div>
        </div>
      </div>
    );
  }
  return null;
};

/* =========================================================================
   ServerLoadChart — 1:1 match of websoc/CMC/src/components/custom/server_load_chart.jsx
   ========================================================================= */
export function ServerLoadChart({
  statsData = [],
  selectedDomains = [],
  activeRange = "1 day",
  onRangeChange,
  onSelectionChange,
}) {
  const [type, setType] = useState("ips");
  const [isSelecting, setIsSelecting] = useState(false);
  const [dragStartIndex, setDragStartIndex] = useState(null);
  const [dragCurrentIndex, setDragCurrentIndex] = useState(null);
  const [selectedRangeIndices, setSelectedRangeIndices] = useState(null);
  const [selectedAnchorIndices, setSelectedAnchorIndices] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);
  const chartContainerRef = useRef(null);
  const lastEmittedSelectionRef = useRef(null);

  const formattedData = useMemo(() => {
    return (statsData || []).map((item) => {
      const bandwidthKb = toFiniteNumber(item.total_bandwidth) / 1024;
      return {
        ts: item.interval_start,
        hour: formatHour(item.interval_start),
        traffic:
          type === "bandwidth"
            ? Number(bandwidthKb.toFixed(2))
            : type === "ips"
            ? toFiniteNumber(item.total_ips)
            : toFiniteNumber(item.total_rps),
      };
    });
  }, [statsData, type]);

  useEffect(() => {
    setIsSelecting(false);
    setDragStartIndex(null);
    setDragCurrentIndex(null);
    setSelectedRangeIndices(null);
    setSelectedAnchorIndices(null);
    if (lastEmittedSelectionRef.current !== null) {
      lastEmittedSelectionRef.current = null;
      onSelectionChange?.(null);
    }
  }, [activeRange, type, onSelectionChange]);

  useEffect(() => {
    if (!selectedRangeIndices) {
      if (lastEmittedSelectionRef.current !== null) {
        lastEmittedSelectionRef.current = null;
        onSelectionChange?.(null);
      }
      return;
    }

    const startPoint = formattedData[selectedRangeIndices.start];
    const endPoint = formattedData[selectedRangeIndices.end];
    if (!startPoint?.ts || !endPoint?.ts) {
      if (lastEmittedSelectionRef.current !== null) {
        lastEmittedSelectionRef.current = null;
        onSelectionChange?.(null);
      }
      return;
    }

    const nextSelection = {
      start: startPoint.ts,
      end: endPoint.ts,
    };

    lastEmittedSelectionRef.current = nextSelection;
    onSelectionChange?.(nextSelection);
  }, [selectedRangeIndices, formattedData, onSelectionChange]);

  const activeSelection = useMemo(() => {
    if (formattedData.length === 0) return null;

    if (isSelecting && dragStartIndex !== null && dragCurrentIndex !== null) {
      const start = Math.max(0, Math.min(dragStartIndex, dragCurrentIndex));
      const end = Math.min(
        formattedData.length - 1,
        Math.max(dragStartIndex, dragCurrentIndex)
      );
      return { start, end };
    }

    if (!selectedRangeIndices) return null;

    const start = Math.max(0, selectedRangeIndices.start);
    const end = Math.min(formattedData.length - 1, selectedRangeIndices.end);
    if (start > end) return null;

    return { start, end };
  }, [isSelecting, dragStartIndex, dragCurrentIndex, selectedRangeIndices, formattedData.length]);

  const selectedData = useMemo(() => {
    if (!activeSelection) return [];
    return formattedData.slice(activeSelection.start, activeSelection.end + 1);
  }, [activeSelection, formattedData]);

  const selectedMetrics = useMemo(() => {
    if (selectedData.length === 0) return null;

    const values = selectedData.map((item) => Number(item.traffic || 0));
    let minValue = values[0];
    let maxValue = values[0];
    let minIndex = 0;
    let maxIndex = 0;

    values.forEach((value, index) => {
      if (value < minValue) {
        minValue = value;
        minIndex = index;
      }
      if (value > maxValue) {
        maxValue = value;
        maxIndex = index;
      }
    });

    const isGrowth = maxIndex >= minIndex;
    const changeMagnitude = maxValue - minValue;
    const baselineValue = isGrowth ? minValue : maxValue;
    const change = isGrowth ? changeMagnitude : -changeMagnitude;
    const changePercent =
      baselineValue > 0
        ? (changeMagnitude / baselineValue) * 100
        : changeMagnitude > 0
        ? 100
        : 0;

    const total = selectedData.reduce((sum, item) => sum + Number(item.traffic || 0), 0);
    const average = total / selectedData.length;
    const totalVisible = formattedData.reduce((sum, item) => sum + Number(item.traffic || 0), 0);
    const sharePercent = totalVisible > 0 ? (total / totalVisible) * 100 : 0;

    return {
      points: selectedData.length,
      total,
      average,
      change,
      changePercent,
      sharePercent,
      startTime: selectedData[0]?.hour,
      endTime: selectedData[selectedData.length - 1]?.hour,
      isGrowth,
    };
  }, [selectedData, formattedData]);

  const currentUnit =
    type === "bandwidth" ? "KB/30s" : type === "ips" ? "IPs" : "RPS";

  const floatingMetricsPosition = useMemo(() => {
    if (!selectedMetrics || !mousePosition || !chartContainerRef.current) return null;

    const rect = chartContainerRef.current.getBoundingClientRect();
    const panelWidth = 320;
    const panelHeight = 126;
    const margin = 10;

    let x = mousePosition.x + 16;
    let y = mousePosition.y - panelHeight - 16;

    if (x + panelWidth + margin > rect.width) x = mousePosition.x - panelWidth - 16;
    if (x < margin) x = margin;
    if (y < margin) y = mousePosition.y + 16;
    if (y + panelHeight + margin > rect.height) y = rect.height - panelHeight - margin;
    if (y < margin) y = margin;

    return { x, y };
  }, [selectedMetrics, mousePosition]);

  const getIndexFromEvent = (event) => {
    if (!chartContainerRef.current || formattedData.length === 0) return null;
    const rect = chartContainerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const pointWidth = rect.width / Math.max(formattedData.length - 1, 1);
    const index = Math.round(clampedX / pointWidth);
    return Math.max(0, Math.min(index, formattedData.length - 1));
  };

  const finalizeSelection = () => {
    if (!isSelecting || dragStartIndex === null || dragCurrentIndex === null) return;
    const start = Math.max(0, Math.min(dragStartIndex, dragCurrentIndex));
    const end = Math.min(formattedData.length - 1, Math.max(dragStartIndex, dragCurrentIndex));
    setSelectedRangeIndices({ start, end });
    setSelectedAnchorIndices({ start: dragStartIndex, end: dragCurrentIndex });
    setIsSelecting(false);
    setDragStartIndex(null);
    setDragCurrentIndex(null);
  };

  const markerAnchors = useMemo(() => {
    if (formattedData.length === 0) return null;
    if (isSelecting && dragStartIndex !== null && dragCurrentIndex !== null) {
      return {
        start: Math.max(0, Math.min(formattedData.length - 1, dragStartIndex)),
        end: Math.max(0, Math.min(formattedData.length - 1, dragCurrentIndex)),
      };
    }
    if (selectedAnchorIndices && selectedAnchorIndices.start !== null && selectedAnchorIndices.end !== null) {
      return {
        start: Math.max(0, Math.min(formattedData.length - 1, selectedAnchorIndices.start)),
        end: Math.max(0, Math.min(formattedData.length - 1, selectedAnchorIndices.end)),
      };
    }
    return null;
  }, [isSelecting, dragStartIndex, dragCurrentIndex, selectedAnchorIndices, formattedData.length]);

  const getMarkerLeftPercent = (index) => {
    if (formattedData.length <= 1) return 0;
    return (index / (formattedData.length - 1)) * 100;
  };

  const ranges = ["1 day", "2 days", "7 days", "14 days", "1 month", "3 months"];

  return (
    <Card className="bg-transparent backdrop-blur-sm border-zinc-700">
      <CardHeader>
        <div className="flex gap-x-2 items-center flex-wrap gap-y-2">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[250px] bg-zinc-100 text-black font-bold border px-8 rounded-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="border-zinc-800 bg-zinc-900 text-white">
              <SelectItem value="bandwidth">Bandwidth</SelectItem>
              <SelectItem value="ips">Number of IPs</SelectItem>
              <SelectItem value="rps">RPS</SelectItem>
            </SelectContent>
          </Select>
          <CardDescription className="text-zinc-300">
            {type === "bandwidth"
              ? "Bandwidth (KB/30s)"
              : type === "ips"
              ? "Number of connected Ips"
              : "Requests per second (RPS)"}
          </CardDescription>
          <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-medium text-white">
            Selected: {activeRange}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {ranges.map((range) => (
            <Button
              key={range}
              variant="ghost"
              size="sm"
              onClick={() => onRangeChange?.(range)}
              className={
                activeRange === range
                  ? "border border-white/80 bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,0.4)] hover:bg-white"
                  : "border border-zinc-700 bg-zinc-900/70 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={chartContainerRef}
          className="h-[200px] w-full relative"
          onMouseDown={(e) => {
            if (formattedData.length === 0) return;
            const index = getIndexFromEvent(e);
            if (index === null) return;
            const rect = chartContainerRef.current?.getBoundingClientRect();
            if (rect) {
              setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
            setIsSelecting(true);
            setDragStartIndex(index);
            setDragCurrentIndex(index);
          }}
          onMouseMove={(e) => {
            const rect = chartContainerRef.current?.getBoundingClientRect();
            if (rect) {
              setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
            if (!isSelecting) return;
            const index = getIndexFromEvent(e);
            if (index === null) return;
            setDragCurrentIndex(index);
          }}
          onMouseUp={finalizeSelection}
          onMouseLeave={() => {
            finalizeSelection();
            setMousePosition(null);
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.gradientStart} stopOpacity={0.6} />
                  <stop offset="95%" stopColor={CHART_COLORS.gradientEnd} stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="hour" stroke={CHART_COLORS.grid} fontSize={12} />
              <YAxis
                orientation="right"
                stroke={CHART_COLORS.grid}
                fontSize={12}
                tickFormatter={(val) => `${val}`}
                domain={["dataMin - 2", "dataMax + 2"]}
              />
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />

              <Tooltip
                content={<CustomTooltip type={type} />}
                cursor={{
                  stroke: CHART_COLORS.tooltipCursor,
                  strokeWidth: 1,
                  strokeDasharray: "3 3",
                }}
              />

              <Area
                type="monotone"
                dataKey="traffic"
                stroke={CHART_COLORS.stroke}
                strokeWidth={1}
                fillOpacity={1}
                fill="url(#colorValue)"
              />

              {activeSelection && selectedData.length > 0 && (
                <>
                  <ReferenceDot
                    x={selectedData[0]?.hour}
                    y={selectedData[0]?.traffic}
                    r={4}
                    stroke={CHART_COLORS.referenceDot}
                    strokeWidth={2}
                    fill="white"
                  />
                  <ReferenceDot
                    x={selectedData[selectedData.length - 1]?.hour}
                    y={selectedData[selectedData.length - 1]?.traffic}
                    r={4}
                    stroke={CHART_COLORS.referenceDot}
                    strokeWidth={2}
                    fill="white"
                  />
                  <ReferenceLine
                    x={selectedData[0]?.hour}
                    stroke={CHART_COLORS.referenceLine}
                    strokeDasharray="4 4"
                  />
                  <ReferenceLine
                    x={selectedData[selectedData.length - 1]?.hour}
                    stroke={CHART_COLORS.referenceLine}
                    strokeDasharray="4 4"
                  />
                  <ReferenceArea
                    x1={selectedData[0]?.hour}
                    x2={selectedData[selectedData.length - 1]?.hour}
                    fill="black"
                    fillOpacity={0.2}
                    stroke="none"
                  />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>

          {markerAnchors && (
            <>
              <SelectionEdgeMarker
                label="Start"
                timeLabel={formattedData[markerAnchors.start]?.hour || ""}
                leftPercent={getMarkerLeftPercent(markerAnchors.start)}
                colorClass="text-cyan-300"
                lineClass="bg-cyan-300/80"
                dotClass="bg-cyan-300 border-cyan-100"
              />
              <SelectionEdgeMarker
                label="End"
                timeLabel={formattedData[markerAnchors.end]?.hour || ""}
                leftPercent={getMarkerLeftPercent(markerAnchors.end)}
                colorClass="text-fuchsia-300"
                lineClass="bg-fuchsia-300/80"
                dotClass="bg-fuchsia-300 border-fuchsia-100"
              />
            </>
          )}

          {selectedMetrics && floatingMetricsPosition && (
            <div
              className="absolute z-40 w-80 rounded-lg border border-zinc-700 bg-black/80 p-3 text-xs text-white shadow-lg backdrop-blur-sm pointer-events-none"
              style={{
                left: `${floatingMetricsPosition.x}px`,
                top: `${floatingMetricsPosition.y}px`,
              }}
            >
              <div className="mb-2 text-zinc-300">
                {selectedMetrics.startTime} - {selectedMetrics.endTime}
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                <div className="text-zinc-400">Points</div>
                <div className="font-semibold text-right">{selectedMetrics.points}</div>
                <div className="text-zinc-400">Total</div>
                <div className="font-semibold text-right">
                  {selectedMetrics.total.toFixed(2)} {currentUnit}
                </div>
                <div className="text-zinc-400">Average</div>
                <div className="font-semibold text-right">
                  {selectedMetrics.average.toFixed(2)} {currentUnit}
                </div>
                <div className="text-zinc-400">Range share</div>
                <div className="font-semibold text-right">
                  {selectedMetrics.sharePercent.toFixed(2)}%
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-zinc-400">Peak move</span>
                <div
                  className={`flex items-center gap-1 font-semibold ${
                    selectedMetrics.isGrowth ? "text-teal-500" : "text-red-500"
                  }`}
                >
                  <span>
                    {selectedMetrics.change > 0 ? "+" : ""}
                    {selectedMetrics.change.toFixed(2)}
                  </span>
                  <span>({selectedMetrics.changePercent.toFixed(2)}%)</span>
                  {selectedMetrics.isGrowth ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                </div>
              </div>
            </div>
          )}
        </div>

        {selectedMetrics && (
          <div className="mt-2 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-zinc-300 hover:text-white"
              onClick={() => {
                setSelectedRangeIndices(null);
                setSelectedAnchorIndices(null);
              }}
            >
              Reset selection
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* =========================================================================
   TopCountriesBox — 1:1 match of websoc/CMC/src/components/custom/top_countries.jsx
   ========================================================================= */
function getCountryLabel(country) {
  if (country && typeof country.countryCode === "string") {
    const trimmed = country.countryCode.trim();
    if (trimmed.length > 0) return trimmed;
  }
  return "Unknown";
}

function getIsoCodeFromLabel(countryLabel) {
  const match = countryLabel.match(/\((.*?)\)/);
  const candidate = match ? match[1] : countryLabel;
  return String(candidate || "").trim().toLowerCase().replace(/[^a-z-]/g, "") || "xx";
}

export function TopCountriesBox({ allCountriesData = [], metric, title }) {
  const [countryQuery, setCountryQuery] = useState("");

  const metricLabelMap = {
    activeIps: "Users",
    bandwidthUsage: "Bandwidth (KB/30s)",
    requestsPerSecond: "Requests Per Second (RPS)",
  };

  function formatMetricValue(value) {
    const numericValue = toFiniteNumber(value);
    if (metric === "bandwidthUsage") {
      const kbValue = numericValue / 1024;
      return `${kbValue.toFixed(2)} KB`;
    }
    return numericValue.toFixed(2);
  }

  const safeData = Array.isArray(allCountriesData) ? allCountriesData : [];

  const filteredData = useMemo(() => {
    const normalizedQuery = countryQuery.trim().toLowerCase();

    return safeData
      .map((country) => {
        const baseCountry = country && typeof country === "object" ? country : {};
        return {
          ...baseCountry,
          countryCode: getCountryLabel(baseCountry),
          total: toFiniteNumber(baseCountry[metric]),
        };
      })
      .filter((country) => {
        if (!normalizedQuery) return true;
        const searchValue = [country.countryCode, country.country, country.code]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchValue.includes(normalizedQuery);
      })
      .sort((a, b) => b.total - a.total);
  }, [safeData, metric, countryQuery]);

  return (
    <Card className="bg-transparent backdrop-blur-sm border-zinc-700 text-white py-2 gap-y-2">
      <CardHeader>
        <CardTitle className="text-sm text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <input
          type="text"
          value={countryQuery}
          onChange={(event) => setCountryQuery(event.target.value)}
          placeholder="Search country..."
          className="mb-3 w-full rounded-md border border-zinc-700 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-400"
        />
        <div className="max-h-[360px] overflow-y-auto pr-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white/60">Country</TableHead>
                <TableHead className="text-white/60">{metricLabelMap[metric] || metric}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((country, index) => {
                  const countryLabel = getCountryLabel(country);
                  const isoCode = getIsoCodeFromLabel(countryLabel);
                  return (
                    <TableRow key={`${countryLabel}-${index}`}>
                      <TableCell className="font-medium flex gap-x-2 items-center">
                        <img
                          alt={`${isoCode} flag`}
                          src={`/flags/${isoCode}.svg`}
                          width={28}
                          height={20}
                          className="rounded-full"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.src = "/flags/xx.svg";
                          }}
                        />
                        <p>{countryLabel}</p>
                      </TableCell>
                      <TableCell className="w-1/6 text-end">
                        {formatMetricValue(country.total)}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>No data</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

/* =========================================================================
   Main WebsocStatsDrawer (Statistics Dialog from page.js)
   Structure strictly per:
   <Dialog>
     <DialogTrigger><ChevronUpIcon className="w-12 h-12" /></DialogTrigger>
     <DialogContent className="bg-black/60 border-none h-full gap-y-4 p-8 overflow-y-scroll scroll-container">
       <ServerLoadChart ... />
       <div className="grid grid-cols-3 gap-4">
         <TopCountriesBox metric="activeIps" ... />
         <TopCountriesBox metric="bandwidthUsage" ... />
         <TopCountriesBox metric="requestsPerSecond" ... />
       </div>
     </DialogContent>
   </Dialog>
   ========================================================================= */
export default function WebsocStatsDrawer({
  statsData = [],
  topCountries = [],
  activeRange = "1 day",
  onRangeChange,
  onSelectionChange,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      {/* Bottom center trigger within sandbox */}
      {!open && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
          <button
            type="button"
            className="text-white hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
            onClick={() => setOpen(true)}
            title="Open Statistics"
          >
            <ChevronUpIcon className="w-12 h-12" />
          </button>
        </div>
      )}

      {/* Fullscreen overlay strictly within sandbox boundaries */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Server Load and Top Countries Statistics"
          className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md border-none h-full w-full gap-y-4 p-8 overflow-y-scroll scroll-container text-white flex flex-col animate-in fade-in duration-200"
        >
          <div className="flex justify-center flex-shrink-0">
            <button
              type="button"
              className="sticky top-0 z-50 text-white hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer mb-2"
              onClick={() => setOpen(false)}
              title="Close Statistics"
            >
              <ChevronDownIcon className="w-12 h-12" />
            </button>
          </div>

          <div>
            <ServerLoadChart
              statsData={statsData}
              activeRange={activeRange}
              onRangeChange={onRangeChange}
              onSelectionChange={onSelectionChange}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 pb-12">
            <TopCountriesBox
              allCountriesData={topCountries}
              metric="activeIps"
              title="Top countries by number of users"
            />
            <TopCountriesBox
              allCountriesData={topCountries}
              metric="bandwidthUsage"
              title="Top countries by Bandwidth"
            />
            <TopCountriesBox
              allCountriesData={topCountries}
              metric="requestsPerSecond"
              title="Top countries by Requests Per Second (RPS)"
            />
          </div>
        </div>
      )}
    </>
  );
}
