import { beforeEach, describe, expect, it } from 'bun:test';
import merge from 'lodash.merge';
import { getDefaultIconOptions, loadFileIconDefinitions } from '../../icons';
import { type FileIcons, IconConfiguration, IconPack } from '../../models';

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

    expect(iconDefinitions).toStrictEqual(expectedConfig);
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

    expect(iconDefinitions).toStrictEqual(expectedConfig);
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

    expect(iconDefinitions).toStrictEqual(expectedConfig);
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
    expectedConfig.iconDefinitions = {
      file: {
        iconPath: './../icons/file.svg',
      },
      // biome-ignore lint/style/useNamingConvention:
      file_light: {
        iconPath: './../icons/file_light.svg',
      },
      // biome-ignore lint/style/useNamingConvention:
      file_highContrast: {
        iconPath: './../icons/file_highContrast.svg',
      },
      javascript: {
        iconPath: './../icons/javascript.svg',
      },
      // biome-ignore lint/style/useNamingConvention:
      javascript_light: {
        iconPath: './../icons/javascript_light.svg',
      },
      // biome-ignore lint/style/useNamingConvention:
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

    expect(iconDefinitions).toStrictEqual(expectedConfig);
  });

  it('should generate cloned file icons config', () => {
    const fileIcons: FileIcons = {
      defaultIcon: { name: 'file' },
      icons: [
        {
          name: 'foo',
          fileNames: ['foo.bar'],
        },
        {
          name: 'foo-clone',
          fileNames: ['bar.foo'],
          fileExtensions: ['baz'],
          light: true,
          clone: {
            base: 'foo',
            color: 'green-500',
            lightColor: 'green-100',
          },
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
      foo: {
        iconPath: './../icons/foo.svg',
      },
      'foo-clone': {
        iconPath: './../icons/foo-clone.clone.svg',
      },
      'foo-clone_light': {
        iconPath: './../icons/foo-clone_light.clone.svg',
      },
      file: {
        iconPath: './../icons/file.svg',
      },
    };
    expectedConfig.light = {
      fileExtensions: {
        baz: 'foo-clone_light',
      },
      fileNames: {
        'bar.foo': 'foo-clone_light',
      },
    };
    expectedConfig.fileNames = {
      'foo.bar': 'foo',
      'bar.foo': 'foo-clone',
    };
    expectedConfig.fileExtensions = {
      baz: 'foo-clone',
    };
    expectedConfig.file = 'file';

    expect(iconDefinitions).toStrictEqual(expectedConfig);
  });

  it('should allow interoperability between cloned and user custom associations', () => {
    const fileIcons: FileIcons = {
      defaultIcon: { name: 'file' },
      icons: [
        {
          name: 'foo',
          fileExtensions: ['foo'],
        },
        {
          name: 'bar',
          fileExtensions: ['bar'],
          clone: {
            base: 'foo',
            color: 'green-500',
            lightColor: 'green-100',
          },
        },
      ],
    };

    const options = getDefaultIconOptions();
    options.files.associations = {
      '*.baz': 'bar', // assigned to the clone
    };

    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadFileIconDefinitions(
      fileIcons,
      iconConfig,
      options
    );

    expectedConfig.options = options;
    expectedConfig.iconDefinitions = {
      foo: {
        iconPath: './../icons/foo.svg',
      },
      bar: {
        iconPath: './../icons/bar.clone.svg',
      },
      file: {
        iconPath: './../icons/file.svg',
      },
    };
    expectedConfig.fileNames = {};
    expectedConfig.fileExtensions = {
      foo: 'foo',
      bar: 'bar',
      baz: 'bar',
    };
    expectedConfig.file = 'file';

    expect(iconDefinitions).toStrictEqual(expectedConfig);
  });
});
