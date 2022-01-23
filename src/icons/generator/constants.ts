/**
 * Path where the icons are located.
 */
export const iconFolderPath: string = './../icons/';

/**
 * File name of the JSON file that will be generated to the out folder.
 */
export const iconJsonName: string = 'material-icons.json';

/**
 * File ending for opened folders.
 */
export const openedFolder: string = '-open';

/**
 * File ending for light icons.
 */
export const lightColorFileEnding: string = '_light';

/**
 * File ending for high contrast icons.
 */
export const highContrastColorFileEnding: string = '_highContrast';

/**
 * Pattern to match wildcards for custom file icon mappings.
 */
export const wildcardPattern = new RegExp(/^\*{1,2}\./);
