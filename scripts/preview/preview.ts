import * as path from 'path';
import * as fs from 'fs';
import * as painter from './../helpers/painter';
import { toTitleCase } from './../helpers/titleCase';
import { createScreenshots } from './screenshots';

const htmlDoctype = `<!DOCTYPE html>`;
const cssFilePath = path.join('..', '..', 'scripts', 'preview', 'style.css');
const styling = `<link rel="stylesheet" href="${cssFilePath}">`;

const createHeadRow = (amount: number) => {
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

const createBodyRows = (items: string[][]) => {
    let rows = '';
    items.forEach((row, i) => {
        const columns = row.map(icon => `
            <td class="icon">
                <img src="./../../icons/${icon}.svg" alt="${icon}">
            </td>
            <td class="type">${toTitleCase(icon)}</td>
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

const createTable = (headRow, bodyRows) => `
    <table>
        ${headRow}
        ${bodyRows}
    </table>
`;

const createPreviewTable = (icons: string[][], size: number) => {
    const table = htmlDoctype + styling + createTable(
        createHeadRow(size),
        createBodyRows(icons)
    );
    return table;
};

const savePreview = (fileName: string, size: number, icons: string[][]) => {
    const previewFolderPath = path.join('out', 'previews');
    const filePath = path.join(previewFolderPath, fileName + '.html');
    fs.existsSync(previewFolderPath) || fs.mkdirSync(previewFolderPath);
    fs.writeFileSync(filePath, createPreviewTable(icons, size));

    createScreenshots(filePath, fileName).then(() => {
        console.log(painter.green(`Successfully created ${fileName} preview images!`));
    }).catch(e => {
        throw Error(painter.red(`Error while creating ${fileName} preview images`));
    });
};

const getIconDefinitionsMatrix = (icons: string[], size: number, excluded: string[] = []): string[][] => {
    const iconList = icons
        .sort((a, b) => a.localeCompare(b))
        .filter(i => excluded.indexOf(i) === -1);

    // list for the columns with the icons
    const matrix: string[][] = [];

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

export const generatePreview = (name: string, icons: string[], size: number, excluded: string[] = []) => {
    savePreview(name, size, getIconDefinitionsMatrix(icons, size, excluded));
};
