import { getExtensionConfiguration, getMaterialIconsJSON, getThemeConfig, promptToReload } from '.';
import { createIconFile } from '../icons/index';
import { IconJsonOptions } from '../models';
import { getObjectPropertyValue, setObjectPropertyValue } from './objects';

/** Compare the workspace and the user configurations with the current setup of the icons. */
export const detectConfigChanges = () => {
    const configs = Object.keys(getExtensionConfiguration())
        .map(c => c.split('.').slice(1).join('.'));

    return compareConfigs(configs).then(changes => {
        // if there's nothing to update
        if (Object.keys(changes.updatedConfigs).length === 0) return;

        // update icon json file with new options
        return createIconFile(changes.updatedConfigs, changes.updatedJSONConfig).then(() => {
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
const compareConfigs = (configs: string[]): Promise<{ updatedConfigs: IconJsonOptions, updatedJSONConfig: IconJsonOptions }> => {
    return getMaterialIconsJSON().then(json => {
        return configs.reduce((result, configName, i) => {
            // no further actions (e.g. reload) required
            if (/show(Welcome|Update|Reload)Message/g.test(configName)) return result;

            const configValue = getThemeConfig(configName).globalValue;
            const currentState = getObjectPropertyValue(json.options, configName);

            if (configValue !== undefined && JSON.stringify(configValue) !== JSON.stringify(currentState)) {
                setObjectPropertyValue(json.options, configName, configValue);
                setObjectPropertyValue(result.updatedConfigs, configName, configValue);
            }

            return result;
        }, { updatedConfigs: {}, updatedJSONConfig: json.options });
    });
};
