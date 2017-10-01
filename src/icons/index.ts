import { IconConfiguration, FileIcons, FolderIcons, LanguageIcons } from '../models/index';

import { fileIcons } from './files';
import { folderIcons } from './folders';
import { languageIcons } from './languages';
import { iconFolderPath } from './generator/constants';
import {
    getFileIconDefinitions,
    getFolderIconDefinitions,
    getLanguageIconDefinitions
} from './generator/index';

/**
 * Generate the complete icon JSON file that will be used to show the icons in the editor.
 */
export const iconGenerator = () => {
    const config = new IconConfiguration();
    const fileIconDefinitions = getFileIconDefinitions(fileIcons, config);
    const folderIconDefinitions = getFolderIconDefinitions(folderIcons, config);
    const languageIconDefinitions = getLanguageIconDefinitions(languageIcons, config);

    return {
        ...fileIconDefinitions,
        ...folderIconDefinitions,
        ...languageIconDefinitions,

        // merge icon definitions
        iconDefinitions: {
            ...fileIconDefinitions.iconDefinitions,
            ...folderIconDefinitions.iconDefinitions,
            ...languageIconDefinitions.iconDefinitions,
        }
    };
};
