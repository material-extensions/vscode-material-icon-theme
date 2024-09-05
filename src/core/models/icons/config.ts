import type { LogLevel } from '../../logging/logger';
import type { FolderThemeName } from './folders/folderTheme';
import type { IconPackValue } from './iconPack';

export type Config = {
  activeIconPack: IconPackValue;
  hidesExplorerArrows: boolean;
  opacity: number;
  saturation: number;
  folders: {
    theme: FolderThemeName;
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
  enableLogging: boolean;
  logLevel: LogLevel;
};

export type IconAssociations = {
  [pattern: string]: string;
};

export type CustomClone = {
  name: string;
  base: string;
  color: string;
  lightColor?: string;
  activeForPacks?: IconPackValue[];
};

export type FileIconClone = CustomClone & {
  fileExtensions?: string[];
  fileNames?: string[];
};

export type FolderIconClone = CustomClone & {
  folderNames: string[];
};
