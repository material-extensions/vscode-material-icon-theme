import { IconJsonOptions } from './';

export class IconConfiguration {
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
  iconDefinitions?: Record<string, any>;
  light?: IconConfiguration;
  highContrast?: IconConfiguration;
  options?: IconJsonOptions;
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
    this.options = {};
  }
}
