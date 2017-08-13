import * as helpers from './../helpers';
import { showUpdateMessage } from "./update";
import { showWelcomeMessage } from "./welcome";
import { ThemeStatus } from "../helpers/versioning";

/** Initialization of the icons every time the theme get activated */
export const showStartMessages = (themeStatus: Promise<ThemeStatus>) => {
    return themeStatus.then((status: ThemeStatus) => {
        if (status === ThemeStatus.updated) {
            showUpdateMessage();
        }
        else if (status === ThemeStatus.neverUsedBefore) {
            showWelcomeMessage();
        }
    });
};