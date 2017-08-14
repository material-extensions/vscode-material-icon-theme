import * as vscode from 'vscode';
import * as fs from 'fs';

// Get current language of the vs code workspace
export const getCurrentLanguage = (): string =>
    vscode.env.language;

let currentTranslation;
let fallbackTranslation; // default: en

/** Initialize the translations */
export const initTranslations = async () => {
    try {
        currentTranslation = await loadTranslation(getCurrentLanguage());
        fallbackTranslation = await loadTranslation('en');
    }
    catch (error) {
        console.log(error);
    }
};

/** Load the required translation */
const loadTranslation = (language: string): Promise<any> => {
    return getTranslationObject(language)
        .catch(() => getTranslationObject('en'));
};

/** Get the translation object of the separated translation files */
const getTranslationObject = async (language: string): Promise<any> => {
    try {
        // tslint:disable-next-line:semicolon
        const lang = await import('./lang-' + language);
        return lang[language];
    }
    catch (error) {
        console.log(error);
    }
};

/**
 * We look up the matching translation in the translation files.
 * If we cannot find a matching key in the file we use the fallback.
 * With optional parameters you can configure both the translations
 * and the fallback (required for testing purposes).
 * */
export const translate = (key: string, translations = currentTranslation, fallback = fallbackTranslation) => {
    return getValue(translations, key) ?
        getValue(translations, key) :
        getValue(fallback, key) ?
            getValue(fallback, key) : undefined;
};

/** Get the nested keys of an object (http://stackoverflow.com/a/6491621/6942210)
 *
 * *This solution is lighter than the lodash get-version and works fine for the translations.* */
const getValue = (obj: any, key: string): string => {
    // convert indexes to properties
    key = key.replace(/\[(\w+)\]/g, '.$1');

    // strip a leading dot
    key = key.replace(/^\./, '');

    // separate keys in array
    let keyArray = key.split('.');

    /** Avoid errors in the getValue function. */
    const isObject = (object) => {
        return object === Object(object);
    };

    for (let i = 0; i < keyArray.length; ++i) {
        let k = keyArray[i];
        if (isObject(obj) && k in obj) {
            obj = obj[k];
        } else {
            return;
        }
    }
    return obj;
};