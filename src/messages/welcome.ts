import * as vscode from 'vscode';
import { activateIcons } from '../commands/activate';
import { getThemeConfig, isThemeNotVisible, setThemeConfig } from '../helpers';
import { translate } from '../i18n';

/** Show the welcome message if the icon theme has been installed the first time. */
export const showWelcomeMessage = () => {
  // if the user does not want to see the welcome message
  if (getThemeConfig('showWelcomeMessage')?.globalValue === false) return;

  vscode.window
    .showInformationMessage(
      translate('themeInstalled'),
      isThemeNotVisible() ? translate('activate') : '',
      translate('neverShowAgain')
    )
    .then(handleWelcomeMessageActions);
};

/** Handle the actions of the welcome message. */
const handleWelcomeMessageActions = (value: string | undefined) => {
  switch (value) {
    case translate('activate'):
      activateIcons();
      break;

    case translate('howToActivate'):
      vscode.env.openExternal(
        vscode.Uri.parse(
          'https://code.visualstudio.com/blogs/2016/09/08/icon-themes#_file-icon-themes'
        )
      );
      break;

    case translate('neverShowAgain'):
      disableWelcomeMessage();
      break;

    default:
      break;
  }
};

/** Disable the welcome messages in the global settings */
const disableWelcomeMessage = () => {
  setThemeConfig('showWelcomeMessage', false, true);
};
