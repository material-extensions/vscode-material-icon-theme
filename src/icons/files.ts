import { FileTypes, IconGroup } from '../models/index';

/**
 * Defines file icons
 */
export const files: FileTypes = {
    default: 'file',
    types: [
        { icon: 'angular', fileNames: ['.angular-cli.json', 'angular-cli.json'] },
        { icon: 'javascript', extensions: ['js'] },
        { icon: 'angular.component', extensions: ['component.ts', 'component.js'], group: IconGroup.Angular },
        { icon: 'angular.routing', extensions: ['routing.ts', 'routing.js'], group: IconGroup.Angular }
    ]
};
