import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'static/media/images');
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 82;
const EXTS = new Set(['.jpg', '.jpeg', '.png']);

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(full);
		else yield full;
	}
}

let total = 0, saved = 0, count = 0;

for await (const file of walk(ROOT)) {
	const ext = extname(file).toLowerCase();
	if (!EXTS.has(ext)) continue;

	const before = (await stat(file)).size;
	const img = sharp(file).resize(MAX_WIDTH, MAX_HEIGHT, { fit: 'inside', withoutEnlargement: true });

	let buf;
	if (ext === '.png') {
		buf = await img.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toBuffer();
	} else {
		buf = await img.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
	}

	// Write back only if smaller
	if (buf.length < before) {
		await sharp(buf).toFile(file);
		saved += before - buf.length;
	}

	total += before;
	count++;
	process.stdout.write(`\r[${count}] ${(saved / 1024 / 1024).toFixed(1)}MB saved so far...`);
}

console.log(`\nDone. ${count} images processed. Saved ${(saved / 1024 / 1024).toFixed(1)}MB of ${(total / 1024 / 1024).toFixed(1)}MB total.`);
