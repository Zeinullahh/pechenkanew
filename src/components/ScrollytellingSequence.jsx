"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const FRAME_COUNT = 118;
const LAST_FRAME = FRAME_COUNT - 1;
const FINAL_STORY_FRAME = 117;
const PREFETCH_RADIUS = 4;
const MAX_CACHED_FRAMES = 12;
const FINAL_FRAME_PREFETCH_POINT = 0.86;

const FRAME_RANGES = [
  { progressStart: 0, progressEnd: 0.18, frameStart: 0, frameEnd: 21 },
  { progressStart: 0.18, progressEnd: 0.42, frameStart: 22, frameEnd: 51 },
  { progressStart: 0.42, progressEnd: 0.68, frameStart: 52, frameEnd: 81 },
  { progressStart: 0.68, progressEnd: 0.9, frameStart: 82, frameEnd: 107 },
  { progressStart: 0.9, progressEnd: 1, frameStart: 108, frameEnd: FINAL_STORY_FRAME },
];

const sceneTextStyle = {
  textShadow: "0 2px 24px rgba(0, 0, 0, 0.95), 0 0 64px rgba(0, 0, 0, 0.72)",
};

function getFrameForProgress(progress) {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const range = FRAME_RANGES.find(({ progressEnd }) => clampedProgress <= progressEnd)
    || FRAME_RANGES[FRAME_RANGES.length - 1];
  const rangeProgress = range.progressEnd === range.progressStart
    ? 1
    : (clampedProgress - range.progressStart) / (range.progressEnd - range.progressStart);

  return Math.min(
    LAST_FRAME,
    Math.max(
      0,
      Math.round(range.frameStart + rangeProgress * (range.frameEnd - range.frameStart))
    )
  );
}

function interpolateScrollValue(value, input, output) {
  if (value <= input[0]) return output[0];
  if (value >= input[input.length - 1]) return output[output.length - 1];

  let index = input.length - 2;
  for (let inputIndex = 0; inputIndex < input.length - 1; inputIndex += 1) {
    if (value <= input[inputIndex + 1]) {
      index = inputIndex;
      break;
    }
  }

  const inputDelta = input[index + 1] - input[index];
  const segmentProgress = inputDelta === 0 ? 1 : (value - input[index]) / inputDelta;
  return output[index] + segmentProgress * (output[index + 1] - output[index]);
}

function StoryScene({
  children,
  className,
  progress,
  opacityInput,
  opacityOutput,
  xInput = [0, 1],
  xOutput = [0, 0],
  yInput = [0, 1],
  yOutput = [0, 0],
  scaleInput = [0, 1],
  scaleOutput = [1, 1],
}) {
  // Transformer callbacks keep the scene ranges clamped without handing partial
  // timelines to Motion's native scroll acceleration.
  const opacity = useTransform(progress, (value) => interpolateScrollValue(value, opacityInput, opacityOutput));
  const x = useTransform(progress, (value) => interpolateScrollValue(value, xInput, xOutput));
  const y = useTransform(progress, (value) => interpolateScrollValue(value, yInput, yOutput));
  const scale = useTransform(progress, (value) => interpolateScrollValue(value, scaleInput, scaleOutput));

  return (
    <motion.section
      className={`absolute inset-0 flex pointer-events-none ${className}`}
      style={{ opacity, x, y, scale }}
    >
      {children}
    </motion.section>
  );
}

