import { join } from 'node:path';

export const resolvePath = (...paths: string[]): string => {
  return join(__dirname, '..', '..', ...paths);
};
