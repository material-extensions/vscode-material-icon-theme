'use strict';

import * as vscode from 'vscode';
import * as i18n from './i18n';
import * as commands from './commands';
import { showStartMessages } from './messages/start';
import { detectConfigChanges, watchForConfigChanges } from './helpers/change-detection';
import { checkThemeStatus } from './helpers/versioning';

export const activate = (context: vscode.ExtensionContext) => {
    i18n.initTranslations().then(() => {
        showStartMessages(checkThemeStatus(context.globalState));
    }).catch(err => console.error(err));

    context.subscriptions.push(
        ...commands.commands
    );

    detectConfigChanges(context.globalState).catch(e => {
        console.error(e);
    });

    watchForConfigChanges(context.globalState);
};

export const deactivate = () => {
};
