import { FolderTheme } from '../../models';
import { LucodearFileIcons, LucodearFolderTheme } from '../model';
import { folderPatches } from './patches';
import * as misc from './misc';
import * as ts from './typescript';
import * as lucodear from './lucodear';

/** Defines file icons */
export const lucodearFileIcons: LucodearFileIcons = {
  icons: [...misc.files, ...ts.files, ...lucodear.files],
};

/** Defines folder icons */
export const lucodearFolderIcons: LucodearFolderTheme = {
  name: 'specific',
  defaultIcon: { name: 'folder' },
  rootFolder: { name: 'folder-root' },
  icons: [...misc.folders, ...lucodear.folders],
};

// #region patcher

export const patchFolders = (folders: FolderTheme[]) => {
  const theme = folders.find((f) => f.name === 'specific');
  if (!theme) {
    return folders;
  }

  for (const patch of folderPatches) {
    const existing = theme.icons?.find((i) => i.name === patch.name);
    if (existing) {
      const folderNames = !patch.skipExtend
        ? patch.folderNames?.reduce((acc, folderName) => {
            return acc.concat([
              folderName,
              `@${folderName}`,
              `=${folderName}`,
              `~${folderName}`,
            ]);
          }, [] as string[])
        : patch.folderNames;

      existing.folderNames.push(...(folderNames || []));

      // make unique
      existing.folderNames = Array.from(new Set(existing.folderNames));
      console.log(`Patched folder icon '${patch.name}'`);
    }
  }

  return folders;
};

// #endregion
