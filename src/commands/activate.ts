import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as opn from 'opn';
import * as i18n from './../i18n';
import * as outdatedMessage from './../messages/outdated';

/** Activate the icon theme by changing the settings for the iconTheme. */
export const activateIconTheme = () => {
    if (helpers.isNotSupportedVersion()) {
        outdatedMessage.showOutdatedMessage();
        return;
    }
    return setIconTheme();
};

/** Set the icon theme in the config. */
const setIconTheme = () => {
    // global user config
    return helpers.getConfig().update('workbench.iconTheme', 'material-icon-theme', true)
        .then(() => {
            // local workspace config            
            helpers.getConfig().update('workbench.iconTheme', 'material-icon-theme');
            vscode.window.showInformationMessage(i18n.translate('activated'));
        });
};