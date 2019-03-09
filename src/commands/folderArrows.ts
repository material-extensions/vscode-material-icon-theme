import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as versioning from './../helpers/versioning';
import * as i18n from './../i18n';
import * as outdatedMessage from './../messages/outdated';

/** Command to toggle the folder icons. */
export const toggleFolderArrows = async () => {
    if (!versioning.checkVersionSupport('1.18.0-insider')) {
        outdatedMessage.showOutdatedMessage();
        return Promise.reject('Outdated version of vscode!');
    }
    try {
        const status = checkArrowStatus();
        const response = await showQuickPickItems(status);
        return handleQuickPickActions(response);
    } catch (error) {
        console.error(error);
    }
};

/** Show QuickPick items to select preferred configuration for the folder icons. */
const showQuickPickItems = (status: boolean) => {
    const on: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.on'),
        detail: i18n.translate(`hidesExplorerArrows.enableArrows`),
        label: !status ? '\u2714' : '\u25FB'
    };
    const off: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.off'),
        detail: i18n.translate(`hidesExplorerArrows.disableArrows`),
        label: status ? '\u2714' : '\u25FB'
    };
    return vscode.window.showQuickPick(
        [on, off], {
            placeHolder: i18n.translate('hidesExplorerArrows.toggleArrows'),
            ignoreFocusOut: false,
            matchOnDescription: true
        });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: vscode.QuickPickItem) => {
    if (!value || !value.description) return;
    switch (value.description) {
        case i18n.translate('toggleSwitch.on'): {
            return helpers.setThemeConfig('hidesExplorerArrows', false, true);
        }
        case i18n.translate('toggleSwitch.off'): {
            return helpers.setThemeConfig('hidesExplorerArrows', true, true);
        }
        default:
            return;
    }
};

/** Are the arrows enabled? */
export const checkArrowStatus = (): boolean => {
    return helpers.getMaterialIconsJSON().hidesExplorerArrows;
};
