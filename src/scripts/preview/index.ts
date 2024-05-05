import { fileIcons } from './../../icons/fileIcons';
import { folderIcons } from './../../icons/folderIcons';
import { languageIcons } from './../../icons/languageIcons';
import { generatePreview } from './preview';

const filterDuplicates = (icons: string[]) => {
  return [...new Set(icons)];
};

const basicFileIcons = filterDuplicates(
  fileIcons.icons
    .map((i) => `${i.name}${i.clone ? '.clone' : ''}`)
    // merge language icons
    .concat(languageIcons.map((i) => i.icon.name))
).map((i) => ({ iconName: i, label: i.replace('.clone', '') }));

const folderThemes = filterDuplicates(
  folderIcons
    .map((theme) => {
      const folders = [];
      if (theme.icons && theme.icons.length > 0) {
        folders.push(
          ...theme.icons.map((i) => `${i.name}${i.clone ? '.clone' : ''}`)
        );
      }
      return [...folders];
    })
    .reduce((a, b) => a.concat(b))
).map((i) => ({
  iconName: i,
  label: i.replace('folder-', '').replace('.clone', ''),
}));

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
