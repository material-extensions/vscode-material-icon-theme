import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as versioning from './../helpers/versioning';
import * as i18n from './../i18n';
import * as outdatedMessage from './../messages/outdated';

/** Activate the icon theme by changing the settings for the iconTheme. */
export const activateIcons = () => {
    if (!versioning.checkVersionSupport('1.10.0')) {
        outdatedMessage.showOutdatedMessage();
        console.error('Outdated version of vscode!');
    }
    return setIconTheme();
};

/** Set the icon theme in the config. */
const setIconTheme = async () => {
    // global user config
    try {
        await helpers.getConfig().update('workbench.iconTheme', 'material-icon-theme', true);

        // local workspace config
        if (helpers.getConfig().inspect('workbench.iconTheme').workspaceValue !== undefined) {
            helpers.getConfig().update('workbench.iconTheme', 'material-icon-theme');
        }
        vscode.window.showInformationMessage(i18n.translate('activated'));
    } catch (error) {
        console.error(error);
    }
};
