import * as helpers from './../helpers';
import * as cmp from 'semver-compare';
import { showUpdateMessage } from "./update";
import { showWelcomeMessage } from "./welcome";

/** Initialization of the icons every time the theme get activated */
export const showStartMessages = () => {
    // if the theme has been used before
    helpers.getUserDataSettings().then((settings: any) => {
        // if the theme has been updated show update message
        if (cmp(settings.version, helpers.getCurrentExtensionVersion()) === -1) {
            showUpdateMessage();

            // store the latest version number in the user data settings
            const setting = {
                version: helpers.getCurrentExtensionVersion(),
            };
            helpers.updateUserDataSettings(setting);
        }
    }).catch(() => {
        // if the theme has never been used before
        showWelcomeMessage();

        // store the latest version number in the user data settings
        const setting = {
            name: 'material-icon-theme',
            version: helpers.getCurrentExtensionVersion(),
        };
        helpers.updateUserDataSettings(setting);
    });
};