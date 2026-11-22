import type { QuickPickItem } from 'vscode';
import { logger, translate } from '../../core';
import { getThemeConfig, setThemeConfig } from '../shared/config';
import { createSelectionItem, showQuickPick } from '../shared/quickPick';

/** Command to toggle the explorer arrows. */
export const toggleExplorerArrows = async () => {
  try {
    const status = areExplorerArrowsHidden();
    const response = await showQuickPickItems(status);
    return handleQuickPickActions(response);
  } catch (error) {
    logger.error(error);
  }
};

/** Show QuickPick items to select preferred configuration for the explorer arrows. */
const showQuickPickItems = (
  status: boolean
): Thenable<QuickPickItem | undefined> => {
  const on = createSelectionItem(
    {
      description: translate('toggleSwitch.on'),
      detail: translate('explorerArrows.enable'),
    },
    !status
  );
  const off = createSelectionItem(
    {
      description: translate('toggleSwitch.off'),
      detail: translate('explorerArrows.disable'),
    },
    status
  );
  return showQuickPick([on, off], {
    placeHolder: translate('explorerArrows.toggle'),
    ignoreFocusOut: false,
    matchOnDescription: true,
  });
};

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

export const areExplorerArrowsHidden = (): boolean => {
  return getThemeConfig('hidesExplorerArrows') === true;
};
