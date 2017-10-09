import { iconFolderPath } from './constants';
import { FolderIcons, IconConfiguration, FolderTheme, FolderIcon, IconJsonOptions, FolderType } from '../../models/index';
import * as merge from 'lodash.merge';

/**
 * Get the folder icon definitions as object.
 */
export const getFolderIconDefinitions = (folderIcons: FolderIcons, config: IconConfiguration, options: IconJsonOptions): IconConfiguration => {
    let icons: FolderIcon[];
    config = merge({}, config);
    const theme = getEnabledFolderTheme(folderIcons, options.folderTheme);
    icons = theme ? theme.icons || theme.useDefaultIcons ? folderIcons.icons : [] : folderIcons.icons;
    const disabledFolderIcons = options.folderTheme === FolderType.None;

    if (!disabledFolderIcons) {
        icons.forEach(icon => {
            if (icon.disabled) return;
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
                config.folderNamesExpanded[fn] = `${icon.name}-open`;
            });
        });

        if (theme) {
            config = merge({}, config, setDefaultFolderIcons(theme));
        } else {
            config = merge({}, config, setDefaultFolderIcons(folderIcons));
        }
    }

    return config;
};

/**
 * Set the default folder icons for the theme.
 * @param icons Folder icons configuration
 */
const setDefaultFolderIcons = (icons: FolderTheme | FolderIcons): IconConfiguration => {
    const config = new IconConfiguration();
    const hasFolderIcons = icons.defaultIcon && icons.defaultIcon.length > 0;
    if (hasFolderIcons) {
        config.iconDefinitions[icons.defaultIcon] = {
            iconPath: `${iconFolderPath}${icons.defaultIcon}.svg`
        };
        config.iconDefinitions[`${icons.defaultIcon}-open`] = {
            iconPath: `${iconFolderPath}${icons.defaultIcon}-open.svg`
        };
    }
    config.folder = hasFolderIcons ? icons.defaultIcon : '';
    config.folderExpanded = hasFolderIcons ? `${icons.defaultIcon}-open` : '';
    config.rootFolder = icons.rootFolder ? icons.rootFolder : hasFolderIcons ? icons.defaultIcon : '';
    config.rootFolderExpanded = icons.rootFolder ? `${icons.rootFolder}-open` : hasFolderIcons ? `${icons.defaultIcon}-open` : '';
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
