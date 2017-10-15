import * as vscode from 'vscode';
import { activateIconTheme } from './activate';
import { toggleIconPacks } from './iconPacks';
import { toggleFolderIcons } from './folders';
import { restoreDefaultConfig } from './restoreConfig';

// Activate theme
const activateThemeCommand = vscode.commands.registerCommand('material-icon-theme.activateIcons', () => {
    activateIconTheme();
});

// Icon packs
const toggleIconPacksCommand = vscode.commands.registerCommand('material-icon-theme.toggleIconPacks', () => {
    toggleIconPacks();
});

// Folders
const toggleFolderIconsCommand = vscode.commands.registerCommand('material-icon-theme.toggleFolderIcons', () => {
    toggleFolderIcons();
});

// Reset config
const restoreDefaultConfigCommand = vscode.commands.registerCommand('material-icon-theme.restoreDefaultConfig', () => {
    restoreDefaultConfig();
});

export const commands = [
    activateThemeCommand,
    toggleIconPacksCommand,
    toggleFolderIconsCommand,
    restoreDefaultConfigCommand
];
