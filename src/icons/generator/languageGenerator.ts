import merge from 'lodash.merge';
import { getFileConfigHash } from '../../helpers/configHash';
import {
  type DefaultIcon,
  type IconAssociations,
  type LanguageIcon,
  Manifest,
} from '../../models/index';
import {
  highContrastColorFileEnding,
  iconFolderPath,
  lightColorFileEnding,
} from './constants';

/**
 * Get all file icons that can be used in this theme.
 */
export const loadLanguageIconDefinitions = (
  languageIcons: LanguageIcon[],
  manifest: Manifest
): Manifest => {
  manifest = merge({}, manifest);
  const enabledLanguages = disableLanguagesByPack(
    languageIcons,
    manifest.config.activeIconPack
  );
  const customIcons = getCustomIcons(manifest.config.languages?.associations);
  const allLanguageIcons = [...enabledLanguages, ...customIcons];

  allLanguageIcons.forEach((lang) => {
    if (lang.disabled) return;
    manifest = setIconDefinitions(manifest, lang.icon);
    manifest = merge(
      {},
      manifest,
      setLanguageIdentifiers(lang.icon.name, lang.ids)
    );
    manifest.light = lang.icon.light
      ? merge(
          {},
          manifest.light,
          setLanguageIdentifiers(
            lang.icon.name + lightColorFileEnding,
            lang.ids
          )
        )
      : manifest.light;
    manifest.highContrast = lang.icon.highContrast
      ? merge(
          {},
          manifest.highContrast,
          setLanguageIdentifiers(
            lang.icon.name + highContrastColorFileEnding,
            lang.ids
          )
        )
      : manifest.highContrast;
  });

  return manifest;
};

const setIconDefinitions = (manifest: Manifest, icon: DefaultIcon) => {
  manifest = merge({}, manifest);
  manifest = createIconDefinitions(manifest, icon.name);
  manifest = merge(
    {},
    manifest,
    icon.light
      ? createIconDefinitions(manifest, icon.name + lightColorFileEnding)
      : manifest.light
  );
  manifest = merge(
    {},
    manifest,
    icon.highContrast
      ? createIconDefinitions(manifest, icon.name + highContrastColorFileEnding)
      : manifest.highContrast
  );
  return manifest;
};

const createIconDefinitions = (manifest: Manifest, iconName: string) => {
  manifest = merge({}, manifest);
  const fileConfigHash = getFileConfigHash(manifest.config);
  if (manifest.iconDefinitions) {
    manifest.iconDefinitions[iconName] = {
      iconPath: `${iconFolderPath}${iconName}${fileConfigHash}.svg`,
    };
  }
  return manifest;
};

const setLanguageIdentifiers = (iconName: string, languageIds: string[]) => {
  const obj: Partial<Manifest> = { languageIds: {} };
  languageIds.forEach((id) => {
    obj.languageIds![id as keyof Manifest] = iconName;
  });
  return obj;
};

const getCustomIcons = (languageAssociations: IconAssociations | undefined) => {
  if (!languageAssociations) return [];

  const icons: LanguageIcon[] = Object.keys(languageAssociations).map((fa) => ({
    icon: { name: languageAssociations[fa].toLowerCase() },
    ids: [fa.toLowerCase()],
  }));

  return icons;
};

/**
 * Disable all file icons that are in a pack which is disabled.
 */
const disableLanguagesByPack = (
  languageIcons: LanguageIcon[],
  activatedIconPack: string | undefined
) => {
  return languageIcons.filter((language) => {
    return !language.enabledFor
      ? true
      : language.enabledFor.some((p) => p === activatedIconPack);
  });
};
