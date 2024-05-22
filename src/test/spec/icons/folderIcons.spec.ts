import { deepStrictEqual } from 'assert';
import merge from 'lodash.merge';
import {
  getDefaultIconOptions,
  loadFolderIconDefinitions,
} from '../../../icons/index';
import {
  FolderTheme,
  IconConfiguration,
  IconPack,
} from '../../../models/index';

describe('folder icons', () => {
  let folderIcons: FolderTheme[];
  let expectedConfig: IconConfiguration;

  before(() => {
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
      {
        name: 'blue',
        defaultIcon: { name: 'folder-blue' },
        icons: [{ name: 'folder-blue-src', folderNames: ['src', 'source'] }],
      },
      { name: 'classic', defaultIcon: { name: 'folder' } },
      { name: 'none', defaultIcon: { name: '' } },
    ];
  });

  beforeEach(() => {
    expectedConfig = merge({}, new IconConfiguration(), {
      options: getDefaultIconOptions(),
    });
  });

  it('should configure icon definitions', () => {
    const options = getDefaultIconOptions();
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFolderIconDefinitions(
      folderIcons,
      iconConfig,
      options
    );

    expectedConfig.iconDefinitions = {
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
    expectedConfig.folder = 'folder';
    expectedConfig.folderExpanded = 'folder-open';
    expectedConfig.rootFolder = 'folder-root';
    expectedConfig.rootFolderExpanded = 'folder-root-open';
    expectedConfig.folderNames = {
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
    expectedConfig.folderNamesExpanded = {
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
    expectedConfig.hidesExplorerArrows = false;

    deepStrictEqual(iconDefinitions, expectedConfig);
  });

  it('should deactivate folder icons', () => {
    const options = getDefaultIconOptions();
    options.folders.theme = 'none';
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFolderIconDefinitions(
      folderIcons,
      iconConfig,
      options
    );

    expectedConfig.iconDefinitions = {};
    expectedConfig.folderNames = {};
    expectedConfig.folderNamesExpanded = {};
    expectedConfig.hidesExplorerArrows = false;
    expectedConfig.options!.folders!.theme = 'none';

    deepStrictEqual(iconDefinitions, expectedConfig);
  });

  it('should enable folder theme', () => {
    const options = getDefaultIconOptions();
    options.folders.theme = 'blue';
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFolderIconDefinitions(
      folderIcons,
      iconConfig,
      options
    );

    expectedConfig.iconDefinitions = {
      'folder-blue': {
        iconPath: './../icons/folder-blue.svg',
      },
      'folder-blue-open': {
        iconPath: './../icons/folder-blue-open.svg',
      },
      'folder-blue-src': {
        iconPath: './../icons/folder-blue-src.svg',
      },
      'folder-blue-src-open': {
        iconPath: './../icons/folder-blue-src-open.svg',
      },
    };
    expectedConfig.folder = 'folder-blue';
    expectedConfig.folderExpanded = 'folder-blue-open';
    expectedConfig.rootFolder = 'folder-blue';
    expectedConfig.rootFolderExpanded = 'folder-blue-open';
    expectedConfig.folderNames = {
      src: 'folder-blue-src',
      source: 'folder-blue-src',
      _src: 'folder-blue-src',
      _source: 'folder-blue-src',
      __src__: 'folder-blue-src',
      __source__: 'folder-blue-src',
      '.src': 'folder-blue-src',
      '.source': 'folder-blue-src',
    };
    expectedConfig.folderNamesExpanded = {
      src: 'folder-blue-src-open',
      source: 'folder-blue-src-open',
      _src: 'folder-blue-src-open',
      _source: 'folder-blue-src-open',
      __src__: 'folder-blue-src-open',
      __source__: 'folder-blue-src-open',
      '.src': 'folder-blue-src-open',
      '.source': 'folder-blue-src-open',
    };
    expectedConfig.hidesExplorerArrows = false;
    expectedConfig.options!.folders!.theme = 'blue';

    deepStrictEqual(iconDefinitions, expectedConfig);
  });

  it('should configure custom icon associations', () => {
    const options = getDefaultIconOptions();
    options.folders.associations = {
      sample: 'src',
    };
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFolderIconDefinitions(
      folderIcons,
      iconConfig,
      options
    );
    expectedConfig.iconDefinitions = {
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
    expectedConfig.folder = 'folder';
    expectedConfig.folderExpanded = 'folder-open';
    expectedConfig.rootFolder = 'folder-root';
    expectedConfig.rootFolderExpanded = 'folder-root-open';
    expectedConfig.folderNames = {
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
    expectedConfig.folderNamesExpanded = {
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
    expectedConfig.hidesExplorerArrows = false;
    expectedConfig.options!.folders!.associations = {
      sample: 'src',
    };

    deepStrictEqual(iconDefinitions, expectedConfig);
  });

  it('should disable icon packs', () => {
    const options = getDefaultIconOptions();
    options.activeIconPack = '';
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFolderIconDefinitions(
      folderIcons,
      iconConfig,
      options
    );
    expectedConfig.iconDefinitions = {
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
    };
    expectedConfig.folder = 'folder';
    expectedConfig.folderExpanded = 'folder-open';
    expectedConfig.rootFolder = 'folder-root';
    expectedConfig.rootFolderExpanded = 'folder-root-open';
    expectedConfig.folderNames = {
      src: 'folder-src',
      source: 'folder-src',
      _src: 'folder-src',
      _source: 'folder-src',
      __src__: 'folder-src',
      __source__: 'folder-src',
      '.src': 'folder-src',
      '.source': 'folder-src',
    };
    expectedConfig.folderNamesExpanded = {
      src: 'folder-src-open',
      source: 'folder-src-open',
      _src: 'folder-src-open',
      _source: 'folder-src-open',
      __src__: 'folder-src-open',
      __source__: 'folder-src-open',
      '.src': 'folder-src-open',
      '.source': 'folder-src-open',
    };
    expectedConfig.hidesExplorerArrows = false;

    // disable default icon pack by using empty string
    expectedConfig.options!.activeIconPack = '';

    deepStrictEqual(iconDefinitions, expectedConfig);
  });

  it('should configure folder icons for light and high contrast', () => {
    const options = getDefaultIconOptions();
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
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFolderIconDefinitions(
      lightHighContrastFolderIcons,
      iconConfig,
      options
    );
    /* eslint-disable camelcase */
    expectedConfig.iconDefinitions = {
      folder: {
        iconPath: './../icons/folder.svg',
      },
      'folder-open': {
        iconPath: './../icons/folder-open.svg',
      },
      folder_light: {
        iconPath: './../icons/folder_light.svg',
      },
      'folder-open_light': {
        iconPath: './../icons/folder-open_light.svg',
      },
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
    expectedConfig.folder = 'folder';
    expectedConfig.folderExpanded = 'folder-open';
    expectedConfig.rootFolder = 'folder-root';
    expectedConfig.rootFolderExpanded = 'folder-root-open';
    expectedConfig.folderNames = {
      src: 'folder-src',
      source: 'folder-src',
      _src: 'folder-src',
      _source: 'folder-src',
      __src__: 'folder-src',
      __source__: 'folder-src',
      '.src': 'folder-src',
      '.source': 'folder-src',
    };
    expectedConfig.folderNamesExpanded = {
      src: 'folder-src-open',
      source: 'folder-src-open',
      _src: 'folder-src-open',
      _source: 'folder-src-open',
      __src__: 'folder-src-open',
      __source__: 'folder-src-open',
      '.src': 'folder-src-open',
      '.source': 'folder-src-open',
    };
    expectedConfig.light = {
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
    expectedConfig.highContrast = {
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
    expectedConfig.hidesExplorerArrows = false;
    /* eslint-enable camelcase */
    deepStrictEqual(iconDefinitions, expectedConfig);
  });

  it('should hide explorer arrows', () => {
    const options = getDefaultIconOptions();
    options.hidesExplorerArrows = true;
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFolderIconDefinitions(
      folderIcons,
      iconConfig,
      options
    );

    deepStrictEqual(iconDefinitions.hidesExplorerArrows, true);
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

    const options = getDefaultIconOptions();
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFolderIconDefinitions(
      folderTheme,
      iconConfig,
      options
    );

    expectedConfig.iconDefinitions = {
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
    expectedConfig.folder = 'folder';
    expectedConfig.folderExpanded = 'folder-open';
    expectedConfig.rootFolder = 'folder-root';
    expectedConfig.rootFolderExpanded = 'folder-root-open';
    expectedConfig.folderNames = {
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
    expectedConfig.folderNamesExpanded = {
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
    expectedConfig.light = {
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
    expectedConfig.hidesExplorerArrows = false;

    deepStrictEqual(iconDefinitions, expectedConfig);
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

    const options = getDefaultIconOptions();
    options.folders.associations = {
      baz: 'bar', // assigned to the clone
    };

    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFolderIconDefinitions(
      folderTheme,
      iconConfig,
      options
    );

    expectedConfig.options = options;
    expectedConfig.iconDefinitions = {
      'folder-foo': { iconPath: './../icons/folder-foo.svg' },
      'folder-foo-open': { iconPath: './../icons/folder-foo-open.svg' },
      'folder-bar': { iconPath: './../icons/folder-bar.clone.svg' },
      'folder-bar-open': { iconPath: './../icons/folder-bar-open.clone.svg' },
      folder: { iconPath: './../icons/folder.svg' },
      'folder-open': { iconPath: './../icons/folder-open.svg' },
      'folder-root': { iconPath: './../icons/folder-root.svg' },
      'folder-root-open': { iconPath: './../icons/folder-root-open.svg' },
    };
    expectedConfig.folder = 'folder';
    expectedConfig.folderExpanded = 'folder-open';
    expectedConfig.rootFolder = 'folder-root';
    expectedConfig.rootFolderExpanded = 'folder-root-open';
    expectedConfig.folderNames = {
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
    expectedConfig.folderNamesExpanded = {
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

    expectedConfig.light = {
      fileExtensions: {},
      fileNames: {},
    };
    expectedConfig.hidesExplorerArrows = false;

    deepStrictEqual(iconDefinitions, expectedConfig);
  });
});
