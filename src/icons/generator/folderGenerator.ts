import { iconFolderPath } from './constants';
import { FolderIcons, IconConfiguration } from '../../models/index';

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
