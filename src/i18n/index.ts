import { env } from 'vscode';
import { getObjectPropertyValue } from '../helpers/objects';
import type { Translation } from '../models';
import { translation as langCs } from './lang-cs';
import { translation as langDe } from './lang-de';
import { translation as langEn } from './lang-en';
import { translation as langEs } from './lang-es';
import { translation as langFr } from './lang-fr';
import { translation as langJa } from './lang-ja';
import { translation as langKo } from './lang-ko';
import { translation as langNl } from './lang-nl';
import { translation as langPl } from './lang-pl';
import { translation as langPtBr } from './lang-pt-br';
import { translation as langPtPt } from './lang-pt-pt';
import { translation as langRu } from './lang-ru';
import { translation as langUk } from './lang-uk';
import { translation as langZhCn } from './lang-zh-cn';
import { translation as langZhTw } from './lang-zh-tw';

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
  switch (language) {
    case 'cs':
      return langCs;
    case 'de':
      return langDe;
    case 'en':
      return langEn;
    case 'es':
      return langEs;
    case 'fr':
      return langFr;
    case 'ja':
      return langJa;
    case 'ko':
      return langKo;
    case 'nl':
      return langNl;
    case 'pl':
      return langPl;
    case 'pt-br':
      return langPtBr;
    case 'pt-pt':
      return langPtPt;
    case 'ru':
      return langRu;
    case 'uk':
      return langUk;
    case 'zh-cn':
      return langZhCn;
    case 'zh-tw':
      return langZhTw;
    default:
      return langEn;
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
