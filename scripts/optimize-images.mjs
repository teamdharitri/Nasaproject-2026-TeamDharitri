// Copies the raw storybook illustrations and NASA photos into public/ as compressed WebP.
// Usage: npm run images
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const GEN = path.join(process.env.USERPROFILE ?? "", ".factory", "generated-images");
const PREFIX = "soft-watercolor-children-s-storybook-illustratio";
const OUT = path.resolve("public");

const illustrations = {
  "": "common/cover",
  "-2": "common/hq-nova",
  "-3": "common/bolt-capsule",
  "-7": "m1/airbag-bounce",
  "-6": "m1/lander-ramp",
  "-5": "m1/yogi",
  "-8": "m1/last-night",
  "-12": "m2/twins",
  "-10": "m2/dust-devil",
  "-11": "m2/white-soil",
  "-9": "m2/troy",
  "-16": "m3/eagle-crater",
  "-14": "m3/blueberries",
  "-15": "m3/marathon",
  "-13": "m3/dust-storm",
};

const nasa = {
  "m1/nasa-airbags": "https://images-assets.nasa.gov/image/PIA00611/PIA00611~small.jpg",
  "m1/nasa-yogi": "https://images-assets.nasa.gov/image/PIA00672/PIA00672~orig.jpg",
  "m1/nasa-barnacle-bill": "https://images-assets.nasa.gov/image/PIA01408/PIA01408~small.jpg",
  "m2/nasa-dust-devils": "https://images-assets.nasa.gov/image/PIA07457/PIA07457~orig.jpg",
  "m2/nasa-husband-hill": "https://images-assets.nasa.gov/image/PIA17760/PIA17760~medium.jpg",
  "m2/nasa-silica": "https://images-assets.nasa.gov/image/PIA09491/PIA09491~small.jpg",
  "m2/nasa-troy": "https://images-assets.nasa.gov/image/PIA12337/PIA12337~small.jpg",
  "m3/nasa-eagle-crater": "https://images-assets.nasa.gov/image/PIA05633/PIA05633~medium.jpg",
  "m3/nasa-berries": "https://images-assets.nasa.gov/image/PIA05273/PIA05273~small.jpg",
  "m3/nasa-homestake": "https://images-assets.nasa.gov/image/PIA15035/PIA15035~medium.jpg",
  "m3/nasa-marathon": "https://images-assets.nasa.gov/image/PIA19157/PIA19157~medium.jpg",
  "m3/nasa-darkness": "https://images-assets.nasa.gov/image/PIA22521/PIA22521~small.jpg",
};

async function save(input, name, width) {
  const file = path.join(OUT, `${name}.webp`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(file);
  const { size } = await fs.stat(file);
  console.log(`${name}.webp  ${(size / 1024).toFixed(0)} KB`);
}

for (const [suffix, name] of Object.entries(illustrations)) {
  await save(path.join(GEN, `${PREFIX}${suffix}.png`), name, 1600);
}

// Case board background without painted file cards; the cards are drawn in HTML on top.
await save(path.join(GEN, "remove-all-eight-floating-translucent-cyan-file.png"), "common/case-board", 1600);

const rovers = { "-17": "sojourner", "-19": "spirit", "-18": "opportunity" };
for (const [suffix, name] of Object.entries(rovers)) {
  await save(path.join(GEN, `${PREFIX}${suffix}.png`), `rovers/${name}`, 480);
}

for (const [name, url] of Object.entries(nasa)) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  await save(Buffer.from(await res.arrayBuffer()), name, 1400);
}

const PORTRAIT = "soft-watercolor-children-s-storybook-character-p";
for (const [suffix, name] of [["", "nova"]]) {
  const file = path.join(OUT, "chars", `${name}.webp`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await sharp(path.join(GEN, `${PORTRAIT}${suffix}.png`)).resize(240).webp({ quality: 80 }).toFile(file);
  console.log(`chars/${name}.webp`);
}
await sharp(path.join(GEN, `${PREFIX}-3.png`))
  .extract({ left: 400, top: 380, width: 380, height: 380 })
  .resize(240)
  .webp({ quality: 80 })
  .toFile(path.join(OUT, "chars", "bolt.webp"));
console.log("chars/bolt.webp");

await sharp(path.join(GEN, `${PREFIX}-3.png`))
  .extract({ left: 400, top: 380, width: 380, height: 380 })
  .resize(256)
  .png()
  .toFile(path.join(OUT, "icon.png"));
console.log("icon.png");
