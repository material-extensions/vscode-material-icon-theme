import { iconFolderPath, openedFolder } from './constants';
import { IconConfiguration, FolderTheme, FolderIcon, IconJsonOptions, DefaultIcon } from '../../models/index';
import * as merge from 'lodash.merge';

/**
 * Get the folder icon definitions as object.
 */
export const getFolderIconDefinitions = (folderThemes: FolderTheme[], config: IconConfiguration, options: IconJsonOptions): IconConfiguration => {
    config = merge({}, config);
    const activeTheme = getEnabledFolderTheme(folderThemes, options.folderTheme);
    const enabledIcons = disableIconsByGroup(activeTheme, options.activatedGroups);

    if (options.folderTheme === 'none') {
        return config;
    }

    enabledIcons.forEach(icon => {
        if (icon.disabled) return;
        config = setIconDefinitions(config, icon);
        icon.folderNames.forEach(fn => {
            config.folderNames[fn] = icon.name;
            config.folderNamesExpanded[fn] = `${icon.name}${openedFolder}`;
        });
    });

    config = merge({}, config, setDefaultFolderIcons(activeTheme));
    return config;
};

/**
 * Set the default folder icons for the theme.
 */
const setDefaultFolderIcons = (theme: FolderTheme): IconConfiguration => {
    let config = new IconConfiguration();
    const hasFolderIcons = theme.defaultIcon.name && theme.defaultIcon.name.length > 0;
    if (hasFolderIcons) {
        config = setIconDefinitions(config, theme.defaultIcon);
    }
    config.folder = hasFolderIcons ? theme.defaultIcon.name : '';
    config.folderExpanded = hasFolderIcons ? `${theme.defaultIcon.name}${openedFolder}` : '';
    config.rootFolder = theme.rootFolder ? theme.rootFolder.name : hasFolderIcons ? theme.defaultIcon.name : '';
    config.rootFolderExpanded = theme.rootFolder ? `${theme.rootFolder.name}${openedFolder}` : hasFolderIcons ? `${theme.defaultIcon.name}${openedFolder}` : '';

    return config;
};

/**
 * Get the object of the current enabled theme.
 */
const getEnabledFolderTheme = (themes: FolderTheme[], enabledTheme: string): FolderTheme => {
    return themes.find(theme => theme.name === enabledTheme);
};

/**
 * Disable all file icons that are in a group which is disabled.
 */
const disableIconsByGroup = (folderIcons: FolderTheme, activatedIconGroups): FolderIcon[] => {
    if (!folderIcons.icons || folderIcons.icons.length === 0) {
        return [];
    }
    return folderIcons.icons.filter(icon => {
        return !icon.group ? true : activatedIconGroups.some(group => group === icon.group);
    });
};

const setIconDefinitions = (config: IconConfiguration, icon: FolderIcon | DefaultIcon) => {
    config.iconDefinitions[icon.name] = {
        iconPath: `${iconFolderPath}${icon.name}.svg`
    };
    config.iconDefinitions[`${icon.name}${openedFolder}`] = {
        iconPath: `${iconFolderPath}${icon.name}${openedFolder}.svg`
    };
    return merge({}, config);
};
