import { deepStrictEqual } from 'assert';
import merge from 'lodash.merge';
import {
  getDefaultIconOptions,
  loadFileIconDefinitions,
} from '../../../icons/index';
import { FileIcons, IconConfiguration, IconPack } from '../../../models/index';

describe('file icons', () => {
  let expectedConfig: IconConfiguration;

  beforeEach(() => {
    expectedConfig = merge({}, new IconConfiguration(), {
      options: getDefaultIconOptions(),
    });
  });

  it('should configure icon definitions', () => {
    const fileIcons: FileIcons = {
      defaultIcon: { name: 'file' },
      icons: [
        {
          name: 'angular',
          fileNames: ['.angular-cli.json', 'angular-cli.json'],
          enabledFor: [IconPack.Angular, IconPack.Ngrx],
        },
        {
          name: 'javascript',
          fileNames: ['filename.js'],
          fileExtensions: ['js'],
        },
      ],
    };
    const options = getDefaultIconOptions();
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFileIconDefinitions(
      fileIcons,
      iconConfig,
      options
    );

    expectedConfig.iconDefinitions = {
      angular: {
        iconPath: './../icons/angular.svg',
      },
      javascript: {
        iconPath: './../icons/javascript.svg',
      },
      file: {
        iconPath: './../icons/file.svg',
      },
    };
    expectedConfig.file = 'file';
    expectedConfig.fileExtensions = {
      js: 'javascript',
    };
    expectedConfig.fileNames = {
      '.angular-cli.json': 'angular',
      'angular-cli.json': 'angular',
      'filename.js': 'javascript',
    };

    deepStrictEqual(iconDefinitions, expectedConfig);
  });

  it('should disable icon packs', () => {
    const fileIcons: FileIcons = {
      defaultIcon: { name: 'file' },
      icons: [
        {
          name: 'angular',
          fileNames: ['.angular-cli.json', 'angular-cli.json'],
          enabledFor: [IconPack.Ngrx],
        },
        {
          name: 'javascript',
          fileNames: ['filename.js'],
          fileExtensions: ['js'],
        },
      ],
    };

    const options = getDefaultIconOptions();
    options.activeIconPack = '';
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFileIconDefinitions(
      fileIcons,
      iconConfig,
      options
    );

    expectedConfig.iconDefinitions = {
      file: {
        iconPath: './../icons/file.svg',
      },
      javascript: {
        iconPath: './../icons/javascript.svg',
      },
    };
    expectedConfig.file = 'file';
    expectedConfig.fileExtensions = {
      js: 'javascript',
    };
    expectedConfig.fileNames = {
      'filename.js': 'javascript',
    };

    // disable default icon pack by using empty string
    expectedConfig.options!.activeIconPack = '';

    deepStrictEqual(iconDefinitions, expectedConfig);
  });

  it('should configure custom icon associations', () => {
    const fileIcons: FileIcons = {
      defaultIcon: { name: 'file' },
      icons: [
        {
          name: 'angular',
          fileNames: ['.angular-cli.json', 'angular-cli.json'],
        },
        {
          name: 'javascript',
          fileNames: ['filename.js'],
          fileExtensions: ['js'],
        },
      ],
    };
    const options = getDefaultIconOptions();
    options.files.associations = {
      '*.sample.ts': 'angular',
      'sample.js': 'javascript',
    };
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFileIconDefinitions(
      fileIcons,
      iconConfig,
      options
    );

    expectedConfig.iconDefinitions = {
      file: {
        iconPath: './../icons/file.svg',
      },
      javascript: {
        iconPath: './../icons/javascript.svg',
      },
      angular: {
        iconPath: './../icons/angular.svg',
      },
    };
    expectedConfig.file = 'file';
    expectedConfig.fileExtensions = {
      js: 'javascript',
      'sample.ts': 'angular',
    };
    expectedConfig.fileNames = {
      '.angular-cli.json': 'angular',
      'angular-cli.json': 'angular',
      'sample.js': 'javascript',
      'filename.js': 'javascript',
    };
    expectedConfig.options!.files!.associations = {
      '*.sample.ts': 'angular',
      'sample.js': 'javascript',
    };

    deepStrictEqual(iconDefinitions, expectedConfig);
  });

  it('should configure language icons for light and high contrast', () => {
    const fileIcons: FileIcons = {
      defaultIcon: { name: 'file', light: true, highContrast: true },
      icons: [
        {
          name: 'angular',
          fileNames: ['.angular-cli.json', 'angular-cli.json'],
          enabledFor: [IconPack.Angular, IconPack.Ngrx],
        },
        {
          name: 'javascript',
          fileNames: ['filename.js'],
          fileExtensions: ['js'],
          light: true,
          highContrast: true,
        },
      ],
    };
    const options = getDefaultIconOptions();
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFileIconDefinitions(
      fileIcons,
      iconConfig,
      options
    );
    /* eslint-disable camelcase */
    expectedConfig.iconDefinitions = {
      file: {
        iconPath: './../icons/file.svg',
      },
      file_light: {
        iconPath: './../icons/file_light.svg',
      },
      file_highContrast: {
        iconPath: './../icons/file_highContrast.svg',
      },
      javascript: {
        iconPath: './../icons/javascript.svg',
      },
      javascript_light: {
        iconPath: './../icons/javascript_light.svg',
      },
      javascript_highContrast: {
        iconPath: './../icons/javascript_highContrast.svg',
      },
      angular: {
        iconPath: './../icons/angular.svg',
      },
    };
    expectedConfig.file = 'file';
    expectedConfig.fileExtensions = {
      js: 'javascript',
    };
    expectedConfig.light = {
      file: 'file_light',
      fileExtensions: {
        js: 'javascript_light',
      },
      fileNames: {
        'filename.js': 'javascript_light',
      },
    };
    expectedConfig.highContrast = {
      file: 'file_highContrast',
      fileExtensions: {
        js: 'javascript_highContrast',
      },
      fileNames: {
        'filename.js': 'javascript_highContrast',
      },
    };
    expectedConfig.fileNames = {
      '.angular-cli.json': 'angular',
      'angular-cli.json': 'angular',
      'filename.js': 'javascript',
    };
    /* eslint-enable camelcase */
    deepStrictEqual(iconDefinitions, expectedConfig);
  });
});
