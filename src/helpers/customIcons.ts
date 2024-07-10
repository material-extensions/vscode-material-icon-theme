import { dirname, join } from 'node:path';
import { type Config } from '../models';

export const getCustomIconPaths = (config: Config) => {
  return Object.values(config?.files?.associations ?? {})
    .filter((v) => v.match(/^[.\/]+/)) // <- custom dirs have a relative path to the dist folder
    .map((v) => dirname(join(__dirname, v)));
};
