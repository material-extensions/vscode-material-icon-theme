import { FolderIcon, FolderTypes } from '../models/index';

/**
 * Defines folder icons
 */
export const folders: FolderTypes = {
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
