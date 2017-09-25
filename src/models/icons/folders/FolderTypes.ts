import { FolderIcon, FolderTheme } from './index';

export interface FolderIcons {
    /**
     * Define the default icon for folders.
     */
    defaultIcon: string;

    /**
     * Defines the icon for root folders.
     */
    rootFolder?: string;

    /**
     * Defines folder icons for specific folder names.
     */
    icons?: FolderIcon[];

    /**
     * Defines the folder themes.
     */
    themes?: FolderTheme[];
}
