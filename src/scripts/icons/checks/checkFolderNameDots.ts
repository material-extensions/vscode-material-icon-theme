import { folderIcons } from '../../../core';
import { green, red } from '../../helpers/painter';

interface DotViolation {
  iconName: string;
  folderName: string;
}

export function findDotPrefixedFolderNames(
  icons: { name: string; folderNames?: string[]; rootFolderNames?: string[] }[]
): DotViolation[] {
  const violations: DotViolation[] = [];

  for (const icon of icons) {
    const allNames = [
      ...(icon.folderNames ?? []),
      ...(icon.rootFolderNames ?? []),
    ];
    for (const name of allNames) {
      if (name.startsWith('.')) {
        violations.push({ iconName: icon.name, folderName: name });
      }
    }
  }

  return violations;
}

export const check = async () => {
  const allIcons = folderIcons.flatMap((theme) => theme.icons ?? []);
  const violations = findDotPrefixedFolderNames(allIcons);

  if (violations.length > 0) {
    console.log(
      '> Material Icon Theme:',
      red('Folder names must not start with a dot!')
    );
    console.log(
      red('  The folder generator automatically creates dot-prefixed variants.')
    );
    console.log(
      red('  Use the bare name instead (e.g. "cargo" instead of ".cargo").\n')
    );

    for (const { iconName, folderName } of violations) {
      console.log(
        red(
          `  Icon "${iconName}" has dot-prefixed folder name: "${folderName}"`
        )
      );
    }

    throw new Error(
      `Found ${violations.length} folder name(s) starting with a dot.`
    );
  } else {
    console.log(
      '> Material Icon Theme:',
      green('Passed folder name dot prefix checks!')
    );
  }
};
