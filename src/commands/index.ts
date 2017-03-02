import * as helpers from './../helpers';
import * as vscode from 'vscode';
import { activateIconTheme } from "./activate";
import { enableAngularIcons, disableAngularIcons } from "./angular";

const activateThemeCommand = vscode.commands.registerCommand('extension.activateIcons', () => {
    activateIconTheme();
});

const enableAngularIconsCommand = vscode.commands.registerCommand('extension.enableAngularIcons', () => {
    enableAngularIcons();
});

const disableAngularIconsCommand = vscode.commands.registerCommand('extension.disableAngularIcons', () => {
    disableAngularIcons();
});

export const commands = [
    activateThemeCommand,
    enableAngularIconsCommand,
    disableAngularIconsCommand,
];