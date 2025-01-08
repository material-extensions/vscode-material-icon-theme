import { getFileConfigHash } from '../../helpers/configHash';
import { merge } from '../../helpers/object';
import { writeToFile } from '../../helpers/writeFile';
import { logger } from '../../logging/logger';
import type {
  Config,
  CustomClone,
  FileIconClone,
  FolderIconClone,
  LanguageIconClone,
} from '../../models/icons/config';
import type { FileIcons } from '../../models/icons/files/fileTypes';
import type { FolderTheme } from '../../models/icons/folders/folderTheme';
import type { LanguageIcon } from '../../models/icons/languages/languageIdentifier';
import type { Manifest } from '../../models/manifest';
import { cloneIconExtension, clonesFolder } from '../constants';
import { Variant, getCloneData, isFolder, isLanguage } from './utils/cloneData';
import { cloneIcon, createCloneConfig } from './utils/cloning';

/**
 * Creates custom icons by cloning already existing icons and changing
 * their colors, based on the user's provided configurations.
 *
 * @param manifest - The current configuration of the extension.
 * @param config - The new configuration that customizes the icons and the manifest.
 * @returns A promise that resolves to the updated manifest with custom clones.
 */
export const customClonesIcons = async (
  manifest: Manifest,
  config: Config
): Promise<Manifest> => {
  let clonedIconsManifest = merge<Manifest>({}, manifest);
  const hash = getFileConfigHash(config);

  // Helper function to process clones
  const processClones = async (
    clones?: FolderIconClone[] | FileIconClone[] | LanguageIconClone[]
  ): Promise<void> => {
    for (const clone of clones ?? []) {
      if (
        clone.activeForPacks === undefined ||
        clone.activeForPacks.includes(config.activeIconPack)
      ) {
        const cloneCfg = await createIconClone(clone, manifest, hash);
        clonedIconsManifest = merge(clonedIconsManifest, cloneCfg);
      }
    }
  };

  await processClones(config.folders?.customClones);
  await processClones(config.files?.customClones);
  await processClones(config.languages?.customClones);

  return clonedIconsManifest;
};

export const generateConfiguredFileIconClones = async (
  iconsList: FileIcons,
  manifest: Manifest
) => {
  const icons = iconsList.icons?.filter((icon) => icon.clone) ?? [];
  const iconsToClone = icons.map((icon) => ({
    fileExtensions: icon.fileExtensions,
    fileNames: icon.fileNames,
    name: icon.name,
    ...icon.clone!,
  }));

  await generateConfiguredClones(iconsToClone, manifest);
};

export const generateConfiguredFolderIconClones = async (
  iconsList: FolderTheme[],
  manifest: Manifest
) => {
  const iconsToClone = iconsList.reduce((acc, theme) => {
    const icons = theme.icons?.filter((icon) => icon.clone) ?? [];
    return acc.concat(
      icons.map((icon) => ({
        folderNames: icon.folderNames,
        name: icon.name,
        ...icon.clone!,
      }))
    );
  }, [] as FolderIconClone[]);

  await generateConfiguredClones(iconsToClone, manifest);
};

export const generateConfiguredLanguageIconClones = async (
  iconsList: LanguageIcon[],
  manifest: Manifest
) => {
  const icons = iconsList?.filter((icon) => icon.clone) ?? [];
  const iconsToClone = icons.map((icon) => ({
    ids: icon.ids,
    name: icon.name,
    ...icon.clone!,
  }));

  await generateConfiguredClones(iconsToClone, manifest);
};

/**
 * Creates custom icons by cloning already existing icons and changing
 * their colors, based on the configurations provided by the extension.
 * (this is meant to be called at build time)
 *
 * @param iconsToClone List of icons to be cloned
 * @param manifest Manifest
 */
const generateConfiguredClones = async (
  iconsToClone: CustomClone[],
  manifest: Manifest
) => {
  for (const icon of iconsToClone) {
    const clones = getCloneData(icon, manifest, '', '', cloneIconExtension);
    if (!clones) {
      // no clones to be created and continue with the next icon
      continue;
    }

    for (const clone of clones) {
      try {
        // generates the new icon content (svg)
        const content = await cloneIcon(clone.base.path, clone.color);

        // write the new .svg file to the disk
        await writeToFile(clone.path, content);
      } catch (error) {
        logger.error(error);
        return;
      }
    }
  }
};

/**
 * Checks if there are any custom clones to be created.
 *
 * @param config - The new configuration that customizes the icons and the manifest.
 * @returns True if there are custom clones to be created, false otherwise.
 */
export const hasCustomClones = (config: Config): boolean => {
  return (
    (config.folders?.customClones?.length ?? 0) > 0 ||
    (config.files?.customClones?.length ?? 0) > 0 ||
    (config.languages?.customClones?.length ?? 0) > 0
  );
};

/**
 * Generates a clone of an icon.
 * @param cloneOpts - Options and configurations on how to clone the icon.
 * @param manifest - Global icon configuration (used to get the base icon).
 * @param hash - Current hash being applied to the icons.
 * @returns A promise that resolves to a partial icon configuration for the new icon.
 */
const createIconClone = async (
  cloneOpts: FolderIconClone | FileIconClone | LanguageIconClone,
  manifest: Manifest,
  hash: string
): Promise<Manifest> => {
  // get clones to be created
  const clones = getCloneData(cloneOpts, manifest, clonesFolder, hash);
  if (!clones) {
    return manifest;
  }

  const clonesConfig = createCloneConfig();

  for (const clone of clones) {
    try {
      // generates the new icon content (svg)
      const content = await cloneIcon(clone.base.path, clone.color, hash);

      try {
        // write the new .svg file to the disk
        await writeToFile(clone.path, content);
      } catch (error) {
        logger.error(error);
        return manifest;
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
      } else if (isLanguage(cloneOpts)) {
        // sets the associated language ids for the cloned icon
        cloneOpts.ids?.forEach((langId) => {
          const languageIdCfg =
            clone.variant === Variant.Base
              ? clonesConfig.languageIds!
              : clonesConfig.light!.languageIds!;

          languageIdCfg[langId] = clone.name;
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
      logger.error(error);
    }
  }

  return clonesConfig;
};
