import { join } from 'node:path';
import type { ConfigurationChangeEvent, ExtensionContext } from 'vscode';
import {
  type Config,
  applyConfigToIcons,
  clearCloneFolder,
  customClonesIcons,
  extensionName,
  generateManifest,
  hasCustomClones,
  logger,
  manifestName,
  merge,
  padWithDefaultConfig,
  renameIconFiles,
  resolvePath,
  writeToFile,
} from '../../core';
import { configPropertyNames, getCurrentConfig } from '../shared/config';

/** Compare the workspace and the user configurations with the current setup of the icons. */
export const detectConfigChanges = async (
  event: ConfigurationChangeEvent | undefined,
  context: ExtensionContext
) => {
  // if the changed config is not related to the extension
  if (event?.affectsConfiguration(extensionName) === false) return;

  const oldConfig = getConfigFromStorage(context);
  const config = getCurrentConfig();

  if (event) {
    const affectedConfigProperties = getAffectedConfigProperties(
      event.affectsConfiguration
    );
    logger.debug('Affected configurations: ' + [...affectedConfigProperties]);
    await applyConfigToIcons(config, affectedConfigProperties, oldConfig);
  } else {
    logger.debug('Applying all configurations with current config.');
    await applyConfigToIcons(config);
  }

  logger.info('Configuration changes detected and applied!');

  await renameIconFiles(config);
  const manifest = generateManifest(config);

  // clear the clone folder
  await clearCloneFolder(hasCustomClones(config));

  const manifestWithClones = merge(
    manifest,
    await customClonesIcons(manifest, config)
  );

  const iconJsonPath = join(resolvePath(manifestName));
  await writeToFile(
    iconJsonPath,
    JSON.stringify(manifestWithClones, undefined, 2),
    'utf-8'
  );

  logger.info('Updated the manifest file.');

  logger.debug(
    'Applied configuration: ' + JSON.stringify(config, undefined, 2)
  );

  syncConfigWithStorage(config, context);
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

const syncConfigWithStorage = (config: Config, context: ExtensionContext) => {
  context.globalState.update('config', config);
};

const getConfigFromStorage = (context: ExtensionContext): Config => {
  const config = context.globalState.get<Config>('config');
  return padWithDefaultConfig(config);
};
