import { readFile } from 'node:fs/promises';
import { replaceColors as replaceColorsInSvg } from '../../../helpers/svgColor';
import { createEmptyManifest } from '../../../models/manifest';
import { getColorList, replacementMap } from './color/colors';

/**
 * Reads an icon from the file system and returns its content.
 *
 * @param path - The path to the icon file.
 * @param hash - The hash to be replaced in the path if the file is not found.
 * @returns A promise that resolves to the content of the icon file.
 */
export const readIcon = async (path: string, hash: string): Promise<string> => {
  try {
    return await readFile(path, 'utf8');
  } catch {
    const unhashedPath = path.replace(hash, '');
    return await readFile(unhashedPath, 'utf8');
  }
};

/**
 * Clones an icon and changes its colors according to the clone options.
 *
 * @param path - The path to the icon file.
 * @param color - The color to replace in the icon.
 * @param hash - The hash to be replaced in the path if the file is not found.
 * @returns A promise that resolves to the content of the cloned icon.
 */
export const cloneIcon = async (
  path: string,
  color: string,
  hash = ''
): Promise<string> => {
  const baseContent = await readIcon(path, hash);
  const colors = getColorList(baseContent);
  const replacements = replacementMap(color, colors);
  return replaceColorsInSvg(baseContent, replacements);
};

/**
 * Creates a clone manifest with empty light object.
 *
 * @returns A manifest object with empty light object.
 */
export const createCloneManifest = () => {
  const manifest = createEmptyManifest();
  manifest.light = {
    fileExtensions: {},
    fileNames: {},
    folderNames: {},
    folderNamesExpanded: {},
    rootFolderNames: {},
    rootFolderNamesExpanded: {},
    languageIds: {},
  };

  return manifest;
};
