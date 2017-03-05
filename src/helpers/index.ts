import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as cmp from 'semver-compare';
import * as opn from 'opn';
import * as i18n from "./../i18n";
import { AdvancedWorkspaceConfiguration } from "../models/AdvancedWorkspaceConfiguration.interface";
import { IconConfiguration } from "../models/IconConfiguration.interface";

/** Get configuration of vs code. */
export const getConfig = (section?: string) =>
    vscode.workspace.getConfiguration(section) as AdvancedWorkspaceConfiguration;

/** Returns the value of a workspace config property. */
// export const getThemeConfig = (config: string): any =>
//     getConfig('material-icon-theme').get(config);

export const getThemeConfig = (section: string) => {
    return getConfig('material-icon-theme').inspect(section);
}

/** Set the config of the theme. */
export const setThemeConfig = (section: string, value: any, global: boolean = false) => {
    getConfig('material-icon-theme').update(section, value, global);
};

/** 
 * Is the theme already activated in the editor configuration? 
 * @param{boolean} global false by default
 */
export const isThemeActivated = (global: boolean = false): boolean => {
    return global ? getConfig().inspect('workbench.iconTheme').globalValue === 'material-icon-theme'
        : getConfig().inspect('workbench.iconTheme').workspaceValue === 'material-icon-theme';
}

/** returns the current version of the icon theme */
export const getCurrentExtensionVersion = (): string =>
    vscode.extensions.getExtension('PKief.material-icon-theme').packageJSON.version;

/** is insider version or not */
export const isInsiderVersion = (): boolean =>
    vscode.env.appName.includes('Insiders');

/** is not supported version */
export const isNotSupportedVersion = (): boolean =>
    cmp(vscode.version, '1.10.0-insider') === -1; // 2nd is bigger than the 1st one == -1

/** user data */
export const getSettingsFilePath = (): string => {
    const appDataPath = (process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local'));
    const codeUserDataPath = path.join(appDataPath, isInsiderVersion() ? 'Code - Insiders' : 'Code', 'User');
    return path.join(codeUserDataPath, 'material-icon-theme.json');
};

/** Return the settings from the userdata */
export const getUserDataSettings = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        fs.readFile(getSettingsFilePath(), 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

/** Update the settings in the userdata. */
export const updateUserDataSettings = (setting: any): Promise<any> => {
    return getUserDataSettings().then((data) => {
        fs.writeFile(getSettingsFilePath(), JSON.stringify({ ...data, ...setting }, null, 2));
    }).catch(() => {
        fs.writeFile(getSettingsFilePath(), JSON.stringify({ ...setting }, null, 2));
    });
};

/** Return the path of the extension in the file system. */
export const getExtensionPath = () => path.join(__dirname, '/../../../');

/** Get the configuration of the icons as JSON Object */
export const getMaterialIconsJSON = (): Promise<IconConfiguration> => {
    return new Promise((resolve, reject) => {
        const iconJSONPath = path.join(getExtensionPath(), 'out', 'src', 'material-icons.json');
        fs.readFile(iconJSONPath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
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
export const reload = () => {
    vscode.commands.executeCommand('workbench.action.reloadWindow');
};