import { IconConfiguration } from '../../models/index';
import {
    getFileIconDefinitions,
    getFolderIconDefinitions,
    getLanguageIconDefinitions
} from './index';
import { fileIcons } from '../fileIcons';
import { folderIcons } from '../folderIcons';
import { languageIcons } from '../languageIcons';

/**
 * Generate the complete icon JSON file that will be used to show the icons in the editor.
 */
export const generateIconManifest = () => {
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
