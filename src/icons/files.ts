import { FileIcons, IconGroup, IconConfiguration } from '../models/index';
import { iconFolderPath } from './index';

/**
 * Defines file icons
 */
export const fileIcons: FileIcons = {
    defaultIcon: { name: 'file' },
    icons: [
        { name: 'angular', fileNames: ['.angular-cli.json', 'angular-cli.json'], light: true },
        { name: 'javascript', fileExtensions: ['js'] },
        { name: 'angular.component', fileExtensions: ['component.ts', 'component.js'], group: IconGroup.Angular },
        { name: 'angular.routing', fileExtensions: ['routing.ts', 'routing.js'], group: IconGroup.Angular },
        { name: 'stylelint', fileNames: ['.stylelintrc', 'stylelint.config.js', '.stylelintrc.json', '.stylelintrc.yaml', '.stylelintrc.yml', '.stylelintrc.js', '.stylelintignore'], light: true }
    ]
};

/**
 * Get all file icons that can be used in this theme.
 */
export const getFileIconDefinitions = (config: IconConfiguration): IconConfiguration => {
    fileIcons.icons.forEach(icon => {
        if (icon.disabled) return;
        config.iconDefinitions[icon.name] = {
            iconPath: `${iconFolderPath}${icon.name}.svg`
        };
        if (icon.light) {
            config.iconDefinitions[`${icon.name}_light`] = {
                iconPath: `${iconFolderPath}${icon.name}_light.svg`
            };
        }
        if (icon.highContrast) {
            config.iconDefinitions[`${icon.name}_highContrast`] = {
                iconPath: `${iconFolderPath}${icon.name}_highContrast.svg`
            };
        }
        if (icon.fileExtensions) {
            icon.fileExtensions.forEach(ext => {
                config['fileExtensions'][ext] = icon.name;
                if (icon.light) {
                    config['light']['fileExtensions'][ext] = `${icon.name}_light`;
                }
                if (icon.highContrast) {
                    config['highContrast']['fileExtensions'][ext] = `${icon.name}_highContrast`;
                }
            });
        }
        if (icon.fileNames) {
            icon.fileNames.forEach(fn => {
                config['fileNames'][fn] = icon.name;
                if (icon.light) {
                    config['light']['fileExtensions'][fn] = `${icon.name}_light`;
                }
                if (icon.highContrast) {
                    config['highContrast']['fileExtensions'][fn] = `${icon.name}_highContrast`;
                }
            });
        }
    });

    return config;
};
