import {
  CustomClone,
  FileIconClone,
  FileIcons,
  FolderIconClone,
  FolderTheme,
  IconConfiguration,
  IconJsonOptions,
} from '../../../models';
import {
  Variant,
  clearCloneFolder,
  getCloneData,
  isFolder,
} from './utils/cloneData';
import merge from 'lodash.merge';
import { getFileConfigHash } from '../../../helpers/fileConfig';
import { cloneIcon, createCloneConfig } from './utils/cloning';
import { writeFileSync } from 'fs';
import { cloneIconExtension, clonesFolder } from '../constants';

/**
 * Creates custom icons by cloning already existing icons and changing
 * their colors, based on the user's provided configurations.
 */
export function customClonesIcons(
  config: IconConfiguration,
  options: IconJsonOptions
): IconConfiguration {
  clearCloneFolder(hasCustomClones(options));

  let clonedIconsConfig: IconConfiguration = new IconConfiguration();
  const hash = getFileConfigHash(options);

  // create folder clones as specified by the user in the options
  options.folders?.customClones?.forEach((clone) => {
    const cloneCfg = createIconClone(clone, config, hash);
    clonedIconsConfig = merge(clonedIconsConfig, cloneCfg);
  });

  // create file clones as specified by the user in the options
  options.files?.customClones?.forEach((clone) => {
    const cloneCfg = createIconClone(clone, config, hash);
    clonedIconsConfig = merge(clonedIconsConfig, cloneCfg);
  });

  return clonedIconsConfig;
}

/**
 * Creates custom icons by cloning already existing icons and changing
 * their colors, based on the configurations provided by the extension.
 * (this is meant to be called at build time)
 */
export function generateConfiguredClones(
  iconsList: FolderTheme[] | FileIcons,
  config: IconConfiguration
) {
  let iconsToClone: CustomClone[] = [];

  if (Array.isArray(iconsList)) {
    iconsToClone = iconsList.reduce((acc, theme) => {
      const icons = theme.icons?.filter((icon) => icon.clone) ?? [];
      return acc.concat(
        icons.map((icon) => ({
          folderNames: icon.folderNames,
          name: icon.name,
          ...icon.clone!,
        }))
      );
    }, [] as FolderIconClone[]);
  } else {
    const icons = iconsList.icons?.filter((icon) => icon.clone) ?? [];
    iconsToClone = icons.map(
      (icon) =>
        ({
          fileExtensions: icon.fileExtensions,
          fileNames: icon.fileNames,
          name: icon.name,
          ...icon.clone!,
        } as FileIconClone)
    );
  }

  iconsToClone?.forEach((clone) => {
    const clones = getCloneData(clone, config, '', '', cloneIconExtension);
    if (!clones) {
      return;
    }

    clones.forEach((clone) => {
      try {
        // generates the new icon content (svg)
        const content = cloneIcon(clone.base.path, clone.color);

        // write the new .svg file to the disk
        writeFileSync(clone.path, content);
      } catch (error) {
        console.error(error);
        return;
      }
    });
  });
}

/** Checks if there are any custom clones to be created */
export function hasCustomClones(options: IconJsonOptions): boolean {
  return (
    (options.folders?.customClones?.length ?? 0) > 0 ||
    (options.files?.customClones?.length ?? 0) > 0
  );
}

/**
 * Generates a clone of an icon.
 * @param cloneOpts options and configurations on how to clone the icon
 * @param config global icon configuration (used to get the base icon)
 * @param hash current hash being applied to the icons
 * @returns a partial icon configuration for the new icon
 */
function createIconClone(
  cloneOpts: FolderIconClone | FileIconClone,
  config: IconConfiguration,
  hash: string
): IconConfiguration {
  // get clones to be created
  const clones = getCloneData(cloneOpts, config, clonesFolder, hash);
  if (!clones) {
    return {};
  }

  const clonesConfig = createCloneConfig();

  clones.forEach((clone) => {
    try {
      // generates the new icon content (svg)
      const content = cloneIcon(clone.base.path, clone.color, hash);

      try {
        // write the new .svg file to the disk
        writeFileSync(clone.path, content);
      } catch (error) {
        console.error(error);
        return;
      }

      // sets the icon path for the cloned icon in the configuration
      clonesConfig.iconDefinitions![clone.name] = {
        iconPath: clone.inConfigPath,
      };

      if (isFolder(cloneOpts)) {
        // sets the associated folder names for the cloned icon
        cloneOpts.folderNames?.forEach((folderName) => {
          const folderNamesCfg =
            clone.variant === Variant.Base
              ? clonesConfig.folderNames!
              : clone.variant === Variant.Open
              ? clonesConfig.folderNamesExpanded!
              : clone.variant === Variant.Light
              ? clonesConfig.light!.folderNames!
              : clonesConfig.light!.folderNamesExpanded!;
          folderNamesCfg[folderName] = clone.name;
        });
      } else {
        // set associations for the cloned file icon in the configuration
        cloneOpts.fileNames?.forEach((fileName) => {
          const fileNamesCfg =
            clone.variant === Variant.Base
              ? clonesConfig.fileNames!
              : clonesConfig.light!.fileNames!;

          fileNamesCfg[fileName] = clone.name;
        });

        cloneOpts.fileExtensions?.forEach((fileExtension) => {
          const fileExtensionsCfg =
            clone.variant === Variant.Base
              ? clonesConfig.fileExtensions!
              : clonesConfig.light!.fileExtensions!;

          fileExtensionsCfg[fileExtension] = clone.name;
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  return clonesConfig;
}