function StoryCopy({ progress }) {
  const { t } = useLanguage();

  return (
    <div className="sticky top-0 h-screen h-[100svh] overflow-hidden" aria-label={t("home.story.ariaLabel", "AI-powered cybersecurity department overview")}>
      <StoryScene
        progress={progress}
        opacityInput={[0, 0.025, 0.13, 0.18]}
        opacityOutput={[0.82, 1, 1, 0]}
        yInput={[0, 0.04, 0.18]}
        yOutput={[36, 0, -28]}
        scaleInput={[0, 0.05, 0.18]}
        scaleOutput={[0.99, 1, 1]}
        className="items-end justify-center px-5 pb-[7svh] text-center sm:px-8 md:pb-[5vh]"
      >
        <div className="max-w-5xl" style={sceneTextStyle}>
          <h1 className="text-[clamp(2.45rem,5.4vw,5.8rem)] font-medium uppercase leading-[0.88] tracking-[-0.045em] text-white">
            <span className="block">{t("home.story.scene1.line1", "AI-Powered")}</span>
            <span className="block">{t("home.story.scene1.line2", "Cybersecurity Department")}</span>
          </h1>
          <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/70 sm:text-xs">
            {t("home.story.scene1.support", "Autonomous protection. One command layer.")}
          </p>
        </div>
      </StoryScene>

      <StoryScene
        progress={progress}
        opacityInput={[0.18, 0.22, 0.36, 0.42]}
        opacityOutput={[0, 1, 1, 0]}
        xInput={[0.18, 0.23, 0.42]}
        xOutput={[-42, 0, 24]}
        className="items-start justify-center px-5 pt-[17svh] text-center sm:px-8 md:items-center md:justify-start md:px-[5vw] md:pt-0 md:text-left"
      >
        <div className="max-w-[29rem]" style={sceneTextStyle}>
          <h2 className="text-[clamp(2.15rem,4.25vw,4.5rem)] font-medium uppercase leading-[0.91] tracking-[-0.04em] text-white">
            <span className="block">{t("home.story.scene2.line1", "Four AI systems.")}</span>
            <span className="block">{t("home.story.scene2.line2", "Four vectors of protection.")}</span>
          </h2>
          <div className="mt-5 flex max-w-md flex-wrap justify-center gap-x-4 gap-y-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/65 md:justify-start">
            <span>{t("home.story.scene2.email", "Email")}</span>
            <span>{t("home.story.scene2.web", "Web")}</span>
            <span>{t("home.story.scene2.server", "Server")}</span>
            <span>{t("home.story.scene2.pentest", "AI penetration testing")}</span>
          </div>
        </div>
      </StoryScene>

      <StoryScene
        progress={progress}
        opacityInput={[0.42, 0.46, 0.61, 0.68]}
        opacityOutput={[0, 1, 1, 0]}
        xInput={[0.42, 0.47, 0.68]}
        xOutput={[42, 0, -24]}
        className="items-end justify-center px-5 pb-[10svh] text-center sm:px-8 md:items-center md:justify-end md:px-[5vw] md:pb-0 md:text-right"
      >
        <div className="max-w-[29rem]" style={sceneTextStyle}>
          <h2 className="text-[clamp(2.15rem,4.25vw,4.5rem)] font-medium uppercase leading-[0.91] tracking-[-0.04em] text-white">
            <span className="block">{t("home.story.scene3.line1", "One AI manager")}</span>
            <span className="block">{t("home.story.scene3.line2", "above them all.")}</span>
          </h2>
          <p className="mt-4 hidden text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/70 sm:block sm:text-xs">
            {t("home.story.scene3.support", "Ask. Investigate. Block. Respond.")}
          </p>
        </div>
      </StoryScene>

      <StoryScene
        progress={progress}
        opacityInput={[0.68, 0.73, 0.84, 0.9]}
        opacityOutput={[0, 1, 1, 0]}
        yInput={[0.68, 0.74, 0.9]}
        yOutput={[48, 0, -28]}
        scaleInput={[0.68, 0.75, 0.9]}
        scaleOutput={[0.99, 1, 1]}
        className="items-end justify-center px-5 pb-[10svh] text-center sm:px-8 md:pb-[6vh]"
      >
        <div className="max-w-5xl" style={sceneTextStyle}>
          <h2 className="text-[clamp(2.45rem,5.4vw,5.8rem)] font-medium uppercase leading-[0.88] tracking-[-0.045em] text-white">
            <span className="block">{t("home.story.scene4.line1", "Your security posture.")}</span>
            <span className="block">{t("home.story.scene4.line2", "In your hands.")}</span>
          </h2>
          <p className="mt-4 hidden text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/70 sm:block sm:text-xs">
            {t("home.story.scene4.support", "One interface. Every protection vector.")}
          </p>
        </div>
      </StoryScene>
    </div>
  );
}

function ReducedMotionStory() {
  const { t } = useLanguage();

  return (
    <div className="flex h-screen h-[100svh] items-end justify-center px-5 pb-[8svh] text-center sm:px-8">
      <div className="max-w-5xl" style={sceneTextStyle}>
        <h1 className="text-[clamp(2.45rem,5.4vw,5.8rem)] font-medium uppercase leading-[0.88] tracking-[-0.045em] text-white">
          <span className="block">{t("home.story.scene1.line1", "AI-Powered")}</span>
          <span className="block">{t("home.story.scene1.line2", "Cybersecurity Department")}</span>
        </h1>
        <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/70 sm:text-xs">
          {t("home.story.scene1.support", "Autonomous protection. One command layer.")}
        </p>
      </div>
    </div>
  );
}

