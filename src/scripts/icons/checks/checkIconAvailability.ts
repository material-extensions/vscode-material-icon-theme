import { readdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import {
  type CloneOptions,
  type DefaultIcon,
  type FileIcon,
  type FolderIcon,
  type FolderTheme,
  fileIcons,
  folderIcons,
  highContrastColorFileEnding,
  type LanguageIcon,
  languageIcons,
  lightColorFileEnding,
  openedFolder,
} from '../../../core';
import { green, red } from '../../helpers/painter';
import { similarity } from '../../helpers/similarity';

/**
 * Defines the folder where all icon files are located.
 */
const folderPath = join('icons');

/**
 * Utility type that represents a File or Folder icon that has a clone property
 * defined.
 */
type CloneIcon = (FileIcon & FolderIcon) & { clone: CloneOptions };

export const check = async () => {
  const files = await readdir(folderPath);

  const availableIcons: Record<string, string> = {};
  for (const file of files) {
    const iconName = parse(file).name;
    availableIcons[iconName] = file;
  }

  const wrongIconNames: Record<string, string[]> = {
    fileIcons: [],
    folderIcons: [],
    languageIcons: [],
  };

  const isIconAvailable = (
    icon: DefaultIcon,
    iconType: IconType,
    iconColor: IconColor,
    hasOpenedFolder?: boolean
  ) => {
    const isClone = isCloneIcon(icon);

    let iconName = isClone
      ? getCloneBaseName(icon, iconType, hasOpenedFolder)
      : `${icon.name}${hasOpenedFolder ? openedFolder : ''}`;

    if (!isClone && icon.light && iconColor === IconColor.Light) {
      iconName += lightColorFileEnding;
    }
    if (!isClone && icon.highContrast && iconColor === IconColor.HighContrast) {
      iconName += highContrastColorFileEnding;
    }

    if (
      !availableIcons[iconName] &&
      wrongIconNames[iconType].indexOf(iconName) === -1
    ) {
      wrongIconNames[iconType].push(iconName);
    }
  };

  // check file icons
  [...fileIcons.icons, fileIcons.defaultIcon].forEach((icon) => {
    isIconAvailable(icon, IconType.FileIcons, IconColor.Default);
    isIconAvailable(icon, IconType.FileIcons, IconColor.Light);
    isIconAvailable(icon, IconType.FileIcons, IconColor.HighContrast);
  });

  // check folder icons
  folderIcons
    .map((theme) => (theme.name === 'none' ? [] : getAllFolderIcons(theme)))
    .reduce((a, b) => a.concat(b))
    .forEach((icon) => {
      if (icon) {
        isIconAvailable(icon, IconType.FolderIcons, IconColor.Default);
        isIconAvailable(icon, IconType.FolderIcons, IconColor.Default, true);
        isIconAvailable(icon, IconType.FolderIcons, IconColor.Light);
        isIconAvailable(icon, IconType.FolderIcons, IconColor.Light, true);
        isIconAvailable(icon, IconType.FolderIcons, IconColor.HighContrast);
        isIconAvailable(
          icon,
          IconType.FolderIcons,
          IconColor.HighContrast,
          true
        );
      }
    });

  // check language icons
  languageIcons.forEach((icon) => {
    isIconAvailable(icon, IconType.LanguageIcons, IconColor.Default);
    isIconAvailable(icon, IconType.LanguageIcons, IconColor.Light);
    isIconAvailable(icon, IconType.LanguageIcons, IconColor.HighContrast);
  });

  // handle errors
  const amountOfErrors =
    wrongIconNames.fileIcons.length +
    wrongIconNames.folderIcons.length +
    wrongIconNames.languageIcons.length;

  if (amountOfErrors > 0) {
    console.log(
      '> Material Icon Theme:',
      red(`Found ${amountOfErrors} error(s) in the icon configuration!`)
    );
    logIconInformation(wrongIconNames.fileIcons, 'File icons', availableIcons);
    logIconInformation(
      wrongIconNames.folderIcons,
      'Folder icons',
      availableIcons
    );
    logIconInformation(
      wrongIconNames.languageIcons,
      'Language icons',
      availableIcons
    );
    throw new Error(
      'Found some wrong file definitions in the icon configuration.'
    );
  } else {
    console.log(
      '> Material Icon Theme:',
      green('Passed icon availability checks!')
    );
  }
};

/**
 * Type guard to check if the icon is a clone icon
 */
const isCloneIcon = (icon: DefaultIcon): icon is CloneIcon => {
  return (
    (icon as CloneIcon).clone &&
    (icon as FileIcon | FolderIcon | LanguageIcon).clone?.base !== undefined
  );
};

/**
 * Get the base file name of a clone icon.
 */
const getCloneBaseName = (
  icon: CloneIcon,
  iconType: IconType,
  hasOpenedFolder?: boolean
) => {
  const clone = icon.clone;
  const folderBase =
    iconType === IconType.FolderIcons
      ? clone.base === 'folder'
        ? 'folder'
        : clone.base.startsWith('folder-')
          ? clone.base
          : `folder-${clone?.base}`
      : clone.base;

  return `${folderBase}${hasOpenedFolder ? openedFolder : ''}`;
};

const getAllFolderIcons = (theme: FolderTheme) => {
  const icons = theme.icons ? theme.icons : [];
  return [theme.defaultIcon, theme.rootFolder, ...icons].filter(
    (icon) => icon !== undefined
  );
};

const logIconInformation = (
  wrongIcons: string[],
  title: string,
  availableIcons: Record<string, string>
) => {
  if (wrongIcons.length === 0) return;
  console.log(`\n${title}:\n--------------------------------`);
  wrongIcons.forEach((icon) => {
    const suggestion = Object.keys(availableIcons).find((i) => {
      return similarity(icon, i) > 0.75;
    });
    const suggestionString = suggestion
      ? ` (Did you mean ${green(suggestion)}?)`
      : '';
    const isWrongLightVersion = icon.endsWith(lightColorFileEnding);
    const isWrongLightVersionString = isWrongLightVersion
      ? ` (There is no light icon for ${green(
          icon.slice(0, -6)
        )}! Set the light option to false!)`
      : '';
    const isWrongHighContrastVersion = icon.endsWith(
      highContrastColorFileEnding
    );
    const isWrongHighContrastVersionString = isWrongHighContrastVersion
      ? ` (There is no high contrast icon for ${green(
          icon.slice(0, -13)
        )}! Set the highContrast option to false!)`
      : '';
    console.log(
      red(`Icon not found: ${icon}.svg`) +
        `${suggestionString}${isWrongLightVersionString}${isWrongHighContrastVersionString}`
    );
  });
};

enum IconType {
  FileIcons = 'fileIcons',
  FolderIcons = 'folderIcons',
  LanguageIcons = 'languageIcons',
}

enum IconColor {
  Default = 'default',
  Light = 'light',
  HighContrast = 'highContrast',
}
