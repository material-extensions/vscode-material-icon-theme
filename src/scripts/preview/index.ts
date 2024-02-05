import { lucodearFileIcons } from '../../lucodear/icons/files';
import { lucodearFolderIcons } from '../../lucodear/icons/folders';
import { FolderTheme } from '../../models';
import { fileIcons } from './../../icons/fileIcons';
import { folderIcons } from './../../icons/folderIcons';
import { languageIcons } from './../../icons/languageIcons';
import { generatePreview } from './preview';

const filterDuplicates = (icons: string[]) => {
  return [...new Set(icons)];
};

const getFolders = (icons: FolderTheme[]) => {
  return filterDuplicates(
    icons
      .map((theme) => {
        const folders = [];
        if (theme.icons && theme.icons.length > 0) {
          folders.push(...theme.icons.map((i) => i.name));
        }
        return [...folders];
      })
      .reduce((a, b) => a.concat(b))
  ).map((i) => ({ iconName: i, label: i.replace('folder-', '') }));
};

const getFiles = (icons: string[]) => {
  return filterDuplicates(icons).map((i) => ({ iconName: i, label: i }));
};

const basicFileIcons = getFiles(
  fileIcons.icons
    .map((i) => i.name)
    .concat(languageIcons.map((i) => i.icon.name))
);
const folderThemes = getFolders(folderIcons);
const lucodearFolders = getFolders([lucodearFolderIcons]);
const lucodearFiles = getFiles(lucodearFileIcons.icons.map((i) => i.name));

generatePreview('fileIcons', basicFileIcons, 5, [
  'virtual',
  'powerpoint',
  'word',
  'credits',
]);
generatePreview('folderIcons', folderThemes, 5, [
  'folder-aurelia',
  'folder-phpmailer',
  'folder-syntax',
  'folder-ansible',
]);

// 🍭 lucodear

generatePreview(
  'lucodearFileIcons',
  lucodearFiles,
  5,
  [],
  './../../../icons-lucodear/files'
);
generatePreview(
  'lucodearFolderIcons',
  lucodearFolders,
  5,
  [],
  './../../../icons-lucodear/folders'
);
