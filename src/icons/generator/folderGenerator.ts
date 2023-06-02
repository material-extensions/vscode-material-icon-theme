import { writeFileSync } from 'fs';
import merge from 'lodash.merge';
import { basename, join } from 'path';
import { getFileConfigHash } from '../../helpers/fileConfig';
import {
  DefaultIcon,
  FolderIcon,
  FolderTheme,
  IconAssociations,
  IconConfiguration,
  IconJsonOptions,
} from '../../models/index';
import {
  highContrastColorFileEnding,
  iconFolderPath,
  lightColorFileEnding,
  openedFolder,
} from './constants';

/**
 * Get the folder icon definitions as object.
 */
export const loadFolderIconDefinitions = (
  folderThemes: FolderTheme[],
  config: IconConfiguration,
  options: IconJsonOptions
): IconConfiguration => {
  config = merge({}, config);
  config.hidesExplorerArrows = options.hidesExplorerArrows;
  const activeTheme = getEnabledFolderTheme(
    folderThemes,
    options.folders?.theme
  );
  if (!activeTheme) {
    return {};
  }
  const enabledIcons = disableIconsByPack(activeTheme, options.activeIconPack);
  const customIcons = getCustomIcons(options.folders?.associations);
  const allIcons = [...enabledIcons, ...customIcons];

  if (options.folders?.theme === 'none') {
    return config;
  }

  allIcons.forEach((icon) => {
    if (icon.disabled) return;
    config = setIconDefinitions(config, icon);
    config = merge({}, config, setFolderNames(icon.name, icon.folderNames));
    config.light = icon.light
      ? merge(
          {},
          config.light,
          setFolderNames(icon.name, icon.folderNames, lightColorFileEnding)
        )
      : config.light;
    config.highContrast = icon.highContrast
      ? merge(
          {},
          config.highContrast,
          setFolderNames(
            icon.name,
            icon.folderNames,
            highContrastColorFileEnding
          )
        )
      : config.highContrast;
  });

  config = setDefaultFolderIcons(activeTheme, config);
  return config;
};

/**
 * Set the default folder icons for the theme.
 */
const setDefaultFolderIcons = (
  theme: FolderTheme,
  config: IconConfiguration
): IconConfiguration => {
  config = merge({}, config);
  const hasFolderIcons =
    !!theme.defaultIcon.name && theme.defaultIcon.name.length > 0;
  if (hasFolderIcons) {
    config = setIconDefinitions(config, theme.defaultIcon);
  }
  config = merge(
    {},
    config,
    createDefaultIconConfigObject(hasFolderIcons, theme, '')
  );
  config.light = theme.defaultIcon.light
    ? merge(
        {},
        config.light,
        createDefaultIconConfigObject(
          hasFolderIcons,
          theme,
          lightColorFileEnding
        )
      )
    : config.light;
  config.highContrast = theme.defaultIcon.highContrast
    ? merge(
        {},
        config.highContrast,
        createDefaultIconConfigObject(
          hasFolderIcons,
          theme,
          highContrastColorFileEnding
        )
      )
    : config.highContrast;

  config = merge(
    {},
    config,
    createRootIconConfigObject(hasFolderIcons, theme, '')
  );
  if (theme.rootFolder) {
    config = setIconDefinitions(config, theme.rootFolder);
    config.light = theme.rootFolder.light
      ? merge(
          {},
          config.light,
          createRootIconConfigObject(
            hasFolderIcons,
            theme,
            lightColorFileEnding
          )
        )
      : config.light;
    config.highContrast = theme.rootFolder.highContrast
      ? merge(
          {},
          config.highContrast,
          createRootIconConfigObject(
            hasFolderIcons,
            theme,
            highContrastColorFileEnding
          )
        )
      : config.highContrast;
  }

  return config;
};

/**
 * Get the object of the current enabled theme.
 */
const getEnabledFolderTheme = (
  themes: FolderTheme[],
  enabledTheme: string | undefined
): FolderTheme | undefined => {
  return themes.find((theme) => theme.name === enabledTheme);
};

/**
 * Disable all file icons that are in a pack which is disabled.
 */
