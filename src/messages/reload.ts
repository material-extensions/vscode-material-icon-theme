import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as i18n from './../i18n';

/** User has to confirm if he wants to reload the editor */
export const showConfirmToReloadMessage = async (): Promise<boolean> => {
    // if the user does not want to see the reload message
    if (helpers.getThemeConfig('showReloadMessage').globalValue === false) return;

    const response = await vscode.window.showInformationMessage(
        i18n.translate('confirmReload'),
        i18n.translate('reload'),
        i18n.translate('neverShowAgain')
    );

    switch (response) {
        case i18n.translate('reload'):
            return true;

        case i18n.translate('neverShowAgain'):
            disableReloadMessage();
            return false;

        default:
            return false;
    }
};

/** Disable the reload message in the global settings */
const disableReloadMessage = () => {
    helpers.setThemeConfig('showReloadMessage', false, true);
};
