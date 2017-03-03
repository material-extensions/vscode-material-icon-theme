import * as helpers from './../helpers';
import * as vscode from 'vscode';
import { activateIconTheme } from "./activate";
import { enableAngularIcons, disableAngularIcons } from "./angular";
import { enableFolderIcons, disableFolderIcons, toggleFolderIcons } from "./folders";

// Activate theme
const activateThemeCommand = vscode.commands.registerCommand('extension.activateIcons', () => {
    activateIconTheme();
});

// Angular
const enableAngularIconsCommand = vscode.commands.registerCommand('extension.enableAngularIcons', () => {
    enableAngularIcons();
});
const disableAngularIconsCommand = vscode.commands.registerCommand('extension.disableAngularIcons', () => {
    disableAngularIcons();
});

// Folders
const toggleFolderIconsCommand = vscode.commands.registerCommand('extension.toggleFolderIcons', () => {
    toggleFolderIcons();
});

export const commands = [
    activateThemeCommand,
    enableAngularIconsCommand,
    disableAngularIconsCommand,
    toggleFolderIconsCommand
];