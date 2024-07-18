import { join } from 'node:path';
import esbuild from 'esbuild';
import config from './esbuild.config';

const output = await esbuild.build(config).catch(() => process.exit(1));

// If metafile is enabled, write it to dist/metafile.json
// Metafiles can be analyzed to determine the dependencies of the build
// https://esbuild.github.io/analyze/
if (config.metafile) {
  const path = join(process.cwd(), 'dist', 'metafile.json');
  await Bun.write(path, JSON.stringify(output.metafile, undefined, 2));
}
