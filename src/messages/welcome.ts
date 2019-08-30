import * as open from 'open';
import * as vscode from 'vscode';
import { activateIcons } from '../commands/activate';
import * as helpers from './../helpers';
import * as versioning from './../helpers/versioning';
import * as i18n from './../i18n';

/** Show the welcome message if the icon theme has been installed the first time. */
export const showWelcomeMessage = () => {
    // if the user does not want to see the welcome message
    if (helpers.getThemeConfig('showWelcomeMessage').globalValue === false) return;

    vscode.window.showInformationMessage(
        i18n.translate('themeInstalled'),

        // show 'Activate' button if icon theme is not active
        (versioning.checkVersionSupport('1.10.0') && helpers.isThemeNotVisible())
            ? i18n.translate('activate') : i18n.translate('howToActivate'),

        i18n.translate('neverShowAgain')
    ).then(handleWelcomeMessageActions);
};

/** Handle the actions of the welcome message. */
const handleWelcomeMessageActions = (value) => {
    switch (value) {
        case i18n.translate('activate'):
            activateIcons();
            break;

        case i18n.translate('howToActivate'):
            open('https://code.visualstudio.com/blogs/2016/09/08/icon-themes#_file-icon-themes');
            break;

        case i18n.translate('neverShowAgain'):
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
