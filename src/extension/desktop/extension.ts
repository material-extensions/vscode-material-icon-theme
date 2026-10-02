'use strict';

import { type ExtensionContext, env, workspace } from 'vscode';
import { initTranslations, logger } from '../../core';
import { disableLogObserver, observeLogs } from '../logging/logger';
import { detectConfigChanges } from '../tools/changeDetection';
import { registered } from '../tools/registered';

/**
 * This method is called when the extension is activated.
 * It initializes the core functionality of the extension.
 */
export const activate = async (context: ExtensionContext) => {
  try {
    observeLogs();

    await initTranslations(env.language);

    // Subscribe to the extension commands
    context.subscriptions.push(...registered);

    // Keep observing even if initial generation fails (e.g. a missing custom SVG).
    context.subscriptions.push(
      workspace.onDidChangeConfiguration((event) => {
        void detectConfigChanges(event, context).catch((error) =>
          logger.error(error)
        );
      })
    );

    // Initially trigger the config change detection
    await detectConfigChanges(undefined, context);

    logger.info('Extension activated!');
  } catch (error) {
    logger.error(error);
  }
};

/** This method is called when the extension is deactivated */
export const deactivate = () => {
  disableLogObserver();
};
