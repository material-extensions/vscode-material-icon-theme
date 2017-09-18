import { FolderIcon } from "./FolderIcon";

export interface FolderTypes {
    /**
     * Define the default icon for folders.
     */
    default: { icon: string; };

    /**
     * Defines all folder icons.
     */
    types: FolderIcon[];
}