import { FolderIcon } from './index';

export interface FolderTheme {
    /**
     * Name of the theme
     */
    name: string;

    /**
     * Define the default icon for folders in a theme.
     */
    defaultIcon: string;

    /**
     * Defines folder icons for specific folder names.
     */
    icons?: FolderIcon[];

    /**
     * Icon for root folders.
     */
    rootFolder?: string;

    /**
     * Defines if the theme is enabled or not. It is disabled by default.
     */
    enabled?: boolean;

    /**
     * Decide if the default folder icons for the folder names should be used.
     * Now the theme only defines the defaultIcon and the rootFolder icon.
     *
     * Default value: `false`
     */
    useDefaultIcons?: boolean;
}
