import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { IconPack } from '../../core';
import {
  mergeConfigLayers,
  normalizeIconConfig,
  parseProjectIconsJson,
  resolveProjectIconsConfig,
  stripJsonCommentsAndTrailingCommas,
} from './projectConfig';

describe('projectConfig', () => {
  const tempDirs: string[] = [];

  const createTempDir = () => {
    const dir = mkdtempSync(join(tmpdir(), 'mit-project-config-'));
    tempDirs.push(dir);
    return dir;
  };

  afterEach(() => {
    while (tempDirs.length > 0) {
      const dir = tempDirs.pop();
      if (dir) {
        rmSync(dir, { recursive: true, force: true });
      }
    }
    vi.restoreAllMocks();
  });

  describe('stripJsonCommentsAndTrailingCommas', () => {
    it('strips line comments, block comments, and trailing commas without altering strings', () => {
      const input = `{
        // top-level comment
        "activeIconPack": "react",
        "folders": {
          /* multi-line
             block comment */
          "color": "#90a4ae", // inline comment
          "associations": {
            "docs//guide": "docs",
            "url/*test*/": "url",
          },
        },
        "custom": ["a", "b",],
      }`;

      const parsed = JSON.parse(stripJsonCommentsAndTrailingCommas(input));
      expect(parsed).toStrictEqual({
        activeIconPack: 'react',
        folders: {
          color: '#90a4ae',
          associations: {
            'docs//guide': 'docs',
            'url/*test*/': 'url',
          },
        },
        custom: ['a', 'b'],
      });
    });

    it('preserves escaped quotes inside strings', () => {
      const input = `{
        "files": {
          "associations": {
            "a\\"//b": "typescript", // trailing comment
          }
        }
      }`;

      const parsed = JSON.parse(stripJsonCommentsAndTrailingCommas(input));
      expect(parsed.files.associations['a"//b']).toBe('typescript');
    });
  });

  describe('normalizeIconConfig', () => {
    it('normalizes unprefixed, prefixed, and dotted keys and merges them cleanly', () => {
      const normalized = normalizeIconConfig({
        $schema: './schemas/icons.schema.json',
        unknownKey: 'ignored',
        activeIconPack: 'none',
        folders: {
          color: '#42a5f5',
          associations: {
            app: 'app',
          },
        },
        'material-icon-theme.folders.associations': {
          domain: 'core',
        },
        'material-icon-theme.hidesExplorerArrows': true,
      });

      expect(normalized).toStrictEqual({
        activeIconPack: '',
        hidesExplorerArrows: true,
        folders: {
          color: '#42a5f5',
          associations: {
            app: 'app',
            domain: 'core',
          },
        },
      });
    });
  });

  describe('parseProjectIconsJson', () => {
    it('parses valid JSONC with projects overrides', () => {
      const result = parseProjectIconsJson(`{
        // root pack
        "activeIconPack": "angular",
        "projects": {
          "apps/web": {
            "activeIconPack": "react",
          },
        },
      }`);

      expect(result).toStrictEqual({
        config: { activeIconPack: IconPack.Angular },
        projects: {
          'apps/web': { activeIconPack: IconPack.React },
        },
      });
    });

    it('returns null for invalid JSON or non-object root', () => {
      expect(parseProjectIconsJson('{ invalid json')).toBeNull();
      expect(parseProjectIconsJson('["not-an-object"]')).toBeNull();
      expect(parseProjectIconsJson('   ')).toBeNull();
    });
  });

  describe('mergeConfigLayers', () => {
    it('merges plain objects recursively while replacing primitives and arrays', () => {
      const merged = mergeConfigLayers(
        {
          activeIconPack: IconPack.Angular,
          folders: {
            theme: 'specific',
            associations: { tests: 'tests', shared: 'shared' },
            customClones: [
              { name: 'global-clone', base: 'folder', color: '#111111' },
            ],
          },
        },
        {
          activeIconPack: IconPack.Nest,
          folders: {
            associations: { tests: '', feature: 'feature' },
            customClones: [
              { name: 'project-clone', base: 'folder', color: '#222222' },
            ],
          },
        }
      );

      expect(merged).toStrictEqual({
        activeIconPack: IconPack.Nest,
        folders: {
          theme: 'specific',
          associations: { tests: '', shared: 'shared', feature: 'feature' },
          customClones: [
            { name: 'project-clone', base: 'folder', color: '#222222' },
          ],
        },
      });
    });
  });

  describe('resolveProjectIconsConfig', () => {
    it('returns undefined when workspace has no .vscode/icons.json', () => {
      const root = createTempDir();
      expect(resolveProjectIconsConfig(root)).toBeUndefined();
      expect(resolveProjectIconsConfig(undefined)).toBeUndefined();
    });

    it('loads root .vscode/icons.json', () => {
      const root = createTempDir();
      mkdirSync(join(root, '.vscode'), { recursive: true });
      writeFileSync(
        join(root, '.vscode', 'icons.json'),
        JSON.stringify({
          activeIconPack: 'vue',
          folders: { associations: { stores: 'vuex-store' } },
        })
      );

      expect(resolveProjectIconsConfig(root)).toStrictEqual({
        activeIconPack: IconPack.Vue,
        folders: { associations: { stores: 'vuex-store' } },
      });
    });

    it('resolves nested .vscode/icons.json and projects overrides for monorepos', () => {
      const root = createTempDir();
      mkdirSync(join(root, '.vscode'), { recursive: true });
      mkdirSync(join(root, 'apps', 'web', '.vscode'), { recursive: true });
      mkdirSync(join(root, 'apps', 'web', 'src'), { recursive: true });
      mkdirSync(join(root, 'apps', 'api', 'src'), { recursive: true });
      mkdirSync(join(root, 'apps', 'api', 'admin', 'src'), {
        recursive: true,
      });

      writeFileSync(
        join(root, '.vscode', 'icons.json'),
        JSON.stringify({
          activeIconPack: 'angular',
          folders: {
            associations: { shared: 'shared' },
          },
          projects: {
            'apps/api': {
              activeIconPack: 'nest',
              files: { associations: { '*.dto.ts': 'nest-dto' } },
            },
            'apps/api/admin': {
              activeIconPack: 'react',
            },
          },
        })
      );

      writeFileSync(
        join(root, 'apps', 'web', '.vscode', 'icons.json'),
        JSON.stringify({
          activeIconPack: 'vue',
          folders: { associations: { views: 'views' } },
        })
      );

      // Nested .vscode/icons.json in apps/web overrides root activeIconPack and merges associations
      expect(
        resolveProjectIconsConfig(
          root,
          join(root, 'apps', 'web', 'src', 'App.vue')
        )
      ).toStrictEqual({
        activeIconPack: IconPack.Vue,
        folders: { associations: { shared: 'shared', views: 'views' } },
      });

      // projects override in root .vscode/icons.json for apps/api
      expect(
        resolveProjectIconsConfig(
          root,
          join(root, 'apps', 'api', 'src', 'app.module.ts')
        )
      ).toStrictEqual({
        activeIconPack: IconPack.Nest,
        folders: { associations: { shared: 'shared' } },
        files: { associations: { '*.dto.ts': 'nest-dto' } },
      });

      // Longest matching prefix in projects overrides shorter prefix
      expect(
        resolveProjectIconsConfig(
          root,
          join(root, 'apps', 'api', 'admin', 'src', 'index.tsx')
        )
      ).toStrictEqual({
        activeIconPack: IconPack.React,
        folders: { associations: { shared: 'shared' } },
        files: { associations: { '*.dto.ts': 'nest-dto' } },
      });

      // File outside workspace root falls back to root .vscode/icons.json only
      expect(
        resolveProjectIconsConfig(root, '/tmp/outside/file.ts')
      ).toStrictEqual({
        activeIconPack: IconPack.Angular,
        folders: { associations: { shared: 'shared' } },
      });
    });
  });
});
