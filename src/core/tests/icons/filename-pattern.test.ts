import { describe, expect, it } from 'bun:test';
import type { FileIcon } from '../../models/icons/files/fileIcon';
import {
  type FileIconWithPatterns,
  FileNamePattern,
} from '../../models/icons/patterns/patterns';
import { parseByPattern } from '../../patterns/patterns';

describe('File name patterns', () => {
  it('should add a pattern to the file names', () => {
    const fileIconsWithPatterns: FileIconWithPatterns = [
      {
        name: 'file1',
        fileNames: ['file1.txt'],
        patterns: {
          file1: FileNamePattern.Ecmascript,
        },
      },
    ];

    const expected: FileIcon[] = [
      {
        name: 'file1',
        fileNames: [
          'file1.js',
          'file1.mjs',
          'file1.cjs',
          'file1.ts',
          'file1.mts',
          'file1.cts',
          'file1.txt',
        ],
      },
    ];
    const result = parseByPattern(fileIconsWithPatterns);

    expect(result).toStrictEqual(expected);
  });

  it('should return same file names if there is no pattern configured', () => {
    const fileIconsWithPatterns: FileIconWithPatterns = [
      {
        name: 'file1',
        fileNames: ['file1.txt'],
      },
    ];

    const expected: FileIcon[] = [
      {
        name: 'file1',
        fileNames: ['file1.txt'],
      },
    ];
    const result = parseByPattern(fileIconsWithPatterns);

    expect(result).toStrictEqual(expected);
  });

  it('should add multiple patterns to the file names', () => {
    const fileIconsWithPatterns: FileIconWithPatterns = [
      {
        name: 'file1',
        fileNames: ['file1.txt'],
        patterns: {
          file1: FileNamePattern.Ecmascript,
          file2: FileNamePattern.Configuration,
        },
      },
    ];

    const expected: FileIcon[] = [
      {
        name: 'file1',
        fileNames: [
          'file1.js',
          'file1.mjs',
          'file1.cjs',
          'file1.ts',
          'file1.mts',
          'file1.cts',
          'file2.json',
          'file2.jsonc',
          'file2.json5',
          'file2.yaml',
          'file2.yml',
          'file2.toml',
          'file1.txt',
        ],
      },
    ];
    const result = parseByPattern(fileIconsWithPatterns);

    expect(result).toStrictEqual(expected);
  });
});
