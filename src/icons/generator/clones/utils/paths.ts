import { basename, dirname, join } from 'path';
import {
  FileIconClone,
  FolderIconClone,
  IconConfiguration,
} from '../../../../models';
import { existsSync, mkdirSync, rmSync } from 'fs';

export enum FolderIconType {
  Base,
  Open,
  Light,
  LightOpen,
}

export enum FileIconType {
  Base,
  Light,
}

export interface IconPath<T extends FolderIconType | FileIconType> {
  path: string;
  type: T;
}

function resolvePath(path: string): string {
  if (basename(__dirname) === 'dist') {
    return join(__dirname, String(path));
  } else {
    // executed via script
    return join(__dirname, '..', '..', '..', String(path));
  }
}

export function getFileIconBasePaths(
  cloneOpts: FileIconClone,
  config: IconConfiguration
): IconPath<FileIconType>[] | undefined {
  const paths = [];
  const base = config.iconDefinitions?.[`${cloneOpts.base}`]?.iconPath;
  const light = config.iconDefinitions?.[`${cloneOpts.base}_light`]?.iconPath;

  if (base) {
    base && paths.push({ type: FileIconType.Base, path: resolvePath(base) });
    light && paths.push({ type: FileIconType.Light, path: resolvePath(light) });
    return paths;
  }
}

export function getFileIconClonePath(
  base: IconPath<FileIconType>,
  cloneOpts: FileIconClone,
  hash: string
): IconPath<FileIconType> {
  const sufix = base.type === FileIconType.Light ? '_light' : '';

  const clonePath = join(
    dirname(base.path),
    'clones',
    `${cloneOpts.name}${sufix}${hash}.svg`
  );

  return {
    type: base.type,
    path: clonePath,
  };
}

export function getFolderIconBasePaths(
  cloneOpts: FolderIconClone,
  config: IconConfiguration
): IconPath<FolderIconType>[] | undefined {
  const paths = [];
  const folderBase =
    cloneOpts.base === 'folder' ? 'folder' : `folder-${cloneOpts.base}`;

  const base = config.iconDefinitions?.[`${folderBase}`]?.iconPath;
  const open = config.iconDefinitions?.[`${folderBase}-open`]?.iconPath;
  const light = config.iconDefinitions?.[`${folderBase}_light`]?.iconPath;
  const lightOpen =
    config.iconDefinitions?.[`${folderBase}-open_light`]?.iconPath;

  if (base && open) {
    base && paths.push({ type: FolderIconType.Base, path: resolvePath(base) });
    open && paths.push({ type: FolderIconType.Open, path: resolvePath(open) });

    if (light) {
      paths.push({ type: FolderIconType.Light, path: resolvePath(light) });
    }

    if (lightOpen) {
      paths.push({
        type: FolderIconType.LightOpen,
        path: resolvePath(lightOpen),
      });
    }

    return paths;
  }
}

export function getFolderIconClonePath(
  base: IconPath<FolderIconType>,
  cloneOpts: FolderIconClone,
  hash: string
): IconPath<FolderIconType> {
  let sufix = '';

  switch (base.type) {
    case FolderIconType.Base:
      break;
    case FolderIconType.Open:
      sufix = '-open';
      break;
    case FolderIconType.Light:
      sufix = '_light';
      break;
    case FolderIconType.LightOpen:
      sufix = '-open_light';
      break;
  }

  const clonePath = join(
    dirname(base.path),
    'clones',
    `folder-${cloneOpts.name}${sufix}${hash}.svg`
  );

  return {
    type: base.type,
    path: clonePath,
  };
}

/**
 * removes the clones folder if it exists
 * and creates a new one
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
