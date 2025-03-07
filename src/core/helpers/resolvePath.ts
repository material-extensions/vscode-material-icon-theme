import { join } from 'node:path';

/**
 * Resolves a sequence of path segments into an absolute path.
 *
 * @param paths - A list of path segments to be joined and resolved relative to the module's root directory.
 * @returns The resolved absolute path as a string.
 */
export const resolvePath = (...paths: string[]): string => {
  return join(__dirname, '..', '..', ...paths);
};
