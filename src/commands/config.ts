import { enableAngularIcons } from "./angular";
import * as reload from './../messages/reload';
import * as helpers from './../helpers';
import { enableSpecificFolderIcons } from "./folders";

export const restoreDefaultConfig = () => {
    return restore().then(() => {
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
        return enableSpecificFolderIcons().then(() => {
            helpers.setThemeConfig('folders.icons', 'specific', true);
        });
    });
};