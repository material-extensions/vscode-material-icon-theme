import { dirname, join } from 'node:path';

export const getCustomIconPaths = (
  filesAssociations: Record<string, string> = {}
) => {
  return Object.values(filesAssociations)
    .filter((fileName) => fileName.match(/^[.\/]+/)) // <- custom dirs have a relative path to the dist folder
    .map((fileName) => {
      // go up two directories to get to the .vscode/extensions/icons folder where the custom icons are stored
      // Only working when the filename is a relative path that looks like this: '../../icons/<filename>'
      return dirname(join(__dirname, '..', '..', fileName));
    });
};
