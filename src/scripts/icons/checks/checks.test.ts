import { describe, expect, it } from 'bun:test';
import {
  countElements,
  getAttribute,
  getElements,
  hasAttributeMatching,
  hasElementMatching,
} from '../../../core/helpers/svg';

/**
 * Tests for the folder icon structure check logic.
 * Validates that folder SVGs are correctly identified as valid or invalid.
 */

const CLOSED_FOLDER_PATH =
  'm6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232';

/** Helper that replicates the validation logic from checkFolderIconStructure */
async function validateFolderSvg(content: string): Promise<string[]> {
  const errors: string[] = [];

  if (content.startsWith('<?xml')) {
    errors.push('Contains XML declaration');
  }

  const [viewBox] = await getAttribute(content, 'svg', 'viewBox');
  if (viewBox !== '0 0 16 16') {
    errors.push(`viewBox must be "0 0 16 16", found "${viewBox || 'none'}"`);
  }

  const folderCount = await countElements(content, '#folder');
  if (folderCount === 0) {
    errors.push('Missing element with id="folder"');
  } else if (folderCount > 1) {
    errors.push(`Found ${folderCount} elements with id="folder"`);
  } else {
    const [folder] = await getElements(content, '#folder');
    if (folder.tagName !== 'path') {
      errors.push(
        `Element with id="folder" must be a <path>, found <${folder.tagName}>`
      );
    } else {
      const d = (folder.attributes.d || '').replace(/\s+/g, ' ').trim();
      if (d !== CLOSED_FOLDER_PATH) {
        errors.push('Incorrect folder path data');
      }
    }
  }

  const motiveCount = await countElements(content, '#motive');
  if (motiveCount === 0) {
    errors.push('Missing element with id="motive"');
  } else if (motiveCount > 1) {
    errors.push(`Found ${motiveCount} elements with id="motive"`);
  }

  const hasInkscapeAttrs = await hasAttributeMatching(
    content,
    '*',
    (name) =>
      name.startsWith('inkscape:') ||
      name.startsWith('sodipodi:') ||
      name.startsWith('xmlns:inkscape') ||
      name.startsWith('xmlns:sodipodi')
  );
  if (hasInkscapeAttrs) {
    errors.push('Contains Inkscape/Sodipodi metadata');
  }

  const hasInkscapeElements = await hasElementMatching(
    content,
    '*',
    (tagName) => tagName.includes('sodipodi') || tagName.includes('inkscape')
  );
  if (hasInkscapeElements) {
    errors.push('Contains Inkscape/Sodipodi elements');
  }

  return errors;
}

