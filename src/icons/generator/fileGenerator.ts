import { merge } from 'lodash-es';
import { getFileConfigHash } from '../../helpers/configHash';
import {
  type Config,
  type FileIcon,
  type FileIcons,
  type IconAssociations,
  Manifest,
} from '../../models/index';
import {
  cloneIconExtension,
  highContrastColorFileEnding,
  iconFolderPath,
  lightColorFileEnding,
  wildcardPattern,
} from './constants';
import { getPath, getSVG, validateHEXColorCode, writeSVGFiles } from './shared';

/**
 * Get all file icons that can be used in this theme.
 */
export const loadFileIconDefinitions = (
  fileIcons: FileIcons,
  config: Config,
  manifest: Manifest
): Manifest => {
  manifest = merge({}, manifest);
  const enabledIcons = disableIconsByPack(fileIcons, config.activeIconPack);
  const customIcons = getCustomIcons(config.files?.associations);
  const allFileIcons = [...enabledIcons, ...customIcons];

  allFileIcons.forEach((icon) => {
    if (icon.disabled) return;
    const isClone = icon.clone !== undefined;
    manifest = setIconDefinition(manifest, config, icon.name, isClone);

    if (icon.light) {
      manifest = setIconDefinition(
        manifest,
        config,
        icon.name,
        isClone,
        lightColorFileEnding
      );
    }
    if (icon.highContrast) {
      manifest = setIconDefinition(
        manifest,
        config,
        icon.name,
        isClone,
        highContrastColorFileEnding
      );
    }

    if (icon.fileExtensions) {
      manifest = mapSpecificFileIcons(
        icon,
        FileMappingType.FileExtensions,
        manifest
      );
    }
    if (icon.fileNames) {
      manifest = mapSpecificFileIcons(
        icon,
        FileMappingType.FileNames,
        manifest,
        config.files?.associations
      );
    }
  });

  // set default file icon
  manifest = setIconDefinition(
    manifest,
    config,
    fileIcons.defaultIcon.name,
    false
  );
  manifest.file = fileIcons.defaultIcon.name;

  if (fileIcons.defaultIcon.light && manifest.light) {
    manifest = setIconDefinition(
      manifest,
      config,
      fileIcons.defaultIcon.name,
      false,
      lightColorFileEnding
    );
    if (manifest.light) {
      manifest.light.file = fileIcons.defaultIcon.name + lightColorFileEnding;
    }
  }

  if (fileIcons.defaultIcon.highContrast) {
    manifest = setIconDefinition(
      manifest,
      config,
      fileIcons.defaultIcon.name,
      false,
      highContrastColorFileEnding
    );
    if (manifest.highContrast) {
      manifest.highContrast.file =
        fileIcons.defaultIcon.name + highContrastColorFileEnding;
    }
  }

  return manifest;
};

/**
 * Map the file extensions and the filenames to the related icons.
 */
const mapSpecificFileIcons = (
  icon: FileIcon,
  mappingType: FileMappingType,
  manifest: Manifest,
  customFileAssociation: IconAssociations = {}
) => {
  const manifestCopy = merge({}, manifest);
  const iconMappingType = icon[mappingType as keyof FileIcon] as string[];
  if (iconMappingType === undefined) {
    return manifestCopy;
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
    const configMappingType = manifestCopy[mappingType];
    const configLightMappingType = manifestCopy.light?.[mappingType];
    const configHighContrastMappingType =
      manifestCopy.highContrast?.[mappingType];

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
  return manifestCopy;
};

/**
 * Disable all file icons that are in a pack which is disabled.
 */
const disableIconsByPack = (
  fileIcons: FileIcons,
  activeIconPack: string
): FileIcon[] => {
  return fileIcons.icons.filter((icon) => {
    return !icon.enabledFor
      ? true
      : icon.enabledFor.some((p) => p === activeIconPack);
  });
};

const setIconDefinition = (
  manifest: Manifest,
  config: Config,
  iconName: string,
  isClone: boolean,
  appendix: string = ''
) => {
  const manifestCopy = merge({}, manifest);
  const ext = isClone ? cloneIconExtension : '.svg';
  const key = `${iconName}${appendix}`;
  manifest.iconDefinitions ??= {};
  if (!manifest.iconDefinitions![key]) {
    const fileConfigHash = getFileConfigHash(config);
    manifestCopy.iconDefinitions![key] = {
      iconPath: `${iconFolderPath}${iconName}${appendix}${fileConfigHash}${ext}`,
    };
  }
  return manifestCopy;
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
