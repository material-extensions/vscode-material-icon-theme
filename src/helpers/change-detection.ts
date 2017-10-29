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
        .then(() => compareFolderConfigs())
        .then(() => compareExplorerArrowConfigs());
};

const compareIconPackConfigs = () => {
    const activeIconPack = <string[]>helpers.getThemeConfig('activeIconPack').globalValue;

    return helpers.getMaterialIconsJSON().then(result => {
        if (activeIconPack !== undefined && JSON.stringify(activeIconPack) !== JSON.stringify(result.options.activatedPack)) {
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

const compareExplorerArrowConfigs = () => {
    const arrowConfig = helpers.getThemeConfig('hidesExplorerArrows').globalValue;

    return helpers.getMaterialIconsJSON().then(result => {
        if (arrowConfig !== undefined && arrowConfig !== result.hidesExplorerArrows) {
            updateIconJson();
        }
    });
};

const updateIconJson = () => {
    const options: IconJsonOptions = {
        folderTheme: getCurrentFolderTheme(),
        activatedPack: getEnabledIconPacks(),
        hidesExplorerArrows: getCurrentExplorerArrowConfig()
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

export const getCurrentExplorerArrowConfig = (): boolean => {
    const result = <boolean>helpers.getThemeConfig('hidesExplorerArrows').globalValue;
    return result !== undefined ? result : false;
};

export const getEnabledIconPacks = (): string => {
    const result = <string>helpers.getThemeConfig('activeIconPack').globalValue;
    return result !== undefined ? result : 'angular';
};
