import { window as codeWindow } from 'vscode';
import {
  getDefaultConfig,
  logger,
  translate,
  validateOpacityValue,
} from '../../core';
import { getThemeConfig, setThemeConfig } from '../shared/config';

/** Command to toggle the folder icons. */
export const changeOpacity = async () => {
  try {
    const currentOpacityValue = getCurrentOpacityValue();
    const response = await showInputForCustomValue(currentOpacityValue);
    if (response) {
      await setOpacityConfig(+response);
    }
  } catch (error) {
    logger.error(error);
  }
};

const showInputForCustomValue = (opacity: number) => {
  return codeWindow.showInputBox({
    placeHolder: translate('opacity.inputPlaceholder'),
    ignoreFocusOut: true,
    value: opacity.toString(),
    validateInput: validateOpacityInput,
  });
};

const validateOpacityInput = (opacityInput: string) => {
  if (!validateOpacityValue(+opacityInput)) {
    return translate('opacity.wrongValue');
  }
  return undefined;
};

export const getCurrentOpacityValue = (): number => {
  const defaultConfig = getDefaultConfig();
  return getThemeConfig<number>('opacity') ?? defaultConfig.opacity;
};

const setOpacityConfig = (opacity: number) => {
  return setThemeConfig('opacity', opacity, true);
};
