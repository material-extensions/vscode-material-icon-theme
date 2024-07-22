export type Manifest = {
  file?: string;
  folder?: string;
  folderExpanded?: string;
  folderNames?: Record<string, string>;
  folderNamesExpanded?: Record<string, string>;
  rootFolder?: string;
  rootFolderExpanded?: string;
  fileExtensions?: Record<string, string>;
  fileNames?: Record<string, string>;
  languageIds?: Record<string, string>;
  iconDefinitions?: Record<string, { iconPath: string }>;
  light?: Manifest;
  highContrast?: Manifest;
  hidesExplorerArrows?: boolean;
};

export const createEmptyManifest = (): Manifest => ({
  iconDefinitions: {},
  folderNames: {},
  folderNamesExpanded: {},
  fileExtensions: {},
  fileNames: {},
  languageIds: {},
  light: {
    fileExtensions: {},
    fileNames: {},
  },
  highContrast: {
    fileExtensions: {},
    fileNames: {},
  },
});
