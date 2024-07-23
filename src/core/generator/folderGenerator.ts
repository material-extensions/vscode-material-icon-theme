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
  const customIcons = getCustomIcons(config.folders?.associations);
  const allIcons = [...enabledIcons, ...customIcons];

  if (config.folders?.theme === 'none') {
    return manifest;
  }

  allIcons.forEach((icon) => {
    if (icon.disabled) return;
    const folderNames = extendFolderNames(icon.folderNames);
    manifest = setIconDefinitions(manifest, config, icon);
    manifest = merge(manifest, setFolderNames(icon.name, folderNames));
    manifest.light = icon.light
      ? merge(
          manifest.light,
          setFolderNames(icon.name, folderNames, lightColorFileEnding)
        )
      : manifest.light;
    manifest.highContrast = icon.highContrast
      ? merge(
          manifest.highContrast,
          setFolderNames(icon.name, folderNames, highContrastColorFileEnding)
        )
      : manifest.highContrast;
  });

  manifest = setDefaultFolderIcons(activeTheme, manifest, config);
  return manifest;
};

/**
 * Set the default folder icons for the theme.
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
  activatedIconPack: IconPackValue | undefined
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

const createIconDefinitions = (
  manifest: Manifest,
  config: Config,
  iconName: string,
  appendix: string = '',
  isClone = false
) => {
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
  const obj: Partial<Manifest> = {
    folderNames: {},
    folderNamesExpanded: {},
  };
  folderNames.forEach((name) => {
    if (obj.folderNames) {
      obj.folderNames[name as keyof Manifest] = iconName + appendix;
    }
    if (obj.folderNamesExpanded) {
      obj.folderNamesExpanded[name as keyof Manifest] =
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
  const rootFolderIcon =
    'M16,5A11,11,0,1,1,5,16,11.01245,11.01245,0,0,1,16,5m0-3A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,8a6,6,0,1,0,6,6A6,6,0,0,0,16,10Z';
  const rootFolderIconOpen =
    'M16,5A11,11,0,1,1,5,16,11.01245,11.01245,0,0,1,16,5m0-3A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z';

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
