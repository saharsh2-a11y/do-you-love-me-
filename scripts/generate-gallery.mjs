import fs from 'node:fs';

const imgDir = 'images';
const files = fs.readdirSync(imgDir)
  .filter((file) => /\.(jpe?g|png|webp|gif)$/i.test(file))
  .sort();

const output =
  'window.galleryImages = ' +
  JSON.stringify(
    files.map((file) => `${imgDir}/${file}`),
    null,
    2
  ) + ';;\n';

fs.writeFileSync('gallery.js', output);
console.log(`Generated ${files.length} gallery images`);
