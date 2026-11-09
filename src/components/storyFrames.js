import { createStoryFrameDecoder } from "./storyFrameDecoder.mjs";

export const FRAME_COUNT = 118;
export const MOBILE_FRAME_STEP = 2;

const CONCURRENT_DOWNLOADS = 8;
const MOBILE_FRAME_VERSION = 5;
const DESKTOP_FRAME_VERSION = 3;
// Decode near the size actually painted on mobile instead of keeping 900p bitmaps.
const cachedUrls = new Map();
const inFlight = new Map();
let mobileDecoder;

export function getMobileFrameDecoder() {
  if (!mobileDecoder) {
    const decodeWidth = Math.min(1280, Math.max(960, Math.round(window.innerWidth * 1.72)));
    const decodeHeight = Math.round(decodeWidth * 9 / 16);
    mobileDecoder = createStoryFrameDecoder({
    frameCount: FRAME_COUNT,
    frameStep: MOBILE_FRAME_STEP,
    decode: async (index) => {
      const url = getPreloadedFrameUrl(index, "mobile");
      if (typeof createImageBitmap === "function") {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return await createImageBitmap(await response.blob(), {
            resizeWidth: decodeWidth,
            resizeHeight: decodeHeight,
            resizeQuality: "medium",
          });
        } catch {
          // Older WebKit versions may expose ImageBitmap but reject WebP.
        }
      }
      const image = new Image();
      image.decoding = "async";
      image.src = url;
      await image.decode();
      // Preserve the memory bound when bitmap resizing is unavailable.
      const canvas = document.createElement("canvas");
      canvas.width = decodeWidth;
      canvas.height = decodeHeight;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Unable to prepare mobile frame canvas");
      context.imageSmoothingQuality = "medium";
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.close = () => { canvas.width = 0; canvas.height = 0; };
      return canvas;
    },
  });
  }
  return mobileDecoder;
}

export function getFrameVariant() {
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

function frameKey(variant, index) {
  return `${variant}:${index}`;
}

export function getRequiredFrameIndices() {
  // The scrollytelling renderer fetches nearby frames as the visitor scrolls.
  // Keeping all 118 compressed frames in blob URLs for the entire visit can
  // exhaust memory on mobile just as the pricing section comes into view.
  return Array.from({ length: Math.min(FRAME_COUNT, 12) }, (_, index) => index);
}

export function getFrameUrl(index, variant = getFrameVariant()) {
  // Desktop uses the restored 1440p originals; mobile uses 900p copies.
  // Version both paths so browser caches cannot hide the asset upgrade.
  return variant === "mobile"
    ? `/frames/mobile/frame-${index + 1}.webp?v=${MOBILE_FRAME_VERSION}`
    : `/frames/frame-${index + 1}.webp?v=${DESKTOP_FRAME_VERSION}`;
}

export function getPreloadedFrameUrl(index, variant = getFrameVariant()) {
  return cachedUrls.get(frameKey(variant, index)) || getFrameUrl(index, variant);
}

export function preloadStoryFrames(variant, onProgress) {
  const requiredFrames = getRequiredFrameIndices();
  let request = inFlight.get(variant);
  if (!request) {
    const listeners = new Set();
    const loadedCount = () => requiredFrames.map((index) =>
      cachedUrls.has(frameKey(variant, index))
    ).filter(Boolean).length;
    request = { listeners, loadedCount, promise: null };
    inFlight.set(variant, request);

    let nextIndex = 0;
    const failures = [];
    const worker = async () => {
      while (nextIndex < requiredFrames.length) {
        const index = requiredFrames[nextIndex++];
        const key = frameKey(variant, index);
        if (cachedUrls.has(key)) continue;

        try {
          const response = await fetch(getFrameUrl(index, variant));
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const blob = await response.blob();
          cachedUrls.set(key, URL.createObjectURL(blob));
          const count = request.loadedCount();
          listeners.forEach((listener) => listener(count));
        } catch (error) {
          failures.push({ index, error });
        }
      }
    };

    request.promise = Promise.all(Array.from({ length: CONCURRENT_DOWNLOADS }, worker))
      .then(() => {
        if (failures.length) {
          throw new Error(`Could not load ${failures.length} story frame(s).`);
        }
      })
      .finally(() => inFlight.delete(variant));
  }

  if (onProgress) {
    request.listeners.add(onProgress);
    onProgress(request.loadedCount());
  }

  return {
    promise: request.promise,
    unsubscribe: () => request.listeners.delete(onProgress),
  };
}
