import * as assert from 'assert';
import { LanguageIcon, IconConfiguration, IconPack } from '../../src/models/index';
import { getLanguageIconDefinitions, getDefaultIconOptions } from '../../src/icons/index';

suite('language icons', () => {
    const iconConfig = new IconConfiguration();
    const options = getDefaultIconOptions();

    test('should configure icon definitions', () => {
        const languageIcons: LanguageIcon[] = [
            { icon: { name: 'a' }, ids: ['a'] },
            { icon: { name: 'b' }, ids: ['b'] },
            { icon: { name: 'c' }, ids: ['c', 'd'], },
        ];
        const def = getLanguageIconDefinitions(languageIcons, iconConfig, options);
        const value = new IconConfiguration();
        value.iconDefinitions = {
            'a': {
                'iconPath': './../../icons/a.svg'
            },
            'b': {
                'iconPath': './../../icons/b.svg'
            },
            'c': {
                'iconPath': './../../icons/c.svg'
            }
        };
        value.languageIds = {
            'a': 'a',
            'b': 'b',
            'c': 'c',
            'd': 'c'
        };
        assert.deepEqual(def, value);
    });

    test('should disable icon definitions', () => {
        const languageIcons: LanguageIcon[] = [
            { icon: { name: 'a' }, ids: ['a'] },
            { icon: { name: 'c' }, ids: ['c', 'd'], disabled: true },
        ];
        const def = getLanguageIconDefinitions(languageIcons, iconConfig, options);
        const value = new IconConfiguration();
        value.iconDefinitions = {
            'a': {
                'iconPath': './../../icons/a.svg'
            }
        };
        value.languageIds = {
            'a': 'a'
        };
        assert.deepEqual(def, value);
    });

    test('should disable icon packs', () => {
        const languageIcons: LanguageIcon[] = [
            { icon: { name: 'a' }, ids: ['a'], enabledFor: [IconPack.Angular] },
            { icon: { name: 'c' }, ids: ['c', 'd'], disabled: true },
        ];
        const def = getLanguageIconDefinitions(languageIcons, iconConfig, { ...options, activatedPack: '' });
        const value = new IconConfiguration();
        value.iconDefinitions = {};
        value.languageIds = {};
        assert.deepEqual(def, value);
    });

    test('should configure language icons for light and high contrast', () => {
        const languageIcons: LanguageIcon[] = [
            { icon: { name: 'a', light: true, highContrast: true }, ids: ['a'] },
            { icon: { name: 'b', light: true, highContrast: true }, ids: ['b'] },
        ];
        const def = getLanguageIconDefinitions(languageIcons, iconConfig, options);
        const value = new IconConfiguration();
        value.iconDefinitions = {
            'a': {
                'iconPath': './../../icons/a.svg'
            },
            'a_light': {
                'iconPath': './../../icons/a_light.svg'
            },
            'a_highContrast': {
                'iconPath': './../../icons/a_highContrast.svg'
            },
            'b': {
                'iconPath': './../../icons/b.svg'
            },
            'b_light': {
                'iconPath': './../../icons/b_light.svg'
            },
            'b_highContrast': {
                'iconPath': './../../icons/b_highContrast.svg'
            }
        };
        value.languageIds = {
            'a': 'a',
            'b': 'b'
        };
        value.light = {
            fileExtensions: {},
            fileNames: {},
            languageIds: {
                'a': 'a_light',
                'b': 'b_light'
            }
        };
        value.highContrast = {
            fileExtensions: {},
            fileNames: {},
            languageIds: {
                'a': 'a_highContrast',
                'b': 'b_highContrast'
            }
        };
        assert.deepEqual(def, value);
    });
});
