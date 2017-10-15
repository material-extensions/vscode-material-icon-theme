import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as path from 'path';
import * as fs from 'fs';
import * as i18n from './../i18n';
import * as reload from './../messages/reload';
import { IconConfiguration, IconGroup } from '../models/index';

/** Command to toggle the Angular icons. */
export const toggleIconGroups = () => {
    return getActiveIconGroups()
        .then((groups) => showQuickPickItems(groups)
            .then((value) => handleQuickPickActions(value, groups)));
};

/** Get all groups that can be used in this icon theme. */
export const getAllIconGroups = () => {
    const groups: string[] = [];
    for (let item in IconGroup) {
        if (isNaN(Number(item))) {
            groups.push(item.toLowerCase());
        }
    }
    return groups;
};

/** Show QuickPick items to select prefered configuration for the folder icons. */
const showQuickPickItems = (activeGroups: string[]) => {
    const groups = getAllIconGroups();
    const options = groups.map((group): vscode.QuickPickItem => {
        return {
            description: helpers.capitalizeFirstLetter(group),
            detail: i18n.instant(`iconGroups.toggleIcons`, helpers.capitalizeFirstLetter(group)),
            label: isGroupActive(activeGroups, group) ? '\u2714' : '\u25FB'
        };
    });

    return vscode.window.showQuickPick(options, {
        placeHolder: i18n.instant('iconGroups.selectGroup'),
        ignoreFocusOut: false
    });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: vscode.QuickPickItem, activeGroups: string[]) => {
    if (!value || !value.description) return;
    return showSpecificQuickPickItems(value.description, activeGroups).then((decision: vscode.QuickPickItem) => {
        handleSpecificQuickPickActions(decision, value.description);
    });
};

/** Show quick pick to choose if the group should be enabled or disabled. */
export const showSpecificQuickPickItems = (group: string, activeGroups: string[]) => {
    const on: vscode.QuickPickItem = {
        description: i18n.instant('toggleSwitch.on'),
        detail: i18n.instant(`iconGroups.enableIcons`, helpers.capitalizeFirstLetter(group)),
        label: isGroupActive(activeGroups, group) ? '\u2714' : '\u25FB'
    };
    const off: vscode.QuickPickItem = {
        description: i18n.instant('toggleSwitch.off'),
        detail: i18n.instant(`iconGroups.disableIcons`, helpers.capitalizeFirstLetter(group)),
        label: !isGroupActive(activeGroups, group) ? '\u2714' : '\u25FB'
    };
    return vscode.window.showQuickPick(
        [on, off], {
            placeHolder: i18n.instant('iconGroups.selectGroup'),
            ignoreFocusOut: false
        });
};

/** Handle the actions from the QuickPick. */
const handleSpecificQuickPickActions = (value: vscode.QuickPickItem, group: string) => {
    if (!value || !value.description) return;
    switch (value.description) {
        case i18n.instant('toggleSwitch.on'): {
            let activatedGroups = <string[]>helpers.getThemeConfig('activeIconGroups').globalValue || [];
            activatedGroups = [...activatedGroups, group.toLowerCase()];
            helpers.setThemeConfig('activeIconGroups', activatedGroups, true);
            break;
        }
        case i18n.instant('toggleSwitch.off'): {
            let activatedGroups = <string[]>helpers.getThemeConfig('activeIconGroups').globalValue || [];
            activatedGroups = activatedGroups.filter(g => g.toLowerCase() !== group.toLowerCase());
            helpers.setThemeConfig('activeIconGroups', activatedGroups, true);
            break;
        }
        default:
            break;
    }
};

const getActiveIconGroups = () => {
    return helpers.getMaterialIconsJSON().then((config) => config.options.activatedGroups);
};

const isGroupActive = (activeGroups: string[], group: string) => {
    return activeGroups.indexOf(group.toLowerCase()) > -1;
};
