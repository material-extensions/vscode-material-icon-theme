import merge from 'lodash.merge';
import {
  FileIcon,
  FileIcons,
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
import { getFileConfigHash } from '../../helpers/fileConfig';
import { lucodearFileIconsPath } from '../constants';

export const loadLucodearFileIconDefinitions = (
  fileIcons: FileIcons,
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
    config = merge({}, config, setFileIconDefinition(config, icon.name));

    if (icon.light) {
      config = merge(
        {},
        config,
        setFileIconDefinition(config, icon.name, lightColorFileEnding)
      );
    }
    if (icon.highContrast) {
      config = merge(
        {},
        config,
        setFileIconDefinition(config, icon.name, highContrastColorFileEnding)
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
  fileIcons: FileIcons,
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
  iconName: string,
  appendix: string = '',
  // 🍭
  path: string = lucodearFileIconsPath
) => {
  const obj: Partial<IconConfiguration> = { iconDefinitions: {} };
  if (config.options) {
    const fileConfigHash = getFileConfigHash(config.options);
    if (!Object.hasOwnProperty.call(config.iconDefinitions ?? {}, iconName)) {
      obj.iconDefinitions![`${iconName}${appendix}`] = {
        iconPath: `${path}${iconName}${appendix}${fileConfigHash}.svg`,
      };
    }
  }
  return obj;
};
