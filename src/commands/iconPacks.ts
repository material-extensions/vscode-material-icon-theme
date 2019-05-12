import * as vscode from 'vscode';
import { IconPack } from '../models/index';
import * as helpers from './../helpers';
import * as i18n from './../i18n';

/** Command to toggle the icons packs */
export const toggleIconPacks = async () => {
    try {
        const activeIconPack = getActiveIconPack();
        const response = await showQuickPickItems(activeIconPack);
        handleQuickPickActions(response);
    } catch (error) {
        console.error(error);
    }
};

/** Show QuickPick items to select preferred configuration for the icon packs. */
const showQuickPickItems = (activePack: string) => {
    const packs = [...getAllIconPacks().sort(), 'none'];
    const options = packs.map((pack): vscode.QuickPickItem => {
        const packLabel = helpers.toTitleCase(pack.replace('_', ' + '));
        const active = isPackActive(activePack, pack);
        const iconPacksDeactivated = pack === 'none' && activePack === '';

        return {
            description: packLabel,
            detail: i18n.translate(`iconPacks.${pack === 'none' ? 'disabled' : 'description'}`, packLabel),
            label: iconPacksDeactivated ? '\u2714' : active ? '\u2714' : '\u25FB'
        };
    });

    return vscode.window.showQuickPick(options, {
        placeHolder: i18n.translate('iconPacks.selectPack'),
        ignoreFocusOut: false,
        matchOnDescription: true,
        matchOnDetail: true
    });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: vscode.QuickPickItem) => {
    if (!value || !value.description) return;
    const decision = value.description.replace(' + ', '_').toLowerCase();

    helpers.setThemeConfig('activeIconPack', decision === 'none' ? '' : decision, true);
};

const getActiveIconPack = (): string => {
    return helpers.getMaterialIconsJSON().options.activeIconPack;
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

const isPackActive = (activePack: string, pack: string) => {
    return activePack.toLowerCase() === pack.toLowerCase();
};
