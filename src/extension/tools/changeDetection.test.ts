import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ConfigurationChangeEvent, ExtensionContext } from 'vscode';
import { getDefaultConfig } from '../../core/generator/config/defaultConfig';

const mocks = vi.hoisted(() => ({
  generate: vi.fn(),
  isCurrent: vi.fn(),
  getConfig: vi.fn(),
  error: vi.fn(),
  onChange: vi.fn(),
}));

vi.mock('../../core', () => ({
  extensionName: 'material-icon-theme',
  manifestName: 'material-icons.json',
  resolvePath: (path: string) => path,
  generateIconSnapshot: mocks.generate,
  isIconSnapshotCurrent: mocks.isCurrent,
  logger: { error: mocks.error, info: vi.fn() },
  initTranslations: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('../shared/config', () => ({ getCurrentConfig: mocks.getConfig }));
vi.mock('../logging/logger', () => ({
  observeLogs: vi.fn(),
  disableLogObserver: vi.fn(),
}));
vi.mock('./registered', () => ({ registered: [] }));
vi.mock('vscode', () => ({
  env: { language: 'en' },
  workspace: { onDidChangeConfiguration: mocks.onChange },
}));

const contextFor = (storedConfig = getDefaultConfig()) => {
  const get = vi.fn().mockReturnValue({
    version: 'test-version',
    config: storedConfig,
  });
  const update = vi.fn().mockResolvedValue(undefined);
  const context = {
    extension: { packageJSON: { version: 'test-version' } },
    globalState: { get, update },
    subscriptions: [],
  } as unknown as ExtensionContext;
  return { context, get, update };
};

const deferred = () => {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
};

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  mocks.generate.mockReset().mockResolvedValue(undefined);
  mocks.isCurrent.mockReset().mockResolvedValue(false);
  mocks.getConfig.mockReset().mockReturnValue(getDefaultConfig());
  mocks.onChange.mockReset().mockReturnValue({ dispose: vi.fn() });
});

describe('configuration change publication', () => {
  it('repairs disk state even when profile storage matches the configuration', async () => {
    const { detectConfigChanges } = await import('./changeDetection');
    const { context, get, update } = contextFor();

    await detectConfigChanges(undefined, context);

    expect(get).not.toHaveBeenCalled();
    expect(mocks.isCurrent).toHaveBeenCalledWith(
      getDefaultConfig(),
      'material-icons.json',
      'test-version'
    );
    expect(mocks.generate).toHaveBeenCalledOnce();
    expect(update).toHaveBeenCalledWith('config', {
      version: 'test-version',
      config: getDefaultConfig(),
    });
  });

  it('skips generation when disk state is current despite stale profile storage', async () => {
    const { detectConfigChanges } = await import('./changeDetection');
    const { context, update } = contextFor({
      ...getDefaultConfig(),
      opacity: 0.2,
    });
    mocks.isCurrent.mockResolvedValue(true);

    await detectConfigChanges(undefined, context);

    expect(mocks.generate).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
  });

  it('serializes overlapping changes and reads the latest queued configuration', async () => {
    const { detectConfigChanges } = await import('./changeDetection');
    const { context, update } = contextFor();
    const started = deferred();
    const release = deferred();
    mocks.generate.mockImplementationOnce(async () => {
      started.resolve();
      await release.promise;
    });
    const first = detectConfigChanges(undefined, context);
    await started.promise;

    const second = detectConfigChanges(undefined, context);
    const latestConfig = { ...getDefaultConfig(), opacity: 0.4 };
    mocks.getConfig.mockReturnValue(latestConfig);
    expect(mocks.generate).toHaveBeenCalledOnce();
    expect(update).not.toHaveBeenCalled();

    release.resolve();
    await Promise.all([first, second]);

    expect(mocks.generate).toHaveBeenCalledTimes(2);
    expect(mocks.generate).toHaveBeenNthCalledWith(
      2,
      latestConfig,
      'material-icons.json',
      'test-version'
    );
    expect(update).toHaveBeenLastCalledWith('config', {
      version: 'test-version',
      config: latestConfig,
    });
  });

  it('does not save a failed publication and recovers on the next change', async () => {
    const { detectConfigChanges } = await import('./changeDetection');
    const { context, update } = contextFor();
    mocks.generate.mockRejectedValueOnce(new Error('publication failed'));

    await expect(detectConfigChanges(undefined, context)).rejects.toThrow(
      'publication failed'
    );
    expect(update).not.toHaveBeenCalled();

    await detectConfigChanges(undefined, context);

    expect(mocks.generate).toHaveBeenCalledTimes(2);
    expect(update).toHaveBeenCalledOnce();
  });

  it('keeps the activation listener available after initial generation fails', async () => {
    const { activate } = await import('../desktop/extension');
    const { context, update } = contextFor();
    mocks.generate.mockRejectedValueOnce(new Error('custom SVG missing'));

    await activate(context);

    expect(update).not.toHaveBeenCalled();
    expect(mocks.onChange).toHaveBeenCalledOnce();
    const listener = mocks.onChange.mock.calls[0][0] as (
      event: ConfigurationChangeEvent
    ) => void;
    listener({ affectsConfiguration: () => true });

    await vi.waitFor(() => expect(update).toHaveBeenCalledOnce());
    expect(mocks.generate).toHaveBeenCalledTimes(2);
  });
});
