'use strict';

import { ExtensionContext } from 'vscode';
import { checkThemeStatus, versionKey } from '../helpers/versioning';
import { showStartMessages } from '../messages/start';

/**
 * This method is called when the extension is activated.
 * It initializes the core functionality of the extension.
 */
export const activate = async (context: ExtensionContext) => {
  try {
    context.globalState.setKeysForSync([versionKey]);
    const status = await checkThemeStatus(context.globalState);
    showStartMessages(status);

    // Subscribe to the extension commands
    context.subscriptions.push();
  } catch (error) {
    console.error(error);
  }
};

/** This method is called when the extension is deactivated */
export const deactivate = () => {};
