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
    folderIcons: {},
    languageIcons: {}
};

export const check = () => {
    checkFolderIcons();
    checkFileIcons();
    checkLanguageIcons();

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

const checkLanguageIcons = () => {
    const icons = {};
    languageIcons.forEach(langIcon => {
        langIcon.ids.forEach(id => {
            if (!icons[id]) {
                icons[id] = langIcon.icon.name;
            }
            else {
                if (!allConflicts.languageIcons[id]) {
                    allConflicts.languageIcons[id] = [icons[id], langIcon.icon.name];
                } else {
                    allConflicts.languageIcons[id].push(langIcon.icon.name);
                }
            }
        });
    });
};

const handleErrors = () => {
    if ([
        ...Object.keys(allConflicts.fileIcons.fileExtensions),
        ...Object.keys(allConflicts.fileIcons.fileNames),
        ...Object.keys(allConflicts.folderIcons),
        ...Object.keys(allConflicts.languageIcons)].length > 0
    ) {
        console.log(painter.red('> Material Icon Theme: Icon conflicts:'));
        console.log(painter.red('--------------------------------------'));

        printErrorMessage(allConflicts.fileIcons.fileExtensions, 'fileExtension');
        printErrorMessage(allConflicts.fileIcons.fileNames, 'fileName');
        printErrorMessage(allConflicts.folderIcons, 'folderName');
        printErrorMessage(allConflicts.languageIcons, 'languageId');

        console.log('\n' + painter.red('Please check the wrong icon configurations!\n'));
    }
    else {
        console.log('> Material Icon Theme:', painter.green(`Passed icon conflict checks!`));
    }
};

const printErrorMessage = (icons: any, definitionType: string) => {
    const keys = Object.keys(icons);
    keys.forEach(key => {
        const conflictIcons = icons[key];
        console.log(painter.red(`For ${definitionType} "${key}" are ${conflictIcons.length} icons defined: [${conflictIcons.join(', ')}]`));
    });
};
