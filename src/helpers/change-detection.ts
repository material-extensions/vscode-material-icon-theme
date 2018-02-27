import * as vscode from 'vscode';
import * as merge from 'lodash.merge';
import { createIconFile } from '../icons/index';
import { getObjectPropertyValue, setObjectPropertyValue } from './objects';
import { getExtensionConfiguration, promptToReload, getMaterialIconsJSON, getThemeConfig } from '.';

/** Watch for changes in the configurations to update the icons theme. */
export const watchForConfigChanges = () => {
    vscode.workspace.onDidChangeConfiguration(detectConfigChanges);
};

/** Compare the workspace and the user configurations with the current setup of the icons. */
export const detectConfigChanges = () => {
    const configs = Object.keys(getExtensionConfiguration())
        .map(c => c.split('.').slice(1).join('.'));

    return compareConfigs(configs).then(changes => {
        // if there's nothing to update
        if (Object.keys(changes).length === 0) return;

        // update icon json file with new options
        return createIconFile(changes).then(() => {
            promptToReload();
        }).catch(err => {
            console.error(err);
        });
    });
};

/**
 * Compares a specific configuration in the settings with a current configuration state.
 * The current configuration state is read from the icons json file.
 * @param configs List of configuration names
 * @returns List of configurations that needs to be updated.
 */
const compareConfigs = (configs: string[]): Promise<{ [name: string]: any }> => {
    // object with the config properties that must be updated
    const updateRequired: { [name: string]: any } = {};

    return getMaterialIconsJSON().then((json) => {
        configs.forEach(configName => {
            const configValue = getThemeConfig(configName).globalValue;
            const currentState = getObjectPropertyValue(json.options, configName);

            if (configValue !== undefined && JSON.stringify(configValue) !== JSON.stringify(currentState)) {
                setObjectPropertyValue(updateRequired, configName, configValue);
            }
        });

        if (Object.keys(updateRequired).length > 0) {
            return merge({}, json.options, updateRequired);
        } else {
            return {};
        }
    });
};
