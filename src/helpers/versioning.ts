import * as helpers from './index';

/** Store the latest version number in the user data settings. */
export const updateVersionInUserDataSettings = () => {
    const setting = {
        version: helpers.getCurrentExtensionVersion(),
    };
    return helpers.writeUserDataSettings(setting);
};

/** Initialize the user data settings. */
export const initUserDataSettings = () => {
    const setting = {
        name: 'material-icon-theme',
        version: helpers.getCurrentExtensionVersion()
    };
    return helpers.writeUserDataSettings(setting);
};