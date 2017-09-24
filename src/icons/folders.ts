import { FolderIcon, FolderTypes } from '../models/index';

/**
 * Defines folder icons
 */
export const folders: FolderTypes = {
    default: 'folder.svg',
    types: [
        { icon: 'folder-src.svg', folderNames: ['src', 'source'] },
        { icon: 'folder-dist.svg', folderNames: ['dist', 'build'] },
        { icon: 'folder-aurelia.svg', folderNames: [''] }
    ],
    themes: [
        { name: 'Blue', default: 'folder-blue.svg', enabled: true }
    ]
};
