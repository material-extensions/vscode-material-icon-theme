import { fileIcons } from './../../icons/fileIcons';
import { folderIcons } from './../../icons/folderIcons';
import { languageIcons } from './../../icons/languageIcons';
import { generatePreview } from './preview';

const filterDuplicates = (icons: string[]) => {
    return [...new Set(icons)];
};

const basicFileIcons = filterDuplicates(
    fileIcons.icons
        .map(i => i.name)
        // merge language icons
        .concat(languageIcons.map(i => i.icon.name))
).map(i => ({ iconName: i, label: i }));

const folderThemes = filterDuplicates(folderIcons.map(theme => {
    const folders = [];
    if (theme.defaultIcon.name !== '') {
        folders.push(theme.defaultIcon.name);
    }
    if (theme.icons && theme.icons.length > 0) {
        folders.push(...theme.icons.map(i => i.name));
    }
    return [].concat(...folders);
}).reduce((a, b) => a.concat(b))).map(i => ({ iconName: i, label: i.replace('folder-', '') }));

generatePreview('fileIcons', basicFileIcons, 5, ['powerpoint', 'virtual', 'todo']);
generatePreview('folderIcons', folderThemes, 5, []);
