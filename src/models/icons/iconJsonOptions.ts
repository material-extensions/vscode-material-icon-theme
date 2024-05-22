export interface IconJsonOptions {
  activeIconPack?: string;
  hidesExplorerArrows?: boolean;
  opacity?: number;
  saturation?: number;
  folders?: {
    theme?: string;
    color?: string;
    associations?: IconAssociations;
    customClones?: FolderIconClone[];
  };
  files?: {
    color?: string;
    associations?: IconAssociations;
    customClones?: FileIconClone[];
  };
  languages?: {
    associations?: IconAssociations;
  };
}

export interface IconAssociations {
  [pattern: string]: string;
}

export interface CustomClone {
  name: string;
  base: string;
  color: string;
  lightColor?: string;
}

export interface FileIconClone extends CustomClone {
  fileExtensions?: string[];
  fileNames?: string[];
}

export interface FolderIconClone extends CustomClone {
  folderNames: string[];
}
