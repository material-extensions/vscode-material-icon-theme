import { describe, expect, it } from 'vitest';
import {
  countElements,
  getAttribute,
  getElements,
  hasAttributeMatching,
  hasElementMatching,
  replaceAttribute,
} from '../../helpers/svg';

const SIMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path id="folder" fill="#4caf50" d="m6.922 3.768"/><path id="motive" fill="#c8e6c9" d="M7 8h2v2H7z"/></svg>`;

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
});
