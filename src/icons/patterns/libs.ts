import { type FileIcon } from '../../models/index';

import { type PatternType } from './utils';

type Patterns = Record<string, PatternType>;

type RawFileIcons = (FileIcon & { patterns?: Patterns })[];

function mapPatterns(patterns: Patterns): string[] {
  return Object.entries(patterns).flatMap(([key, pattern]) => pattern(key));
}

export function parseByPattern(rawFileIcons: RawFileIcons): FileIcon[] {
  return rawFileIcons.map(({ patterns, fileNames = [], ...rest }) => ({
    ...rest,
    fileNames: patterns ? [...mapPatterns(patterns), ...fileNames] : fileNames,
  }));
}
