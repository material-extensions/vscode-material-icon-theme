import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ExtensionContext } from 'vscode';

const extMocks = vi.hoisted(() => ({
  onDidChangeConfigurationHandler: undefined as
    | ((e: unknown) => Promise<void>)
    | undefined,
  onDidChangeWindowStateHandler: undefined as
    | ((state: { focused: boolean }) => Promise<void>)
    | undefined,
  onDidChangeActiveTextEditorHandler: undefined as
    | ((editor: unknown) => Promise<void>)
    | undefined,
  onDidChangeWorkspaceFoldersHandler: undefined as
    | ((e: unknown) => Promise<void>)
    | undefined,
  watcherCreateHandler: undefined as (() => Promise<void>) | undefined,
  watcherChangeHandler: undefined as (() => Promise<void>) | undefined,
  watcherDeleteHandler: undefined as (() => Promise<void>) | undefined,
  createFileSystemWatcherSpy: vi.fn(),
  detectConfigChangesSpy: vi.fn(async () => {}),
}));

vi.mock('vscode', () => ({
  env: { language: 'en' },
  workspace: {
    onDidChangeConfiguration: (handler: (e: unknown) => Promise<void>) => {
      extMocks.onDidChangeConfigurationHandler = handler;
      return { dispose: vi.fn() };
    },
    onDidChangeWorkspaceFolders: (handler: (e: unknown) => Promise<void>) => {
      extMocks.onDidChangeWorkspaceFoldersHandler = handler;
      return { dispose: vi.fn() };
    },
    createFileSystemWatcher: (pattern: string) => {
      extMocks.createFileSystemWatcherSpy(pattern);
      return {
        dispose: vi.fn(),
        onDidCreate: (handler: () => Promise<void>) => {
          extMocks.watcherCreateHandler = handler;
          return { dispose: vi.fn() };
        },
        onDidChange: (handler: () => Promise<void>) => {
          extMocks.watcherChangeHandler = handler;
          return { dispose: vi.fn() };
        },
        onDidDelete: (handler: () => Promise<void>) => {
          extMocks.watcherDeleteHandler = handler;
          return { dispose: vi.fn() };
        },
      };
    },
  },
  window: {
    onDidChangeWindowState: (
      handler: (state: { focused: boolean }) => Promise<void>
    ) => {
      extMocks.onDidChangeWindowStateHandler = handler;
      return { dispose: vi.fn() };
    },
    onDidChangeActiveTextEditor: (
      handler: (editor: unknown) => Promise<void>
    ) => {
      extMocks.onDidChangeActiveTextEditorHandler = handler;
      return { dispose: vi.fn() };
    },
  },
}));

vi.mock('../../core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../core')>()),
  initTranslations: vi.fn(async () => {}),
}));

vi.mock('../logging/logger', () => ({
  observeLogs: vi.fn(),
  disableLogObserver: vi.fn(),
}));

vi.mock('../tools/changeDetection', () => ({
  detectConfigChanges: extMocks.detectConfigChangesSpy,
}));

vi.mock('../tools/registered', () => ({
  registered: [{ dispose: vi.fn() }],
}));

import { activate } from './extension';

describe('desktop extension activation', () => {
  let context: ExtensionContext;

  beforeEach(() => {
    vi.clearAllMocks();
    context = {
      subscriptions: [],
    } as unknown as ExtensionContext;
  });

  it('watches .vscode/icons.json, window focus, active editor, and workspace folders', async () => {
    await activate(context);

    expect(extMocks.detectConfigChangesSpy).toHaveBeenCalledTimes(1);
    expect(extMocks.createFileSystemWatcherSpy).toHaveBeenCalledWith(
      '**/.vscode/icons.json'
    );

    // Unfocused window state should not trigger refresh
    await extMocks.onDidChangeWindowStateHandler?.({ focused: false });
    expect(extMocks.detectConfigChangesSpy).toHaveBeenCalledTimes(1);

    // Focused window state triggers refresh
    await extMocks.onDidChangeWindowStateHandler?.({ focused: true });
    expect(extMocks.detectConfigChangesSpy).toHaveBeenCalledTimes(2);

    // .vscode/icons.json file events trigger refresh
    await extMocks.watcherCreateHandler?.();
    await extMocks.watcherChangeHandler?.();
    await extMocks.watcherDeleteHandler?.();
    expect(extMocks.detectConfigChangesSpy).toHaveBeenCalledTimes(5);

    // Active editor and workspace folder changes trigger refresh
    await extMocks.onDidChangeActiveTextEditorHandler?.({});
    await extMocks.onDidChangeWorkspaceFoldersHandler?.({});
    expect(extMocks.detectConfigChangesSpy).toHaveBeenCalledTimes(7);

    // Configuration change passes event through
    const configEvent = { affectsConfiguration: () => true };
    await extMocks.onDidChangeConfigurationHandler?.(configEvent);
    expect(extMocks.detectConfigChangesSpy).toHaveBeenLastCalledWith(
      configEvent,
      context
    );
  });
});
