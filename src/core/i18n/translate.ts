import { get } from '../helpers/object';
import { logger } from '../logging/logger';
import type { Translation } from '../models/i18n/translation';

const translationLoaders: Record<
  string,
  () => Promise<{ translation: Translation }>
> = {
  ar: () => import('./translations/lang-ar'),
  cs: () => import('./translations/lang-cs'),
  de: () => import('./translations/lang-de'),
  en: () => import('./translations/lang-en'),
  es: () => import('./translations/lang-es'),
  fr: () => import('./translations/lang-fr'),
  id: () => import('./translations/lang-id'),
  it: () => import('./translations/lang-it'),
  ja: () => import('./translations/lang-ja'),
  ko: () => import('./translations/lang-ko'),
  nl: () => import('./translations/lang-nl'),
  pl: () => import('./translations/lang-pl'),
  'pt-br': () => import('./translations/lang-pt-br'),
  'pt-pt': () => import('./translations/lang-pt-pt'),
  ru: () => import('./translations/lang-ru'),
  uk: () => import('./translations/lang-uk'),
  'zh-cn': () => import('./translations/lang-zh-cn'),
  'zh-tw': () => import('./translations/lang-zh-tw'),
};

let currentTranslation: Translation;
let fallbackTranslation: Translation;

const placeholder = '%';

export const initTranslations = async (language: string) => {
  try {
    [currentTranslation, fallbackTranslation] = await Promise.all([
      loadTranslation(language),
      loadTranslation('en'),
    ]);
    logger.info('Translations initialized.');
  } catch (error) {
    logger.error(error);
  }
};

const loadTranslation = async (language: string): Promise<Translation> => {
  try {
    const { translation } = await (
      translationLoaders[language] ?? translationLoaders.en
    )();
    return translation;
  } catch {
    return (await translationLoaders.en()).translation;
  }
};

/** Returns a translation by key, falling back when it is missing. */
const getTranslationValue = (
  key: string,
  translations = currentTranslation,
  fallback = fallbackTranslation
): string | undefined => {
  return get(translations, key) ?? get(fallback, key);
};

/** Translates a key and interpolates optional values. */
export const translate = (key: string, ...variables: string[]): string => {
  const translation = getTranslationValue(key);

  if (variables.length === 0) return translation ?? key;
  return replace(translation, ...variables);
};

/** Replaces numbered `%` placeholders with values. */
const replace = (value: string = '', ...variables: string[]) => {
  let translation: string = value;
  variables.forEach((variable, i) => {
    translation = translation.replace(`${placeholder}${i}`, variable);
  });

  return translation;
};
