import {
  existsSync,
  readdirSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { basename, join } from 'node:path';
import merge from 'lodash.merge';
import { getCustomIconPaths } from '../../helpers/customIcons';
import { getFileConfigHash } from '../../helpers/fileConfig';
import { IconConfiguration, type IconJsonOptions } from '../../models/index';
import { fileIcons } from '../fileIcons';
import { folderIcons } from '../folderIcons';
import { languageIcons } from '../languageIcons';
import {
  customClonesIcons,
  generateConfiguredClones,
} from './clones/clonesGenerator';
import { iconJsonName } from './constants';
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
 * Generate the complete icon configuration object that can be written as JSON file.
 */
export const generateIconConfigurationObject = (
  options: IconJsonOptions
): IconConfiguration => {
  const iconConfig = merge({}, new IconConfiguration(), { options });
  const languageIconDefinitions = loadLanguageIconDefinitions(
    languageIcons,
    iconConfig,
    options
  );
  const fileIconDefinitions = loadFileIconDefinitions(
    fileIcons,
    iconConfig,
    options
  );
  const folderIconDefinitions = loadFolderIconDefinitions(
    folderIcons,
    iconConfig,
    options
  );

  return merge(
    {},
    languageIconDefinitions,
    fileIconDefinitions,
    folderIconDefinitions
  );
};

/**
 * Create the JSON file that is responsible for the icons in the editor.
 * @param updatedConfigs Options that have been changed.
 * @param updatedJSONConfig New JSON options that already include the updatedConfigs.
 */
export const createIconFile = (
  updatedConfigs?: IconJsonOptions,
  updatedJSONConfig: IconJsonOptions = {}
) => {
  // override the default options with the new options
  const options: IconJsonOptions = merge(
    {},
    getDefaultIconOptions(),
    updatedJSONConfig
  );
  let json = generateIconConfigurationObject(options);

  // make sure that the folder color, opacity and saturation values are entered correctly
  if (
    updatedConfigs?.opacity &&
    !validateOpacityValue(updatedConfigs?.opacity)
  ) {
    throw Error('Material Icons: Invalid opacity value!');
  }
  if (
    updatedConfigs?.saturation &&
    !validateSaturationValue(updatedConfigs?.saturation)
  ) {
    throw Error('Material Icons: Invalid saturation value!');
  }
  if (
    updatedConfigs?.folders?.color &&
    !validateHEXColorCode(updatedConfigs?.folders?.color)
  ) {
    throw Error('Material Icons: Invalid folder color value!');
  }
  if (
    updatedConfigs?.files?.color &&
    !validateHEXColorCode(updatedConfigs?.files?.color)
  ) {
    throw Error('Material Icons: Invalid file color value!');
  }

  try {
    let iconJsonPath = __dirname;
    // if executed via script
    if (basename(__dirname) !== 'dist') {
      iconJsonPath = join(__dirname, '..', '..', '..', 'dist');
    }
    if (!updatedConfigs || (updatedConfigs.files || {}).color) {
      // if updatedConfigs do not exist (because of initial setup)
      // or new config value was detected by the change detection
      generateFileIcons(options.files?.color);
      setIconOpacity(options, ['file.svg']);
    }
    if (!updatedConfigs || (updatedConfigs.folders || {}).color) {
      // if updatedConfigs do not exist (because of initial setup)
      // or new config value was detected by the change detection
      generateFolderIcons(options.folders?.color);
      setIconOpacity(options, [
        'folder.svg',
        'folder-open.svg',
        'folder-root.svg',
        'folder-root-open.svg',
      ]);
    }
    if (!updatedConfigs || updatedConfigs.opacity !== undefined) {
      setIconOpacity(options);
    }
    if (!updatedConfigs || updatedConfigs.saturation !== undefined) {
      setIconSaturation(options);
    }
    renameIconFiles(iconJsonPath, options);

    // create configured icon clones at build time
    if (!updatedConfigs) {
      console.log('Generating icon clones...');
      generateConfiguredClones(folderIcons, json);
      generateConfiguredClones(fileIcons, json);
    }

    // generate custom cloned icons set by the user via vscode options
    // after opacity and saturation have been set so that those changes
    // are also applied to the user defined clones
    json = merge({}, json, customClonesIcons(json, options));
  } catch (error) {
    throw new Error('Failed to update icons: ' + error);
  }

  try {
    let iconJsonPath = __dirname;
    // if executed via script
    if (basename(__dirname) !== 'dist') {
      iconJsonPath = join(__dirname, '..', '..', '..', 'dist');
    }
    writeFileSync(
      join(iconJsonPath, iconJsonName),
      JSON.stringify(json, undefined, 2),
      'utf-8'
    );
  } catch (error) {
    throw new Error('Failed to create icon file: ' + error);
  }

  return iconJsonName;
};

/**
 * The options control the generator and decide which icons are disabled or not.
 */
export const getDefaultIconOptions = (): Required<IconJsonOptions> => ({
  folders: {
    theme: 'specific',
    color: '#90a4ae',
    associations: {},
  },
  activeIconPack: 'angular',
  hidesExplorerArrows: false,
  opacity: 1,
  saturation: 1,
  files: {
    color: '#90a4ae',
    associations: {},
  },
  languages: { associations: {} },
});

/**
 * Rename all icon files according their respective config
 * @param iconJsonPath Path of icon json folder
 * @param options Icon Json Options
 */
const renameIconFiles = (iconJsonPath: string, options: IconJsonOptions) => {
  const customPaths = getCustomIconPaths(options);
  const defaultIconPath = join(iconJsonPath, '..', 'icons');
  const iconPaths = [defaultIconPath, ...customPaths];

  iconPaths.forEach((iconPath) => {
    readdirSync(iconPath)
      .filter((f) => f.match(/\.svg/gi))
      .forEach((f) => {
        const filePath = join(iconPath, f);
        const fileConfigHash = getFileConfigHash(options);

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
