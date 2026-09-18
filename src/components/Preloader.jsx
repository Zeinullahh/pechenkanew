"use client";

import { useEffect, useState } from "react";

const FRAME_COUNT = 118;
const MAX_PARALLEL_REQUESTS = 8;
const MIN_DISPLAY_MS = 3400;
const HARD_TIMEOUT_MS = 25000;
const FADE_OUT_MS = 700;
const CACHE_FLAG = "slnc-frames-preloaded";
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const preloaderStyles = `
  html.frames-cached .slnc-preloader { display: none !important; }
  .slnc-preloader svg .svg-elem-1 {
    stroke-dashoffset: 2497.524169921875px;
    stroke-dasharray: 2497.524169921875px;
    fill: transparent;
    -webkit-transition: stroke-dashoffset 3s cubic-bezier(0.47, 0, 0.745, 0.715) 0s,
                        fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.8s;
            transition: stroke-dashoffset 3s cubic-bezier(0.47, 0, 0.745, 0.715) 0s,
                        fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.8s;
  }
  .slnc-preloader svg.active .svg-elem-1 {
    stroke-dashoffset: 0;
    fill: rgb(255, 255, 255);
  }
`;

export default function Preloader() {
  const [phase, setPhase] = useState("visible");
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("frames-cached")) {
      setPhase("hidden");
      return undefined;
    }

    document.body.style.overflow = "hidden";

    // The draw transition only fires when .active lands after the initial paint.
    const activateTimer = window.setTimeout(() => setIsActive(true), 60);
    const startedAt = Date.now();
    let finished = false;
    let fadeTimer = null;
    let hiddenTimer = null;

    const reveal = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(hardTimeout);

      const wait = Math.max(0, MIN_DISPLAY_MS - (Date.now() - startedAt));
      fadeTimer = window.setTimeout(() => {
        setPhase("fading");
        hiddenTimer = window.setTimeout(() => {
          document.body.style.overflow = "";
          setPhase("hidden");
        }, FADE_OUT_MS);
      }, wait);
    };

    const hardTimeout = window.setTimeout(reveal, HARD_TIMEOUT_MS);

    let settledCount = 0;
    let nextFrameNumber = 1;
    const onFrameSettled = () => {
      settledCount += 1;
      setProgress(Math.round((settledCount / FRAME_COUNT) * 100));
      if (settledCount >= FRAME_COUNT) {
        try {
          localStorage.setItem(CACHE_FLAG, String(Date.now()));
        } catch (error) {
          /* private mode: skip caching, still reveal */
        }
        reveal();
      }
    };

    const loadNext = () => {
      if (nextFrameNumber > FRAME_COUNT) return;
      const frameNumber = nextFrameNumber;
      nextFrameNumber += 1;
      const image = new Image();
      image.decoding = "async";
      image.onload = onFrameSettled;
      image.onerror = onFrameSettled;
      image.src = `/frames/frame-${frameNumber}.webp`;
      loadNext();
    };
    for (let i = 0; i < MAX_PARALLEL_REQUESTS; i += 1) loadNext();

    return () => {
      window.clearTimeout(activateTimer);
      window.clearTimeout(hardTimeout);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hiddenTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`slnc-preloader fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ease-out ${
        phase === "fading" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
    >
      <style>{preloaderStyles}</style>
      <div className="flex flex-col items-center px-6">
        <svg
          viewBox="0 0 416 147"
          className={`h-auto w-[min(416px,78vw)] ${isActive ? "active" : ""}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12.2 145.2C5.80002 145.2 1.00002 140.4 1.00002 134C1.00002 127.4 5.80002 122.8 12.2 122.8C18.6 122.8 23.6 127.4 23.6 134C23.6 140.4 18.6 145.2 12.2 145.2ZM79.9344 5.2C80.5344 3.80001 81.3344 3.2 82.7344 3.2H93.9344C95.7344 3.2 96.5344 4.40001 95.9344 6L44.5344 141.4C43.9344 142.8 43.1344 143.2 41.7344 143.2H30.5344C28.7344 143.2 27.9344 142 28.5344 140.4L79.9344 5.2ZM139.4 145.4C118.6 145.4 105.2 130 104.4 105.8C104.4 104 105.4 103 107.2 103H119.8C121.4 103 122.4 104 122.6 105.6C123 120.8 128.8 128.4 139.6 128.4C150.2 128.4 155.8 122.6 155.8 111.8C155.8 80.8 105.6 71.4 105.6 33C105.6 13.4 118.8 1.00001 138.6 1.00001C158.2 1.00001 171.2 16 172 39.4C172 41 171.2 42 169.4 42H156.8C155.2 42 154.2 41 154.2 39.4C153.6 24.6 148.2 17.8 138.8 17.8C129 17.8 123.6 23 123.6 33C123.6 61.6 174 71 174 111.8C174 132.4 160.2 145.4 139.4 145.4ZM224.841 127H244.041C245.841 127 246.841 128 246.841 129.8V141.2C246.841 142.8 245.841 143.8 244.041 143.8H223.841C203.441 143.8 190.841 128.6 190.841 108.6V5.8C190.841 4.2 191.841 3.2 193.441 3.2H206.241C208.041 3.2 209.041 4.2 209.041 5.8V108C209.041 119.4 215.641 127 224.841 127ZM260.238 143.2C258.638 143.2 257.638 142.2 257.638 140.4V37.8C257.638 16.2 271.038 1.00001 291.838 1.00001C312.638 1.00001 326.238 16.2 326.238 37.8V140.4C326.238 142.2 325.238 143.2 323.438 143.2H310.838C309.238 143.2 308.038 142.2 308.038 140.4V37C308.038 25.6 301.838 18 291.838 18C281.838 18 275.638 25.6 275.638 37V140.4C275.638 142.2 274.638 143.2 273.038 143.2H260.238ZM379.872 145.4C359.472 145.4 345.672 131 345.672 109.4V37C345.672 15.4 359.472 1.00001 379.872 1.00001C399.472 1.00001 412.872 16 413.472 39.4C413.472 41 412.672 42 410.872 42H398.072C396.472 42 395.472 41.2 395.472 39.4C395.072 25.4 388.872 18 379.672 18C369.672 18 363.872 24.8 363.872 36V110.4C363.872 121.6 369.672 128.4 379.672 128.4C389.872 128.4 396.072 120.2 396.472 105.6C396.472 103.8 397.472 103 399.072 103H411.872C413.472 103 414.472 104 414.472 105.8C413.672 130 400.272 145.4 379.872 145.4Z"
            fill="white"
            stroke="white"
            strokeWidth="2"
            className="svg-elem-1"
          />
        </svg>

        <div className="mt-8 h-px w-40 overflow-hidden bg-white/15">
          <div
            className="h-full bg-white/70 transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-[11px] tracking-[0.3em] text-white/40">
          {progress}%
        </p>
        <span className="sr-only">Loading experience…</span>
      </div>
    </div>
  );
}
