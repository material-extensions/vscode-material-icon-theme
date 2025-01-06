import { get } from '../helpers/object';
import { logger } from '../logging/logger';
import type { Translation } from '../models/i18n/translation';
import { translation as langCs } from './translations/lang-cs';
import { translation as langDe } from './translations/lang-de';
import { translation as langEn } from './translations/lang-en';
import { translation as langEs } from './translations/lang-es';
import { translation as langFr } from './translations/lang-fr';
import { translation as langId } from './translations/lang-id';
import { translation as langJa } from './translations/lang-ja';
import { translation as langKo } from './translations/lang-ko';
import { translation as langNl } from './translations/lang-nl';
import { translation as langPl } from './translations/lang-pl';
import { translation as langPtBr } from './translations/lang-pt-br';
import { translation as langPtPt } from './translations/lang-pt-pt';
import { translation as langRu } from './translations/lang-ru';
import { translation as langUk } from './translations/lang-uk';
import { translation as langZhCn } from './translations/lang-zh-cn';
import { translation as langZhTw } from './translations/lang-zh-tw';

let currentTranslation: Translation;
let fallbackTranslation: Translation;

const placeholder = '%';

/** Initialize the translations */
export const initTranslations = async (language: string) => {
  try {
    currentTranslation = await loadTranslation(language);
    fallbackTranslation = await loadTranslation('en');
    logger.info('Translations initialized.');
  } catch (error) {
    logger.error(error);
  }
};

/** Load the required translation */
const loadTranslation = async (language: string) => {
  try {
    return await getTranslationObject(language);
  } catch {
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
    case 'id':
      return langId;
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
  return get(translations, key) ?? get(fallback, key);
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
