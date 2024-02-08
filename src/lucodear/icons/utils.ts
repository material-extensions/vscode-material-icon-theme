import { IconPack } from '../../models';
import { LucodearFileIcon, LucodearFolderIcon } from '../model';

export type LucodearIconConfig = LucodearFileIcon | LucodearFolderIcon;

const isIconPack = (p: any): p is IconPack => {
  return Object.values(IconPack).includes(p);
};

const isIconPackArray = (p: any): p is IconPack[] => {
  return Array.isArray(p) && p.every(isIconPack);
};

const isFolderIcon = (i: any): i is LucodearFolderIcon => {
  return i.folderNames !== undefined;
};

export function lucodear<T extends LucodearIconConfig>(
  path: string,
  icons: T[]
): T[];

export function lucodear<T extends LucodearIconConfig>(
  subpath: string,
  pack: IconPack | IconPack[],
  icons: T[]
): T[];

export function lucodear<T extends LucodearIconConfig>(
  path: string,
  arg1: IconPack | IconPack[] | T[],
  arg2?: T[]
): T[] {
  let packs: IconPack | IconPack[] | undefined;
  let icons: T[];

  if (isIconPack(arg1) || isIconPackArray(arg1)) {
    packs = arg1;
    icons = arg2!;
  } else {
    icons = arg1 ?? [];
  }

  let result: T[] = addPrefixes(icons);

  if (packs) {
    result = addPack(packs, icons);
  }

  return addSubpath(path, result);
}

function addPrefixes<T extends LucodearIconConfig>(
  icons: T[],
  prefixes: string[] = ['@', '~', '=']
): T[] {
  return icons.map((icon) => {
    if (isFolderIcon(icon)) {
      // add prefixes to folder names (@folder, ~folder, =folder)
      icon.folderNames.forEach((folderName) => {
        icon.folderNames = icon.folderNames.concat(
          prefixes.map((prefix) => `${prefix}${folderName}`)
        );
      });

      // check if the icon starts with folder- and if not, add it
      if (!icon.name.startsWith('folder-')) {
        icon.name = `folder-${icon.name}`;
      }
    } else {
      // check if the icon starts with file- and if not, add it
      if (!icon.name.startsWith('file-')) {
        icon.name = `file-${icon.name}`;
      }
    }

    return icon;
  });
}

function addSubpath<T extends LucodearIconConfig>(
  subpath: string,
  icons: T[]
): T[] {
  return icons.map((icon) => {
    icon.subpath = subpath;
    return icon;
  });
}

function addPack<T extends LucodearIconConfig>(
  p: IconPack | IconPack[],
  icons: T[]
): T[] {
  return icons.map((icon) => {
    icon.enabledFor = Array.isArray(p) ? p : [p];
    return icon;
  });
}
