'use strict';

import * as vscode from 'vscode';
import * as commands from './commands';
import { detectConfigChanges } from './helpers/change-detection';
import { checkThemeStatus } from './helpers/versioning';
import * as i18n from './i18n';
import { showStartMessages } from './messages/start';

/**
 * This method is called when the extension is activated.
 * It initializes the core functionality of the extension.
 */
export const activate = (context: vscode.ExtensionContext) => {
    // Load the translations
    i18n.initTranslations().then(() => {
        showStartMessages(checkThemeStatus(context.globalState));
    }).catch(err => console.error(err));

    // Add commands to the editor
    context.subscriptions.push(...commands.commands);

    // Initially trigger the config change detection
    detectConfigChanges().catch(e => {
        console.error(e);
    });

    // Observe changes in the config
    vscode.workspace.onDidChangeConfiguration(detectConfigChanges);
};

/** This method is called when the extension is deactivated */
export const deactivate = () => {
};
