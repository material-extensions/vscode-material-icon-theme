import { createHash } from 'node:crypto';
import { lstat, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { setTimeout } from 'node:timers/promises';
import { logger } from '../logging/logger';

/** Hash the exact bytes served to VS Code, not settings or a package version. */
export const iconContentHash = (content: Buffer): string =>
  createHash('sha256').update(content).digest('hex');

/** Windows readers/virus scanners can briefly prevent replacing a closed file. */
export const replaceIconFile = async (temporary: string, target: string) => {
  for (let attempt = 0; ; attempt++) {
    try {
      await rename(temporary, target);
      return;
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      logger.debug(`Icon rename attempt ${attempt + 1}: ${String(error)}`);
      if (attempt === 7 || !['EPERM', 'EACCES', 'EBUSY'].includes(code ?? ''))
        throw error;
      // Avoid repeatedly colliding with another writer or a periodic reader.
      await setTimeout(20 * 2 ** attempt + Math.floor(Math.random() * 20));
    }
  }
};

/** Do not follow a substituted symlink or treat a directory as a stored icon. */
export const readStoredIcon = async (path: string): Promise<Buffer> => {
  if (!(await lstat(path)).isFile())
    throw new Error('Stored icon must be a regular file.');
  return readFile(path);
};

/**
 * A published path always contains complete bytes. Concurrent writers of the
 * same hash may atomically replace it with identical bytes, never partial data.
 * Published files are shared immediately and must never be rolled back/deleted.
 */
export const publishIconContent = async (
  content: Buffer,
  store: string,
  temporaryDirectory: string
): Promise<string> => {
  const hash = iconContentHash(content);
  const path = join(store, `${hash}.svg`);
  try {
    const existing = await readStoredIcon(path);
    if (existing.equals(content)) return path;
    if (iconContentHash(existing) === hash)
      throw new Error('Icon content hash collision.');
    // An externally corrupted file can be repaired with its original bytes.
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
  await mkdir(store, { recursive: true });
  const temporary = join(temporaryDirectory, `${hash}.tmp`);
  await writeFile(temporary, content, { flag: 'wx' });
  await replaceIconFile(temporary, path);
  return path;
};
