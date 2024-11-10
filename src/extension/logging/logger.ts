import { EventEmitter } from 'node:events';
import { type OutputChannel, window } from 'vscode';
import {
  type LogLevel,
  createLoggingObserver,
  extensionName,
  toTitleCase,
} from '../../core';
import { getThemeConfig } from '../shared/config';

let eventEmitter: EventEmitter | undefined;

/**
 * Observe log events and write them to the output channel.
 */
export const observeLogs = () => {
  const logLevel = getThemeConfig<LogLevel>('logLevel') ?? 'info';
  const isLoggingEnabled = getThemeConfig<boolean>('enableLogging') ?? false;

  let outputChannel: OutputChannel | undefined;

  if (isLoggingEnabled) {
    // Create the output channel only if logging is enabled
    outputChannel = window.createOutputChannel(
      toTitleCase(extensionName.replaceAll('-', ' '))
    );
  }

  eventEmitter = createLoggingObserver(logLevel, (event) => {
    if (outputChannel) {
      outputChannel.appendLine(event.message);
    } else {
      console.log(event.message);
    }
  });
};

export const disableLogObserver = () => {
  if (eventEmitter) {
    eventEmitter.removeAllListeners();
  }
};
