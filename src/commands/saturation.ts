import * as vscode from 'vscode';
import { getDefaultIconOptions, validateSaturationValue } from '../icons';
import * as helpers from './../helpers';
import * as i18n from './../i18n';

/** Command to toggle the folder icons. */
export const changeSaturation = async () => {
    try {
        const currentSaturationValue = getCurrentSaturationValue();
        const response = Number(await showInput(currentSaturationValue));
        setSaturationConfig(response);
    } catch (error) {
        console.error(error);
    }
};

/** Show input to enter the saturation value. */
const showInput = (saturation: number) => {
    return vscode.window.showInputBox({
        placeHolder: i18n.translate('saturation.inputPlaceholder'),
        ignoreFocusOut: true,
        value: String(saturation),
        validateInput: validateSaturationInput
    });
};

/** Validate the saturation value which was inserted by the user. */
const validateSaturationInput = (saturationInput: string) => {
    if (!validateSaturationValue(+saturationInput)) {
        return i18n.translate('saturation.wrongValue');
    }
    return undefined;
};

/** Get the current value of the saturation of the icons. */
export const getCurrentSaturationValue = (): number => {
    const defaultOptions = getDefaultIconOptions();
    const config = helpers.getMaterialIconsJSON();
    return config.options.saturation === undefined ?
        defaultOptions.saturation : config.options.saturation;
};

const setSaturationConfig = (saturation: number) => {
    if (saturation !== undefined) {
        return helpers.setThemeConfig('saturation', saturation, true);
    }
};
