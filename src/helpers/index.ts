import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { iconJsonName } from '../icons/index';
import { AdvancedWorkspaceConfiguration } from '../models';
import { IconConfiguration } from '../models/index';
import * as reloadMessages from './../messages/reload';

/** Get configuration of vs code. */
export const getConfig = (section?: string) => {
    return vscode.workspace.getConfiguration(section) as AdvancedWorkspaceConfiguration;
};

/** Get list of configuration entries of package.json */
export const getConfigProperties = (): { [config: string]: any } => {
    return vscode.extensions.getExtension('PKief.material-icon-theme').packageJSON.contributes.configuration.properties;
};

/** Update configuration of vs code. */
export const setConfig = (section: string, value: any, global: boolean = false) => {
    return getConfig().update(section, value, global);
};

export const getThemeConfig = (section: string) => {
    return getConfig('material-icon-theme').inspect(section);
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
export const getExtensionPath = () => vscode.extensions.getExtension('PKief.material-icon-theme').extensionPath;

/** Get the configuration of the icons as JSON Object */
export const getMaterialIconsJSON = (): IconConfiguration => {
    const iconJSONPath = path.join(getExtensionPath(), 'dist', iconJsonName);

    try {
        const data = fs.readFileSync(iconJSONPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

/** Reload vs code window */
export const promptToReload = () => {
    return reloadMessages.showConfirmToReloadMessage().then(result => {
        if (result) reloadWindow();
    });
};

const reloadWindow = () => {
    return vscode.commands.executeCommand('workbench.action.reloadWindow');
};

/** Capitalize the first letter of a string */
export const capitalizeFirstLetter = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);

/** TitleCase all words in a string */
export const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};
