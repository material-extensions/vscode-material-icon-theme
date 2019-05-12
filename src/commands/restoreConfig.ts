import * as helpers from './../helpers';

/** Restore all configurations to default. */
export const restoreDefaultConfig = () => {
    helpers.setThemeConfig('activeIconPack', undefined, true);
    helpers.setThemeConfig('folders.theme', undefined, true);
    helpers.setThemeConfig('folders.color', undefined, true);
    helpers.setThemeConfig('hidesExplorerArrows', undefined, true);
    helpers.setThemeConfig('opacity', undefined, true);
    helpers.setThemeConfig('saturation', undefined, true);
    helpers.setThemeConfig('files.associations', undefined, true);
    helpers.setThemeConfig('folders.associations', undefined, true);
    helpers.setThemeConfig('languages.associations', undefined, true);
};
