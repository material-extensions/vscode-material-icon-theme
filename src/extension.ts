'use strict';

import { ExtensionContext, window as codeWindow, workspace } from 'vscode';
import { registered } from './commands';
import { detectConfigChanges } from './helpers/changeDetection';
import { initTranslations } from './i18n';

/**
 * This method is called when the extension is activated.
 * It initializes the core functionality of the extension.
 */
export const activate = async (context: ExtensionContext) => {
  try {
    await initTranslations();

    // Subscribe to the extension commands
    context.subscriptions.push(...registered);

    // Initially trigger the config change detection
    detectConfigChanges();

    // Observe changes in the config
    workspace.onDidChangeConfiguration(detectConfigChanges);

    // Observe if the window got focused to trigger config changes
    codeWindow.onDidChangeWindowState((state) => {
      if (state.focused) {
        detectConfigChanges();
      }
    });
  } catch (error) {
    console.error(error);
  }
};

/** This method is called when the extension is deactivated */
export const deactivate = () => {};
