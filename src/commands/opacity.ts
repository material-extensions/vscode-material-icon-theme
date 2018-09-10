import * as vscode from 'vscode';
import { getDefaultIconOptions, validateOpacityValue } from '../icons';
import * as helpers from './../helpers';
import * as i18n from './../i18n';

/** Command to toggle the folder icons. */
export const changeOpacity = () => {
    return getCurrentOpacityValue()
        .then(showInput)
        .catch(err => console.log(err));
};

/** Show input to enter the opacity value. */
const showInput = (opacity: number) => {
    vscode.window.showInputBox({
        placeHolder: i18n.translate('opacity.inputPlaceholder'),
        ignoreFocusOut: true,
        value: String(opacity),
        validateInput: validateOpacityInput
    }).then(value => setOpacityConfig(+value));
};

/** Validate the opacity value which was inserted by the user. */
const validateOpacityInput = (opacityInput: string) => {
    if (!validateOpacityValue(+opacityInput)) {
        return i18n.translate('opacity.wrongValue');
    }
    return undefined;
};

/** Get the current value of the opacity of the icons. */
export const getCurrentOpacityValue = (): Promise<number> => {
    const defaultOptions = getDefaultIconOptions();
    return helpers.getMaterialIconsJSON().then((config) =>
        config.options.opacity === undefined ?
            defaultOptions.opacity : config.options.opacity);
};

const setOpacityConfig = (opacity: number) => {
    if (opacity !== undefined) {
        helpers.setThemeConfig('opacity', opacity, true);
    }
};
