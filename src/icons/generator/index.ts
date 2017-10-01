import { IconConfiguration, FolderIcons, FileIcons, LanguageIcons } from '../../models/index';
import { iconFolderPath } from './constants';

/**
 * Get all file icons that can be used in this theme.
 */
export const getFileIconDefinitions = (fileIcons: FileIcons, config: IconConfiguration): IconConfiguration => {
    fileIcons.icons.forEach(icon => {
        if (icon.disabled) return;
        config.iconDefinitions[icon.name] = {
            iconPath: `${iconFolderPath}${icon.name}.svg`
        };
        if (icon.light) {
            config.iconDefinitions[`${icon.name}_light`] = {
                iconPath: `${iconFolderPath}${icon.name}_light.svg`
            };
        }
        if (icon.highContrast) {
            config.iconDefinitions[`${icon.name}_highContrast`] = {
                iconPath: `${iconFolderPath}${icon.name}_highContrast.svg`
            };
        }
        if (icon.fileExtensions) {
            icon.fileExtensions.forEach(ext => {
                config.fileExtensions[ext] = icon.name;
                if (icon.light) {
                    config.light.fileExtensions[ext] = `${icon.name}_light`;
                }
                if (icon.highContrast) {
                    config.highContrast.fileExtensions[ext] = `${icon.name}_highContrast`;
                }
            });
        }
        if (icon.fileNames) {
            icon.fileNames.forEach(fn => {
                config['fileNames'][fn] = icon.name;
                if (icon.light) {
                    config.light.fileExtensions[fn] = `${icon.name}_light`;
                }
                if (icon.highContrast) {
                    config.highContrast.fileExtensions[fn] = `${icon.name}_highContrast`;
                }
            });
        }
    });

    return config;
};

export const getFolderIconDefinitions = (folderIcons: FolderIcons, config: IconConfiguration): IconConfiguration => {
    folderIcons.icons.forEach(icon => {
        if (icon.disabled) return;
        config.iconDefinitions['folder'] = {
            iconPath: `${iconFolderPath}${folderIcons.defaultIcon}.svg`
        };
        config.iconDefinitions['folder-open'] = {
            iconPath: `${iconFolderPath}${folderIcons.defaultIcon}_open.svg`
        };
        config.iconDefinitions[icon.name] = {
            iconPath: `${iconFolderPath}${icon.name}.svg`
        };
        config.iconDefinitions[`${icon.name}-open`] = {
            iconPath: `${iconFolderPath}${icon.name}-open.svg`
        };
        icon.folderNames.forEach(fn => {
            config.folderNames[fn] = icon.name;
        });
        icon.folderNames.forEach(fn => {
            config.folderNamesExpanded[fn] = `${icon.name}-open.svg`;
        });
    });

    config.folder = folderIcons.defaultIcon;
    config.folderExpanded = `${folderIcons.defaultIcon}-open`;
    config.rootFolder = folderIcons.rootFolder ? folderIcons.rootFolder : folderIcons.defaultIcon;
    config.rootFolderExpanded = folderIcons.rootFolder ? `${folderIcons.rootFolder}-open` : `${folderIcons.defaultIcon}-open`;

    return config;
};

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

    return config;
};
