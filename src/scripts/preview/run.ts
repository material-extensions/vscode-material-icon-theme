import { fileIcons } from '../../core/icons/fileIcons';
import { folderIcons } from '../../core/icons/folderIcons';
import { languageIcons } from '../../core/icons/languageIcons';
import { generatePreview } from './preview';

const filterDuplicates = (icons: string[]) => {
  return [...new Set(icons)];
};

const basicFileIcons = filterDuplicates(
  fileIcons.icons
    // remove icons that are clones
    .filter((i) => i.clone === undefined)
    .map((i) => i.name)
    // merge language icons
    .concat(languageIcons.map((i) => i.name))
).map((i) => ({ iconName: i, label: i }));

const folderThemes = filterDuplicates(
  folderIcons
    .map((theme) => {
      const folders = [];
      if (theme.icons && theme.icons.length > 0) {
        folders.push(
          ...theme.icons
            // remove icons that are clones
            .filter((i) => i.clone === undefined)
            .map((i) => i.name)
        );
      }
      return [...folders];
    })
    .reduce((a, b) => a.concat(b))
).map((i) => ({ iconName: i, label: i.replace('folder-', '') }));

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
