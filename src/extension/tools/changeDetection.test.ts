import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ExtensionContext } from 'vscode';
import {
  type Config,
  generateManifest,
  getDefaultConfig,
  IconPack,
  type Manifest,
  writeToFile,
} from '../../core';
import { getCurrentConfig } from '../shared/config';
import { detectConfigChanges } from './changeDetection';

vi.mock('../../core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../core')>()),
  applyConfigToIcons: vi.fn(),
  renameIconFiles: vi.fn(),
  clearCloneFolder: vi.fn(),
  customClonesIcons: vi.fn(async (manifest) => manifest),
  writeToFile: vi.fn(),
}));

vi.mock('../shared/config', () => ({
  getCurrentConfig: vi.fn(),
}));

describe('configuration change detection', () => {
  let config: Config;
  let context: ExtensionContext;
  let manifest: Manifest;

  beforeEach(() => {
    vi.clearAllMocks();
    config = getDefaultConfig();
    context = {
      extension: { packageJSON: { version: '1.0.0' } },
      globalState: {
        get: vi.fn().mockReturnValue({ version: '1.0.0', config }),
        update: vi.fn(),
      },
    } as unknown as ExtensionContext;
    manifest = generateManifest({ activeIconPack: IconPack.React });
    vi.mocked(getCurrentConfig).mockReturnValue(config);
    vi.mocked(writeToFile).mockImplementation(async (_, content) => {
      manifest = JSON.parse(content as string);
    });
  });

  it.each([IconPack.Angular, IconPack.Ngrx])(
    'should restore %s mappings on activation when the cached configuration is unchanged',
    async (pack) => {
      config.activeIconPack = pack;

      await detectConfigChanges(undefined, context);

      expect(manifest.fileExtensions?.['service.ts']).toBe('angular-service');
      expect(manifest.fileExtensions?.['directive.ts']).toBe(
        'angular-directive'
      );
      expect(manifest.fileExtensions?.['component.ts']).toBe(
        'angular-component'
      );
      expect(manifest.fileExtensions?.['pipe.ts']).toBe('angular-pipe');
      if (pack === IconPack.Ngrx) {
        expect(manifest.fileExtensions?.['state.ts']).toBe('ngrx-state');
      }
    }
  );

  it('should skip settings events when the configuration is unchanged', async () => {
    await detectConfigChanges({ affectsConfiguration: () => true }, context);

    expect(writeToFile).not.toHaveBeenCalled();
  });

  it('should skip unrelated settings events', async () => {
    await detectConfigChanges({ affectsConfiguration: () => false }, context);

    expect(getCurrentConfig).not.toHaveBeenCalled();
    expect(writeToFile).not.toHaveBeenCalled();
  });

  it('should apply changed settings', async () => {
    vi.mocked(getCurrentConfig).mockReturnValue({
      ...config,
      activeIconPack: IconPack.Ngrx,
    });

    await detectConfigChanges({ affectsConfiguration: () => true }, context);

    expect(manifest.fileExtensions?.['state.ts']).toBe('ngrx-state');
    expect(context.globalState.update).toHaveBeenCalledWith('config', {
      version: '1.0.0',
      config: { ...config, activeIconPack: IconPack.Ngrx },
    });
  });
});
