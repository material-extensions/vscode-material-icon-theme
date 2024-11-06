import { existsSync, readdirSync, renameSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { getFileConfigHash } from '../helpers/configHash';
import { getCustomIconPaths } from '../helpers/customIconPaths';
import { resolvePath } from '../helpers/resolvePath';
import { logger } from '../logging/logger';
import type { Config } from '../models/icons/config';
import { iconFolderPath } from './constants';

/**
 * Rename all icon files according their respective config.
 *
 * The rename triggers a change event in VS Code, which will update the icons in the UI.
 * @param config - The new configuration that customizes the icons and the manifest.
 */
export const renameIconFiles = (config: Config) => {
  const defaultIconPath = resolvePath(iconFolderPath);
  const customPaths = getCustomIconPaths(config.files.associations);
  const iconPaths = [defaultIconPath, ...customPaths];
  const fileConfigHash = getFileConfigHash(config);

  for (const iconPath of iconPaths) {
    const files = readdirSync(iconPath).filter((f) => f.match(/\.svg/gi));

    for (const f of files) {
      const filePath = join(iconPath, f);

      // append file config to file name
      const newFilePath = join(
        iconPath,
        f.replace(/(^[^\.~]+).*?(\.clone\.svg|\.svg)/, `$1${fileConfigHash}$2`)
      );

      try {
        // if generated files are already in place, do not overwrite them
        if (filePath !== newFilePath) {
          if (existsSync(newFilePath)) {
            if (existsSync(filePath)) {
              logger.debug(`Deleting existing file: ${filePath}`);
              unlinkSync(filePath);
            }
          } else {
            if (existsSync(filePath)) {
              logger.debug(`Renaming file: ${filePath} to ${newFilePath}`);
              renameSync(filePath, newFilePath);
            }
          }
        }
      } catch (error) {
        logger.error(error);
      }
    }
  }
};
