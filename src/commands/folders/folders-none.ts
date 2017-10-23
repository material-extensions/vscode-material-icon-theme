import * as helpers from './../../helpers';
import * as path from 'path';
import * as fs from 'fs';
import { IconConfiguration } from "../../models/IconConfiguration.interface";

export const disableFolderIcons = () => {
    return deleteFolderIcons().then(helpers.promptToReload);
};

/** Delete folder icons */
const deleteFolderIcons = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getMaterialIconsJSON().then(config => {
        fs.writeFileSync(iconJSONPath, JSON.stringify(createConfigWithoutFolders(config), null, 2));
    });
};

/** Create new config with no folder icons */
export const createConfigWithoutFolders = (config: IconConfiguration) => {
    return {
        ...config,
        folder: "",
        folderExpanded: "",
        rootFolder: "",
        rootFolderExpanded: "",
        folderNames: {},
        folderNamesExpanded: {}
    };
};