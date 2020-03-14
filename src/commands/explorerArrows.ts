import * as vscode from 'vscode';
import * as helpers from '../helpers';
import * as i18n from '../i18n';

/** Command to toggle the explorer arrows. */
export const toggleExplorerArrows = async () => {
    try {
        const status = checkArrowStatus();
        const response = await showQuickPickItems(status);
        return handleQuickPickActions(response);
    } catch (error) {
        console.error(error);
    }
};

/** Show QuickPick items to select preferred configuration for the explorer arrows. */
const showQuickPickItems = (status: boolean) => {
    const on: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.on'),
        detail: i18n.translate('explorerArrows.enable'),
        label: !status ? '\u2714' : '\u25FB'
    };
    const off: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.off'),
        detail: i18n.translate('explorerArrows.disable'),
        label: status ? '\u2714' : '\u25FB'
    };
    return vscode.window.showQuickPick([on, off], {
        placeHolder: i18n.translate('explorerArrows.toggle'),
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
