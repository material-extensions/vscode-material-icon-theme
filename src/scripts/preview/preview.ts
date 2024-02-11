import { writeFileSync } from 'fs';
import { join } from 'path';
import { green, red } from '../helpers/painter';
import { createScreenshot } from '../helpers/screenshots';
// import { toTitleCase } from './../helpers/titleCase';
import { IconDefinition } from './icon';

export const htmlDoctype = '<!DOCTYPE html>';

const cssFilePath = 'style.css';
export const styling = `<link rel="stylesheet" href="${cssFilePath}">`;

const createHTMLTableHeadRow = (amount: number) => {
  const pair = `
        <th class="icon">Icon</th>
        <th class="iconName">Name</th>
    `;
  const columns = [...Array(amount > 0 ? amount : 5)].map(() => pair).join('');
  return `
        <tr>
            ${columns}
        </tr>
    `;
};

const createHTMLTableBodyRows = (
  items: IconDefinition[][],
  iconsPath: string,
  size: number
) => {
  let rows = '';
  items.forEach((row) => {
    const columns = row
      .map((icon) => {
        const subpath = icon.theme ? `${icon.theme}/` : '';

        return `
          <td class="icon">
              <img style="width: ${size.toFixed(
                0
              )}px" src="${iconsPath}/${subpath}${icon.name}.svg" alt="${
          icon.label
        }">
          </td>
          <td class="iconName">${icon.label ?? icon.name}</td>
        `;
      })
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

const noIconsFound = `
  <div class="no-icons">
    Oops, no icons found!
  </div>
`;

export const createPreviewTable = (
  icons: IconDefinition[][],
  size: number,
  iconsPath: string,
  fullPage: boolean = true,
  iconSize: number = 30
) => {
  const table =
    (fullPage ? htmlDoctype : '') +
    (fullPage ? styling : '') +
    createHTMLTable(
      createHTMLTableHeadRow(size),
      createHTMLTableBodyRows(icons, iconsPath, iconSize)
    ) +
    (icons.length === 0 ? noIconsFound : '');
  return table;
};

const savePreview = (
  fileName: string,
  size: number,
  icons: IconDefinition[][],
  iconsPath: string
) => {
  const filePath = join(__dirname, fileName + '.html');

  // write the html file with the icon table
  writeFileSync(filePath, createPreviewTable(icons, size, iconsPath));

  // create the image
  createScreenshot(filePath, fileName)
    .then(() => {
      console.log(
        '> 🍭 lucodear-icons:',
        green(`Successfully created ${fileName} preview image!`)
      );
    })
    .catch(() => {
      throw Error(red(`Error while creating ${fileName} preview image`));
    });
};

export const getIconDefinitionsMatrix = (
  icons: IconDefinition[],
  size: number,
  excluded: string[] = [],
  sort: boolean = true,
  trim: boolean = false
): IconDefinition[][] => {
  const iconList = sort
    ? icons.sort((a, b) => (a.label ?? a.name).localeCompare(b.label ?? b.name))
    : icons;

  trim && trimIconListToSize(iconList, size, excluded);

  // list for the columns with the icons
  const matrix: IconDefinition[][] = [];

  // calculate the amount of icons per column
  const itemsPerColumn = Math.floor(iconList.length / size);
  const rest = iconList.length % size;
  const restItems = iconList.slice(-rest);

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

  // add another row with the rest of the icons
  if (rest > 0) {
    matrix.push(restItems);
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
  trimmableIcons: string[] = [],
  iconsPath: string = './../../../icons'
) => {
  const safeSize = icons.length >= size ? size : icons.length;

  savePreview(
    name,
    safeSize,
    getIconDefinitionsMatrix(icons, safeSize, trimmableIcons),
    iconsPath
  );
};

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
  if (size === 0) {
    return;
  }

  while (iconList.length % size !== 0) {
    iconList.splice(
      iconList.findIndex(
        (i) => i.name === trimmableIcons[iconList.length % size]
      ),
      1
    );
  }
};
