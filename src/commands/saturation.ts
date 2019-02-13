import * as vscode from 'vscode';
import { getDefaultIconOptions, validateSaturationValue } from '../icons';
import * as helpers from './../helpers';
import * as i18n from './../i18n';

/** Command to toggle the folder icons. */
export const changeSaturation = () => {
    return getCurrentSaturationValue()
        .then(showInput)
        .catch(err => console.log(err));
};

/** Show input to enter the saturation value. */
const showInput = (saturation: number) => {
    vscode.window.showInputBox({
        placeHolder: i18n.translate('saturation.inputPlaceholder'),
        ignoreFocusOut: true,
        value: String(saturation),
        validateInput: validateSaturationInput
    }).then(value => setSaturationConfig(+value));
};

/** Validate the saturation value which was inserted by the user. */
const validateSaturationInput = (saturationInput: string) => {
    if (!validateSaturationValue(+saturationInput)) {
        return i18n.translate('saturation.wrongValue');
    }
    return undefined;
};

/** Get the current value of the saturation of the icons. */
export const getCurrentSaturationValue = (): Promise<number> => {
    const defaultOptions = getDefaultIconOptions();
    return helpers.getMaterialIconsJSON().then((config) =>
        config.options.saturation === undefined ?
            defaultOptions.saturation : config.options.saturation);
};

const setSaturationConfig = (saturation: number) => {
    if (saturation !== undefined) {
        helpers.setThemeConfig('saturation', saturation, true);
    }
};
