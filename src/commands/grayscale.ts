import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as i18n from './../i18n';

/** Command to toggle grayscale. */
export const toggleGrayscale = async () => {
    try {
        const status = checkGrayscaleStatus();
        const response = await showQuickPickItems(status);
        handleQuickPickActions(response);
    } catch (error) {
        console.error(error);
    }
};

/** Show QuickPick items to select preferred configuration for grayscale icons. */
const showQuickPickItems = (status: boolean) => {
    const on: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.on'),
        detail: i18n.translate(`grayscale.enable`),
        label: status ? '\u2714' : '\u25FB'
    };
    const off: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.off'),
        detail: i18n.translate(`grayscale.disable`),
        label: !status ? '\u2714' : '\u25FB'
    };
    return vscode.window.showQuickPick(
        [on, off], {
            placeHolder: i18n.translate('grayscale.toggle'),
            ignoreFocusOut: false,
            matchOnDescription: true
        });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: vscode.QuickPickItem) => {
    if (!value || !value.description) return;
    switch (value.description) {
        case i18n.translate('toggleSwitch.on'): {
            return helpers.setThemeConfig('saturation', 0, true);
        }
        case i18n.translate('toggleSwitch.off'): {
            return helpers.setThemeConfig('saturation', 1, true);
        }
        default:
            return;
    }
};

/** Is grayscale icons enabled? */
export const checkGrayscaleStatus = (): boolean => {
    return helpers.getMaterialIconsJSON().options.saturation === 0;
};
