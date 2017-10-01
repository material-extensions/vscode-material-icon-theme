import { IconConfiguration } from '../../models/index';
import {
    getFileIconDefinitions,
    getFolderIconDefinitions,
    getLanguageIconDefinitions
} from './index';
import { fileIcons } from '../files';
import { folderIcons } from '../folders';
import { languageIcons } from '../languages';

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
