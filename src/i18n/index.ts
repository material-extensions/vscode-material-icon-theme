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
const getValue = (o, s) => {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    let a = s.split('.');

    /** Avoid errors in the getValue function. */
    const isObject = (object) => {
        return object === Object(object);
    };

    for (let i = 0, n = a.length; i < n; ++i) {
        let k = a[i];
        if (isObject(o) && k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};