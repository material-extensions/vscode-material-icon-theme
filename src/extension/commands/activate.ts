import { window as codeWindow } from 'vscode';
import { extensionName, logger, translate } from '../../core';
import { getConfig } from '../shared/config';

/** Activate the icon theme by changing the settings for the iconTheme. */
export const activateIcons = () => {
  return setIconTheme();
};

/** Set the icon theme in the config. */
const setIconTheme = async () => {
  // global user config
  try {
    const section = 'workbench.iconTheme';
    await getConfig().update(section, extensionName, true);

    // local workspace config
    if (getConfig().inspect(section)?.workspaceValue) {
      getConfig().update(section, extensionName);
    }
    codeWindow.showInformationMessage(translate('activated'));
  } catch (error) {
    logger.error(error);
  }
};
