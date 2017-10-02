import { iconFolderPath } from './constants';
import { FolderIcons, IconConfiguration, FolderTheme, FolderIcon } from '../../models/index';

export const getFolderIconDefinitions = (folderIcons: FolderIcons, config: IconConfiguration): IconConfiguration => {
    let icons: FolderIcon[];
    const theme = getEnabledFolderTheme(folderIcons);
    icons = theme ? theme.icons || [] : folderIcons.icons;

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
        setDefaultFolderIcons(config, theme);
    } else {
        setDefaultFolderIcons(config, folderIcons);
    }

    return { ...config };
};

const setDefaultFolderIcons = (config: IconConfiguration, icons: FolderTheme | FolderIcons) => {
    config.iconDefinitions['folder'] = {
        iconPath: `${iconFolderPath}${icons.defaultIcon}.svg`
    };
    config.iconDefinitions['folder-open'] = {
        iconPath: `${iconFolderPath}${icons.defaultIcon}_open.svg`
    };
    config.folder = icons.defaultIcon;
    config.folderExpanded = `${icons.defaultIcon}-open`;
    config.rootFolder = icons.rootFolder ? icons.rootFolder : icons.defaultIcon;
    config.rootFolderExpanded = icons.rootFolder ? `${icons.rootFolder}-open` : `${icons.defaultIcon}-open`;
    return { ...config };
};

const getEnabledFolderTheme = (folderIcons: FolderIcons): FolderTheme => {
    return folderIcons.themes.filter(theme => theme.enabled)[0] || undefined;
};
