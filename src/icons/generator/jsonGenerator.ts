import { existsSync, readdirSync, renameSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import merge from 'lodash.merge';
import { getFileConfigHash } from '../../helpers/configHash';
import { getCustomIconPaths } from '../../helpers/customIcons';
import { resolvePath } from '../../helpers/resolvePath';
import { type Config, Manifest } from '../../models/index';
import { fileIcons } from '../fileIcons';
import { folderIcons } from '../folderIcons';
import { languageIcons } from '../languageIcons';
import {
  generateFileIcons,
  generateFolderIcons,
  loadFileIconDefinitions,
  loadFolderIconDefinitions,
  loadLanguageIconDefinitions,
  setIconOpacity,
  setIconSaturation,
  validateHEXColorCode,
  validateOpacityValue,
  validateSaturationValue,
} from './index';

/**
 * Generate the manifest that will be written as JSON file.
 */
export const generateManifest = (config?: Config): Manifest => {
  const manifest = new Manifest(config);
  const languageIconDefinitions = loadLanguageIconDefinitions(
    languageIcons,
    manifest
  );
  const fileIconDefinitions = loadFileIconDefinitions(fileIcons, manifest);
  const folderIconDefinitions = loadFolderIconDefinitions(
    folderIcons,
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
export const applyConfigurationToIcons = (config: Config) => {
  validateConfigValues(config);

  if (config.files?.color) {
    generateFileIcons(config.files?.color);
    setIconOpacity(config, ['file.svg']);
  }
  if (config.folders?.color) {
    generateFolderIcons(config.folders?.color);
    setIconOpacity(config, [
      'folder.svg',
      'folder-open.svg',
      'folder-root.svg',
      'folder-root-open.svg',
    ]);
  }
  if (config.opacity !== undefined) {
    setIconOpacity(config);
  }
  if (config.saturation !== undefined) {
    setIconSaturation(config);
  }

  renameIconFiles(config);
};

/**
 * Rename all icon files according their respective config
 * @param config Icon Json Options
 */
const renameIconFiles = (config: Config) => {
  const defaultIconPath = resolvePath('icons');
  const customPaths = getCustomIconPaths(config);
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

const validateConfigValues = (config: Config) => {
  if (!validateOpacityValue(config.opacity)) {
    throw Error('Material Icons: Invalid opacity value!');
  }
  if (!validateSaturationValue(config.saturation)) {
    throw Error('Material Icons: Invalid saturation value!');
  }
  if (!validateHEXColorCode(config.folders?.color)) {
    throw Error('Material Icons: Invalid folder color value!');
  }
  if (!validateHEXColorCode(config.files?.color)) {
    throw Error('Material Icons: Invalid file color value!');
  }
};
