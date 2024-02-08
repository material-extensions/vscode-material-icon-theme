import merge from 'lodash.merge';
import {
  FileIcon,
  IconAssociations,
  IconConfiguration,
  IconJsonOptions,
} from '../../models';
import {
  FileMappingType,
  highContrastColorFileEnding,
  lightColorFileEnding,
  mapSpecificFileIcons,
} from '../../icons';
import { lucodearIconsPath } from '../constants';
import { LucodearFileIcon, LucodearFileIcons } from '../model';

export const loadLucodearFileIconDefinitions = (
  fileIcons: LucodearFileIcons,
  config: IconConfiguration,
  options: IconJsonOptions
): IconConfiguration => {
  config = merge({}, config);
  const enabledIcons = disableIconsByPack(
    fileIcons,
    options.activeIconPack ?? ''
  );

  // const customIcons = getCustomFilesIcons(options.files?.associations);
  enabledIcons.forEach((icon) => {
    if (icon.disabled) return;
    const defos = setFileIconDefinition(config, icon);
    config = merge({}, config, defos);

    if (icon.light) {
      config = merge(
        {},
        config,
        setFileIconDefinition(config, icon, lightColorFileEnding)
      );
    }
    if (icon.highContrast) {
      config = merge(
        {},
        config,
        setFileIconDefinition(config, icon, highContrastColorFileEnding)
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
  if (fileIcons.defaultIcon) {
    config = merge(
      {},
      config,
      setFileIconDefinition(config, fileIcons.defaultIcon.name)
    );
    config.file = fileIcons.defaultIcon.name;

    if (fileIcons.defaultIcon.light && config.light) {
      config = merge(
        {},
        config,
        setFileIconDefinition(
          config,
          fileIcons.defaultIcon.name,
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
        setFileIconDefinition(
          config,
          fileIcons.defaultIcon.name,
          highContrastColorFileEnding
        )
      );
      if (config.highContrast) {
        config.highContrast.file =
          fileIcons.defaultIcon.name + highContrastColorFileEnding;
      }
    }
  }

  return config;
};

// const getCustomFilesIcons = (
//   fileAssociations: IconAssociations | undefined
// ) => {
//   if (!fileAssociations) return [];

//   const icons: FileIcon[] = Object.keys(fileAssociations).map((fa) => {
//     const icon: Partial<FileIcon> = {
//       name: fileAssociations[fa].toLowerCase(),
//     };
//     if (wildcardPattern.test(fa)) {
//       icon.fileExtensions = [fa.toLowerCase().replace(wildcardPattern, '')];
//     } else {
//       icon.fileNames = [fa.toLowerCase()];
//     }
//     return icon as FileIcon;
//   });
//   return icons;
// };

const disableIconsByPack = (
  fileIcons: LucodearFileIcons,
  activatedIconPack: string
): FileIcon[] => {
  return fileIcons.icons.filter((icon) => {
    return !icon.enabledFor
      ? true
      : icon.enabledFor.some((p) => p === activatedIconPack);
  });
};

export function getCustomFileIcons(
  fileAssociations: IconAssociations | undefined
) {
  if (!fileAssociations) return [];

  const icons: FileIcon[] = Object.keys(fileAssociations).map((fa) => {
    const icon: Partial<FileIcon> = {
      name: fileAssociations[fa].toLowerCase(),
    };

    icon.fileNames = [fa.toLowerCase()];

    return icon as FileIcon;
  });
  return icons;
}

export const setFileIconDefinition = (
  config: IconConfiguration,
  icon: LucodearFileIcon | string,
  appendix: string = '',
  // 🍭
  path: string = lucodearIconsPath
) => {
  const iconName = typeof icon === 'string' ? icon : icon.name;
  const subpath =
    typeof icon === 'string'
      ? ''
      : icon.subpath === undefined
      ? ''
      : `${icon.subpath}/`;

  const obj: Partial<IconConfiguration> = { iconDefinitions: {} };
  if (config.options) {
    obj.iconDefinitions![`${iconName}${appendix}`] = {
      iconPath: `${path}${subpath}${iconName}${appendix}.svg`,
    };
  }
  return obj;
};
