export class Manifest {
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

  constructor() {
    this.iconDefinitions = {};
    this.folderNames = {};
    this.folderNamesExpanded = {};
    this.fileExtensions = {};
    this.fileNames = {};
    this.languageIds = {};
    this.light = {
      fileExtensions: {},
      fileNames: {},
    };
    this.highContrast = {
      fileExtensions: {},
      fileNames: {},
    };
  }
}
