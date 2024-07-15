import { lstatSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { getCustomIconPaths } from '../helpers/customIconPaths';
import { resolvePath } from '../helpers/resolvePath';
import { iconFolderPath } from './constants';

/**
 * Changes saturation of all icons in the set.
 * @param config Icon JSON options which include the saturation value.
 * @param fileNames Only change the saturation of certain file names.
 */
export const setIconSaturation = (
  saturation: number,
  filesAssociations: Record<string, string>
) => {
  if (!validateSaturationValue(saturation)) {
    return console.error(
      'Invalid saturation value! Saturation must be a decimal number between 0 and 1!'
    );
  }

  const iconsPath = resolvePath(iconFolderPath);
  const customIconPaths = getCustomIconPaths(filesAssociations);
  const iconFiles = readdirSync(iconsPath);

  // read all icon files from the icons folder
  try {
    iconFiles.forEach((iconFileName) =>
      processSVGFileForSaturation(iconsPath, iconFileName, saturation)
    );

    customIconPaths.forEach((iconPath) => {
      const customIcons = readdirSync(iconPath);
      customIcons.forEach((iconFileName) =>
        processSVGFileForSaturation(iconPath, iconFileName, saturation)
      );
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get the SVG root element.
 * @param svg SVG file as string.
 */
const getSVGRootElement = (svg: string) => {
  const result = new RegExp(/<svg[^>]*>/).exec(svg);
  return result?.[0];
};

/**
 * Add an filter attribute to the SVG icon.
 * @param svgRoot Root element of the SVG icon.
 */
const addFilterAttribute = (svgRoot: string) => {
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
 * @param svgRoot Root element of the SVG icon.
 */
const removeFilterAttribute = (svgRoot: string) => {
  const pattern = new RegExp(/\sfilter="[^"]+?"/);
  return svgRoot.replace(pattern, '');
};

/**
 * Add filter element to the SVG icon.
 * @param svg SVG file as string.
 */
const addFilterElement = (svg: string, saturation: number) => {
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
 * @param svg SVG file as string.
 */
const removeFilterElement = (svg: string) => {
  const pattern = new RegExp(/<filter id="saturation".+<\/filter>(.*<\/svg>)/);
  return svg.replace(pattern, '$1');
};

/**
 * Validate the saturation value.
 * @param saturation Saturation value
 */
export const validateSaturationValue = (saturation: number | undefined) => {
  return saturation !== undefined && saturation <= 1 && saturation >= 0;
};

/** Function to adjust the saturation of a given SVG string */
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

/** Function to read an SVG file, adjust its saturation, and write it back */
const processSVGFileForSaturation = (
  iconPath: string,
  iconFileName: string,
  saturation: number
): void => {
  const svgFilePath = join(iconPath, iconFileName);
  if (!lstatSync(svgFilePath).isFile()) {
    return;
  }

  // Read SVG file
  const svg = readFileSync(svgFilePath, 'utf-8');
  const updatedSVG = adjustSVGSaturation(svg, saturation);

  writeFileSync(svgFilePath, updatedSVG);
};
