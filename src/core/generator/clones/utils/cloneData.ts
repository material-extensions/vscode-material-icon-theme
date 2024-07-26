import { existsSync } from 'node:fs';
import { mkdir, rm } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { resolvePath } from '../../../helpers/resolvePath';
import type {
  CustomClone,
  FileIconClone,
  FolderIconClone,
} from '../../../models/icons/config';
import type { Manifest } from '../../../models/manifest';
import {
  iconFolderPath,
  lightColorFileEnding,
  openedFolder,
} from '../../constants';

export enum Variant {
  Base,
  Open,
  Light,
  LightOpen,
}

export enum Type {
  Folder,
  File,
}

export type IconData = {
  type: Type;
  path: string;
  variant: Variant;
};

export type CloneData = IconData & {
  name: string;
  color: string;
  inConfigPath: string;
  base: IconData;
};

/** checks if a `CustomClone` configuration is a `FolderIconClone` */
export const isFolder = (clone: CustomClone): clone is FolderIconClone => {
  return clone && (clone as FolderIconClone).folderNames !== undefined;
};

/** checks if the icon is a dark variant */
const isDark = (daa: IconData) =>
  daa.variant === Variant.Base || daa.variant === Variant.Open;

/**
 * get cloning information from configuration
 * @param cloneOpts the clone configuration
 * @param manifest the current configuration of the extension
 * @param hash the current hash being applied to the icons
 */
export const getCloneData = (
  cloneOpts: CustomClone,
  manifest: Manifest,
  subFolder: string,
  hash: string,
  ext?: string
): CloneData[] | undefined => {
  const baseIcon = isFolder(cloneOpts)
    ? getFolderIconBaseData(cloneOpts, manifest)
    : getFileIconBaseData(cloneOpts, manifest);

  if (baseIcon) {
    return baseIcon.map((base) => {
      const cloneIcon = isFolder(cloneOpts)
        ? getFolderIconCloneData(base, cloneOpts, hash, subFolder, ext)
        : getFileIconCloneData(base, cloneOpts, hash, subFolder, ext);

      return {
        name: getIconName(cloneOpts.name, base),
        color: isDark(base)
          ? cloneOpts.color
          : cloneOpts.lightColor ?? cloneOpts.color,
        inConfigPath: `${iconFolderPath}${subFolder}${basename(
          cloneIcon.path
        )}`,
        base,
        ...cloneIcon,
      };
    });
  }
};

/** returns path, type and variant for the base file icons to be cloned */
const getFileIconBaseData = (
  cloneOpts: FileIconClone,
  manifest: Manifest
): IconData[] | undefined => {
  const icons = [];
  const base = manifest.iconDefinitions?.[`${cloneOpts.base}`]?.iconPath;
  let light =
    manifest.iconDefinitions?.[`${cloneOpts.base}${lightColorFileEnding}`]
      ?.iconPath;

  if (cloneOpts.lightColor && !light) {
    // the original icon does not have a light version, so we re-use the base
    light = base;
  }

  if (base) {
    icons.push({
      type: Type.File,
      variant: Variant.Base,
      path: resolvePath(base),
    });
    light &&
      icons.push({
        type: Type.File,
        variant: Variant.Light,
        path: resolvePath(light),
      });
    return icons;
  }
};

/** creates and returns the path of the cloned file icon */
const getFileIconCloneData = (
  base: IconData,
  cloneOpts: FileIconClone,
  hash: string,
  subFolder: string,
  ext = '.svg'
): IconData => {
  const name = getIconName(cloneOpts.name, base);
  const clonePath = join(dirname(base.path), subFolder, `${name}${hash}${ext}`);

  return {
    variant: base.variant,
    type: base.type,
    path: clonePath,
  };
};

/** returns path, type and variant for the base folder icons to be cloned */
const getFolderIconBaseData = (
  clone: FolderIconClone,
  manifest: Manifest
): IconData[] | undefined => {
  const icons = [];
  const folderBase =
    clone.base === 'folder'
      ? 'folder'
      : clone.base.startsWith('folder-')
        ? clone.base
        : `folder-${clone.base}`;

  const base = manifest.iconDefinitions?.[`${folderBase}`]?.iconPath;
  const open =
    manifest.iconDefinitions?.[`${folderBase}${openedFolder}`]?.iconPath;
  let light =
    manifest.iconDefinitions?.[`${folderBase}${lightColorFileEnding}`]
      ?.iconPath;
  let lightOpen =
    manifest.iconDefinitions?.[
      `${folderBase}${openedFolder}${lightColorFileEnding}`
    ]?.iconPath;

  if (base && open) {
    icons.push({
      type: Type.Folder,
      variant: Variant.Base,
      path: resolvePath(base),
    });

    icons.push({
      type: Type.Folder,
      variant: Variant.Open,
      path: resolvePath(open),
    });

    if (clone.lightColor && (!light || !lightOpen)) {
      // the original icon does not have a light version, so we re-use the base icons
      light = base;
      lightOpen = open;
    }

    if (light) {
      icons.push({
        type: Type.Folder,
        variant: Variant.Light,
        path: resolvePath(light),
      });
    }

    if (lightOpen) {
      icons.push({
        type: Type.Folder,
        variant: Variant.LightOpen,
        path: resolvePath(lightOpen),
      });
    }

    return icons;
  }
};

/** creates and returns the path of the cloned folder icon */
const getFolderIconCloneData = (
  base: IconData,
  cloneOpts: FolderIconClone,
  hash: string,
  subFolder: string,
  ext = '.svg'
): IconData => {
  const name = getIconName(cloneOpts.name, base);
  const path = join(dirname(base.path), subFolder, `${name}${hash}${ext}`);
  return { type: base.type, variant: base.variant, path };
};

/**
 * removes the clones folder if it exists
 * and creates a new one if `keep` is true
 */
export const clearCloneFolder = async (keep = true): Promise<void> => {
  const clonesFolderPath = resolvePath('./../icons/clones');

  if (existsSync(clonesFolderPath)) {
    await rm(clonesFolderPath, { recursive: true });
  }

  if (keep) {
    await mkdir(clonesFolderPath);
  }
};

const getIconName = (baseName: string, data: IconData): string => {
  let prefix = '';
  let suffix = '';

  if (data.type === Type.Folder) {
    prefix =
      baseName === 'folder'
        ? ''
        : baseName.startsWith('folder-')
          ? ''
          : 'folder-';

    switch (data.variant) {
      case Variant.Base:
        break;
      case Variant.Open:
        suffix = openedFolder;
        break;
      case Variant.Light:
        suffix = lightColorFileEnding;
        break;
      case Variant.LightOpen:
        suffix = `${openedFolder}${lightColorFileEnding}`;
        break;
    }
  } else {
    suffix = data.variant === Variant.Light ? lightColorFileEnding : '';
  }

  return `${prefix}${baseName}${suffix}`;
};
