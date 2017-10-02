import { iconFolderPath } from './constants';
import { FolderIcons, IconConfiguration, FolderTheme, FolderIcon } from '../../models/index';
import { ManifestOptions } from './manifestGenerator';
import { FolderType } from '../../models/FolderType.enum';

export const getFolderIconDefinitions = (folderIcons: FolderIcons, config: IconConfiguration, options: ManifestOptions): IconConfiguration => {
    let icons: FolderIcon[];
    const theme = getEnabledFolderTheme(folderIcons, options.folderTheme);
    icons = theme ? theme.icons || theme.useDefaultIcons ? folderIcons.icons : [] : folderIcons.icons;

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
            config.folderNamesExpanded[fn] = `${icon.name}-open.svg`;
        });
    });

    if (theme) {
        config = { ...config, ...setDefaultFolderIcons(theme) };
    } else {
        config = { ...config, ...setDefaultFolderIcons(folderIcons) };
    }

    return config;
};

const setDefaultFolderIcons = (icons: FolderTheme | FolderIcons): IconConfiguration => {
    const config = new IconConfiguration();
    const hasFolderIcons = icons.defaultIcon && icons.defaultIcon.length > 0;
    if (hasFolderIcons) {
        config.iconDefinitions[icons.defaultIcon] = {
            iconPath: `${iconFolderPath}${icons.defaultIcon}.svg`
        };
        config.iconDefinitions[`${icons.defaultIcon}-open`] = {
            iconPath: `${iconFolderPath}${icons.defaultIcon}_open.svg`
        };
    }
    config.folder = hasFolderIcons ? icons.defaultIcon : '';
    config.folderExpanded = hasFolderIcons ? `${icons.defaultIcon}-open` : '';
    config.rootFolder = icons.rootFolder ? icons.rootFolder : hasFolderIcons ? icons.defaultIcon : '';
    config.rootFolderExpanded = icons.rootFolder ? `${icons.rootFolder}-open` : hasFolderIcons ? `${icons.defaultIcon}-open` : '';
    return { ...config };
};

const getEnabledFolderTheme = (folderIcons: FolderIcons, enabledTheme: FolderType): FolderTheme => {
    return folderIcons.themes.filter(theme => theme.name === enabledTheme)[0];
};
