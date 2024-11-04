import { lstat, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { getCustomIconPaths } from '../helpers/customIconPaths';
import { resolvePath } from '../helpers/resolvePath';
import { writeToFile } from '../helpers/writeFile';
import { logger } from '../logging/logger';
import { iconFolderPath } from './constants';

/**
 * Changes the opacity of all icons in the set.
 * @param {number} opacity - The opacity value to be applied to the icons.
 * @param {Record<string, string>} filesAssociations - The file associations to be considered.
 */
export const setIconOpacity = async (
  opacity: number,
  filesAssociations: Record<string, string>
) => {
  if (!validateOpacityValue(opacity)) {
    return logger.error(
      'Invalid opacity value! Opacity must be a decimal number between 0 and 1!'
    );
  }

  logger.info(`Setting opacity to ${opacity}...`);

  const iconsPath = resolvePath(iconFolderPath);
  const customIconPaths = getCustomIconPaths(filesAssociations);
  const iconFiles = await readdir(iconsPath);

  try {
    // read all icon files from the icons folder
    for (const iconFileName of iconFiles) {
      await processSVGFile(iconsPath, iconFileName, opacity);
    }

    for (const iconPath of customIconPaths) {
      const customIcons = await readdir(iconPath);
      for (const iconFileName of customIcons) {
        await processSVGFile(iconPath, iconFileName, opacity);
      }
    }
  } catch (error) {
    logger.error(error);
  }
};

/**
 * Validate the opacity value.
 * @param {number | undefined} opacity - The opacity value to be validated.
 * @returns {boolean} True if the opacity value is valid, false otherwise.
 */
export const validateOpacityValue = (opacity: number | undefined) => {
  return opacity !== undefined && opacity <= 1 && opacity >= 0;
};

/**
 * Get the SVG root element.
 * @param {string} svg - The SVG file as a string.
 * @returns {string | undefined} The root element of the SVG.
 */
const getSVGRootElement = (svg: string) => {
  const result = new RegExp(/<svg[^>]*>/).exec(svg);
  return result?.[0];
};

/**
 * Add an opacity attribute to the SVG icon to control the opacity of the icon.
 * @param {string} svgRoot - The root element of the SVG icon.
 * @param {number} opacity - The opacity value to be added.
 * @returns {string} The updated SVG root element with the opacity attribute.
 */
const addOpacityAttribute = (svgRoot: string, opacity: number) => {
  const pattern = new RegExp(/\sopacity="[\d.]+"/);
  // if the opacity attribute already exists
  if (pattern.test(svgRoot)) {
    return svgRoot.replace(pattern, ` opacity="${opacity}"`);
  } else {
    return svgRoot.replace(/^<svg/, `<svg opacity="${opacity}"`);
  }
};

/**
 * Remove the opacity attribute of the SVG icon.
 * @param {string} svgRoot - The root element of the SVG icon.
 * @returns {string} The updated SVG root element without the opacity attribute.
 */
const removeOpacityAttribute = (svgRoot: string) => {
  const pattern = new RegExp(/\sopacity="[\d.]+"/);
  return svgRoot.replace(pattern, '');
};

/**
 * Add or remove opacity from a given SVG string.
 * @param {string} svg - The SVG file as a string.
 * @param {number} opacity - The opacity value to be applied.
 * @returns {string} The updated SVG file with the applied opacity.
 */
export const updateSVGOpacity = (svg: string, opacity: number): string => {
  const svgRootElement = getSVGRootElement(svg);
  if (!svgRootElement) return svg;

  let updatedRootElement: string;
  if (opacity < 1) {
    updatedRootElement = addOpacityAttribute(svgRootElement, opacity);
  } else {
    updatedRootElement = removeOpacityAttribute(svgRootElement);
  }
  return svg.replace(/<svg[^>]*>/, updatedRootElement);
};

/**
 * Read an SVG file, update its opacity, and write it back.
 * @param {string} iconPath - The path to the icon file.
 * @param {string} iconFileName - The name of the icon file.
 * @param {number} opacity - The opacity value to be applied.
 * @returns {Promise<void>} A promise that resolves when the file has been processed.
 */
const processSVGFile = async (
  iconPath: string,
  iconFileName: string,
  opacity: number
): Promise<void> => {
  const svgFilePath = join(iconPath, iconFileName);
  if (!(await lstat(svgFilePath)).isFile()) {
    return;
  }

  // Read SVG file
  const svg = await readFile(svgFilePath, 'utf-8');
  const updatedSVG = updateSVGOpacity(svg, opacity);

  if (updatedSVG.trim().length === 0) return;
  await writeToFile(svgFilePath, updatedSVG);
};
