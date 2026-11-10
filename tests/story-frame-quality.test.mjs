import { test } from "node:test";
import assert from "node:assert/strict";

function globalValue(t, name, value) {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, name);
  Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
  t.after(() => {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  });
}

test("mobile sources decode at a bounded phone resolution", async (t) => {
  globalValue(t, "window", { innerWidth: 390 });
  const requests = [];
  const options = [];
  globalValue(t, "fetch", async (url) => {
    requests.push(url);
    return { ok: true, blob: async () => ({}) };
  });
  globalValue(t, "createImageBitmap", async (_, config) => {
    options.push(config);
    return { width: config.resizeWidth, height: config.resizeHeight, close() {} };
  });
  const { getMobileFrameDecoder, getFrameUrl, getRequiredFrameIndices } = await import("../src/components/storyFrames.js?bitmap-quality");
  assert.deepEqual(getRequiredFrameIndices("mobile"), Array.from({ length: 118 }, (_, index) => index));
  assert.deepEqual(getRequiredFrameIndices("desktop"), Array.from({ length: 118 }, (_, index) => index));
  const decoder = getMobileFrameDecoder();
  t.after(() => decoder.pause());
  await decoder.warm();
  decoder.pause();
  assert.equal(decoder.get(0).width, 960);
  assert.equal(decoder.get(0).height, 540);
  assert.ok(options.every((config) => config.resizeQuality === "medium"));
  assert.ok(requests.every((url) => url.includes("/mobile/") && url.endsWith("?v=5")));
  assert.equal(getFrameUrl(0, "desktop"), "/frames/frame-1.webp?v=3");
});

test("preloading waits for the final frame and retries failed downloads", async (t) => {
  const requests = [];
  let finishLast;
  let failLast = true;
  globalValue(t, "fetch", async (url) => {
    requests.push(url);
    if (url.includes("frame-118.webp")) {
      await new Promise((resolve) => { finishLast = resolve; });
      if (failLast) return { ok: false, status: 503 };
    }
    return { ok: true, blob: async () => new Blob(["frame"]) };
  });
  const frames = await import("../src/components/storyFrames.js?full-preload");
  t.after(() => {
    for (const index of frames.getRequiredFrameIndices()) {
      URL.revokeObjectURL(frames.getPreloadedFrameUrl(index, "mobile"));
    }
  });
  let progress = 0;
  const first = frames.preloadStoryFrames("mobile", (count) => { progress = count; });
  let settled = false;
  const failure = assert.rejects(first.promise, /Could not load 1 story frame/);
  first.promise.then(() => { settled = true; }, () => { settled = true; });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(requests.length, 118);
  assert.equal(progress, 117);
  assert.equal(settled, false);
  finishLast();
  await failure;
  first.unsubscribe();
  failLast = false;
  const retry = frames.preloadStoryFrames("mobile", (count) => { progress = count; });
  finishLast();
  await retry.promise;
  retry.unsubscribe();
  assert.equal(requests.length, 119);
  assert.equal(progress, 118);
  assert.ok(frames.getPreloadedFrameUrl(117, "mobile").startsWith("blob:"));
});

test("fallback resizing also bounds retained memory and releases canvas pixels", async (t) => {
  globalValue(t, "window", { innerWidth: 390 });
  const draws = [];
  globalValue(t, "createImageBitmap", undefined);
  globalValue(t, "Image", class {
    async decode() { this.naturalWidth = 1600; this.naturalHeight = 900; }
  });
  globalValue(t, "document", {
    createElement(name) {
      assert.equal(name, "canvas");
      return { getContext: () => ({ drawImage: (...args) => draws.push(args) }) };
    },
  });
  const { getMobileFrameDecoder } = await import("../src/components/storyFrames.js?fallback-quality");
  const decoder = getMobileFrameDecoder();
  t.after(() => decoder.pause());
  await decoder.warm();
  decoder.pause();
  const first = decoder.get(0);
  assert.equal(first.width, 960);
  assert.equal(first.height, 540);
  assert.ok(draws.every((args) => args[3] === 960 && args[4] === 540));
  // A distant target drops old canvases immediately, before its decode starts.
  decoder.setTarget(100);
  assert.equal(first.width, 0);
  assert.equal(first.height, 0);
  decoder.pause();
  await new Promise((resolve) => setImmediate(resolve));
});
