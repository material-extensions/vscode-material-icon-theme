import { iconFolderPath } from './constants';
import { LanguageIcons, IconConfiguration } from '../../models/index';

/**
 * Get all file icons that can be used in this theme.
 */
export const getLanguageIconDefinitions = (languageIcons: LanguageIcons, config: IconConfiguration): IconConfiguration => {
    languageIcons.languages.forEach(language => {
        if (language.disabled) return;
        config.iconDefinitions[language.icon] = {
            iconPath: `${iconFolderPath}${language.icon}.svg`
        };
        config.languageIds[language.id] = language.icon;
    });

    return { ...config };
};
