import { beforeEach, describe, expect, it } from 'bun:test';
import { getDefaultConfig } from '../../generator/config/defaultConfig';
import { loadFileIconDefinitions } from '../../generator/fileGenerator';
import type { Config } from '../../models/icons/config';
import type { FileIcons } from '../../models/icons/files/fileTypes';
import { IconPack } from '../../models/icons/iconPack';
import { type Manifest, createEmptyManifest } from '../../models/manifest';

describe('file icons', () => {
  let expectedManifest: Manifest;
  let config: Config;

  beforeEach(() => {
    config = getDefaultConfig();
    expectedManifest = createEmptyManifest();
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

    const manifest = createEmptyManifest();
    const iconDefinitions = loadFileIconDefinitions(
      fileIcons,
      config,
      manifest
    );

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

    expect(iconDefinitions).toStrictEqual(expectedManifest);
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

    const manifest = createEmptyManifest();
    config.activeIconPack = '';
    const iconDefinitions = loadFileIconDefinitions(
      fileIcons,
      config,
      manifest
    );

    expectedManifest.iconDefinitions = {
      angular: {
        iconPath: './../icons/angular.svg',
      },
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

    expect(iconDefinitions).toStrictEqual(expectedManifest);
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
    const config = getDefaultConfig();
    config.files.associations = {
      '*.sample.ts': 'angular',
      'sample.js': 'javascript',
    };
    const manifest = createEmptyManifest();
    const iconDefinitions = loadFileIconDefinitions(
      fileIcons,
      config,
      manifest
    );

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

    config.files.associations = {
      '*.sample.ts': 'angular',
      'sample.js': 'javascript',
    };

    expect(iconDefinitions).toStrictEqual(expectedManifest);
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

    const manifest = createEmptyManifest();
    const iconDefinitions = loadFileIconDefinitions(
      fileIcons,
      config,
      manifest
    );
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

    expect(iconDefinitions).toStrictEqual(expectedManifest);
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

    const manifest = createEmptyManifest();
    const iconDefinitions = loadFileIconDefinitions(
      fileIcons,
      config,
      manifest
    );

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

    expect(iconDefinitions).toStrictEqual(expectedManifest);
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
          light: true,
          clone: {
            base: 'foo',
            color: 'green-500',
            lightColor: 'green-100',
          },
        },
      ],
    };

    config.files.associations = {
      '*.baz': 'bar', // assigned to the clone
    };

    const manifest = createEmptyManifest();
    const iconDefinitions = loadFileIconDefinitions(
      fileIcons,
      config,
      manifest
    );

    expectedManifest.iconDefinitions = {
      foo: {
        iconPath: './../icons/foo.svg',
      },
      bar: {
        iconPath: './../icons/bar.clone.svg',
      },
      // biome-ignore lint/style/useNamingConvention: _light is our naming convention for icons in light color themes
      bar_light: {
        iconPath: './../icons/bar_light.clone.svg',
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
    expectedManifest.light = {
      fileExtensions: {
        bar: 'bar_light',
      },
      fileNames: {},
    };
    expectedManifest.file = 'file';

    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });
});
