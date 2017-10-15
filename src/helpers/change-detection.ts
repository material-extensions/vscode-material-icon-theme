import * as helpers from './index';
import * as vscode from 'vscode';
import { createIconFile } from '../icons/index';
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
        .then(() => compareIconGroupConfigs())
        .then(() => compareFolderConfigs());
};

const compareIconGroupConfigs = () => {
    const activeIconGroups = <string[]>helpers.getThemeConfig('activeIconGroups').globalValue;

    return helpers.getMaterialIconsJSON().then(result => {
        if (activeIconGroups !== undefined && JSON.stringify(activeIconGroups) !== JSON.stringify(result.options.activatedGroups)) {
            updateIconJson();
        }
    });
};

const compareFolderConfigs = () => {
    const folderIconsConfig = helpers.getThemeConfig('folders.icons').globalValue;

    return helpers.getMaterialIconsJSON().then(result => {
        if (folderIconsConfig !== undefined && folderIconsConfig !== result.options.folderTheme) {
            updateIconJson();
        }
    });
};

const updateIconJson = () => {
    const options: IconJsonOptions = {
        folderTheme: getCurrentFolderTheme(),
        activatedGroups: getEnabledIconGroups()
    };
    return createIconFile(options).then(() => {
        helpers.promptToReload();
    }).catch(err => {
        console.error(err);
    });
};

export const getCurrentFolderTheme = (): string => {
    const result = <string>helpers.getThemeConfig('folders.icons').globalValue;
    return result !== undefined ? result : 'specific';
};

export const getEnabledIconGroups = (): string[] => {
    const result = <string[]>helpers.getThemeConfig('activeIconGroups').globalValue;
    return result !== undefined ? result : ['angular'];
};
