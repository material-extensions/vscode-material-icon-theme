import { IconJsonOptions } from '../models';
import * as path from 'path';

export const getCustomIconPaths = (options: IconJsonOptions) => {
  return Object.values(options?.files?.associations ?? {})
    .filter((v) => v.match(/^[.\/]+/)) // <- custom dirs have a relative path to the dist folder
    .map((v) => path.dirname(path.join(__dirname, v)));
};
