// With this script you can generate a markdown table for all icons.
// The table is used as an overview about all icons in the readme file.
// Just run `npm run iconSet` from the root folder.
// It will create a markdown file in the 'images' folder.
 
const fs = require('fs');
const path = require('path');

const folder = path.join('icons');
const icons = [];
const generatedFileName = 'allicons.md';

fs.readdir(folder, (err, files) => {
    if (err) {
        console.log(err)
        return;
    }

    // get each icon file from the icons folder
    files.forEach(file => {
        fileName = file;
        iconName = file.slice(0, -4).capitalizeFirstLetter();
        icons.push({ fileName: fileName, iconName: iconName });
    });

    // amount of columns
    let columns = 5;

    // list for the columns with the icons
    let columns_list = [];

    // calculate the amount of icons per column
    let items_per_column = Math.floor(icons.length / columns);    

    // console.log(JSON.stringify(icons));
    counter = 0;
    for (let c = 0; c < columns; c++) {
        columns_list.push([]);
        for (let i = 0; i < items_per_column; i++) {
            columns_list[c].push(icons[counter]);
            counter++;
        }
    }

    // create an empty markdown file
    fs.writeFile(path.join('images', generatedFileName), "", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was created!");
    });

    // create header
    for (let i = 0; i < columns - 1; i++) {
        fs.appendFileSync(path.join('images', generatedFileName), '|Icon|Type');
    }
    fs.appendFileSync(path.join('images', generatedFileName), '|Icon|Type|\n');

    // create headline
    for (let i = 0; i < columns - 1; i++) {
        fs.appendFileSync(path.join('images', generatedFileName), '|---|---');
    }
    fs.appendFileSync(path.join('images', generatedFileName), '|---|---|\n');

    // write the image tags for the icons
    for (let i = 0; i < items_per_column; i++) {
        for (let c = 0; c < columns_list.length; c++) {
            fs.appendFileSync(path.join('images', generatedFileName), '|<img src="./../icons/' + columns_list[c][i].fileName + '" width="25px">|'+ columns_list[c][i].iconName);
        }
        fs.appendFileSync(path.join('images', generatedFileName), "|\n");
    }
});

/**
 * Capitalize the first letter of a string
 */
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}