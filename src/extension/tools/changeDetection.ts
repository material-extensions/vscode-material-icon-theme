import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ConfigurationChangeEvent, ExtensionContext } from 'vscode';
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
import { deepEqual } from './utils/deepEqual';

export const appliedConfigFileName = 'material-icons.config.json';

type StoredConfigState = {
  version: string;
  config: Config;
};

let pendingDetection: Promise<void> = Promise.resolve();

/**
 * Compare the active project, workspace, and user configurations with the
 * current setup of the icons. Calls are serialized to avoid concurrent races.
 */
export const detectConfigChanges = (
  event: ConfigurationChangeEvent | undefined,
  context: ExtensionContext
): Promise<void> => {
  // if the changed config is not related to the extension
  if (event?.affectsConfiguration(extensionName) === false) {
    return Promise.resolve();
  }

  const run = pendingDetection.then(
    () => runDetectConfigChanges(event, context),
    () => runDetectConfigChanges(event, context)
  );
  pendingDetection = run;
  return run;
};

const runDetectConfigChanges = async (
  event: ConfigurationChangeEvent | undefined,
  context: ExtensionContext
) => {
  const iconJsonPath = join(resolvePath(manifestName));
  const appliedConfigPath = join(resolvePath(appliedConfigFileName));

  const oldConfig = getPreviousAppliedConfig(context, appliedConfigPath);
  const config = getCurrentConfig();

  const isActivation = event === undefined;
  const isManifestMissing = isActivation && !existsSync(iconJsonPath);
  const areClonesMissing =
    isActivation &&
    hasCustomClones(config) &&
    !existsSync(resolvePath('./../icons/clones'));

  // Skip regeneration when the on-disk state already matches the active config
  if (
    oldConfig !== undefined &&
    deepEqual(config, oldConfig) &&
    !isManifestMissing &&
    !areClonesMissing
  ) {
    return;
  }

  const baselineConfig = oldConfig ?? getConfigFromStorage(context);

  await applyConfigToIcons(config, baselineConfig);

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

  await writeToFile(
    iconJsonPath,
    JSON.stringify(manifestWithClones, undefined, 2),
    'utf-8'
  );

  logger.info('Updated the manifest file.');

  logger.debug(
    'Applied configuration: ' + JSON.stringify(config, undefined, 2)
  );

  await syncAppliedConfig(config, context, appliedConfigPath);
};

const syncAppliedConfig = async (
  config: Config,
  context: ExtensionContext,
  appliedConfigPath: string
) => {
  const state: StoredConfigState = {
    version: context.extension.packageJSON.version,
    config,
  };
  context.globalState.update('config', state);

  try {
    await writeToFile(
      appliedConfigPath,
      JSON.stringify(state, undefined, 2),
      'utf-8'
    );
  } catch (error) {
    logger.error(error);
  }
};

const getPreviousAppliedConfig = (
  context: ExtensionContext,
  appliedConfigPath: string
): Config | undefined => {
  if (!existsSync(appliedConfigPath)) {
    return undefined;
  }
  try {
    const raw = readFileSync(appliedConfigPath, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<StoredConfigState>;
    if (context.extension.packageJSON.version === parsed?.version) {
      return padWithDefaultConfig(parsed?.config);
    }
    return undefined;
  } catch {
    return undefined;
  }
};

const getConfigFromStorage = (context: ExtensionContext): Config => {
  const config = context.globalState.get<StoredConfigState>('config');
  if (context.extension.packageJSON.version === config?.version) {
    return padWithDefaultConfig(config?.config);
  } else {
    return padWithDefaultConfig();
  }
};
