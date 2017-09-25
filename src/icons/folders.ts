import { FolderIcons } from '../models/index';

/**
 * Defines folder icons
 */
export const folderIcons: FolderIcons = {
    default: 'folder',
    types: [
        { icon: 'folder-src', folderNames: ['src', 'source'] },
        { icon: 'folder-dist', folderNames: ['dist', 'build'] },
        { icon: 'folder-aurelia', folderNames: [''] }
    ],
    themes: [
        { name: 'blue', default: 'folder-blue', }
    ]
};

/**
 * Get all folder icons that can be used in this theme.
 * For each folder icon exists an icon that shows the opened folder.
 */
export const getFolderIconDefinitions = (): string[] => [
    folderIcons.default,
    folderIcons.rootFolder ? folderIcons.rootFolder : folderIcons.default,
    ...folderIcons.types.map(type => type.icon),
    ...folderIcons.themes.map(theme => theme.default),
    ...folderIcons.themes.map(theme => theme.rootFolder ? theme.rootFolder : theme.default)
].reduce((all, icon) => {
    // add expanded folder icons
    return all.concat([icon, icon + '-open']);
}, []);
