import { lucodearFileIcons, lucodearFolderIcons } from '../../lucodear/icons';
import { FolderTheme } from '../../models';
import { fileIcons } from './../../icons/fileIcons';
import { folderIcons } from './../../icons';
import { languageIcons } from './../../icons/languageIcons';
import { generatePreview } from './preview';

const filterDuplicates = <T>(icons: T[]) => {
  return [...new Set(icons)];
};

type Icon = { name: string; subpath?: string };

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

const getFiles = (icons: Icon[]) => {
  return filterDuplicates(icons).map((i) => ({
    iconName: i.name,
    label: i.name,
    subpath: i.subpath,
  }));
};

const basicFileIcons = getFiles(
  fileIcons.icons
    .map((i) => ({ name: i.name, subpath: (i as any).subpath } as Icon))
    .concat(languageIcons.map((i) => ({ name: i.icon.name } as Icon)))
);
const folderThemes = getFolders(folderIcons);
const lucodearFolders = getFolders([lucodearFolderIcons]);
const lucodearFiles = getFiles(
  lucodearFileIcons.icons.map((i) => ({
    name: i.name,
    subpath: (i as any).subpath,
  }))
);

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
