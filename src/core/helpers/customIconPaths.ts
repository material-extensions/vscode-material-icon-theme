import { dirname } from 'node:path';
import { resolvePath } from './resolvePath';

export const getCustomIconPaths = (
  filesAssociations: Record<string, string> = {}
) => {
  return Object.values(filesAssociations)
    .filter((fileName) => fileName.match(/^[.\/]+/)) // <- custom dirs have a relative path to the dist folder
    .map((fileName) => dirname(resolvePath(fileName)));
};
