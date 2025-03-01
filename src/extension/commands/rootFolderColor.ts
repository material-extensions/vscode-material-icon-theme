import { getDefaultConfig, logger } from '../../core';
import { getThemeConfig } from '../shared/config';
import {
  handleFolderColorQuickPickActions,
  showFolderColorQuickPickItems,
} from './folderColor';

/** Command to toggle the folder icons. */
export const changeRootFolderColor = async () => {
  try {
    const status = checkRootFolderColorStatus();
    const response = await showFolderColorQuickPickItems(status);
    if (response) {
      handleFolderColorQuickPickActions(response, 'rootFolders.color');
    }
  } catch (error) {
    logger.error(error);
  }
};

/** Check status of the folder color */
const checkRootFolderColorStatus = (): string => {
  const defaultConfig = getDefaultConfig();
  const folderColorConfig = getThemeConfig<string>('folders.color');
  const rootFolderColorConfig = getThemeConfig<string>('rootFolders.color');
  return (
    rootFolderColorConfig ?? folderColorConfig ?? defaultConfig.folders.color!
  );
};
