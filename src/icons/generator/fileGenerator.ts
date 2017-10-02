import { FileIcons, IconConfiguration, FileIcon } from '../../models/index';
import { iconFolderPath } from './constants';
import * as merge from 'lodash.merge';
import { ManifestOptions } from './manifestGenerator';

/**
 * Get all file icons that can be used in this theme.
 */
export const getFileIconDefinitions = (fileIcons: FileIcons, config: IconConfiguration, options: ManifestOptions): IconConfiguration => {
    disableIconsByGroup(fileIcons, options.activatedGroups).forEach(icon => {
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

    // set default file icon
    config.iconDefinitions[fileIcons.defaultIcon.name] = {
        iconPath: `${iconFolderPath}${fileIcons.defaultIcon.name}.svg`
    };
    config.file = fileIcons.defaultIcon.name;

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

/**
 * Disable all file icons that are in a group which is disabled.
 */
const disableIconsByGroup = (fileIcons: FileIcons, activatedIconGroups): FileIcon[] => {
    return fileIcons.icons.filter(icon => {
        return !icon.group ? true : activatedIconGroups[icon.group] || false;
    });
};

const enum FileMappingType {
    FileExtensions = 'fileExtensions',
    FileNames = 'fileNames'
}

