'use strict';

import * as vscode from 'vscode';
import * as i18n from './i18n';
import * as commands from './commands';
import { showStartMessages } from './messages/start';
import { configChangeDetection, watchForConfigChanges } from './helpers/change-detection';
import { checkThemeStatus } from './helpers/versioning';
import { generateIconManifest } from './icons/index';

/** If the icons theme gets activated by starting the editor this function will be executed. */
export const activate = (context: vscode.ExtensionContext) => {
    // show start messages after the translations are initialized
    i18n.initTranslations().then(() => {
        showStartMessages(checkThemeStatus(context.globalState));
    }).catch(err => console.log(err));

    // load the commands
    context.subscriptions.push(
        ...commands.commands
    );

    configChangeDetection();
    watchForConfigChanges();

    console.log(generateIconManifest());
};

/** This method is called when your extension is deactivated */
export const deactivate = () => {
};
