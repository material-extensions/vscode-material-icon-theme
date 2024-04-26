import { basename, dirname, join } from 'path';
import {
  CustomClone,
  FileIconClone,
  FolderIconClone,
  IconConfiguration,
} from '../../../../models';
import { existsSync, mkdirSync, rmSync } from 'fs';
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

export interface IconData {
  type: Type;
  path: string;
  variant: Variant;
}

export interface CloneData extends IconData {
  name: string;
  color: string;
  inConfigPath: string;
  base: IconData;
}

/** resolves the path of the icon depending on the caller */
function resolvePath(path: string): string {
  if (basename(__dirname) === 'dist') {
    return join(__dirname, String(path));
  } else {
    // executed via script
    return join(__dirname, '..', '..', '..', String(path));
  }
}

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
 * @param config the current configuration of the extension
 * @param hash the current hash being applied to the icons
 */
export function getCloneData(
  cloneOpts: CustomClone,
  config: IconConfiguration,
  hash: string
): CloneData[] | undefined {
  const baseIcon = isFolder(cloneOpts)
    ? getFolderIconBaseData(cloneOpts, config)
    : getFileIconBaseData(cloneOpts, config);

  if (baseIcon) {
    return baseIcon.map((base) => {
      const cloneIcon = isFolder(cloneOpts)
        ? getFolderIconCloneData(base, cloneOpts, hash)
        : getFileIconCloneData(base, cloneOpts, hash);

      return {
        name: getIconName(cloneOpts.name, base),
        color: isDark(base)
          ? cloneOpts.color
          : cloneOpts.lightColor ?? cloneOpts.color,
        inConfigPath: `${iconFolderPath}clones/${basename(cloneIcon.path)}`,
        base,
        ...cloneIcon,
      };
    });
  }
}

/** returns path, type and variant for the base file icons to be cloned */
function getFileIconBaseData(
  cloneOpts: FileIconClone,
  config: IconConfiguration
): IconData[] | undefined {
  const icons = [];
  const base = config.iconDefinitions?.[`${cloneOpts.base}`]?.iconPath;
  let light =
    config.iconDefinitions?.[`${cloneOpts.base}${lightColorFileEnding}`]
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
        type: Type.Folder,
        variant: Variant.Light,
        path: resolvePath(light),
      });
    return icons;
  }
}

/** creates and returns the path of the cloned file icon */
function getFileIconCloneData(
  base: IconData,
  cloneOpts: FileIconClone,
  hash: string
): IconData {
  const name = getIconName(cloneOpts.name, base);
  const clonePath = join(dirname(base.path), 'clones', `${name}${hash}.svg`);

  return {
    variant: base.variant,
    type: base.type,
    path: clonePath,
  };
}

/** returns path, type and variant for the base folder icons to be cloned */
function getFolderIconBaseData(
  cloneOpts: FolderIconClone,
  config: IconConfiguration
): IconData[] | undefined {
  const icons = [];
  const folderBase =
    cloneOpts.base === 'folder' ? 'folder' : `folder-${cloneOpts.base}`;

  const base = config.iconDefinitions?.[`${folderBase}`]?.iconPath;
  const open =
    config.iconDefinitions?.[`${folderBase}${openedFolder}`]?.iconPath;
  let light =
    config.iconDefinitions?.[`${folderBase}${lightColorFileEnding}`]?.iconPath;
  let lightOpen =
    config.iconDefinitions?.[
      `${folderBase}${openedFolder}${lightColorFileEnding}`
    ]?.iconPath;

  if (base && open) {
    base &&
      icons.push({
        type: Type.Folder,
        variant: Variant.Base,
        path: resolvePath(base),
      });
    open &&
      icons.push({
        type: Type.Folder,
        variant: Variant.Open,
        path: resolvePath(open),
      });

    if (cloneOpts.lightColor && (!light || !lightOpen)) {
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
}

/** creates and returns the path of the cloned folder icon */
function getFolderIconCloneData(
  base: IconData,
  cloneOpts: FolderIconClone,
  hash: string
): IconData {
  const name = getIconName(cloneOpts.name, base);
  const path = join(dirname(base.path), 'clones', `${name}${hash}.svg`);
  return { type: base.type, variant: base.variant, path };
}

/**
 * removes the clones folder if it exists
 * and creates a new one if `keep` is true
 */
export function clearCloneFolder(keep: boolean = true): void {
  const clonesFolderPath = resolvePath('./../icons/clones');

  if (existsSync(clonesFolderPath)) {
    rmSync(clonesFolderPath, { recursive: true });
  }

  if (keep) {
    mkdirSync(clonesFolderPath);
  }
}

function getIconName(baseName: string, data: IconData): string {
  let prefix = '';
  let sufix = '';

  if (data.type === Type.Folder) {
    prefix = baseName === 'folder' ? '' : `folder-`;
    switch (data.variant) {
      case Variant.Base:
        break;
      case Variant.Open:
        sufix = openedFolder;
        break;
      case Variant.Light:
        sufix = lightColorFileEnding;
        break;
      case Variant.LightOpen:
        sufix = `${openedFolder}${lightColorFileEnding}`;
        break;
    }
  } else {
    sufix = data.variant === Variant.Light ? lightColorFileEnding : '';
  }

  return `${prefix}${baseName}${sufix}`;
}
