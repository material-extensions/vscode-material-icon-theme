import { IconJsonOptions } from './index';

export class IconConfiguration {
    file?: string;
    folder?: string;
    folderExpanded?: string;
    folderNames?: { [s: string]: string; };
    folderNamesExpanded?: { [s: string]: string; };
    rootFolder?: string;
    rootFolderExpanded?: string;
    fileExtensions?: { [s: string]: string; };
    fileNames?: { [s: string]: string; };
    languageIds?: { [s: string]: string; };
    iconDefinitions?: { [s: string]: any; };
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
            fileNames: {}
        };
        this.highContrast = {
            fileExtensions: {},
            fileNames: {}
        };
        this.options = {};
    }
}
