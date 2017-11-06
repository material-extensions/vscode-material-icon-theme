import { createScreenshots } from './screenshots';
import { generatePreview } from './preview';
import { fileIcons } from './../../src/icons/fileIcons';
import { folderIcons } from './../../src/icons/folderIcons';
import * as painter from './../helpers/painter';
import * as fs from 'fs';
import * as path from 'path';
import { toTitleCase } from '../helpers/titleCase';

const filterDuplicates = (icons: string[]) => {
    return [...new Set(icons)];
};

const basicFileIcons = fileIcons.icons
    .map(i => ({ iconName: i.name, label: i.name }));

const folderThemes = filterDuplicates(folderIcons.map(theme => {
    const folders = [];
    if (theme.defaultIcon.name !== '') {
        folders.push(theme.defaultIcon.name);
    }
    if (theme.icons && theme.icons.length > 0) {
        folders.push(...theme.icons.map(i => i.name));
    }
    return [].concat(...folders);
}).reduce((a, b) => a.concat(b))).map(i => ({ iconName: i, label: toTitleCase(i.replace('folder-', '')) }));

generatePreview('fileIcons', basicFileIcons, 5, ['word', 'movie', 'virtual', 'music']);
generatePreview('folderIcons', folderThemes, 5, ['folder-git', 'folder-expo', 'folder-font']);
