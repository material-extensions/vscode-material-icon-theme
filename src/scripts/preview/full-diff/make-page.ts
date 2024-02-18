import { blue, green } from '../../helpers/painter';
import os from 'os';
import fs from 'fs';
import { compile } from 'handlebars';
import path from 'path';
import {
  IconDefinition,
  Theme,
  getFiles,
  getFolders,
  getThemes,
} from '../icon';
import {
  lucodearFileIcons,
  lucodearFolderIcons,
} from '../../../lucodear/icons';

type SvgIcon = {
  name: string;
  localPath: string;
  remotePath?: string;
};

type LucodearTheme = {
  folders: SvgIcon[];
  files: SvgIcon[];
} & Theme;

export async function makePage(destination: string = './index.html') {
  console.log(`${blue('> 🍭 make-page')} generating full diffs page`);

  // get the list of converted icons from ./converted.txt (relative to this file)
  const convertedFileIcons: string[] = fs
    .readFileSync(__dirname + '/converted-file-icons.txt', 'utf-8')
    .split(os.EOL);

  const convertedFolderIcons: string[] = fs
    .readFileSync(__dirname + '/converted-folder-icons.txt', 'utf-8')
    .split(os.EOL);

  const fileIcons: SvgIcon[] = convertedFileIcons.map((icon) => ({
    name: icon,
    localPath: `./icons/${icon}.svg`,
    remotePath: `https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/${icon}.svg`,
  }));

  const folderIcons: SvgIcon[] = convertedFolderIcons.map((icon) => ({
    name: icon,
    localPath: `./icons/${icon}.svg`,
    remotePath: `https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/${icon}.svg`,
  }));

  const lucodearFolders = getFolders([lucodearFolderIcons]);
  const lucodearFiles = getFiles(lucodearFileIcons.icons);
  const themes = getThemes(lucodearFolders, lucodearFiles);

  const lucodearThemes = themes.map((theme): LucodearTheme => {
    const iconDefToSvgIcon = (iconDef: IconDefinition): SvgIcon => {
      return {
        name: iconDef.name,
        localPath: `./icons-lc/${theme.name}/${iconDef.name}.svg`,
      };
    };

    const themeFolderIcons: SvgIcon[] = lucodearFolders
      .filter((i) => i.theme === theme.name)
      .map(iconDefToSvgIcon);
    const themeFileIcons: SvgIcon[] = lucodearFiles
      .filter((i) => i.theme === theme.name)
      .map(iconDefToSvgIcon);

    return {
      ...theme,
      folders: themeFolderIcons,
      files: themeFileIcons,
    };
  });

  generateHtml(fileIcons, folderIcons, lucodearThemes, destination);
}

export const generateHtml = (
  fileIcons: SvgIcon[],
  folderIcons: SvgIcon[],
  lucodearThemes: LucodearTheme[],
  destination: string,
  iconSize: number = 16
) => {
  // get the template from ./template/diff-list.hbs as a string
  const diffListTemplate = fs.readFileSync(
    path.resolve(__dirname, './template/pp-diff-list.hbs'),
    'utf-8'
  );

  // compile the template
  const template = compile(diffListTemplate);

  // create a new file with the compiled template
  const file = template(
    {
      fileIcons: fileIcons,
      folderIcons: folderIcons,
      lucodearThemes,
      iconSize,
    },
    {
      helpers: {
        plusone: (value: number) => value + 1,
        hasFolderOrFiles: (theme: LucodearTheme) =>
          theme.hasFiles || theme.hasFolders,
      },
    }
  );

  // write the file to the disk
  fs.writeFileSync(destination, file);

  console.log(
    `${green('> 🍭 make-page')} Done :) page generated at ${green(destination)}`
  );
};
