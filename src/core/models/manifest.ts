import type { RecursivePartial } from '../types/recursivePartial';
import type { Config } from './icons/config';

/**
 * Configuration for the manifest. It contains the configuration which is used to generate the manifest.
 */
export type ManifestConfig = RecursivePartial<
  Pick<Config, 'activeIconPack' | 'hidesExplorerArrows' | 'languages'> & {
    files: Pick<Config['files'], 'associations'>;
  } & {
    folders: Pick<Config['folders'], 'associations' | 'theme'>;
  }
>;

export type Manifest = {
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
  iconDefinitions?: Record<string, { iconPath: string }>;
  light?: Manifest;
  highContrast?: Manifest;
  hidesExplorerArrows?: boolean;
};

export const createEmptyManifest = (): Manifest => ({
  iconDefinitions: {},
  folderNames: {},
  folderNamesExpanded: {},
  fileExtensions: {},
  fileNames: {},
  languageIds: {},
  light: {
    fileExtensions: {},
    fileNames: {},
  },
  highContrast: {
    fileExtensions: {},
    fileNames: {},
  },
});
