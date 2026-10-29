import { test } from "node:test";
import assert from "node:assert/strict";
import { createStoryFrameDecoder } from "../src/components/storyFrameDecoder.mjs";

const flush = () => new Promise((resolve) => setImmediate(resolve));
function harness(t, options = {}) {
  const pending = new Map();
  const started = [];
  const closed = [];
  const scheduled = new Map();
  let nextTimer = 0;
  const decoder = createStoryFrameDecoder({
    schedule(callback) { scheduled.set(++nextTimer, callback); return nextTimer; },
    cancel(timer) { scheduled.delete(timer); },
    ...options,
    decode(index) {
      started.push(index);
      return new Promise((resolve, reject) => pending.set(index, { resolve, reject }));
    },
  });
  t.after(() => decoder.pause());
  return {
    decoder, started, pending, closed,
    async tick() {
      const callbacks = [...scheduled.values()];
      scheduled.clear();
      callbacks.forEach((callback) => callback());
      await flush();
    },
    async finish(index) {
      assert.ok(pending.has(index), `frame ${index} is decoding`);
      pending.get(index).resolve({ width: 100, height: 100, close: () => closed.push(index) });
      pending.delete(index);
      await flush();
    },
  };
}

test("foreground bypasses background; a fling replaces pending targets", async (t) => {
  const h = harness(t);
  h.decoder.setTarget(0);
  await flush();
  await h.finish(0);
  await h.tick();
  assert.deepEqual(h.started, [0, 1]);
  h.decoder.setTarget(50);
  await flush();
  h.decoder.setTarget(90);
  h.decoder.setTarget(100);
  await flush();
  assert.deepEqual(h.started, [0, 1, 50]);
  await h.finish(1);
  assert.deepEqual(h.started, [0, 1, 50, 100]);
  await h.finish(50);
  await h.finish(100);
  assert.ok(h.decoder.get(100));
  assert.ok(h.closed.includes(1) && h.closed.includes(50));
  assert.equal(h.decoder.get(50), undefined);
});

test("reversal cancels queued forward work and warms reverse neighbours", async (t) => {
  const h = harness(t);
  h.decoder.setTarget(50);
  await flush();
  await h.finish(50);
  // The forward timer has not started yet.
  h.decoder.setTarget(49);
  await flush();
  await h.finish(49);
  await h.tick();
  assert.deepEqual(h.started, [50, 49, 48]);
});

test("warm waits for decoded startup frames, then respects memory without churn", async (t) => {
  const h = harness(t, { maxBytes: 4 * 100 * 100 * 4 });
  let ready = false;
  const warming = h.decoder.warm().then(() => { ready = true; });
  await flush();
  for (let index = 0; index < 4; index++) {
    assert.equal(ready, false);
    await h.finish(index);
    if (index < 3) await h.tick();
  }
  await warming;
  await h.tick();
  assert.deepEqual(h.started, [0, 1, 2, 3]);
  h.decoder.setTarget(3);
  await h.tick();
  assert.equal(h.started.at(-1), 4);
  assert.ok(h.closed.includes(0));
  await h.finish(4);
  await h.tick();
  await h.finish(5);
  assert.ok(h.decoder.get(3));
  assert.equal([0, 1, 2, 3, 4, 5].filter((index) => h.decoder.get(index)).length, 4);
});

test("all 118 frames can be requested in both directions within the cache bound", async (t) => {
  const h = harness(t, { maxFrames: 4 });
  const forward = Array.from({ length: 118 }, (_, index) => index);
  for (const index of [...forward, ...forward.toReversed()]) {
    h.decoder.setTarget(index);
    await flush();
    if (!h.decoder.get(index)) await h.finish(index);
    assert.ok(h.decoder.get(index));
    assert.ok(forward.filter((key) => h.decoder.get(key)).length <= 4);
  }
});

test("pause suppresses background work; resume and decode failure retry work", async (t) => {
  const h = harness(t);
  const warming = h.decoder.warm();
  await flush();
  h.pending.get(0).reject(new Error("decode failed"));
  h.pending.delete(0);
  await assert.rejects(warming, /decode failed/);
  const retry = h.decoder.warm();
  await flush();
  h.decoder.pause();
  await h.finish(0);
  await h.tick();
  assert.deepEqual(h.started, [0, 0]);
  h.decoder.setTarget(0);
  for (let index = 1; index < 4; index++) {
    await h.tick();
    await h.finish(index);
  }
  await retry;
});

test("startup readiness fits the byte budget even with full-size fallback images", async (t) => {
  const h = harness(t, { maxBytes: 2 * 100 * 100 * 4 });
  const warming = h.decoder.warm();
  await flush();
  await h.finish(0);
  await h.tick();
  await h.finish(1);
  await warming;
  await h.tick();
  assert.deepEqual(h.started, [0, 1]);
});

test("repeated target updates still leave one runnable background task", async (t) => {
  const h = harness(t);
  h.decoder.setTarget(0);
  await flush();
  await h.finish(0);
  for (let count = 0; count < 100; count++) h.decoder.setTarget(0);
  await h.tick();
  assert.deepEqual(h.started, [0, 1]);
});
