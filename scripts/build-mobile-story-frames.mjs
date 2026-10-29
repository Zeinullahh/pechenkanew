import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
// Generate 900p directly from the restored 1440p originals, avoiding
// another compression pass through the previously upscaled mobile assets.
let next = 1;
await Promise.all(Array.from({ length: 2 }, async () => {
  while (next <= 118) {
    const index = next++;
    await sharp(path.join(root, `public/frames/frame-${index}.webp`))
      .resize(1600, 900, { kernel: "lanczos3" })
      .webp({ quality: 90, smartSubsample: true, effort: 4 })
      .toFile(path.join(root, `public/frames/mobile/frame-${index}.webp`));
  }
}));
console.log("Generated 118 1600x900 mobile frames from the 1440p desktop originals.");
