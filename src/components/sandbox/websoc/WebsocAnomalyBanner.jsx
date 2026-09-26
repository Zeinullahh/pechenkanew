"use client";

import React from "react";

/**
 * AnomalyBanner — pixel-perfect match of websoc/CMC/src/components/custom/anomaly_banner.jsx
 * Original: fixed top-0 w-full z-50 bg-red-700 text-white text-center py-4
 * with <p>{msg}</p> and OK button styled bg-white text-red-700 px-4 py-1 rounded
 */
export default function WebsocAnomalyBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="absolute top-0 w-full z-50 bg-red-700 text-white text-center py-4 pointer-events-auto">
      <p>{message}</p>
      <button
        type="button"
        className="mt-2 bg-white text-red-700 px-4 py-1 rounded"
        onClick={onDismiss}
      >
        OK
      </button>
    </div>
  );
}
