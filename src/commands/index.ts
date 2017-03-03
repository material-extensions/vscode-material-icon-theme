import * as helpers from './../helpers';
import * as vscode from 'vscode';
import { activateIconTheme } from "./activate";
import { toggleAngularIcons } from "./angular";
import { toggleFolderIcons } from "./folders";

// Activate theme
const activateThemeCommand = vscode.commands.registerCommand('extension.activateIcons', () => {
    activateIconTheme();
});

// Angular
const toggleAngularIconsCommand = vscode.commands.registerCommand('extension.toggleAngularIcons', () => {
    toggleAngularIcons();
});

// Folders
const toggleFolderIconsCommand = vscode.commands.registerCommand('extension.toggleFolderIcons', () => {
    toggleFolderIcons();
});

export const commands = [
    activateThemeCommand,
    toggleAngularIconsCommand,
    toggleFolderIconsCommand
];