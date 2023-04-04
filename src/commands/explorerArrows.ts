import { QuickPickItem, window as codeWindow } from 'vscode';
import { getMaterialIconsJSON, setThemeConfig } from '../helpers';
import { translate } from '../i18n';

/** Command to toggle the explorer arrows. */
export const toggleExplorerArrows = async () => {
  try {
    const status = checkArrowStatus();
    const response = await showQuickPickItems(status);
    return handleQuickPickActions(response);
  } catch (error) {
    console.error(error);
  }
};

/** Show QuickPick items to select preferred configuration for the explorer arrows. */
const showQuickPickItems = (
  status: boolean
): Thenable<QuickPickItem | undefined> => {
  const on: QuickPickItem = {
    description: translate('toggleSwitch.on'),
    detail: translate('explorerArrows.enable'),
    label: !status ? '\u2714' : '\u25FB',
  };
  const off: QuickPickItem = {
    description: translate('toggleSwitch.off'),
    detail: translate('explorerArrows.disable'),
    label: status ? '\u2714' : '\u25FB',
  };
  return codeWindow.showQuickPick([on, off], {
    placeHolder: translate('explorerArrows.toggle'),
    ignoreFocusOut: false,
    matchOnDescription: true,
  });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: QuickPickItem | undefined) => {
  if (!value?.description) return;
  switch (value.description) {
    case translate('toggleSwitch.on'): {
      return setThemeConfig('hidesExplorerArrows', false, true);
    }
    case translate('toggleSwitch.off'): {
      return setThemeConfig('hidesExplorerArrows', true, true);
    }
    default:
      return;
  }
};

/** Check if arrows are enabled. */
export const checkArrowStatus = (): boolean => {
  return !!getMaterialIconsJSON()?.hidesExplorerArrows;
};
