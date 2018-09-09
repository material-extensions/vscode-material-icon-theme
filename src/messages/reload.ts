import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as i18n from './../i18n';

/** User has to confirm if he wants to reload the editor */
export const showConfirmToReloadMessage = (): Promise<boolean> => {
    return new Promise((resolve) => {
        // if the user does not want to see the reload message
        if (helpers.getThemeConfig('showReloadMessage').globalValue === false) return;

        vscode.window.showInformationMessage(
            i18n.translate('confirmReload'),
            i18n.translate('reload'),
            i18n.translate('neverShowAgain')
        ).then(value => {
            switch (value) {
                case i18n.translate('reload'):
                    resolve(true);
                    break;

                case i18n.translate('neverShowAgain'):
                    disableReloadMessage();
                    resolve(false);
                    break;

                default:
                    resolve(false);
                    break;
            }
        });
    });
};

/** Disable the reload message in the global settings */
const disableReloadMessage = () => {
    helpers.setThemeConfig('showReloadMessage', false, true);
};
