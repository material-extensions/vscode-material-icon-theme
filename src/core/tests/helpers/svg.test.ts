import { describe, expect, it } from 'bun:test';
import {
  collectColors,
  countElements,
  getAttribute,
  getElements,
  hasAttributeMatching,
  hasElementMatching,
  replaceAttribute,
  replaceColors,
} from '../../helpers/svg';

const SIMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path id="folder" fill="#4caf50" d="m6.922 3.768"/><path id="motive" fill="#c8e6c9" d="M7 8h2v2H7z"/></svg>`;

const GROUPED_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path id="folder" fill="#757575" d="m6.922 3.768"/><g id="motive" data-mit-no-recolor="true"><path fill="#e53935" d="M1 1"/><path fill="#ef6c00" d="M2 2"/></g></svg>`;

const STYLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><polygon style="fill:#4caf50" points="12 8 12 6"/><polygon style="fill:#c8e6c9;stroke:#000" points="20 12"/></svg>`;

const INKSCAPE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 16 16"><sodipodi:namedview id="nv"/><path id="folder" fill="#4caf50" d="test"/></svg>`;

describe('SVG helpers', () => {
  describe('replaceAttribute', () => {
    it('should replace an attribute on an element matching a selector', async () => {
      const result = await replaceAttribute(
        SIMPLE_SVG,
        '#folder',
        'd',
        'M14.483 6H4.721'
      );
      expect(result).toContain('d="M14.483 6H4.721"');
      expect(result).not.toContain('d="m6.922 3.768"');
    });

    it('should not modify elements that do not match the selector', async () => {
      const result = await replaceAttribute(
        SIMPLE_SVG,
        '#folder',
        'd',
        'NEW_PATH'
      );
      expect(result).toContain('d="M7 8h2v2H7z"');
    });

    it('should replace attribute on multiple matching elements', async () => {
      const svg = `<svg><path class="x" fill="red"/><path class="x" fill="blue"/></svg>`;
      const result = await replaceAttribute(svg, '.x', 'fill', 'green');
      expect(result).not.toContain('red');
      expect(result).not.toContain('blue');
    });
  });

  describe('getAttribute', () => {
    it('should return attribute values from matching elements', async () => {
      const [viewBox] = await getAttribute(SIMPLE_SVG, 'svg', 'viewBox');
      expect(viewBox).toBe('0 0 16 16');
    });

    it('should return the d attribute from #folder', async () => {
      const [d] = await getAttribute(SIMPLE_SVG, '#folder', 'd');
      expect(d).toBe('m6.922 3.768');
    });

    it('should return empty array if no match', async () => {
      const result = await getAttribute(SIMPLE_SVG, '#nonexistent', 'd');
      expect(result).toEqual([]);
    });

    it('should return multiple values for multiple matches', async () => {
      const svg = `<svg><path class="x" d="a"/><path class="x" d="b"/></svg>`;
      const result = await getAttribute(svg, '.x', 'd');
      expect(result).toEqual(['a', 'b']);
    });
  });

  describe('countElements', () => {
    it('should count matching elements', async () => {
      const count = await countElements(SIMPLE_SVG, 'path');
      expect(count).toBe(2);
    });

    it('should return 1 for unique id', async () => {
      const count = await countElements(SIMPLE_SVG, '#folder');
      expect(count).toBe(1);
    });

    it('should return 0 for no matches', async () => {
      const count = await countElements(SIMPLE_SVG, '#nonexistent');
      expect(count).toBe(0);
    });
  });

  describe('getElements', () => {
    it('should return element info for matching selector', async () => {
      const [folder] = await getElements(SIMPLE_SVG, '#folder');
      expect(folder.tagName).toBe('path');
      expect(folder.attributes.fill).toBe('#4caf50');
      expect(folder.attributes.id).toBe('folder');
      expect(folder.attributes.d).toBe('m6.922 3.768');
    });

    it('should return empty array for no match', async () => {
      const result = await getElements(SIMPLE_SVG, '#missing');
      expect(result).toEqual([]);
    });
  });

  describe('hasAttributeMatching', () => {
    it('should detect Inkscape attributes', async () => {
      const result = await hasAttributeMatching(INKSCAPE_SVG, '*', (name) =>
        name.startsWith('xmlns:inkscape')
      );
      expect(result).toBe(true);
    });

    it('should return false when no matching attributes', async () => {
      const result = await hasAttributeMatching(SIMPLE_SVG, '*', (name) =>
        name.startsWith('inkscape:')
      );
      expect(result).toBe(false);
    });
  });

  describe('hasElementMatching', () => {
    it('should detect sodipodi elements', async () => {
      const result = await hasElementMatching(INKSCAPE_SVG, '*', (tagName) =>
        tagName.includes('sodipodi')
      );
      expect(result).toBe(true);
    });

    it('should return false when no matching elements', async () => {
      const result = await hasElementMatching(SIMPLE_SVG, '*', (tagName) =>
        tagName.includes('sodipodi')
      );
      expect(result).toBe(false);
    });
  });

  describe('collectColors', () => {
    it('should collect colors from fill attributes', async () => {
      const colors = await collectColors(SIMPLE_SVG);
      expect(colors.has('#4caf50')).toBe(true);
      expect(colors.has('#c8e6c9')).toBe(true);
      expect(colors.size).toBe(2);
    });

    it('should collect colors from inline styles', async () => {
      const colors = await collectColors(STYLE_SVG);
      expect(colors.has('#4caf50')).toBe(true);
      expect(colors.has('#c8e6c9')).toBe(true);
      expect(colors.has('#000')).toBe(true);
    });

    it('should respect data-mit-no-recolor by default', async () => {
      const colors = await collectColors(GROUPED_SVG);
      expect(colors.has('#757575')).toBe(true);
      expect(colors.has('#e53935')).toBe(false);
      expect(colors.has('#ef6c00')).toBe(false);
    });

    it('should collect all colors when respectNoRecolor is false', async () => {
      const colors = await collectColors(GROUPED_SVG, {
        respectNoRecolor: false,
      });
      expect(colors.has('#757575')).toBe(true);
      expect(colors.has('#e53935')).toBe(true);
      expect(colors.has('#ef6c00')).toBe(true);
    });

    it('should handle self-closing elements with data-mit-no-recolor', async () => {
      const svg = `<svg><path fill="#aaa" d="ok"/><path data-mit-no-recolor="true" fill="#bbb" d="skip"/><path fill="#ccc" d="ok2"/></svg>`;
      const colors = await collectColors(svg);
      expect(colors.has('#aaa')).toBe(true);
      expect(colors.has('#bbb')).toBe(false);
      expect(colors.has('#ccc')).toBe(true);
    });

    it('should collect stop-color from gradient stops', async () => {
      const svg = `<svg><defs><linearGradient><stop stop-color="#ff0000"/><stop stop-color="#00ff00"/></linearGradient></defs></svg>`;
      const colors = await collectColors(svg);
      expect(colors.has('#ff0000')).toBe(true);
      expect(colors.has('#00ff00')).toBe(true);
    });
  });

  describe('replaceColors', () => {
    it('should replace fill attribute colors', async () => {
      const replacements = new Map([
        ['#4caf50', '#2196f3'],
        ['#c8e6c9', '#bbdefb'],
      ]);
      const result = await replaceColors(SIMPLE_SVG, replacements);
      expect(result).toContain('fill="#2196f3"');
      expect(result).toContain('fill="#bbdefb"');
      expect(result).not.toContain('#4caf50');
      expect(result).not.toContain('#c8e6c9');
    });

    it('should replace colors in inline styles', async () => {
      const replacements = new Map([['#4caf50', '#2196f3']]);
      const result = await replaceColors(STYLE_SVG, replacements);
      expect(result).toContain('#2196f3');
      expect(result).not.toContain('#4caf50');
    });

    it('should respect data-mit-no-recolor', async () => {
      const replacements = new Map([
        ['#757575', '#2196f3'],
        ['#e53935', '#0000ff'],
      ]);
      const result = await replaceColors(GROUPED_SVG, replacements);
      expect(result).toContain('#2196f3');
      // Colors inside no-recolor group should be unchanged
      expect(result).toContain('#e53935');
      expect(result).toContain('#ef6c00');
    });

    it('should handle self-closing elements with data-mit-no-recolor', async () => {
      const svg = `<svg><path fill="#aaa" d="ok"/><path data-mit-no-recolor="true" fill="#aaa" d="skip"/></svg>`;
      const replacements = new Map([['#aaa', '#bbb']]);
      const result = await replaceColors(svg, replacements);
      // First path should be replaced, second should not
      expect(result).toContain('fill="#bbb"');
      expect(result).toContain('fill="#aaa"');
    });

    it('should not modify colors that are not in the replacement map', async () => {
      const replacements = new Map([['#4caf50', '#2196f3']]);
      const result = await replaceColors(SIMPLE_SVG, replacements);
      expect(result).toContain('#c8e6c9'); // unchanged
    });
  });
});
