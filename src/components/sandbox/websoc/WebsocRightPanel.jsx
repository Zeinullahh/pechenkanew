"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function WebsocRightPanel({
  selectedParam = "Bandwidth",
  onParamChange,
  maxValue = 100,
  theme,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const params = [
    { id: "RPS", label: "RPS" },
    { id: "Bandwidth", label: "Bandwidth" },
    { id: "Active Users", label: "Active Users" },
  ];

  return (
    <div className="absolute top-20 right-12 text-white backdrop-blur-lg z-30 rounded-l-lg flex flex-col gap-y-4 p-4 pointer-events-auto select-none">
      {/* Parameter Selection — matches original Select with bg-zinc-100 text-black rounded-full */}
      <div className="flex items-center mb-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-zinc-100 text-black font-bold border px-8 py-2 rounded-full text-sm shadow transition-all active:scale-95"
          >
            <span>{params.find((p) => p.id === selectedParam)?.label || selectedParam}</span>
            <ChevronDown size={14} className="opacity-50" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 border-zinc-800 bg-zinc-100 text-black rounded-md shadow-lg p-1 z-50">
              {params.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onParamChange?.(p.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-1.5 rounded text-sm text-left transition-colors ${
                    selectedParam === p.id
                      ? "bg-zinc-200 font-bold"
                      : "hover:bg-zinc-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 460px Gradient Metric Indicator — exact match: h-[460px] w-12 rounded-full */}
      <div className="flex items-center mb-4">
        <div className="flex flex-col items-center">
          <div className="h-[460px] w-12 rounded-full overflow-hidden">
            <div
              className="h-full w-full"
              style={{
                background: `linear-gradient(to bottom, 
                  ${theme.highTraffic} 0%, 
                  ${theme.mediumTraffic} 50%, 
                  ${theme.lowTraffic} 65%, 
                  ${theme.noTraffic} 100%)`,
              }}
            />
          </div>
        </div>

        {/* Level Legend — exact match: h-[460px] ml-2 justify-between */}
        <div className="flex flex-col justify-between h-[460px] ml-2">
          <div className="text-sm">
            <div className="font-bold">High</div>
            <div>
              {((2 * maxValue) / 3).toFixed(2)} - {maxValue.toFixed(2)}
            </div>
          </div>
          <div className="text-sm">
            <div className="font-bold">Medium</div>
            <div>
              {(maxValue / 3).toFixed(2)} - {((2 * maxValue) / 3).toFixed(2)}
            </div>
          </div>
          <div className="text-sm">
            <div className="font-bold">Low</div>
            <div>
              {"0.01"} - {(maxValue / 3).toFixed(2)}
            </div>
          </div>
          <div className="text-sm">
            <div className="font-bold">None</div>
            <div>0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
