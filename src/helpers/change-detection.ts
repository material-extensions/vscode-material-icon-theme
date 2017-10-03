import * as helpers from './index';
import * as vscode from 'vscode';
import { createIconFile } from '../icons/index';
import { checkAngularIconsStatus } from '../commands/angular';
import { checkFolderIconsStatus } from '../commands/folders';
import { FolderType, IconGroup, ManifestOptions } from '../models/index';

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
            updateIconManifest();
        }
    });
};

const compareFolderConfigs = () => {
    const folderIconsConfig = helpers.getThemeConfig('folders.icons');

    return checkFolderIconsStatus().then(result => {
        if (folderIconsConfig.globalValue !== undefined && folderIconsConfig.globalValue !== result) {
            updateIconManifest();
        }
    });
};

const updateIconManifest = () => {
    const options: ManifestOptions = {
        folderTheme: getCurrentFolderTheme(),
        activatedGroups: {
            [IconGroup.Angular]: getAngularIconsEnabled()
        }
    };
    createIconFile(options);
    helpers.promptToReload();
};

export const getCurrentFolderTheme = (): FolderType => {
    return <FolderType>helpers.getThemeConfig('folders.icons').globalValue;
};

export const getAngularIconsEnabled = (): boolean => {
    return <boolean>helpers.getThemeConfig('angular.iconsEnabled').globalValue;
};
