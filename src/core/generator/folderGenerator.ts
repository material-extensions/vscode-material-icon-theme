import { getFileConfigHash } from '../helpers/configHash';
import { merge } from '../helpers/object';
import { logger } from '../logging/logger';
import type { Config, IconAssociations } from '../models/icons/config';
import type { DefaultIcon } from '../models/icons/defaultIcon';
import type { FolderIcon } from '../models/icons/folders/folderIcon';
import type { FolderTheme } from '../models/icons/folders/folderTheme';
import type { IconPackValue } from '../models/icons/iconPack';
import type { Manifest } from '../models/manifest';
import {
  cloneIconExtension,
  highContrastColorFileEnding,
  iconFolderPath,
  lightColorFileEnding,
  openedFolder,
} from './constants';
import { getPath, getSVG, writeSVGFiles } from './shared/svg';
import { validateHEXColorCode } from './shared/validation';

/**
 * Get the folder icon definitions as object.
 *
 * @param folderIcons - The folder icons to be used in the theme.
 * @param config - The configuration object for the icons.
 * @param manifest - The manifest object to be updated with the folder icons.
 * @returns The updated manifest object with the folder icons.
 */
export const loadFolderIconDefinitions = (
  folderIcons: FolderTheme[],
  config: Config,
  manifest: Manifest
): Manifest => {
  manifest.hidesExplorerArrows = config.hidesExplorerArrows;
  const activeTheme = getEnabledFolderTheme(folderIcons, config.folders?.theme);
  if (!activeTheme) {
    return manifest;
  }
  const enabledIcons = disableIconsByPack(activeTheme, config.activeIconPack);
  const customIcons = [
    ...getCustomIcons(config.folders?.associations, false),
    ...getCustomIcons(config.rootFolders?.associations, true),
  ];
  const allIcons = [...(activeTheme.icons ?? []), ...customIcons];
  const allEnabledIcons = [...enabledIcons, ...customIcons];

  if (config.folders?.theme === 'none') {
    return manifest;
  }

  allIcons.forEach((icon) => {
    manifest = setIconDefinitions(manifest, config, icon);
  });

  // Only map the specific folder icons if they are enabled depending on the active icon pack
  allEnabledIcons.forEach((icon) => {
    if (icon.disabled) return;
    const folderNames = extendFolderNames(icon?.folderNames ?? []);
    const rootFolderNames = extendFolderNames(icon?.rootFolderNames ?? []);
    manifest = merge(
      manifest,
      setFolderNames(icon.name, folderNames, rootFolderNames)
    );
    manifest.light = icon.light
      ? merge(
          manifest.light,
          setFolderNames(
            icon.name,
            folderNames,
            rootFolderNames,
            lightColorFileEnding
          )
        )
      : manifest.light;
    manifest.highContrast = icon.highContrast
      ? merge(
          manifest.highContrast,
          setFolderNames(
            icon.name,
            folderNames,
            rootFolderNames,
            highContrastColorFileEnding
          )
        )
      : manifest.highContrast;
  });

  manifest = setDefaultFolderIcons(activeTheme, manifest, config);
  return manifest;
};

/**
 * Set the default folder icons for the theme.
 *
 * @param theme - The folder theme to be used.
 * @param manifest - The manifest object to be updated with the default folder icons.
 * @param config - The configuration object for the icons.
 * @returns The updated manifest object with the default folder icons.
 */
const setDefaultFolderIcons = (
  theme: FolderTheme,
  manifest: Manifest,
  config: Config
): Manifest => {
  const hasFolderIcons =
    !!theme.defaultIcon.name && theme.defaultIcon.name.length > 0;
  if (hasFolderIcons) {
    manifest = setIconDefinitions(manifest, config, theme.defaultIcon);
  }
  manifest = merge(
    manifest,
    createDefaultIconConfigObject(hasFolderIcons, theme, '')
  );
  manifest.light = theme.defaultIcon.light
    ? merge(
        manifest.light,
        createDefaultIconConfigObject(
          hasFolderIcons,
          theme,
          lightColorFileEnding
        )
      )
    : manifest.light;
  manifest.highContrast = theme.defaultIcon.highContrast
    ? merge(
        manifest.highContrast,
        createDefaultIconConfigObject(
          hasFolderIcons,
          theme,
          highContrastColorFileEnding
        )
      )
    : manifest.highContrast;

  manifest = merge(
    manifest,
    createRootIconConfigObject(hasFolderIcons, theme, '')
  );
  if (theme.rootFolder) {
    manifest = setIconDefinitions(manifest, config, theme.rootFolder);
    manifest.light = theme.rootFolder.light
      ? merge(
          manifest.light,
          createRootIconConfigObject(
            hasFolderIcons,
            theme,
            lightColorFileEnding
          )
        )
      : manifest.light;
    manifest.highContrast = theme.rootFolder.highContrast
      ? merge(
          manifest.highContrast,
          createRootIconConfigObject(
            hasFolderIcons,
            theme,
            highContrastColorFileEnding
          )
        )
      : manifest.highContrast;
  }

  return manifest;
};

