/**
 * With this script you are able to generate a markdown table for all icons.
 * The table is used as an overview about all icons in the readme file.
 * Just run `npm run preview` from the root folder.
 * It will create a markdown file in the 'images' folder.
 */
import * as fs from 'fs';
import * as path from 'path';
import { Icon, MarkdownConfig } from './models';
import { generateMarkdown } from './createMatrix';
import { openedFolder } from '../../src/icons/index';
import { capitalizeFirstLetter } from '../../src/helpers';

// Define the folder icon of all icons
const folderPath = path.join('icons');

/** Define the parameters here */
const init = () => {
    // generate markdown for the file icons
    generateMarkdown({
        iconList: fileIcons,
        markdownName: 'file-icons.md',
        columns: 5,
        exclude: ['Todo'],
        outputPath: path.join('images')
    });

    // generate markdown for the folder icons
    generateMarkdown({
        iconList: folderIcons,
        markdownName: 'folder-icons.md',
        columns: 4,
        exclude: [openedFolder],
        filterName: 'Folder-',
        outputPath: path.join('images')
    });
};

const fileIcons: Icon[] = [];
const folderIcons: Icon[] = [];

/** Read all icon files and sort by folder and file icons. */
const fsReadAllIconFiles = (err: Error, files: string[]) => {
    if (err) {
        throw Error(err.message);
    }

    // get each icon file from the icons folder
    files.forEach(file => {
        let fileName = file;
        let iconName = capitalizeFirstLetter(path.parse(file).name);

        if (String(iconName).toLowerCase().includes('folder')) {
            folderIcons.push({ fileName: fileName, iconName: iconName });
        } else {
            fileIcons.push({ fileName: fileName, iconName: iconName });
        }
    });

    init();
};

fs.readdir(folderPath, fsReadAllIconFiles);
