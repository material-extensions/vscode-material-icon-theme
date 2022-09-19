import merge from 'lodash.merge';
import { getConfigProperties, getMaterialIconsJSON, getThemeConfig } from '.';
import { createIconFile } from '../icons/index';
import { IconJsonOptions } from '../models';
import { getObjectPropertyValue, setObjectPropertyValue } from './objects';

/** Compare the workspace and the user configurations with the current setup of the icons. */
export const detectConfigChanges = () => {
  const changes = compareConfigs();

  // if there's nothing to update
  if (Object.keys(changes.updatedConfigs).length === 0) return;

  try {
    // update icon json file with new options
    createIconFile(changes.updatedConfigs, changes.updatedJSONConfig);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Compares a specific configuration in the settings with a current configuration state.
 * The current configuration state is read from the icons json file.
 * @returns List of configurations that needs to be updated.
 */
const compareConfigs = (): {
  updatedConfigs: IconJsonOptions;
  updatedJSONConfig: IconJsonOptions;
} => {
  const configPropertyNames = Object.keys(getConfigProperties())
    .map((c) => c.split('.').slice(1).join('.'))
    // remove configurable notification messages
    .filter((c) => !/show(Welcome|Update|Reload)Message/g.test(c));

  const json = getMaterialIconsJSON();
  return configPropertyNames.reduce(
    (result, configName) => {
      try {
        const themeConfig = getThemeConfig(configName) ?? {
          globalValue: '',
          workspaceValue: '',
          defaultValue: '',
        };

        const configValue = getConfigValue(
          themeConfig as {
            globalValue: unknown;
            workspaceValue: unknown;
            defaultValue: unknown;
          }
        );

        const currentState = getObjectPropertyValue(
          json.options ?? {},
          configName
        );

        if (JSON.stringify(configValue) !== JSON.stringify(currentState)) {
          setObjectPropertyValue(json.options as {}, configName, configValue);
          setObjectPropertyValue(
            result.updatedConfigs,
            configName,
            configValue
          );
        }
      } catch (error) {
        console.error(error);
      }

      return result;
    },
    {
      updatedConfigs: {} as IconJsonOptions,
      updatedJSONConfig: json.options as IconJsonOptions,
    }
  );
};

/**
 * Returns the value of a specific configuration by checking the workspace and the user configuration and fallback to the default value.
 *
 * @param themeConfig Theme configuration
 * @returns Actual theme configuration value
 */
const getConfigValue = (themeConfig: {
  globalValue: unknown;
  workspaceValue: unknown;
  defaultValue: unknown;
}) => {
  let configValue;
  if (
    typeof themeConfig.workspaceValue === 'object' &&
    themeConfig.workspaceValue &&
    themeConfig.globalValue
  ) {
    configValue = merge(
      {},
      themeConfig.workspaceValue,
      themeConfig.globalValue
    );
  } else {
    configValue =
      themeConfig.workspaceValue ??
      themeConfig.globalValue ??
      themeConfig.defaultValue;
  }
  return configValue;
};
