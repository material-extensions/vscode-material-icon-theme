import { getFileConfigHash } from '../helpers/configHash';
import { logger } from '../logging/logger';
import type { Config, IconAssociations } from '../models/icons/config';
import type { FileIcon } from '../models/icons/files/fileIcon';
import type { FileIcons } from '../models/icons/files/fileTypes';
import type { IconPackValue } from '../models/icons/iconPack';
import type { Manifest } from '../models/manifest';
import {
  cloneIconExtension,
  highContrastColorFileEnding,
  iconFolderPath,
  lightColorFileEnding,
  wildcardPattern,
} from './constants';
import { getPath, getSVG, writeSVGFiles } from './shared/svg';
import { validateHEXColorCode } from './shared/validation';

/**
 * Get all file icons that can be used in this theme.
 */
export const loadFileIconDefinitions = (
  fileIcons: FileIcons,
  config: Config,
  manifest: Manifest
): Manifest => {
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
  const iconMappingType = icon[mappingType as keyof FileIcon] as string[];
  if (iconMappingType === undefined) {
    return manifest;
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
    const configMappingType = manifest[mappingType];
    const configLightMappingType = manifest.light?.[mappingType];
    const configHighContrastMappingType = manifest.highContrast?.[mappingType];

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
  return manifest;
};

/**
 * Disable all file icons that are in a pack which is disabled.
 */
const disableIconsByPack = (
  fileIcons: FileIcons,
  activeIconPack: IconPackValue
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
  const ext = isClone ? cloneIconExtension : '.svg';
  const key = `${iconName}${appendix}`;
  manifest.iconDefinitions ??= {};
  if (!manifest.iconDefinitions![key]) {
    const fileConfigHash = getFileConfigHash(config);
    manifest.iconDefinitions![key] = {
      iconPath: `${iconFolderPath}${iconName}${appendix}${fileConfigHash}${ext}`,
    };
  }
  return manifest;
};

export const generateFileIcons = async (
  color: string,
  opacity: number,
  saturation: number
) => {
  if (!color || !validateHEXColorCode(color)) {
    return logger.error('Invalid color code for file icons');
  }

  const fileIcon =
    'M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m5 2H6v16h12v-9h-7V4z';

  await writeSVGFiles(
    'file',
    getSVG(getPath(fileIcon, color), 24),
    opacity,
    saturation
  );
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
