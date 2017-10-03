import { IconConfiguration, IconGroup, ManifestOptions, FolderType } from '../../models/index';
import {
    getFileIconDefinitions,
    getFolderIconDefinitions,
    getLanguageIconDefinitions
} from './index';
import { fileIcons } from '../fileIcons';
import { folderIcons } from '../folderIcons';
import { languageIcons } from '../languageIcons';
import * as merge from 'lodash.merge';
import * as path from 'path';
import * as fs from 'fs';
import * as helpers from './../../helpers';

/**
 * Generate the complete icon JSON file that will be used to show the icons in the editor.
 */
export const generateIconManifest = (options: ManifestOptions) => {
    const iconConfig = new IconConfiguration();
    const languageIconDefinitions = getLanguageIconDefinitions(languageIcons, iconConfig);
    const fileIconDefinitions = getFileIconDefinitions(fileIcons, iconConfig, options);
    const folderIconDefinitions = getFolderIconDefinitions(folderIcons, iconConfig, options);

    return merge({}, languageIconDefinitions, fileIconDefinitions, folderIconDefinitions);
};

/**
 * Create the JSON file that is responsible for the icons in the editor.
 */
export const createIconFile = (options: ManifestOptions = getIconOptions()) => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    const json = generateIconManifest(options);
    fs.writeFileSync(iconJSONPath, JSON.stringify(json, null, 2));
    helpers.promptToReload();
};

/**
 * The options control the generator and decide which icons are disabled or not.
 */
export const getIconOptions = (): ManifestOptions => {
    const options: ManifestOptions = {
        folderTheme: getCurrentFolderTheme(),
        activatedGroups: {
            [IconGroup.Angular]: getAngularIconsEnabled()
        }
    };
    return options;
};

export const getCurrentFolderTheme = (): FolderType => {
    return <FolderType>helpers.getThemeConfig('folders.icons').globalValue;
};

export const getAngularIconsEnabled = (): boolean => {
    return <boolean>helpers.getThemeConfig('angular.iconsEnabled').globalValue;
};
