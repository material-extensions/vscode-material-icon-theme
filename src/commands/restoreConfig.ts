import * as helpers from './../helpers';
import { getDefaultIconOptions } from '../icons/index';

/** Restore all configurations to default. */
export const restoreDefaultConfig = () => {
    const defaultOptions = getDefaultIconOptions();
    helpers.setThemeConfig('activeIconPacks', defaultOptions.activatedPacks, true);
    helpers.setThemeConfig('folders.icons', defaultOptions.folderTheme, true);
    helpers.setThemeConfig('hidesExplorerArrows', defaultOptions.hidesExplorerArrows, true);
};
