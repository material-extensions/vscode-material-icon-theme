import merge from 'lodash.merge';
import { getFileConfigHash } from '../../helpers/fileConfig';
import {
  DefaultIcon,
  IconAssociations,
  IconConfiguration,
  IconJsonOptions,
  LanguageIcon,
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
  languages: LanguageIcon[],
  config: IconConfiguration,
  options: IconJsonOptions
): IconConfiguration => {
  config = merge({}, config);
  const enabledLanguages = disableLanguagesByPack(
    languages,
    options.activeIconPack
  );
  const customIcons = getCustomIcons(options.languages?.associations);
  const allLanguageIcons = [...enabledLanguages, ...customIcons];

  allLanguageIcons.forEach((lang) => {
    if (lang.disabled) return;
    config = setIconDefinitions(config, lang.icon);
    config = merge(
      {},
      config,
      setLanguageIdentifiers(lang.icon.name, lang.ids)
    );
    config.light = lang.icon.light
      ? merge(
          {},
          config.light,
          setLanguageIdentifiers(
            lang.icon.name + lightColorFileEnding,
            lang.ids
          )
        )
      : config.light;
    config.highContrast = lang.icon.highContrast
      ? merge(
          {},
          config.highContrast,
          setLanguageIdentifiers(
            lang.icon.name + highContrastColorFileEnding,
            lang.ids
          )
        )
      : config.highContrast;
  });

  return config;
};

const setIconDefinitions = (config: IconConfiguration, icon: DefaultIcon) => {
  config = merge({}, config);
  config = createIconDefinitions(config, icon.name);
  config = merge(
    {},
    config,
    icon.light
      ? createIconDefinitions(config, icon.name + lightColorFileEnding)
      : config.light
  );
  config = merge(
    {},
    config,
    icon.highContrast
      ? createIconDefinitions(config, icon.name + highContrastColorFileEnding)
      : config.highContrast
  );
  return config;
};

const createIconDefinitions = (config: IconConfiguration, iconName: string) => {
  config = merge({}, config);
  const fileConfigHash = getFileConfigHash(config.options ?? {});
  if (config.iconDefinitions) {
    config.iconDefinitions[iconName] = {
      iconPath: `${iconFolderPath}${iconName}${fileConfigHash}.svg`,
    };
  }
  return config;
};

const setLanguageIdentifiers = (iconName: string, languageIds: string[]) => {
  const obj: Partial<IconConfiguration> = { languageIds: {} };
  languageIds.forEach((id) => {
    obj.languageIds![id as keyof IconConfiguration] = iconName;
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
