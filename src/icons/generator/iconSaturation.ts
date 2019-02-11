import * as fs from 'fs';
import * as path from 'path';

/**
 * Changes saturation of all icons in the set.
 * @param saturation Saturation value.
 * @param fileNames Only change the saturation of certain file names.
 */
export const setIconSaturation = (saturation: number, fileNames?: string[]) => {
    if (!validateSaturationValue(saturation)) {
        return console.error('Invalid saturation value! Saturation must be a decimal number between 0 and 1!');
    }

    return new Promise((resolve, reject) => {
        let iconsPath = path.join(__dirname, '..', '..', '..');
        const parentFolder = iconsPath.split(path.sep).pop();
        if (parentFolder === 'out') {
            iconsPath = path.join(iconsPath, '..');
        }
        iconsPath = path.join(iconsPath, 'icons');

        // read all icon files from the icons folder
        try {
            (fileNames || fs.readdirSync(iconsPath)).forEach(iconFileName => {
                const svgFilePath = path.join(iconsPath, iconFileName);

                // Read SVG file
                const svg = fs.readFileSync(svgFilePath, 'utf-8');

                // Get the root element of the SVG file
                const svgRootElement = getSVGRootElement(svg);
                if (!svgRootElement) return;

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

                fs.writeFileSync(svgFilePath, updatedSVG);
                resolve();
            });
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
        resolve();
    });
};

/**
 * Get the SVG root element.
 * @param svg SVG file as string.
 */
const getSVGRootElement = (svg: string) => {
    const result = new RegExp(/<svg[^>]*>/).exec(svg);
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
};

/**
 * Add an filter attribute to the SVG icon.
 * @param svgRoot Root element of the SVG icon.
 */
const addFilterAttribute = (svgRoot: string) => {
    const pattern = new RegExp(/\sfilter="[^"]+?"/);
    // if the filter attribute already exists
    if (pattern.test(svgRoot)) {
        return svgRoot.replace(pattern, ` filter="url(#saturation)"`);
    } else {
        return svgRoot.replace(/^<svg/, `<svg filter="url(#saturation)"`);
    }
};

/**
 * Remove the filter attribute of the SVG icon.
 * @param svgRoot Root element of the SVG icon.
 */
const removeFilterAttribute = (svgRoot: string) => {
    const pattern = new RegExp(/\sfilter="[^"]+?"/);
    // check if the filter attribute exists
    if (pattern.test(svgRoot)) {
        return svgRoot.replace(pattern, '');
    }
    return svgRoot;
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
    return svg;
};

/**
 * Remove filter element from the SVG icon.
 * @param svg SVG file as string.
 */
const removeFilterElement = (svg: string) => {
    const pattern = new RegExp(/<filter id="saturation".+<\/filter>(.*<\/svg>)/);
    if (pattern.test(svg)) {
        return svg.replace(pattern, `$1`);
    }
    return svg;
};

/**
 * Validate the saturation value.
 * @param saturation Saturation value
 */
export const validateSaturationValue = (saturation: number) => {
    return saturation !== null && saturation <= 1 && saturation >= 0;
};
