import { beforeEach, describe, expect, it } from 'bun:test';
import { getDefaultConfig } from '../../generator/config/defaultConfig';
import { loadLanguageIconDefinitions } from '../../generator/languageGenerator';
import type { Config } from '../../models/icons/config';
import { IconPack } from '../../models/icons/iconPack';
import type { LanguageIcon } from '../../models/icons/languages/languageIdentifier';
import { type Manifest, createEmptyManifest } from '../../models/manifest';

describe('language icons', () => {
  let expectedManifest: Manifest;
  let config: Config;

  beforeEach(() => {
    expectedManifest = createEmptyManifest();
    config = getDefaultConfig();
  });

  it('should configure icon definitions', () => {
    const languageIcons: LanguageIcon[] = [
      { name: 'a', ids: ['a'] },
      { name: 'b', ids: ['b'] },
      { name: 'c', ids: ['c', 'd'] },
    ];
    const manifest = createEmptyManifest();
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
      config,
      manifest
    );

    expectedManifest.iconDefinitions = {
      a: {
        iconPath: './../icons/a.svg',
      },
      b: {
        iconPath: './../icons/b.svg',
      },
      c: {
        iconPath: './../icons/c.svg',
      },
    };
    expectedManifest.languageIds = {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'c',
    };
    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });

  it('should disable icon definitions', () => {
    const languageIcons: LanguageIcon[] = [
      { name: 'a', ids: ['a'] },
      { name: 'c', ids: ['c', 'd'], disabled: true },
    ];
    const manifest = createEmptyManifest();
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
      config,
      manifest
    );

    expectedManifest.iconDefinitions = {
      a: {
        iconPath: './../icons/a.svg',
      },
      c: {
        iconPath: './../icons/c.svg',
      },
    };
    expectedManifest.languageIds = {
      a: 'a',
    };
    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });

  it('should disable icon packs', () => {
    const languageIcons: LanguageIcon[] = [
      { name: 'a', ids: ['a'], enabledFor: [IconPack.Angular] },
      { name: 'c', ids: ['c', 'd'], disabled: true },
    ];

    config.activeIconPack = '';
    const manifest = createEmptyManifest();
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
      config,
      manifest
    );

    expectedManifest.iconDefinitions = {
      a: {
        iconPath: './../icons/a.svg',
      },
      c: {
        iconPath: './../icons/c.svg',
      },
    };
    expectedManifest.languageIds = {};
    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });

  it('should configure language icons for light and high contrast', () => {
    const languageIcons: LanguageIcon[] = [
      { name: 'a', light: true, highContrast: true, ids: ['a'] },
      { name: 'b', light: true, highContrast: true, ids: ['b'] },
    ];

    const manifest = createEmptyManifest();
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
      config,
      manifest
    );
    expectedManifest.iconDefinitions = {
      a: {
        iconPath: './../icons/a.svg',
      },
      // biome-ignore lint/style/useNamingConvention:
      a_light: {
        iconPath: './../icons/a_light.svg',
      },
      // biome-ignore lint/style/useNamingConvention:
      a_highContrast: {
        iconPath: './../icons/a_highContrast.svg',
      },
      b: {
        iconPath: './../icons/b.svg',
      },
      // biome-ignore lint/style/useNamingConvention:
      b_light: {
        iconPath: './../icons/b_light.svg',
      },
      // biome-ignore lint/style/useNamingConvention:
      b_highContrast: {
        iconPath: './../icons/b_highContrast.svg',
      },
    };
    expectedManifest.languageIds = {
      a: 'a',
      b: 'b',
    };
    expectedManifest.light = {
      fileExtensions: {},
      fileNames: {},
      languageIds: {
        a: 'a_light',
        b: 'b_light',
      },
    };
    expectedManifest.highContrast = {
      fileExtensions: {},
      fileNames: {},
      languageIds: {
        a: 'a_highContrast',
        b: 'b_highContrast',
      },
    };
    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });

  it('should configure custom icon associations', () => {
    const languageIcons: LanguageIcon[] = [{ name: 'json', ids: ['a'] }];

    const manifest = createEmptyManifest();
    config.languages.associations = {
      xml: 'json',
    };
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
      config,
      manifest
    );

    expectedManifest.iconDefinitions = {
      json: {
        iconPath: './../icons/json.svg',
      },
    };
    expectedManifest.languageIds = {
      a: 'json',
      xml: 'json',
    };

    expect(iconDefinitions).toStrictEqual(expectedManifest);
  });
});
