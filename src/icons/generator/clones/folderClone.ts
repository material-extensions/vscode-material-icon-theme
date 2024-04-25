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

export function cloneFolderIcon(
  cloneOpts: FolderIconClone,
  config: IconConfiguration,
  hash: string
): IconConfiguration {
  const basePaths = getFolderIconBasePaths(cloneOpts, config);
  if (!basePaths) {
    return {};
  }

  return createFolderClones(cloneOpts, basePaths, hash);
}

function createFolderClones(
  cloneOpts: FolderIconClone,
  basePaths: IconPath<FolderIconType>[],
  hash: string
): IconConfiguration {
  const config = createCloneConfig();

  basePaths.forEach((base) => {
    try {
      const filePath = getFolderIconClonePath(base, cloneOpts, hash);
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

      cloneOpts.folderNames?.forEach((folderName) => {
        switch (filePath.type) {
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