export default function ScrollytellingSequence({ children }) {
  const regionRef = useRef(null);
  const storyRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef(new Map());
  const loadingFramesRef = useRef(new Map());
  const currentFrameRef = useRef(-1);
  const targetFrameRef = useRef(0);
  const drawRafRef = useRef(null);
  const regionVisibleRef = useRef(false);
  const pageVisibleRef = useRef(true);
  const lastPrefetchFrameRef = useRef(-1);
  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const trimFrameCache = useCallback((centerFrame) => {
    if (framesRef.current.size <= MAX_CACHED_FRAMES) return;

    const framesByDistance = [...framesRef.current.keys()].sort(
      (firstFrame, secondFrame) => (
        Math.abs(firstFrame - centerFrame) - Math.abs(secondFrame - centerFrame)
      )
    );

    framesByDistance.slice(MAX_CACHED_FRAMES).forEach((frameIndex) => {
      framesRef.current.delete(frameIndex);
    });
  }, []);

  const loadFrame = useCallback((frameIndex) => {
    const cachedImage = framesRef.current.get(frameIndex);
    if (cachedImage) return Promise.resolve(cachedImage);

    const activeRequest = loadingFramesRef.current.get(frameIndex);
    if (activeRequest) return activeRequest;

    const request = new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        framesRef.current.set(frameIndex, image);
        trimFrameCache(targetFrameRef.current);
        loadingFramesRef.current.delete(frameIndex);
        resolve(image);
      };
      image.onerror = () => {
        loadingFramesRef.current.delete(frameIndex);
        reject(new Error(`Unable to load frame ${frameIndex + 1}`));
      };
      image.src = `/frames/frame-${frameIndex + 1}.webp`;
    });

    loadingFramesRef.current.set(frameIndex, request);
    return request;
  }, [trimFrameCache]);

  const drawFrame = useCallback((requestedFrame) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frameIndex = requestedFrame;
    let image = framesRef.current.get(frameIndex);

    if (!image) {
      for (let distance = 1; distance < FRAME_COUNT; distance += 1) {
        const previousFrame = requestedFrame - distance;
        const nextFrame = requestedFrame + distance;
        image = framesRef.current.get(previousFrame) || framesRef.current.get(nextFrame);
        if (image) {
          frameIndex = framesRef.current.has(previousFrame) ? previousFrame : nextFrame;
          break;
        }
      }
    }

    if (!image || !image.complete || !image.naturalWidth) return;

    const viewportWidth = canvas.clientWidth || window.innerWidth;
    const viewportHeight = canvas.clientHeight || window.innerHeight;
    const isMobile = viewportWidth < 768;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
    const width = Math.max(1, Math.round(viewportWidth * pixelRatio));
    const height = Math.max(1, Math.round(viewportHeight * pixelRatio));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const context = canvas.getContext("2d");
    if (!context) return;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.clearRect(0, 0, viewportWidth, viewportHeight);

    const maxImageWidth = viewportWidth * (isMobile ? 1.72 : 0.92);
    const maxImageHeight = viewportHeight * (isMobile ? 0.64 : 0.8);
    const scale = Math.min(
      maxImageWidth / image.naturalWidth,
      maxImageHeight / image.naturalHeight
    );
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;

    context.drawImage(
      image,
      Math.round((viewportWidth - drawWidth) / 2),
      Math.round((viewportHeight - drawHeight) / 2),
      Math.round(drawWidth),
      Math.round(drawHeight)
    );
    currentFrameRef.current = frameIndex;
  }, []);

  const queueDraw = useCallback(() => {
    if (!pageVisibleRef.current || !regionVisibleRef.current || drawRafRef.current !== null) return;

    drawRafRef.current = requestAnimationFrame(() => {
      drawRafRef.current = null;
      if (!pageVisibleRef.current || !regionVisibleRef.current) return;

      if (currentFrameRef.current !== targetFrameRef.current) {
        drawFrame(targetFrameRef.current);
      }
    });
  }, [drawFrame]);

  const preloadNeighborhood = useCallback((centerFrame) => {
    if (prefersReducedMotion || lastPrefetchFrameRef.current === centerFrame) return;
    lastPrefetchFrameRef.current = centerFrame;

    for (let offset = -PREFETCH_RADIUS; offset <= PREFETCH_RADIUS; offset += 1) {
      const frameIndex = centerFrame + offset;
      if (frameIndex >= 0 && frameIndex < FRAME_COUNT) {
        loadFrame(frameIndex).catch(() => {});
      }
    }
  }, [loadFrame, prefersReducedMotion]);

  useEffect(() => {
    let cancelled = false;

    loadFrame(0)
      .then(() => {
        if (cancelled) return;
        setIsReady(true);
        targetFrameRef.current = prefersReducedMotion
          ? 0
          : getFrameForProgress(scrollYProgress.get());
        preloadNeighborhood(targetFrameRef.current);
      })
      .catch((error) => {
        console.error("AI-CSD sequence could not load its initial frame.", error);
      });

    return () => {
      cancelled = true;
    };
  }, [loadFrame, prefersReducedMotion, preloadNeighborhood, scrollYProgress]);

  useEffect(() => {
    targetFrameRef.current = prefersReducedMotion
      ? 0
      : getFrameForProgress(scrollYProgress.get());
    currentFrameRef.current = -1;
    queueDraw();
  }, [prefersReducedMotion, queueDraw, scrollYProgress]);

  useEffect(() => {
    const region = regionRef.current;
    if (!region || !isReady) return undefined;

    pageVisibleRef.current = document.visibilityState === "visible";

    const renderCurrentFrame = () => {
      const progress = scrollYProgress.get();
      const frameIndex = prefersReducedMotion ? 0 : getFrameForProgress(progress);
      targetFrameRef.current = frameIndex;

      loadFrame(frameIndex)
        .then(queueDraw)
        .catch((error) => console.error("AI-CSD frame could not be loaded.", error));
      preloadNeighborhood(frameIndex);
      if (!prefersReducedMotion && progress >= FINAL_FRAME_PREFETCH_POINT) {
        loadFrame(FINAL_STORY_FRAME).catch(() => {});
      }
      queueDraw();
    };

    const handleVisibilityChange = () => {
      pageVisibleRef.current = document.visibilityState === "visible";
      if (pageVisibleRef.current) renderCurrentFrame();
      else if (drawRafRef.current !== null) {
        cancelAnimationFrame(drawRafRef.current);
        drawRafRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        regionVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && pageVisibleRef.current) renderCurrentFrame();
      },
      { threshold: 0 }
    );

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (prefersReducedMotion || !regionVisibleRef.current || !pageVisibleRef.current) return;

      const frameIndex = getFrameForProgress(progress);
      if (progress >= FINAL_FRAME_PREFETCH_POINT) loadFrame(FINAL_STORY_FRAME).catch(() => {});
      if (frameIndex === targetFrameRef.current) return;

      targetFrameRef.current = frameIndex;
      loadFrame(frameIndex).then(queueDraw).catch(() => {});
      preloadNeighborhood(frameIndex);
      queueDraw();
    });

    const handleResize = () => {
      currentFrameRef.current = -1;
      renderCurrentFrame();
    };

    observer.observe(region);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      observer.disconnect();
      unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      if (drawRafRef.current !== null) cancelAnimationFrame(drawRafRef.current);
      drawRafRef.current = null;
    };
  }, [isReady, loadFrame, prefersReducedMotion, preloadNeighborhood, queueDraw, scrollYProgress]);

  return (
    <section ref={regionRef} className="relative isolate bg-transparent">
      <div className="hero-sequence-surface sticky top-0 z-0 h-screen h-[100svh] overflow-hidden pointer-events-none">
        <canvas ref={canvasRef} className="block h-full w-full opacity-90" aria-hidden="true" />
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <span className="sr-only">{t("home.story.loading", "Loading AI-CSD sequence")}</span>
          </div>
        )}
      </div>

      <div className="relative z-10 -mt-[100svh]">
        <div ref={storyRef} className={prefersReducedMotion ? "relative h-[100svh]" : "relative h-[255svh] md:h-[285vh]"}>
          {prefersReducedMotion ? <ReducedMotionStory /> : <StoryCopy progress={scrollYProgress} />}
        </div>
        <div className="relative z-20 pb-12 sm:pb-16">
          {children}
        </div>
      </div>
    </section>
  );
}
