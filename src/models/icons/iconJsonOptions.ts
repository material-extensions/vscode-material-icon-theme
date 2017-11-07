export interface IconJsonOptions {
    folderTheme?: string;
    folderColor?: string;
    activatedPack?: string;
    hidesExplorerArrows?: boolean;
    fileAssociations?: IconAssociations;
    folderAssociations?: IconAssociations;
}

export interface IconAssociations {
    [pattern: string]: string;
}
