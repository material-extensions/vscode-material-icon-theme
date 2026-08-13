import { existsSync } from 'node:fs';
import { join } from 'node:path';
import deepEqual from 'fast-deep-equal';
import { workspace, type ConfigurationChangeEvent, type ExtensionContext } from 'vscode';
import {
  applyConfigToIcons,
  type Config,
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
import { getCurrentConfig } from '../shared/config';
import { normalizeCustomIconConfigPaths } from './customIconPaths';

/** Compare the workspace and the user configurations with the current setup of the icons. */
export const detectConfigChanges = async (
  event: ConfigurationChangeEvent | undefined,
  context: ExtensionContext
) => {
  // if the changed config is not related to the extension
  if (event?.affectsConfiguration(extensionName) === false) return;

  const oldConfig = getConfigFromStorage(context);
  const config = normalizeCustomIconConfigPaths(getCurrentConfig(), {
    extensionPath: context.extension.extensionPath,
    workspaceFolders:
      workspace.workspaceFolders?.map((folder) => ({
        name: folder.name,
        path: folder.uri.fsPath,
      })) ?? [],
  });

  // if the configuration has not changed
  if (deepEqual(config, oldConfig)) {
    const isActivation = event === undefined;
    if (
      isActivation &&
      hasCustomClones(config) &&
      !existsSync(resolvePath('./../icons/clones'))
    ) {
      logger.info('Custom clones missing from disk, regenerating...');
    } else {
      return;
    }
  }

  await applyConfigToIcons(config, oldConfig);

  logger.info('Configuration changes detected and applied!');

  try {
    await renameIconFiles(config);
  } catch (error) {
    logger.error(error);
  }

  const manifest = generateManifest(config);

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

const syncConfigWithStorage = (config: Config, context: ExtensionContext) => {
  context.globalState.update('config', {
    version: context.extension.packageJSON.version,
    config,
  });
};

const getConfigFromStorage = (context: ExtensionContext): Config => {
  const config = context.globalState.get<{ version: string; config: Config; }>(
    'config'
  );
  if (context.extension.packageJSON.version === config?.version) {
    return padWithDefaultConfig(config?.config);
  } else {
    return padWithDefaultConfig();
  }
};
