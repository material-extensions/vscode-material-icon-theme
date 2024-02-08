import {
  DefaultIcon,
  FileIcon,
  FolderIcon,
  FolderTheme,
  IconAssociations,
  IconJsonOptions,
} from '../models';

export interface LucodearOptions {
  enable?: boolean;
  ignoreLookupPaths?: string[];
  files?: {
    regexAssociations?: IconAssociations;
  };
  folders?: {
    regexAssociations?: IconAssociations;
  };
}

export interface ExtendedOptions extends IconJsonOptions {
  lucodear: LucodearOptions;
}

export type LucodearFileIcon = FileIcon & {
  theme?: string;
};

export interface LucodearFileIcons {
  defaultIcon?: DefaultIcon;
  icons: LucodearFileIcon[];
}

export interface LucodearFolderIcon extends FolderIcon {
  theme?: string;
}

export interface LucodearFolderTheme extends FolderTheme {
  icons: LucodearFolderIcon[];
}
