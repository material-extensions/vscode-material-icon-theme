import { window as codeWindow } from 'vscode';
import { getMaterialIconsJSON, setThemeConfig } from '../helpers';
import { translate } from '../i18n';
import { getDefaultIconOptions, validateSaturationValue } from '../icons';

/** Command to toggle the folder icons. */
export const changeSaturation = async () => {
  try {
    const currentSaturationValue = getCurrentSaturationValue();
    const response = await showInput(currentSaturationValue);
    if (response) {
      await setSaturationConfig(+response);
    }
  } catch (error) {
    console.error(error);
  }
};

/** Show input to enter the saturation value. */
const showInput = (saturation: number) => {
  return codeWindow.showInputBox({
    placeHolder: translate('saturation.inputPlaceholder'),
    ignoreFocusOut: true,
    value: saturation.toString(),
    validateInput: validateSaturationInput,
  });
};

/** Validate the saturation value which was inserted by the user. */
const validateSaturationInput = (saturationInput: string) => {
  if (!validateSaturationValue(+saturationInput)) {
    return translate('saturation.wrongValue');
  }
  return undefined;
};

/** Get the current value of the saturation of the icons. */
export const getCurrentSaturationValue = (): number => {
  const defaultOptions = getDefaultIconOptions();
  const config = getMaterialIconsJSON();
  return config?.options?.saturation ?? defaultOptions.saturation;
};

const setSaturationConfig = (saturation: number) => {
  return setThemeConfig('saturation', saturation, true);
};