/**
 * Get the object of the current enabled theme.
 *
 * @param themes - The list of available folder themes.
 * @param enabledTheme - The name of the enabled theme.
 * @returns The enabled folder theme, or undefined if not found.
 */
const getEnabledFolderTheme = (
  themes: FolderTheme[],
  enabledTheme?: string
): FolderTheme | undefined => {
  return themes.find((theme) => theme.name === enabledTheme);
};

/**
 * Disable all file icons that are in a pack which is disabled.
 *
 * @param folderIcons - The folder icons to be filtered.
 * @param activatedIconPack - The active icon pack to be considered.
 * @returns The filtered folder icons that are enabled for the active icon pack.
 */
const disableIconsByPack = (
  folderIcons?: FolderTheme,
  activatedIconPack?: IconPackValue
): FolderIcon[] => {
  if (!folderIcons?.icons || folderIcons.icons.length === 0) {
    return [];
  }
  return folderIcons.icons.filter((icon) => {
    return !icon.enabledFor
      ? true
      : icon.enabledFor.some((p) => p === activatedIconPack);
  });
};

/**
 * Set the icon definitions in the manifest.
 *
 * @param manifest - The manifest object to be updated.
 * @param config - The configuration object for the icons.
 * @param icon - The icon to be set in the manifest.
 * @param appendix - The appendix to be added to the icon name.
 * @returns The updated manifest object with the icon definitions.
 */
const setIconDefinitions = (
  manifest: Manifest,
  config: Config,
  icon: FolderIcon | DefaultIcon
) => {
  const isClone = (icon as FolderIcon).clone !== undefined;

  manifest = createIconDefinitions(manifest, config, icon.name, '', isClone);

  if (icon.light) {
    manifest = merge(
      manifest,
      createIconDefinitions(
        manifest,
        config,
        icon.name,
        lightColorFileEnding,
        isClone
      )
    );
  }
  if (icon.highContrast) {
    manifest = merge(
      manifest,
      createIconDefinitions(
        manifest,
        config,
        icon.name,
        highContrastColorFileEnding,
        isClone
      )
    );
  }
  return manifest;
};

/**
 * Create the icon definitions in the manifest.
 *
 * @param manifest - The manifest object to be updated.
 * @param config - The configuration object for the icons.
 * @param iconName - The name of the icon.
 * @param appendix - The appendix to be added to the icon name.
 * @param isClone - Whether the icon is a clone.
 * @returns The updated manifest object with the icon definitions.
 */
const createIconDefinitions = (
  manifest: Manifest,
  config: Config,
  iconName: string,
  appendix: string = '',
  isClone = false
): Manifest => {
  const fileConfigHash = getFileConfigHash(config);
  const configIconDefinitions = manifest.iconDefinitions;
  const ext = isClone ? cloneIconExtension : '.svg';
  const key = `${iconName}${appendix}`;
  const openedKey = `${iconName}${openedFolder}${appendix}`;

  if (configIconDefinitions) {
    if (!configIconDefinitions[key]) {
      configIconDefinitions[key] = {
        iconPath: `${iconFolderPath}${key}${fileConfigHash}${ext}`,
      };
    }

    if (!configIconDefinitions[`${openedKey}`]) {
      configIconDefinitions[`${openedKey}`] = {
        iconPath: `${iconFolderPath}${openedKey}${fileConfigHash}${ext}`,
      };
    }
  }
  return manifest;
};

/**
 * Extend the folder names with additional patterns.
 *
 * @param folderNames - The folder names to be extended.
 * @returns The extended folder names.
 */
const extendFolderNames = (folderNames: string[]) => {
  const names: string[] = [];
  const patterns: [string, string][] = [
    ['', ''],
    ['.', ''],
    ['_', ''],
    ['__', '__'],
  ];
  folderNames.forEach((name) => {
    patterns.forEach((style) => {
      names.push(`${style[0]}${name}${style[1]}`);
    });
  });
  return names;
};

/**
 * Set the folder names in the manifest.
 *
 * @param iconName - The name of the icon.
 * @param folderNames - The folder names to be set in the manifest.
 * @param rootFolderNames - The root folder names to be set in the manifest.
 * @param appendix - The appendix to be added to the icon name.
 * @returns The partial manifest object with the folder names.
 */
const setFolderNames = (
  iconName: string,
  folderNames: string[],
  rootFolderNames: string[],
  appendix: string = ''
): Required<
  Pick<
    Manifest,
    | 'folderNames'
    | 'folderNamesExpanded'
    | 'rootFolderNames'
    | 'rootFolderNamesExpanded'
  >
> => {
  // Helper function to populate folder-related properties
  const createEntries = (names: string[]) => {
    const regular: Record<string, string> = {};
    const expanded: Record<string, string> = {};

    names.forEach((name) => {
      regular[name] = iconName + appendix;
      expanded[name] = `${iconName}${openedFolder}${appendix}`;
    });

    return { regular, expanded };
  };

  // Create folder entries
  const folderEntries = createEntries(folderNames);
  const rootFolderEntries = createEntries(rootFolderNames);

  // Return the structured object
  return {
    folderNames: folderEntries.regular,
    folderNamesExpanded: folderEntries.expanded,
    rootFolderNames: rootFolderEntries.regular,
    rootFolderNamesExpanded: rootFolderEntries.expanded,
  };
};

