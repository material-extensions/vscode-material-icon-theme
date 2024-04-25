import { basename } from 'path';
import { FileIconClone, IconConfiguration } from '../../../models';
import {
  IconPath,
  getFileIconBasePaths,
  getFileIconClonePath,
  FileIconType,
} from './utils/paths';
import { iconFolderPath } from '../constants';
import { cloneIcon, createCloneConfig } from './utils/cloning';
import { writeFileSync } from 'fs';

/**
 * Generates a clone of a file icon.
 * @param cloneOpts options and configurations on how to clone the file icon
 * @param config global icon configuration (used to get the base icon)
 * @param hash current hash being applied to the icons
 * @returns a partial icon configuration for the new file icon
 */
export function cloneFileIcon(
  cloneOpts: FileIconClone,
  config: IconConfiguration,
  hash: string
): IconConfiguration {
  const basePaths = getFileIconBasePaths(cloneOpts, config);
  if (!basePaths) {
    return {};
  }

  return createFileIconClones(cloneOpts, basePaths, hash);
}

/**
 * for each base icon, creates its clone, recolorizes it and writes it to the disk
 *
 * @returns partial icon configuration for the cloned file icons
 */
function createFileIconClones(
  cloneOpts: FileIconClone,
  basePaths: IconPath<FileIconType>[],
  hash: string
): IconConfiguration {
  const config = createCloneConfig();

  basePaths.forEach((base) => {
    try {
      const filePath = getFileIconClonePath(base, cloneOpts, hash);
      const iconPathConfig = `${iconFolderPath}clones/${basename(
        filePath.path
      )}`;

      const baseColor =
        base.type === FileIconType.Base
          ? cloneOpts.color
          : cloneOpts.lightColor ?? cloneOpts.color;

      // generates the new icon content
      const content = cloneIcon(base.path, hash, baseColor);
      const iconName = basename(filePath.path, '.svg');

      try {
        // create the .svg file for the cloned icon
        writeFileSync(filePath.path, content);
      } catch (error) {
        console.error(error);
        return;
      }

      // set the icon path for the cloned icon in the configuration
      config.iconDefinitions![iconName] = {
        iconPath: iconPathConfig,
      };

      // set associations for the cloned icon in the configuration
      cloneOpts.fileNames?.forEach((fileName) => {
        switch (filePath.type) {
          case FileIconType.Base:
            config.fileNames![fileName] = iconName;
            break;
          case FileIconType.Light:
            config.light!.fileNames![fileName] = iconName;
            break;
        }
      });

      cloneOpts.fileExtensions?.forEach((fileExtension) => {
        switch (filePath.type) {
          case FileIconType.Base:
            config.fileExtensions![fileExtension] = iconName;
            break;
          case FileIconType.Light:
            config.light!.fileExtensions![fileExtension] = iconName;
            break;
        }
      });
    } catch (error) {
      console.error(error);
    }
  });

  return config;
}
