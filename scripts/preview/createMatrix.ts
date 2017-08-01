/** Create the markdown file with a table that shows all icons */
import { MarkdownConfig, Icon } from "./interfaces";
import { writeMarkdown } from "./writeMarkdown";

export const generateMarkdown = (config: MarkdownConfig) => {
    // icon list with the icons for the markdown
    let filteredIconList: Icon[] = [];

    // delete icons that should be excluded
    if (config.exclude && config.exclude.length > 0) {
        config.iconList.forEach(icon => {
            config.exclude.forEach(exludeString => {
                if (!icon.iconName.includes(exludeString)) {
                    filteredIconList.push(icon);
                }
            });
        });
    } else {
        filteredIconList = config.iconList;
    }

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