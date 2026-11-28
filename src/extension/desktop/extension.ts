'use strict';

import { type ExtensionContext, env, window, workspace } from 'vscode';
import { initTranslations, logger } from '../../core';
import { disableLogObserver, observeLogs } from '../logging/logger';
import {
  projectIconsConfigDir,
  projectIconsConfigFileName,
} from '../shared/projectConfig';
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
    await detectConfigChanges(undefined, context);

    const refreshProjectIcons = () => detectConfigChanges(undefined, context);

    // Observe changes in VS Code settings (user, workspace, and workspace folder)
    context.subscriptions.push(
      workspace.onDidChangeConfiguration(
        async (event) => await detectConfigChanges(event, context)
      )
    );

    // Observe changes to project-level .vscode/icons.json files
    const projectIconsWatcher = workspace.createFileSystemWatcher(
      `**/${projectIconsConfigDir}/${projectIconsConfigFileName}`
    );
    context.subscriptions.push(
      projectIconsWatcher,
      projectIconsWatcher.onDidCreate(refreshProjectIcons),
      projectIconsWatcher.onDidChange(refreshProjectIcons),
      projectIconsWatcher.onDidDelete(refreshProjectIcons)
    );

    // Re-sync manifest when switching between VS Code windows or projects
    context.subscriptions.push(
      window.onDidChangeWindowState(async (state) => {
        if (state.focused) {
          await refreshProjectIcons();
        }
      }),
      window.onDidChangeActiveTextEditor(refreshProjectIcons),
      workspace.onDidChangeWorkspaceFolders(refreshProjectIcons)
    );

    logger.info('Extension activated!');
  } catch (error) {
    logger.error(error);
  }
};

/** This method is called when the extension is deactivated */
export const deactivate = () => {
  disableLogObserver();
};
