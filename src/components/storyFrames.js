export const FRAME_COUNT = 118;

const CONCURRENT_DOWNLOADS = 8;
const MOBILE_FRAME_VERSION = 2;
const cachedUrls = new Map();
const inFlight = new Map();

export function getFrameVariant() {
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

function frameKey(variant, index) {
  return `${variant}:${index}`;
}

export function getRequiredFrameIndices() {
  return Array.from({ length: FRAME_COUNT }, (_, index) => index);
}

export function getFrameUrl(index, variant = getFrameVariant()) {
  // The 1280px mobile sequence matches the 1.8x canvas without downloading
  // the full desktop files. The version avoids reusing older 960px copies.
  return variant === "mobile"
    ? `/frames/mobile/frame-${index + 1}.webp?v=${MOBILE_FRAME_VERSION}`
    : `/frames/frame-${index + 1}.webp`;
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
