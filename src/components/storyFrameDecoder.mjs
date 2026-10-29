// A replaceable working set, not a FIFO: old scroll requests never queue ahead
// of the current target. An already running browser decode cannot be cancelled.
export function createStoryFrameDecoder({
  decode, frameCount = 118, maxFrames = 16, maxBytes = 48 * 1024 * 1024,
  schedule = (callback) => setTimeout(callback, 0), cancel = clearTimeout,
}) {
  const cache = new Map();
  const active = new Map();
  const failed = new Map();
  const listeners = new Set();
  let target = 0;
  let direction = 1;
  let timer = null;
  let paused = false;
  let bytes = 0;

  const priorities = () => {
    const indices = [target];
    // Keep immediate reverse neighbours warm as well as the forward runway.
    for (let distance = 1; distance <= 10; distance++) {
      indices.push(target + direction * distance);
      if (distance % 2 === 0 && distance <= 8) indices.push(target - direction * (distance / 2));
    }
    return indices.filter((index) => index >= 0 && index < frameCount);
  };
  const emit = () => listeners.forEach((listener) => listener());
  const evict = () => {
    const order = priorities();
    const rank = (index) => order.includes(index) ? order.indexOf(index) : Infinity;
    const victims = [...cache.keys()].sort((a, b) => rank(b) - rank(a));
    for (const index of victims) {
      if (cache.size <= maxFrames && bytes <= maxBytes) break;
      if (index === target) continue;
      const image = cache.get(index);
      bytes -= image.width * image.height * 4;
      image.close?.();
      cache.delete(index);
    }
  };
  const start = (index) => {
    const request = Promise.resolve().then(() => decode(index));
    active.set(index, request);
    request.then((image) => {
      // A fling or reversal can make a completed decode irrelevant.
      if (!priorities().includes(index)) image.close?.();
      else {
        cache.set(index, image);
        bytes += image.width * image.height * 4;
        evict();
      }
    }, (error) => failed.set(index, error)).finally(() => {
      active.delete(index);
      emit();
      pump();
    });
  };
  const pump = () => {
    cancel(timer);
    timer = null;
    if (paused) return;
    if (!cache.has(target) && !active.has(target) && !failed.has(target) && active.size < 2) {
      start(target);
    }
    // Background work is serial and only starts once the current frame is
    // ready. Reserve the second slot for a new foreground request.
    if (!cache.has(target) || active.size) return;
    const next = priorities().find((index) => !cache.has(index) && !failed.has(index));
    if (next === undefined) return;
    // Make room only by replacing a lower-priority frame. Otherwise a byte
    // limit smaller than the neighbourhood would cause decode/evict churn.
    const order = priorities();
    const estimate = cache.get(target).width * cache.get(target).height * 4;
    for (const index of [...cache.keys()].sort((a, b) => order.indexOf(b) - order.indexOf(a))) {
      if (cache.size < maxFrames && bytes + estimate <= maxBytes) break;
      if (order.indexOf(index) <= order.indexOf(next)) return;
      const image = cache.get(index);
      bytes -= image.width * image.height * 4;
      image.close?.();
      cache.delete(index);
    }
    if (cache.size >= maxFrames || bytes + estimate > maxBytes) return;
    // Yield to input without adding a whole display frame to every decode.
    timer = schedule(() => { timer = null; start(next); });
  };
  return {
    get: (index) => cache.get(index),
    setTarget(index) {
      if (index !== target) {
        direction = index > target ? 1 : -1;
        target = index;
        failed.clear();
        // Release obsolete frames so memory is available for the new runway.
        for (const [key, image] of cache) {
          if (!priorities().includes(key)) {
            bytes -= image.width * image.height * 4;
            image.close?.();
            cache.delete(key);
          }
        }
      }
      paused = false;
      pump();
    },
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    warm() {
      failed.clear();
      paused = false;
      return new Promise((resolve, reject) => {
        const check = () => {
          const current = cache.get(target);
          // Frame dimensions can vary between asset versions or decoders.
          // Never wait for more decoded images than the byte budget can hold.
          const capacity = current
            ? Math.max(1, Math.floor(maxBytes / (current.width * current.height * 4)))
            : 4;
          const needed = priorities().slice(0, Math.min(4, maxFrames, capacity));
          const error = needed.map((index) => failed.get(index)).find(Boolean);
          if (error || needed.every((index) => cache.has(index))) {
            listeners.delete(check);
            if (error) reject(error); else resolve();
          }
        };
        listeners.add(check);
        pump();
        check();
      });
    },
    pause() { paused = true; cancel(timer); timer = null; },
  };
}
