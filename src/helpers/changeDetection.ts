import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import merge from 'lodash.merge';
import {
  getConfigProperties,
  getManifestFile,
  getThemeConfig,
  resolvePath,
} from '.';
import { generateManifest, manifestName } from '../icons';
import {
  customClonesIcons,
  hasCustomClones,
} from '../icons/generator/clones/clonesGenerator';
import { clearCloneFolder } from '../icons/generator/clones/utils/cloneData';
import type { Config } from '../models';
import { getObjectPropertyValue, setObjectPropertyValue } from './objects';

/** Compare the workspace and the user configurations with the current setup of the icons. */
export const detectConfigChanges = () => {
  const config = compareConfigs();

  if (config === null) return;

  try {
    const manifest = generateManifest(config);

    // clear the clone folder
    clearCloneFolder(hasCustomClones(config));

    const manifestWithClones = merge(
      {},
      manifest,
      customClonesIcons(manifest, config)
    );

    const iconJsonPath = resolvePath('');
    writeFileSync(
      join(iconJsonPath, manifestName),
      JSON.stringify(manifestWithClones, undefined, 2),
      'utf-8'
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 * Compares a specific configuration in the settings with a current configuration state.
 * The current configuration state is read from the icons json file.
 *
 * @returns Updated configurations
 */
const compareConfigs = (): Config | null => {
  const configPropertyNames = Object.keys(getConfigProperties()).map(
    (property) =>
      // remove the extension name from the config property
      property
        .split('.')
        .slice(1)
        .join('.')
  );

  let updatedConfig: Config | null = null;
  const json = getManifestFile();
  return configPropertyNames.reduce((result, configName) => {
    const configValue = getThemeConfig(configName) ?? {
      globalValue: '',
      workspaceValue: '',
      defaultValue: '',
    };

    const currentState = getObjectPropertyValue(json.config ?? {}, configName);

    if (JSON.stringify(configValue) !== JSON.stringify(currentState)) {
      setObjectPropertyValue(result, configName, configValue);
      if (!updatedConfig) {
        updatedConfig = merge({}, result);
      }
    }

    return result;
  }, json.config as Config);
};
