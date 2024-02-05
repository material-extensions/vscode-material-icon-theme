import { LucodearFileIcons, LucodearFolderTheme } from '../model';
import { miscFiles } from './misc';
import { typescriptFiles } from './typescript';

export const lucodearFileIcons: LucodearFileIcons = {
  icons: [...miscFiles, ...typescriptFiles],
};

/**
 * Defines folder icons
 */
export const lucodearFolderIcons: LucodearFolderTheme = {
  name: 'specific',
  defaultIcon: { name: 'folder' },
  rootFolder: { name: 'folder-root' },
  icons: [
    // {
    //   name: 'folder-example',
    //   folderNames: ['example', 'examples'],
    // },
  ],
};
