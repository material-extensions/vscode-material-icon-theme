import { ThemeStatus } from '../helpers/versioning';
import { showUpdateMessage } from './update';
import { showWelcomeMessage } from './welcome';

/** Initialization of the icons every time the theme get activated */
export const showStartMessages = (status: ThemeStatus) => {
    if (status === ThemeStatus.updated) {
        showUpdateMessage();
    }
    else if (status === ThemeStatus.neverUsedBefore) {
        showWelcomeMessage();
    }
};
