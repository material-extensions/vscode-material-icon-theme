import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as path from 'path';
import * as fs from 'fs';
import * as i18n from './../i18n';
import * as reload from './../messages/reload';
import { IconConfiguration } from '../models/index';

/** Command to toggle the Angular icons. */
export const toggleAngularIcons = () => {
    return checkAngularIconsStatus()
        .then(showQuickPickItems)
        .then(handleQuickPickActions)
        .catch(err => console.log(err));
};

/** Show QuickPick items to select prefered configuration for the folder icons. */
const showQuickPickItems = isEnabled => {
    const on: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.on'),
        detail: i18n.translate('angular.enableIcons'),
        label: isEnabled ? '\u2714' : '\u25FB'
    };
    const off: vscode.QuickPickItem = {
        description: i18n.translate('toggleSwitch.off'),
        detail: i18n.translate('angular.disableIcons'),
        label: !isEnabled ? '\u2714' : '\u25FB'
    };
    return vscode.window.showQuickPick(
        [on, off], {
            placeHolder: i18n.translate('angular.toggleIcons'),
            ignoreFocusOut: false
        });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = value => {
    if (!value || !value.description) return;
    switch (value.description) {
        case i18n.translate('toggleSwitch.on'): {
            helpers.setThemeConfig('angular.iconsEnabled', true, true);
            break;
        }
        case i18n.translate('toggleSwitch.off'): {
            helpers.setThemeConfig('angular.iconsEnabled', false, true);
            break;
        }
        default:
            break;
    }
};

/** Are the angular icons enabled? */
export const checkAngularIconsStatus = (): Promise<boolean> => {
    return helpers.getMaterialIconsJSON().then((config) => {
        if (config.fileExtensions['component.ts']) {
            return true;
        } else {
            return false;
        }
    });
};
