import { fileIcons, folderIcons, languageIcons } from './../../../src/icons';
import { FileIcon } from '../../../src/models/index';
import * as painter from '../../helpers/painter';

/**
 * Store all icons that are wrong configured
 */
const allConflicts = {
    fileIcons: {
        fileExtensions: {},
        fileNames: {}
    },
    folderIcons: {}
};

export const check = () => {
    checkFolderIcons();
    checkFileIcons();

    handleErrors();
};

const checkFileIcons = () => {
    const icons = {};
    checkForConflictsInFileIcons('fileExtensions');
    checkForConflictsInFileIcons('fileNames');
};

const checkForConflictsInFileIcons = (fileIconDefinitionType: string) => {
    const icons = {};
    fileIcons.icons.forEach(icon => {
        if (!icon[fileIconDefinitionType]) return {};
        icon[fileIconDefinitionType].forEach(ext => {
            if (!icons[ext]) {
                icons[ext] = icon.name;
            }
            else {
                if (!allConflicts.fileIcons[fileIconDefinitionType][ext]) {
                    allConflicts.fileIcons[fileIconDefinitionType][ext] = [icons[ext], icon.name];
                } else {
                    allConflicts.fileIcons[fileIconDefinitionType][ext].push(icon.name);
                }
            }
        });
    });
};

const checkFolderIcons = () => {
    folderIcons.forEach(theme => {
        if (!theme.icons) return;
        const icons = {};
        theme.icons.forEach(icon => {
            icon.folderNames.forEach(folderName => {
                if (!icons[folderName]) {
                    icons[folderName] = icon.name;
                }
                else {
                    if (!allConflicts.folderIcons[folderName]) {
                        allConflicts.folderIcons[folderName] = [icons[folderName], icon.name];
                    } else {
                        allConflicts.folderIcons[folderName].push(icon.name);
                    }
                }
            });
        });
    });
};

const handleErrors = () => {
    if ([
        ...Object.keys(allConflicts.fileIcons.fileExtensions),
        ...Object.keys(allConflicts.fileIcons.fileNames),
        ...Object.keys(allConflicts.folderIcons)].length > 0
    ) {
        console.log(painter.red('> Material Icon Theme: Icon conflicts:'));
        console.log(painter.red('--------------------------------------'));

        printErrorMessage(allConflicts.fileIcons.fileExtensions);
        printErrorMessage(allConflicts.fileIcons.fileNames);
        printErrorMessage(allConflicts.folderIcons);

        console.log('\n' + painter.red('Please check the wrong icon configurations!\n'));
    }
    else {
        console.log('> Material Icon Theme:', painter.green(`Passed icon conflict checks!`));
    }
};

const printErrorMessage = (icons: any) => {
    const keys = Object.keys(icons);
    keys.forEach(key => {
        const conflictIcons = icons[key];
        console.log(painter.red(`For folderName "${key}" are ${conflictIcons.length} icons defined: [${conflictIcons.join(', ')}]`));
    });
};
