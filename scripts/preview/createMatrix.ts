/** Create the markdown file with a table that shows all icons */
import { MarkdownConfig, Icon } from './models';
import { writeMarkdown } from './writeMarkdown';

export const generateMarkdown = (config: MarkdownConfig) => {
    // delete icons that should be excluded
    let filteredIconList: Icon[] = config.iconList.filter((icon, i) => {
        return config.exclude.every(exclude => {
            return !icon.iconName.toLowerCase().includes(exclude.toLowerCase());
        });
    });

    // list for the columns with the icons
    let matrix: Icon[][] = [];

    // calculate the amount of icons per column
    let itemsPerColumn = Math.floor(filteredIconList.length / config.columns);

    // create the columns with the icons
    let counter = 0;
    for (let c = 0; c < config.columns; c++) {
        matrix.push([]);
        for (let i = 0; i < itemsPerColumn; i++) {
            matrix[c].push(filteredIconList[counter]);
            counter++;
        }
    }

    writeMarkdown(config, itemsPerColumn, matrix);
};