import { LanguageIcons } from '../models';
import { iconFolderPath } from './index';

/**
 * Defines icons for language ids
 */
export const languageIcons: LanguageIcons = {
    languages: [
        { id: 'php', icon: 'php' },
        { id: 'javascript', icon: 'javascript' },
        { id: 'hack', icon: 'hack' }
    ],
};

/**
 * Get all file icons that can be used in this theme.
 */
export const getLanguageIconDefinitions = () => {
    let definitions = {
        iconDefinitions: {},
        languageIds: {},
    };
    languageIcons.languages.forEach(language => {
        if (language.disabled) return;
        definitions.iconDefinitions[language.icon] = {
            iconPath: `${iconFolderPath}${language.icon}.svg`
        };
        definitions.languageIds[language.id] = language.icon;
    });

    return definitions;
};
