import * as fs from 'fs';
import * as merge from 'lodash.merge';
import * as path from 'path';
import { IconConfiguration, IconJsonOptions } from '../../models/index';
import { fileIcons } from '../fileIcons';
import { folderIcons } from '../folderIcons';
import { languageIcons } from '../languageIcons';
import { iconJsonName } from './constants';
import { generateFolderIcons, getFileIconDefinitions, getFolderIconDefinitions, getLanguageIconDefinitions, setIconOpacity } from './index';

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
 * @param updatedConfigs Options that have been changed.
 * @param updatedJSONConfig New JSON options that already include the updatedConfigs.
 */
export const createIconFile = async (updatedConfigs?: IconJsonOptions, updatedJSONConfig: IconJsonOptions = {}) => {
    // override the default options with the new options
    const options: IconJsonOptions = merge({}, getDefaultIconOptions(), updatedJSONConfig);

    const iconJSONPath = path.join(__dirname, '../../../', 'src', iconJsonName);
    const json = generateIconConfigurationObject(options);

    try {
        await fs.writeFile(iconJSONPath, JSON.stringify(json, undefined, 2), async (err) => {
            if (err) {
                throw Error(err.message);
            }
            // if updatedConfigs do not exist (because of initial setup)
            // or new config value was detected by the change detection
            if (!updatedConfigs || (updatedConfigs.folders || {}).color) {
                await generateFolderIcons(options.folders.color);
                await setIconOpacity(options.opacity, ['folder.svg', 'folder-open.svg', 'folder-root.svg', 'folder-root-open.svg']);
            }
            if (!updatedConfigs || updatedConfigs.opacity !== undefined) {
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
    opacity: 1,
    files: { associations: {} },
    languages: { associations: {} },
});
