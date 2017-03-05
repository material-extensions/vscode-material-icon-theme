import * as helpers from './index';
import * as vscode from 'vscode';
import { checkAngularIconsStatus, enableAngularIcons, disableAngularIcons } from "../commands/angular";
import { enableFolderIcons, disableFolderIcons } from "../commands/folders";

/** Store the latest version number in the user data settings. */
export const updateVersionInUserDataSettings = () => {
    const setting = {
        version: helpers.getCurrentExtensionVersion(),
    };
    helpers.updateUserDataSettings(setting);
};

/** Initialize the user data settings. */
export const initUserDataSettings = () => {
    const setting = {
        name: 'material-icon-theme',
        version: helpers.getCurrentExtensionVersion()
    };
    helpers.updateUserDataSettings(setting);
};

/** 
 * Compare the workspace and the user configurations
 * with the current setup of the icons.
*/
export const configChangeDetection = () => {
    compareAngularConfigs();
    compareFolderConfigs();
};

/** Watch for changes in the configurations to update the icons theme. */
export const watchForConfigChanges = () => {
    vscode.workspace.onDidChangeConfiguration(configChangeDetection);
}

const compareAngularConfigs = () => {
    const angularIconsConfig = helpers.getThemeConfig('angular.iconsEnabled');

    if (angularIconsConfig.workspaceValue === true || angularIconsConfig.globalValue === true) {
        checkAngularIconsStatus().then(result => {
            if (!result) enableAngularIcons();
        });
    } else if (
        (angularIconsConfig.workspaceValue === false && angularIconsConfig.globalValue === false) ||
        (angularIconsConfig.workspaceValue === undefined && angularIconsConfig.globalValue === false) ||
        (angularIconsConfig.workspaceValue === false && angularIconsConfig.globalValue === undefined)) {
        checkAngularIconsStatus().then(result => {
            if (result) disableAngularIcons();
        });
    }
};

const compareFolderConfigs = () => {
    const folderIconsConfig = helpers.getThemeConfig('folders.iconsEnabled');

    if (folderIconsConfig.workspaceValue === true || folderIconsConfig.globalValue === true) {
        checkAngularIconsStatus().then(result => {
            if (!result) enableFolderIcons();
        });
    } else if (
        (folderIconsConfig.workspaceValue === false && folderIconsConfig.globalValue === false) ||
        (folderIconsConfig.workspaceValue === undefined && folderIconsConfig.globalValue === false) ||
        (folderIconsConfig.workspaceValue === false && folderIconsConfig.globalValue === undefined)) {
        checkAngularIconsStatus().then(result => {
            if (result) disableFolderIcons();
        });
    }
};