import { FolderIcon, FolderTheme } from "./index";

export interface FolderTypes {
    /**
     * Define the default icon for folders.
     */
    defaultIcon: string;

    /**
     * Defines folder icons for specific folder names.
     */
    types?: FolderIcon[];

    /**
     * Defines the folder themes.
     */
    themes?: FolderTheme[];
}