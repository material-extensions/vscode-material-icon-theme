import * as vscode from 'vscode';
import { activateIconTheme } from "./activate";
import { toggleAngularIcons } from "./angular";
import { toggleFolderIcons } from "./folders";
import { restoreDefaultConfig } from "./config";

// Activate theme
const activateThemeCommand = vscode.commands.registerCommand('material-icon-theme.activateIcons', () => {
    activateIconTheme();
});

// Angular
const toggleAngularIconsCommand = vscode.commands.registerCommand('material-icon-theme.toggleAngularIcons', () => {
    toggleAngularIcons();
});

// Folders
const toggleFolderIconsCommand = vscode.commands.registerCommand('material-icon-theme.toggleFolderIcons', () => {
    toggleFolderIcons();
});

// Config
const restoreDefaultConfigCommand = vscode.commands.registerCommand('material-icon-theme.restoreDefaultConfig', () => {
    restoreDefaultConfig();
});

export const commands = [
    activateThemeCommand,
    toggleAngularIconsCommand,
    toggleFolderIconsCommand,
    restoreDefaultConfigCommand
];