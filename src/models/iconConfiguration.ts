export interface IconConfiguration {
    file?: string;
    folder?: string;
    folderExpanded?: string;
    folderNames?: { [s: string]: string; };
    rootFolder?: string;
    rootFolderExpanded?: string;
    fileExtensions?: { [s: string]: string; };
    fileNames?: { [s: string]: string; };
    languageIds?: { [s: string]: string; };
    iconDefinitions?: { [s: string]: IconDefinition; };
    light?: IconConfiguration;
    highContrast?: IconConfiguration;
}

interface IconDefinition {
    [definition: string]: {
        iconPath: string;
    };
}
