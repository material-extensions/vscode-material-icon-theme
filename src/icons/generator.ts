import {
    getFileIconDefinitions,
    getFolderIconDefinitions,
    getLanguageIconDefinitions
} from './index';
import * as path from 'path';

/**
 * Generate the complete icon JSON file that will be used to show the icons in the editor.
 */
export const iconGenerator = () => ({
    ...getFileIconDefinitions(),
    ...getFolderIconDefinitions(),
    ...getLanguageIconDefinitions(),

    // merge icon definitions
    iconDefinitions: {
        ...getFileIconDefinitions().iconDefinitions,
        ...getFolderIconDefinitions().iconDefinitions,
        ...getLanguageIconDefinitions().iconDefinitions,
    },
});
