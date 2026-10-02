import { execFile, fork } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  unlinkSync,
  utimesSync,
  writeFileSync,
} from 'node:fs';
import { rename } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve, sep } from 'node:path';
import { promisify } from 'node:util';
import { build } from 'esbuild';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import {
  generateConfiguredFileIconClones,
  generateConfiguredFolderIconClones,
  generateConfiguredLanguageIconClones,
} from '../../generator/clones/clonesGenerator';
import { padWithDefaultConfig } from '../../generator/config/defaultConfig';
import { generateFileIcons } from '../../generator/fileGenerator';
import {
  generateFolderIcons,
  generateRootFolderIcons,
} from '../../generator/folderGenerator';
import {
  generateIconSnapshot,
  isIconSnapshotCurrent,
} from '../../generator/generateIconSnapshot';
import { generateManifest } from '../../generator/generateManifest';
import { iconContentHash } from '../../generator/iconContentStore';
import { withIconRoot } from '../../helpers/resolvePath';
import { fileIcons } from '../../icons/fileIcons';
import { folderIcons } from '../../icons/folderIcons';
import { languageIcons } from '../../icons/languageIcons';
import type { Manifest } from '../../models/manifest';

vi.mock('node:fs/promises', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:fs/promises')>();
  return { ...actual, rename: vi.fn(actual.rename) };
});
const actualFs =
  await vi.importActual<typeof import('node:fs/promises')>('node:fs/promises');

const version = 'snapshot-test-version';
let fixture: string;
let manifestPath: string;
let packageFixture: string;

const readManifest = (): Manifest =>
  JSON.parse(readFileSync(manifestPath, 'utf8'));
const assetPath = (manifest: Manifest, id: string) =>
  resolve(dirname(manifestPath), manifest.iconDefinitions![id].iconPath);
const readAsset = (manifest: Manifest, id: string) =>
  readFileSync(assetPath(manifest, id), 'utf8');
const allAssets = (manifest: Manifest) =>
  new Map(
    Object.keys(manifest.iconDefinitions!).map((id) => [
      assetPath(manifest, id),
      readAsset(manifest, id),
    ])
  );

beforeAll(async () => {
  packageFixture = mkdtempSync(join(tmpdir(), 'material-snapshot-package-'));
  const icons = join(packageFixture, 'icons');
  const sourceIcons = resolve('icons');
  // Rebuild ignored assets even if a developer has run the build previously.
  // CI runs the tests before building, so no generated repository files may leak in.
  cpSync(sourceIcons, icons, {
    recursive: true,
    filter: (source) => {
      if (source === sourceIcons) return true;
      const name = basename(source);
      return (
        name.endsWith('.svg') &&
        !name.includes('~') &&
        !name.endsWith('.clone.svg') &&
        !/^(file|folder|folder-open|folder-root|folder-root-open)\.svg$/.test(
          name
        ) &&
        !/^folder-.*-open(?:_light|_highContrast)?\.svg$/.test(name)
      );
    },
  });
  const base = join(packageFixture, 'dist');
  mkdirSync(base);
  const defaults = padWithDefaultConfig();
  await withIconRoot(base, async () => {
    await generateFileIcons(
      defaults.files.color,
      defaults.opacity,
      defaults.saturation
    );
    await generateFolderIcons(
      defaults.folders.color,
      defaults.opacity,
      defaults.saturation
    );
    await generateRootFolderIcons(
      defaults.rootFolders.color,
      defaults.opacity,
      defaults.saturation
    );
  });
  const openGenerator = join(packageFixture, 'generate-open-folders.cjs');
  await build({
    entryPoints: [resolve('src/scripts/svg/generateOpenFolderIcons.ts')],
    outfile: openGenerator,
    bundle: true,
    platform: 'node',
    format: 'cjs',
    logLevel: 'silent',
  });
  await promisify(execFile)(process.execPath, [openGenerator], {
    cwd: packageFixture,
    timeout: 30000,
  });
  const manifest = generateManifest();
  await withIconRoot(base, async () => {
    await generateConfiguredFileIconClones(fileIcons, manifest);
    await generateConfiguredFolderIconClones(folderIcons, manifest);
    await generateConfiguredLanguageIconClones(languageIcons, manifest);
  });
  for (const definition of Object.values(manifest.iconDefinitions!))
    expect(
      existsSync(resolve(base, definition.iconPath)),
      definition.iconPath
    ).toBe(true);
}, 60000);

