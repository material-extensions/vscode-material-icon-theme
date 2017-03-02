'use strict';

import * as vscode from 'vscode';
import * as i18n from "./i18n";
import * as commands from './commands';
import { showStartMessages } from "./messages/start";

/** If the icons theme gets activated by starting the editor this function will be executed. */
export const activate = (context: vscode.ExtensionContext) => {
    // show start messages after the translations are initialized
    i18n.initTranslations().then(() => {
        showStartMessages();
    }).catch(err => console.log(err));

    // load the commands
    context.subscriptions.push(
        ...commands.commands
    );
};

/** This method is called when your extension is deactivated */
export const deactivate = () => {
};