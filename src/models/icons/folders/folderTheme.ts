import { DefaultIcon, FolderIcon } from '../index';

export interface FolderTheme {
  /**
   * Name of the theme
   */
  name: string;

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
}
