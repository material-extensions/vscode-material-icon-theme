import { Method, PatternFunction } from '../../models';

const addNameExtensions = (
  fileName: string,
  fileExtensions: string[]
): string[] => {
  return fileExtensions.map((ext) => fileName + '.' + ext);
};

const ext: Record<Method, string[]> = {
  CONF: ['json', 'jsonc', 'json5', 'yaml', 'yml', 'toml'],
  ECMA: ['js', 'mjs', 'cjs', 'ts', 'mts', 'cts'],
  get BOTH() {
    return [...this.CONF, ...this.ECMA];
  },
};

const to: Record<Method | 'AsRC', PatternFunction> = {
  ECMA: (name) => addNameExtensions(name, ext.ECMA),
  CONF: (name) => addNameExtensions(name, ext.CONF),
  BOTH: (name) => addNameExtensions(name, ext.BOTH),
  AsRC: (name) => [name, ...addNameExtensions(name, ext.BOTH)],
};

/** Adds the following extensions to the file name: `js`, `mjs`, `cjs`, `ts`, `mts`, `cts`. */
export const ecmascript: PatternFunction = (fileName) => to.ECMA(fileName);

/** Adds the following extensions to the file name: `json`, `jsonc`, `json5`, `yaml`, `yml`, `toml`. */
export const configuration: PatternFunction = (fileName) => to.CONF(fileName);

/** Adds the following extensions to the file name: `js`, `mjs`, `cjs`, `ts`, `mts`, `cts`, `json`, `jsonc`, `json5`, `yaml`, `yml`, `toml`. */
export const nodeEcosystem: PatternFunction = (fileName) => to.BOTH(fileName);

/** It adjusts the name with the following patterns: '.fileNamerc', '.config/fileNamerc', 'fileName.config' */
export const cosmiconfig: PatternFunction = (fileName) => [
  ...to.AsRC(`.${fileName}rc`),
  ...to.AsRC(`.config/${fileName}rc`),
  ...to.BOTH(`${fileName}.config`),
];

export type PatternType =
  | typeof ecmascript
  | typeof configuration
  | typeof nodeEcosystem
  | typeof cosmiconfig;
