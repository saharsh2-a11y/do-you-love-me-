import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const imagesDir = path.join(rootDir, 'images');
const outputFile = path.join(rootDir, 'gallery.js');

const files = fs.existsSync(imagesDir)
  ? fs
      .readdirSync(imagesDir)
      .filter((file) => /\.(jpe?g|png|webp|gif|avif)$/i.test(file))
      .sort()
      .map((file) => `images/${file}`)
  : [];

const output = `window.galleryImages = ${JSON.stringify(files, null, 2)};\n`;
fs.writeFileSync(outputFile, output, 'utf8');

console.log(`Generated ${files.length} gallery images from ${imagesDir}`);
