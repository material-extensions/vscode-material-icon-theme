import * as helpers from './../../helpers';
import * as path from 'path';
import * as fs from 'fs';
import { IconConfiguration } from "../../models/IconConfiguration.interface";

export const enableClassicFolderIcons = () => {
    return insertClassicFolderIcons().then(helpers.promptToReload);
};

/** Add classic folder icons to the json file */
const insertClassicFolderIcons = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getMaterialIconsJSON().then(config => {
        fs.writeFileSync(iconJSONPath, JSON.stringify(createConfigWithClassicFoldersIcons(config), null, 2));
    });
};

/** Create new config with classic folder icons */
export const createConfigWithClassicFoldersIcons = (config: IconConfiguration) => {
    return {
        ...config,
        folder: "_folder",
        folderExpanded: "_folder_open",
        folderNames: {},
        folderNamesExpanded: {}
    };
};