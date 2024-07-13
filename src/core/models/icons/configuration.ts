import type { IconPackValue } from './iconPack';

export type Config = {
  activeIconPack: IconPackValue;
  hidesExplorerArrows: boolean;
  opacity: number;
  saturation: number;
  folders: {
    theme: string;
    color: string;
    associations: IconAssociations;
    customClones: FolderIconClone[];
  };
  files: {
    color: string;
    associations: IconAssociations;
    customClones: FileIconClone[];
  };
  languages: {
    associations: IconAssociations;
  };
};

export type IconAssociations = {
  [pattern: string]: string;
};

export type CustomClone = {
  name: string;
  base: string;
  color: string;
  lightColor?: string;
};

export type FileIconClone = CustomClone & {
  fileExtensions?: string[];
  fileNames?: string[];
};

export type FolderIconClone = CustomClone & {
  folderNames: string[];
};
