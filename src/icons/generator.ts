import {
    getFileIconDefinitions,
    getFolderIconDefinitions,
    getLanguageIconDefinitions
} from './index';
import * as path from 'path';

/**
 * Generate the complete icon JSON file that will be used to show the icons in the editor.
 */
export const iconGenerator = () => {
    return {
        iconDefinitions: getIconDefinitions(),
    };
};

/**
 * Generate the icon definitions object
 */
const getIconDefinitions = () => {
    const defs = {};
    const allIcons: string[] = [
        ...getFileIconDefinitions(),
        ...getFolderIconDefinitions(),
        ...getLanguageIconDefinitions(),
    ];

    // generate object and iconPath
    allIcons.forEach(icon => {
        defs[`${path.parse(icon).name}`] = {
            iconPath: `./../../icons/${icon}.svg`
        };
    });

    return defs;
};
