import * as fs from 'fs';
import * as path from 'path';
import { MarkdownConfig, Icon } from "./interfaces";
import { toUpperCase } from "./helpers";

/** Write the markdown file into the output folder */
export const writeMarkdown = (config: MarkdownConfig, itemsPerColumn: number, matrix: Icon[][]) => {
    let output: string = '';

    // create header
    for (let i = 0; i < config.columns - 1; i++) {
        output += '|Icon|Type';
    }
    output += '|Icon|Type|\n';

    // create header line
    for (let i = 0; i < config.columns - 1; i++) {
        output += '|---|---';
    }
    output += '|---|---|\n';

    // write the image tags for the icons
    for (let i = 0; i < itemsPerColumn; i++) {
        for (let c = 0; c < matrix.length; c++) {
            let img = '|<img src="./../icons/' + matrix[c][i].fileName + '" width="24px">|' + (config.filterName ? toUpperCase(matrix[c][i].iconName.replace(config.filterName, '')) : matrix[c][i].iconName);
            output += img;

        }
        output += "|\n";
    }

    // create an empty markdown file
    fs.writeFile(path.join(config.outputPath, config.markdownName), output, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The " + config.markdownName + "-file has been successfully created!");
    });
};
