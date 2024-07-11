'use strict';

import { initTranslations } from '@core';
import { type ExtensionContext, env, workspace } from 'vscode';
import { detectConfigChanges } from '../tools/changeDetection';
import { registered } from '../tools/registered';

/**
 * This method is called when the extension is activated.
 * It initializes the core functionality of the extension.
 */
export const activate = async (context: ExtensionContext) => {
  try {
    await initTranslations(env.language);

    // Subscribe to the extension commands
    context.subscriptions.push(...registered);

    // Initially trigger the config change detection
    detectConfigChanges();

    // Observe changes in the config
    workspace.onDidChangeConfiguration(detectConfigChanges);

    // Observe if the window got focused to trigger config changes
    // codeWindow.onDidChangeWindowState((state) => {
    //   if (state.focused) {
    //     detectConfigChanges();
    //   }
    // });
  } catch (error) {
    console.error(error);
  }
};

/** This method is called when the extension is deactivated */
export const deactivate = () => {};
