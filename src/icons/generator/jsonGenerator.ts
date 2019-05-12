import * as merge from 'lodash.merge';
import * as path from 'path';
import * as fs from 'fs';
import { IconConfiguration, IconJsonOptions } from '../../models/index';
import { fileIcons } from '../fileIcons';
import { folderIcons } from '../folderIcons';
import { languageIcons } from '../languageIcons';
import { iconJsonName } from './constants';
import { generateFolderIcons, getFileIconDefinitions, getFolderIconDefinitions, getLanguageIconDefinitions, setIconOpacity, setIconSaturation, validateHEXColorCode, validateOpacityValue, validateSaturationValue } from './index';

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
export const createIconFile = (updatedConfigs?: IconJsonOptions, updatedJSONConfig: IconJsonOptions = {}) => {
    // override the default options with the new options
    const options: IconJsonOptions = merge({}, getDefaultIconOptions(), updatedJSONConfig);
    const json = generateIconConfigurationObject(options);

    // make sure that the opacity and saturation values must be entered correctly to trigger a reload.
    if (updatedConfigs) {
        if (updatedConfigs.opacity !== undefined && !validateOpacityValue(updatedConfigs.opacity)) {
            throw Error('Material Icons: Invalid opacity value!');
        }
        if (updatedConfigs.saturation !== undefined && !validateSaturationValue(updatedConfigs.saturation)) {
            throw Error('Material Icons: Invalid saturation value!');
        }
    }

    // make sure that the value of the folder color is entered correctly to trigger a reload.
    if (updatedConfigs && updatedConfigs.folders) {
        if (typeof updatedConfigs.folders.color !== 'undefined') {
            if (!validateHEXColorCode(updatedConfigs.folders.color)) {
                throw Error('Material Icons: Invalid folder color value!');
            }
        }
    }

    try {
        let iconsPath = __dirname;
        if (path.basename(__dirname) !== 'dist') {
            // executed via script
            iconsPath = path.join(__dirname, '..', '..', '..', 'dist');
        }
        fs.writeFileSync(path.join(iconsPath, iconJsonName), JSON.stringify(json, undefined, 2), 'utf-8');
    } catch (error) {
        throw Error(error);
    }

    try {
        if (!updatedConfigs || (updatedConfigs.folders || {}).color) {
            // if updatedConfigs do not exist (because of initial setup)
            // or new config value was detected by the change detection
            generateFolderIcons(options.folders.color);
            setIconOpacity(options.opacity, ['folder.svg', 'folder-open.svg', 'folder-root.svg', 'folder-root-open.svg']);
        }
        if (!updatedConfigs || updatedConfigs.opacity !== undefined) {
            setIconOpacity(options.opacity);
        }
        if (!updatedConfigs || updatedConfigs.saturation !== undefined) {
            setIconSaturation(options.saturation);
        }
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
    saturation: 1,
    files: { associations: {} },
    languages: { associations: {} },
});
