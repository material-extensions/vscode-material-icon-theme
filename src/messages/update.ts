import * as helpers from './../helpers';
import * as versioning from './../helpers/versioning';
import * as vscode from 'vscode';
import * as opn from 'opn';
import * as i18n from './../i18n';
import { activateIconTheme } from '../commands/activate';

/** Show the update message if the icon theme has been updated. */
export const showUpdateMessage = () => {
    // if the user does not want to see the update message
    if (helpers.getThemeConfig('showUpdateMessage').globalValue === false) return;

    const config = helpers.getConfig().inspect('workbench.iconTheme');

    vscode.window.showInformationMessage(
        i18n.translate('themeUpdated'),

        // show 'Activate' button if icon theme is not active
        (versioning.checkVersionSupport('1.10.0') && helpers.isThemeNotVisible())
            ? i18n.translate('activate') : undefined,

        i18n.translate('readChangelog'),
        i18n.translate('neverShowAgain')
    ).then(handleUpdateMessageActions);
};

/** Handle the actions of the update message. */
const handleUpdateMessageActions = (value) => {
    switch (value) {
        case i18n.translate('activate'):
            activateIconTheme();
            break;

        case i18n.translate('readChangelog'):
            opn('https://marketplace.visualstudio.com/items/PKief.material-icon-theme/changelog');
            break;

        case i18n.translate('neverShowAgain'):
            disableUpdateMessage();
            break;

        default:
            break;
    }
};

/** Disable the update messages in the global settings */
const disableUpdateMessage = () => {
    helpers.setThemeConfig('showUpdateMessage', false, true);
};
