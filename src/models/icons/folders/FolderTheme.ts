import { FolderIcon, FolderType, DefaultIcon } from '../index';

export interface FolderTheme {
    /**
     * Name of the theme
     */
    name: FolderType;

    /**
     * Define the default icon for folders in a theme.
     */
    defaultIcon: DefaultIcon;

    /**
     * Defines folder icons for specific folder names.
     */
    icons?: FolderIcon[];

    /**
     * Icon for root folders.
     */
    rootFolder?: DefaultIcon;

    /**
     * Decide if the default folder icons for the folder names should be used.
     * Now the theme only defines the defaultIcon and the rootFolder icon.
     *
     * Default value: `false`
     */
    useDefaultIcons?: boolean;
}
