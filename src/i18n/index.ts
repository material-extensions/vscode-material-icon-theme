import { env } from 'vscode';
import { getObjectPropertyValue } from '../helpers/objects';
import { Translation } from '../models';

// Get current language of the vs code workspace
export const getCurrentLanguage = (): string => env.language;

let currentTranslation: Translation;
let fallbackTranslation: Translation;

const placeholder = '%';

/** Initialize the translations */
export const initTranslations = async () => {
  try {
    currentTranslation = await loadTranslation(getCurrentLanguage());
    fallbackTranslation = await loadTranslation('en');
  } catch (error) {
    console.error(error);
  }
};

/** Load the required translation */
const loadTranslation = async (language: string) => {
  try {
    return await getTranslationObject(language);
  } catch (error) {
    return await getTranslationObject('en');
  }
};

/** Get the translation object of the separated translation files */
const getTranslationObject = async (language: string): Promise<Translation> => {
  const getTranslations = (lang: any) => lang.translation as Translation;

  switch (language) {
    case 'cs':
      return getTranslations(await import(`./lang-cs`));
    case 'de':
      return getTranslations(await import(`./lang-de`));
    case 'es':
      return getTranslations(await import(`./lang-es`));
    case 'fr':
      return getTranslations(await import(`./lang-fr`));
    case 'ja':
      return getTranslations(await import(`./lang-ja`));
    case 'nl':
      return getTranslations(await import(`./lang-nl`));
    case 'pl':
      return getTranslations(await import(`./lang-pl`));
    case 'pt-br':
      return getTranslations(await import(`./lang-pt-br`));
    case 'pt-pt':
      return getTranslations(await import(`./lang-pt-pt`));
    case 'ru':
      return getTranslations(await import(`./lang-ru`));
    case 'uk':
      return getTranslations(await import(`./lang-uk`));
    case 'zh-cn':
      return getTranslations(await import(`./lang-zh-cn`));
    case 'zh-tw':
      return getTranslations(await import(`./lang-zh-tw`));
    default:
      return getTranslations(await import(`./lang-en`));
  }
};

/**
 * We look up the matching translation in the translation files.
 * If we cannot find a matching key in the file we use the fallback.
 * With optional parameters you can configure both the translations
 * and the fallback (required for testing purposes).
 * */
export const getTranslationValue = (
  key: string,
  translations = currentTranslation,
  fallback = fallbackTranslation
): string | undefined => {
  return (
    getObjectPropertyValue(translations, key) ??
    getObjectPropertyValue(fallback, key)
  );
};

/**
 * The instant method is required for the translate pipe.
 * It helps to translate a word instantly.
 */
export const translate = (key: string, ...variables: string[]): string => {
  const translation = getTranslationValue(key);

  if (variables.length === 0) return translation ?? key;
  return replace(translation, ...variables);
};

/**
 * The replace function will replace the current placeholder with the
 * data parameter from the translation. You can give it one or more optional
 * parameters ('variables').
 */
export const replace = (value: string = '', ...variables: string[]) => {
  let translation: string = value;
  variables.forEach((variable, i) => {
    translation = translation.replace(`${placeholder}${i}`, variable);
  });

  return translation;
};
