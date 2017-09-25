import { FileIcons, IconGroup } from '../models/index';

/**
 * Defines file icons
 */
export const fileIcons: FileIcons = {
    default: 'file',
    types: [
        { icon: 'angular', fileNames: ['.angular-cli.json', 'angular-cli.json'] },
        { icon: 'javascript', extensions: ['js'] },
        { icon: 'angular.component', extensions: ['component.ts', 'component.js'], group: IconGroup.Angular },
        { icon: 'angular.routing', extensions: ['routing.ts', 'routing.js'], group: IconGroup.Angular }
    ]
};

/**
 * Get all file icons that can be used in this theme.
 */
export const getFileIconDefinitions = (): string[] => [
    fileIcons.default,
    ...fileIcons.types.map(type => type.icon),
];
