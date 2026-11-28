import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import {
  type Config,
  extensionName,
  type IconPackValue,
  logger,
  set,
} from '../../core';
import type { RecursivePartial } from '../../core/types/recursivePartial';

export const projectIconsConfigDir = '.vscode';
export const projectIconsConfigFileName = 'icons.json';

export type ProjectIconsConfigFile = RecursivePartial<Config> & {
  $schema?: string;
  projects?: Record<string, RecursivePartial<Config>>;
  [key: string]: unknown;
};

const knownConfigTopKeys = new Set<string>([
  'activeIconPack',
  'hidesExplorerArrows',
  'opacity',
  'saturation',
  'folders',
  'rootFolders',
  'files',
  'languages',
  'enableLogging',
  'logLevel',
]);

/**
 * Strip `//` line comments, `/* * /` block comments, and trailing commas from JSONC
 * without modifying characters inside string literals.
 */
export const stripJsonCommentsAndTrailingCommas = (input: string): string => {
  let out = '';
  let inString = false;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const next = input[i + 1];

    if (inLineComment) {
      if (ch === '\n' || ch === '\r') {
        inLineComment = false;
        out += ch;
      }
      continue;
    }

    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        i++;
      } else if (ch === '\n' || ch === '\r') {
        out += ch;
      }
      continue;
    }

    if (inString) {
      out += ch;
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      out += ch;
      continue;
    }

    if (ch === '/' && next === '/') {
      inLineComment = true;
      i++;
      continue;
    }

    if (ch === '/' && next === '*') {
      inBlockComment = true;
      i++;
      continue;
    }

    out += ch;
  }

  // Remove trailing commas outside of string literals
  let finalOut = '';
  inString = false;
  escaped = false;

  for (let i = 0; i < out.length; i++) {
    const ch = out[i];

    if (inString) {
      finalOut += ch;
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      finalOut += ch;
      continue;
    }

    if (ch === ',') {
      let j = i + 1;
      while (j < out.length && /\s/.test(out[j])) {
        j++;
      }
      if (out[j] === '}' || out[j] === ']') {
        continue;
      }
    }

    finalOut += ch;
  }

  return finalOut;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Normalize raw config values into a clean `RecursivePartial<Config>`.
 * Supports both unprefixed keys (`activeIconPack`, `folders.associations`)
 * and `material-icon-theme.*` prefixed/dotted keys.
 */
export const normalizeIconConfig = (
  raw: Record<string, unknown>
): RecursivePartial<Config> => {
  const normalized: Record<string, unknown> = {};

  for (const [rawKey, value] of Object.entries(raw)) {
    if (rawKey === '$schema' || rawKey === 'projects') {
      continue;
    }
    if (value === undefined || value === null) {
      continue;
    }

    const prefix = `${extensionName}.`;
    const key = rawKey.startsWith(prefix)
      ? rawKey.slice(prefix.length)
      : rawKey;
    const topKey = key.split('.')[0];

    if (!knownConfigTopKeys.has(topKey)) {
      continue;
    }

    if (key.includes('.')) {
      const temp: Record<string, unknown> = {};
      set(temp, key, value);
      Object.assign(normalized, mergePlainObjects(normalized, temp));
    } else if (isPlainObject(value) && isPlainObject(normalized[key])) {
      normalized[key] = mergePlainObjects(
        normalized[key] as Record<string, unknown>,
        value
      );
    } else {
      normalized[key] = value;
    }
  }

  if (normalized.activeIconPack === 'none') {
    normalized.activeIconPack = '' as IconPackValue;
  }

  return normalized as RecursivePartial<Config>;
};

