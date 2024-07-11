import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  type Config,
  applyConfigurationToIcons,
  clearCloneFolder,
  customClonesIcons,
  extensionName,
  generateManifest,
  hasCustomClones,
  manifestName,
  renameIconFiles,
  resolvePath,
} from '@core';
import { merge } from 'lodash-es';
import type { ConfigurationChangeEvent } from 'vscode';
import { configPropertyNames, getCurrentConfig } from '../shared/config';

/** Compare the workspace and the user configurations with the current setup of the icons. */
export const detectConfigChanges = (event?: ConfigurationChangeEvent) => {
  // if the changed config is not related to the extension
  if (!event?.affectsConfiguration(extensionName) === false) return;

  const config = getCurrentConfig();
  if (event) {
    const affectedConfigProperties = getAffectedConfigProperties(
      event.affectsConfiguration
    );
    applyConfigurationToIcons(config, affectedConfigProperties);
  } else {
    applyConfigurationToIcons(config);
  }

  renameIconFiles(config);
  const manifest = generateManifest(config);

  // clear the clone folder
  clearCloneFolder(hasCustomClones(config));

  const manifestWithClones = merge(
    {},
    manifest,
    customClonesIcons(manifest, config)
  );

  const iconJsonPath = join(resolvePath(manifestName));
  writeFileSync(
    iconJsonPath,
    JSON.stringify(manifestWithClones, undefined, 2),
    'utf-8'
  );
};

/**
 * Get the affected configurations by the change event.
 *
 * @returns Updated configurations
 */
const getAffectedConfigProperties = (
  affectsConfiguration: ConfigurationChangeEvent['affectsConfiguration']
): Set<string> => {
  // Filter out only the affected configurations to minimize calls to affectsConfiguration
  const affectedConfig = configPropertyNames.reduce<Set<string>>(
    (acc, configNameWithExtensionId) => {
      if (affectsConfiguration(configNameWithExtensionId)) {
        const configName = configNameWithExtensionId.replace(
          `${extensionName}.`,
          ''
        ) as keyof Config;
        acc.add(configName);
      }
      return acc;
    },
    new Set()
  );

  return affectedConfig;
};
