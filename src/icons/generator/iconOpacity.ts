import * as fs from 'fs';
import * as path from 'path';

/**
 * Changes the opacity of all icons in the set.
 * @param opacity Opacity value
 * @param fileNames Only change the opacity of certain file names.
 */
export const setIconOpacity = (opacity: number, fileNames?: string[]) => {
    if (!validateOpacityValue(opacity)) {
        return console.error('Invalid opacity value! Opacity must be a decimal number between 0 and 1!');
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
                if (+opacity !== 1) {
                    updatedRootElement = addOpacityAttribute(svgRootElement, opacity);
                } else {
                    // if the opacity equals 1 then remove the attribute
                    updatedRootElement = removeOpacityAttribute(svgRootElement);
                }
                const updatedSVG = svg.replace(/<svg[^>]*>/, updatedRootElement);

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
 * Validate the opacity value.
 * @param opacity Opacity value
 */
export const validateOpacityValue = (opacity: number) => {
    return opacity <= 1 && opacity >= 0;
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
    // check if the opacity attribute exists
    if (pattern.test(svgRoot)) {
        return svgRoot.replace(pattern, '');
    }
    return svgRoot;
};
