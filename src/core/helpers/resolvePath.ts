import { join } from 'node:path';

// @ts-ignore __dirname exists at runtime in the CJS bundle produced by esbuild
const dir = typeof __dirname !== 'undefined' ? __dirname : import.meta.dirname;

export const resolvePath = (...paths: string[]): string => {
  return join(dir, '..', '..', ...paths);
};
