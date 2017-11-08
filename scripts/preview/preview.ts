import * as path from 'path';
import * as fs from 'fs';
import * as painter from './../helpers/painter';
import { toTitleCase } from './../helpers/titleCase';
import { createScreenshots } from './screenshots';

const htmlDoctype = `<!DOCTYPE html>`;
const cssFilePath = path.join('..', '..', 'scripts', 'preview', 'style.css');
const styling = `<link rel="stylesheet" href="${cssFilePath}">`;

const createHTMLTableHeadRow = (amount: number) => {
    const pair = `
        <th class="icon">Icon</th>
        <th class="type">Type</th>
    `;
    const columns = [...Array(amount)].map(item => item = pair).join('');
    return `
        <tr>
            ${columns}
        </tr>
    `;
};

const createHTMLTableBodyRows = (items: IconDefinition[][]) => {
    let rows = '';
    items.forEach((row, i) => {
        const columns = row.map(icon => `
            <td class="icon">
                <img src="./../../icons/${icon.iconName}.svg" alt="${icon.label}">
            </td>
            <td class="type">${toTitleCase(icon.label)}</td>
        `).join('');
        const tableRow = `
            <tr>
                ${columns}
            </tr>
        `;
        rows = rows + tableRow;
    });
    return rows;
};

const createHTMLTable = (headRow, bodyRows) => `
    <table>
        ${headRow}
        ${bodyRows}
    </table>
`;

const createPreviewTable = (icons: IconDefinition[][], size: number) => {
    const table = htmlDoctype + styling + createHTMLTable(
        createHTMLTableHeadRow(size),
        createHTMLTableBodyRows(icons)
    );
    return table;
};

const savePreview = (fileName: string, size: number, icons: IconDefinition[][]) => {
    const previewFolderPath = path.join('out', 'previews');
    const filePath = path.join(previewFolderPath, fileName + '.html');

    // create the out folder if it does not exist
    fs.existsSync(previewFolderPath) || fs.mkdirSync(previewFolderPath);

    // write the html file with the icon table
    fs.writeFileSync(filePath, createPreviewTable(icons, size));

    // create the images
    createScreenshots(filePath, fileName).then(() => {
        console.log(painter.green(`Successfully created ${fileName} preview images!`));
    }).catch(e => {
        throw Error(painter.red(`Error while creating ${fileName} preview images`));
    });
};

const getIconDefinitionsMatrix = (icons: IconDefinition[], size: number, excluded: string[] = []): IconDefinition[][] => {
    const iconList = icons
        .sort((a, b) => a.label.localeCompare(b.label))
        .filter(i => excluded.indexOf(i.iconName) === -1);

    // list for the columns with the icons
    const matrix: IconDefinition[][] = [];

    // calculate the amount of icons per column
    const itemsPerColumn = Math.floor(iconList.length / size);

    // create the columns with the icons
    let counter = 0;
    for (let c = 0; c < itemsPerColumn; c++) {
        matrix[c] = [];
    }
    for (let s = 0; s < size; s++) {
        for (let i = 0; i < itemsPerColumn; i++) {
            matrix[i][s] = iconList[counter];
            counter++;
        }
    }

    return matrix;
};

/**
 * Function that generates the preview image for specific icons.
 * @param name name of the preview
 * @param icons icons for the preview
 * @param size amount of table columns
 * @param excluded which icons shall be excluded
 */
export const generatePreview = (name: string, icons: IconDefinition[], size: number, excluded: string[] = []) => {
    savePreview(name, size, getIconDefinitionsMatrix(icons, size, excluded));
};

interface IconDefinition {
    iconName: string;
    label: string;
}
