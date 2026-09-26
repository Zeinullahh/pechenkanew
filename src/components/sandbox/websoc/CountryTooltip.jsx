"use client";

import React from "react";

export default function CountryTooltip({ hoveredCountry, countryValues }) {
  const formatBandwidthKb = (bytesValue) => {
    const bytes = Number(bytesValue || 0);
    return (bytes / 1024).toFixed(2);
  };

  if (!hoveredCountry || !countryValues?.[hoveredCountry]?.domains) return null;

  return (
    <div className="bg-zinc-900 p-4 rounded shadow text-white max-h-96 overflow-y-auto">
      <div className="text-sm mb-2 font-semibold">
        Traffic from: {hoveredCountry}
      </div>

      <ul className="text-xs space-y-2">
        {Object.entries(countryValues[hoveredCountry].domains).map(
          ([domain, metrics]) => (
            <li key={domain} className="flex flex-col gap-y-1">
              <div className="font-semibold truncate">{domain}</div>
              <div className="pl-2 text-xs text-gray-300">
                <div>RPS: {metrics.RPS?.toFixed(2) || 0}</div>
                <div>Bandwidth: {formatBandwidthKb(metrics.Bandwidth)} KB/30s</div>
                <div>Active Users: {metrics["Active Users"] || 0}</div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
