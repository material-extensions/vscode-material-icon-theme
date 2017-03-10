import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as cmp from 'semver-compare';
import * as opn from 'opn';
import * as os from 'os';
import * as i18n from "./../i18n";
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
export const isThemeConfigured = (global: boolean = false): boolean => {
    return global ? getConfig().inspect('workbench.iconTheme').globalValue === 'material-icon-theme'
        : getConfig().inspect('workbench.iconTheme').workspaceValue === 'material-icon-theme';
};

/** Is the theme not visible for the user? */
export const isThemeNotVisible = (): boolean => {
    const config = getConfig().inspect('workbench.iconTheme');
    return (!isThemeConfigured(true) && config.workspaceValue === undefined) || // no workspace and not global
        (!isThemeConfigured() && config.workspaceValue !== undefined);
};

/** returns the current version of the icon theme */
export const getCurrentExtensionVersion = (): string => {
    return vscode.extensions.getExtension('PKief.material-icon-theme').packageJSON.version;
};

/** is insider version or not */
export const isInsiderVersion = (): boolean => {
    return vscode.env.appName.includes('Insiders');
};

/** is not supported version */
export const isNotSupportedVersion = (): boolean => {
    return cmp(vscode.version, '1.10.0') === -1; // 2nd is bigger than the 1st one == -1
};

/** user data */
export const getSettingsFilePath = (): string => {
    const codeUserDataPath = path.join(getOSspecifigAppDirPath(), isInsiderVersion() ? 'Code - Insiders' : 'Code', 'User');
    return path.join(codeUserDataPath, 'material-icon-theme.json');
};

const getOSspecifigAppDirPath = () => {
    switch (process.platform) {
        case 'win32':
            return process.env.APPDATA;

        case 'darwin':
            return `${process.env.HOME}/Library/Application Support`;

        case 'linux':
            return `${os.homedir()}/.config`;

        default:
            return '/var/local/';
    }
};

/** Return the settings from the userdata */
export const getUserDataSettings = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        fs.readFile(getSettingsFilePath(), 'utf8', (err, data) => {
            if (data) {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            } else {
                reject(err);
            }
        });
    });
};

/** Update the settings in the userdata. */
export const writeUserDataSettings = (setting: any): Promise<any> => {
    return getUserDataSettings().then((data) => {
        fs.writeFileSync(getSettingsFilePath(), JSON.stringify({ ...data, ...setting }, null, 2));
    }).catch(() => {
        fs.writeFileSync(getSettingsFilePath(), JSON.stringify({ ...setting }, null, 2));
    });
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
export const reload = () => {
    return vscode.commands.executeCommand('workbench.action.reloadWindow');
};