const mergePlainObjects = (
  base: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> => {
  const result: Record<string, unknown> = { ...base };

  for (const [key, overrideVal] of Object.entries(override)) {
    if (overrideVal === undefined || overrideVal === null) {
      continue;
    }
    const baseVal = result[key];
    if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key] = mergePlainObjects(baseVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  }

  return result;
};

/**
 * Merge config layers in ascending precedence order (later layers override earlier ones).
 * Plain objects merge recursively; primitives and arrays replace earlier values.
 */
export const mergeConfigLayers = (
  ...layers: (RecursivePartial<Config> | undefined)[]
): RecursivePartial<Config> => {
  let result: Record<string, unknown> = {};

  for (const layer of layers) {
    if (!layer || !isPlainObject(layer)) {
      continue;
    }
    result = mergePlainObjects(result, layer as Record<string, unknown>);
  }

  return result as RecursivePartial<Config>;
};

/**
 * Parse raw JSON/JSONC content from `.vscode/icons.json`.
 */
export const parseProjectIconsJson = (
  content: string,
  filePath?: string
): {
  config: RecursivePartial<Config>;
  projects?: Record<string, RecursivePartial<Config>>;
} | null => {
  try {
    const cleaned = stripJsonCommentsAndTrailingCommas(content).trim();
    if (!cleaned) {
      return null;
    }
    const parsed = JSON.parse(cleaned) as unknown;
    if (!isPlainObject(parsed)) {
      logger.error(
        `Invalid ${projectIconsConfigFileName} format${filePath ? ` at ${filePath}` : ''}: expected a JSON object.`
      );
      return null;
    }

    const config = normalizeIconConfig(parsed);
    let projects: Record<string, RecursivePartial<Config>> | undefined;

    if (isPlainObject(parsed.projects)) {
      projects = {};
      for (const [subPath, subConfig] of Object.entries(parsed.projects)) {
        if (isPlainObject(subConfig)) {
          projects[subPath] = normalizeIconConfig(subConfig);
        }
      }
    }

    return { config, projects };
  } catch (error) {
    logger.error(
      `Failed to parse ${projectIconsConfigFileName}${filePath ? ` at ${filePath}` : ''}: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
};

const readProjectIconsFile = (
  filePath: string
): ReturnType<typeof parseProjectIconsJson> => {
  if (!existsSync(filePath)) {
    return null;
  }
  try {
    const content = readFileSync(filePath, 'utf-8');
    return parseProjectIconsJson(content, filePath);
  } catch (error) {
    logger.error(
      `Failed to read ${filePath}: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
};

const normalizeRelPath = (p: string): string => {
  return p
    .split(sep)
    .join('/')
    .replace(/^\.\/+/, '')
    .replace(/\/+$/, '');
};

const findMatchingProjectOverride = (
  projects: Record<string, RecursivePartial<Config>> | undefined,
  relTargetPath: string
): RecursivePartial<Config> | undefined => {
  if (!projects || !relTargetPath) {
    return undefined;
  }

  const normalizedTarget = normalizeRelPath(relTargetPath);
  const matches: { prefixLen: number; config: RecursivePartial<Config> }[] = [];

  for (const [rawPrefix, projectConfig] of Object.entries(projects)) {
    const prefix = normalizeRelPath(rawPrefix);
    if (!prefix) {
      continue;
    }
    if (
      normalizedTarget === prefix ||
      normalizedTarget.startsWith(`${prefix}/`)
    ) {
      matches.push({ prefixLen: prefix.length, config: projectConfig });
    }
  }

  if (matches.length === 0) {
    return undefined;
  }

  matches.sort((a, b) => a.prefixLen - b.prefixLen);
  return mergeConfigLayers(...matches.map((m) => m.config));
};

/**
 * Resolve `.vscode/icons.json` configuration for a workspace folder and optional active file path.
 * Supports:
 * 1. `<workspaceRoot>/.vscode/icons.json`
 * 2. `projects` subpath overrides inside `.vscode/icons.json` (for monorepos)
 * 3. Nested `<subproject>/.vscode/icons.json` along the path from workspace root to the active file
 */
export const resolveProjectIconsConfig = (
  workspaceRootPath: string | undefined,
  activeFilePath?: string
): RecursivePartial<Config> | undefined => {
  if (!workspaceRootPath) {
    return undefined;
  }

  const rootResolved = resolve(workspaceRootPath);
  const candidateDirs: string[] = [rootResolved];

  let relTarget = '';
  if (activeFilePath) {
    const fileDirResolved = resolve(dirname(activeFilePath));
    const relFromRoot = relative(rootResolved, fileDirResolved);

    const isInsideRoot =
      relFromRoot === '' ||
      (!relFromRoot.startsWith('..') && relFromRoot !== '..');

    if (isInsideRoot) {
      relTarget = relative(rootResolved, resolve(activeFilePath));
      if (relFromRoot) {
        const segments = relFromRoot.split(sep).filter(Boolean);
        let current = rootResolved;
        for (const segment of segments) {
          current = join(current, segment);
          candidateDirs.push(current);
        }
      }
    }
  }

  const layers: RecursivePartial<Config>[] = [];

  for (const dir of candidateDirs) {
    const iconsFilePath = join(
      dir,
      projectIconsConfigDir,
      projectIconsConfigFileName
    );
    const parsed = readProjectIconsFile(iconsFilePath);
    if (!parsed) {
      continue;
    }

    layers.push(parsed.config);

    if (parsed.projects && relTarget) {
      const relFromDir = relative(dir, resolve(activeFilePath!));
      if (!relFromDir.startsWith('..')) {
        const override = findMatchingProjectOverride(
          parsed.projects,
          relFromDir
        );
        if (override) {
          layers.push(override);
        }
      }
    }
  }

  if (layers.length === 0) {
    return undefined;
  }

  return mergeConfigLayers(...layers);
};