const disableIconsByPack = (
  folderIcons: FolderTheme | undefined,
  activatedIconPack: string | undefined
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

const setIconDefinitions = (
  config: IconConfiguration,
  icon: FolderIcon | DefaultIcon
) => {
  config = merge({}, config);
  config = createIconDefinitions(config, icon.name);
  if (icon.light) {
    config = merge(
      {},
      config,
      createIconDefinitions(config, icon.name, lightColorFileEnding)
    );
  }
  if (icon.highContrast) {
    config = merge(
      {},
      config,
      createIconDefinitions(config, icon.name, highContrastColorFileEnding)
    );
  }
  return config;
};

const createIconDefinitions = (
  config: IconConfiguration,
  iconName: string,
  appendix: string = ''
) => {
  config = merge({}, config);
  const fileConfigHash = getFileConfigHash(config.options ?? {});
  const configIconDefinitions = config.iconDefinitions;
  if (configIconDefinitions) {
    configIconDefinitions[iconName + appendix] = {
      iconPath: `${iconFolderPath}${iconName}${appendix}${fileConfigHash}.svg`,
    };
    configIconDefinitions[`${iconName}${openedFolder}${appendix}`] = {
      iconPath: `${iconFolderPath}${iconName}${openedFolder}${appendix}${fileConfigHash}.svg`,
    };
  }
  return config;
};

const setFolderNames = (
  iconName: string,
  folderNames: string[],
  appendix: string = ''
) => {
  const obj: Partial<IconConfiguration> = {
    folderNames: {},
    folderNamesExpanded: {},
  };
  folderNames.forEach((name) => {
    if (obj.folderNames) {
      obj.folderNames[name as keyof IconConfiguration] = iconName + appendix;
    }
    if (obj.folderNamesExpanded) {
      obj.folderNamesExpanded[
        name as keyof IconConfiguration
      ] = `${iconName}${openedFolder}${appendix}`;
    }
  });
  return obj;
};

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

const getCustomIcons = (folderAssociations: IconAssociations | undefined) => {
  if (!folderAssociations) return [];

  const icons: FolderIcon[] = Object.keys(folderAssociations).map((fa) => ({
    // use default folder if icon name is empty
    name:
      folderAssociations[fa].length > 0
        ? 'folder-' + folderAssociations[fa].toLowerCase()
        : 'folder',
    folderNames: [fa.toLowerCase()],
  }));

  return icons;
};

export const generateFolderIcons = (color: string | undefined) => {
  if (!color || !validateHEXColorCode(color)) {
    return console.error('Invalid color code for folder icons');
  }

  const folderIcon =
    'M10 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8c0-1.11-.9-2-2-2h-8l-2-2z';
  const folderIconOpen =
    'M19 20H4c-1.11 0-2-.9-2-2V6c0-1.11.89-2 2-2h6l2 2h7a2 2 0 0 1 2 2H4v10l2.14-8h17.07l-2.28 8.5c-.23.87-1.01 1.5-1.93 1.5z';
  const rootFolderIcon =
    'M12 20a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 5a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5z';
  const rootFolderIconOpen =
    'M12 20a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z';

  writeSVGFiles('folder', getSVG(getPath(folderIcon, color)));
  writeSVGFiles('folder-open', getSVG(getPath(folderIconOpen, color)));
  writeSVGFiles('folder-root', getSVG(getPath(rootFolderIcon, color)));
  writeSVGFiles('folder-root-open', getSVG(getPath(rootFolderIconOpen, color)));
};

export const getPath = (d: string, color: string) =>
  `<path d="${d}" fill="${color}" />`;
export const getSVG = (path: string) =>
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${path}</svg>`;

export const writeSVGFiles = (iconName: string, svg: string) => {
  let iconsPath;
  if (basename(__dirname) === 'dist') {
    iconsPath = join(__dirname, '..', 'icons');
  } else {
    // executed via script
    iconsPath = join(__dirname, '..', '..', '..', 'icons');
  }
  const iconsFolderPath = join(iconsPath, `${iconName}.svg`);
  try {
    writeFileSync(iconsFolderPath, svg);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Validate the HEX color code
 * @param color HEX code
 */
export const validateHEXColorCode = (color: string = '') => {
  const hexPattern = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
  return color.length > 0 && hexPattern.test(color);
};
