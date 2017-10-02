import { FolderIcons } from '../models/index';
import { FolderType } from '../models/FolderType.enum';

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
        { name: FolderType.Classic, defaultIcon: 'folder' },
        { name: FolderType.Blue, defaultIcon: 'folder-blue' },
        { name: FolderType.None, defaultIcon: '' },
    ]
};
