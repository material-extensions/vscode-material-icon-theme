import type { DefaultIcon } from '../defaultIcon';
import type { FolderIcon } from './folderIcon';

export type FolderTheme = {
  /**
   * Name of the theme
   */
  name: FolderThemeName;

  /**
   * Define the default icon for folders in a theme.
   */
  defaultIcon: DefaultIcon;

  /**
   * Icon for root folders.
   */
  rootFolder?: DefaultIcon;

  /**
   * Defines folder icons for specific folder names.
   */
  icons?: FolderIcon[];
};

export type FolderThemeName = 'specific' | 'classic' | 'none';
