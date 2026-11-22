import { window as codeWindow } from 'vscode';
import {
  getDefaultConfig,
  logger,
  translate,
  validateSaturationValue,
} from '../../core';
import { getThemeConfig, setThemeConfig } from '../shared/config';

/** Command to toggle the folder icons. */
export const changeSaturation = async () => {
  try {
    const currentSaturationValue = getCurrentSaturationValue();
    const response = await showInputForCustomValue(currentSaturationValue);
    if (response) {
      await setSaturationConfig(+response);
    }
  } catch (error) {
    logger.error(error);
  }
};

const showInputForCustomValue = (saturation: number) => {
  return codeWindow.showInputBox({
    placeHolder: translate('saturation.inputPlaceholder'),
    ignoreFocusOut: true,
    value: saturation.toString(),
    validateInput: validateSaturationInput,
  });
};

const validateSaturationInput = (saturationInput: string) => {
  if (!validateSaturationValue(+saturationInput)) {
    return translate('saturation.wrongValue');
  }
  return undefined;
};

export const getCurrentSaturationValue = (): number => {
  const defaultConfig = getDefaultConfig();
  return getThemeConfig<number>('saturation') ?? defaultConfig.saturation;
};

const setSaturationConfig = (saturation: number) => {
  return setThemeConfig('saturation', saturation, true);
};