afterAll(() => {
  if (!packageFixture.startsWith(join(tmpdir(), 'material-snapshot-package-')))
    throw new Error('Unsafe package fixture path');
  rmSync(packageFixture, { recursive: true, force: true });
});

beforeEach(() => {
  vi.mocked(rename).mockReset().mockImplementation(actualFs.rename);
  fixture = mkdtempSync(join(tmpdir(), 'material-snapshot-test-'));
  mkdirSync(join(fixture, 'dist'));
  manifestPath = join(fixture, 'dist', 'material-icons.json');
  cpSync(join(packageFixture, 'icons'), join(fixture, 'icons'), {
    recursive: true,
  });
  writeFileSync(manifestPath, JSON.stringify(generateManifest()));
});

afterEach(() => {
  if (!fixture.startsWith(join(tmpdir(), 'material-snapshot-test-')))
    throw new Error('Unsafe snapshot fixture path');
  rmSync(fixture, { recursive: true, force: true });
});

describe('immutable icon snapshots', { timeout: 60000 }, () => {
  it('reuses final SVG bytes across A-B-A, manifest-only changes and version checks', async () => {
    const config = padWithDefaultConfig({ opacity: 0.5 });
    const store = join(fixture, 'icons', 'generated', 'sha256');
    await generateIconSnapshot(config, manifestPath, version);
    const first = readManifest();
    const firstPaths = first.iconDefinitions;
    const firstCount = readdirSync(store).length;
    for (const [path, content] of allAssets(first))
      expect(basename(path)).toBe(
        `${iconContentHash(Buffer.from(content))}.svg`
      );

    const associations = padWithDefaultConfig({
      opacity: 0.5,
      hidesExplorerArrows: true,
      files: { associations: { '*.reuse': 'typescript' } },
    });
    await generateIconSnapshot(associations, manifestPath, version);
    expect(readManifest().fileExtensions?.reuse).toBe('typescript');
    expect(readdirSync(store)).toHaveLength(firstCount);
    expect(readManifest().iconDefinitions).toEqual(firstPaths);

    await generateIconSnapshot(
      padWithDefaultConfig({ opacity: 0.8 }),
      manifestPath,
      version
    );
    const afterB = readdirSync(store).sort();
    await generateIconSnapshot(config, manifestPath, 'next-version');
    expect(readManifest().iconDefinitions).toEqual(firstPaths);
    expect(readdirSync(store).sort()).toEqual(afterB);
    expect(readdirSync(join(fixture, 'icons', 'generated'))).toEqual([
      'sha256',
    ]);
    expect(
      await isIconSnapshotCurrent(config, manifestPath, 'next-version')
    ).toBe(true);
  });

  it('detects and repairs corrupt content even when configuration is unchanged', async () => {
    const config = padWithDefaultConfig();
    await generateIconSnapshot(config, manifestPath, version);
    const path = assetPath(readManifest(), 'typescript');
    const original = readFileSync(path);
    writeFileSync(path, Buffer.alloc(original.length, 'x'));
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      false
    );
    await generateIconSnapshot(config, manifestPath, version);
    expect(assetPath(readManifest(), 'typescript')).toBe(path);
    expect(readFileSync(path)).toEqual(original);
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      true
    );
  });

  it('migrates old snapshot metadata without deleting old CSS targets', async () => {
    const config = padWithDefaultConfig();
    const legacy = join(fixture, 'icons', 'generated', 'theme-legacy', 'icons');
    mkdirSync(legacy, { recursive: true });
    const legacyPath = join(legacy, 'old.svg');
    writeFileSync(legacyPath, '<svg/>');
    await generateIconSnapshot(config, manifestPath, version);
    const old = JSON.parse(readFileSync(manifestPath, 'utf8'));
    delete old._materialIconTheme.format;
    writeFileSync(manifestPath, JSON.stringify(old));
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      false
    );
    await generateIconSnapshot(config, manifestPath, version);
    expect(readFileSync(legacyPath, 'utf8')).toBe('<svg/>');
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      true
    );
  });

  it('retains shared blobs after failed manifest publication so other readers can use them', async () => {
    const config = padWithDefaultConfig();
    await generateIconSnapshot(config, manifestPath, version);
    const previous = readFileSync(manifestPath, 'utf8');
    const previousAssets = allAssets(readManifest());
    const store = join(fixture, 'icons', 'generated', 'sha256');
    const before = readdirSync(store).length;
    vi.mocked(rename).mockImplementation(async (from, to) => {
      if (to === manifestPath)
        throw Object.assign(new Error('publication failed'), {
          code: 'EPERM',
        });
      await actualFs.rename(from, to);
    });
    const next = padWithDefaultConfig({ opacity: 0.5 });
    await expect(
      generateIconSnapshot(next, manifestPath, version)
    ).rejects.toThrow('publication failed');
    expect(readFileSync(manifestPath, 'utf8')).toBe(previous);
    const after = readdirSync(store).sort();
    expect(after.length).toBeGreaterThan(before);
    for (const [path, content] of previousAssets)
      expect(readFileSync(path, 'utf8')).toBe(content);
    expect(readdirSync(join(fixture, 'icons', 'generated'))).toEqual([
      'sha256',
    ]);
    vi.mocked(rename).mockImplementation(actualFs.rename);
    await generateIconSnapshot(next, manifestPath, version);
    expect(readdirSync(store).sort()).toEqual(after);
    allAssets(readManifest());
  });

  it('preserves originals and previously published assets across configuration changes', async () => {
    const originals = allAssets(readManifest());
    const first = padWithDefaultConfig({
      opacity: 0.5,
      saturation: 0.4,
      folders: { color: '#ff0000' },
      rootFolders: { color: '#00ff00' },
      files: { color: '#0000ff' },
    });
    await generateIconSnapshot(first, manifestPath, version);
    const firstManifest = readManifest();
    const previous = allAssets(firstManifest);
    expect(readAsset(firstManifest, 'typescript')).toContain('opacity="0.5"');
    expect(readAsset(firstManifest, 'typescript')).toContain('values="0.4"');
    expect(readAsset(firstManifest, 'folder')).toContain('#ff0000');
    expect(readAsset(firstManifest, 'folder-root')).toContain('#00ff00');
    expect(readAsset(firstManifest, 'file')).toContain('#0000ff');

    await generateIconSnapshot(padWithDefaultConfig(), manifestPath, version);
    const next = readManifest();
    expect(readAsset(next, 'typescript')).not.toContain('opacity="0.5"');
    expect(readAsset(next, 'typescript')).not.toContain('values="0.4"');
    expect(readAsset(next, 'folder')).toContain('#90a4ae');
    expect(readAsset(next, 'folder-root')).toContain('#90a4ae');
    expect(readAsset(next, 'file')).toContain('#90a4ae');
    for (const [path, content] of [...originals, ...previous])
      expect(readFileSync(path, 'utf8')).toBe(content);
  });

  it('checks configuration, version and referenced assets instead of trusting saved state', async () => {
    const config = padWithDefaultConfig({
      hidesExplorerArrows: true,
      folders: { associations: { src: 'admin' } },
      files: { associations: { '*.snapshot': 'typescript' } },
    });
    await generateIconSnapshot(config, manifestPath, version);
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      true
    );
    const manifest = readManifest();
    expect(manifest.hidesExplorerArrows).toBe(true);
    expect(manifest.folderNames?.src).toBe('folder-admin');
    expect(manifest.fileExtensions?.snapshot).toBe('typescript');
    expect(
      await isIconSnapshotCurrent(padWithDefaultConfig(), manifestPath, version)
    ).toBe(false);
    expect(await isIconSnapshotCurrent(config, manifestPath, 'next')).toBe(
      false
    );

    unlinkSync(assetPath(manifest, 'typescript'));
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      false
    );
    await generateIconSnapshot(config, manifestPath, version);
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      true
    );
    allAssets(readManifest());

    writeFileSync(manifestPath, '{');
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      false
    );
    await generateIconSnapshot(config, manifestPath, version);
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      true
    );
    unlinkSync(manifestPath);
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      false
    );
    await generateIconSnapshot(config, manifestPath, version);
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      true
    );
  });

  it('generates file, language and all folder clone variants and repairs a missing clone', async () => {
    const config = padWithDefaultConfig({
      opacity: 0.65,
      files: {
        customClones: [
          {
            name: 'snapshot-file',
            base: 'rust',
            color: '#42a5f5',
            lightColor: '#ef5350',
            fileNames: ['snapshot.rs'],
          },
        ],
      },
      languages: {
        customClones: [
          {
            name: 'snapshot-language',
            base: 'typescript',
            color: '#42a5f5',
            lightColor: '#ef5350',
            ids: ['typescript'],
          },
        ],
      },
      folders: {
        customClones: [
          {
            name: 'snapshot-folder',
            base: 'folder',
            color: '#42a5f5',
            lightColor: '#ef5350',
            folderNames: ['snapshots'],
          },
        ],
      },
    });
    await generateIconSnapshot(config, manifestPath, version);
    const manifest = readManifest();
    expect(manifest.fileNames?.['snapshot.rs']).toBe('snapshot-file');
    expect(manifest.light?.fileNames?.['snapshot.rs']).toBe(
      'snapshot-file_light'
    );
    expect(manifest.languageIds?.typescript).toBe('snapshot-language');
    expect(manifest.light?.languageIds?.typescript).toBe(
      'snapshot-language_light'
    );
    expect(manifest.folderNames?.snapshots).toBe('folder-snapshot-folder');
    expect(manifest.folderNamesExpanded?.snapshots).toBe(
      'folder-snapshot-folder-open'
    );
    expect(manifest.light?.folderNames?.snapshots).toBe(
      'folder-snapshot-folder_light'
    );
    expect(manifest.light?.folderNamesExpanded?.snapshots).toBe(
      'folder-snapshot-folder-open_light'
    );
    const clones = Object.keys(manifest.iconDefinitions!).filter((id) =>
      id.includes('snapshot-')
    );
    expect(clones).toHaveLength(8);
    for (const id of clones) {
      expect(readAsset(manifest, id)).toContain('opacity="0.65"');
      expect(readAsset(manifest, id)).toContain(
        id.endsWith('_light') ? '#ef5350' : '#42a5f5'
      );
    }
    unlinkSync(assetPath(manifest, 'snapshot-language_light'));
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      false
    );
    await generateIconSnapshot(config, manifestPath, version);
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      true
    );
    allAssets(readManifest());
  });

  it('copies referenced external file and folder SVGs without changing their sources', async () => {
    const config = padWithDefaultConfig({
      files: { associations: { '*.external': '../custom/sample' } },
      folders: { associations: { external: '../../../custom/folder-sample' } },
    });
    const sourceManifest = generateManifest(config);
    const ids = [
      '../custom/sample',
      'folder-../../../custom/folder-sample',
      'folder-../../../custom/folder-sample-open',
    ];
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg"><path fill="#123456" d="M0 0h16v16H0z"/></svg>';
    const sources = ids.map((id) => assetPath(sourceManifest, id));
    for (const path of sources) {
      expect(path.startsWith(`${fixture}${sep}`)).toBe(true);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, svg);
    }
    config.opacity = 0.45;
    await generateIconSnapshot(config, manifestPath, version);
    const manifest = readManifest();
    for (const [index, id] of ids.entries()) {
      expect(assetPath(manifest, id)).not.toBe(sources[index]);
      expect(readAsset(manifest, id)).toContain('opacity="0.45"');
      expect(readAsset(manifest, id)).toContain('#123456');
      expect(readFileSync(sources[index], 'utf8')).toBe(svg);
    }
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      true
    );
  });

  it('resolves associations to active custom clones and clones that override their own base', async () => {
    const config = padWithDefaultConfig({
      activeIconPack: 'react',
      files: {
        associations: { '*.alias': 'snapshot-file' },
        customClones: [
          {
            name: 'snapshot-file',
            base: 'typescript',
            color: '#42a5f5',
            fileNames: ['clone.ts'],
            activeForPacks: ['react'],
          },
          {
            name: 'rust',
            base: 'rust',
            color: '#ef5350',
            fileNames: ['override.rs'],
          },
        ],
      },
      folders: {
        associations: { aliases: 'snapshot-folder' },
        customClones: [
          {
            name: 'snapshot-folder',
            base: 'folder',
            color: '#42a5f5',
            folderNames: ['clones'],
            activeForPacks: ['react'],
          },
        ],
      },
      languages: {
        associations: { 'alias-language': 'snapshot-language' },
        customClones: [
          {
            name: 'snapshot-language',
            base: 'typescript',
            color: '#42a5f5',
            ids: ['clone-language'],
            activeForPacks: ['react'],
          },
        ],
      },
    });
    expect(existsSync(join(fixture, 'icons', 'snapshot-file.svg'))).toBe(false);
    expect(
      existsSync(join(fixture, 'icons', 'folder-snapshot-folder.svg'))
    ).toBe(false);
    expect(existsSync(join(fixture, 'icons', 'snapshot-language.svg'))).toBe(
      false
    );
    const originalRust = readFileSync(
      join(fixture, 'icons', 'rust.svg'),
      'utf8'
    );
    await generateIconSnapshot(config, manifestPath, version);
    const manifest = readManifest();
    expect(manifest.fileExtensions?.alias).toBe('snapshot-file');
    expect(manifest.folderNames?.aliases).toBe('folder-snapshot-folder');
    expect(manifest.folderNamesExpanded?.aliases).toBe(
      'folder-snapshot-folder-open'
    );
    expect(manifest.languageIds?.['alias-language']).toBe('snapshot-language');
    expect(manifest.fileNames?.['override.rs']).toBe('rust');
    expect(readAsset(manifest, 'rust')).toContain('#ef5350');
    expect(readFileSync(join(fixture, 'icons', 'rust.svg'), 'utf8')).toBe(
      originalRust
    );
    for (const id of [
      'snapshot-file',
      'folder-snapshot-folder',
      'folder-snapshot-folder-open',
      'snapshot-language',
    ])
      expect(readAsset(manifest, id)).toContain('#42a5f5');
    allAssets(manifest);
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      true
    );
  });

  it('preserves native opacity and filters in external SVGs with default settings', async () => {
    const config = padWithDefaultConfig({
      files: { associations: { '*.shadow': '../custom/shadow' } },
    });
    const source = join(fixture, 'custom', 'shadow.svg');
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" opacity="0.5" filter="url(#shadow)"><defs><filter id="shadow"><feGaussianBlur stdDeviation="2"/></filter></defs><path fill="#123456" d="M0 0h16v16H0z"/></svg>';
    mkdirSync(dirname(source), { recursive: true });
    writeFileSync(source, svg);
    await generateIconSnapshot(config, manifestPath, version);
    expect(readAsset(readManifest(), '../custom/shadow')).toBe(svg);
    expect(readFileSync(source, 'utf8')).toBe(svg);
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      true
    );
    const sourceInfo = statSync(source);
    writeFileSync(source, svg.replace('#123456', '#654321'));
    utimesSync(source, sourceInfo.atime, sourceInfo.mtime);
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      false
    );
    await generateIconSnapshot(config, manifestPath, version);
    expect(readAsset(readManifest(), '../custom/shadow')).toContain('#654321');
    writeFileSync(source, `${svg}\n`);
    expect(await isIconSnapshotCurrent(config, manifestPath, version)).toBe(
      false
    );
    await generateIconSnapshot(config, manifestPath, version);
    expect(readAsset(readManifest(), '../custom/shadow')).toBe(`${svg}\n`);
  });

  it('preserves the published manifest and assets when a source asset is unavailable', async () => {
    const config = padWithDefaultConfig({ opacity: 0.5 });
    await generateIconSnapshot(config, manifestPath, version);
    const previousJson = readFileSync(manifestPath, 'utf8');
    const previousAssets = allAssets(readManifest());
    unlinkSync(join(fixture, 'icons', 'typescript.svg'));
    await expect(
      generateIconSnapshot(
        padWithDefaultConfig({ opacity: 0.8 }),
        manifestPath,
        version
      )
    ).rejects.toThrow();
    expect(readFileSync(manifestPath, 'utf8')).toBe(previousJson);
    for (const [path, content] of previousAssets)
      expect(readFileSync(path, 'utf8')).toBe(content);
  });

  it('rejects clone names that could write outside their own snapshot', async () => {
    const previousJson = readFileSync(manifestPath, 'utf8');
    const previousAssets = allAssets(readManifest());
    for (const name of [
      '../../../snapshot-escape',
      '..\\..\\..\\snapshot-escape',
      'snapshot:alternate-stream',
    ]) {
      const config = padWithDefaultConfig({
        files: {
          customClones: [
            {
              name,
              base: 'rust',
              color: '#42a5f5',
              fileNames: ['unsafe.rs'],
            },
          ],
        },
      });
      await expect(
        generateIconSnapshot(config, manifestPath, version)
      ).rejects.toThrow();
      expect(readFileSync(manifestPath, 'utf8')).toBe(previousJson);
      expect(readdirSync(join(fixture, 'icons', 'generated'))).toEqual([]);
    }
    for (const [path, content] of previousAssets)
      expect(readFileSync(path, 'utf8')).toBe(content);
  });

  it.each([1, 2])(
    'publishes complete snapshots from independent processes while keeping old references valid (run %s)',
    async () => {
      const initial = padWithDefaultConfig();
      await generateIconSnapshot(initial, manifestPath, version);
      const retained = allAssets(readManifest());
      const workerPath = join(fixture, 'snapshot-worker.cjs');
      await build({
        entryPoints: [resolve('src/core/tests/icons/iconSnapshot.worker.ts')],
        outfile: workerPath,
        bundle: true,
        platform: 'node',
        format: 'cjs',
        logLevel: 'silent',
      });
      const observed = new Map<string, Manifest>();
      const failures: unknown[] = [];
      const observe = () => {
        try {
          const json = readFileSync(manifestPath, 'utf8');
          if (!observed.has(json)) {
            const manifest = JSON.parse(json);
            for (const [path, content] of allAssets(manifest))
              expect(basename(path)).toBe(
                `${iconContentHash(Buffer.from(content))}.svg`
              );
            observed.set(json, manifest);
          }
        } catch (error) {
          failures.push(error);
        }
      };
      const workers = [0.5, 0.5, 0.8].map((opacity) => {
        const child = fork(
          workerPath,
          [
            manifestPath,
            JSON.stringify(padWithDefaultConfig({ opacity })),
            version,
          ],
          { silent: true }
        );
        let ready!: () => void;
        const started = new Promise<void>((done) => {
          ready = done;
        });
        let stderr = '';
        child.stderr?.on('data', (chunk) => {
          stderr += String(chunk);
        });
        const finished = new Promise<void>((done, reject) => {
          child.on(
            'message',
            (message: {
              ready?: boolean;
              manifest?: string;
              error?: string;
            }) => {
              if (message.ready) ready();
              if (message.manifest)
                observed.set(message.manifest, JSON.parse(message.manifest));
              if (message.error) reject(new Error(message.error));
            }
          );
          child.on('error', reject);
          child.on('exit', (code) =>
            code === 0
              ? done()
              : reject(new Error(`Snapshot worker exited ${code}: ${stderr}`))
          );
        });
        return { child, started, finished };
      });
      const timer = setInterval(observe, 10);
      const finished = Promise.all(workers.map((worker) => worker.finished));
      try {
        await Promise.race([
          Promise.all(workers.map((worker) => worker.started)),
          finished,
        ]);
        for (const worker of workers) worker.child.send('start');
        await finished;
        observe();
      } finally {
        clearInterval(timer);
        for (const worker of workers)
          if (worker.child.exitCode === null) worker.child.kill();
      }
      expect(failures).toEqual([]);
      expect(observed.size).toBeGreaterThanOrEqual(2);
      for (const manifest of observed.values()) allAssets(manifest);
      for (const [path, content] of retained)
        expect(readFileSync(path, 'utf8')).toBe(content);
      const finalSvg = readAsset(readManifest(), 'typescript');
      expect(finalSvg).toMatch(/opacity="0\.(5|8)"/);
      expect(existsSync(join(fixture, 'icons', 'typescript.svg'))).toBe(true);
    }
  );
});
