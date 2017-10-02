import { FileIcons, IconConfiguration, FileIcon } from '../../models/index';
import { iconFolderPath } from './constants';
import * as merge from 'lodash.merge';
import { ManifestOptions } from './manifestGenerator';

/**
 * Get all file icons that can be used in this theme.
 */
export const getFileIconDefinitions = (fileIcons: FileIcons, config: IconConfiguration, options: ManifestOptions): IconConfiguration => {
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
            config = merge({}, config, mapSpecificFileIcons(icon, FileMappingType.FileExtensions));
        }
        if (icon.fileNames) {
            config = merge({}, config, mapSpecificFileIcons(icon, FileMappingType.FileNames));
        }
    });

    return { ...config };
};

const mapSpecificFileIcons = (icon: FileIcon, mappingType: FileMappingType) => {
    const config = new IconConfiguration();
    icon[mappingType].forEach(ext => {
        config[mappingType][ext] = icon.name;
        if (icon.light) {
            config.light[mappingType][ext] = `${icon.name}_light`;
        }
        if (icon.highContrast) {
            config.highContrast[mappingType][ext] = `${icon.name}_highContrast`;
        }
    });
    return config;
};

const enum FileMappingType {
    FileExtensions = 'fileExtensions',
    FileNames = 'fileNames'
}

