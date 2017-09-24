import { files, folders, languages } from './index';
import * as path from 'path';

export const iconGenerator = () => {
    return {
        iconDefinitions: getIconDefinitions()
    };
};

/**
 * Generate the icon definitions object
 */
const getIconDefinitions = () => {
    const defs = {};
    const allIcons: string[] = [
        ...getAllFileIcons(),
        ...getAllFolderIcons(),
        ...getAllLanguageIcons(),
    ];

    // generate object and iconPath
    allIcons.forEach(icon => {
        defs[`${path.parse(icon).name}`] = {
            iconPath: `./../../icons/${icon}.svg`
        };
    });

    return defs;
};

/**
 * Get all file icons that can be used in this theme.
 */
const getAllFileIcons = (): string[] => [
    files.default,
    ...files.types.map(type => type.icon),
];

/**
 * Get all folder icons that can be used in this theme.
 * For each folder icon exists an icon that shows the opened folder.
 */
const getAllFolderIcons = (): string[] => [
    folders.default,
    folders.rootFolder ? folders.rootFolder : folders.default,
    ...folders.types.map(type => type.icon),
    ...folders.themes.map(theme => theme.default)
].reduce((all, icon) => {
    // add expanded folder icons
    return all.concat([icon, icon + '-open']);
}, []);

/**
 * Get all language icons that can be used in this theme.
 */
const getAllLanguageIcons = (): string[] => [
    ...languages.types.map(type => type.icon)
];
