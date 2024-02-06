import { IconPack } from '../../models';
import { LucodearFileIcon, LucodearFolderIcon } from '../model';

export function prefix(
  icons: LucodearFolderIcon[],
  prefixes: string[] = ['@', '~', '=']
): LucodearFolderIcon[] {
  return icons.map((icon) => {
    icon.folderNames.forEach((folderName) => {
      icon.folderNames = icon.folderNames.concat(
        prefixes.map((prefix) => `${prefix}${folderName}`)
      );
    });
    return icon;
  });
}

export function subpath<T extends LucodearFileIcon | LucodearFolderIcon>(
  subpath: string,
  icons: T[]
): T[] {
  return icons.map((icon) => {
    icon.subpath = subpath;
    return icon;
  });
}

export function pack<T extends LucodearFileIcon | LucodearFolderIcon>(
  p: IconPack | IconPack[],
  icons: T[]
): T[] {
  return icons.map((icon) => {
    icon.enabledFor = Array.isArray(p) ? p : [p];
    return icon;
  });
}
