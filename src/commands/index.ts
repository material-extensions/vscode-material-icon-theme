import * as vscode from 'vscode';
import { activateIconTheme } from './activate';
import { toggleFolderArrows } from './folderArrows';
import { changeFolderColor } from './folderColor';
import { changeFolderTheme } from './folders';
import { toggleIconPacks } from './iconPacks';
import { changeOpacity } from './opacity';
import { restoreDefaultConfig } from './restoreConfig';
import { toggleGrayscale } from './grayscale';
import { changeSaturation } from './saturation';

// Activate theme
const activateThemeCommand = vscode.commands.registerCommand('material-icon-theme.activateIcons', () => {
    activateIconTheme();
});

// Icon packs
const toggleIconPacksCommand = vscode.commands.registerCommand('material-icon-theme.toggleIconPacks', () => {
    toggleIconPacks();
});

// Folder themes
const changeFolderThemeCommand = vscode.commands.registerCommand('material-icon-theme.changeFolderTheme', () => {
    changeFolderTheme();
});

// Folder color
const toggleFolderColorCommand = vscode.commands.registerCommand('material-icon-theme.changeFolderColor', () => {
    changeFolderColor();
});

// Reset config
const restoreDefaultConfigCommand = vscode.commands.registerCommand('material-icon-theme.restoreDefaultConfig', () => {
    restoreDefaultConfig();
});

// Toggle the arrows near the folder icons
const hidesExplorerArrowsCommand = vscode.commands.registerCommand('material-icon-theme.hidesExplorerArrows', () => {
    toggleFolderArrows();
});

// Change the opacity of the icons
const changeOpacityCommand = vscode.commands.registerCommand('material-icon-theme.opacity', () => {
    changeOpacity();
});

// Toggle grayscale icons
const grayscaleCommand = vscode.commands.registerCommand('material-icon-theme.grayscale', () => {
    toggleGrayscale();
});

// Change the saturation of the icons
const changeSaturationCommand = vscode.commands.registerCommand('material-icon-theme.saturation', () => {
    changeSaturation();
});

export const commands = [
    activateThemeCommand,
    toggleIconPacksCommand,
    changeFolderThemeCommand,
    toggleFolderColorCommand,
    restoreDefaultConfigCommand,
    hidesExplorerArrowsCommand,
    changeOpacityCommand,
    grayscaleCommand,
    changeSaturationCommand
];
