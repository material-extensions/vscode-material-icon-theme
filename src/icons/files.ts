import { FileTypes } from "../models/index";

/**
 * Defines file icons
 */
export const files: FileTypes = {
    default: { icon: 'file.svg' },
    types: [
        { icon: 'angular.svg', fileNames: ['.angular-cli.json', 'angular-cli.json'] },
        { icon: 'javascript.svg', extensions: ['js'] }
    ]
};
