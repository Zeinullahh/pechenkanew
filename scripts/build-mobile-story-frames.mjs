import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
// Generate Full HD directly from the restored 1440p originals, avoiding
// another compression pass through the previously upscaled mobile assets.
let next = 1;
await Promise.all(Array.from({ length: 2 }, async () => {
  while (next <= 118) {
    const index = next++;
    await sharp(path.join(root, `public/frames/frame-${index}.webp`))
      .resize(1920, 1080, { kernel: "lanczos3" })
      .webp({ quality: 90, smartSubsample: true, effort: 4 })
      .toFile(path.join(root, `public/frames/mobile/frame-${index}.webp`));
  }
}));
console.log("Generated 118 Full HD 1920x1080 mobile frames from the 1440p desktop originals.");
