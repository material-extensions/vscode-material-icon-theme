import * as path from 'path';
import * as fs from 'fs';
import { fileIcons, folderIcons, languageIcons, openedFolder, lightVersion, highContrastVersion } from './../../../src/icons';
import * as painter from './../../helpers/painter';
import { FolderType } from '../../../src/models/index';

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
    const usedIcons: string[] = getAllUsedIcons();
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

const getAllUsedIcons = (): string[] => {
    const test = [
        fileIcons.defaultIcon.name,
        ...fileIcons.icons.map(icon => icon.name),
        ...fileIcons.icons.filter(icon => icon.light).map(icon => icon.name + lightVersion),
        ...fileIcons.icons.filter(icon => icon.highContrast).map(icon => icon.name + highContrastVersion),
        ...languageIcons.languages.map(lang => lang.icon),
        ...getAllFolderIcons(folderIcons),
        ...folderIcons.themes.map(theme =>
            theme.name === FolderType.None ? undefined :
                getAllFolderIcons(theme)).reduce((a, b) => a.concat(b))
    ];
    return test;
};

const getAllFolderIcons = (f_icons) => {
    const specificIcons = f_icons.icons ? [
        ...f_icons.icons.map(icon => icon.name),
        ...f_icons.icons.map(icon => icon.name + openedFolder)
    ] : [];
    return [
        f_icons.defaultIcon,
        f_icons.rootFolder ? f_icons.rootFolder : f_icons.defaultIcon,
        f_icons.defaultIcon + openedFolder,
        f_icons.rootFolder ? f_icons.rootFolder + openedFolder : f_icons.defaultIcon + openedFolder,
        ...specificIcons
    ];
};

