import * as vscode from 'vscode';
import { activateIconTheme } from './activate';
import { toggleIconGroups } from './groups';
import { toggleFolderIcons } from './folders';
import { restoreDefaultConfig } from './restoreConfig';

// Activate theme
const activateThemeCommand = vscode.commands.registerCommand('material-icon-theme.activateIcons', () => {
    activateIconTheme();
});

// Icon groups
const toggleIconGroupsCommand = vscode.commands.registerCommand('material-icon-theme.toggleIconGroups', () => {
    toggleIconGroups();
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
    toggleIconGroupsCommand,
    toggleFolderIconsCommand,
    restoreDefaultConfigCommand
];
