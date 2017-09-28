import { FileIcons, IconGroup, IconConfiguration } from '../models/index';
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
        { name: 'angular.routing', extensions: ['routing.ts', 'routing.js'], group: IconGroup.Angular },
        { name: 'stylelint', fileNames: ['.stylelintrc', 'stylelint.config.js', '.stylelintrc.json', '.stylelintrc.yaml', '.stylelintrc.yml', '.stylelintrc.js', '.stylelintignore'], light: true }
    ]
};

/**
 * Get all file icons that can be used in this theme.
 */
export const getFileIconDefinitions = (): IconConfiguration => {
    let definitions = {
        iconDefinitions: {},
        fileExtensions: {},
        fileNames: {},
        light: {
            fileExtensions: {},
            fileNames: {},
        }
    };

    fileIcons.icons.forEach(icon => {
        if (icon.disabled) return;
        definitions['iconDefinitions'][icon.name] = {
            iconPath: `${iconFolderPath}${icon.name}.svg`
        };
        if (icon.light) {
            definitions['iconDefinitions'][`${icon.name}_light`] = {
                iconPath: `${iconFolderPath}${icon.name}_light.svg`
            };
        }
        if (icon.extensions) {
            icon.extensions.forEach(ext => {
                definitions['fileExtensions'][ext] = icon.name;
                if (icon.light) {
                    definitions['light']['fileExtensions'][ext] = `${icon.name}_light`;
                }
            });
        }
        if (icon.fileNames) {
            icon.fileNames.forEach(fn => {
                definitions['fileNames'][fn] = icon.name;
                if (icon.light) {
                    definitions['light']['fileExtensions'][fn] = `${icon.name}_light`;
                }
            });
        }
    });

    return definitions;
};
