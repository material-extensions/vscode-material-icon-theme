import * as vscode from 'vscode';
import * as fs from 'fs';

// Get current language of the vs code workspace
const getCurrentLanguage = (): string =>
    vscode.env.language;

let currentLanguageTranslations;
let fallbackLanguageTranslations; // en

/** Initialize the translations */
export const initTranslations = () => {
    return loadTranslation(getCurrentLanguage()).then(translation => {
        currentLanguageTranslations = translation;

        // load fallback translation
        loadTranslation('en').then(fallbackTranslation => {
            fallbackLanguageTranslations = fallbackTranslation;
        });
    });
};

/** Read the translation file from the file system */
const readTranslationFile = (filename: string) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/${filename}.json`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

/** Load the required translation */
const loadTranslation = (language: string): Promise<any> => {
    return readTranslationFile(language)
        .catch(() => readTranslationFile('en'));
};

/** Translate the keys */
export const translate = (key: string) => {
    const sample = getValue(currentLanguageTranslations, key) ?
        getValue(currentLanguageTranslations, key) :
        getValue(fallbackLanguageTranslations, key) ?
            getValue(fallbackLanguageTranslations, key) : undefined;
    return sample;
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