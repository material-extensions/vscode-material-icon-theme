import * as fs from 'fs';
import * as merge from 'lodash.merge';
import * as path from 'path';
import { IconConfiguration, IconJsonOptions } from '../../models/index';
import { fileIcons } from '../fileIcons';
import { folderIcons } from '../folderIcons';
import { languageIcons } from '../languageIcons';
import { iconJsonName } from './constants';
import { setIconOpacity } from './iconOpacity';
import { generateFolderIcons, getFileIconDefinitions, getFolderIconDefinitions, getLanguageIconDefinitions } from './index';

/**
 * Generate the complete icon configuration object that can be written as JSON file.
 */
export const generateIconConfigurationObject = (options: IconJsonOptions): IconConfiguration => {
    const iconConfig = merge({}, new IconConfiguration(), { options });
    const languageIconDefinitions = getLanguageIconDefinitions(languageIcons, iconConfig, options);
    const fileIconDefinitions = getFileIconDefinitions(fileIcons, iconConfig, options);
    const folderIconDefinitions = getFolderIconDefinitions(folderIcons, iconConfig, options);

    return merge({}, languageIconDefinitions, fileIconDefinitions, folderIconDefinitions);
};

/**
 * Create the JSON file that is responsible for the icons in the editor.
 */
export const createIconFile = async (jsonOptions?: IconJsonOptions) => {
    // override the default options with the new options
    const options = merge({}, getDefaultIconOptions(), jsonOptions);

    const iconJSONPath = path.join(__dirname, '../../../', 'src', iconJsonName);
    const json = generateIconConfigurationObject(options);

    try {
        fs.writeFile(iconJSONPath, JSON.stringify(json, undefined, 2), async (err) => {
            if (err) {
                throw Error(err.message);
            }
            if (options.folders.color) {
                await generateFolderIcons(options.folders.color);
            }
            if (options.opacity) {
                await setIconOpacity(options.opacity);
            }
        });
    } catch (error) {
        throw Error(error);
    }
    return iconJsonName;
};

/**
 * The options control the generator and decide which icons are disabled or not.
 */
export const getDefaultIconOptions = (): IconJsonOptions => ({
    folders: {
        theme: 'specific',
        color: '#90a4ae',
        associations: {},
    },
    activeIconPack: 'angular',
    hidesExplorerArrows: false,
    opacity: '1.0',
    files: { associations: {} },
    languages: { associations: {} },
});
