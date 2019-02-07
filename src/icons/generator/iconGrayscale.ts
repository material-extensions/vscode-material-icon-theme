import * as fs from 'fs';
import * as path from 'path';

/**
 * Changes all icons in the set to grayscale.
 * @param fileNames Only change the grayscale of certain file names.
 */
export const setIconGrayscale = (enable: boolean, fileNames?: string[]) => {

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
                if (enable) {
                    updatedRootElement = addFilterAttribute(svgRootElement);
                } else {
                    updatedRootElement = removeFilterAttribute(svgRootElement);
                }
                let updatedSVG = svg.replace(/<svg[^>]*>/, updatedRootElement);
                if (enable) {
                    updatedSVG = addFilterElement(updatedSVG);
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
    const filter = 'url(#grayscale)';
    // if the filter attribute already exists
    if (pattern.test(svgRoot)) {
        return svgRoot.replace(pattern, ` filter="${filter}"`);
    } else {
        return svgRoot.replace(/^<svg/, `<svg filter="${filter}"`);
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
const addFilterElement = (svg: string) => {
    const pattern = new RegExp(/<filter id="grayscale".+<\/filter>.*<\/svg>/);
    if (!pattern.test(svg)) {
        const filterElement = `<filter id="grayscale"><feColorMatrix type="saturate" values="0"/></filter>`;
        return svg.replace(/<\/svg>/, `${filterElement}</svg>`);
    }
    return svg;
};

/**
 * Remove filter element from the SVG icon.
 * @param svg SVG file as string.
 */
const removeFilterElement = (svg: string) => {
    const pattern = new RegExp(/<filter id="grayscale".+<\/filter>(.*<\/svg>)/);
    if (pattern.test(svg)) {
        return svg.replace(pattern, `$1`);
    }
    return svg;
};
