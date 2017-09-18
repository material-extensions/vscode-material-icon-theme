import { FileIcon } from "./FileIcon";

export interface FileTypes {
    /**
     * Define the default icon for folders.
     */
    default: { icon: string; };

    /**
     * Defines all folder icons.
     */
    types: FileIcon[];
}