import { beforeEach, describe, expect, it } from 'bun:test';
import merge from 'lodash.merge';
import {
  getDefaultIconOptions,
  loadLanguageIconDefinitions,
} from '../../icons';
import { IconConfiguration, IconPack, type LanguageIcon } from '../../models';

describe('language icons', () => {
  let expectedConfig: IconConfiguration;

  beforeEach(() => {
    expectedConfig = merge({}, new IconConfiguration(), {
      options: getDefaultIconOptions(),
    });
  });

  it('should configure icon definitions', () => {
    const languageIcons: LanguageIcon[] = [
      { icon: { name: 'a' }, ids: ['a'] },
      { icon: { name: 'b' }, ids: ['b'] },
      { icon: { name: 'c' }, ids: ['c', 'd'] },
    ];
    const options = getDefaultIconOptions();
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
      iconConfig,
      options
    );

    expectedConfig.iconDefinitions = {
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
    expectedConfig.languageIds = {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'c',
    };
    expect(iconDefinitions).toStrictEqual(expectedConfig);
  });

  it('should disable icon definitions', () => {
    const languageIcons: LanguageIcon[] = [
      { icon: { name: 'a' }, ids: ['a'] },
      { icon: { name: 'c' }, ids: ['c', 'd'], disabled: true },
    ];
    const options = getDefaultIconOptions();
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
      iconConfig,
      options
    );

    expectedConfig.iconDefinitions = {
      a: {
        iconPath: './../icons/a.svg',
      },
    };
    expectedConfig.languageIds = {
      a: 'a',
    };
    expect(iconDefinitions).toStrictEqual(expectedConfig);
  });

  it('should disable icon packs', () => {
    const languageIcons: LanguageIcon[] = [
      { icon: { name: 'a' }, ids: ['a'], enabledFor: [IconPack.Angular] },
      { icon: { name: 'c' }, ids: ['c', 'd'], disabled: true },
    ];
    const options = getDefaultIconOptions();
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
      iconConfig,
      { ...options, activeIconPack: '' }
    );

    expectedConfig.iconDefinitions = {};
    expectedConfig.languageIds = {};
    expect(iconDefinitions).toStrictEqual(expectedConfig);
  });

  it('should configure language icons for light and high contrast', () => {
    const languageIcons: LanguageIcon[] = [
      { icon: { name: 'a', light: true, highContrast: true }, ids: ['a'] },
      { icon: { name: 'b', light: true, highContrast: true }, ids: ['b'] },
    ];
    const options = getDefaultIconOptions();
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
      iconConfig,
      options
    );
    expectedConfig.iconDefinitions = {
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
    expectedConfig.languageIds = {
      a: 'a',
      b: 'b',
    };
    expectedConfig.light = {
      fileExtensions: {},
      fileNames: {},
      languageIds: {
        a: 'a_light',
        b: 'b_light',
      },
    };
    expectedConfig.highContrast = {
      fileExtensions: {},
      fileNames: {},
      languageIds: {
        a: 'a_highContrast',
        b: 'b_highContrast',
      },
    };
    expect(iconDefinitions).toStrictEqual(expectedConfig);
  });

  it('should configure custom icon associations', () => {
    const languageIcons: LanguageIcon[] = [
      { icon: { name: 'json' }, ids: ['a'] },
    ];
    const options = getDefaultIconOptions();
    options.languages.associations = {
      xml: 'json',
    };
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const iconDefinitions = loadLanguageIconDefinitions(
      languageIcons,
      iconConfig,
      options
    );

    expectedConfig.iconDefinitions = {
      json: {
        iconPath: './../icons/json.svg',
      },
    };
    expectedConfig.languageIds = {
      a: 'json',
      xml: 'json',
    };
    expectedConfig.options!.languages!.associations = {
      xml: 'json',
    };
    expect(iconDefinitions).toStrictEqual(expectedConfig);
  });
});
