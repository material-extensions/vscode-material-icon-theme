import merge from 'lodash.merge';
import { getFileConfigHash } from '../../helpers/fileConfig';
import {
  type FileIcon,
  type FileIcons,
  type IconAssociations,
  IconConfiguration,
  type IconJsonOptions,
} from '../../models/index';
import {
  cloneIconExtension,
  highContrastColorFileEnding,
  iconFolderPath,
  lightColorFileEnding,
  wildcardPattern,
} from './constants';
import {
  getPath,
  getSVG,
  validateHEXColorCode,
  writeSVGFiles,
} from './folderGenerator';

/**
 * Get all file icons that can be used in this theme.
 */
export const loadFileIconDefinitions = (
  fileIcons: FileIcons,
  config: IconConfiguration,
  options: IconJsonOptions
): IconConfiguration => {
  config = merge({}, config);
  const enabledIcons = disableIconsByPack(
    fileIcons,
    options.activeIconPack ?? ''
  );
  const customIcons = getCustomIcons(options.files?.associations);
  const allFileIcons = [...enabledIcons, ...customIcons];

  allFileIcons.forEach((icon) => {
    if (icon.disabled) return;
    const isClone = icon.clone !== undefined;
    config = merge({}, config, setIconDefinition(config, icon.name, isClone));

    if (icon.light) {
      config = merge(
        {},
        config,
        setIconDefinition(config, icon.name, isClone, lightColorFileEnding)
      );
    }
    if (icon.highContrast) {
      config = merge(
        {},
        config,
        setIconDefinition(
          config,
          icon.name,
          isClone,
          highContrastColorFileEnding
        )
      );
    }

    if (icon.fileExtensions) {
      config = merge(
        {},
        config,
        mapSpecificFileIcons(icon, FileMappingType.FileExtensions)
      );
    }
    if (icon.fileNames) {
      config = merge(
        {},
        config,
        mapSpecificFileIcons(
          icon,
          FileMappingType.FileNames,
          options.files?.associations
        )
      );
    }
  });

  // set default file icon
  config = merge(
    {},
    config,
    setIconDefinition(config, fileIcons.defaultIcon.name, false)
  );
  config.file = fileIcons.defaultIcon.name;

  if (fileIcons.defaultIcon.light && config.light) {
    config = merge(
      {},
      config,
      setIconDefinition(
        config,
        fileIcons.defaultIcon.name,
        false,
        lightColorFileEnding
      )
    );
    if (config.light) {
      config.light.file = fileIcons.defaultIcon.name + lightColorFileEnding;
    }
  }

  if (fileIcons.defaultIcon.highContrast) {
    config = merge(
      {},
      config,
      setIconDefinition(
        config,
        fileIcons.defaultIcon.name,
        false,
        highContrastColorFileEnding
      )
    );
    if (config.highContrast) {
      config.highContrast.file =
        fileIcons.defaultIcon.name + highContrastColorFileEnding;
    }
  }

  return config;
};

/**
 * Map the file extensions and the filenames to the related icons.
 */
const mapSpecificFileIcons = (
  icon: FileIcon,
  mappingType: FileMappingType,
  customFileAssociation: IconAssociations = {}
) => {
  const config = new IconConfiguration();
  const iconMappingType = icon[mappingType as keyof FileIcon] as string[];
  if (iconMappingType === undefined) {
    return;
  }
  iconMappingType.forEach((name) => {
    // if the custom file extension should also overwrite the file names
    const shouldOverwriteFileNames = Object.keys(customFileAssociation).some(
      (key) => {
        // overwrite is enabled if there are two asterisks in the wildcard
        if (!/^\*{2}\./.test(key)) return false;
        const fileExtension = key.replace(wildcardPattern, '.');

        // check if the file name contains the particular file extension
        // (e.g. extension ".md" in "Readme.md" -> then overwrite it with the *.md icon)
        return name.toLowerCase().indexOf(fileExtension.toLowerCase()) !== -1;
      }
    );

    // if overwrite is enabled then do not continue to set the icons for file names containing the file extension
    const configMappingType = config[mappingType];
    const configLightMappingType = config.light?.[mappingType];
    const configHighContrastMappingType = config.highContrast?.[mappingType];

    if (
      shouldOverwriteFileNames ||
      !configMappingType ||
      !configLightMappingType ||
      !configHighContrastMappingType
    )
      return;

    configMappingType[name] = icon.name;
    if (icon.light) {
      configLightMappingType[name] = `${icon.name}${lightColorFileEnding}`;
    }
    if (icon.highContrast) {
      configHighContrastMappingType[name] =
        `${icon.name}${highContrastColorFileEnding}`;
    }
  });
  return config;
};

/**
 * Disable all file icons that are in a pack which is disabled.
 */
const disableIconsByPack = (
  fileIcons: FileIcons,
  activatedIconPack: string
): FileIcon[] => {
  return fileIcons.icons.filter((icon) => {
    return !icon.enabledFor
      ? true
      : icon.enabledFor.some((p) => p === activatedIconPack);
  });
};

const setIconDefinition = (
  config: IconConfiguration,
  iconName: string,
  isClone: boolean,
  appendix: string = ''
) => {
  const obj: Partial<IconConfiguration> = { iconDefinitions: {} };
  const ext = isClone ? cloneIconExtension : '.svg';
  const key = `${iconName}${appendix}`;
  if (config.options && !config.iconDefinitions![key]) {
    const fileConfigHash = getFileConfigHash(config.options);
    obj.iconDefinitions![key] = {
      iconPath: `${iconFolderPath}${iconName}${appendix}${fileConfigHash}${ext}`,
    };
  }
  return obj;
};

export const generateFileIcons = (color: string | undefined) => {
  if (!color || !validateHEXColorCode(color)) {
    return console.error('Invalid color code for file icons');
  }

  const fileIcon =
    'M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m5 2H6v16h12v-9h-7V4z';

  writeSVGFiles('file', getSVG(getPath(fileIcon, color), 24));
};

const getCustomIcons = (fileAssociations: IconAssociations | undefined) => {
  if (!fileAssociations) return [];

  const icons: FileIcon[] = Object.keys(fileAssociations).map((fa) => {
    const icon: Partial<FileIcon> = {
      name: fileAssociations[fa].toLowerCase(),
    };
    if (wildcardPattern.test(fa)) {
      icon.fileExtensions = [fa.toLowerCase().replace(wildcardPattern, '')];
    } else {
      icon.fileNames = [fa.toLowerCase()];
    }
    return icon as FileIcon;
  });
  return icons;
};

const enum FileMappingType {
  FileExtensions = 'fileExtensions',
  FileNames = 'fileNames',
}
