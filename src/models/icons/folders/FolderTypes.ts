import { FolderIcon, FolderTheme } from './index';

export interface FolderTypes {
    /**
     * Define the default icon for folders.
     */
    default: string;

    /**
     * Defines the icon for root folders.
     */
    rootFolder?: string;

    /**
     * Defines folder icons for specific folder names.
     */
    types?: FolderIcon[];

    /**
     * Defines the folder themes.
     */
    themes?: FolderTheme[];
}