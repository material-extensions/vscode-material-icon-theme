import { beforeAll, beforeEach, describe, expect, it } from 'bun:test';
import { getDefaultConfig } from '../../generator/config/defaultConfig';
import { loadFolderIconDefinitions } from '../../generator/folderGenerator';
import type { Config } from '../../models/icons/config';
import type { FolderTheme } from '../../models/icons/folders/folderTheme';
import { IconPack } from '../../models/icons/iconPack';
import { type Manifest, createEmptyManifest } from '../../models/manifest';

describe('folder icons', () => {
  let folderIcons: FolderTheme[];
  let expectedManifest: Manifest;
  let config: Config;

  beforeAll(() => {
    folderIcons = [
      {
        name: 'specific',
        defaultIcon: { name: 'folder' },
        rootFolder: { name: 'folder-root' },
        icons: [
          { name: 'folder-src', folderNames: ['src', 'source'] },
          {
            name: 'folder-angular',
            folderNames: ['angular', 'ng'],
            enabledFor: [IconPack.Angular, IconPack.Ngrx],
          },
        ],
      },
      { name: 'classic', defaultIcon: { name: 'folder' } },
      { name: 'none', defaultIcon: { name: '' } },
    ];
  });

  beforeEach(() => {
    config = getDefaultConfig();
    expectedManifest = createEmptyManifest();
  });

  it('should configure icon definitions', () => {
    const manifest = createEmptyManifest();
    const iconDefinitions = loadFolderIconDefinitions(
      folderIcons,
      config,
      manifest
    );

    expectedManifest.iconDefinitions = {
      folder: {
        iconPath: './../icons/folder.svg',
      },
      'folder-open': {
        iconPath: './../icons/folder-open.svg',
      },
      'folder-root': {
        iconPath: './../icons/folder-root.svg',
      },
      'folder-root-open': {
        iconPath: './../icons/folder-root-open.svg',
      },
      'folder-src': {
        iconPath: './../icons/folder-src.svg',
      },
      'folder-src-open': {
        iconPath: './../icons/folder-src-open.svg',
      },
      'folder-angular': {
        iconPath: './../icons/folder-angular.svg',
      },
      'folder-angular-open': {
        iconPath: './../icons/folder-angular-open.svg',
      },
    };
    expectedManifest.folder = 'folder';
    expectedManifest.folderExpanded = 'folder-open';
    expectedManifest.rootFolder = 'folder-root';
    expectedManifest.rootFolderExpanded = 'folder-root-open';
    expectedManifest.folderNames = {
      src: 'folder-src',
      source: 'folder-src',
      angular: 'folder-angular',
      ng: 'folder-angular',
      _src: 'folder-src',
      _source: 'folder-src',
      _angular: 'folder-angular',
      _ng: 'folder-angular',
      __src__: 'folder-src',
      __source__: 'folder-src',
      __angular__: 'folder-angular',
      __ng__: 'folder-angular',
      '.src': 'folder-src',
      '.source': 'folder-src',
      '.angular': 'folder-angular',
      '.ng': 'folder-angular',
    };
    expectedManifest.folderNamesExpanded = {
      src: 'folder-src-open',
      source: 'folder-src-open',
      angular: 'folder-angular-open',
      ng: 'folder-angular-open',
      _src: 'folder-src-open',
      _source: 'folder-src-open',
      _angular: 'folder-angular-open',
      _ng: 'folder-angular-open',
      __src__: 'folder-src-open',
      __source__: 'folder-src-open',
      __angular__: 'folder-angular-open',
      __ng__: 'folder-angular-open',
      '.src': 'folder-src-open',
      '.source': 'folder-src-open',
      '.angular': 'folder-angular-open',
      '.ng': 'folder-angular-open',
    };
    expectedManifest.hidesExplorerArrows = false;

    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });

  it('should deactivate folder icons', () => {
    config.folders.theme = 'none';
    const manifest = createEmptyManifest();
    const iconDefinitions = loadFolderIconDefinitions(
      folderIcons,
      config,
      manifest
    );

    expectedManifest.iconDefinitions = {};
    expectedManifest.folderNames = {};
    expectedManifest.folderNamesExpanded = {};
    expectedManifest.hidesExplorerArrows = false;

    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });

  it('should change folder theme', () => {
    config.folders.theme = 'classic';
    const manifest = createEmptyManifest();
    const iconDefinitions = loadFolderIconDefinitions(
      folderIcons,
      config,
      manifest
    );

    expectedManifest.iconDefinitions = {
      folder: {
        iconPath: './../icons/folder.svg',
      },
      'folder-open': {
        iconPath: './../icons/folder-open.svg',
      },
    };
    expectedManifest.folder = 'folder';
    expectedManifest.folderExpanded = 'folder-open';
    expectedManifest.rootFolder = 'folder';
    expectedManifest.rootFolderExpanded = 'folder-open';
    expectedManifest.folderNames = {};
    expectedManifest.folderNamesExpanded = {};
    expectedManifest.hidesExplorerArrows = false;

    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });

  it('should configure custom icon associations', () => {
    config.folders.associations = {
      sample: 'src',
    };
    const manifest = createEmptyManifest();
    const iconDefinitions = loadFolderIconDefinitions(
      folderIcons,
      config,
      manifest
    );
    expectedManifest.iconDefinitions = {
      folder: {
        iconPath: './../icons/folder.svg',
      },
      'folder-open': {
        iconPath: './../icons/folder-open.svg',
      },
      'folder-root': {
        iconPath: './../icons/folder-root.svg',
      },
      'folder-root-open': {
        iconPath: './../icons/folder-root-open.svg',
      },
      'folder-src': {
        iconPath: './../icons/folder-src.svg',
      },
      'folder-src-open': {
        iconPath: './../icons/folder-src-open.svg',
      },
      'folder-angular': {
        iconPath: './../icons/folder-angular.svg',
      },
      'folder-angular-open': {
        iconPath: './../icons/folder-angular-open.svg',
      },
    };
    expectedManifest.folder = 'folder';
    expectedManifest.folderExpanded = 'folder-open';
    expectedManifest.rootFolder = 'folder-root';
    expectedManifest.rootFolderExpanded = 'folder-root-open';
    expectedManifest.folderNames = {
      src: 'folder-src',
      source: 'folder-src',
      angular: 'folder-angular',
      ng: 'folder-angular',
      sample: 'folder-src',
      _src: 'folder-src',
      _source: 'folder-src',
      _angular: 'folder-angular',
      _ng: 'folder-angular',
      _sample: 'folder-src',
      __src__: 'folder-src',
      __source__: 'folder-src',
      __angular__: 'folder-angular',
      __ng__: 'folder-angular',
      __sample__: 'folder-src',
      '.src': 'folder-src',
      '.source': 'folder-src',
      '.angular': 'folder-angular',
      '.ng': 'folder-angular',
      '.sample': 'folder-src',
    };
    expectedManifest.folderNamesExpanded = {
      src: 'folder-src-open',
      source: 'folder-src-open',
      angular: 'folder-angular-open',
      ng: 'folder-angular-open',
      sample: 'folder-src-open',
      _src: 'folder-src-open',
      _source: 'folder-src-open',
      _angular: 'folder-angular-open',
      _ng: 'folder-angular-open',
      _sample: 'folder-src-open',
      __src__: 'folder-src-open',
      __source__: 'folder-src-open',
      __angular__: 'folder-angular-open',
      __ng__: 'folder-angular-open',
      __sample__: 'folder-src-open',
      '.src': 'folder-src-open',
      '.source': 'folder-src-open',
      '.angular': 'folder-angular-open',
      '.ng': 'folder-angular-open',
      '.sample': 'folder-src-open',
    };
    expectedManifest.hidesExplorerArrows = false;

    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });

  it('should disable icon packs', () => {
    const manifest = createEmptyManifest();
    config.activeIconPack = '';
    const iconDefinitions = loadFolderIconDefinitions(
      folderIcons,
      config,
      manifest
    );
    expectedManifest.iconDefinitions = {
      folder: {
        iconPath: './../icons/folder.svg',
      },
      'folder-angular': {
        iconPath: './../icons/folder-angular.svg',
      },
      'folder-angular-open': {
        iconPath: './../icons/folder-angular-open.svg',
      },
      'folder-open': {
        iconPath: './../icons/folder-open.svg',
      },
      'folder-root': {
        iconPath: './../icons/folder-root.svg',
      },
      'folder-root-open': {
        iconPath: './../icons/folder-root-open.svg',
      },
      'folder-src': {
        iconPath: './../icons/folder-src.svg',
      },
      'folder-src-open': {
        iconPath: './../icons/folder-src-open.svg',
      },
    };
    expectedManifest.folder = 'folder';
    expectedManifest.folderExpanded = 'folder-open';
    expectedManifest.rootFolder = 'folder-root';
    expectedManifest.rootFolderExpanded = 'folder-root-open';
    expectedManifest.folderNames = {
      src: 'folder-src',
      source: 'folder-src',
      _src: 'folder-src',
      _source: 'folder-src',
      __src__: 'folder-src',
      __source__: 'folder-src',
      '.src': 'folder-src',
      '.source': 'folder-src',
    };
    expectedManifest.folderNamesExpanded = {
      src: 'folder-src-open',
      source: 'folder-src-open',
      _src: 'folder-src-open',
      _source: 'folder-src-open',
      __src__: 'folder-src-open',
      __source__: 'folder-src-open',
      '.src': 'folder-src-open',
      '.source': 'folder-src-open',
    };
    expectedManifest.hidesExplorerArrows = false;

    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });

  it('should configure folder icons for light and high contrast', () => {
    const lightHighContrastFolderIcons: FolderTheme[] = [
      {
        name: 'specific',
        defaultIcon: { name: 'folder', light: true, highContrast: true },
        rootFolder: { name: 'folder-root', light: true, highContrast: true },
        icons: [
          {
            name: 'folder-src',
            folderNames: ['src', 'source'],
            light: true,
            highContrast: true,
          },
        ],
      },
    ];
    const manifest = createEmptyManifest();
    const iconDefinitions = loadFolderIconDefinitions(
      lightHighContrastFolderIcons,
      config,
      manifest
    );
    expectedManifest.iconDefinitions = {
      folder: {
        iconPath: './../icons/folder.svg',
      },
      'folder-open': {
        iconPath: './../icons/folder-open.svg',
      },
      // biome-ignore lint/style/useNamingConvention:
      folder_light: {
        iconPath: './../icons/folder_light.svg',
      },
      'folder-open_light': {
        iconPath: './../icons/folder-open_light.svg',
      },
      // biome-ignore lint/style/useNamingConvention:
      folder_highContrast: {
        iconPath: './../icons/folder_highContrast.svg',
      },
      'folder-open_highContrast': {
        iconPath: './../icons/folder-open_highContrast.svg',
      },
      'folder-root': {
        iconPath: './../icons/folder-root.svg',
      },
      'folder-root-open': {
        iconPath: './../icons/folder-root-open.svg',
      },
      'folder-root_light': {
        iconPath: './../icons/folder-root_light.svg',
      },
      'folder-root-open_light': {
        iconPath: './../icons/folder-root-open_light.svg',
      },
      'folder-root_highContrast': {
        iconPath: './../icons/folder-root_highContrast.svg',
      },
      'folder-root-open_highContrast': {
        iconPath: './../icons/folder-root-open_highContrast.svg',
      },
      'folder-src': {
        iconPath: './../icons/folder-src.svg',
      },
      'folder-src-open': {
        iconPath: './../icons/folder-src-open.svg',
      },
      'folder-src_light': {
        iconPath: './../icons/folder-src_light.svg',
      },
      'folder-src-open_light': {
        iconPath: './../icons/folder-src-open_light.svg',
      },
      'folder-src_highContrast': {
        iconPath: './../icons/folder-src_highContrast.svg',
      },
      'folder-src-open_highContrast': {
        iconPath: './../icons/folder-src-open_highContrast.svg',
      },
    };
    expectedManifest.folder = 'folder';
    expectedManifest.folderExpanded = 'folder-open';
    expectedManifest.rootFolder = 'folder-root';
    expectedManifest.rootFolderExpanded = 'folder-root-open';
    expectedManifest.folderNames = {
      src: 'folder-src',
      source: 'folder-src',
      _src: 'folder-src',
      _source: 'folder-src',
      __src__: 'folder-src',
      __source__: 'folder-src',
      '.src': 'folder-src',
      '.source': 'folder-src',
    };
    expectedManifest.folderNamesExpanded = {
      src: 'folder-src-open',
      source: 'folder-src-open',
      _src: 'folder-src-open',
      _source: 'folder-src-open',
      __src__: 'folder-src-open',
      __source__: 'folder-src-open',
      '.src': 'folder-src-open',
      '.source': 'folder-src-open',
    };
    expectedManifest.light = {
      fileExtensions: {},
      fileNames: {},
      folder: 'folder_light',
      folderExpanded: 'folder-open_light',
      rootFolder: 'folder-root_light',
      rootFolderExpanded: 'folder-root-open_light',
      folderNames: {
        src: 'folder-src_light',
        source: 'folder-src_light',
        _src: 'folder-src_light',
        _source: 'folder-src_light',
        __src__: 'folder-src_light',
        __source__: 'folder-src_light',
        '.src': 'folder-src_light',
        '.source': 'folder-src_light',
      },
      folderNamesExpanded: {
        src: 'folder-src-open_light',
        source: 'folder-src-open_light',
        _src: 'folder-src-open_light',
        _source: 'folder-src-open_light',
        __src__: 'folder-src-open_light',
        __source__: 'folder-src-open_light',
        '.src': 'folder-src-open_light',
        '.source': 'folder-src-open_light',
      },
    };
    expectedManifest.highContrast = {
      fileExtensions: {},
      fileNames: {},
      folder: 'folder_highContrast',
      folderExpanded: 'folder-open_highContrast',
      rootFolder: 'folder-root_highContrast',
      rootFolderExpanded: 'folder-root-open_highContrast',
      folderNames: {
        src: 'folder-src_highContrast',
        source: 'folder-src_highContrast',
        _src: 'folder-src_highContrast',
        _source: 'folder-src_highContrast',
        __src__: 'folder-src_highContrast',
        __source__: 'folder-src_highContrast',
        '.src': 'folder-src_highContrast',
        '.source': 'folder-src_highContrast',
      },
      folderNamesExpanded: {
        src: 'folder-src-open_highContrast',
        source: 'folder-src-open_highContrast',
        _src: 'folder-src-open_highContrast',
        _source: 'folder-src-open_highContrast',
        __src__: 'folder-src-open_highContrast',
        __source__: 'folder-src-open_highContrast',
        '.src': 'folder-src-open_highContrast',
        '.source': 'folder-src-open_highContrast',
      },
    };
    expectedManifest.hidesExplorerArrows = false;
    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });

  it('should hide explorer arrows', () => {
    const manifest = createEmptyManifest();
    config.hidesExplorerArrows = true;
    const iconDefinitions = loadFolderIconDefinitions(
      folderIcons,
      config,
      manifest
    );

    expect(iconDefinitions.hidesExplorerArrows).toBe(true);
  });

  it('should generate cloned folder icons config', () => {
    const folderTheme: FolderTheme[] = [
      {
        name: 'specific',
        defaultIcon: { name: 'folder' },
        rootFolder: { name: 'folder-root' },
        icons: [
          { name: 'foo', folderNames: ['foo', 'bar'] },
          {
            name: 'foo-clone',
            folderNames: ['baz', 'qux'],
            light: true,
            clone: {
              base: 'foo',
              color: 'green-500',
              lightColor: 'green-100',
            },
          },
        ],
      },
    ];

    const manifest = createEmptyManifest();
    const iconDefinitions = loadFolderIconDefinitions(
      folderTheme,
      config,
      manifest
    );

    expectedManifest.iconDefinitions = {
      foo: { iconPath: './../icons/foo.svg' },
      'foo-open': { iconPath: './../icons/foo-open.svg' },
      'foo-clone': { iconPath: './../icons/foo-clone.clone.svg' },
      'foo-clone-open': { iconPath: './../icons/foo-clone-open.clone.svg' },
      'foo-clone_light': { iconPath: './../icons/foo-clone_light.clone.svg' },
      'foo-clone-open_light': {
        iconPath: './../icons/foo-clone-open_light.clone.svg',
      },
      'folder-open': { iconPath: './../icons/folder-open.svg' },
      'folder-root': { iconPath: './../icons/folder-root.svg' },
      'folder-root-open': { iconPath: './../icons/folder-root-open.svg' },
      folder: { iconPath: './../icons/folder.svg' },
    };
    expectedManifest.folder = 'folder';
    expectedManifest.folderExpanded = 'folder-open';
    expectedManifest.rootFolder = 'folder-root';
    expectedManifest.rootFolderExpanded = 'folder-root-open';
    expectedManifest.folderNames = {
      foo: 'foo',
      '.foo': 'foo',
      _foo: 'foo',
      __foo__: 'foo',
      bar: 'foo',
      '.bar': 'foo',
      _bar: 'foo',
      __bar__: 'foo',
      baz: 'foo-clone',
      '.baz': 'foo-clone',
      _baz: 'foo-clone',
      __baz__: 'foo-clone',
      qux: 'foo-clone',
      '.qux': 'foo-clone',
      _qux: 'foo-clone',
      __qux__: 'foo-clone',
    };
    expectedManifest.folderNamesExpanded = {
      foo: 'foo-open',
      '.foo': 'foo-open',
      _foo: 'foo-open',
      __foo__: 'foo-open',
      bar: 'foo-open',
      '.bar': 'foo-open',
      _bar: 'foo-open',
      __bar__: 'foo-open',
      baz: 'foo-clone-open',
      '.baz': 'foo-clone-open',
      _baz: 'foo-clone-open',
      __baz__: 'foo-clone-open',
      qux: 'foo-clone-open',
      '.qux': 'foo-clone-open',
      _qux: 'foo-clone-open',
      __qux__: 'foo-clone-open',
    };
    expectedManifest.light = {
      fileExtensions: {},
      fileNames: {},
      folderNames: {
        baz: 'foo-clone_light',
        '.baz': 'foo-clone_light',
        _baz: 'foo-clone_light',
        __baz__: 'foo-clone_light',
        qux: 'foo-clone_light',
        '.qux': 'foo-clone_light',
        _qux: 'foo-clone_light',
        __qux__: 'foo-clone_light',
      },
      folderNamesExpanded: {
        baz: 'foo-clone-open_light',
        '.baz': 'foo-clone-open_light',
        _baz: 'foo-clone-open_light',
        __baz__: 'foo-clone-open_light',
        qux: 'foo-clone-open_light',
        '.qux': 'foo-clone-open_light',
        _qux: 'foo-clone-open_light',
        __qux__: 'foo-clone-open_light',
      },
    };
    expectedManifest.hidesExplorerArrows = false;

    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });

  it('should allow interoperability between cloned and user custom associations', () => {
    const folderTheme: FolderTheme[] = [
      {
        name: 'specific',
        defaultIcon: { name: 'folder' },
        rootFolder: { name: 'folder-root' },
        icons: [
          { name: 'folder-foo', folderNames: ['foo'] },
          {
            name: 'folder-bar',
            folderNames: ['bar'],
            clone: {
              base: 'foo',
              color: 'green-500',
            },
          },
        ],
      },
    ];

    config.folders.associations = {
      baz: 'bar', // assigned to the clone
    };

    const manifest = createEmptyManifest();
    const iconDefinitions = loadFolderIconDefinitions(
      folderTheme,
      config,
      manifest
    );

    expectedManifest.iconDefinitions = {
      'folder-foo': { iconPath: './../icons/folder-foo.svg' },
      'folder-foo-open': { iconPath: './../icons/folder-foo-open.svg' },
      'folder-bar': { iconPath: './../icons/folder-bar.clone.svg' },
      'folder-bar-open': { iconPath: './../icons/folder-bar-open.clone.svg' },
      folder: { iconPath: './../icons/folder.svg' },
      'folder-open': { iconPath: './../icons/folder-open.svg' },
      'folder-root': { iconPath: './../icons/folder-root.svg' },
      'folder-root-open': { iconPath: './../icons/folder-root-open.svg' },
    };
    expectedManifest.folder = 'folder';
    expectedManifest.folderExpanded = 'folder-open';
    expectedManifest.rootFolder = 'folder-root';
    expectedManifest.rootFolderExpanded = 'folder-root-open';
    expectedManifest.folderNames = {
      '.bar': 'folder-bar',
      '.baz': 'folder-bar',
      '.foo': 'folder-foo',
      __bar__: 'folder-bar',
      __baz__: 'folder-bar',
      __foo__: 'folder-foo',
      _bar: 'folder-bar',
      _baz: 'folder-bar',
      _foo: 'folder-foo',
      bar: 'folder-bar',
      baz: 'folder-bar',
      foo: 'folder-foo',
    };
    expectedManifest.folderNamesExpanded = {
      '.bar': 'folder-bar-open',
      '.baz': 'folder-bar-open',
      '.foo': 'folder-foo-open',
      __bar__: 'folder-bar-open',
      __baz__: 'folder-bar-open',
      __foo__: 'folder-foo-open',
      _bar: 'folder-bar-open',
      _baz: 'folder-bar-open',
      _foo: 'folder-foo-open',
      bar: 'folder-bar-open',
      baz: 'folder-bar-open',
      foo: 'folder-foo-open',
    };

    expectedManifest.light = {
      fileExtensions: {},
      fileNames: {},
    };
    expectedManifest.hidesExplorerArrows = false;

    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });
});
