import { green, red } from '../../helpers/painter';
import { fileIcons, folderIcons, languageIcons } from './../../../icons';

/**
 * Store all icons that are wrong configured
 */
const allConflicts: {
  fileIcons: {
    fileExtensions: Record<string, string[]>;
    fileNames: Record<string, string[]>;
  };
  folderIcons: Record<string, string[]>;
  languageIcons: Record<string, string[]>;
} = {
  fileIcons: {
    fileExtensions: {},
    fileNames: {},
  },
  folderIcons: {},
  languageIcons: {},
};

export const check = () => {
  checkFolderIcons();
  checkFileIcons();
  checkLanguageIcons();

  handleErrors();
};

const checkFileIcons = () => {
  checkForConflictsInFileIcons('fileExtensions');
  checkForConflictsInFileIcons('fileNames');
};

const checkForConflictsInFileIcons = (
  fileIconDefinitionType: 'fileExtensions' | 'fileNames'
) => {
  const icons: Record<string, string> = {};
  fileIcons.icons.forEach((icon) => {
    if (!icon[fileIconDefinitionType]) return;
    (icon[fileIconDefinitionType] ?? [])
      .map((d) => d.toLowerCase())
      .forEach((definition) => {
        if (
          !icons[definition] ||
          (icon.enabledFor && icon.enabledFor.length > 0)
        ) {
          icons[definition] = icon.name;
        } else {
          if (!allConflicts.fileIcons[fileIconDefinitionType][definition]) {
            allConflicts.fileIcons[fileIconDefinitionType][definition] = [
              icons[definition],
              icon.name,
            ];
          } else {
            allConflicts.fileIcons[fileIconDefinitionType][definition].push(
              icon.name
            );
          }
        }
      });
  });
};

const checkFolderIcons = () => {
  folderIcons.forEach((theme) => {
    if (!theme.icons) return;
    const icons: Record<string, string> = {};
    theme.icons.forEach((icon) => {
      icon.folderNames
        .map((f) => f.toLowerCase())
        .forEach((folderName) => {
          if (
            !icons[folderName] ||
            (icon.enabledFor && icon.enabledFor.length > 0)
          ) {
            icons[folderName] = icon.name;
          } else {
            if (!allConflicts.folderIcons[folderName]) {
              allConflicts.folderIcons[folderName] = [
                icons[folderName],
                icon.name,
              ];
            } else {
              allConflicts.folderIcons[folderName].push(icon.name);
            }
          }
        });
    });
  });
};

const checkLanguageIcons = () => {
  const icons: Record<string, string> = {};
  languageIcons.forEach((langIcon) => {
    langIcon.ids
      .map((id) => id.toLowerCase())
      .forEach((id) => {
        if (!icons[id]) {
          icons[id] = langIcon.icon.name;
        } else {
          if (!allConflicts.languageIcons[id]) {
            allConflicts.languageIcons[id] = [icons[id], langIcon.icon.name];
          } else {
            allConflicts.languageIcons[id].push(langIcon.icon.name);
          }
        }
      });
  });
};

const handleErrors = () => {
  if (
    [
      ...Object.keys(allConflicts.fileIcons.fileExtensions),
      ...Object.keys(allConflicts.fileIcons.fileNames),
      ...Object.keys(allConflicts.folderIcons),
      ...Object.keys(allConflicts.languageIcons),
    ].length > 0
  ) {
    console.log('> Material Icon Theme:', red('Icon conflicts:'));
    console.log(red('--------------------------------------'));

    printErrorMessage(allConflicts.fileIcons.fileExtensions, 'fileExtension');
    printErrorMessage(allConflicts.fileIcons.fileNames, 'fileName');
    printErrorMessage(allConflicts.folderIcons, 'folderName');
    printErrorMessage(allConflicts.languageIcons, 'languageId');

    console.log('\n' + red('Please check the wrong icon configurations!\n'));
    process.exit(1);
  } else {
    console.log(
      '> Material Icon Theme:',
      green('Passed icon conflict checks!')
    );
  }
};

const printErrorMessage = (icons: any, definitionType: string) => {
  const keys = Object.keys(icons);
  keys.forEach((key) => {
    const conflictIcons = icons[key];
    console.log(
      red(
        `For ${definitionType} "${key}" are ${
          conflictIcons.length
        } icons defined: [${conflictIcons.join(', ')}]`
      )
    );
  });
};
