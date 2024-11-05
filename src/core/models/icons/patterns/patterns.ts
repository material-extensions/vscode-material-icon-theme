import type { FileIcon } from '../files/fileIcon';

export enum FileNamePattern {
  /** Adds the following extensions to the file name: `js`, `mjs`, `cjs`, `ts`, `mts`, `cts`. */
  Ecmascript = 'ecmascript',

  /** Adds the following extensions to the file name: `json`, `jsonc`, `json5`, `yaml`, `yml`, `toml`. */
  Configuration = 'configuration',

  /** Adds the following extensions to the file name: `js`, `mjs`, `cjs`, `ts`, `mts`, `cts`, `json`, `jsonc`, `json5`, `yaml`, `yml`, `toml`. */
  NodeEcosystem = 'nodeEcosystem',

  /** It adjusts the name with the following patterns: `.fileNamerc`, `.config/fileNamerc`, `fileName.config` and combines that with the pattern `NodeEcosystem` */
  Cosmiconfig = 'cosmiconfig',
}

export type Patterns = Record<string, FileNamePattern>;
export type FileIconWithPatterns = (FileIcon & { patterns?: Patterns })[];
