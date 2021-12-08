import * as fs from 'fs';
import * as path from 'path';
import { getCustomIconPaths } from '../../helpers/customIcons';
import { IconJsonOptions } from '../../models';

/**
 * Changes the opacity of all icons in the set.
 * @param options Icon JSON options which include the opacity value.
 * @param fileNames Only change the opacity of certain file names.
 */
export const setIconOpacity = (
  options: IconJsonOptions,
  fileNames?: string[]
) => {
  if (!validateOpacityValue(options.opacity)) {
    return console.error(
      'Invalid opacity value! Opacity must be a decimal number between 0 and 1!'
    );
  }

  let iconsPath = '';
  if (path.basename(__dirname) === 'dist') {
    iconsPath = path.join(__dirname, '..', 'icons');
  } else {
    // executed via script
    iconsPath = path.join(__dirname, '..', '..', '..', 'icons');
  }

  const customIconPaths = getCustomIconPaths(options);
  const iconFiles = fs.readdirSync(iconsPath);

  try {
    // read all icon files from the icons folder
    (fileNames || iconFiles).forEach(adjustOpacity(iconsPath, options));

    customIconPaths.forEach((iconPath) => {
      const customIcons = fs.readdirSync(iconPath);
      customIcons.forEach(adjustOpacity(iconPath, options));
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

const adjustOpacity = (
  iconPath: string,
  options: IconJsonOptions
): ((value: string, index: number, array: string[]) => void) => {
  return (iconFileName) => {
    const svgFilePath = path.join(iconPath, iconFileName);

    // Read SVG file
    const svg = fs.readFileSync(svgFilePath, 'utf-8');

    // Get the root element of the SVG file
    const svgRootElement = getSVGRootElement(svg);
    if (!svgRootElement) return;

    let updatedRootElement: string;

    if (options.opacity !== undefined && options.opacity < 1) {
      updatedRootElement = addOpacityAttribute(svgRootElement, options.opacity);
    } else {
      updatedRootElement = removeOpacityAttribute(svgRootElement);
    }
    const updatedSVG = svg.replace(/<svg[^>]*>/, updatedRootElement);

    fs.writeFileSync(svgFilePath, updatedSVG);
  };
};
