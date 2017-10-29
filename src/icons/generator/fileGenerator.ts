import { FileIcons, IconConfiguration, FileIcon, IconJsonOptions } from '../../models/index';
import { iconFolderPath, lightVersion, highContrastVersion } from './constants';
import * as merge from 'lodash.merge';

/**
 * Get all file icons that can be used in this theme.
 */
export const getFileIconDefinitions = (fileIcons: FileIcons, config: IconConfiguration, options: IconJsonOptions): IconConfiguration => {
    config = merge({}, config);
    const enabledIcons = disableIconsByPack(fileIcons, options.activatedPack);
    enabledIcons.forEach(icon => {
        if (icon.disabled) return;
        config = merge({}, config, setIconDefinition(icon.name));

        if (icon.light) {
            config = merge({}, config, setIconDefinition(icon.name, lightVersion));
        }
        if (icon.highContrast) {
            config = merge({}, config, setIconDefinition(icon.name, highContrastVersion));
        }

        if (icon.fileExtensions) {
            config = merge({}, config, mapSpecificFileIcons(icon, FileMappingType.FileExtensions));
        }
        if (icon.fileNames) {
            config = merge({}, config, mapSpecificFileIcons(icon, FileMappingType.FileNames));
        }
    });

    // set default file icon
    config = merge({}, config, setIconDefinition(fileIcons.defaultIcon.name));
    config.file = fileIcons.defaultIcon.name;

    if (fileIcons.defaultIcon.light) {
        config = merge({}, config, setIconDefinition(fileIcons.defaultIcon.name, lightVersion));
        config.light.file = fileIcons.defaultIcon.name + lightVersion;
    }

    if (fileIcons.defaultIcon.highContrast) {
        config = merge({}, config, setIconDefinition(fileIcons.defaultIcon.name, highContrastVersion));
        config.highContrast.file = fileIcons.defaultIcon.name + highContrastVersion;
    }

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
 * Disable all file icons that are in a pack which is disabled.
 */
const disableIconsByPack = (fileIcons: FileIcons, activatedIconPack: string): FileIcon[] => {
    return fileIcons.icons.filter(icon => {
        return !icon.pack ? true : activatedIconPack === icon.pack;
    });
};

const setIconDefinition = (iconName: string, appendix: string = '') => {
    const obj = { iconDefinitions: {} };
    obj.iconDefinitions[`${iconName}${appendix}`] = {
        iconPath: `${iconFolderPath}${iconName}${appendix}.svg`
    };
    return obj;
};

const enum FileMappingType {
    FileExtensions = 'fileExtensions',
    FileNames = 'fileNames'
}
