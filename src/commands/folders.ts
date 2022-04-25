import * as vscode from 'vscode';
import { folderIcons } from '../icons';
import * as helpers from './../helpers';
import * as i18n from './../i18n';

/** Command to toggle the folder icons. */
export const changeFolderTheme = async () => {
  try {
    const status = getFolderIconTheme();
    const response = await showQuickPickItems(status);
    if (response) {
      handleQuickPickActions(response);
    }
  } catch (error) {
    console.error(error);
  }
};

/** Show QuickPick items to select preferred configuration for the folder icons. */
const showQuickPickItems = (activeTheme: string) => {
  const options = folderIcons.map(
    (theme): vscode.QuickPickItem => ({
      description: helpers.capitalizeFirstLetter(theme.name),
      detail:
        theme.name === 'none'
          ? i18n.translate('folders.disabled')
          : i18n.translate(
              'folders.theme.description',
              helpers.capitalizeFirstLetter(theme.name)
            ),
      label: theme.name === activeTheme ? '\u2714' : '\u25FB',
    })
  );

  return vscode.window.showQuickPick(options, {
    placeHolder: i18n.translate('folders.toggleIcons'),
    ignoreFocusOut: false,
    matchOnDescription: true,
  });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: vscode.QuickPickItem) => {
  if (!value || !value.description) return;
  return helpers.setThemeConfig(
    'folders.theme',
    value.description.toLowerCase(),
    true
  );
};

/** Get the current folder theme. */
export const getFolderIconTheme = (): string => {
  return helpers.getMaterialIconsJSON()?.options?.folders?.theme ?? '';
};
