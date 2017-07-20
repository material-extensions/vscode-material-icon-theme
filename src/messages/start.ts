import * as helpers from './../helpers';
import * as cmp from 'semver-compare';
import { showUpdateMessage } from "./update";
import { showWelcomeMessage } from "./welcome";
import { updateVersionInUserDataSettings, initUserDataSettings } from "../helpers/versioning";

/** Initialization of the icons every time the theme get activated */
export const showStartMessages = () => {
    // if the theme has been used before
    helpers.getUserDataSettings().then((settings: any) => {
        // if the theme has been updated show update message
        if (cmp(settings.version, helpers.getCurrentExtensionVersion()) === -1) {
            showUpdateMessage();
            updateVersionInUserDataSettings().catch((err) => {
                console.log(err);
            });
        }
    }).catch(() => {
        // no config but old version was already installed
        if (helpers.isThemeConfigured() || helpers.isThemeConfigured(true)) {
            showUpdateMessage();
        }
        // no config and the theme has never been used before
        else {
            showWelcomeMessage();
        }

        // create a config file in the user data folder
        initUserDataSettings().catch((err) => console.log(err));
    });
};