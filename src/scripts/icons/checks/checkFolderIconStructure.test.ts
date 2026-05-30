import { describe, expect, it } from 'bun:test';
import { validateFolderSvg } from './checkFolderIconStructure';

const CLOSED_FOLDER_PATH =
  'm6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232';

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
      expect(errors).toContain(
        'Element with id="folder" has incorrect path data (must use the canonical closed folder path)'
      );
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
      expect(errors).toContain(
        'Contains Inkscape/Sodipodi metadata (please clean with SVGO or remove manually)'
      );
    });

    it('should fail when sodipodi elements are present', async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><sodipodi:namedview id="nv"/><path id="folder" fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><path id="motive" fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toContain(
        'Contains Inkscape/Sodipodi elements (please remove manually)'
      );
    });
  });

  describe('XML declaration', () => {
    it('should fail when XML declaration is present', async () => {
      const svg = `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path id="folder" fill="#4caf50" d="${CLOSED_FOLDER_PATH}"/><path id="motive" fill="#c8e6c9" d="M7 8"/></svg>`;
      const errors = await validateFolderSvg(svg);
      expect(errors).toContain(
        'Contains XML declaration (<?xml ...?>), which should be removed'
      );
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
