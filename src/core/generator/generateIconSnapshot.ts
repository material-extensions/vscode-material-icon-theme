import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { getFileConfigHash } from '../helpers/configHash';
import { withIconRoot } from '../helpers/resolvePath';
import { collectColors, replaceColors } from '../helpers/svgColor';
import { logger } from '../logging/logger';
import type { Config } from '../models/icons/config';
import type { Manifest } from '../models/manifest';
import { customClonesIcons } from './clones/clonesGenerator';
import { getCloneData } from './clones/utils/cloneData';
import { generateManifest } from './generateManifest';
import {
  iconContentHash,
  publishIconContent,
  readStoredIcon,
  replaceIconFile,
} from './iconContentStore';
import { updateSVGOpacity, validateOpacityValue } from './iconOpacity';
import { adjustSVGSaturation, validateSaturationValue } from './iconSaturation';
import { validateHEXColorCode } from './shared/validation';

type Source = { path: string; content: string };
type SnapshotManifest = Manifest & {
  _materialIconTheme?: {
    format: number;
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
      metadata.format !== 2 ||
      metadata.configuration !== configurationKey(config, version) ||
      metadata.content !== digest(manifest) ||
      !manifest.iconDefinitions
    )
      return false;
    const base = dirname(manifestPath);
    const paths = new Set(
      Object.values(manifest.iconDefinitions).map((icon) => icon.iconPath)
    );
    for (const path of paths) {
      const match =
        /^\.\.\/icons\/generated\/sha256\/([a-f0-9]{64})\.svg$/.exec(path);
      if (
        !match ||
        iconContentHash(await readStoredIcon(resolve(base, path))) !== match[1]
      )
        return false;
    }
    for (const source of metadata.sources) {
      if (
        iconContentHash(await readFile(resolve(base, source.path))) !==
        source.content
      )
        return false;
    }
    return true;
  } catch {
    return false;
  }
};

/**
 * Build from immutable packaged SVGs, then atomically publish one complete manifest.
 * Final SVGs are shared by content hash; old published paths remain available.
 * Private staging directories are removed; the last complete manifest wins.
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
  const generation = await mkdtemp(join(generations, '.tmp-'));
  const stagingBase = join(generation, 'dist');
  const stagingIcons = join(generation, 'icons');
  const temporaryManifest = `${manifestPath}.${generation.slice(generations.length + 1)}.tmp`;
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
    const inputs = new Map<string, Buffer>();
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
        let input = inputs.get(source);
        if (!input) {
          input = await readFile(source);
          inputs.set(source, input);
          // Record the bytes actually consumed, not a later filesystem timestamp.
          if (dirname(source) !== sourceRoot)
            sources.push({
              path: portablePath(relative(base, source)),
              content: iconContentHash(input),
            });
        }
        content = input.toString('utf8');
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
    }
    manifest = await withIconRoot(stagingBase, () =>
      customClonesIcons(manifest, config, true)
    );
    const blobs = new Map<string, Buffer>();
    const store = join(generations, 'sha256');
    for (const definition of Object.values(manifest.iconDefinitions ?? {})) {
      // Clone generation may override a base: hash only after all clones finish.
      const content = await readStoredIcon(
        resolve(stagingBase, definition.iconPath)
      );
      const hash = iconContentHash(content);
      const previous = blobs.get(hash);
      if (previous && !previous.equals(content))
        throw new Error('Icon content hash collision.');
      blobs.set(hash, content);
      definition.iconPath = portablePath(
        relative(base, join(store, `${hash}.svg`))
      );
    }
    // A changing user-owned source must not be recorded as a newer input than
    // the bytes used for this generation. A later activation/change can retry.
    for (const source of sources)
      if (
        iconContentHash(await readFile(resolve(base, source.path))) !==
        source.content
      )
        throw new Error('Custom icon changed during generation.');
    for (const content of blobs.values())
      await publishIconContent(content, store, generation);
    const snapshot: SnapshotManifest = {
      ...manifest,
      _materialIconTheme: {
        format: 2,
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
    await replaceIconFile(temporaryManifest, manifestPath);
  } finally {
    // Only our private staging is disposable. Another publisher may already
    // reference any shared blob, even when our own manifest publication fails.
    // Cleanup failures must not turn an already published manifest into a
    // reported generation failure, nor hide the original publication error.
    await Promise.all([
      rm(temporaryManifest, { force: true }).catch(logger.error),
      rm(generation, {
        recursive: true,
        force: true,
        maxRetries: 3,
        retryDelay: 50,
      }).catch(logger.error),
    ]);
  }
};
