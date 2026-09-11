import sharp from 'sharp';
import { readFile, writeFile, mkdir, readdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = process.cwd();
const output = path.join(root, 'public/optimized');
const cache = path.join(root, '.image-cache');
await mkdir(output, { recursive: true });
await mkdir(cache, { recursive: true });
const sources = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'optimized') await walk(file);
    else if (/\.(png|jpe?g|webp)$/i.test(file)) sources.push('/' + path.relative(path.join(root, 'public'), file));
  }
}
await walk(path.join(root, 'public'));
const data = await readFile(path.join(root, 'src/data.ts'), 'utf8');
sources.push(...data.match(/https:\/\/[^"\s]+/g) ?? []);
const manifest = {};
for (const source of [...new Set(sources)]) {
  let buffer;
  if (source.startsWith('https:')) {
    const cached = path.join(cache, createHash('sha256').update(source).digest('hex'));
    try { buffer = await readFile(cached); }
    catch {
      const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`Image download failed: ${source}`);
      buffer = Buffer.from(await response.arrayBuffer());
      await writeFile(cached, buffer);
    }
  } else buffer = await readFile(path.join(root, 'public', source));
  const meta = await sharp(buffer).metadata();
  const hash = createHash('sha256').update(buffer).update('webp-82-v1').digest('hex').slice(0, 16);
  const widths = [...new Set([320, 640, 960, 1440, 1920].filter(w => w < meta.width).concat(Math.min(meta.width, 1920)))];
  const variants = [];
  for (const width of widths) {
    const name = `${hash}-${width}.webp`;
    try { await access(path.join(output, name)); }
    catch { await sharp(buffer).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(output, name)); }
    variants.push({ width, src: `/optimized/${name}` });
  }
  manifest[source] = { width: meta.width, height: meta.height, variants };
}
await writeFile(path.join(root, 'src/image-manifest.json'), JSON.stringify(manifest));
console.log(`Prepared responsive WebP images for ${Object.keys(manifest).length} sources.`);
