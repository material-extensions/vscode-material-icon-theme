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
    };
    expectedConfig.folderNamesExpanded = {
      src: 'folder-src-open',
      source: 'folder-src-open',
      angular: 'folder-angular-open',
      ng: 'folder-angular-open',
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
    };
    expectedConfig.folderNamesExpanded = {
      src: 'folder-blue-src-open',
      source: 'folder-blue-src-open',
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
    };
    expectedConfig.folderNamesExpanded = {
      src: 'folder-src-open',
      source: 'folder-src-open',
      angular: 'folder-angular-open',
      ng: 'folder-angular-open',
      sample: 'folder-src-open',
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
    };
    expectedConfig.folderNamesExpanded = {
      src: 'folder-src-open',
      source: 'folder-src-open',
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
    };
    expectedConfig.folderNamesExpanded = {
      src: 'folder-src-open',
      source: 'folder-src-open',
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
      },
      folderNamesExpanded: {
        src: 'folder-src-open_light',
        source: 'folder-src-open_light',
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
      },
      folderNamesExpanded: {
        src: 'folder-src-open_highContrast',
        source: 'folder-src-open_highContrast',
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
});
