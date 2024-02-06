import { FolderTheme } from '../../models';
import { LucodearFileIcons, LucodearFolderTheme } from '../model';
import { miscFiles, miscFolders } from './misc';
import { folderPatches } from './patches';
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
  icons: [...miscFolders],
};

export const patchFolders = (folders: FolderTheme[]) => {
  const theme = folders.find((f) => f.name === 'specific');
  if (!theme) {
    return folders;
  }

  for (const patch of folderPatches) {
    const existing = theme.icons?.find((i) => i.name === patch.name);
    if (existing) {
      const folderNames = patch.folderNames?.reduce((acc, folderName) => {
        return acc.concat([
          folderName,
          `@${folderName}`,
          `=${folderName}`,
          `~${folderName}`,
        ]);
      }, [] as string[]);

      existing.folderNames.push(...(folderNames || []));

      // make unique
      existing.folderNames = Array.from(new Set(existing.folderNames));
      console.log(`Patched folder icon '${patch.name}'`);
    }
  }

  return folders;
};
