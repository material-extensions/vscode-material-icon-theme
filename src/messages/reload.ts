import * as vscode from 'vscode';
import { getThemeConfig, setThemeConfig } from '../helpers';
import { translate } from '../i18n';

/** User has to confirm if he wants to reload the editor */
export const showConfirmToReloadMessage = async (): Promise<boolean> => {
  // if the user does not want to see the reload message
  if (getThemeConfig('showReloadMessage')?.globalValue === false) false;

  const response = await vscode.window.showInformationMessage(
    translate('confirmReload'),
    translate('reload'),
    translate('neverShowAgain')
  );

  switch (response) {
    case translate('reload'):
      return true;

    case translate('neverShowAgain'):
      disableReloadMessage();
      return false;

    default:
      return false;
  }
};

/** Disable the reload message in the global settings */
const disableReloadMessage = () => {
  setThemeConfig('showReloadMessage', false, true);
};
