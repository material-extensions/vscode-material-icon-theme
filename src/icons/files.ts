import { FileIcons, IconGroup } from '../models/index';
import { iconFolderPath } from './index';

/**
 * Defines file icons
 */
export const fileIcons: FileIcons = {
    defaultIcon: 'file',
    icons: [
        { name: 'angular', fileNames: ['.angular-cli.json', 'angular-cli.json'] },
        { name: 'javascript', extensions: ['js'] },
        { name: 'angular.component', extensions: ['component.ts', 'component.js'], group: IconGroup.Angular },
        { name: 'angular.routing', extensions: ['routing.ts', 'routing.js'], group: IconGroup.Angular }
    ]
};

/**
 * Get all file icons that can be used in this theme.
 */
export const getFileIconDefinitions = (): IconConfiguration => {
    let definitions = {
        iconDefinitions: {},
        fileExtensions: {},
        fileNames: {}
    };
    fileIcons.icons.forEach(icon => {
        if (icon.disabled) return;
        definitions.iconDefinitions[icon.name] = {
            iconPath: `${iconFolderPath}${icon.name}.svg`
        };
        if (icon.extensions) {
            icon.extensions.forEach(ext => {
                definitions.fileExtensions[ext] = icon.name;
            });
        }
        if (icon.fileNames) {
            icon.fileNames.forEach(fn => {
                definitions.fileNames[fn] = icon.name;
            });
        }
    });

    return definitions;
};
