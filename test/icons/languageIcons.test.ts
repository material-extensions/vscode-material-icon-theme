import * as assert from 'assert';
import { LanguageIcons, IconConfiguration } from '../../src/models/index';
import { getLanguageIconDefinitions } from '../../src/icons/index';

suite('language icons', () => {
    const iconConfig = new IconConfiguration();
    const languageIcons: LanguageIcons = {
        languages: [
            { id: 'a', icon: 'a' },
            { id: 'b', icon: 'b' },
            { id: 'c', icon: 'c' }
        ],
    };
    test('should configure icon definitions', () => {
        const def = getLanguageIconDefinitions(languageIcons, iconConfig);
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
            'c': 'c'
        };
        assert.deepEqual(def, value);
    });
});
