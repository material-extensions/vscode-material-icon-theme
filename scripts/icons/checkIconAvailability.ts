import * as path from 'path';
import * as fs from 'fs';
import { fileIcons, folderIcons, languageIcons } from './../../src/icons';
import { similarity } from './similarity';

/**
 * Defines the folder where all icon files are located.
 */
const folderPath = path.join('icons');

/**
 * Defines an array with all icons that can be found in the file system.
 */
const availableIcons: { [s: string]: string } = {};

/**
 * Save the misconfigured icons.
 */
const wrongIconNames = { fileIcons: [], folderIcons: [], languageIcons: [] };

/**
 * Get all icon file names from the file system.
 */
const fsReadAllIconFiles = (err: Error, files: string[]) => {
    if (err) {
        throw Error(err.message);
    }

    files.forEach(file => {
        const fileName = file;
        const iconName = file.slice(0, -4);
        availableIcons[iconName] = fileName;
    });

    // check icon configurations
    checkFileIcons();
    checkFolderIcons();
    checkLanguageIcons();

    // show error messages
    printErrors();
};

// read from the file system
fs.readdir(folderPath, fsReadAllIconFiles);

/**
 * Check if the file icons from the configuration are available on the file system.
 */
const checkFileIcons = () => {
    fileIcons.icons.concat([fileIcons.defaultIcon]).forEach(icon => {
        if (!availableIcons[icon.name]) {
            wrongIconNames.fileIcons.push(icon.name);
        }
    });
};

/**
 * Check if the folder icons from the configuration are available on the file system.
 */
const checkFolderIcons = () => {
    [
        folderIcons.defaultIcon,
        folderIcons.rootFolder,
        ...folderIcons.icons.map(icon => icon.name),
        ...folderIcons.themes.map(theme => theme.defaultIcon)
    ].forEach(icon => {
        if (!availableIcons[icon] && icon) {
            wrongIconNames.folderIcons.push(icon);
        }
    });
};

/**
 * Check if the language icons from the configuration are available on the file system.
 */
const checkLanguageIcons = () => {
    languageIcons.languages.map(lang => lang.icon).forEach(icon => {
        if (!availableIcons[icon] && icon) {
            wrongIconNames.languageIcons.push(icon);
        }
    });
};

/**
 * Show error messages in the terminal.
 */
const printErrors = () => {
    const amountOfErrors = wrongIconNames.fileIcons.length + wrongIconNames.folderIcons.length + wrongIconNames.languageIcons.length;
    if (amountOfErrors > 0) {
        console.log('> Material Icon Theme:', `\x1b[31m Found ${amountOfErrors} error(s) in the icon configuration!\x1b[0m`);
    } else {
        console.log('> Material Icon Theme:', `\x1b[32m Passed all icon configuration checks!\x1b[0m`);
    }
    logIconInformation(wrongIconNames.fileIcons, 'File icons');
    logIconInformation(wrongIconNames.folderIcons, 'Folder icons');
    logIconInformation(wrongIconNames.languageIcons, 'Language icons');

    if (amountOfErrors > 0) {
        throw new Error('Found some wrong file definitions in the icon configuration.');
    }
};

const logIconInformation = (wrongIcons: string[], title: string) => {
    if (wrongIcons.length === 0) return;
    console.log(`\n${title}:\n--------------------------------`);
    wrongIcons.forEach(icon => {
        const suggestion = Object.keys(availableIcons).find((i) => {
            return similarity(icon, i) > 0.75;
        });
        console.log(`\x1b[31m Icon not found: ${icon}\x1b[0m - Did you mean ${suggestion ? '\x1b[32m' + `${suggestion}\x1b[0m` : ''}?`);
    });
};
