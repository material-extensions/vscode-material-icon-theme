import { existsSync, readdirSync, renameSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { fileIcons, folderIcons, languageIcons } from '@icon-definitions';
import { merge } from 'lodash-es';
import { getFileConfigHash } from '../helpers/configHash';
import { getCustomIconPaths } from '../helpers/customIconPaths';
import { resolvePath } from '../helpers/resolvePath';
import type { Config } from '../models/icons/configuration';
import { Manifest } from '../models/manifest';
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
 * Apply the configuration to the icons.
 *
 * @param config Configuration that customizes the icons and the manifest.
 */
export const applyConfigurationToIcons = (
  config: Config,
  affectedConfig: Partial<Config>
) => {
  if (affectedConfig.files?.color) {
    generateFileIcons(config.files.color, config.opacity, config.saturation);
  }
  if (affectedConfig.folders?.color) {
    generateFolderIcons(
      config.folders.color,
      config.opacity,
      config.saturation
    );
  }
  if (affectedConfig.opacity !== undefined) {
    setIconOpacity(config.opacity, config.files.associations);
  }
  if (affectedConfig.saturation !== undefined) {
    setIconSaturation(config.saturation, config.files.associations);
  }

  renameIconFiles(config);
};

/**
 * Rename all icon files according their respective config
 * @param config Icon Json Options
 */
const renameIconFiles = (config: Config) => {
  const defaultIconPath = resolvePath(iconFolderPath);
  const customPaths = getCustomIconPaths(config.files.associations);
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
