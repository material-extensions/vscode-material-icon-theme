import { lstatSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { getCustomIconPaths } from '../../extension/shared/config';
import { resolvePath } from '../../helpers/resolvePath';
import { iconFolderPath } from './constants';

/**
 * Changes the opacity of all icons in the set.
 * @param config Icon JSON options which include the opacity value.
 */
export const setIconOpacity = (opacity: number) => {
  if (!validateOpacityValue(opacity)) {
    return console.error(
      'Invalid opacity value! Opacity must be a decimal number between 0 and 1!'
    );
  }

  const iconsPath = resolvePath(iconFolderPath);
  const customIconPaths = getCustomIconPaths();
  const iconFiles = readdirSync(iconsPath);

  try {
    // read all icon files from the icons folder
    iconFiles.forEach((iconFileName) =>
      processSVGFile(iconsPath, iconFileName, opacity)
    );

    customIconPaths.forEach((iconPath) => {
      const customIcons = readdirSync(iconPath);
      customIcons.forEach((iconFileName) =>
        processSVGFile(iconPath, iconFileName, opacity)
      );
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Validate the opacity value.
 * @param opacity Opacity value
 */
export const validateOpacityValue = (opacity: number | undefined) => {
  return opacity !== undefined && opacity <= 1 && opacity >= 0;
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
 * Add an opacity attribute to the SVG icon to control the opacity of the icon.
 * @param svgRoot Root element of the SVG icon.
 * @param opacity Opacity value.
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
 * @param svgRoot Root element of the SVG icon.
 */
const removeOpacityAttribute = (svgRoot: string) => {
  const pattern = new RegExp(/\sopacity="[\d.]+"/);
  return svgRoot.replace(pattern, '');
};

/** Function to add or remove opacity from a given SVG string */
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

/** Function to read an SVG file, update its opacity, and write it back */
const processSVGFile = (
  iconPath: string,
  iconFileName: string,
  opacity: number
): void => {
  const svgFilePath = join(iconPath, iconFileName);
  if (!lstatSync(svgFilePath).isFile()) {
    return;
  }

  // Read SVG file
  const svg = readFileSync(svgFilePath, 'utf-8');
  const updatedSVG = updateSVGOpacity(svg, opacity);

  writeFileSync(svgFilePath, updatedSVG);
};
