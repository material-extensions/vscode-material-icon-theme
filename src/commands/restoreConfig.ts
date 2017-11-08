import * as helpers from './../helpers';
import { getDefaultIconOptions } from '../icons/index';

/** Restore all configurations to default. */
export const restoreDefaultConfig = () => {
    const defaultOptions = getDefaultIconOptions();
    helpers.setThemeConfig('activeIconPack', defaultOptions.activatedPack, true);
    helpers.setThemeConfig('folders.theme', defaultOptions.folderTheme, true);
    helpers.setThemeConfig('folders.color', defaultOptions.folderColor, true);
    helpers.setThemeConfig('hidesExplorerArrows', defaultOptions.hidesExplorerArrows, true);
    helpers.setThemeConfig('files.associations', defaultOptions.fileAssociations, true);
    helpers.setThemeConfig('folders.associations', defaultOptions.folderAssociations, true);
};
