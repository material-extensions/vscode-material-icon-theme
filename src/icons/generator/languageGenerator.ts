import { iconFolderPath, lightVersion, highContrastVersion } from './constants';
import { IconConfiguration, LanguageIcon, IconJsonOptions, DefaultIcon } from '../../models/index';
import * as merge from 'lodash.merge';

/**
 * Get all file icons that can be used in this theme.
 */
export const getLanguageIconDefinitions = (languages: LanguageIcon[], config: IconConfiguration, options: IconJsonOptions): IconConfiguration => {
    config = merge({}, config);
    const enabledLanguages = disableLanguagesByPack(languages, options.activatedPack);
    enabledLanguages.forEach(lang => {
        if (lang.disabled) return;
        config = setIconDefinitions(config, lang.icon);
        config = merge({}, config, setLanguageIdentifiers(lang.icon.name, lang.ids));
        config.light = lang.icon.light ? merge({}, config.light, setLanguageIdentifiers(lang.icon.name + lightVersion, lang.ids)) : config.light;
        config.highContrast = lang.icon.highContrast ? merge({}, config.highContrast, setLanguageIdentifiers(lang.icon.name + highContrastVersion, lang.ids)) : config.highContrast;
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

const setLanguageIdentifiers = (iconName: string, languageIds: string[]) => {
    const obj = { languageIds: {} };
    languageIds.forEach(id => {
        obj.languageIds[id] = iconName;
    });
    return obj;
};

/**
 * Disable all file icons that are in a pack which is disabled.
 */
const disableLanguagesByPack = (languageIcons: LanguageIcon[], activatedIconPack: string) => {
    return languageIcons.filter(language => {
        return !language.enabledFor ? true : language.enabledFor.some(p => p === activatedIconPack);
    });
};
