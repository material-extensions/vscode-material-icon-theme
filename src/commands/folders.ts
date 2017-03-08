import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as path from 'path';
import * as fs from 'fs';
import * as i18n from './../i18n';
import * as reload from './../messages/reload';
import { IconConfiguration } from "../models/IconConfiguration.interface";

/** Command to toggle the folder icons. */
export const toggleFolderIcons = () => {
    return checkFolderIconsStatus()
        .then(showQuickPickItems)
        .then(handleQuickPickActions);
};

/** Show QuickPick items to select prefered configuration for the folder icons. */
const showQuickPickItems = isEnabled => {
    const on: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.on'),
        detail: i18n.translate('folders.enableIcons'),
        label: isEnabled ? "\u2714" : "\u25FB"
    };
    const off: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.off'),
        detail: i18n.translate('folders.disableIcons'),
        label: !isEnabled ? "\u2714" : "\u25FB"
    };
    return vscode.window.showQuickPick(
        [on, off], {
            placeHolder: i18n.translate('folders.toggleIcons'),
            ignoreFocusOut: false
        });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = value => {
    if (!value || !value.description) return;
    switch (value.description) {
        case i18n.translate('toggleSwitch.on'): {
            checkFolderIconsStatus().then(result => {
                if (!result) {
                    helpers.setThemeConfig('folders.iconsEnabled', true, true);
                }
            });
            break;
        }
        case i18n.translate('toggleSwitch.off'): {
            checkFolderIconsStatus().then(result => {
                if (result) {
                    helpers.setThemeConfig('folders.iconsEnabled', false, true);
                }
            });
            break;
        }
        default:
            break;
    }
};

/** Are the folder icons enabled? */
export const checkFolderIconsStatus = (): Promise<boolean> => {
    return helpers.getMaterialIconsJSON().then((config) => {
        if (config.folder === '' && config.folderExpanded === '') {
            return false;
        } else {
            return true;
        }
    });
};


/** Enable folder icons */
export const enableFolderIcons = () => {
    return insertFolderIcons().then(() => {
        reload.showConfirmToReloadMessage().then(result => {
            if (result) helpers.reload();
        });
    });
};

/** Disable folder icons */
export const disableFolderIcons = () => {
    return deleteFolderIcons().then(() => {
        reload.showConfirmToReloadMessage().then(result => {
            if (result) helpers.reload();
        });
    });
};

/** Add folder icons */
const insertFolderIcons = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getMaterialIconsJSON().then(config => {
        fs.writeFileSync(iconJSONPath, JSON.stringify(createConfigWithFolders(config), null, 2));
    });
};

export const createConfigWithFolders = (config: IconConfiguration) => {
    return {
        ...config,
        folder: "_folder",
        folderExpanded: "_folder_open"
    };
};

/** Delete folder icons */
const deleteFolderIcons = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getMaterialIconsJSON().then(config => {
        fs.writeFileSync(iconJSONPath, JSON.stringify(createConfigWithoutFolders(config), null, 2));
    });
};

export const createConfigWithoutFolders = (config: IconConfiguration) => {
    return {
        ...config,
        folder: "",
        folderExpanded: ""
    };
};