"use client";

import React, { useState, useEffect, useMemo } from "react";
import WebsocGlobe from "./websoc/WebsocGlobe";
import WebsocHeader from "./websoc/WebsocHeader";
import WebsocLeftPanel from "./websoc/WebsocLeftPanel";
import WebsocRightPanel from "./websoc/WebsocRightPanel";
import WebsocStatsDrawer from "./websoc/WebsocStatsDrawer";
import WebsocAnomalyBanner from "./websoc/WebsocAnomalyBanner";
import { GLOBE_COLORS } from "@/lib/colors";

export default function WebSocView({ state, dispatch }) {
  const websoc = state.websoc || {};
  const currentThemeKey = websoc.theme || "primary";
  const theme = GLOBE_COLORS[currentThemeKey] || GLOBE_COLORS.primary;

  const [, setCountryCoords] = useState({});
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // Load country coordinates for Globe Geo calculations
  useEffect(() => {
    fetch("/data/country_coords.json")
      .then((res) => {
        if (!res.ok) throw new Error("Coords fetch failed");
        return res.json();
      })
      .then((data) => setCountryCoords(data))
      .catch((err) => {
        console.warn("Failed to load country coordinates:", err);
      });
  }, []);

  const liveMetrics = websoc.liveMetrics || {};
  const selectedDomains = websoc.selectedDomains || [];
  const selectedParam = websoc.selectedParam || "Bandwidth";

  // Process metrics per country and domain matching websoc/CMC logic
  const { countryValues, maxValue } = useMemo(() => {
    const newCountryValues = {};
    let max = 0;

    for (const [domain, countries] of Object.entries(liveMetrics)) {
      if (selectedDomains.length > 0 && !selectedDomains.includes(domain)) continue;

      for (const [countryCode, info] of Object.entries(countries || {})) {
        const rps = Number(info["Requests per second (RPS)"] || 0);
        const bandwidthBytes = Number(info["Bandwidth usage"] || 0);
        const bandwidthKb = bandwidthBytes / 1024;
        const activeUsers = Number(
          info["Number of IP addresses with active connection(s)"] || 0
        );

        if (!newCountryValues[countryCode]) {
          newCountryValues[countryCode] = { domains: {}, total: 0 };
        }

        if (!newCountryValues[countryCode].domains[domain]) {
          newCountryValues[countryCode].domains[domain] = {
            RPS: 0,
            Bandwidth: 0,
            "Active Users": 0,
          };
        }

        newCountryValues[countryCode].domains[domain].RPS += rps;
        newCountryValues[countryCode].domains[domain].Bandwidth += bandwidthBytes;
        newCountryValues[countryCode].domains[domain]["Active Users"] += activeUsers;

        let selectedValue = 0;
        switch (selectedParam) {
          case "RPS":
            selectedValue = rps;
            break;
          case "Bandwidth":
            selectedValue = bandwidthKb;
            break;
          case "Active Users":
            selectedValue = activeUsers;
            break;
          default:
            selectedValue = bandwidthKb;
        }

        newCountryValues[countryCode].total += selectedValue;
        if (newCountryValues[countryCode].total > max) {
          max = newCountryValues[countryCode].total;
        }
      }
    }

    return {
      countryValues: newCountryValues,
      maxValue: Math.max(max, 100),
    };
  }, [liveMetrics, selectedDomains, selectedParam]);

  return (
    <div
      className="relative w-[1384px] h-[950px] overflow-hidden bg-[#01091C] text-white select-none isolate"
      style={{ background: theme.background }}
    >
      {/* 1. Anomaly Alert Banner (Fixed Top on DDoS detection) */}
      <WebsocAnomalyBanner
        message={websoc.anomalyMsg}
        onDismiss={() => dispatch({ type: "WEBSOC_DISMISS_ANOMALY" })}
      />

      {/* 2. Top Header & Preferences Drawer */}
      <WebsocHeader state={state} dispatch={dispatch} />

      {/* 3. Interactive 3D Three.js Globe */}
      <WebsocGlobe
        countryValues={countryValues}
        maxValue={maxValue}
        selectedParam={selectedParam}
        setHoveredCountry={setHoveredCountry}
        blacklist={websoc.blacklist || []}
        theme={theme}
      />

      {/* 4. Left-side Control Panel (Domain Selector, Tooltip, Blacklist) */}
      <WebsocLeftPanel
        state={state}
        dispatch={dispatch}
        hoveredCountry={hoveredCountry}
        countryValues={countryValues}
      />

      {/* 5. Right-side Panel (Parameter Selector & 460px Gradient Bar) */}
      <WebsocRightPanel
        selectedParam={selectedParam}
        onParamChange={(param) => dispatch({ type: "WEBSOC_PARAM", param })}
        maxValue={maxValue}
        theme={theme}
      />

      {/* 6. Bottom Statistics Drawer (AreaChart + 3x Top Countries Cards) */}
      <WebsocStatsDrawer
        statsData={websoc.statsHistory || []}
        topCountries={websoc.topCountries || []}
        activeRange={websoc.selectedRange || "1 day"}
        onRangeChange={(range) => dispatch({ type: "WEBSOC_RANGE", range })}
        onSelectionChange={(chartWindow) => dispatch({ type: "WEBSOC_SELECT_CHART_WINDOW", window: chartWindow })}
      />
    </div>
  );
}
