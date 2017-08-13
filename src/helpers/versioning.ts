import * as vscode from 'vscode';
import * as helpers from './index';
import * as semver from 'semver';

export enum ThemeStatus {
    neverUsedBefore,
    updated,
    current
}

/** Check the current status of the theme */
export const checkThemeStatus = async (state: vscode.Memento) => {
    try {
        // get the version from the storage
        const stateVersion = await state.get('material-icon-theme.version');
        const packageVersion = getCurrentExtensionVersion();

        // check if the theme was used before
        if (stateVersion === undefined && !themeIsAlreadyConfigured()) {
            await updateExtensionVersionInMemento(state);
            return ThemeStatus.neverUsedBefore;
        }
        // compare the version in the storage with the package version
        else if (semver.lt(stateVersion, packageVersion)) {
            await updateExtensionVersionInMemento(state);
            return ThemeStatus.updated;
        }
        else {
            return ThemeStatus.current;
        }
    }
    catch (err) {
        console.log(err);
    }
};

/** Check if the theme was used before */
const themeIsAlreadyConfigured = () => {
    return helpers.isThemeConfigured() || helpers.isThemeConfigured(true);
};

/** Update the version number to the current version in the memento. */
const updateExtensionVersionInMemento = async (state: vscode.Memento) => {
    return await state.update('material-icon-theme.version', getCurrentExtensionVersion());
};

/** Get the current version of the extension */
const getCurrentExtensionVersion = (): string => {
    return vscode.extensions.getExtension('PKief.material-icon-theme').packageJSON.version;
};

/**
 * Check if the current version of VS Code
 * supports theme activation in the settings.
 * This was implemented in VS Code 1.10.0.
*/
export const isNotSupportedVersion = (): boolean => {
    return semver.lt(vscode.version, '1.10.0');
};