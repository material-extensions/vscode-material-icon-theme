import type { QuickPickItem } from 'vscode';
import {
  capitalizeFirstLetter,
  type FolderThemeName,
  folderIcons,
  logger,
  translate,
} from '../../core';
import { getThemeConfig, setThemeConfig } from '../shared/config';
import { createSelectionItem, showQuickPick } from '../shared/quickPick';

/** Command to toggle the folder icons. */
export const changeFolderTheme = async () => {
  try {
    const status = getCurrentFolderIconTheme();
    const response = await showQuickPickItems(status);
    if (response) {
      handleQuickPickActions(response);
    }
  } catch (error) {
    logger.error(error);
  }
};

/** Show QuickPick items to select preferred configuration for the folder icons. */
const showQuickPickItems = (activeTheme: FolderThemeName) => {
  const options = folderIcons.map(
    (theme): QuickPickItem => ({
      description: capitalizeFirstLetter(theme.name),
      detail:
        theme.name === 'none'
          ? translate('folders.disabled')
          : translate(
              'folders.theme.description',
              capitalizeFirstLetter(theme.name)
            ),
      ...createSelectionItem({}, theme.name === activeTheme),
    })
  );

  return showQuickPick(options, {
    placeHolder: translate('folders.toggleIcons'),
    ignoreFocusOut: false,
    matchOnDescription: true,
  });
};

const handleQuickPickActions = (value: QuickPickItem) => {
  if (!value || !value.description) return;
  return setThemeConfig('folders.theme', value.description.toLowerCase(), true);
};

const getCurrentFolderIconTheme = () => {
  return getThemeConfig<FolderThemeName>('folders.theme') ?? 'none';
};
