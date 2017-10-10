import * as path from 'path';
import * as fs from 'fs';
import { fileIcons, folderIcons, languageIcons, openedFolder, lightVersion, highContrastVersion } from './../../../src/icons';
import * as painter from './../../helpers/painter';

/**
 * Defines the folder where all icon files are located.
 */
const folderPath = path.join('icons');

/**
 * Defines an array with all icons that can be found in the file system.
 */
const availableIcons: { [s: string]: string } = {};

const unusedIcons = [];

/**
 * Get all icon file names from the file system.
 */
const fsReadAllIconFiles = (err: Error, files: string[]) => {
    if (err) {
        throw Error(err.message);
    }

    files.forEach(file => {
        const fileName = file;
        const iconName = path.parse(file).name;
        availableIcons[iconName] = fileName;
    });

    checkUsageOfAllIcons();
    showWarningMessage();
};

const checkUsageOfAllIcons = () => {
    const usedIcons: string[] = [
        fileIcons.defaultIcon.name,
        ...fileIcons.icons.map(icon => icon.name),
        ...fileIcons.icons.filter(icon => icon.light).map(icon => icon.name + lightVersion),
        ...fileIcons.icons.filter(icon => icon.highContrast).map(icon => icon.name + highContrastVersion),
        folderIcons.defaultIcon,
        folderIcons.rootFolder,
        folderIcons.defaultIcon + openedFolder,
        folderIcons.rootFolder + openedFolder,
        ...folderIcons.icons.map(icon => icon.name),
        ...folderIcons.icons.map(icon => icon.name + openedFolder),
        ...folderIcons.themes.map(theme => theme.defaultIcon),
        ...folderIcons.themes.map(theme => theme.rootFolder),
        ...folderIcons.themes.map(theme => theme.defaultIcon + openedFolder),
        ...folderIcons.themes.map(theme => theme.rootFolder + openedFolder),
        ...languageIcons.languages.map(lang => lang.icon)
    ];
    usedIcons.forEach(icon => {
        delete availableIcons[icon];
    });
};

const showWarningMessage = () => {
    const amountOfUnusedIcons = Object.keys(availableIcons).length;
    if (amountOfUnusedIcons === 0) {
        console.log('> Material Icon Theme:', painter.green(`Passed icon usage rate checks!`));
    } else {
        console.log(`> Material Icon Theme: ` + painter.yellow(`${amountOfUnusedIcons} unused icon(s):`));
        Object.keys(availableIcons).forEach(icon => {
            console.log(painter.yellow(`- ${availableIcons[icon]}`));
        });
    }
};

// read from the file system
export const check = () => fs.readdir(folderPath, fsReadAllIconFiles);
