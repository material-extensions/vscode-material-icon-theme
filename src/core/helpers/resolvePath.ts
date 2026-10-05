import { AsyncLocalStorage } from 'node:async_hooks';
import { join } from 'node:path';

// @ts-ignore __dirname exists at runtime in the CJS bundle produced by esbuild
const dir = typeof __dirname !== 'undefined' ? __dirname : import.meta.dirname;
const iconRoot = new AsyncLocalStorage<string>();

/** Scope icon IO to one generation, including concurrent asynchronous calls. */
export const withIconRoot = <T>(root: string, action: () => T): T =>
  iconRoot.run(root, action);

export const resolvePath = (...paths: string[]): string => {
  return join(iconRoot.getStore() ?? join(dir, '..', '..'), ...paths);
};
