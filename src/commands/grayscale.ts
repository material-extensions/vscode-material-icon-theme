import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as i18n from './../i18n';

/** Command to toggle grayscale. */
export const toggleGrayscale = () => {
    return checkGrayscaleStatus()
        .then(showQuickPickItems)
        .then(handleQuickPickActions)
        .catch(err => console.log(err));
};

/** Show QuickPick items to select preferred configuration for grayscale icons. */
const showQuickPickItems = (status: boolean) => {
    const on: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.on'),
        detail: i18n.translate(`grayscale.enableGrayscale`),
        label: status ? '\u2714' : '\u25FB'
    };
    const off: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.off'),
        detail: i18n.translate(`grayscale.disableGrayscale`),
        label: !status ? '\u2714' : '\u25FB'
    };
    return vscode.window.showQuickPick(
        [on, off], {
            placeHolder: i18n.translate('grayscale.toggleGrayscale'),
            ignoreFocusOut: false,
            matchOnDescription: true
        });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: vscode.QuickPickItem) => {
    if (!value || !value.description) return;
    switch (value.description) {
        case i18n.translate('toggleSwitch.on'): {
            helpers.setThemeConfig('saturation', 0, true);
            break;
        }
        case i18n.translate('toggleSwitch.off'): {
            helpers.setThemeConfig('saturation', 1, true);
            break;
        }
        default:
            break;
    }
};

/** Is grayscale icons enabled? */
export const checkGrayscaleStatus = (): Promise<boolean> => {
    return helpers.getMaterialIconsJSON().then((config) => config.options.saturation === 0);
};
