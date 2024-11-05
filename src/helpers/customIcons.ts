import { dirname, join } from 'path';
import { IconJsonOptions } from '../models';

export const getCustomIconPaths = (options: IconJsonOptions) => {
  return Object.values(options?.files?.associations ?? {})
    .filter((v) => v.match(/^[.\/]+/)) // <- custom dirs have a relative path to the dist folder
    .map((v) => dirname(join(__dirname, v)));
};
