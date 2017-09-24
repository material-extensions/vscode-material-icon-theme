import * as helpers from './../../helpers';
import * as path from 'path';
import * as fs from 'fs';
import { IconConfiguration } from '../../models/IconConfiguration.interface';

export const enableBlueFolderIcons = () => {
    return insertBlueFolderIcons().then(helpers.promptToReload);
};

/** Add blue folder icons to the json file */
const insertBlueFolderIcons = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getMaterialIconsJSON().then(config => {
        fs.writeFileSync(iconJSONPath, JSON.stringify(createConfigWithBlueFoldersIcons(config), null, 2));
    });
};

/** Create new config with blue folder icons */
export const createConfigWithBlueFoldersIcons = (config: IconConfiguration) => {
    return {
        ...config,
        folder: '_folder_blue',
        folderExpanded: '_folder_blue_open',
        folderNames: {},
        folderNamesExpanded: {}
    };
};
