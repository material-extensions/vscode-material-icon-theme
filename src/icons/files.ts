import { FileTypes, IconGroup } from '../models/index';

/**
 * Defines file icons
 */
export const files: FileTypes = {
    default: 'file.svg',
    types: [
        { icon: 'angular.svg', fileNames: ['.angular-cli.json', 'angular-cli.json'] },
        { icon: 'javascript.svg', extensions: ['js'] },
        { icon: 'angular.component.svg', extensions: ['component.ts', 'component.js'], group: IconGroup.Angular },
        { icon: 'angular.routing.svg', extensions: ['routing.ts', 'routing.js'], group: IconGroup.Angular }
    ]
};
