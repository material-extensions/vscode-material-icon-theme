import { describe, expect, it } from 'vitest';
import { findUnusedIcons } from './checkIconUsage';

describe('icon usage validation', () => {
  it('should detect files on disk that are not referenced by any config', () => {
    const iconsOnDisk = ['folder-src', 'folder-old', 'rust'];
    const usedIcons = new Set(['folder-src', 'rust']);

    const unused = findUnusedIcons(iconsOnDisk, usedIcons);
    expect(unused).toEqual(['folder-old']);
  });

  it('should pass when all files are referenced', () => {
    const iconsOnDisk = ['folder-src', 'rust'];
    const usedIcons = new Set(['folder-src', 'rust']);

    const unused = findUnusedIcons(iconsOnDisk, usedIcons);
    expect(unused).toEqual([]);
  });

  it('should detect multiple unused files', () => {
    const iconsOnDisk = ['folder-src', 'folder-old', 'unused', 'rust'];
    const usedIcons = new Set(['rust']);

    const unused = findUnusedIcons(iconsOnDisk, usedIcons);
    expect(unused).toEqual(['folder-src', 'folder-old', 'unused']);
  });
});
