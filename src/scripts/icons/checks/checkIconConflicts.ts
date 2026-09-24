import { fileIcons, folderIcons, languageIcons } from '../../../core';
import { green, red } from '../../helpers/painter';

interface IconAssignment {
  name: string;
  definitions: string[];
  enabledFor?: string[];
}

/**
 * Detects conflicts (duplicate assignments) in a list of icon assignments.
 * An assignment is considered a conflict if the same definition is used by
 * multiple icons, unless the icon has `enabledFor` set (icon pack override).
 */
export function findConflicts(
  assignments: IconAssignment[]
): Record<string, string[]> {
  const seen: Record<string, string> = {};
  const conflicts: Record<string, string[]> = {};

  for (const { name, definitions, enabledFor } of assignments) {
    for (const definition of definitions.map((d) => d.toLowerCase())) {
      if (!seen[definition] || (enabledFor && enabledFor.length > 0)) {
        seen[definition] = name;
      } else {
        if (!conflicts[definition]) {
          conflicts[definition] = [seen[definition], name];
        } else {
          conflicts[definition].push(name);
        }
      }
    }
  }

  return conflicts;
}

export const check = async () => {
  const allConflicts = {
    fileExtensions: findConflicts(
      fileIcons.icons
        .filter((icon) => icon.fileExtensions)
        .map((icon) => ({
          name: icon.name,
          definitions: icon.fileExtensions ?? [],
          enabledFor: icon.enabledFor,
        }))
    ),
    fileNames: findConflicts(
      fileIcons.icons
        .filter((icon) => icon.fileNames)
        .map((icon) => ({
          name: icon.name,
          definitions: icon.fileNames ?? [],
          enabledFor: icon.enabledFor,
        }))
    ),
    folderNames: findConflicts(
      folderIcons
        .filter((theme) => theme.icons)
        .flatMap((theme) =>
          (theme.icons ?? []).map((icon) => ({
            name: icon.name,
            definitions: [
              ...(icon.folderNames ?? []),
              ...(icon.rootFolderNames ?? []),
            ],
            enabledFor: icon.enabledFor,
          }))
        )
    ),
    languageIds: findConflicts(
      languageIcons.map((icon) => ({
        name: icon.name,
        definitions: icon.ids,
      }))
    ),
  };

  const totalConflicts = [
    ...Object.keys(allConflicts.fileExtensions),
    ...Object.keys(allConflicts.fileNames),
    ...Object.keys(allConflicts.folderNames),
    ...Object.keys(allConflicts.languageIds),
  ].length;

  if (totalConflicts > 0) {
    console.log('> Material Icon Theme:', red('Icon conflicts:'));
    console.log(red('--------------------------------------'));
    printErrorMessage(allConflicts.fileExtensions, 'fileExtension');
    printErrorMessage(allConflicts.fileNames, 'fileName');
    printErrorMessage(allConflicts.folderNames, 'folderName');
    printErrorMessage(allConflicts.languageIds, 'languageId');
    console.log('\n' + red('Please check the wrong icon configurations!\n'));
    process.exit(1);
  } else {
    console.log(
      '> Material Icon Theme:',
      green('Passed icon conflict checks!')
    );
  }
};

const printErrorMessage = (
  icons: Record<string, string[]>,
  definitionType: string
) => {
  for (const [key, conflictIcons] of Object.entries(icons)) {
    console.log(
      red(
        `For ${definitionType} "${key}" are ${
          conflictIcons.length
        } icons defined: [${conflictIcons.join(', ')}]`
      )
    );
  }
};
