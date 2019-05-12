import * as vscode from 'vscode';
import { getDefaultIconOptions, validateOpacityValue } from '../icons';
import * as helpers from './../helpers';
import * as i18n from './../i18n';

/** Command to toggle the folder icons. */
export const changeOpacity = async () => {
    try {
        const currentOpacityValue = getCurrentOpacityValue();
        const response = Number(await showInput(currentOpacityValue));
        return setOpacityConfig(response);
    } catch (error) {
        console.error(error);
    }
};

/** Show input to enter the opacity value. */
const showInput = (opacity: number) => {
    return vscode.window.showInputBox({
        placeHolder: i18n.translate('opacity.inputPlaceholder'),
        ignoreFocusOut: true,
        value: String(opacity),
        validateInput: validateOpacityInput
    });
};

/** Validate the opacity value which was inserted by the user. */
const validateOpacityInput = (opacityInput: string) => {
    if (!validateOpacityValue(+opacityInput)) {
        return i18n.translate('opacity.wrongValue');
    }
    return undefined;
};

/** Get the current value of the opacity of the icons. */
export const getCurrentOpacityValue = (): number => {
    const defaultOptions = getDefaultIconOptions();
    const config = helpers.getMaterialIconsJSON();
    return config.options.opacity === undefined ?
        defaultOptions.opacity : config.options.opacity;
};

const setOpacityConfig = (opacity: number) => {
    if (opacity !== undefined) {
        return helpers.setThemeConfig('opacity', opacity, true);
    }
};
