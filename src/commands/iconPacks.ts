import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as path from 'path';
import * as fs from 'fs';
import * as i18n from './../i18n';
import * as reload from './../messages/reload';
import { IconConfiguration, IconPack } from '../models/index';

/** Command to toggle the Angular icons. */
export const toggleIconPacks = () => {
    return getActiveIconPack()
        .then((pack) => showQuickPickItems(pack)
            .then((value) => handleQuickPickActions(value, pack)));
};

/** Get all packs that can be used in this icon theme. */
export const getAllIconPacks = () => {
    const packs: string[] = [];
    for (let item in IconPack) {
        if (isNaN(Number(item))) {
            packs.push(item.toLowerCase());
        }
    }
    return packs;
};

/** Show QuickPick items to select prefered configuration for the folder icons. */
const showQuickPickItems = (activePack: string) => {
    const packs = getAllIconPacks().sort();
    const options = packs.map((pack): vscode.QuickPickItem => {
        return {
            description: helpers.capitalizeFirstLetter(pack),
            detail: i18n.translate(`iconPacks.toggleIcons`, helpers.capitalizeFirstLetter(pack)),
            label: isPackActive(activePack, pack) ? '\u2714' : '\u25FB'
        };
    });

    return vscode.window.showQuickPick(options, {
        placeHolder: i18n.translate('iconPacks.selectPack'),
        ignoreFocusOut: false,
        matchOnDescription: true
    });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: vscode.QuickPickItem, activePack: string) => {
    if (!value || !value.description) return;
    helpers.setThemeConfig('activeIconPack', value.description.toLowerCase(), true);
    // return showSpecificQuickPickItems(value.description, activePacks).then((decision: vscode.QuickPickItem) => {
    //     handleSpecificQuickPickActions(decision, value.description);
    // });
};

/** Show quick pick to choose if the pack should be enabled or disabled. */
// export const showSpecificQuickPickItems = (pack: string, activePacks: string[]) => {
//     const on: vscode.QuickPickItem = {
//         description: i18n.translate('toggleSwitch.on'),
//         detail: i18n.translate(`iconPacks.enableIcons`, helpers.capitalizeFirstLetter(pack)),
//         label: isPackActive(activePacks, pack) ? '\u2714' : '\u25FB'
//     };
//     const off: vscode.QuickPickItem = {
//         description: i18n.translate('toggleSwitch.off'),
//         detail: i18n.translate(`iconPacks.disableIcons`, helpers.capitalizeFirstLetter(pack)),
//         label: !isPackActive(activePacks, pack) ? '\u2714' : '\u25FB'
//     };
//     return vscode.window.showQuickPick(
//         [on, off], {
//             placeHolder: i18n.translate('iconPacks.selectPack'),
//             ignoreFocusOut: false,
//             matchOnDescription: true
//         });
// };

/** Handle the actions from the QuickPick. */
// const handleSpecificQuickPickActions = (value: vscode.QuickPickItem, pack: string) => {
//     if (!value || !value.description) return;
//     switch (value.description) {
//         case i18n.translate('toggleSwitch.on'): {
//             let activatedPacks = <string[]>helpers.getThemeConfig('activeIconPacks').globalValue || [];
//             activatedPacks = [...new Set([...activatedPacks.map(a => a.toLowerCase()), pack.toLowerCase()])];
//             helpers.setThemeConfig('activeIconPacks', activatedPacks, true);
//             break;
//         }
//         case i18n.translate('toggleSwitch.off'): {
//             let activatedPacks = <string[]>helpers.getThemeConfig('activeIconPacks').globalValue || [];
//             activatedPacks = activatedPacks.filter(g => g.toLowerCase() !== pack.toLowerCase());
//             helpers.setThemeConfig('activeIconPacks', activatedPacks, true);
//             break;
//         }
//         default:
//             break;
//     }
// };

const getActiveIconPack = (): Promise<string> => {
    return helpers.getMaterialIconsJSON().then((config) => config.options.activatedPack);
};

const isPackActive = (activePack: string, pack: string) => {
    return activePack.toLowerCase() === pack.toLowerCase();
};
