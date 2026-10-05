import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { rename } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  iconContentHash,
  publishIconContent,
  readStoredIcon,
  replaceIconFile,
} from '../../generator/iconContentStore';

vi.mock('node:fs/promises', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:fs/promises')>();
  return { ...actual, rename: vi.fn(actual.rename) };
});
const actual =
  await vi.importActual<typeof import('node:fs/promises')>('node:fs/promises');
let fixture: string;
let store: string;
let staging: string;
const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"/>');

beforeEach(() => {
  vi.mocked(rename).mockReset().mockImplementation(actual.rename);
  fixture = mkdtempSync(join(tmpdir(), 'material-content-test-'));
  store = join(fixture, 'sha256');
  staging = join(fixture, 'staging');
  mkdirSync(staging);
});
afterEach(() => {
  if (!fixture.startsWith(join(tmpdir(), 'material-content-test-')))
    throw new Error('Unsafe fixture path');
  rmSync(fixture, { recursive: true, force: true });
});

describe('content-addressed icons', () => {
  it('reuses identical bytes without writing or renaming the published file', async () => {
    const first = await publishIconContent(svg, store, staging);
    expect(first).toBe(join(store, `${iconContentHash(svg)}.svg`));
    expect(readFileSync(first)).toEqual(svg);
    vi.mocked(rename).mockClear();
    expect(await publishIconContent(svg, store, staging)).toBe(first);
    expect(rename).not.toHaveBeenCalled();
  });

  it('repairs corrupt bytes without deleting the published path first', async () => {
    const path = await publishIconContent(svg, store, staging);
    writeFileSync(path, 'corrupt');
    vi.mocked(rename).mockImplementation(async (from, to) => {
      expect(readFileSync(to, 'utf8')).toBe('corrupt');
      expect(readFileSync(from)).toEqual(svg);
      await actual.rename(from, to);
    });
    expect(await publishIconContent(svg, store, staging)).toBe(path);
    expect(readFileSync(path)).toEqual(svg);
  });

  it('concurrent producers publish only complete identical bytes', async () => {
    const secondStaging = join(fixture, 'second');
    mkdirSync(secondStaging);
    const paths = await Promise.all([
      publishIconContent(svg, store, staging),
      publishIconContent(svg, store, secondStaging),
    ]);
    expect(paths[0]).toBe(paths[1]);
    expect(readFileSync(paths[0])).toEqual(svg);
  });

  it('rejects directory targets instead of replacing them', async () => {
    const target = join(store, `${iconContentHash(svg)}.svg`);
    mkdirSync(target, { recursive: true });
    await expect(publishIconContent(svg, store, staging)).rejects.toThrow(
      'regular file'
    );
    await expect(readStoredIcon(target)).rejects.toThrow('regular file');
    expect(rename).not.toHaveBeenCalled();
  });

  it('retries transient rename failures with the old file still available', async () => {
    const target = join(fixture, 'manifest.json');
    const temporary = join(staging, 'manifest.tmp');
    writeFileSync(target, 'old');
    writeFileSync(temporary, 'new');
    vi.mocked(rename)
      .mockRejectedValueOnce(
        Object.assign(new Error('busy'), { code: 'EPERM' })
      )
      .mockRejectedValueOnce(
        Object.assign(new Error('busy'), { code: 'EBUSY' })
      );
    await replaceIconFile(temporary, target);
    expect(rename).toHaveBeenCalledTimes(3);
    expect(readFileSync(target, 'utf8')).toBe('new');
  });

  it('bounds retries and never deletes the previous file to make replacement work', async () => {
    const target = join(fixture, 'manifest.json');
    const temporary = join(staging, 'manifest.tmp');
    writeFileSync(target, 'old');
    writeFileSync(temporary, 'new');
    vi.mocked(rename).mockRejectedValue(
      Object.assign(new Error('locked'), { code: 'EACCES' })
    );
    await expect(replaceIconFile(temporary, target)).rejects.toThrow('locked');
    expect(rename).toHaveBeenCalledTimes(8);
    expect(readFileSync(target, 'utf8')).toBe('old');
    expect(existsSync(temporary)).toBe(true);
  });

  it('does not retry permanent IO failures', async () => {
    vi.mocked(rename).mockRejectedValue(
      Object.assign(new Error('full'), { code: 'ENOSPC' })
    );
    await expect(publishIconContent(svg, store, staging)).rejects.toThrow(
      'full'
    );
    expect(rename).toHaveBeenCalledTimes(1);
    expect(existsSync(join(store, `${iconContentHash(svg)}.svg`))).toBe(false);
  });
});
