import type { ConfigurationChangeEvent, ExtensionContext } from 'vscode';
import {
  extensionName,
  generateIconSnapshot,
  isIconSnapshotCurrent,
  logger,
  manifestName,
  resolvePath,
} from '../../core';
import { getCurrentConfig } from '../shared/config';

let pending: Promise<void> = Promise.resolve();

/** Serialize this host's changes; other hosts publish independent snapshots. */
export const detectConfigChanges = (
  event: ConfigurationChangeEvent | undefined,
  context: ExtensionContext
): Promise<void> => {
  if (event?.affectsConfiguration(extensionName) === false)
    return Promise.resolve();
  pending = pending
    .catch((error) => logger.error(error))
    .then(async () => {
      const config = getCurrentConfig();
      const version = context.extension.packageJSON.version;
      const path = resolvePath(manifestName);
      if (await isIconSnapshotCurrent(config, path, version)) return;
      await generateIconSnapshot(config, path, version);
      await context.globalState.update('config', { version, config });
      logger.info('Published a complete icon snapshot.');
    });
  return pending;
};
