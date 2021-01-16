import * as semver from 'semver';
import * as vscode from 'vscode';
import * as helpers from './index';

export const versionKey = 'material-icon-theme.version';

export enum ThemeStatus {
  neverUsedBefore,
  updated,
  current,
}

/**
 * Check the current status of the theme
 * @param state Global state of context (Memento API)
 */
export const checkThemeStatus = async (state: vscode.Memento) => {
  try {
    // get the version from the state
    const stateVersion = state.get(versionKey);
    const packageVersion = getCurrentExtensionVersion();

    // check if the theme was used before
    if (
      stateVersion === undefined ||
      !(
        stateVersion instanceof semver.SemVer ||
        typeof stateVersion === 'string'
      )
    ) {
      await updateExtensionVersionInMemento(state);
      return themeIsAlreadyActivated()
        ? ThemeStatus.updated
        : ThemeStatus.neverUsedBefore;
    }
    // compare the version in the state with the package version
    else if (semver.lt(stateVersion, packageVersion)) {
      await updateExtensionVersionInMemento(state);
      return ThemeStatus.updated;
    } else {
      return ThemeStatus.current;
    }
  } catch (error) {
    console.error(error);
  }
};

/** Check if the theme was used before */
const themeIsAlreadyActivated = () => {
  return helpers.isThemeActivated() || helpers.isThemeActivated(true);
};

/** Update the version number to the current version in the memento. */
const updateExtensionVersionInMemento = (state: vscode.Memento) => {
  return state.update(versionKey, getCurrentExtensionVersion());
};

/** Get the current version of the extension */
const getCurrentExtensionVersion = (): string => {
  return vscode.extensions.getExtension('PKief.material-icon-theme').packageJSON
    .version;
};

/**
 * Check if the current version of VS Code
 * supports new features.
 */
export const checkVersionSupport = (supportedVersion: string): boolean => {
  return !semver.lt(vscode.version, supportedVersion);
};
