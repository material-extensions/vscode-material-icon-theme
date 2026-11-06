import { describe, expect, it } from 'vitest';
import { findMissingIcons } from './checkIconAvailability';

describe('icon availability validation', () => {
  it('should detect icons referenced in config but missing from filesystem', () => {
    const available = new Set(['folder-src', 'folder-git', 'rust']);
    const expected = ['folder-src', 'folder-git', 'folder-missing', 'rust'];

    const missing = findMissingIcons(available, expected);
    expect(missing).toEqual(['folder-missing']);
  });

  it('should pass when all referenced icons exist', () => {
    const available = new Set(['folder-src', 'rust']);
    const expected = ['folder-src', 'rust'];

    const missing = findMissingIcons(available, expected);
    expect(missing).toEqual([]);
  });

  it('should detect multiple missing icons', () => {
    const available = new Set(['rust']);
    const expected = ['folder-src', 'folder-git', 'rust'];

    const missing = findMissingIcons(available, expected);
    expect(missing).toEqual(['folder-src', 'folder-git']);
  });
});
