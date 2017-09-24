import { FolderIcon } from './index';

export interface FolderTheme {
    /**
     * Name of the theme
     */
    name: string;

    /**
     * Define the default icon for folders in a theme.
     */
    default: string;

    /**
     * Defines folder icons for specific folder names.
     */
    // types?: FolderIcon[];

    /**
     * Defines if the theme is enabled or not. It is disabled by default.
     */
    enabled?: boolean;
}