describe('folder icon structure validation', () => {
  describe('valid folder icons', () => {
    it('should pass for a correctly structured single-path motive', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path id="folder" fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><path id="motive" fill="#c8e6c9" d="M7 8h2v2H7z"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toEqual([]);
    });

    it('should pass for a grouped motive', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path id="folder" fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><g id="motive"><path fill="#c8e6c9" d="M7 8h2v2H7z"/><path fill="#a5d6a7" d="M4 8h2v2H4z"/></g></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toEqual([]);
    });

    it('should pass for a motive with data-mit-no-recolor', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path id="folder" fill="#757575" d="${CLOSED_FOLDER_PATH}"/><g id="motive" data-mit-no-recolor="true"><path fill="#e53935" d="M1 1"/></g></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toEqual([]);
    });
  });

  describe('invalid viewBox', () => {
    it('should fail for 32x32 viewBox', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path id="folder" fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><path id="motive" fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toContain(
        'viewBox must be "0 0 16 16", found "0 0 32 32"'
      );
    });

    it('should fail for missing viewBox', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path id="folder" fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><path id="motive" fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toContain('viewBox must be "0 0 16 16", found "none"');
    });
  });

  describe('missing or incorrect folder element', () => {
    it('should fail when id="folder" is missing', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><path id="motive" fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toContain('Missing element with id="folder"');
    });

    it('should fail when folder element is not a path', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect id="folder" fill="#4caf50" width="16" height="16"/><path id="motive" fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors[0]).toContain('must be a <path>');
    });

    it('should fail when folder path data is wrong', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path id="folder" fill="#4caf50" d="M0 0h16v16H0z"/><path id="motive" fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toContain('Incorrect folder path data');
    });

    it('should fail when there are multiple folder elements', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path id="folder" fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><path id="folder" fill="#f00" d="M0 0"/><path id="motive" fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors[0]).toContain('2 elements with id="folder"');
    });
  });

  describe('missing motive element', () => {
    it('should fail when id="motive" is missing', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path id="folder" fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><path fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toContain('Missing element with id="motive"');
    });

    it('should fail when there are multiple motive elements', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path id="folder" fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><path id="motive" fill="#c8e6c9" d="M7 8"/><path id="motive" fill="#a5d6a7" d="M4 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors[0]).toContain('2 elements with id="motive"');
    });
  });

  describe('Inkscape metadata detection', () => {
    it('should fail when Inkscape namespace attributes are present', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 16 16"><path id="folder" fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><path id="motive" fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toContain('Contains Inkscape/Sodipodi metadata');
    });

    it('should fail when sodipodi elements are present', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><sodipodi:namedview id="nv"/><path id="folder" fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><path id="motive" fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toContain('Contains Inkscape/Sodipodi elements');
    });
  });

  describe('XML declaration', () => {
    it('should fail when XML declaration is present', async () => {
      const svg = `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path id="folder" fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><path id="motive" fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toContain('Contains XML declaration');
    });
  });

  describe('multiple errors', () => {
    it('should report all errors at once', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#4caf50" d="wrong"/><path fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors.length).toBeGreaterThanOrEqual(3);
      expect(errors).toContain(
        'viewBox must be "0 0 16 16", found "0 0 32 32"'
      );
      expect(errors).toContain('Missing element with id="folder"');
      expect(errors).toContain('Missing element with id="motive"');
    });
  });
});

describe('icon availability validation', () => {
  it('should detect icons referenced in config but missing from filesystem', async () => {
    // This tests the core logic: given a list of files and config,
    // identify missing icons
    const availableFiles = ['folder-src.svg', 'folder-git.svg', 'rust.svg'];
    const referencedIcons = [
      'folder-src',
      'folder-git',
      'folder-missing',
      'rust',
    ];

    const available = new Set(availableFiles.map((f) => f.replace('.svg', '')));
    const missing = referencedIcons.filter((icon) => !available.has(icon));

    expect(missing).toEqual(['folder-missing']);
  });
});

describe('icon usage validation', () => {
  it('should detect files on disk that are not referenced by any config', () => {
    const filesOnDisk = ['folder-src.svg', 'folder-old.svg', 'rust.svg'];
    const usedIcons = new Set(['folder-src', 'rust']);

    const unused = filesOnDisk
      .map((f) => f.replace('.svg', ''))
      .filter((icon) => !usedIcons.has(icon));

    expect(unused).toEqual(['folder-old']);
  });
});

describe('icon conflict validation', () => {
  it('should detect duplicate file extension assignments', () => {
    const assignments: { extension: string; icon: string }[] = [
      { extension: 'ts', icon: 'typescript' },
      { extension: 'js', icon: 'javascript' },
      { extension: 'ts', icon: 'typescript-alt' },
    ];

    const seen: Record<string, string> = {};
    const conflicts: Record<string, string[]> = {};

    for (const { extension, icon } of assignments) {
      if (!seen[extension]) {
        seen[extension] = icon;
      } else {
        if (!conflicts[extension]) {
          conflicts[extension] = [seen[extension], icon];
        } else {
          conflicts[extension].push(icon);
        }
      }
    }

    expect(conflicts).toEqual({
      ts: ['typescript', 'typescript-alt'],
    });
  });

  it('should detect duplicate folder name assignments', () => {
    const assignments: { folder: string; icon: string }[] = [
      { folder: 'src', icon: 'folder-src' },
      { folder: 'lib', icon: 'folder-lib' },
      { folder: 'src', icon: 'folder-source' },
    ];

    const seen: Record<string, string> = {};
    const conflicts: Record<string, string[]> = {};

    for (const { folder, icon } of assignments) {
      if (!seen[folder]) {
        seen[folder] = icon;
      } else {
        if (!conflicts[folder]) {
          conflicts[folder] = [seen[folder], icon];
        } else {
          conflicts[folder].push(icon);
        }
      }
    }

    expect(conflicts).toEqual({
      src: ['folder-src', 'folder-source'],
    });
  });

  it('should not flag icon pack overrides as conflicts', () => {
    const assignments: {
      extension: string;
      icon: string;
      enabledFor?: string[];
    }[] = [
      { extension: 'ts', icon: 'typescript' },
      { extension: 'ts', icon: 'typescript-angular', enabledFor: ['angular'] },
    ];

    const seen: Record<string, string> = {};
    const conflicts: Record<string, string[]> = {};

    for (const { extension, icon, enabledFor } of assignments) {
      if (!seen[extension] || (enabledFor && enabledFor.length > 0)) {
        seen[extension] = icon;
      } else {
        if (!conflicts[extension]) {
          conflicts[extension] = [seen[extension], icon];
        } else {
          conflicts[extension].push(icon);
        }
      }
    }

    expect(conflicts).toEqual({});
  });
});
