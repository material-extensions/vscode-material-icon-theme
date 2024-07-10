import { type Config } from '.';
import { padWithDefaultConfig } from '../icons/generator/config/defaultConfig';

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
  iconDefinitions?: Record<string, any>;
  light?: Omit<Manifest, 'config'>;
  highContrast?: Omit<Manifest, 'config'>;
  config: Config;
  hidesExplorerArrows?: boolean;

  constructor(config?: Partial<Config>) {
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
    this.config = padWithDefaultConfig(config);
  }
}
