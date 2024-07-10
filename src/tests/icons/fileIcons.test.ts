import { beforeEach, describe, expect, it } from 'bun:test';
import { loadFileIconDefinitions } from '../../icons';
import { getDefaultConfiguration } from '../../icons/generator/config/defaultConfig';
import { type FileIcons, IconPack, Manifest } from '../../models';

describe('file icons', () => {
  let expectedManifest: Manifest;

  beforeEach(() => {
    expectedManifest = new Manifest();
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

    const manifest = new Manifest();
    const iconDefinitions = loadFileIconDefinitions(fileIcons, manifest);

    expectedManifest.iconDefinitions = {
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
    expectedManifest.file = 'file';
    expectedManifest.fileExtensions = {
      js: 'javascript',
    };
    expectedManifest.fileNames = {
      '.angular-cli.json': 'angular',
      'angular-cli.json': 'angular',
      'filename.js': 'javascript',
    };

    expect(iconDefinitions).toMatchObject(expectedManifest);
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

    const manifest = new Manifest({ activeIconPack: '' });
    const iconDefinitions = loadFileIconDefinitions(fileIcons, manifest);

    expectedManifest.iconDefinitions = {
      file: {
        iconPath: './../icons/file.svg',
      },
      javascript: {
        iconPath: './../icons/javascript.svg',
      },
    };
    expectedManifest.file = 'file';
    expectedManifest.fileExtensions = {
      js: 'javascript',
    };
    expectedManifest.fileNames = {
      'filename.js': 'javascript',
    };

    // disable default icon pack by using empty string
    expectedManifest.config.activeIconPack = '';

    expect(iconDefinitions).toMatchObject(expectedManifest);
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
    const config = getDefaultConfiguration();
    config.files.associations = {
      '*.sample.ts': 'angular',
      'sample.js': 'javascript',
    };
    const manifest = new Manifest(config);
    const iconDefinitions = loadFileIconDefinitions(fileIcons, manifest);

    expectedManifest.iconDefinitions = {
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
    expectedManifest.file = 'file';
    expectedManifest.fileExtensions = {
      js: 'javascript',
      'sample.ts': 'angular',
    };
    expectedManifest.fileNames = {
      '.angular-cli.json': 'angular',
      'angular-cli.json': 'angular',
      'sample.js': 'javascript',
      'filename.js': 'javascript',
    };
    expectedManifest.config!.files!.associations = {
      '*.sample.ts': 'angular',
      'sample.js': 'javascript',
    };

    expect(iconDefinitions).toMatchObject(expectedManifest);
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

    const manifest = new Manifest();
    const iconDefinitions = loadFileIconDefinitions(fileIcons, manifest);
    expectedManifest.iconDefinitions = {
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
    expectedManifest.file = 'file';
    expectedManifest.fileExtensions = {
      js: 'javascript',
    };
    expectedManifest.light = {
      file: 'file_light',
      fileExtensions: {
        js: 'javascript_light',
      },
      fileNames: {
        'filename.js': 'javascript_light',
      },
    };
    expectedManifest.highContrast = {
      file: 'file_highContrast',
      fileExtensions: {
        js: 'javascript_highContrast',
      },
      fileNames: {
        'filename.js': 'javascript_highContrast',
      },
    };
    expectedManifest.fileNames = {
      '.angular-cli.json': 'angular',
      'angular-cli.json': 'angular',
      'filename.js': 'javascript',
    };

    expect(iconDefinitions).toMatchObject(expectedManifest);
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

    const manifest = new Manifest();
    const iconDefinitions = loadFileIconDefinitions(fileIcons, manifest);

    expectedManifest.iconDefinitions = {
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
    expectedManifest.light = {
      fileExtensions: {
        baz: 'foo-clone_light',
      },
      fileNames: {
        'bar.foo': 'foo-clone_light',
      },
    };
    expectedManifest.fileNames = {
      'foo.bar': 'foo',
      'bar.foo': 'foo-clone',
    };
    expectedManifest.fileExtensions = {
      baz: 'foo-clone',
    };
    expectedManifest.file = 'file';

    expect(iconDefinitions).toMatchObject(expectedManifest);
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

    const config = getDefaultConfiguration();
    config.files.associations = {
      '*.baz': 'bar', // assigned to the clone
    };

    const manifest = new Manifest(config);
    const iconDefinitions = loadFileIconDefinitions(fileIcons, manifest);

    expectedManifest.config = config;
    expectedManifest.iconDefinitions = {
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
    expectedManifest.fileNames = {};
    expectedManifest.fileExtensions = {
      foo: 'foo',
      bar: 'bar',
      baz: 'bar',
    };
    expectedManifest.file = 'file';

    expect(iconDefinitions).toMatchObject(expectedManifest);
  });
});
