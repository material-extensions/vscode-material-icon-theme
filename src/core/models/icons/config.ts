import type { LogLevel } from '../../logging/logger';
import type { FileIcon } from './files/fileIcon';
import type { FolderIcon } from './folders/folderIcon';
import type { FolderThemeName } from './folders/folderTheme';
import type { IconPackValue } from './iconPack';
import type { LanguageIcon } from './languages/languageIdentifier';

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
    customClones: LanguageIconClone[];
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

export type FileIconClone = CustomClone &
  Pick<FileIcon, 'fileExtensions' | 'fileNames'>;

export type LanguageIconClone = CustomClone & Pick<LanguageIcon, 'ids'>;

export type FolderIconClone = CustomClone & Pick<FolderIcon, 'folderNames'>;
