import { IconConfiguration, IconGroup, IconJsonOptions, FolderType } from '../../models/index';
import { getFileIconDefinitions, getFolderIconDefinitions, getLanguageIconDefinitions } from './index';
import { fileIcons } from '../fileIcons';
import { folderIcons } from '../folderIcons';
import { languageIcons } from '../languageIcons';
import { iconJsonName } from './constants';
import * as merge from 'lodash.merge';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Generate the complete icon JSON file that will be used to show the icons in the editor.
 */
export const generateIconJson = (options: IconJsonOptions) => {
    const iconConfig = new IconConfiguration();
    const languageIconDefinitions = getLanguageIconDefinitions(languageIcons, iconConfig);
    const fileIconDefinitions = getFileIconDefinitions(fileIcons, iconConfig, options);
    const folderIconDefinitions = getFolderIconDefinitions(folderIcons, iconConfig, options);

    return merge({}, languageIconDefinitions, fileIconDefinitions, folderIconDefinitions);
};

/**
 * Create the JSON file that is responsible for the icons in the editor.
 */
export const createIconFile = (options: IconJsonOptions = getDefaultIconOptions()) => {
    const fileName = iconJsonName;
    const iconJSONPath = path.join(__dirname, '../../../', 'src', fileName);
    const json = generateIconJson(options);
    return new Promise((resolve, reject) => {
        fs.writeFile(iconJSONPath, JSON.stringify(json, null, 2), (err) => {
            if (err) {
                reject(err);
            }
            resolve(fileName);
        });
    });
};

/**
 * The options control the generator and decide which icons are disabled or not.
 */
export const getDefaultIconOptions = (): IconJsonOptions => {
    const options: IconJsonOptions = {
        folderTheme: FolderType.Specific,
        activatedGroups: {
            [IconGroup.Angular]: true
        }
    };
    return options;
};
