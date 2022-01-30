import { DefaultIcon } from '../defaultIcon';
import { FileIcon } from './index';

export type FileIcons = {
  /**
   * Define the default icon for folders.
   */
  defaultIcon: DefaultIcon;

  /**
   * Defines all folder icons.
   */
  icons: FileIcon[];
};
