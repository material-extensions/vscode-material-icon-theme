import { getDefaultIconOptions } from '../icons/index';
import * as helpers from './../helpers';

/** Restore all configurations to default. */
export const restoreDefaultConfig = () => {
    const defaultOptions = getDefaultIconOptions();
    helpers.setThemeConfig('activeIconPack', defaultOptions.activeIconPack, true);
    helpers.setThemeConfig('folders.theme', defaultOptions.folders.theme, true);
    helpers.setThemeConfig('folders.color', defaultOptions.folders.color, true);
    helpers.setThemeConfig('hidesExplorerArrows', defaultOptions.hidesExplorerArrows, true);
    helpers.setThemeConfig('files.associations', defaultOptions.files.associations, true);
    helpers.setThemeConfig('folders.associations', defaultOptions.folders.associations, true);
    helpers.setThemeConfig('languages.associations', defaultOptions.languages.associations, true);
};
