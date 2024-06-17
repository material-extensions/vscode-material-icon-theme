import { writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import merge from 'lodash.merge';
import { getFileConfigHash } from '../../helpers/fileConfig';
import {
  type DefaultIcon,
  type FolderIcon,
  type FolderTheme,
  type IconAssociations,
  IconConfiguration,
  type IconJsonOptions,
} from '../../models/index';
import {
  cloneIconExtension,
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
    const folderNames = extendFolderNames(icon.folderNames);
    config = setIconDefinitions(config, icon);
    config = merge({}, config, setFolderNames(icon.name, folderNames));
    config.light = icon.light
      ? merge(
          {},
          config.light,
          setFolderNames(icon.name, folderNames, lightColorFileEnding)
        )
      : config.light;
    config.highContrast = icon.highContrast
      ? merge(
          {},
          config.highContrast,
          setFolderNames(icon.name, folderNames, highContrastColorFileEnding)
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
  const isClone = (icon as FolderIcon).clone !== undefined;
  config = merge({}, config);

  config = createIconDefinitions(config, icon.name, '', isClone);
  if (icon.light) {
    config = merge(
      {},
      config,
      createIconDefinitions(config, icon.name, lightColorFileEnding, isClone)
    );
  }
  if (icon.highContrast) {
    config = merge(
      {},
      config,
      createIconDefinitions(
        config,
        icon.name,
        highContrastColorFileEnding,
        isClone
      )
    );
  }
  return config;
};

const createIconDefinitions = (
  config: IconConfiguration,
  iconName: string,
  appendix: string = '',
  isClone = false
) => {
  config = merge({}, config);
  const fileConfigHash = getFileConfigHash(config.options ?? {});
  const configIconDefinitions = config.iconDefinitions;
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
  return config;
};

const extendFolderNames = (folderNames: string[]) => {
  const names: string[] = [];
  const styles: [string, string][] = [
    ['', ''],
    ['.', ''],
    ['_', ''],
    ['__', '__'],
  ];
  folderNames.forEach((name) => {
    styles.forEach((style) => {
      names.push(`${style[0]}${name}${style[1]}`);
    });
  });
  return names;
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
      obj.folderNamesExpanded[name as keyof IconConfiguration] =
        `${iconName}${openedFolder}${appendix}`;
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
    'M13.84376,7.53645l-1.28749-1.0729A2,2,0,0,0,11.27591,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2H15.12412A2,2,0,0,1,13.84376,7.53645Z';
  const folderIconOpen =
    'M28.96692,12H9.44152a2,2,0,0,0-1.89737,1.36754L4,24V10H28a2,2,0,0,0-2-2H15.1241a2,2,0,0,1-1.28038-.46357L12.5563,6.46357A2,2,0,0,0,11.27592,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H26l4.80523-11.21213A2,2,0,0,0,28.96692,12Z';
  const rootFolderIcon =
    'M16,5A11,11,0,1,1,5,16,11.01245,11.01245,0,0,1,16,5m0-3A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,8a6,6,0,1,0,6,6A6,6,0,0,0,16,10Z';
  const rootFolderIconOpen =
    'M16,5A11,11,0,1,1,5,16,11.01245,11.01245,0,0,1,16,5m0-3A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z';

  writeSVGFiles('folder', getSVG(getPath(folderIcon, color)));
  writeSVGFiles('folder-open', getSVG(getPath(folderIconOpen, color)));
  writeSVGFiles('folder-root', getSVG(getPath(rootFolderIcon, color)));
  writeSVGFiles('folder-root-open', getSVG(getPath(rootFolderIconOpen, color)));
};

export const getPath = (d: string, color: string) =>
  `<path d="${d}" fill="${color}" />`;
export const getSVG = (path: string, viewBoxSize = 32) =>
  `<svg viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" xmlns="http://www.w3.org/2000/svg">${path}</svg>`;

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
