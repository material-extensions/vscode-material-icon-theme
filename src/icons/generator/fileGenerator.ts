import * as merge from 'lodash.merge';
import { FileIcon, FileIcons, IconAssociations, IconConfiguration, IconJsonOptions } from '../../models/index';
import { highContrastVersion, iconFolderPath, lightVersion, wildcardPattern } from './constants';

/**
 * Get all file icons that can be used in this theme.
 */
export const getFileIconDefinitions = (fileIcons: FileIcons, config: IconConfiguration, options: IconJsonOptions): IconConfiguration => {
    config = merge({}, config);
    const enabledIcons = disableIconsByPack(fileIcons, options.activeIconPack);
    const customIcons = getCustomIcons(options.files.associations);
    const allFileIcons = [...enabledIcons, ...customIcons];

    allFileIcons.forEach(icon => {
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
            config = merge({}, config, mapSpecificFileIcons(icon, FileMappingType.FileNames, options.files.associations));
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
const mapSpecificFileIcons = (icon: FileIcon, mappingType: FileMappingType, customFileAssociation: IconAssociations = {}) => {
    const config = new IconConfiguration();
    icon[mappingType].forEach(name => {
        // if the custom file extension should also overwrite the file names
        const shouldOverwriteFileNames = Object.keys(customFileAssociation).some(key => {
            // overwrite is enabled if there are two asterisks in the wildcard
            if (!/^\*{2}\./.test(key)) return false;
            const fileExtension = key.replace(wildcardPattern, '.');

            // check if the file name contains the particular file extension
            // (e.g. extension ".md" in "Readme.md" -> then overwrite it with the *.md icon)
            return name.toLowerCase().indexOf(fileExtension.toLowerCase()) !== -1;
        });

        // if overwrite is enabled then do not continue to set the icons for file names containing the file extension
        if (shouldOverwriteFileNames) return;

        config[mappingType][name] = icon.name;
        if (icon.light) {
            config.light[mappingType][name] = `${icon.name}${lightVersion}`;
        }
        if (icon.highContrast) {
            config.highContrast[mappingType][name] = `${icon.name}${highContrastVersion}`;
        }
    });
    return config;
};

/**
 * Disable all file icons that are in a pack which is disabled.
 */
const disableIconsByPack = (fileIcons: FileIcons, activatedIconPack: string): FileIcon[] => {
    return fileIcons.icons.filter(icon => {
        return !icon.enabledFor ? true : icon.enabledFor.some(p => p === activatedIconPack);
    });
};

const setIconDefinition = (iconName: string, appendix: string = '') => {
    const obj = { iconDefinitions: {} };
    obj.iconDefinitions[`${iconName}${appendix}`] = {
        iconPath: `${iconFolderPath}${iconName}${appendix}.svg`
    };
    return obj;
};

const getCustomIcons = (fileAssociations: IconAssociations) => {
    if (!fileAssociations) return [];

    const icons: FileIcon[] = Object.keys(fileAssociations).map(fa => {
        const icon: FileIcon = { name: fileAssociations[fa].toLowerCase() };
        if (wildcardPattern.test(fa)) {
            icon.fileExtensions = [fa.toLowerCase().replace(wildcardPattern, '')];
        } else {
            icon.fileNames = [fa.toLowerCase()];
        }
        return icon;
    });
    return icons;
};

const enum FileMappingType {
    FileExtensions = 'fileExtensions',
    FileNames = 'fileNames'
}
