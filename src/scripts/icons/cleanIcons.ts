import { readdirSync, rmSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const iconsDir = join(import.meta.dirname, '..', '..', '..', 'icons');

for (const file of readdirSync(iconsDir)) {
  if (file.includes('~')) {
    unlinkSync(join(iconsDir, file));
  }
}

const clonesDir = join(iconsDir, 'clones');
rmSync(clonesDir, { recursive: true, force: true });

// Runtime snapshots must never be included in a freshly built extension.
rmSync(join(iconsDir, 'generated'), { recursive: true, force: true });
