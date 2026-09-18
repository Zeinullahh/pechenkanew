import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const framesDirectory = path.resolve(projectRoot, "public", "frames");
const framePattern = /^frame-(\d+)\.webp$/;

function createVignette(width, height) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vertical-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000" stop-opacity="1" />
          <stop offset="4%" stop-color="#000" stop-opacity="0.82" />
          <stop offset="12%" stop-color="#000" stop-opacity="0.38" />
          <stop offset="21%" stop-color="#000" stop-opacity="0" />
          <stop offset="77%" stop-color="#000" stop-opacity="0" />
          <stop offset="88%" stop-color="#000" stop-opacity="0.42" />
          <stop offset="96%" stop-color="#000" stop-opacity="0.86" />
          <stop offset="100%" stop-color="#000" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#vertical-vignette)" />
    </svg>
  `);
}

async function processFrame(inputPath, outputPath) {
  const source = sharp(inputPath, { failOn: "error" });
  const metadata = await source.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read dimensions for ${inputPath}`);
  }

  const output = await source
    .composite([{ input: createVignette(metadata.width, metadata.height), blend: "over" }])
    .webp({ quality: 90, smartSubsample: true, effort: 6 })
    .toBuffer();

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output);
}

async function createPreview() {
  const inputPath = path.resolve(projectRoot, process.argv[3] || "public/frames/frame-118.webp");
  const outputPath = path.resolve(projectRoot, process.argv[4] || "tmp/frame-preview/frame-118-vignette.webp");
  await processFrame(inputPath, outputPath);
  console.log(`Preview written to ${outputPath}`);
}

async function processSequence() {
  const entries = await readdir(framesDirectory, { withFileTypes: true });
  const frames = entries
    .filter((entry) => entry.isFile() && framePattern.test(entry.name))
    .sort((first, second) => {
      const firstNumber = Number(first.name.match(framePattern)[1]);
      const secondNumber = Number(second.name.match(framePattern)[1]);
      return firstNumber - secondNumber;
    });

  if (frames.length === 0) {
    throw new Error(`No WebP frames found in ${framesDirectory}`);
  }

  let nextIndex = 0;
  const workerCount = Math.min(4, frames.length);
  const workers = Array.from({ length: workerCount }, async () => {
    while (nextIndex < frames.length) {
      const frame = frames[nextIndex];
      nextIndex += 1;
      const framePath = path.join(framesDirectory, frame.name);
      await processFrame(framePath, framePath);
    }
  });

  await Promise.all(workers);
  console.log(`Applied the vertical vignette to ${frames.length} WebP frames.`);
}

if (process.argv[2] === "--preview") {
  await createPreview();
} else {
  await processSequence();
}
