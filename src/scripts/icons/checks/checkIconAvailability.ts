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
 * Resolves the expected icon filename for a given icon definition,
 * color variant, and open/closed state.
 *
 * Returns undefined if this variant is not applicable (e.g. light variant
 * for an icon that doesn't have light: true).
 */
export function resolveIconName(
  icon: DefaultIcon,
  iconType: IconType,
  iconColor: IconColor,
  hasOpenedFolder?: boolean
): string | undefined {
  const isClone = isCloneIcon(icon);

  // For non-clone icons, light/highContrast must be enabled
  if (!isClone && iconColor === IconColor.Light && !icon.light) {
    return undefined;
  }
  if (!isClone && iconColor === IconColor.HighContrast && !icon.highContrast) {
    return undefined;
  }

  let iconName = isClone
    ? getCloneBaseName(icon, iconType, hasOpenedFolder)
    : `${icon.name}${hasOpenedFolder ? openedFolder : ''}`;

  if (!isClone && icon.light && iconColor === IconColor.Light) {
    iconName += lightColorFileEnding;
  }
  if (!isClone && icon.highContrast && iconColor === IconColor.HighContrast) {
    iconName += highContrastColorFileEnding;
  }

  return iconName;
}

/**
 * Given a set of available icon names and a set of expected icon names,
 * returns the list of expected icons that are missing.
 */
export function findMissingIcons(
  availableIcons: Set<string>,
  expectedIcons: string[]
): string[] {
  return expectedIcons.filter((icon) => !availableIcons.has(icon));
}

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

export const check = async () => {
  const files = await readdir(folderPath);
  const availableIcons = new Set(files.map((f) => parse(f).name));

  const expectedIcons: string[] = [];

  // Collect expected file icons
  for (const icon of [...fileIcons.icons, fileIcons.defaultIcon]) {
    for (const color of [
      IconColor.Default,
      IconColor.Light,
      IconColor.HighContrast,
    ]) {
      const name = resolveIconName(icon, IconType.FileIcons, color);
      if (name) expectedIcons.push(name);
    }
  }

  // Collect expected folder icons
  const allFolders = folderIcons
    .map((theme) => (theme.name === 'none' ? [] : getAllFolderIcons(theme)))
    .reduce((a, b) => a.concat(b));

  for (const icon of allFolders) {
    if (!icon) continue;
    for (const color of [
      IconColor.Default,
      IconColor.Light,
      IconColor.HighContrast,
    ]) {
      const closed = resolveIconName(icon, IconType.FolderIcons, color, false);
      if (closed) expectedIcons.push(closed);
      const open = resolveIconName(icon, IconType.FolderIcons, color, true);
      if (open) expectedIcons.push(open);
    }
  }

  // Collect expected language icons
  for (const icon of languageIcons) {
    for (const color of [
      IconColor.Default,
      IconColor.Light,
      IconColor.HighContrast,
    ]) {
      const name = resolveIconName(icon, IconType.LanguageIcons, color);
      if (name) expectedIcons.push(name);
    }
  }

  const missing = findMissingIcons(availableIcons, expectedIcons);

  if (missing.length > 0) {
    console.log(
      '> Material Icon Theme:',
      red(`Found ${missing.length} error(s) in the icon configuration!`)
    );
    logIconInformation(missing, availableIcons);
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

const logIconInformation = (
  wrongIcons: string[],
  availableIcons: Set<string>
) => {
  for (const icon of wrongIcons) {
    const suggestion = [...availableIcons].find(
      (i) => similarity(icon, i) > 0.75
    );
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
  }
};
