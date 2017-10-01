import {
    getFileIconDefinitions,
    getFolderIconDefinitions,
    getLanguageIconDefinitions
} from './index';
import * as path from 'path';
import { IconConfiguration } from '../models/index';

/**
 * Generate the complete icon JSON file that will be used to show the icons in the editor.
 */
export const iconGenerator = (): IconConfiguration => {
    const config = new IconConfiguration();
    return {
        ...getFileIconDefinitions(config),
        ...getFolderIconDefinitions(),
        ...getLanguageIconDefinitions(),

        // merge icon definitions
        iconDefinitions: {
            ...getFileIconDefinitions(config).iconDefinitions,
            ...getFolderIconDefinitions().iconDefinitions,
            ...getLanguageIconDefinitions().iconDefinitions,
        }
    }
};
