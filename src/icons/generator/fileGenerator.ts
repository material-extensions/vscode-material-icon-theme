import { FileIcons, IconConfiguration } from '../../models/index';
import { iconFolderPath } from './constants';

/**
 * Get all file icons that can be used in this theme.
 */
export const getFileIconDefinitions = (fileIcons: FileIcons, config: IconConfiguration): IconConfiguration => {
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
                config.fileExtensions[ext] = icon.name;
                if (icon.light) {
                    config.light.fileExtensions[ext] = `${icon.name}_light`;
                }
                if (icon.highContrast) {
                    config.highContrast.fileExtensions[ext] = `${icon.name}_highContrast`;
                }
            });
        }
        if (icon.fileNames) {
            icon.fileNames.forEach(fn => {
                config['fileNames'][fn] = icon.name;
                if (icon.light) {
                    config.light.fileNames[fn] = `${icon.name}_light`;
                }
                if (icon.highContrast) {
                    config.highContrast.fileNames[fn] = `${icon.name}_highContrast`;
                }
            });
        }
    });

    return config;
};
