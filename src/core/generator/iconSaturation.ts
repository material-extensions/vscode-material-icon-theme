import { lstat, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { getCustomIconPaths } from '../helpers/customIconPaths';
import { resolvePath } from '../helpers/resolvePath';
import { writeToFile } from '../helpers/writeFile';
import { logger } from '../logging/logger';
import { iconFolderPath } from './constants';

/**
 * Changes saturation of all icons in the set.
 *
 * @param saturation - The saturation value to be applied to the icons.
 * @param filesAssociations - The file associations to be considered.
 */
export const setIconSaturation = async (
  saturation: number,
  filesAssociations: Record<string, string>
) => {
  if (!validateSaturationValue(saturation)) {
    return logger.error(
      'Invalid saturation value! Saturation must be a decimal number between 0 and 1!'
    );
  }

  logger.info(`Setting saturation to ${saturation}...`);

  const iconsPath = resolvePath(iconFolderPath);
  const customIconPaths = getCustomIconPaths(filesAssociations);
  const iconFiles = await readdir(iconsPath);

  // read all icon files from the icons folder
  try {
    for (const iconFileName of iconFiles) {
      await processSVGFileForSaturation(iconsPath, iconFileName, saturation);
    }

    for (const iconPath of customIconPaths) {
      const customIcons = await readdir(iconPath);
      for (const iconFileName of customIcons) {
        await processSVGFileForSaturation(iconPath, iconFileName, saturation);
      }
    }
  } catch (error) {
    logger.error(error);
  }
};

/**
 * Get the SVG root element.
 *
 * @param svg - The SVG file as a string.
 * @returns The root element of the SVG.
 */
const getSVGRootElement = (svg: string): string | undefined => {
  const result = new RegExp(/<svg[^>]*>/).exec(svg);
  return result?.[0];
};

/**
 * Add an filter attribute to the SVG icon.
 *
 * @param svgRoot - The root element of the SVG icon.
 * @returns The updated SVG root element with the filter attribute.
 */
const addFilterAttribute = (svgRoot: string): string => {
  const pattern = new RegExp(/\sfilter="[^"]+?"/);
  // if the filter attribute already exists
  if (pattern.test(svgRoot)) {
    return svgRoot.replace(pattern, ' filter="url(#saturation)"');
  } else {
    return svgRoot.replace(/^<svg/, '<svg filter="url(#saturation)"');
  }
};

/**
 * Remove the filter attribute of the SVG icon.
 *
 * @param svgRoot - The root element of the SVG icon.
 * @returns The updated SVG root element without the filter attribute.
 */
const removeFilterAttribute = (svgRoot: string): string => {
  const pattern = new RegExp(/\sfilter="[^"]+?"/);
  return svgRoot.replace(pattern, '');
};

/**
 * Add filter element to the SVG icon.
 *
 * @param svg - The SVG file as a string.
 * @param saturation - The saturation value to be applied.
 * @returns The updated SVG file with the filter element.
 */
const addFilterElement = (svg: string, saturation: number): string => {
  const pattern = new RegExp(/<filter id="saturation".+<\/filter>(.*<\/svg>)/);
  const filterElement = `<filter id="saturation"><feColorMatrix type="saturate" values="${saturation}"/></filter>`;
  if (pattern.test(svg)) {
    return svg.replace(pattern, `${filterElement}$1`);
  } else {
    return svg.replace(/<\/svg>/, `${filterElement}</svg>`);
  }
};

/**
 * Remove filter element from the SVG icon.
 *
 * @param svg - The SVG file as a string.
 * @returns The updated SVG file without the filter element.
 */
const removeFilterElement = (svg: string): string => {
  const pattern = new RegExp(/<filter id="saturation".+<\/filter>(.*<\/svg>)/);
  return svg.replace(pattern, '$1');
};

/**
 * Validate the saturation value.
 *
 * @param saturation - The saturation value to be validated.
 * @returns True if the saturation value is valid, false otherwise.
 */
export const validateSaturationValue = (
  saturation: number | undefined
): boolean => {
  return saturation !== undefined && saturation <= 1 && saturation >= 0;
};

/**
 * Adjust the saturation of a given SVG string.
 *
 * @param svg - The SVG file as a string.
 * @param saturation - The saturation value to be applied.
 * @returns The updated SVG file with the applied saturation.
 */
export const adjustSVGSaturation = (
  svg: string,
  saturation: number
): string => {
  // Get the root element of the SVG
  const svgRootElement = getSVGRootElement(svg);
  if (!svgRootElement) return svg;

  let updatedRootElement: string;

  if (saturation < 1) {
    updatedRootElement = addFilterAttribute(svgRootElement);
  } else {
    updatedRootElement = removeFilterAttribute(svgRootElement);
  }

  let updatedSVG = svg.replace(/<svg[^>]*>/, updatedRootElement);

  if (saturation < 1) {
    updatedSVG = addFilterElement(updatedSVG, saturation);
  } else {
    updatedSVG = removeFilterElement(updatedSVG);
  }

  return updatedSVG;
};

/**
 * Read an SVG file, adjust its saturation, and write it back.
 *
 * @param iconPath - The path to the icon file.
 * @param iconFileName - The name of the icon file.
 * @param saturation - The saturation value to be applied.
 * @returns A promise that resolves when the file has been processed.
 */
const processSVGFileForSaturation = async (
  iconPath: string,
  iconFileName: string,
  saturation: number
): Promise<void> => {
  const svgFilePath = join(iconPath, iconFileName);
  if (!(await lstat(svgFilePath)).isFile()) return;

  // Read SVG file
  const svg = await readFile(svgFilePath, 'utf-8');
  const updatedSVG = adjustSVGSaturation(svg, saturation);

  await writeToFile(svgFilePath, updatedSVG);
};
