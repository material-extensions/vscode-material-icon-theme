import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ExtensionContext } from 'vscode';
import {
  type Config,
  generateManifest,
  getDefaultConfig,
  IconPack,
  type Manifest,
  manifestName,
  resolvePath,
  writeToFile,
} from '../../core';
import { getCurrentConfig } from '../shared/config';
import { appliedConfigFileName, detectConfigChanges } from './changeDetection';

const fsMockState = vi.hoisted(() => ({
  tempDir: '',
}));

vi.mock('../../core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../core')>()),
  applyConfigToIcons: vi.fn(),
  renameIconFiles: vi.fn(),
  clearCloneFolder: vi.fn(),
  customClonesIcons: vi.fn(async (manifest) => manifest),
  resolvePath: vi.fn((...paths: string[]) =>
    join(fsMockState.tempDir, ...paths)
  ),
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
    fsMockState.tempDir = mkdtempSync(join(tmpdir(), 'mit-change-det-'));
    config = getDefaultConfig();
    context = {
      extension: { packageJSON: { version: '1.0.0' } },
      globalState: {
        get: vi.fn().mockReturnValue({ version: '1.0.0', config }),
        update: vi.fn(),
      },
    } as unknown as ExtensionContext;
    manifest = generateManifest({ activeIconPack: IconPack.React });

    vi.mocked(getCurrentConfig).mockImplementation(() =>
      structuredClone(config)
    );
    vi.mocked(writeToFile).mockImplementation(async (filePath, content) => {
      writeFileSync(filePath, content, 'utf-8');
      if (filePath.endsWith(manifestName)) {
        manifest = JSON.parse(content);
      }
    });
  });

  afterEach(() => {
    if (fsMockState.tempDir) {
      rmSync(fsMockState.tempDir, { recursive: true, force: true });
    }
  });

  it.each([IconPack.Angular, IconPack.Ngrx])(
    'restores %s mappings on activation when on-disk applied config was overwritten by another window or profile',
    async (pack) => {
      // Simulate another window/profile writing React to disk
      const otherConfig = {
        ...getDefaultConfig(),
        activeIconPack: IconPack.React,
      };
      writeFileSync(
        join(fsMockState.tempDir, appliedConfigFileName),
        JSON.stringify({ version: '1.0.0', config: otherConfig }),
        'utf-8'
      );
      writeFileSync(
        join(fsMockState.tempDir, manifestName),
        JSON.stringify(manifest),
        'utf-8'
      );

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

      const persisted = JSON.parse(
        readFileSync(join(fsMockState.tempDir, appliedConfigFileName), 'utf-8')
      );
      expect(persisted.config.activeIconPack).toBe(pack);
    }
  );

  it('skips regeneration when on-disk config and manifest already match active config', async () => {
    writeFileSync(
      join(fsMockState.tempDir, appliedConfigFileName),
      JSON.stringify({ version: '1.0.0', config }),
      'utf-8'
    );
    writeFileSync(
      join(fsMockState.tempDir, manifestName),
      JSON.stringify(manifest),
      'utf-8'
    );

    await detectConfigChanges(undefined, context);
    await detectConfigChanges({ affectsConfiguration: () => true }, context);

    expect(writeToFile).not.toHaveBeenCalled();
  });

  it('regenerates on activation if manifest file is missing on disk', async () => {
    writeFileSync(
      join(fsMockState.tempDir, appliedConfigFileName),
      JSON.stringify({ version: '1.0.0', config }),
      'utf-8'
    );

    await detectConfigChanges(undefined, context);

    expect(writeToFile).toHaveBeenCalledTimes(2);
  });

  it('skips unrelated settings events', async () => {
    await detectConfigChanges({ affectsConfiguration: () => false }, context);

    expect(getCurrentConfig).not.toHaveBeenCalled();
    expect(writeToFile).not.toHaveBeenCalled();
  });

  it('applies changed settings and updates both globalState and on-disk state', async () => {
    writeFileSync(
      join(fsMockState.tempDir, appliedConfigFileName),
      JSON.stringify({ version: '1.0.0', config }),
      'utf-8'
    );
    writeFileSync(
      join(fsMockState.tempDir, manifestName),
      JSON.stringify(manifest),
      'utf-8'
    );

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

  it('serializes concurrent detectConfigChanges calls without overlapping', async () => {
    const order: string[] = [];
    let releaseFirst!: () => void;
    const firstWriteGate = new Promise<void>((resolve) => {
      releaseFirst = resolve;
    });

    let callIndex = 0;
    vi.mocked(writeToFile).mockImplementation(async (filePath, content) => {
      callIndex++;
      const current = callIndex;
      order.push(`start:${current}`);
      if (current === 1) {
        await firstWriteGate;
      }
      writeFileSync(filePath, content, 'utf-8');
      order.push(`end:${current}`);
    });

    vi.mocked(getCurrentConfig)
      .mockReturnValueOnce({ ...config, activeIconPack: IconPack.React })
      .mockReturnValueOnce({ ...config, activeIconPack: IconPack.Nest });

    const p1 = detectConfigChanges(undefined, context);
    const p2 = detectConfigChanges(undefined, context);

    // Wait a microtask so p1 enters writeToFile
    await new Promise((r) => setTimeout(r, 10));
    expect(order).toStrictEqual(['start:1']);

    releaseFirst();
    await Promise.all([p1, p2]);

    // p1 writes manifest (1) and appliedConfig (2) completely before p2 starts (3, 4)
    expect(order).toStrictEqual([
      'start:1',
      'end:1',
      'start:2',
      'end:2',
      'start:3',
      'end:3',
      'start:4',
      'end:4',
    ]);
    expect(resolvePath).toHaveBeenCalled();
  });
});
