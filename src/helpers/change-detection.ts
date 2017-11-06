import * as helpers from './index';
import * as vscode from 'vscode';
import { createIconFile } from '../icons/index';
import { checkFolderIconsStatus } from '../commands/folders';
import { IconPack, IconJsonOptions, IconAssociations } from '../models/index';

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
        .then(() => compareExplorerArrowConfigs())
        .then(() => compareFileAssociationsConfigs())
        .then(() => compareFolderAssociationsConfigs());
};

const compareIconPackConfigs = () => {
    const activeIconPack = <string>helpers.getThemeConfig('activeIconPack').globalValue;

    return helpers.getMaterialIconsJSON().then(result => {
        if (activeIconPack !== undefined && activeIconPack !== result.options.activatedPack) {
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

const compareFileAssociationsConfigs = () => {
    const filesAssociationsConfig = helpers.getThemeConfig('files.associations').globalValue;

    return helpers.getMaterialIconsJSON().then(result => {
        if (filesAssociationsConfig !== undefined && JSON.stringify(filesAssociationsConfig) !== JSON.stringify(result.options.fileAssociations)) {
            updateIconJson();
        }
    });
};

const compareFolderAssociationsConfigs = () => {
    const foldersAssociationsConfig = helpers.getThemeConfig('folders.associations').globalValue;

    return helpers.getMaterialIconsJSON().then(result => {
        if (foldersAssociationsConfig !== undefined && JSON.stringify(foldersAssociationsConfig) !== JSON.stringify(result.options.folderAssociations)) {
            updateIconJson();
        }
    });
};

const updateIconJson = () => {
    const options: IconJsonOptions = {
        folderTheme: getCurrentFolderTheme(),
        activatedPack: getEnabledIconPacks(),
        hidesExplorerArrows: getCurrentExplorerArrowConfig(),
        fileAssociations: getCurrentFileAssociations(),
        folderAssociations: getCurrentFolderAssociations(),
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

export const getCurrentFileAssociations = (): IconAssociations => {
    const result = <IconAssociations>helpers.getThemeConfig('files.associations').globalValue;
    return result !== undefined ? result : {};
};

export const getCurrentFolderAssociations = (): IconAssociations => {
    const result = <IconAssociations>helpers.getThemeConfig('folders.associations').globalValue;
    return result !== undefined ? result : {};
};
