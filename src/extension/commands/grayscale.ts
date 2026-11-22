import type { QuickPickItem } from 'vscode';
import { logger, translate } from '../../core';
import { getThemeConfig, setThemeConfig } from '../shared/config';
import { createSelectionItem, showQuickPick } from '../shared/quickPick';

/** Command to toggle grayscale. */
export const toggleGrayscale = async () => {
  try {
    const status = checkGrayscaleStatus();
    const response = await showQuickPickItems(status);
    if (response) {
      handleQuickPickActions(response);
    }
  } catch (error) {
    logger.error(error);
  }
};

/** Show QuickPick items to select preferred configuration for grayscale icons. */
const showQuickPickItems = (status: boolean) => {
  const on = createSelectionItem(
    {
      description: translate('toggleSwitch.on'),
      detail: translate('grayscale.enable'),
    },
    status
  );
  const off = createSelectionItem(
    {
      description: translate('toggleSwitch.off'),
      detail: translate('grayscale.disable'),
    },
    !status
  );
  return showQuickPick([on, off], {
    placeHolder: translate('grayscale.toggle'),
    ignoreFocusOut: false,
    matchOnDescription: true,
  });
};

const handleQuickPickActions = (value: QuickPickItem) => {
  if (!value || !value.description) return;
  switch (value.description) {
    case translate('toggleSwitch.on'): {
      return setThemeConfig('saturation', 0, true);
    }
    case translate('toggleSwitch.off'): {
      return setThemeConfig('saturation', 1, true);
    }
    default:
      return;
  }
};

export const checkGrayscaleStatus = (): boolean => {
  return getThemeConfig<number>('saturation') === 0;
};