/**
 * Create the default icon configuration object.
 *
 * @param hasFolderIcons - Whether the theme has folder icons.
 * @param theme - The folder theme to be used.
 * @param appendix - The appendix to be added to the icon name.
 * @returns The default icon configuration object.
 */
const createDefaultIconConfigObject = (
  hasFolderIcons: boolean,
  theme: FolderTheme,
  appendix: string = ''
) => {
  const obj = {
    folder: '',
    folderExpanded: '',
  };
  obj.folder = hasFolderIcons ? theme.defaultIcon.name + appendix : '';
  obj.folderExpanded = hasFolderIcons
    ? `${theme.defaultIcon.name}${openedFolder}${appendix}`
    : '';
  return obj;
};

/**
 * Create the root icon configuration object.
 *
 * @param hasFolderIcons - Whether the theme has folder icons.
 * @param theme - The folder theme to be used.
 * @param appendix - The appendix to be added to the icon name.
 * @returns The root icon configuration object.
 */
const createRootIconConfigObject = (
  hasFolderIcons: boolean,
  theme: FolderTheme,
  appendix: string = ''
) => {
  const obj = {
    rootFolder: '',
    rootFolderExpanded: '',
  };
  obj.rootFolder = hasFolderIcons
    ? theme.rootFolder
      ? theme.rootFolder.name + appendix
      : theme.defaultIcon.name + appendix
    : '';
  obj.rootFolderExpanded = hasFolderIcons
    ? theme.rootFolder
      ? `${theme.rootFolder.name}${openedFolder}${appendix}`
      : `${theme.defaultIcon.name}${openedFolder}${appendix}`
    : '';
  return obj;
};

/**
 * Get the custom icons based on the folder associations.
 *
 * @param folderAssociations - The folder associations to be considered.
 * @param isRootFolder - Determines whether the icons are for root folders.
 * @returns The custom icons based on the folder associations.
 */
const getCustomIcons = (
  folderAssociations: IconAssociations | undefined,
  isRootFolder: boolean
): FolderIcon[] => {
  if (!folderAssociations) return [];

  return Object.entries(folderAssociations).map(([folderName, iconName]) => {
    const iconConfig: FolderIcon = {
      name: iconName ? `folder-${iconName.toLowerCase()}` : 'folder', // Default folder if icon name is empty
      folderNames: [],
      rootFolderNames: [],
    };

    const targetKey = isRootFolder ? 'rootFolderNames' : 'folderNames';
    iconConfig[targetKey] = [folderName.toLowerCase()];

    return iconConfig;
  });
};

/**
 * Generate the folder icons with the specified color, opacity, and saturation.
 *
 * @param color - The color of the folder icons.
 * @param opacity - The opacity of the folder icons.
 * @param saturation - The saturation of the folder icons.
 */
export const generateFolderIcons = async (
  color: string,
  opacity: number,
  saturation: number
) => {
  if (!color || !validateHEXColorCode(color)) {
    return logger.error('Invalid color code for folder icons');
  }

  const folderIcon =
    'M13.84376,7.53645l-1.28749-1.0729A2,2,0,0,0,11.27591,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2H15.12412A2,2,0,0,1,13.84376,7.53645Z';
  const folderIconOpen =
    'M28.96692,12H9.44152a2,2,0,0,0-1.89737,1.36754L4,24V10H28a2,2,0,0,0-2-2H15.1241a2,2,0,0,1-1.28038-.46357L12.5563,6.46357A2,2,0,0,0,11.27592,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H26l4.80523-11.21213A2,2,0,0,0,28.96692,12Z';

  await writeSVGFiles(
    'folder',
    getSVG(getPath(folderIcon, color)),
    opacity,
    saturation
  );
  await writeSVGFiles(
    'folder-open',
    getSVG(getPath(folderIconOpen, color)),
    opacity,
    saturation
  );
};

/**
 * Generate the folder icons with the specified color, opacity, and saturation.
 *
 * @param color - The color of the root folder icons.
 * @param opacity - The opacity of the root folder icons.
 * @param saturation - The saturation of the root folder icons.
 */
export const generateRootFolderIcons = async (
  color: string,
  opacity: number,
  saturation: number
) => {
  if (!color || !validateHEXColorCode(color)) {
    return logger.error('Invalid color code for root folder icons');
  }

  const rootFolderIcon =
    'M16,5A11,11,0,1,1,5,16,11.01245,11.01245,0,0,1,16,5m0-3A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,8a6,6,0,1,0,6,6A6,6,0,0,0,16,10Z';
  const rootFolderIconOpen =
    'M16,5A11,11,0,1,1,5,16,11.01245,11.01245,0,0,1,16,5m0-3A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z';

  await writeSVGFiles(
    'folder-root',
    getSVG(getPath(rootFolderIcon, color)),
    opacity,
    saturation
  );
  await writeSVGFiles(
    'folder-root-open',
    getSVG(getPath(rootFolderIconOpen, color)),
    opacity,
    saturation
  );
};
