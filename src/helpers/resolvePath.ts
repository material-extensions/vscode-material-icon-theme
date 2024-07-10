import { basename, join } from 'node:path';

export const resolvePath = (path: string): string => {
  if (basename(__dirname) === 'dist') {
    return join(__dirname, '..', path);
  } else {
    // executed via script
    return join(__dirname, '..', '..', '..', path);
  }
};
