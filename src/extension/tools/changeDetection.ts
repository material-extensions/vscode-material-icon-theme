import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  type Config,
  applyConfigurationToIcons,
  extensionName,
  generateManifest,
  manifestName,
  resolvePath,
} from '@core';
import type { ConfigurationChangeEvent } from 'vscode';
import { getConfigProperties, getThemeConfig } from '../shared/config';

/** Compare the workspace and the user configurations with the current setup of the icons. */
export const detectConfigChanges = (event: ConfigurationChangeEvent) => {
  if (!event.affectsConfiguration(extensionName)) return;

  const { affectedConfig, updatedConfig } = compareConfigs(event);

  try {
    const startTime = performance.now();
    applyConfigurationToIcons(affectedConfig);
    const endTime = performance.now();
    console.log('Time taken to generate manifest:', endTime - startTime);
    const manifest = generateManifest(updatedConfig);

    console.log('manifest', updatedConfig.activeIconPack);

    // clear the clone folder
    // clearCloneFolder(hasCustomClones(config));

    // const manifestWithClones = merge(
    //   {},
    //   manifest,
    //   customClonesIcons(manifest, config)
    // );

    const iconJsonPath = join(resolvePath(manifestName));
    console.log('iconJsonPath', iconJsonPath);
    console.log('active icon pack', updatedConfig.activeIconPack);
    writeFileSync(
      iconJsonPath,
      JSON.stringify(manifest, undefined, 2),
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
const compareConfigs = ({
  affectsConfiguration,
}: ConfigurationChangeEvent): {
  affectedConfig: Partial<Config>;
  updatedConfig: Config;
} => {
  const configPropertyNames = Object.keys(getConfigProperties());

  // Initialize updatedConfig with all configurations upfront to avoid conditional checks inside the loop
  const updatedConfig = configPropertyNames.reduce<Record<string, unknown>>(
    (acc, configNameWithExtensionId) => {
      const configName = configNameWithExtensionId.replace(
        `${extensionName}.`,
        ''
      );
      const configValue = getThemeConfig(configName) ?? null;
      acc[configName] = configValue;
      return acc;
    },
    {}
  );

  // Filter out only the affected configurations to minimize calls to affectsConfiguration
  const affectedConfig = configPropertyNames.reduce<Record<string, unknown>>(
    (acc, configNameWithExtensionId) => {
      if (affectsConfiguration(configNameWithExtensionId)) {
        const configName = configNameWithExtensionId.replace(
          `${extensionName}.`,
          ''
        );
        acc[configName] = updatedConfig[configName];
      }
      return acc;
    },
    {}
  );

  return { affectedConfig, updatedConfig: updatedConfig as Config };
};
