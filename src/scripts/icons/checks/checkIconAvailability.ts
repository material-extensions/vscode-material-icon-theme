import { readdir } from 'fs';
import { join, parse } from 'path';
import {
  DefaultIcon,
  FileIcon,
  FolderIcon,
  FolderTheme,
} from '../../../models/index';
import { green, red } from '../../helpers/painter';
import { similarity } from '../../helpers/similarity';
import {
  fileIcons,
  folderIcons,
  highContrastColorFileEnding,
  languageIcons,
  lightColorFileEnding,
  openedFolder,
} from './../../../icons';

/**
 * Defines the folder where all icon files are located.
 */
const folderPath = join('icons');

/**
 * Defines an array with all icons that can be found in the file system.
 */
const availableIcons: Record<string, string> = {};

/**
 * Save the misconfigured icons.
 */
const wrongIconNames: Record<string, string[]> = {
  fileIcons: [],
  folderIcons: [],
  languageIcons: [],
};

/**
 * Get all icon file names from the file system.
 */
const fsReadAllIconFiles = (
  err: NodeJS.ErrnoException | null,
  files: string[]
) => {
  if (err) {
    throw Error(err.message);
  }

  files.forEach((file) => {
    const fileName = file;
    const iconName = parse(file).name;
    availableIcons[iconName] = fileName;
  });

  // check icon configurations
  checkFileIcons();
  checkFolderIcons();
  checkLanguageIcons();

  // show error messages
  handleErrors();
};

// read from the file system
export const check = () => readdir(folderPath, fsReadAllIconFiles);

/**
 * Check if the file icons from the configuration are available on the file system.
 */
const checkFileIcons = () => {
  [...fileIcons.icons, fileIcons.defaultIcon].forEach((icon) => {
    isIconAvailable(icon, IconType.fileIcons, IconColor.default);
    isIconAvailable(icon, IconType.fileIcons, IconColor.light);
    isIconAvailable(icon, IconType.fileIcons, IconColor.highContrast);
  });
};

const isIconAvailable = (
  icon: FileIcon | FolderIcon | DefaultIcon,
  iconType: IconType,
  iconColor: IconColor,
  hasOpenedFolder?: boolean
) => {
  let iconName = `${icon.name}${hasOpenedFolder ? openedFolder : ''}`;
  if (icon.light && iconColor === IconColor.light) {
    iconName += lightColorFileEnding;
  }
  if (icon.highContrast && iconColor === IconColor.highContrast) {
    iconName += highContrastColorFileEnding;
  }

  if (
    !availableIcons[iconName] &&
    wrongIconNames[iconType].indexOf(iconName) === -1
  ) {
    wrongIconNames[iconType].push(iconName);
  }
};

/**
 * Check if the folder icons from the configuration are available on the file system.
 */
const checkFolderIcons = () => {
  folderIcons
    .map((theme) => (theme.name === 'none' ? [] : getAllFolderIcons(theme)))
    .reduce((a, b) => a.concat(b))
    .forEach((icon) => {
      if (icon) {
        isIconAvailable(icon, IconType.folderIcons, IconColor.default);
        isIconAvailable(icon, IconType.folderIcons, IconColor.default, true);
        isIconAvailable(icon, IconType.folderIcons, IconColor.light);
        isIconAvailable(icon, IconType.folderIcons, IconColor.light, true);
        isIconAvailable(icon, IconType.folderIcons, IconColor.highContrast);
        isIconAvailable(
          icon,
          IconType.folderIcons,
          IconColor.highContrast,
          true
        );
      }
    });
};

const getAllFolderIcons = (theme: FolderTheme) => {
  const icons = theme.icons ? theme.icons : [];
  return [theme.defaultIcon, theme.rootFolder, ...icons].filter(
    (icon) => icon !== undefined
  ); // filter undefined root folder icons
};

/**
 * Check if the language icons from the configuration are available on the file system.
 */
const checkLanguageIcons = () => {
  languageIcons.forEach((lang) => {
    const icon = lang.icon;
    isIconAvailable(icon, IconType.languageIcons, IconColor.default);
    isIconAvailable(icon, IconType.languageIcons, IconColor.light);
    isIconAvailable(icon, IconType.languageIcons, IconColor.highContrast);
  });
};

/**
 * Show error messages in the terminal.
 */
const handleErrors = () => {
  const amountOfErrors =
    wrongIconNames.fileIcons.length +
    wrongIconNames.folderIcons.length +
    wrongIconNames.languageIcons.length;
  if (amountOfErrors > 0) {
    console.log(
      '> Material Icon Theme:',
      red(`Found ${amountOfErrors} error(s) in the icon configuration!`)
    );
  } else {
    console.log(
      '> Material Icon Theme:',
      green('Passed icon availability checks!')
    );
  }
  logIconInformation(wrongIconNames.fileIcons, 'File icons');
  logIconInformation(wrongIconNames.folderIcons, 'Folder icons');
  logIconInformation(wrongIconNames.languageIcons, 'Language icons');

  if (amountOfErrors > 0) {
    throw new Error(
      'Found some wrong file definitions in the icon configuration.'
    );
  }
};

const logIconInformation = (wrongIcons: string[], title: string) => {
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
  fileIcons = 'fileIcons',
  folderIcons = 'folderIcons',
  languageIcons = 'languageIcons',
}

enum IconColor {
  default = 'default',
  light = 'light',
  highContrast = 'highContrast',
}
