import { FolderIcon, FolderTheme } from './index';
import { DefaultIcon } from '../index';

export interface FolderIcons {
    /**
     * Define the default icon for folders.
     */
    defaultIcon: DefaultIcon;

    /**
     * Defines the icon for root folders.
     */
    rootFolder?: DefaultIcon;

    /**
     * Defines folder icons for specific folder names.
     */
    icons?: FolderIcon[];

    /**
     * Defines the folder themes.
     */
    themes?: FolderTheme[];
}
