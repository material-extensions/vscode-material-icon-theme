import { existsSync, readdirSync, renameSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { merge } from 'lodash-es';
import { getFileConfigHash } from '../../helpers/configHash';
import { getCustomIconPaths } from '../../helpers/customIcons';
import { resolvePath } from '../../helpers/resolvePath';
import { type Config, Manifest } from '../../models/index';
import { fileIcons } from '../fileIcons';
import { folderIcons } from '../folderIcons';
import { languageIcons } from '../languageIcons';
import { padWithDefaultConfig } from './config/defaultConfig';
import {
  generateFileIcons,
  generateFolderIcons,
  iconFolderPath,
  loadFileIconDefinitions,
  loadFolderIconDefinitions,
  loadLanguageIconDefinitions,
  setIconOpacity,
  setIconSaturation,
} from './index';

/**
 * Generate the manifest that will be written as JSON file.
 */
export const generateManifest = (config?: Partial<Config>): Manifest => {
  const refinedConfig = padWithDefaultConfig(config);
  const manifest = new Manifest();
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

  return merge(
    {},
    languageIconDefinitions,
    fileIconDefinitions,
    folderIconDefinitions
  );
};

/**
 * Apply the configuration to the icons and generate the JSON file.
 *
 * @param config Configuration that customizes the icons and the manifest.
 */
export const applyConfigurationToIcons = (config: Partial<Config>) => {
  if (config.files?.color) {
    generateFileIcons(config.files?.color);
  }
  if (config.folders?.color) {
    generateFolderIcons(config.folders?.color);
  }
  if (config.opacity !== undefined) {
    setIconOpacity(config.opacity);
  }
  if (config.saturation !== undefined) {
    setIconSaturation(config.saturation);
  }

  renameIconFiles(config);
};

/**
 * Rename all icon files according their respective config
 * @param config Icon Json Options
 */
const renameIconFiles = (config: Partial<Config>) => {
  const defaultIconPath = resolvePath(iconFolderPath);
  const customPaths = getCustomIconPaths();
  const iconPaths = [defaultIconPath, ...customPaths];

  iconPaths.forEach((iconPath) => {
    readdirSync(iconPath)
      .filter((f) => f.match(/\.svg/gi))
      .forEach((f) => {
        const filePath = join(iconPath, f);
        const fileConfigHash = getFileConfigHash(config);

        // append file config to file name
        const newFilePath = join(
          iconPath,
          f.replace(
            /(^[^\.~]+).*?(\.clone\.svg|\.svg)/,
            `$1${fileConfigHash}$2`
          )
        );

        // if generated files are already in place, do not overwrite them
        if (filePath !== newFilePath && existsSync(newFilePath)) {
          unlinkSync(filePath);
        } else {
          renameSync(filePath, newFilePath);
        }
      });
  });
};
