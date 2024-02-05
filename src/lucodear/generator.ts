import { env } from 'process';
import {
  FileIcon,
  FolderIcon,
  IconAssociations,
  IconConfiguration,
} from '../models';
import merge from 'lodash.merge';
import { ExtendedOptions } from './model';
import {
  FileMappingType,
  highContrastColorFileEnding,
  // iconFolderPath,
  lightColorFileEnding,
  mapSpecificFileIcons,
  setFolderNames,
} from '../icons';
import {
  getCustomFileIcons,
  loadLucodearFileIconDefinitions,
  setFileIconDefinition,
  // setFileIconDefinition,
} from './dups/fileGenerator';
import { lucodearFileIcons } from './icons/files';
import { lucodearFolderIcons } from './icons/folders';
import {
  getCustomFolderIcons,
  loadLucodearFolderIconDefinitions,
  setFolderIconDefinitions,
} from './dups/folderGenerator';
// import {
//   /* lucodearFileIconsPath,*/ lucodearFolderIconsPath,
// } from './constants';

/**
 * Get addons icon definitions as object.
 */
export const loadLucodearAddonIconDefinitions = async (
  config: IconConfiguration,
  options: ExtendedOptions,
  currentFileConfig: IconConfiguration,
  currentFolderConfig: IconConfiguration
): Promise<IconConfiguration> => {
  config = merge({}, config);
  let files: FileIcon[] = [];
  let folders: FolderIcon[] = [];

  if (env.LUCODEAR_SCRIPT_EXECUTION !== 'true') {
    // this would only work if it's not running as a script, because the regex implementation
    // needs the vscode library to be available, as it needs to access the current workspace
    const regex = await import('./regex/regexGeneration');
    const eligible = await regex.getEligibleFiles(options);
    const regexAssociations = regex.matches(
      eligible,
      options.lucodear.files?.regexAssociations ?? {},
      options.lucodear.folders?.regexAssociations ?? {}
    );

    files = [...files, ...getCustomFileIcons(regexAssociations.files)];
    folders = [...folders, ...getCustomFolderIcons(regexAssociations.folders)];

    config = merge(
      {},
      config,
      makeRegexConfig(
        files,
        folders,
        config,
        regexAssociations.files,
        currentFileConfig,
        currentFolderConfig
      )
    );
  }

  const addonFileIcons = loadLucodearFileIconDefinitions(
    lucodearFileIcons,
    config,
    options
  );

  const addonFolderIcons = loadLucodearFolderIconDefinitions(
    [lucodearFolderIcons],
    config,
    options
  );

  config = merge({}, config, addonFileIcons, addonFolderIcons);

  return config;
};

const makeRegexConfig = (
  files: FileIcon[],
  folders: FolderIcon[],
  config: IconConfiguration,
  associations: IconAssociations,
  currentFileConfig: IconConfiguration,
  currentFolderConfig: IconConfiguration
) => {
  files.forEach((icon) => {
    if (icon.disabled) return;

    if (icon.fileNames) {
      if (!currentFileConfig.iconDefinitions?.[icon.name]) {
        config = merge({}, config, setFileIconDefinition(config, icon.name));
      }

      config = merge(
        {},
        config,
        mapSpecificFileIcons(icon, FileMappingType.FileNames, associations)
      );
    }
  });

  folders.forEach((icon) => {
    if (icon.disabled) return;

    if (!currentFolderConfig.iconDefinitions?.[icon.name]) {
      config = setFolderIconDefinitions(config, icon);
    }
    config = merge({}, config, setFolderNames(icon.name, icon.folderNames));
    config.light = icon.light
      ? merge(
          {},
          config.light,
          setFolderNames(icon.name, icon.folderNames, lightColorFileEnding)
        )
      : config.light;
    config.highContrast = icon.highContrast
      ? merge(
          {},
          config.highContrast,
          setFolderNames(
            icon.name,
            icon.folderNames,
            highContrastColorFileEnding
          )
        )
      : config.highContrast;
  });

  return config;
};
