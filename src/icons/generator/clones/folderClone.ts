import { basename } from 'path';
import { FolderIconClone, IconConfiguration } from '../../../models';
import {
  IconPath,
  FolderIconType,
  getFolderIconBasePaths,
  getFolderIconClonePath,
} from './utils/paths';
import { iconFolderPath } from '../constants';
import { cloneIcon, createCloneConfig } from './utils/cloning';
import { writeFileSync } from 'fs';

/**
 * Generates a clone of a folder icon.
 * @param cloneOpts options and configurations on how to clone the folder icon
 * @param config global icon configuration (used to get the base icon)
 * @param hash current hash being applied to the icons
 * @returns a partial icon configuration for the new folder icon
 */
export function cloneFolderIcon(
  cloneOpts: FolderIconClone,
  config: IconConfiguration,
  hash: string
): IconConfiguration {
  // get the paths of the base icons
  const basePaths = getFolderIconBasePaths(cloneOpts, config);
  if (!basePaths) {
    return {};
  }

  return createFolderClones(cloneOpts, basePaths, hash);
}

/**
 * for each base icon, creates its clone, recolorizes it and writes it to the disk
 *
 * @returns partial icon configuration for the cloned folder icons
 */
function createFolderClones(
  cloneOpts: FolderIconClone,
  basePaths: IconPath<FolderIconType>[],
  hash: string
): IconConfiguration {
  const config = createCloneConfig();

  basePaths.forEach((base) => {
    try {
      const clonePath = getFolderIconClonePath(base, cloneOpts, hash);
      const clonePathConfig = `${iconFolderPath}clones/${basename(
        clonePath.path
      )}`;

      const baseColor = isDarkThemeIcon(clonePath)
        ? cloneOpts.color
        : cloneOpts.lightColor ?? cloneOpts.color;

      // generates the new icon content
      const content = cloneIcon(base.path, hash, baseColor);
      const iconName = basename(clonePath.path, '.svg');

      try {
        // create the .svg file for the cloned icon
        writeFileSync(clonePath.path, content);
      } catch (error) {
        console.error(error);
        return;
      }

      // sets the icon path for the cloned icon in the configuration
      config.iconDefinitions![iconName] = {
        iconPath: clonePathConfig,
      };

      // sets the associated folder names for the cloned icon
      cloneOpts.folderNames?.forEach((folderName) => {
        switch (clonePath.type) {
          case FolderIconType.Base:
            config.folderNames![folderName] = iconName;
            break;
          case FolderIconType.Open:
            config.folderNamesExpanded![folderName] = iconName;
            break;
          case FolderIconType.Light:
            config.light!.folderNames![folderName] = iconName;
            break;
          case FolderIconType.LightOpen:
            config.light!.folderNamesExpanded![folderName] = iconName;
            break;
        }
      });
    } catch (error) {
      console.error(error);
    }
  });

  return config;
}

function isDarkThemeIcon(path: IconPath<FolderIconType>): boolean {
  return path.type === FolderIconType.Base || path.type === FolderIconType.Open;
}
