import { readdir } from 'node:fs/promises';
import { join, parse } from 'node:path';

import {
  type DefaultIcon,
  type FolderIcon,
  type FolderTheme,
  fileIcons,
  folderIcons,
  highContrastColorFileEnding,
  languageIcons,
  lightColorFileEnding,
  openedFolder,
} from '../../../core';
import { green, red } from '../../helpers/painter';

/**
 * Defines the folder where all icon files are located.
 */
const folderPath = join('icons');

export const check = async () => {
  const files = await readdir(folderPath);

  const availableIcons: Record<string, string> = {};
  for (const file of files) {
    const iconName = parse(file).name.replace('.clone', '');
    availableIcons[iconName] = file;
  }

  const usedFileIcons = getAllUsedFileIcons();
  const usedFolderIcons = getAllUsedFolderIcons();
  const usedLanguageIcons = getAllUsedLanguageIcons();

  [...usedFileIcons, ...usedFolderIcons, ...usedLanguageIcons].forEach(
    (icon) => {
      delete availableIcons[icon];
    }
  );

  const amountOfUnusedIcons = Object.keys(availableIcons).length;
  if (amountOfUnusedIcons === 0) {
    console.log('> Material Icon Theme:', green('Passed icon usage checks!'));
  } else {
    console.log(
      '> Material Icon Theme: ' + red(`${amountOfUnusedIcons} unused icon(s):`)
    );
    Object.keys(availableIcons).forEach((icon) => {
      console.log(red(`- ${availableIcons[icon]}`));
    });
    throw new Error('Found unused icon files!');
  }
};

const getAllUsedFileIcons = (): string[] => {
  return [
    fileIcons.defaultIcon.name,
    fileIcons.defaultIcon.light
      ? fileIcons.defaultIcon.name + lightColorFileEnding
      : '',
    fileIcons.defaultIcon.highContrast
      ? fileIcons.defaultIcon.name + highContrastColorFileEnding
      : '',
    ...fileIcons.icons.map((icon) => icon.name),
    ...fileIcons.icons
      .filter((icon) => icon.light)
      .map((icon) => icon.name + lightColorFileEnding),
    ...fileIcons.icons
      .filter((icon) => icon.highContrast)
      .map((icon) => icon.name + highContrastColorFileEnding),
  ].filter((f) => f !== '');
};

const getAllUsedFolderIcons = (): string[] => {
  const icons = folderIcons
    .map((theme) => (theme.name === 'none' ? [] : getAllFolderIcons(theme)))
    .reduce((a, b) => a.concat(b));
  return icons
    .map((icon) => {
      return [
        icon.name,
        icon.name + openedFolder,
        icon.light ? icon.name + lightColorFileEnding : '',
        icon.light ? icon.name + openedFolder + lightColorFileEnding : '',
        icon.highContrast ? icon.name + highContrastColorFileEnding : '',
        icon.highContrast
          ? icon.name + openedFolder + highContrastColorFileEnding
          : '',
      ];
    })
    .filter((icon) => icon !== undefined)
    .reduce((a, b) => a.concat(b));
};

const getAllFolderIcons = (
  theme: FolderTheme
): (FolderIcon | DefaultIcon)[] => {
  const icons = theme.icons || [];
  const allFolderIcons = [theme.defaultIcon, ...icons];
  if (theme.rootFolder) {
    allFolderIcons.push(theme.rootFolder);
  }
  return allFolderIcons;
};

const getAllUsedLanguageIcons = (): string[] => [
  ...languageIcons.map((icon) => icon.name),
  ...languageIcons
    .filter((icon) => icon.light)
    .map((icon) => icon.name + lightColorFileEnding),
  ...languageIcons
    .filter((icon) => icon.highContrast)
    .map((icon) => icon.name + highContrastColorFileEnding),
];
