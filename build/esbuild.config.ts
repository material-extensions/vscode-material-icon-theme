import type { BuildOptions } from 'esbuild';

const config: BuildOptions = {
  entryPoints: [
    './src/extension/extension.ts',
    './src/extension/web/extension.ts',
    './src/module.ts',
  ],
  bundle: true,
  platform: 'node',
  target: 'node12',
  outdir: './dist',
  outbase: './src',
  outExtension: {
    '.js': '.cjs',
  },
  format: 'cjs',
  external: ['vscode'],
  loader: {
    '.ts': 'ts',
    '.js': 'js',
  },
  logLevel: 'info',
};

export default config;
