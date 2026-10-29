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

test("mobile 900p sources are decoded at their native resolution", async (t) => {
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
  const { getMobileFrameDecoder, getFrameUrl } = await import("../src/components/storyFrames.js?bitmap-quality");
  const decoder = getMobileFrameDecoder();
  t.after(() => decoder.pause());
  await decoder.warm();
  decoder.pause();
  assert.equal(decoder.get(0).width, 1600);
  assert.equal(decoder.get(0).height, 900);
  assert.ok(options.every((config) => config.resizeQuality === "high"));
  assert.ok(requests.every((url) => url.includes("/mobile/") && url.endsWith("?v=5")));
  assert.equal(getFrameUrl(0, "desktop"), "/frames/frame-1.webp?v=3");
});

test("fallback resizing also bounds retained memory and releases canvas pixels", async (t) => {
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
  assert.equal(first.width, 1600);
  assert.equal(first.height, 900);
  assert.ok(draws.every((args) => args[3] === 1600 && args[4] === 900));
  // A distant target drops old canvases immediately, before its decode starts.
  decoder.setTarget(100);
  assert.equal(first.width, 0);
  assert.equal(first.height, 0);
  decoder.pause();
  await new Promise((resolve) => setImmediate(resolve));
});
