import { iconFolderPath, openedFolder, lightVersion, highContrastVersion } from './constants';
import { IconConfiguration, FolderTheme, FolderIcon, IconJsonOptions, DefaultIcon, IconAssociations } from '../../models/index';
import * as merge from 'lodash.merge';

/**
 * Get the folder icon definitions as object.
 */
export const getFolderIconDefinitions = (folderThemes: FolderTheme[], config: IconConfiguration, options: IconJsonOptions): IconConfiguration => {
    config = merge({}, config);
    config.hidesExplorerArrows = options.hidesExplorerArrows;
    const activeTheme = getEnabledFolderTheme(folderThemes, options.folderTheme);
    const enabledIcons = disableIconsByPack(activeTheme, options.activatedPack);
    const customIcons = getCustomIcons(options.folderAssociations);
    const allIcons = [...enabledIcons, ...customIcons];

    if (options.folderTheme === 'none') {
        return config;
    }

    allIcons.forEach(icon => {
        if (icon.disabled) return;
        config = setIconDefinitions(config, icon);
        config = merge({}, config, setFolderNames(icon.name, icon.folderNames));
        config.light = icon.light ? merge({}, config.light, setFolderNames(icon.name, icon.folderNames, lightVersion)) : config.light;
        config.highContrast = icon.highContrast ? merge({}, config.highContrast, setFolderNames(icon.name, icon.folderNames, highContrastVersion)) : config.highContrast;
    });

    config = setDefaultFolderIcons(activeTheme, config);
    return config;
};

/**
 * Set the default folder icons for the theme.
 */
const setDefaultFolderIcons = (theme: FolderTheme, config: IconConfiguration): IconConfiguration => {
    config = merge({}, config);
    const hasFolderIcons = theme.defaultIcon.name && theme.defaultIcon.name.length > 0;
    if (hasFolderIcons) {
        config = setIconDefinitions(config, theme.defaultIcon);
    }
    config = merge({}, config, createDefaultIconConfigObject(hasFolderIcons, theme, ''));
    config.light = theme.defaultIcon.light ? merge({}, config.light, createDefaultIconConfigObject(hasFolderIcons, theme, lightVersion)) : config.light;
    config.highContrast = theme.defaultIcon.highContrast ? merge({}, config.highContrast, createDefaultIconConfigObject(hasFolderIcons, theme, highContrastVersion)) : config.highContrast;

    config = merge({}, config, createRootIconConfigObject(hasFolderIcons, theme, ''));
    if (theme.rootFolder) {
        config = setIconDefinitions(config, theme.rootFolder);
        config.light = theme.rootFolder.light ? merge({}, config.light, createRootIconConfigObject(hasFolderIcons, theme, lightVersion)) : config.light;
        config.highContrast = theme.rootFolder.highContrast ? merge({}, config.highContrast, createRootIconConfigObject(hasFolderIcons, theme, highContrastVersion)) : config.highContrast;
    }

    return config;
};

/**
 * Get the object of the current enabled theme.
 */
const getEnabledFolderTheme = (themes: FolderTheme[], enabledTheme: string): FolderTheme => {
    return themes.find(theme => theme.name === enabledTheme);
};

/**
 * Disable all file icons that are in a pack which is disabled.
 */
const disableIconsByPack = (folderIcons: FolderTheme, activatedIconPack: string): FolderIcon[] => {
    if (!folderIcons.icons || folderIcons.icons.length === 0) {
        return [];
    }
    return folderIcons.icons.filter(icon => {
        return !icon.enabledFor ? true : icon.enabledFor.some(p => p === activatedIconPack);
    });
};

const setIconDefinitions = (config: IconConfiguration, icon: FolderIcon | DefaultIcon) => {
    config = merge({}, config);
    config = createIconDefinitions(config, icon.name);
    config = merge({}, config, icon.light ? createIconDefinitions(config, icon.name, lightVersion) : config.light);
    config = merge({}, config, icon.highContrast ? createIconDefinitions(config, icon.name, highContrastVersion) : config.highContrast);
    return config;
};

const createIconDefinitions = (config: IconConfiguration, iconName: string, appendix: string = '') => {
    config = merge({}, config);
    config.iconDefinitions[iconName + appendix] = {
        iconPath: `${iconFolderPath}${iconName}${appendix}.svg`
    };
    config.iconDefinitions[`${iconName}${openedFolder}${appendix}`] = {
        iconPath: `${iconFolderPath}${iconName}${openedFolder}${appendix}.svg`
    };
    return config;
};

const setFolderNames = (iconName: string, folderNames: string[], appendix: string = '') => {
    const obj = { folderNames: {}, folderNamesExpanded: {} };
    folderNames.forEach(fn => {
        obj.folderNames[fn] = iconName + appendix;
        obj.folderNamesExpanded[fn] = `${iconName}${openedFolder}${appendix}`;
    });
    return obj;
};

const createDefaultIconConfigObject = (hasFolderIcons: boolean, theme: FolderTheme, appendix: string = '') => {
    const obj = {
        folder: '',
        folderExpanded: ''
    };
    obj.folder = hasFolderIcons ? theme.defaultIcon.name + appendix : '';
    obj.folderExpanded = hasFolderIcons ? `${theme.defaultIcon.name}${openedFolder}${appendix}` : '';
    return obj;
};

const createRootIconConfigObject = (hasFolderIcons: boolean, theme: FolderTheme, appendix: string = '') => {
    const obj = {
        rootFolder: '',
        rootFolderExpanded: ''
    };
    obj.rootFolder = hasFolderIcons ? theme.rootFolder ? theme.rootFolder.name + appendix : theme.defaultIcon.name + appendix : '';
    obj.rootFolderExpanded = hasFolderIcons ? theme.rootFolder ? `${theme.rootFolder.name}${openedFolder}${appendix}` : `${theme.defaultIcon.name}${openedFolder}${appendix}` : '';
    return obj;
};

const getCustomIcons = (folderAssociations: IconAssociations) => {
    if (!folderAssociations) return [];

    const icons: FolderIcon[] = Object.keys(folderAssociations).map(fa => ({
        name: 'folder-' + folderAssociations[fa],
        folderNames: [fa]
    }));

    return icons;
};
