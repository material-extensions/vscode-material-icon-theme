import { iconFolderPath, openedFolder } from './constants';
import { FolderIcons, IconConfiguration, FolderTheme, FolderIcon, IconJsonOptions, FolderType, DefaultIcon } from '../../models/index';
import * as merge from 'lodash.merge';

/**
 * Get the folder icon definitions as object.
 */
export const getFolderIconDefinitions = (folderIcons: FolderIcons, config: IconConfiguration, options: IconJsonOptions): IconConfiguration => {
    let icons: FolderIcon[];
    config = merge({}, config);
    const theme = getEnabledFolderTheme(folderIcons, options.folderTheme);
    icons = getFolderIcons(theme, folderIcons);
    const disabledFolderIcons = options.folderTheme === FolderType.None;

    if (!disabledFolderIcons) {
        disableIconsByGroup(icons, options.activatedGroups).forEach(icon => {
            if (icon.disabled) return;
            config = setIconDefinitions(config, icon);
            icon.folderNames.forEach(fn => {
                config.folderNames[fn] = icon.name;
                config.folderNamesExpanded[fn] = `${icon.name}${openedFolder}`;
            });
        });

        config = merge({}, config, setDefaultFolderIcons(theme || folderIcons));
    }

    return config;
};

/**
 * Set the default folder icons for the theme.
 * @param icons Folder icons configuration
 */
const setDefaultFolderIcons = (icons: FolderTheme | FolderIcons): IconConfiguration => {
    let config = new IconConfiguration();
    const hasFolderIcons = icons.defaultIcon.name && icons.defaultIcon.name.length > 0;
    if (hasFolderIcons) {
        config = setIconDefinitions(config, icons.defaultIcon);
    }
    config.folder = hasFolderIcons ? icons.defaultIcon.name : '';
    config.folderExpanded = hasFolderIcons ? `${icons.defaultIcon.name}${openedFolder}` : '';
    config.rootFolder = icons.rootFolder ? icons.rootFolder.name : hasFolderIcons ? icons.defaultIcon.name : '';
    config.rootFolderExpanded = icons.rootFolder ? `${icons.rootFolder.name}${openedFolder}` : hasFolderIcons ? `${icons.defaultIcon.name}${openedFolder}` : '';

    return config;
};

/**
 * Get the object of the current enabled theme.
 * @param folderIcons folder icons configuration
 * @param enabledTheme Name of the theme that is currently enabled
 */
const getEnabledFolderTheme = (folderIcons: FolderIcons, enabledTheme: FolderType): FolderTheme => {
    return folderIcons.themes.filter(theme => theme.name === enabledTheme)[0];
};

/**
 * Disable all file icons that are in a group which is disabled.
 */
const disableIconsByGroup = (folderIcons: FolderIcon[], activatedIconGroups): FolderIcon[] => {
    return folderIcons.filter(icon => {
        return !icon.group ? true : activatedIconGroups[icon.group] || false;
    });
};

/**
 * Decide which folder icons should be used.
 */
const getFolderIcons = (theme: FolderTheme, folderIcons: FolderIcons): FolderIcon[] => {
    if (theme) {
        if (theme.icons && theme.icons.length > 0) {
            return theme.icons;
        } else {
            return theme.useDefaultIcons ? folderIcons.icons : [];
        }
    } else {
        return folderIcons.icons;
    }
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
