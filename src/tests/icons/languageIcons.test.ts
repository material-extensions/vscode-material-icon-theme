import { beforeEach, describe, expect, it } from 'bun:test';
import { loadLanguageIconDefinitions } from '../../icons';
import { IconPack, type LanguageIcon, Manifest } from '../../models';

describe('language icons', () => {
  let expectedManifest: Manifest;

  beforeEach(() => {
    expectedManifest = new Manifest();
  });

  it('should configure icon definitions', () => {
    const languageIcons: LanguageIcon[] = [
      { icon: { name: 'a' }, ids: ['a'] },
      { icon: { name: 'b' }, ids: ['b'] },
      { icon: { name: 'c' }, ids: ['c', 'd'] },
    ];
    const manifest = new Manifest();
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
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
    expect(iconDefinitions).toMatchObject(expectedManifest);
  });

  it('should disable icon definitions', () => {
    const languageIcons: LanguageIcon[] = [
      { icon: { name: 'a' }, ids: ['a'] },
      { icon: { name: 'c' }, ids: ['c', 'd'], disabled: true },
    ];
    const manifest = new Manifest();
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
      manifest
    );

    expectedManifest.iconDefinitions = {
      a: {
        iconPath: './../icons/a.svg',
      },
    };
    expectedManifest.languageIds = {
      a: 'a',
    };
    expect(iconDefinitions).toMatchObject(expectedManifest);
  });

  it('should disable icon packs', () => {
    const languageIcons: LanguageIcon[] = [
      { icon: { name: 'a' }, ids: ['a'], enabledFor: [IconPack.Angular] },
      { icon: { name: 'c' }, ids: ['c', 'd'], disabled: true },
    ];

    const manifest = new Manifest({
      activeIconPack: '',
    });
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
      manifest
    );

    expectedManifest.config.activeIconPack = '';
    expectedManifest.iconDefinitions = {};
    expectedManifest.languageIds = {};
    expect(iconDefinitions).toMatchObject(expectedManifest);
  });

  it('should configure language icons for light and high contrast', () => {
    const languageIcons: LanguageIcon[] = [
      { icon: { name: 'a', light: true, highContrast: true }, ids: ['a'] },
      { icon: { name: 'b', light: true, highContrast: true }, ids: ['b'] },
    ];

    const manifest = new Manifest();
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
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
    expect(iconDefinitions).toMatchObject(expectedManifest);
  });

  it('should configure custom icon associations', () => {
    const languageIcons: LanguageIcon[] = [
      { icon: { name: 'json' }, ids: ['a'] },
    ];

    const manifest = new Manifest({
      languages: {
        associations: {
          xml: 'json',
        },
      },
    });
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
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
    expectedManifest.config!.languages!.associations = {
      xml: 'json',
    };
    expect(iconDefinitions).toMatchObject(expectedManifest);
  });
});
