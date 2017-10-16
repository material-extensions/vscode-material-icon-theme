import { iconFolderPath, lightVersion, highContrastVersion } from './constants';
import { IconConfiguration, LanguageIdentifier, IconJsonOptions, DefaultIcon } from '../../models/index';
import * as merge from 'lodash.merge';

/**
 * Get all file icons that can be used in this theme.
 */
export const getLanguageIconDefinitions = (languages: LanguageIdentifier[], config: IconConfiguration, options: IconJsonOptions): IconConfiguration => {
    config = merge({}, config);
    const enabledLanguages = disableLanguagesByPack(languages, options.activatedPacks);
    enabledLanguages.forEach(lang => {
        if (lang.disabled) return;
        config = setIconDefinitions(config, lang.icon);
        config = merge({}, config, setLanguageIdentifiers(lang.icon.name, lang.id));
        config.light = lang.icon.light ? merge({}, config.light, setLanguageIdentifiers(lang.icon.name + lightVersion, lang.id)) : config.light;
        config.highContrast = lang.icon.highContrast ? merge({}, config.highContrast, setLanguageIdentifiers(lang.icon.name + highContrastVersion, lang.id)) : config.highContrast;
    });

    return config;
};

const setIconDefinitions = (config: IconConfiguration, icon: DefaultIcon) => {
    config = merge({}, config);
    config = createIconDefinitions(config, icon.name);
    config = merge({}, config, icon.light ? createIconDefinitions(config, icon.name + lightVersion) : config.light);
    config = merge({}, config, icon.highContrast ? createIconDefinitions(config, icon.name + highContrastVersion) : config.highContrast);
    return config;
};

const createIconDefinitions = (config: IconConfiguration, iconName: string) => {
    config = merge({}, config);
    config.iconDefinitions[iconName] = {
        iconPath: `${iconFolderPath}${iconName}.svg`
    };
    return config;
};

const setLanguageIdentifiers = (iconName: string, languageId: string) => {
    return {
        languageIds: {
            [languageId]: iconName
        }
    };
};

/**
 * Disable all file icons that are in a pack which is disabled.
 */
const disableLanguagesByPack = (languageIcons: LanguageIdentifier[], activatedIconPacks: string[]) => {
    return languageIcons.filter(language => {
        return !language.pack ? true : activatedIconPacks.some(pack => pack === language.pack);
    });
};
