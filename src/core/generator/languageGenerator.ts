import { getFileConfigHash } from '../helpers/configHash';
import { merge } from '../helpers/object';
import type { Config, IconAssociations } from '../models/icons/config';
import type { DefaultIcon } from '../models/icons/defaultIcon';
import type { IconPackValue } from '../models/icons/iconPack';
import type { LanguageIcon } from '../models/icons/languages/languageIdentifier';
import type { Manifest } from '../models/manifest';
import {
  cloneIconExtension,
  highContrastColorFileEnding,
  iconFolderPath,
  lightColorFileEnding,
} from './constants';

/**
 * Get all language icons that can be used in this theme.
 *
 * @param languageIcons - The language icons to be used in the theme.
 * @param config - The configuration object for the icons.
 * @param manifest - The manifest object to be updated with the language icons.
 * @returns The updated manifest object with the language icons.
 */
export const loadLanguageIconDefinitions = (
  languageIcons: LanguageIcon[],
  config: Config,
  manifest: Manifest
): Manifest => {
  const enabledLanguages = disableLanguagesByPack(
    languageIcons,
    config.activeIconPack
  );
  const customIcons = getCustomIcons(config.languages?.associations);
  const allLanguageIcons = [...languageIcons, ...customIcons];
  const allEnabledLanguageIcons = [...enabledLanguages, ...customIcons];

  allLanguageIcons.forEach((icon) => {
    const isClone = icon.clone !== undefined;
    manifest = setIconDefinitions(manifest, config, icon, isClone);
  });

  // Only map the specific language icons if they are enabled depending on the active icon pack
  allEnabledLanguageIcons.forEach((icon) => {
    if (icon.disabled) return;
    manifest = merge(manifest, setLanguageIdentifiers(icon.name, icon.ids));
    manifest.light = icon.light
      ? merge(
          manifest.light,
          setLanguageIdentifiers(icon.name + lightColorFileEnding, icon.ids)
        )
      : manifest.light;
    manifest.highContrast = icon.highContrast
      ? merge(
          manifest.highContrast,
          setLanguageIdentifiers(
            icon.name + highContrastColorFileEnding,
            icon.ids
          )
        )
      : manifest.highContrast;
  });

  return manifest;
};

/**
 * Set the icon definitions in the manifest.
 *
 * @param manifest - The manifest object to be updated.
 * @param config - The configuration object for the icons.
 * @param icon - The icon to be set in the manifest.
 * @returns The updated manifest object with the icon definitions.
 */
const setIconDefinitions = (
  manifest: Manifest,
  config: Config,
  icon: DefaultIcon,
  isClone: boolean
): Manifest => {
  const ext = isClone ? cloneIconExtension : '.svg';
  createIconDefinitions(manifest, config, icon.name, ext);

  if (icon.light) {
    createIconDefinitions(
      manifest,
      config,
      icon.name + lightColorFileEnding,
      ext
    );
  }
  if (icon.highContrast) {
    createIconDefinitions(
      manifest,
      config,
      icon.name + highContrastColorFileEnding,
      ext
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
 * @param ext - The file extension of the icon.
 */
const createIconDefinitions = (
  manifest: Manifest,
  config: Config,
  iconName: string,
  ext: string
) => {
  const fileConfigHash = getFileConfigHash(config);
  if (manifest.iconDefinitions) {
    manifest.iconDefinitions[iconName] = {
      iconPath: `${iconFolderPath}${iconName}${fileConfigHash}${ext}`,
    };
  }
};

/**
 * Set the language identifiers in the manifest.
 *
 * @param iconName - The name of the icon.
 * @param languageIds - The language identifiers to be set in the manifest.
 * @returns The partial manifest object with the language identifiers.
 */
const setLanguageIdentifiers = (
  iconName: string,
  languageIds: string[]
): Partial<Manifest> => {
  const obj: Partial<Manifest> = { languageIds: {} };
  languageIds.forEach((id) => {
    obj.languageIds![id as keyof Manifest] = iconName;
  });
  return obj;
};

/**
 * Get the custom icons based on the language associations.
 *
 * @param languageAssociations - The language associations to be considered.
 * @returns The custom icons based on the language associations.
 */
const getCustomIcons = (
  languageAssociations: IconAssociations | undefined
): LanguageIcon[] => {
  if (!languageAssociations) return [];

  const icons: LanguageIcon[] = Object.keys(languageAssociations).map((fa) => ({
    name: languageAssociations[fa].toLowerCase(),
    ids: [fa.toLowerCase()],
  }));

  return icons;
};

/**
 * Disable all language icons that are in a pack which is disabled.
 *
 * @param languageIcons - The language icons to be filtered.
 * @param activatedIconPack - The active icon pack to be considered.
 * @returns The filtered language icons that are enabled for the active icon pack.
 */
const disableLanguagesByPack = (
  languageIcons: LanguageIcon[],
  activatedIconPack: IconPackValue | undefined
): LanguageIcon[] => {
  return languageIcons.filter((icon) => {
    return !icon.enabledFor
      ? true
      : icon.enabledFor.some((p) => p === activatedIconPack);
  });
};
