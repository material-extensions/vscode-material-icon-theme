import { FileIcons, IconConfiguration, FileIcon, IconJsonOptions } from '../../models/index';
import { iconFolderPath, lightVersion, highContrastVersion } from './constants';
import * as merge from 'lodash.merge';

/**
 * Get all file icons that can be used in this theme.
 */
export const getFileIconDefinitions = (fileIcons: FileIcons, config: IconConfiguration, options: IconJsonOptions): IconConfiguration => {
    config = merge({}, config);
    disableIconsByGroup(fileIcons, options.activatedGroups).forEach(icon => {
        if (icon.disabled) return;
        config.iconDefinitions[icon.name] = {
            iconPath: `${iconFolderPath}${icon.name}.svg`
        };
        if (icon.light) {
            config.iconDefinitions[`${icon.name}${lightVersion}`] = {
                iconPath: `${iconFolderPath}${icon.name}${lightVersion}.svg`
            };
        }
        if (icon.highContrast) {
            config.iconDefinitions[`${icon.name}${highContrastVersion}`] = {
                iconPath: `${iconFolderPath}${icon.name}${highContrastVersion}.svg`
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

    return config;
};

/**
 * Map the file extensions and the filenames to the related icons.
 */
const mapSpecificFileIcons = (icon: FileIcon, mappingType: FileMappingType) => {
    const config = new IconConfiguration();
    icon[mappingType].forEach(ext => {
        config[mappingType][ext] = icon.name;
        if (icon.light) {
            config.light[mappingType][ext] = `${icon.name}${lightVersion}`;
        }
        if (icon.highContrast) {
            config.highContrast[mappingType][ext] = `${icon.name}${highContrastVersion}`;
        }
    });
    return config;
};

/**
 * Disable all file icons that are in a group which is disabled.
 */
const disableIconsByGroup = (fileIcons: FileIcons, activatedIconGroups: string[]): FileIcon[] => {
    return fileIcons.icons.filter(icon => {
        return !icon.group ? true : activatedIconGroups.some(group => group === icon.group);
    });
};

const enum FileMappingType {
    FileExtensions = 'fileExtensions',
    FileNames = 'fileNames'
}
