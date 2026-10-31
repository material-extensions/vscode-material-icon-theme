import { rmSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(import.meta.dirname, '..', '..', 'dist');

rmSync(distDir, { recursive: true, force: true });
