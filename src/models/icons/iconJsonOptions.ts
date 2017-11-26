export interface IconJsonOptions {
    folderTheme?: string;
    folderColor?: string;
    activatedPack?: string;
    hidesExplorerArrows?: boolean;
    fileAssociations?: IconAssociations;
    folderAssociations?: IconAssociations;
    languageAssociations?: IconAssociations;
}

export interface IconAssociations {
    [pattern: string]: string;
}
