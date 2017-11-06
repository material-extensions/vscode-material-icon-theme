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
    return helpers.getMaterialIconsJSON()
        .then((json) => {
            compareConfig<string>('activeIconPack', json.options.activatedPack);
            compareConfig<string>('folders.icons', json.options.folderTheme);
            compareConfig<boolean>('hidesExplorerArrows', json.options.hidesExplorerArrows);
            compareConfig<IconAssociations>('files.associations', json.options.fileAssociations);
            compareConfig<IconAssociations>('folders.associations', json.options.folderAssociations);
        });
};

const compareConfig = <T>(config: string, currentState: T): Promise<void> => {
    const configValue = <T>helpers.getThemeConfig(config).globalValue;

    return helpers.getMaterialIconsJSON().then(result => {
        if (configValue !== undefined && JSON.stringify(configValue) !== JSON.stringify(currentState)) {
            updateIconJson();
        }
    });
}

const updateIconJson = () => {
    const options: IconJsonOptions = {
        folderTheme: getCurrentConfig<string>('folders.icons', 'specific'),
        activatedPack: getCurrentConfig<string>('activeIconPack', 'angular'),
        hidesExplorerArrows: getCurrentConfig<boolean>('hidesExplorerArrows', false),
        fileAssociations: getCurrentConfig<IconAssociations>('files.associations', {}),
        folderAssociations: getCurrentConfig<IconAssociations>('folders.associations', {}),
    };
    return createIconFile(options).then(() => {
        helpers.promptToReload();
    }).catch(err => {
        console.error(err);
    });
};

const getCurrentConfig = <T>(config: string, defaultValue: T): T => {
    const result = <T>helpers.getThemeConfig(config).globalValue;
    return result !== undefined ? result : defaultValue;
}
