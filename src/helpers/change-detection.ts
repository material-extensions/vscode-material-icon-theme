import * as helpers from './index';
import * as vscode from 'vscode';
import { createIconFile } from '../icons/index';
import { checkFolderIconsStatus } from '../commands/folders';
import { IconPack, IconJsonOptions } from '../models/index';

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
        .then(() => compareIconPackConfigs())
        .then(() => compareFolderConfigs());
};

const compareIconPackConfigs = () => {
    const activeIconPacks = <string[]>helpers.getThemeConfig('activeIconPacks').globalValue;

    return helpers.getMaterialIconsJSON().then(result => {
        if (activeIconPacks !== undefined && JSON.stringify(activeIconPacks) !== JSON.stringify(result.options.activatedPacks)) {
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
        activatedPacks: getEnabledIconPacks()
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

export const getEnabledIconPacks = (): string[] => {
    const result = <string[]>helpers.getThemeConfig('activeIconPacks').globalValue;
    return result !== undefined ? result : ['angular'];
};
