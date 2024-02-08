import { lucodearFileIcons, lucodearFolderIcons } from '../../lucodear/icons';
import { IconDefinition, Theme, getFiles, getFolders, getThemes } from './icon';
import { writeFileSync } from 'fs';
import {
  createPreviewTable,
  getIconDefinitionsMatrix,
  htmlDoctype,
} from './preview';
import { createScreenshot } from '../helpers/screenshots';
import { green, red } from '../helpers/painter';
import { join } from 'path';

const folderIcons = getFolders([lucodearFolderIcons]);
const filesIcons = getFiles(lucodearFileIcons.icons);
const themes = getThemes(folderIcons, filesIcons);

const lucodearPreview = (size = 5, path = './../../../icons-lc') => {
  let content = '';
  const fileName = `lucodear-icons`;
  const filePath = join(__dirname, fileName + '.html');

  for (const theme of themes) {
    const themeFolderIcons = folderIcons.filter((i) => i.theme === theme.name);
    const themeFileIcons = filesIcons.filter((i) => i.theme === theme.name);
    const foldersSafeSize =
      themeFolderIcons.length >= size ? size : themeFolderIcons.length;
    const filesSafeSize =
      themeFileIcons.length >= size ? size : themeFileIcons.length;

    content += makeThemeSection(
      theme,
      foldersSafeSize,
      filesSafeSize,
      themeFolderIcons,
      themeFileIcons,
      path
    );
  }

  content = `
  ${htmlDoctype}
  <html>
  <head>
  <link rel="stylesheet" href="./lucodear-style.css">
  </head>
  <body>
  <main>
  ${content}
  </main>
  </body>
  </html>
  `;

  // save preview
  saveScreenshot(fileName, filePath, content);
};

const makeThemeSection = (
  theme: Theme,
  foldersSize: number,
  filesSize: number,
  folderIcons: IconDefinition[],
  fileIcons: IconDefinition[],
  iconsPath: string
): string => {
  const filesMatrix = getIconDefinitionsMatrix(fileIcons, filesSize);
  const foldersMatrix = getIconDefinitionsMatrix(folderIcons, foldersSize);

  // write the html file with the icon table
  const filesTable = createPreviewTable(
    filesMatrix,
    filesSize,
    iconsPath,
    false
  );
  const foldersTable = createPreviewTable(
    foldersMatrix,
    foldersSize,
    iconsPath,
    false
  );

  return `
    <section>
      <h1>🍭 » ${theme.name}</h1>
      ${
        theme.hasFolders
          ? `<div class="icons-table"><span>folders</span>\n${foldersTable}</div>\n`
          : ''
      }
      ${
        theme.hasFiles
          ? `<div class="icons-table"><span>files</span>\n${filesTable}</div>`
          : ''
      }
    </section>
  `;
};

const saveScreenshot = async (
  fileName: string,
  filePath: string,
  content: string
) => {
  writeFileSync(filePath, content);

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

lucodearPreview();
