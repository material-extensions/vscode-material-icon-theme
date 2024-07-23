/**
 * Name of the VS Code extension.
 */
export const extensionName = 'material-icon-theme';

/**
 * Name of the extension publisher.
 */
export const extensionPublisher = 'PKief';

/**
 * Key to identify the log event.
 */
export const logEventKey = `${extensionName}-log-event`;

/**
 * Path where the icons are located.
 */
export const iconFolderPath = './../icons/';

/**
 * File name of the JSON file that will be generated to the out folder.
 */
export const manifestName = 'material-icons.json';

/**
 * File ending for opened folders.
 */
export const openedFolder = '-open';

/**
 * File ending for light icons.
 */
export const lightColorFileEnding = '_light';

/**
 * File ending for high contrast icons.
 */
export const highContrastColorFileEnding = '_highContrast';

/**
 * Pattern to match the file icon definition.
 */
export const cloneIconExtension = '.clone.svg';

/**
 * User Defined Clones subfolder
 */
export const clonesFolder = 'clones/';

/**
 * Pattern to match wildcards for custom file icon mappings.
 */
export const wildcardPattern = new RegExp(/^\*{1,2}\./);
