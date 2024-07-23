import { existsSync } from 'node:fs';
import { readdir, rename, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { getFileConfigHash } from '../helpers/configHash';
import { getCustomIconPaths } from '../helpers/customIconPaths';
import { merge } from '../helpers/object';
import { resolvePath } from '../helpers/resolvePath';
import { fileIcons } from '../icons/fileIcons';
import { folderIcons } from '../icons/folderIcons';
import { languageIcons } from '../icons/languageIcons';
import { logger } from '../logging/logger';
import type { Config } from '../models/icons/config';
import { type Manifest, createEmptyManifest } from '../models/manifest';
import type { RecursivePartial } from '../types/recursivePartial';
import { padWithDefaultConfig } from './config/defaultConfig';
import { iconFolderPath } from './constants';
import { generateFileIcons, loadFileIconDefinitions } from './fileGenerator';
import {
  generateFolderIcons,
  loadFolderIconDefinitions,
} from './folderGenerator';
import { setIconOpacity } from './iconOpacity';
import { setIconSaturation } from './iconSaturation';
import { loadLanguageIconDefinitions } from './languageGenerator';

/**
 * Configuration for the manifest. It contains the configuration which is used to generate the manifest.
 */
export type ManifestConfig = RecursivePartial<
  Pick<Config, 'activeIconPack' | 'hidesExplorerArrows' | 'languages'> & {
    files: Pick<Config['files'], 'associations'>;
  } & {
    folders: Pick<Config['folders'], 'associations' | 'theme'>;
  }
>;

/**
 * Generate the manifest that will be written as JSON file.
 */
export const generateManifest = (config?: ManifestConfig): Manifest => {
  const refinedConfig = padWithDefaultConfig(config);
  const manifest = createEmptyManifest();
  const languageIconDefinitions = loadLanguageIconDefinitions(
    languageIcons,
    refinedConfig,
    manifest
  );
  const fileIconDefinitions = loadFileIconDefinitions(
    fileIcons,
    refinedConfig,
    manifest
  );
  const folderIconDefinitions = loadFolderIconDefinitions(
    folderIcons,
    refinedConfig,
    manifest
  );

  return merge<Manifest>(
    languageIconDefinitions,
    fileIconDefinitions,
    folderIconDefinitions
  );
};

/**
 * Apply the configuration to the icons. But only if the configuration has changed.
 * If the affectedConfig is not set then all icons will be updated.
 *
 * @param config Configuration that customizes the icons and the manifest.
 * @param affectedConfig Set of configuration keys that have changed so that not all functions need to be executed.
 */
export const applyConfigurationToIcons = async (
  config: Config,
  affectedConfig?: Set<string>
) => {
  if (!affectedConfig || affectedConfig.has('files.color')) {
    await generateFileIcons(
      config.files.color,
      config.opacity,
      config.saturation
    );
  }
  if (!affectedConfig || affectedConfig.has('folders.color')) {
    await generateFolderIcons(
      config.folders.color,
      config.opacity,
      config.saturation
    );
  }
  if (!affectedConfig || affectedConfig.has('opacity')) {
    await setIconOpacity(config.opacity, config.files.associations);
  }
  if (!affectedConfig || affectedConfig.has('saturation')) {
    await setIconSaturation(config.saturation, config.files.associations);
  }
};

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
