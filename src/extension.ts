'use strict';

import * as vscode from 'vscode';
import * as commands from './commands';
import { detectConfigChanges } from './helpers/changeDetection';
import { checkThemeStatus } from './helpers/versioning';
import * as i18n from './i18n';
import { showStartMessages } from './messages/start';

/**
 * This method is called when the extension is activated.
 * It initializes the core functionality of the extension.
 */
export const activate = async (context: vscode.ExtensionContext) => {
    try {
        await i18n.initTranslations();
        const status = await checkThemeStatus(context.globalState);
        showStartMessages(status);

        // Subscribe to the extension commands
        context.subscriptions.push(...commands.registered);

        // Initially trigger the config change detection
        detectConfigChanges();

        // Observe changes in the config
        vscode.workspace.onDidChangeConfiguration(detectConfigChanges);
    } catch (error) {
        console.error(error);
    }
};

/** This method is called when the extension is deactivated */
export const deactivate = () => {
};
