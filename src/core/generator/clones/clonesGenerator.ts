import { writeFileSync } from 'node:fs';
import { merge } from 'lodash-es';
import { getFileConfigHash } from '../../helpers/configHash';
import type {
  Config,
  CustomClone,
  FileIconClone,
  FolderIconClone,
} from '../../models/icons/config';
import type { FileIcons } from '../../models/icons/files/fileTypes';
import type { FolderTheme } from '../../models/icons/folders/folderTheme';
import type { Manifest } from '../../models/manifest';
import { cloneIconExtension, clonesFolder } from '../constants';
import { Variant, getCloneData, isFolder } from './utils/cloneData';
import { cloneIcon, createCloneConfig } from './utils/cloning';

/**
 * Creates custom icons by cloning already existing icons and changing
 * their colors, based on the user's provided configurations.
 */
export function customClonesIcons(
  manifest: Manifest,
  config: Config
): Manifest {
  let clonedIconsManifest = merge({}, manifest);
  const hash = getFileConfigHash(config);

  // create folder clones as specified by the user in the options
  config.folders?.customClones?.forEach((clone) => {
    const cloneCfg = createIconClone(clone, manifest, hash);
    clonedIconsManifest = merge(clonedIconsManifest, cloneCfg);
  });

  // create file clones as specified by the user in the options
  config.files?.customClones?.forEach((clone) => {
    const cloneCfg = createIconClone(clone, manifest, hash);
    clonedIconsManifest = merge(clonedIconsManifest, cloneCfg);
  });

  return clonedIconsManifest;
}

/**
 * Creates custom icons by cloning already existing icons and changing
 * their colors, based on the configurations provided by the extension.
 * (this is meant to be called at build time)
 */
export function generateConfiguredClones(
  iconsList: FolderTheme[] | FileIcons,
  manifest: Manifest
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
        }) as FileIconClone
    );
  }

  iconsToClone?.forEach((clone) => {
    const clones = getCloneData(clone, manifest, '', '', cloneIconExtension);
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
export function hasCustomClones(config: Config): boolean {
  return (
    (config.folders?.customClones?.length ?? 0) > 0 ||
    (config.files?.customClones?.length ?? 0) > 0
  );
}

/**
 * Generates a clone of an icon.
 * @param cloneOpts options and configurations on how to clone the icon
 * @param manifest global icon configuration (used to get the base icon)
 * @param hash current hash being applied to the icons
 * @returns a partial icon configuration for the new icon
 */
function createIconClone(
  cloneOpts: FolderIconClone | FileIconClone,
  manifest: Manifest,
  hash: string
): Manifest {
  // get clones to be created
  const clones = getCloneData(cloneOpts, manifest, clonesFolder, hash);
  if (!clones) {
    return manifest;
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
