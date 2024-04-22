function addExts(name: string, exts: string[]): string[] {
  return exts.map((ext) => name + '.' + ext);
}

type Method = 'CONF' | 'ECMA' | 'BOTH';

const ext: Record<Method, string[]> = {
  CONF: ['json', 'jsonc', 'json5', 'yaml', 'yml', 'toml'],
  ECMA: ['js', 'mjs', 'cjs', 'ts', 'mts', 'cts'],
  get BOTH() {
    return [...this.CONF, ...this.ECMA];
  },
};

type PatternFunc = (key: string) => string[];

const to: Record<Method | 'AsRC', PatternFunc> = {
  ECMA: (name) => addExts(name, ext.ECMA),
  CONF: (name) => addExts(name, ext.CONF),
  BOTH: (name) => addExts(name, ext.BOTH),
  AsRC: (name) => [name, ...addExts(name, ext.BOTH)],
};

/* eslint-disable @typescript-eslint/naming-convention */
export const Ecmascript: PatternFunc = (name) => to.ECMA(name);

export const Configuration: PatternFunc = (name) => to.CONF(name);

export const NodeEcosystem: PatternFunc = (name) => to.BOTH(name);

export const Cosmiconfig: PatternFunc = (name) => [
  ...to.AsRC(`.${name}rc`),
  ...to.AsRC(`.config/${name}rc`),
  ...to.BOTH(`${name}.config`),
];

export type PatternType =
  | typeof Ecmascript
  | typeof Configuration
  | typeof NodeEcosystem
  | typeof Cosmiconfig;
