import * as vscode from 'vscode';
import * as helpers from './../../helpers';
import * as path from 'path';
import * as fs from 'fs';
import * as i18n from './../../i18n';
import * as reload from './../../messages/reload';
import { IconConfiguration } from '../../models/IconConfiguration.interface';
import { FolderType } from './../../models/FolderType.enum';

/** Command to toggle the folder icons. */
export const toggleFolderIcons = () => {
    return checkFolderIconsStatus()
        .then(showQuickPickItems)
        .then(handleQuickPickActions)
        .catch(err => console.log(err));
};

/** Show QuickPick items to select prefered configuration for the folder icons. */
const showQuickPickItems = folderType => {
    const optionDefault: vscode.QuickPickItem = {
        description: i18n.translate('folders.specific.name'),
        detail: i18n.translate('folders.specific.description'),
        label: folderType === FolderType.Specific ? '\u2714' : '\u25FB'
    };
    const optionClassic: vscode.QuickPickItem = {
        description: i18n.translate('folders.classic.name'),
        detail: i18n.translate('folders.classic.description'),
        label: folderType === FolderType.Classic ? '\u2714' : '\u25FB'
    };
    const optionBlue: vscode.QuickPickItem = {
        description: i18n.translate('folders.blue.name'),
        detail: i18n.translate('folders.blue.description'),
        label: folderType === FolderType.Blue ? '\u2714' : '\u25FB'
    };
    const optionNone: vscode.QuickPickItem = {
        description: i18n.translate('folders.none.name'),
        detail: i18n.translate('folders.none.description'),
        label: folderType === FolderType.None ? '\u2714' : '\u25FB'
    };
    return vscode.window.showQuickPick(
        [optionDefault, optionClassic, optionBlue, optionNone], {
            placeHolder: i18n.translate('folders.toggleIcons'),
            ignoreFocusOut: false
        });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = value => {
    if (!value || !value.description) return;
    switch (value.description) {
        case i18n.translate('folders.specific.name'): {
            helpers.setThemeConfig('folders.icons', FolderType.Specific, true);
            break;
        }
        case i18n.translate('folders.classic.name'): {
            helpers.setThemeConfig('folders.icons', FolderType.Classic, true);
            break;
        }
        case i18n.translate('folders.blue.name'): {
            helpers.setThemeConfig('folders.icons', FolderType.Blue, true);
            break;
        }
        case i18n.translate('folders.none.name'): {
            helpers.setThemeConfig('folders.icons', FolderType.None, true);
            break;
        }
        default:
            break;
    }
};

/** Are the folder icons enabled? */
export const checkFolderIconsStatus = (): Promise<string> => {
    return helpers.getMaterialIconsJSON().then((config) => {
        if (config.folder === '' && config.folderExpanded === '') {
            return FolderType.None;
        } else if (config.folderNames && Object.keys(config.folderNames).length > 0) {
            return FolderType.Specific;
        } else if (config.folder === '_folder_blue') {
            return FolderType.Blue;
        } else {
            return FolderType.Classic;
        }
    });
};