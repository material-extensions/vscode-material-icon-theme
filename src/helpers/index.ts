import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as reloadMessages from './../messages/reload';
import { AdvancedWorkspaceConfiguration } from "../models/AdvancedWorkspaceConfiguration.interface";
import { IconConfiguration } from "../models/IconConfiguration.interface";

/** Get configuration of vs code. */
export const getConfig = (section?: string) => {
    return vscode.workspace.getConfiguration(section) as AdvancedWorkspaceConfiguration;
};

/** Update configuration of vs code. */
export const setConfig = (section: string, value: any, global: boolean = false) => {
    return getConfig().update(section, value, global);
};

export const getThemeConfig = (section: string) => {
    return getConfig('material-icon-theme').inspect(section);
};

/** Is a folder opened? */
export const hasWorkspace = (): boolean => {
    return vscode.workspace.rootPath !== undefined;
};

/** Set the config of the theme. */
export const setThemeConfig = (section: string, value: any, global: boolean = false) => {
    return getConfig('material-icon-theme').update(section, value, global);
};

/**
 * Is the theme already activated in the editor configuration?
 * @param{boolean} global false by default
 */
export const isThemeActivated = (global: boolean = false): boolean => {
    return global ? getConfig().inspect('workbench.iconTheme').globalValue === 'material-icon-theme'
        : getConfig().inspect('workbench.iconTheme').workspaceValue === 'material-icon-theme';
};

/** Is the theme not visible for the user? */
export const isThemeNotVisible = (): boolean => {
    const config = getConfig().inspect('workbench.iconTheme');
    return (!isThemeActivated(true) && config.workspaceValue === undefined) || // no workspace and not global
        (!isThemeActivated() && config.workspaceValue !== undefined);
};

/** Return the path of the extension in the file system. */
export const getExtensionPath = () => path.join(__dirname, '..', '..', '..');

/** Get the configuration of the icons as JSON Object */
export const getMaterialIconsJSON = (): Promise<IconConfiguration> => {
    return new Promise((resolve, reject) => {
        const iconJSONPath = path.join(getExtensionPath(), 'out', 'src', 'material-icons.json');
        fs.readFile(iconJSONPath, 'utf8', (err, data) => {
            if (data) {
                resolve(JSON.parse(data));
            } else {
                reject(err);
            }
        });
    });
};

/** Method for removing file extensions by extension name */
export const removeIconExtensions = (config: IconConfiguration, fileExtensionName: string) => {
    const fileExtensions = config.fileExtensions;
    // iterate each key of the extensions object
    for (let propName in fileExtensions) {
        // if the extension includes the given name the key will be deleted
        if (fileExtensions[propName].includes(fileExtensionName)) {
            delete fileExtensions[propName];
        }
    }
    // return the new config object
    return { ...config, fileExtensions };
};

/** Reload vs code window */
export const promptToReload = () => {
    reloadMessages.showConfirmToReloadMessage().then(result => {
        if (result) reloadWindow();
    });
};

const reloadWindow = () => {
    return vscode.commands.executeCommand('workbench.action.reloadWindow');
};