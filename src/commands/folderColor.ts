import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as i18n from './../i18n';
import { getDefaultIconOptions, validateHEXColorCode } from '../icons';

interface FolderColor {
    label: string;
    hex: string;
}

const iconPalette: FolderColor[] = [
    { label: 'Blue', hex: '#42a5f5' },
    { label: 'Dark Blue', hex: '#01579b' },
    { label: 'Green', hex: '#8bc34a' },
    { label: 'Grey (Default)', hex: '#90a4ae' },
    { label: 'Lime', hex: '#cDDc39' },
    { label: 'Orange', hex: '#ff9800' },
    { label: 'Pink', hex: '#e91e63' },
    { label: 'Purple', hex: '#9c27b0' },
    { label: 'Red', hex: '#e53935' },
    { label: 'Teal', hex: '#009688' },
    { label: 'Custom', hex: 'Custom HEX Code' },
];

/** Command to toggle the folder icons. */
export const changeFolderColor = () => {
    return checkFolderColorStatus()
        .then(showQuickPickItems)
        .then(handleQuickPickActions)
        .catch(err => console.log(err));
};

/** Show QuickPick items to select prefered color for the folder icons. */
const showQuickPickItems = (currentColor: string) => {
    const options = iconPalette.map((color): vscode.QuickPickItem => ({
        description: color.label,
        detail: color.hex.toLowerCase(),
        label: isColorActive(color, currentColor) ? '\u2714' : '\u25FB'
    }));

    return vscode.window.showQuickPick(options, {
        placeHolder: i18n.translate('folders.color'),
        ignoreFocusOut: false,
        matchOnDescription: true
    });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: vscode.QuickPickItem) => {
    if (!value || !value.description) return;
    if (value.description === 'Custom') {
        vscode.window.showInputBox({
            placeHolder: i18n.translate('folders.hexCode'),
            ignoreFocusOut: true,
            validateInput: validateColorInput
        }).then(value => setColorConfig(value));
    } else {
        return setColorConfig(value.detail);
    }
};

const validateColorInput = (colorInput: string) => {
    if (!validateHEXColorCode(colorInput)) {
        return i18n.translate('folders.wrongHexCode');
    }
    return null;
};

/** Check status of the folder color */
export const checkFolderColorStatus = (): Promise<string> => {
    const defaultOptions = getDefaultIconOptions();
    return helpers.getMaterialIconsJSON().then((config) =>
        config.options.folderColor === undefined ?
            defaultOptions.folderColor : config.options.folderColor);
};

const setColorConfig = (value: string) => {
    return helpers.setThemeConfig('folders.color', value.toLowerCase(), true);
};

const isColorActive = (color: FolderColor, currentColor: string): boolean => {
    if (color.label === 'Custom') {
        return !iconPalette.some(c => c.hex.toLowerCase() === currentColor.toLowerCase());
    }
    return color.hex.toLowerCase() === currentColor.toLowerCase();
};
