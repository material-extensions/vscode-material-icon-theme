import * as helpers from './index';
import * as vscode from 'vscode';
import { checkAngularIconsStatus, enableAngularIcons, disableAngularIcons } from '../commands/angular';
import { checkFolderIconsStatus } from '../commands/folders';
import { disableFolderIcons } from '../commands/folders/folders-none';
import { enableClassicFolderIcons } from '../commands/folders/folders-classic';
import { enableSpecificFolderIcons } from '../commands/folders/folders-specific';
import { enableBlueFolderIcons } from '../commands/folders/folders-blue';

/** Watch for changes in the configurations to update the icons theme. */
export const watchForConfigChanges = () => {
    vscode.workspace.onDidChangeConfiguration(configChangeDetection);
};

/**
 * Compare the workspace and the user configurations
 * with the current setup of the icons.
*/
export const configChangeDetection = (disposable?) => {
    return compareAngularConfigs()
        .then(() => compareFolderConfigs());
};

const compareAngularConfigs = () => {
    const angularIconsConfig = helpers.getThemeConfig('angular.iconsEnabled');

    return checkAngularIconsStatus().then(result => {
        // if the settings are different to the current material-icons.json file
        if (angularIconsConfig.globalValue !== result) {
            if (angularIconsConfig.globalValue === true) {
                enableAngularIcons();
            } else if (angularIconsConfig.globalValue === false) {
                disableAngularIcons();
            }
        }
    });
};

const compareFolderConfigs = () => {
    const folderIconsConfig = helpers.getThemeConfig('folders.icons');

    return checkFolderIconsStatus().then(result => {
        // if the settings are different to the current material-icons.json file
        if (folderIconsConfig.globalValue !== undefined && folderIconsConfig.globalValue !== result) {
            if (folderIconsConfig.globalValue === 'none') {
                disableFolderIcons();
            } else if (folderIconsConfig.globalValue === 'classic') {
                enableClassicFolderIcons();
            } else if (folderIconsConfig.globalValue === 'specific') {
                enableSpecificFolderIcons();
            } else if (folderIconsConfig.globalValue === 'blue') {
                enableBlueFolderIcons();
            }
        }
    });
};