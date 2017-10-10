import { IconGroup } from '../index';

export interface FolderIcon {
    /**
     * Name of the icon, e.g. 'src'
     */
    name: string;

    /**
     * Define the folder names that should apply the icon.
     * E.g. ['src', 'source']
     */
    folderNames: string[];

    /**
     * Define if there is a light icon available.
     */
    light?: boolean;

    /**
     * Define if there is a high contrast icon available.
     */
    highContrast?: boolean;

    /**
     * Define if the icon should be disabled.
     */
    disabled?: boolean;

    /**
     * Defines a group to which this icon belongs. A group can be toggled and all icons inside this group can be enabled or disabled together.
     */
    group?: IconGroup;
}
