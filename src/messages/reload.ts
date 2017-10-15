import * as vscode from 'vscode';
import * as i18n from './../i18n';

/** User has to confirm if he wants to reload the editor */
export const showConfirmToReloadMessage = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        vscode.window.showInformationMessage(
            i18n.instant('confirmReload'),
            i18n.instant('reload')
        ).then(value => {
            if (value === i18n.instant('reload')) resolve(true);
            else resolve(false);
        });
    });
};
