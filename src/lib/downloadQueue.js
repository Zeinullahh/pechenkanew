/**
 * Shared download queue for certificate image generation.
 *
 * html-to-image is CPU-heavy — this queue ensures only a limited number of
 * render jobs run at the same time across all certificate pages, preventing
 * the browser (and any hosting server) from being overwhelmed when many
 * interns hit "Download" simultaneously.
 *
 * Usage:
 *   import { enqueue } from '@/lib/downloadQueue';
 *   await enqueue(() => toJpeg(element, options));
 */

const MAX_CONCURRENT = 2; // max simultaneous render jobs
const COOLDOWN_MS = 800; // minimum gap between finishing one job and starting the next

let running = 0;
const pending = []; // { resolve, reject, task }

function next() {
  if (running >= MAX_CONCURRENT || pending.length === 0) return;

  const { task, resolve, reject } = pending.shift();
  running++;

  task()
    .then(resolve)
    .catch(reject)
    .finally(() => {
      running--;
      // Small cooldown so the browser can breathe between renders
      setTimeout(next, COOLDOWN_MS);
    });
}

/**
 * Add a render task to the queue.
 * @param {() => Promise<string>} task  – async function that returns a data-URL
 * @returns {Promise<string>}
 */
export function enqueue(task) {
  return new Promise((resolve, reject) => {
    pending.push({ task, resolve, reject });
    next();
  });
}

/**
 * How many jobs are currently waiting (not yet started).
 */
export function pendingCount() {
  return pending.length;
}
