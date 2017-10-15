import * as helpers from './../helpers';
import * as versioning from './../helpers/versioning';
import * as vscode from 'vscode';
import * as opn from 'opn';
import * as i18n from './../i18n';
import { activateIconTheme } from '../commands/activate';

/** Show the welcome message if the icon theme has been installed the first time. */
export const showWelcomeMessage = () => {
    // if the user does not want to see the welcome message
    if (helpers.getThemeConfig('showWelcomeMessage').globalValue === false) return;

    vscode.window.showInformationMessage(
        i18n.instant('themeInstalled'),

        // show 'Activate' button if icon theme is not active
        (!versioning.isNotSupportedVersion() && helpers.isThemeNotVisible())
            ? i18n.instant('activate') : i18n.instant('howToActivate'),

        i18n.instant('neverShowAgain')
    ).then(handleWelcomeMessageActions);
};

/** Handle the actions of the welcome message. */
const handleWelcomeMessageActions = (value) => {
    switch (value) {
        case i18n.instant('activate'):
            activateIconTheme();
            break;

        case i18n.instant('howToActivate'):
            opn('https://code.visualstudio.com/blogs/2016/09/08/icon-themes#_file-icon-themes');
            break;

        case i18n.instant('neverShowAgain'):
            disableWelcomeMessage();
            break;

        default:
            break;
    }
};

/** Disable the welcome messages in the global settings */
const disableWelcomeMessage = () => {
    helpers.setThemeConfig('showWelcomeMessage', false, true);
};
