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
            packs.push(IconPack[item].toLowerCase());
        }
    }
    return packs;
};

/** Show QuickPick items to select prefered configuration for the folder icons. */
const showQuickPickItems = (activePack: string) => {
    const packs = getAllIconPacks().sort();
    const options = packs.map((pack): vscode.QuickPickItem => {
        const packLabel = helpers.toTitleCase(pack.replace('_', ' + '));
        return {
            description: packLabel,
            detail: i18n.translate(`iconPacks.toggleIcons`, packLabel),
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
    helpers.setThemeConfig('activeIconPack', value.description.replace(' + ', '_').toLowerCase(), true);
};

const getActiveIconPack = (): Promise<string> => {
    return helpers.getMaterialIconsJSON().then((config) => config.options.activatedPack);
};

const isPackActive = (activePack: string, pack: string) => {
    return activePack.toLowerCase() === pack.toLowerCase();
};
