import * as helpers from './../helpers';

/** Restore all configurations to default. */
export const restoreDefaultConfig = () => {
    helpers.setThemeConfig('angular.iconsEnabled', true, true);
    helpers.setThemeConfig('folders.icons', 'specific', true);
};
