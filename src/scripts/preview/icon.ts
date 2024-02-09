import { LucodearFolderIcon, LucodearFolderTheme } from '../../lucodear/model';
import { FolderTheme } from '../../models';

export type IconDefinition = {
  name: string;
  label?: string;
  theme?: string;
};

export const filterDuplicates = <T extends { name: string }>(icons: T[]) => {
  // duplicates have the same name
  return icons.filter((icon, index, self) => {
    return index === self.findIndex((i) => i.name === icon.name);
  });
};

export const getFolders = (icons: LucodearFolderTheme[] | FolderTheme[]) => {
  return filterDuplicates(
    icons
      .map((theme) => {
        const folders = [];
        if (theme.icons && theme.icons.length > 0) {
          folders.push(
            ...theme.icons.map((i) => ({
              name: i.name,
              theme: (i as LucodearFolderIcon).theme,
            }))
          );
        }
        return [...folders];
      })
      .reduce((a, b) => a.concat(b))
  ).map((i) => ({
    name: i.name,
    label: i.name.replace('folder-', ''),
    theme: i.theme,
  }));
};

export const getFiles = (icons: IconDefinition[]) => {
  return filterDuplicates(icons).map((i) => ({
    name: i.name,
    label: i.name.replace('file-', ''),
    theme: i.theme,
  }));
};

export type Theme = {
  name: string;
  hasFiles: boolean;
  hasFolders: boolean;
};

export function getThemes(
  folderIcons: { theme?: string }[],
  filesIcons: { theme?: string }[]
): Theme[] {
  const notUndefined = <T>(i: T | undefined): i is T => i !== undefined;

  const folderThemes: string[] = folderIcons
    .map((i) => i.theme)
    .filter(notUndefined);
  const fileThemes: string[] = filesIcons
    .map((i) => i.theme)
    .filter(notUndefined);

  const themes: Theme[] = [...new Set([...folderThemes, ...fileThemes])].map(
    (theme) => {
      return {
        name: theme,
        hasFiles: fileThemes.includes(theme),
        hasFolders: folderThemes.includes(theme),
      };
    }
  );

  return themes;
}
