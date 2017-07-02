// With this script you can generate a markdown table for all icons.
// The table is used as an overview about all icons in the readme file.
// Just run `npm run preview` from the root folder.
// It will create a markdown file in the 'images' folder.

const fs = require('fs');
const path = require('path');

const folder = path.join('icons');
const icons = [];
const folders = [];
const iconsMarkdown = 'lang-icons.md';
const foldersMarkdown = 'folder-icons.md';

fs.readdir(folder, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

    // get each icon file from the icons folder
    files.forEach(file => {
        let fileName = file;
        let iconName = file.slice(0, -4).capitalizeFirstLetter();

        if (String(iconName).toLowerCase().includes('folder')) {
            folders.push({ fileName: fileName, iconName: iconName });
        } else {
            icons.push({ fileName: fileName, iconName: iconName });
        }
    });

    createMarkdownFile(icons, iconsMarkdown, 5);
    createMarkdownFile(folders, foldersMarkdown, 3, '-open', 'Folder-');
});

function createMarkdownFile(iconList, pathname, amountOfColumns, excludeIconWithString, cutStringFromIconName) {
    // icon list with the icons for the markdown
    currentIconList = [];

    // delete icons that should be excluded
    iconList.forEach(icon => {
        if (!icon.iconName.includes(excludeIconWithString)) {
            currentIconList.push(icon);
        }
    });

    // list for the columns with the icons
    let columns_list = [];

    // calculate the amount of icons per column
    let items_per_column = Math.floor(currentIconList.length / amountOfColumns);

    // console.log(JSON.stringify(icons));
    counter = 0;
    for (let c = 0; c < amountOfColumns; c++) {
        columns_list.push([]);
        for (let i = 0; i < items_per_column; i++) {
            columns_list[c].push(currentIconList[counter]);
            counter++;
        }
    }

    // create an empty markdown file
    fs.writeFile(path.join('images', pathname), "", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The " + pathname + "-file has been successfully created!");
    });

    // create header
    for (let i = 0; i < amountOfColumns - 1; i++) {
        fs.appendFileSync(path.join('images', pathname), '|Icon|Type');
    }
    fs.appendFileSync(path.join('images', pathname), '|Icon|Type|\n');

    // create headline
    for (let i = 0; i < amountOfColumns - 1; i++) {
        fs.appendFileSync(path.join('images', pathname), '|---|---');
    }
    fs.appendFileSync(path.join('images', pathname), '|---|---|\n');

    // write the image tags for the icons
    for (let i = 0; i < items_per_column; i++) {
        for (let c = 0; c < columns_list.length; c++) {
            fs.appendFileSync(path.join('images', pathname), '|<img src="./../icons/' + columns_list[c][i].fileName + '" width="24px">|' + columns_list[c][i].iconName.replace(cutStringFromIconName, '').capitalizeFirstLetter());
        }
        fs.appendFileSync(path.join('images', pathname), "|\n");
    }
}

/**
 * Capitalize the first letter of a string
 */
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};