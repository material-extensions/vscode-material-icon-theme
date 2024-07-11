import { dirname, join } from 'node:path';

export const getCustomIconPaths = (
  filesAssociations: Record<string, string> = {}
) => {
  return Object.values(filesAssociations)
    .filter((v) => v.match(/^[.\/]+/)) // <- custom dirs have a relative path to the dist folder
    .map((v) => dirname(join(__dirname, v)));
};
