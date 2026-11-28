import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { IconPack } from '../../core';

type InspectedConfig = {
  defaultValue?: unknown;
  globalValue?: unknown;
  workspaceValue?: unknown;
  workspaceFolderValue?: unknown;
};

const state = vi.hoisted(() => ({
  workspaceFolders: [] as { uri: { scheme: string; fsPath: string } }[],
  activeTextEditor: undefined as
    | { document: { uri: { scheme: string; fsPath: string } } }
    | undefined,
  inspectedValues: new Map<string, InspectedConfig>(),
  updateSpy: vi.fn(),
  getConfigurationSpy: vi.fn(),
}));

vi.mock('vscode', () => ({
  // biome-ignore lint/style/useNamingConvention: VS Code API mock
  ConfigurationTarget: {
    // biome-ignore lint/style/useNamingConvention: VS Code API mock
    Global: 1,
    // biome-ignore lint/style/useNamingConvention: VS Code API mock
    Workspace: 2,
    // biome-ignore lint/style/useNamingConvention: VS Code API mock
    WorkspaceFolder: 3,
  },
  extensions: {
    getExtension: () => ({
      packageJSON: {
        contributes: {
          configuration: {
            properties: {
              'material-icon-theme.activeIconPack': {},
              'material-icon-theme.hidesExplorerArrows': {},
              'material-icon-theme.opacity': {},
              'material-icon-theme.saturation': {},
              'material-icon-theme.folders.theme': {},
              'material-icon-theme.folders.color': {},
              'material-icon-theme.folders.associations': {},
              'material-icon-theme.folders.customClones': {},
              'material-icon-theme.rootFolders.color': {},
              'material-icon-theme.rootFolders.associations': {},
              'material-icon-theme.files.color': {},
              'material-icon-theme.files.associations': {},
              'material-icon-theme.files.customClones': {},
              'material-icon-theme.languages.associations': {},
              'material-icon-theme.languages.customClones': {},
              'material-icon-theme.enableLogging': {},
              'material-icon-theme.logLevel': {},
            },
          },
        },
      },
    }),
  },
  workspace: {
    get workspaceFolders() {
      return state.workspaceFolders;
    },
    getWorkspaceFolder: (uri: { scheme: string; fsPath: string }) => {
      return state.workspaceFolders.find((f) =>
        uri.fsPath.startsWith(f.uri.fsPath)
      );
    },
    getConfiguration: (section?: string, scope?: unknown) => {
      state.getConfigurationSpy(section, scope);
      return {
        inspect: (key: string) => state.inspectedValues.get(key),
        update: state.updateSpy,
      };
    },
  },
  window: {
    get activeTextEditor() {
      return state.activeTextEditor;
    },
  },
}));

import { getConfigValue, getCurrentConfig, setThemeConfig } from './config';

