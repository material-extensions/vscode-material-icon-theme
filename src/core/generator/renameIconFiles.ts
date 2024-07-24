import { existsSync } from 'node:fs';
import { readdir, rename, unlink } from 'node:fs/promises';
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
 * @param config Icon Json Options
 */
export const renameIconFiles = async (config: Config) => {
  const defaultIconPath = resolvePath(iconFolderPath);
  const customPaths = getCustomIconPaths(config.files.associations);
  const iconPaths = [defaultIconPath, ...customPaths];

  for (const iconPath of iconPaths) {
    const files = (await readdir(iconPath)).filter((f) => f.match(/\.svg/gi));

    for (const f of files) {
      const filePath = join(iconPath, f);
      const fileConfigHash = getFileConfigHash(config);

      // append file config to file name
      const newFilePath = join(
        iconPath,
        f.replace(/(^[^\.~]+).*?(\.clone\.svg|\.svg)/, `$1${fileConfigHash}$2`)
      );

      // if generated files are already in place, do not overwrite them
      if (filePath !== newFilePath) {
        if (existsSync(newFilePath)) {
          logger.debug(`Deleting existing file: ${newFilePath}`);
          await unlink(filePath);
        } else {
          logger.debug(`Renaming file: ${filePath} to ${newFilePath}`);
          await rename(filePath, newFilePath);
        }
      }
    }
  }
};
