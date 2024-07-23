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

    // Initially trigger the config change detection
    await detectConfigChanges();

    // Observe changes in the config
    workspace.onDidChangeConfiguration(detectConfigChanges);

    logger.info('Extension activated!');
    logger.debug('Debug mode is enabled.');
  } catch (error) {
    logger.error(error);
  }
};

/** This method is called when the extension is deactivated */
export const deactivate = () => {
  disableLogObserver();
};
