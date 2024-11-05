import { writeFileSync } from 'fs';
import { join } from 'path';
import { green, red } from '../helpers/painter';
import { createScreenshot } from '../helpers/screenshots';
import { toTitleCase } from './../helpers/titleCase';

const htmlDoctype = '<!DOCTYPE html>';
const cssFilePath = 'style.css';
const styling = `<link rel="stylesheet" href="${cssFilePath}">`;

const createHTMLTableHeadRow = (amount: number) => {
  const pair = `
        <th class="icon">Icon</th>
        <th class="iconName">Name</th>
    `;
  const columns = [...Array(amount)].map(() => pair).join('');
  return `
        <tr>
            ${columns}
        </tr>
    `;
};

const createHTMLTableBodyRows = (items: IconDefinition[][]) => {
  let rows = '';
  items.forEach((row) => {
    const columns = row
      .map(
        (icon) => `
            <td class="icon">
                <img src="./../../../icons/${icon.iconName}.svg" alt="${
          icon.label
        }">
            </td>
            <td class="iconName">${toTitleCase(icon.label)}</td>
        `
      )
      .join('');
    const tableRow = `
            <tr>
                ${columns}
            </tr>
        `;
    rows = rows + tableRow;
  });
  return rows;
};

const createHTMLTable = (headRow: string, bodyRows: string) => `
    <table>
        ${headRow}
        ${bodyRows}
    </table>
`;

const createPreviewTable = (icons: IconDefinition[][], size: number) => {
  const table =
    htmlDoctype +
    styling +
    createHTMLTable(
      createHTMLTableHeadRow(size),
      createHTMLTableBodyRows(icons)
    );
  return table;
};

const savePreview = (
  fileName: string,
  size: number,
  icons: IconDefinition[][]
) => {
  const filePath = join(__dirname, fileName + '.html');

  // write the html file with the icon table
  writeFileSync(filePath, createPreviewTable(icons, size));

  // create the image
  createScreenshot(filePath, fileName)
    .then(() => {
      console.log(
        '> Material Icon Theme:',
        green(`Successfully created ${fileName} preview image!`)
      );
    })
    .catch(() => {
      throw Error(red(`Error while creating ${fileName} preview image`));
    });
};

const getIconDefinitionsMatrix = (
  icons: IconDefinition[],
  size: number,
  excluded: string[] = []
): IconDefinition[][] => {
  const iconList = icons.sort((a, b) => a.label.localeCompare(b.label));
  trimIconListToSize(iconList, size, excluded);

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
 * @param trimmableIcons List of icons that can possibly be trimmed
 */
export const generatePreview = (
  name: string,
  icons: IconDefinition[],
  size: number,
  trimmableIcons: string[] = []
) => {
  savePreview(
    name,
    size,
    getIconDefinitionsMatrix(icons, size, trimmableIcons)
  );
};

interface IconDefinition {
  iconName: string;
  label: string;
}

/**
 * Trim the list of icons into the matrix
 * @param iconList List of icons
 * @param size Amount of columns
 * @param trimmableIcons List of icons that can possibly be trimmed
 */
const trimIconListToSize = (
  iconList: IconDefinition[],
  size: number,
  trimmableIcons: string[]
) => {
  while (iconList.length % size !== 0) {
    iconList.splice(
      iconList.findIndex(
        (i) => i.iconName === trimmableIcons[iconList.length % size]
      ),
      1
    );
  }
};
