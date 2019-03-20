import { getConfigProperties, getMaterialIconsJSON, getThemeConfig, promptToReload } from '.';
import { createIconFile } from '../icons/index';
import { IconJsonOptions } from '../models';
import { getObjectPropertyValue, setObjectPropertyValue } from './objects';

/** Compare the workspace and the user configurations with the current setup of the icons. */
export const detectConfigChanges = () => {
    const configs = Object.keys(getConfigProperties())
        .map(c => c.split('.').slice(1).join('.'));

    const changes = compareConfigs(configs);

    // if there's nothing to update
    if (Object.keys(changes.updatedConfigs).length === 0) return;

    try {
        // update icon json file with new options
        createIconFile(changes.updatedConfigs, changes.updatedJSONConfig);
        promptToReload();
    } catch (error) {
        console.error(error);
    }
};

/**
 * Compares a specific configuration in the settings with a current configuration state.
 * The current configuration state is read from the icons json file.
 * @param configs List of configuration names
 * @returns List of configurations that needs to be updated.
 */
const compareConfigs = (configs: string[]): { updatedConfigs: IconJsonOptions, updatedJSONConfig: IconJsonOptions } => {
    const json = getMaterialIconsJSON();
    return configs.reduce((result, configName) => {
        // no further actions (e.g. reload) required
        if (/show(Welcome|Update|Reload)Message/g.test(configName)) return result;

        try {
            const themeConfig = getThemeConfig(configName);
            const configValue = themeConfig.globalValue !== undefined ? themeConfig.globalValue : themeConfig.defaultValue;
            const currentState = getObjectPropertyValue(json.options, configName);

            if (JSON.stringify(configValue) !== JSON.stringify(currentState)) {
                setObjectPropertyValue(json.options, configName, configValue);
                setObjectPropertyValue(result.updatedConfigs, configName, configValue);
            }
        } catch (error) {
            console.error(error);
        }

        return result;
    }, { updatedConfigs: {}, updatedJSONConfig: json.options });
};
