import * as vscode from 'vscode';
import { activateIconTheme } from './activate';
import { toggleFolderArrows } from './folderArrows';
import { changeFolderColor } from './folderColor';
import { changeFolderTheme } from './folders';
import { toggleIconPacks } from './iconPacks';
import { changeOpacity } from './opacity';
import { restoreDefaultConfig } from './restoreConfig';

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

export const commands = [
    activateThemeCommand,
    toggleIconPacksCommand,
    changeFolderThemeCommand,
    toggleFolderColorCommand,
    restoreDefaultConfigCommand,
    hidesExplorerArrowsCommand,
    changeOpacityCommand
];
