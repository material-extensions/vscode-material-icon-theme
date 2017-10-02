import { FolderIcons } from '../models/index';

/**
 * Defines folder icons
 */
export const folderIcons: FolderIcons = {
    defaultIcon: 'folder',
    rootFolder: 'folder',
    icons: [
        { name: 'folder-src', folderNames: ['src', 'source'] },
        { name: 'folder-dist', folderNames: ['dist', 'build'] },
        { name: 'folder-test', folderNames: ['test'] }
    ],
    themes: [
        { name: 'blue', defaultIcon: 'folder-blue' }
    ]
};
