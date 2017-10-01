import { FolderIcons, IconConfiguration } from '../models/index';
import { iconFolderPath } from './index';

/**
 * Defines folder icons
 */
export const folderIcons: FolderIcons = {
    defaultIcon: 'folder',
    icons: [
        { name: 'folder-src', folderNames: ['src', 'source'] },
        { name: 'folder-dist', folderNames: ['dist', 'build'] },
        { name: 'folder-test', folderNames: ['test'] }
    ],
    themes: [
        { name: 'blue', defaultIcon: 'folder-blue' }
    ]
};

export const getFolderIconDefinitions = (): IconConfiguration => {
    let definitions = {
        iconDefinitions: {},
        folder: '',
        folderExpanded: '',
        rootFolder: '',
        rootFolderExpanded: '',
        folderNames: {},
        folderNamesExpanded: {}
    };

    folderIcons.icons.forEach(icon => {
        if (icon.disabled) return;
        definitions.iconDefinitions[icon.name] = {
            iconPath: `${iconFolderPath}${icon.name}.svg`
        };
        definitions.iconDefinitions[`${icon.name}-open`] = {
            iconPath: `${iconFolderPath}${icon.name}-open.svg`
        };
        icon.folderNames.forEach(fn => {
            definitions.folderNames[fn] = icon.name;
        });
        icon.folderNames.forEach(fn => {
            definitions.folderNamesExpanded[fn] = `${icon.name}-open.svg`;
        });
    });

    definitions.folder = folderIcons.defaultIcon;
    definitions.folderExpanded = `${folderIcons.defaultIcon}-open`;
    definitions.rootFolder = folderIcons.rootFolder ? folderIcons.rootFolder : folderIcons.defaultIcon;
    definitions.rootFolderExpanded = folderIcons.rootFolder ? `${folderIcons.rootFolder}-open` : `${folderIcons.defaultIcon}-open`;

    return definitions;
};
