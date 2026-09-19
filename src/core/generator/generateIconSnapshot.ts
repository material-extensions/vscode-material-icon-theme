import { createHash } from 'node:crypto';
import {
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { getFileConfigHash } from '../helpers/configHash';
import { withIconRoot } from '../helpers/resolvePath';
import { collectColors, replaceColors } from '../helpers/svgColor';
import type { Config } from '../models/icons/config';
import type { Manifest } from '../models/manifest';
import { customClonesIcons } from './clones/clonesGenerator';
import { getCloneData } from './clones/utils/cloneData';
import { generateManifest } from './generateManifest';
import { updateSVGOpacity, validateOpacityValue } from './iconOpacity';
import { adjustSVGSaturation, validateSaturationValue } from './iconSaturation';
import { validateHEXColorCode } from './shared/validation';

type Source = { path: string; size: number; mtimeMs: number };
type SnapshotManifest = Manifest & {
  _materialIconTheme?: {
    configuration: string;
    content: string;
    sources: Source[];
  };
};

const digest = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');

const configurationKey = (config: Config, version: string) => {
  const { enableLogging: _logging, logLevel: _level, ...icons } = config;
  return digest({ version, icons });
};
const portablePath = (path: string) => path.split(sep).join('/');

/** Check disk state, not profile-local globalState, before skipping generation. */
export const isIconSnapshotCurrent = async (
  config: Config,
  manifestPath: string,
  version: string
): Promise<boolean> => {
  try {
    const parsed: SnapshotManifest = JSON.parse(
      await readFile(manifestPath, 'utf8')
    );
    const { _materialIconTheme: metadata, ...manifest } = parsed;
    if (
      !metadata ||
      metadata.configuration !== configurationKey(config, version) ||
      metadata.content !== digest(manifest) ||
      !manifest.iconDefinitions
    )
      return false;
    const base = dirname(manifestPath);
    for (const definition of Object.values(manifest.iconDefinitions)) {
      if (!(await stat(resolve(base, definition.iconPath))).isFile())
        return false;
    }
    for (const source of metadata.sources) {
      const current = await stat(resolve(base, source.path));
      if (current.size !== source.size || current.mtimeMs !== source.mtimeMs)
        return false;
    }
    return true;
  } catch {
    return false;
  }
};

/**
 * Build from immutable packaged SVGs, then atomically publish one complete manifest.
 * Published generations remain available: other windows may still cache them.
 * Concurrent extension hosts never mutate each other's assets; the last manifest wins.
 */
export const generateIconSnapshot = async (
  config: Config,
  manifestPath: string,
  version: string
): Promise<void> => {
  const base = dirname(manifestPath);
  const sourceRoot = resolve(base, '../icons');
  const generations = join(sourceRoot, 'generated');
  await mkdir(generations, { recursive: true });
  const generation = await mkdtemp(join(generations, 'theme-'));
  const stagingBase = join(generation, 'dist');
  const stagingIcons = join(generation, 'icons');
  const temporaryManifest = `${manifestPath}.${generation.slice(generations.length + 1)}.tmp`;
  let published = false;
  try {
    await mkdir(join(stagingIcons, 'clones'), { recursive: true });
    let manifest = generateManifest(config);
    const cloneTargets = new Set(
      [
        ...config.files.customClones,
        ...config.folders.customClones,
        ...config.languages.customClones,
      ]
        .filter(
          (clone) =>
            !clone.activeForPacks ||
            clone.activeForPacks.includes(config.activeIconPack)
        )
        .flatMap(
          (clone) =>
            getCloneData(clone, manifest, '', '')?.map((data) => data.name) ??
            []
        )
    );
    const sources: Source[] = [];
    const hash = getFileConfigHash(config);
    let index = 0;
    for (const [name, definition] of Object.entries(
      manifest.iconDefinitions ?? {}
    )) {
      // The regular generator adds a cache hash; packaged sources have no hash.
      const sourcePath = hash
        ? definition.iconPath.replace(`${hash}.`, '.')
        : definition.iconPath;
      const source = resolve(base, sourcePath);
      let content: string;
      try {
        content = await readFile(source, 'utf8');
      } catch (error) {
        // Associations may name custom clones whose SVGs are created below.
        // Existing originals are still copied when a clone overrides its base.
        if (
          (error as NodeJS.ErrnoException).code === 'ENOENT' &&
          cloneTargets.has(name)
        )
          continue;
        throw error;
      }
      const color =
        name === 'file'
          ? config.files.color
          : name === 'folder' || name === 'folder-open'
            ? config.folders.color
            : name === 'folder-root' || name === 'folder-root-open'
              ? config.rootFolders.color
              : undefined;
      if (color && validateHEXColorCode(color)) {
        content = replaceColors(
          content,
          new Map(
            [...collectColors(content)].map((original) => [original, color])
          )
        );
      }
      if (config.opacity !== 1 && validateOpacityValue(config.opacity))
        content = updateSVGOpacity(content, config.opacity);
      if (config.saturation !== 1 && validateSaturationValue(config.saturation))
        content = adjustSVGSaturation(content, config.saturation);
      const iconName = `icon-${index++}${hash}.svg`;
      await writeFile(join(stagingIcons, iconName), content, 'utf8');
      definition.iconPath = `../icons/${iconName}`;
      // User-owned custom icons can change without a configuration change.
      if (dirname(source) !== sourceRoot) {
        const info = await stat(source);
        sources.push({
          path: portablePath(relative(base, source)),
          size: info.size,
          mtimeMs: info.mtimeMs,
        });
      }
    }
    manifest = await withIconRoot(stagingBase, () =>
      customClonesIcons(manifest, config, true)
    );
    for (const definition of Object.values(manifest.iconDefinitions ?? {})) {
      const path = resolve(stagingBase, definition.iconPath);
      if (!(await stat(path)).isFile())
        throw new Error('Generated icon is missing.');
      definition.iconPath = portablePath(relative(base, path));
    }
    const snapshot: SnapshotManifest = {
      ...manifest,
      _materialIconTheme: {
        configuration: configurationKey(config, version),
        content: digest(manifest),
        sources,
      },
    };
    await writeFile(
      temporaryManifest,
      JSON.stringify(snapshot, undefined, 2),
      'utf8'
    );
    await rename(temporaryManifest, manifestPath);
    published = true;
  } finally {
    if (!published) {
      await rm(temporaryManifest, { force: true });
      await rm(generation, { recursive: true, force: true });
    }
  }
};
