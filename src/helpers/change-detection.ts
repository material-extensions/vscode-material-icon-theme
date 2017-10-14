import * as helpers from './index';
import * as vscode from 'vscode';
import { createIconFile } from '../icons/index';
import { checkAngularIconsStatus } from '../commands/angular';
import { checkFolderIconsStatus } from '../commands/folders';
import { IconGroup, IconJsonOptions } from '../models/index';

/** Watch for changes in the configurations to update the icons theme. */
export const watchForConfigChanges = () => {
    vscode.workspace.onDidChangeConfiguration(detectConfigChanges);
};

/**
 * Compare the workspace and the user configurations
 * with the current setup of the icons.
*/
export const detectConfigChanges = () => {
    return Promise.resolve()
        .then(() => compareAngularConfigs())
        .then(() => compareFolderConfigs());
};

const compareAngularConfigs = () => {
    const angularIconsConfig = helpers.getThemeConfig('angular.iconsEnabled');

    return checkAngularIconsStatus().then(result => {
        if (angularIconsConfig.globalValue !== undefined && angularIconsConfig.globalValue !== result) {
            updateIconJson();
        }
    });
};

const compareFolderConfigs = () => {
    const folderIconsConfig = helpers.getThemeConfig('folders.icons');

    return checkFolderIconsStatus().then(result => {
        if (folderIconsConfig.globalValue !== undefined && folderIconsConfig.globalValue !== result) {
            updateIconJson();
        }
    });
};

const updateIconJson = () => {
    const options: IconJsonOptions = {
        folderTheme: getCurrentFolderTheme(),
        activatedGroups: {
            [IconGroup.Angular]: getAngularIconsEnabled()
        }
    };
    return createIconFile(options).then(() => {
        helpers.promptToReload();
    }).catch(err => {
        console.error(err);
    });
};

export const getCurrentFolderTheme = (): string => {
    return <string>helpers.getThemeConfig('folders.icons').globalValue;
};

export const getAngularIconsEnabled = (): boolean => {
    return <boolean>helpers.getThemeConfig('angular.iconsEnabled').globalValue;
};
