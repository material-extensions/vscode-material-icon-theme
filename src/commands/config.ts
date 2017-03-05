import { enableAngularIcons } from "./angular";
import * as reload from './../messages/reload';
import * as helpers from './../helpers';
import { enableFolderIcons } from "./folders";

export const restoreDefaultConfig = () => {
    restore().then(() => {
        reload.showConfirmToReloadMessage().then(result => {
            if (result) helpers.reload();
        });
    });
};

/** Restore all configurations to default. */
const restore = () => {
    // Angular
    return enableAngularIcons().then(() => {
        if (helpers.getThemeConfig('angular.iconsEnabled').workspaceValue === false)
            helpers.setThemeConfig('angular.iconsEnabled', true);
        else if (helpers.getThemeConfig('angular.iconsEnabled').globalValue === false)
            helpers.setThemeConfig('angular.iconsEnabled', true, true);
    }).then(() => {
        // Folders
        return enableFolderIcons().then(() => {
            if (helpers.getThemeConfig('folders.iconsEnabled').workspaceValue === false)
                helpers.setThemeConfig('folders.iconsEnabled', true);
            else if (helpers.getThemeConfig('folders.iconsEnabled').globalValue === false)
                helpers.setThemeConfig('folders.iconsEnabled', true, true);
        });
    });
};