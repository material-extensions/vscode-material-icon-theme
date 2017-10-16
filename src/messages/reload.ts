import * as vscode from 'vscode';
import * as i18n from './../i18n';

/** User has to confirm if he wants to reload the editor */
export const showConfirmToReloadMessage = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        vscode.window.showInformationMessage(
            i18n.translate('confirmReload'),
            i18n.translate('reload')
        ).then(value => {
            if (value === i18n.translate('reload')) resolve(true);
            else resolve(false);
        });
    });
};
