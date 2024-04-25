import { basename } from 'path';
import { FileIconClone, IconConfiguration } from '../../../models';
import {
  IconPath,
  getFileIconBasePaths,
  getFileIconClonePath,
  FileIconType,
} from './utils/paths';
import { iconFolderPath } from '../constants';
import { cloneIcon } from './utils/svg';
import { writeFileSync } from 'fs';

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

function createFileIconClones(
  cloneOpts: FileIconClone,
  basePaths: IconPath<FileIconType>[],
  hash: string
): IconConfiguration {
  const config: IconConfiguration = new IconConfiguration();

  basePaths.forEach((base) => {
    try {
      const filePath = getFileIconClonePath(base, cloneOpts, hash);
      const iconPathConfig = `${iconFolderPath}clones/${basename(
        filePath.path
      )}`;
      const content = cloneIcon(base.path, hash, cloneOpts);
      const iconName = basename(filePath.path, '.svg');

      try {
        writeFileSync(filePath.path, content);
      } catch (error) {
        console.error(error);
        return;
      }

      config.iconDefinitions![iconName] = {
        iconPath: iconPathConfig,
      };

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