describe('extension config resolution', () => {
  const tempDirs: string[] = [];

  const createTempDir = () => {
    const dir = mkdtempSync(join(tmpdir(), 'mit-config-test-'));
    tempDirs.push(dir);
    return dir;
  };

  beforeEach(() => {
    state.workspaceFolders = [];
    state.activeTextEditor = undefined;
    state.inspectedValues.clear();
    state.updateSpy.mockReset();
    state.getConfigurationSpy.mockReset();
  });

  afterEach(() => {
    while (tempDirs.length > 0) {
      const dir = tempDirs.pop();
      if (dir) {
        rmSync(dir, { recursive: true, force: true });
      }
    }
  });

  describe('getConfigValue', () => {
    it('gives workspace and workspaceFolder object values precedence over globalValue', () => {
      const value = getConfigValue<Record<string, string>>({
        defaultValue: {},
        globalValue: { '*.ts': 'typescript', globalOnly: 'json' },
        workspaceValue: { '*.ts': 'nest-service', wsOnly: 'yaml' },
        workspaceFolderValue: { '*.ts': 'angular-service', folderOnly: 'xml' },
      });

      expect(value).toStrictEqual({
        '*.ts': 'angular-service',
        globalOnly: 'json',
        wsOnly: 'yaml',
        folderOnly: 'xml',
      });
    });

    it('resolves scalar and array precedence as folder > workspace > global > default', () => {
      expect(
        getConfigValue({
          defaultValue: 'angular',
          globalValue: 'react',
          workspaceValue: 'vue',
          workspaceFolderValue: 'nest',
        })
      ).toBe('nest');

      expect(
        getConfigValue({
          defaultValue: 'angular',
          globalValue: 'react',
          workspaceValue: 'vue',
        })
      ).toBe('vue');

      expect(
        getConfigValue({
          defaultValue: 'angular',
        })
      ).toBe('angular');
    });
  });

  describe('getCurrentConfig', () => {
    it('merges VS Code settings with .vscode/icons.json and normalizes activeIconPack "none"', () => {
      const root = createTempDir();
      mkdirSync(join(root, '.vscode'), { recursive: true });
      writeFileSync(
        join(root, '.vscode', 'icons.json'),
        JSON.stringify({
          activeIconPack: 'nest',
          folders: {
            associations: {
              modules: 'nest-module',
            },
          },
        })
      );

      state.workspaceFolders = [{ uri: { scheme: 'file', fsPath: root } }];
      state.inspectedValues.set('activeIconPack', {
        defaultValue: 'angular',
        globalValue: 'react',
        workspaceValue: 'none',
      });
      state.inspectedValues.set('folders.associations', {
        defaultValue: {},
        globalValue: { utils: 'helper', modules: 'global-mod' },
        workspaceValue: { utils: 'utils' },
      });

      const config = getCurrentConfig();

      expect(config.activeIconPack).toBe(IconPack.Nest);
      expect(config.folders.associations).toStrictEqual({
        utils: 'utils',
        modules: 'nest-module',
      });
    });

    it('normalizes activeIconPack "none" in settings.json when no .vscode/icons.json exists', () => {
      state.inspectedValues.set('activeIconPack', {
        defaultValue: 'angular',
        workspaceValue: 'none',
      });

      const config = getCurrentConfig();
      expect(config.activeIconPack).toBe('');
    });

    it('uses active editor workspace folder in multi-root workspaces', () => {
      const folderA = createTempDir();
      const folderB = createTempDir();
      mkdirSync(join(folderA, '.vscode'), { recursive: true });
      mkdirSync(join(folderB, '.vscode'), { recursive: true });
      mkdirSync(join(folderB, 'src'), { recursive: true });

      writeFileSync(
        join(folderA, '.vscode', 'icons.json'),
        JSON.stringify({ activeIconPack: 'react' })
      );
      writeFileSync(
        join(folderB, '.vscode', 'icons.json'),
        JSON.stringify({ activeIconPack: 'nest' })
      );

      state.workspaceFolders = [
        { uri: { scheme: 'file', fsPath: folderA } },
        { uri: { scheme: 'file', fsPath: folderB } },
      ];
      state.activeTextEditor = {
        document: {
          uri: { scheme: 'file', fsPath: join(folderB, 'src', 'main.ts') },
        },
      };

      const config = getCurrentConfig();
      expect(config.activeIconPack).toBe(IconPack.Nest);
    });
  });

  describe('setThemeConfig', () => {
    it('updates workspaceFolder or workspace target when already overridden there', () => {
      const root = createTempDir();
      const folderUri = { scheme: 'file', fsPath: root };
      state.workspaceFolders = [{ uri: folderUri }];

      state.inspectedValues.set('activeIconPack', {
        workspaceFolderValue: 'react',
      });
      setThemeConfig('activeIconPack', 'nest', true);
      expect(state.updateSpy).toHaveBeenLastCalledWith(
        'activeIconPack',
        'nest',
        3
      );

      state.inspectedValues.set('activeIconPack', {
        workspaceValue: 'react',
      });
      setThemeConfig('activeIconPack', 'vue', true);
      expect(state.updateSpy).toHaveBeenLastCalledWith(
        'activeIconPack',
        'vue',
        2
      );

      state.inspectedValues.set('activeIconPack', {
        globalValue: 'angular',
      });
      setThemeConfig('activeIconPack', 'qwik', true);
      expect(state.updateSpy).toHaveBeenLastCalledWith(
        'activeIconPack',
        'qwik',
        true
      );
    });
  });
});
