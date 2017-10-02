import { IconConfiguration, IconGroup } from '../../models/index';
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
import { FolderType } from '../../models/FolderType.enum';

/**
 * Generate the complete icon JSON file that will be used to show the icons in the editor.
 */
export const generateIconManifest = (options: ManifestOptions) => {
    const iconConfig = new IconConfiguration();
    console.log(options);
    const languageIconDefinitions = getLanguageIconDefinitions(languageIcons, iconConfig);
    const fileIconDefinitions = getFileIconDefinitions(fileIcons, iconConfig, options);
    const folderIconDefinitions = getFolderIconDefinitions(folderIcons, iconConfig, options);

    return merge({}, languageIconDefinitions, fileIconDefinitions, folderIconDefinitions);
};

export const createIconFile = () => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    const options: ManifestOptions = {
        folderTheme: FolderType.Specific,
        activatedGroups: {
            [IconGroup.Angular]: true
        }
    };
    const json = generateIconManifest(options);
    // return json;
    console.log('write file to ' + iconJSONPath);
    fs.writeFileSync(iconJSONPath, JSON.stringify(json, null, 2));
};

export interface ManifestOptions {
    folderTheme?: FolderType;
    activatedGroups?: {
        [name: string]: boolean;
    };
}
