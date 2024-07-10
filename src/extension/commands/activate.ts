import { translate } from '@core';
import { window as codeWindow } from 'vscode';
import { getConfig } from '../shared/config';

/** Activate the icon theme by changing the settings for the iconTheme. */
export const activateIcons = () => {
  return setIconTheme();
};

/** Set the icon theme in the config. */
const setIconTheme = async () => {
  // global user config
  try {
    await getConfig().update(
      'workbench.iconTheme',
      'material-icon-theme',
      true
    );

    // local workspace config
    if (getConfig().inspect('workbench.iconTheme')?.workspaceValue) {
      getConfig().update('workbench.iconTheme', 'material-icon-theme');
    }
    codeWindow.showInformationMessage(translate('activated'));
  } catch (error) {
    console.error(error);
  }
};
