import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
// The recovered originals are 2560x1440, not native 4K. This is an explicit
// upscale for delivery; do not describe the result as recovered 4K detail.
let next = 1;
await Promise.all(Array.from({ length: 2 }, async () => {
  while (next <= 118) {
    const index = next++;
    await sharp(path.join(root, `public/frames/frame-${index}.webp`))
      .resize(3840, 2160, { kernel: "lanczos3" })
      .webp({ quality: 90, smartSubsample: true, effort: 4 })
      .toFile(path.join(root, `public/frames/mobile/frame-${index}.webp`));
  }
}));
console.log("Generated 118 upscaled 3840x2160 mobile frames from the 1440p desktop originals.");
