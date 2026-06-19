import { describe, expect, it } from 'bun:test';
import { findDotPrefixedFolderNames } from './checkFolderNameDots';

describe('folder name dot prefix validation', () => {
  it('should detect dot-prefixed folder names', () => {
    const violations = findDotPrefixedFolderNames([
      { name: 'folder-rust', folderNames: ['rust', '.cargo'] },
    ]);

    expect(violations).toEqual([
      { iconName: 'folder-rust', folderName: '.cargo' },
    ]);
  });

  it('should detect dot-prefixed root folder names', () => {
    const violations = findDotPrefixedFolderNames([
      { name: 'folder-git', rootFolderNames: ['.git'] },
    ]);

    expect(violations).toEqual([
      { iconName: 'folder-git', folderName: '.git' },
    ]);
  });

  it('should not flag names without dots', () => {
    const violations = findDotPrefixedFolderNames([
      { name: 'folder-src', folderNames: ['src', 'source'] },
      { name: 'folder-lib', folderNames: ['lib', 'libs'] },
    ]);

    expect(violations).toEqual([]);
  });

  it('should report multiple violations across icons', () => {
    const violations = findDotPrefixedFolderNames([
      { name: 'folder-rust', folderNames: ['rust', '.cargo'] },
      { name: 'folder-claude', folderNames: ['.claude'] },
      { name: 'folder-src', folderNames: ['src'] },
    ]);

    expect(violations).toEqual([
      { iconName: 'folder-rust', folderName: '.cargo' },
      { iconName: 'folder-claude', folderName: '.claude' },
    ]);
  });

  it('should handle icons with no folder names', () => {
    const violations = findDotPrefixedFolderNames([
      { name: 'folder-empty' },
      { name: 'folder-src', folderNames: [] },
    ]);

    expect(violations).toEqual([]);
  });

  it('should detect dots in both folderNames and rootFolderNames', () => {
    const violations = findDotPrefixedFolderNames([
      {
        name: 'folder-mixed',
        folderNames: ['.hidden'],
        rootFolderNames: ['.root'],
      },
    ]);

    expect(violations).toEqual([
      { iconName: 'folder-mixed', folderName: '.hidden' },
      { iconName: 'folder-mixed', folderName: '.root' },
    ]);
  });
});
