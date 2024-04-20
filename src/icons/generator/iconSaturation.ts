import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, join } from 'path';
import { getCustomIconPaths } from '../../helpers/customIcons';
import { IconJsonOptions } from '../../models';

/**
 * Changes saturation of all icons in the set.
 * @param options Icon JSON options which include the saturation value.
 * @param fileNames Only change the saturation of certain file names.
 */
export const setIconSaturation = (
  options: IconJsonOptions,
  fileNames?: string[]
) => {
  if (!validateSaturationValue(options.saturation)) {
    return console.error(
      'Invalid saturation value! Saturation must be a decimal number between 0 and 1!'
    );
  }

  let iconsPath = '';
  if (basename(__dirname) === 'dist') {
    iconsPath = join(__dirname, '..', 'icons');
  } else {
    // executed via script
    iconsPath = join(__dirname, '..', '..', '..', 'icons');
  }

  const customIconPaths = getCustomIconPaths(options);
  const iconFiles = readdirSync(iconsPath);

  // read all icon files from the icons folder
  try {
    (fileNames || iconFiles).forEach(adjustSaturation(iconsPath, options));

    customIconPaths.forEach((iconPath) => {
      const customIcons = readdirSync(iconPath);
      customIcons.forEach(adjustSaturation(iconPath, options));
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
const addFilterElement = (svg: string, value: number) => {
  const pattern = new RegExp(/<filter id="saturation".+<\/filter>(.*<\/svg>)/);
  const filterElement = `<filter id="saturation"><feColorMatrix type="saturate" values="${value}"/></filter>`;
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

const adjustSaturation = (
  iconsPath: any,
  options: IconJsonOptions
): ((value: string, index: number, array: string[]) => void) => {
  return (iconFileName) => {
    const svgFilePath = join(iconsPath, iconFileName);

    // Read SVG file
    const svg = readFileSync(svgFilePath, 'utf-8');

    // Get the root element of the SVG file
    const svgRootElement = getSVGRootElement(svg);
    if (!svgRootElement) return;

    let updatedRootElement: string;

    if (options.saturation !== undefined && options.saturation < 1) {
      updatedRootElement = addFilterAttribute(svgRootElement);
    } else {
      updatedRootElement = removeFilterAttribute(svgRootElement);
    }

    let updatedSVG = svg.replace(/<svg[^>]*>/, updatedRootElement);

    if (options.saturation !== undefined && options.saturation < 1) {
      updatedSVG = addFilterElement(updatedSVG, options.saturation);
    } else {
      updatedSVG = removeFilterElement(updatedSVG);
    }

    writeFileSync(svgFilePath, updatedSVG);
  };
};
