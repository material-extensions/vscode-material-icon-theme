import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as path from 'path';
import * as fs from 'fs';
import * as i18n from './../i18n';
import * as reload from './../messages/reload';

/** Command to toggle the folder icons. */
export const toggleFolderIcons = () => {
    checkFolderIconsStatus()
        .then(showQuickPickItems)
        .then(handleQuickPickActions);
};

/** Show QuickPick items to select prefered configuration for the folder icons. */
const showQuickPickItems = result => {
    const on: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.on'),
        detail: i18n.translate('folders.enableIcons'),
        label: result ? "\u2611" : "\u2610"
    };
    const off: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.off'),
        detail: i18n.translate('folders.disableIcons'),
        label: !result ? "\u2611" : "\u2610"
    };
    return vscode.window.showQuickPick(
        [on, off], {
            placeHolder: i18n.translate('folders.toggleIcons'),
            ignoreFocusOut: true
        });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = value => {
    if (!value || !value.description) return;
    switch (value.description) {
        case i18n.translate('toggleSwitch.on'): {
            checkFolderIconsStatus().then(result => {
                if (!result) enableFolderIcons();
            });
            break;
        }
        case i18n.translate('toggleSwitch.off'): {
            checkFolderIconsStatus().then(result => {
                if (result) disableFolderIcons();
            });
            break;
        }
        default:
            break;
    }
}

/** Are the folder icons enabled? */
export const checkFolderIconsStatus = (): Promise<boolean> => {
    return helpers.getIconConfiguration().then((config) => {
        if (config.folder === '' && config.folderExpanded === '') {
            return false;
        } else {
            return true;
        }
    });
};


/** Enable folder icons */
export const enableFolderIcons = () => {
    insertFolderIcons().then(() => {
        reload.showConfirmToReloadMessage().then(result => {
            if (result) helpers.reload();
        });
    });
};

/** Disable folder icons */
export const disableFolderIcons = () => {
    deleteFolderIcons().then(() => {
        reload.showConfirmToReloadMessage().then(result => {
            if (result) helpers.reload();
        });
    });
};

/** Add folder icons */
const insertFolderIcons = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getIconConfiguration().then(config => {
        fs.writeFile(iconJSONPath, JSON.stringify({
            ...config,
            folder: "_folder",
            folderExpanded: "_folder_open"
        }));
    });
};

/** Delete folder icons */
const deleteFolderIcons = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getIconConfiguration().then(config => {
        fs.writeFile(iconJSONPath, JSON.stringify({
            ...config,
            folder: "",
            folderExpanded: ""
        }));
    });
};