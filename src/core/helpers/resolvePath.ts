import { join } from 'node:path';

export const resolvePath = (path: string): string => {
  return join(__dirname, '..', '..', path);
};
