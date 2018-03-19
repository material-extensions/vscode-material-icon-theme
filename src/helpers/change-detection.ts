import * as vscode from 'vscode';
import { createIconFile } from '../icons/index';
import { getObjectPropertyValue, setObjectPropertyValue } from './objects';
import { getExtensionConfiguration, promptToReload, getMaterialIconsJSON, getThemeConfig } from '.';

/** Compare the workspace and the user configurations with the current setup of the icons. */
export const detectConfigChanges = () => {
    const configs = Object.keys(getExtensionConfiguration())
        .map(c => c.split('.').slice(1).join('.'));

    return compareConfigs(configs).then(updatedOptions => {
        // if there's nothing to update
        if (!updatedOptions) return;

        // update icon json file with new options
        return createIconFile(updatedOptions).then(() => {
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
    let updateRequired = false;

    return getMaterialIconsJSON().then(json => {
        configs.forEach(configName => {
            // no further actions (e.g. reload) required
            if (/show(Welcome|Update)Message/g.test(configName)) return;

            const configValue = getThemeConfig(configName).globalValue;
            const currentState = getObjectPropertyValue(json.options, configName);

            if (configValue !== undefined && JSON.stringify(configValue) !== JSON.stringify(currentState)) {
                setObjectPropertyValue(json.options, configName, configValue);
                updateRequired = true;
            }
        });

        return updateRequired ? json.options : undefined;
    });
};
