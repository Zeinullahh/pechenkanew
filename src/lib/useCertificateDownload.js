"use client";

import { useState, useCallback, useEffect } from "react";
import { toJpeg } from "html-to-image";
import { enqueue } from "@/lib/downloadQueue";

/**
 * Detect whether the current device is mobile (viewport or UA).
 */
function getIsMobile() {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  );
}

/**
 * Reusable hook for certificate download with queuing.
 * Automatically reduces resolution on mobile to prevent canvas crashes.
 *
 * @param {React.RefObject} certRef  – ref attached to the certificate DOM node
 * @param {string} filename          – download filename (without extension)
 * @param {object} [options]         – optional overrides for toJpeg
 * @returns {{ handleDownload, isGenerating }}
 */
export default function useCertificateDownload(certRef, filename, options = {}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(getIsMobile());
  }, []);

  const handleDownload = useCallback(async () => {
    if (!certRef.current || isGenerating) return;

    setIsGenerating(true);
    try {
      // Lower pixelRatio on mobile to stay within canvas memory limits
      const mobileOverrides = isMobile
        ? { pixelRatio: 1, quality: 0.85 }
        : {};

      const dataUrl = await enqueue(() =>
        toJpeg(certRef.current, {
          pixelRatio: 2,
          cacheBust: true,
          skipFonts: true,
          quality: 0.92,
          backgroundColor: "#060a18",
          ...mobileOverrides,
          ...options,
        })
      );

      const link = document.createElement("a");
      link.download = `${filename}.jpg`;
      link.href = dataUrl;

      // Mobile Safari needs the element in DOM for .click() to work
      if (isMobile) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        setTimeout(() => document.body.removeChild(link), 100);
      } else {
        link.click();
      }
    } catch (err) {
      console.error("Failed to generate certificate image:", err);
      if (isMobile) {
        alert(
          "Could not generate the certificate image on this device. Please try on a desktop browser."
        );
      }
    } finally {
      setIsGenerating(false);
    }
  }, [certRef, filename, isGenerating, isMobile, options]);

  return { handleDownload, isGenerating };
}
