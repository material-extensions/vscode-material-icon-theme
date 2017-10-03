import { FolderIcons, FolderType } from '../models/index';

/**
 * Defines folder icons
 */
export const folderIcons: FolderIcons = {
    defaultIcon: 'folder',
    rootFolder: 'folder',
    icons: [
        { name: 'folder-src', folderNames: ['src', 'source'] },
        { name: 'folder-dist', folderNames: ['dist', 'build'] },
        { name: 'folder-test', folderNames: ['test', 'tests'] }
    ],
    themes: [
        { name: FolderType.Classic, defaultIcon: 'folder' },
        { name: FolderType.Blue, defaultIcon: 'folder-blue' },
        { name: FolderType.None, defaultIcon: '' },
    ]
};
