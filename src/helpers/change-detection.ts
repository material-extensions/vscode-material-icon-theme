import * as helpers from './index';
import * as vscode from 'vscode';
import { createIconFile } from '../icons/index';
import { checkAngularIconsStatus } from '../commands/angular';
import { checkFolderIconsStatus } from '../commands/folders';

/** Watch for changes in the configurations to update the icons theme. */
export const watchForConfigChanges = () => {
    vscode.workspace.onDidChangeConfiguration(configChangeDetection);
};

/**
 * Compare the workspace and the user configurations
 * with the current setup of the icons.
*/
export const configChangeDetection = () => {
    return Promise.resolve()
        .then(() => compareAngularConfigs())
        .then(() => compareFolderConfigs());
};

const compareAngularConfigs = () => {
    const angularIconsConfig = helpers.getThemeConfig('angular.iconsEnabled');

    return checkAngularIconsStatus().then(result => {
        if (angularIconsConfig.globalValue !== result) {
            createIconFile();
        }
    });
};

const compareFolderConfigs = () => {
    const folderIconsConfig = helpers.getThemeConfig('folders.icons');

    return checkFolderIconsStatus().then(result => {
        if (folderIconsConfig.globalValue !== undefined && folderIconsConfig.globalValue !== result) {
            createIconFile();
        }
    });
};
