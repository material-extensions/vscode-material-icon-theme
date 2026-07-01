import * as cheerio from 'cheerio';

/** Collected information about an SVG element during rewriting. */
export interface SvgElementInfo {
  tagName: string;
  attributes: Record<string, string>;
}

/**
 * Replace an attribute value on elements matching a CSS selector.
 *
 * @example
 * ```ts
 * const open = await replaceAttribute(svg, '#folder', 'd', OPEN_PATH);
 * ```
 */
export async function replaceAttribute(
  svg: string,
  selector: string,
  attribute: string,
  newValue: string
): Promise<string> {
  const $ = cheerio.load(svg, { xmlMode: true });
  $(selector).attr(attribute, newValue);
  return $.xml();
}

/**
 * Read attribute values from elements matching a CSS selector.
 * Returns an array of values (one per matching element).
 *
 * @example
 * ```ts
 * const [viewBox] = await getAttribute(svg, 'svg', 'viewBox');
 * const [d] = await getAttribute(svg, '#folder', 'd');
 * ```
 */
export async function getAttribute(
  svg: string,
  selector: string,
  attribute: string
): Promise<string[]> {
  const $ = cheerio.load(svg, { xmlMode: true });
  const values: string[] = [];
  $(selector).each((_, el) => {
    const val = $(el).attr(attribute);
    if (val !== undefined && val !== null) {
      values.push(val);
    }
  });
  return values;
}

/**
 * Check if elements matching a selector exist in the SVG.
 * Returns the count of matching elements.
 *
 * @example
 * ```ts
 * const count = await countElements(svg, '#folder');
 * ```
 */
export async function countElements(
  svg: string,
  selector: string
): Promise<number> {
  const $ = cheerio.load(svg, { xmlMode: true });
  return $(selector).length;
}

/**
 * Get info about elements matching a selector (tag name + all attributes).
 *
 * @example
 * ```ts
 * const [folder] = await getElements(svg, '#folder');
 * // folder.tagName === 'path'
 * // folder.attributes.d === '...'
 * ```
 */
export async function getElements(
  svg: string,
  selector: string
): Promise<SvgElementInfo[]> {
  const $ = cheerio.load(svg, { xmlMode: true });
  const elements: SvgElementInfo[] = [];
  $(selector).each((_, el) => {
    const attributes: Record<string, string> = {};
    if ('attribs' in el) {
      for (const [name, value] of Object.entries(el.attribs)) {
        attributes[name] = value;
      }
    }
    elements.push({ tagName: el.type === 'tag' ? el.name : '', attributes });
  });
  return elements;
}

/**
 * Check if an SVG contains elements with specific attributes
 * (e.g. Inkscape/Sodipodi metadata).
 *
 * @example
 * ```ts
 * const has = await hasAttributeMatching(svg, '*', (name) =>
 *   name.startsWith('inkscape:') || name.startsWith('sodipodi:')
 * );
 * ```
 */
export async function hasAttributeMatching(
  svg: string,
  selector: string,
  predicate: (attrName: string, attrValue: string) => boolean
): Promise<boolean> {
  const $ = cheerio.load(svg, { xmlMode: true });
  let found = false;
  $(selector).each((_, el) => {
    if (found) return false;
    if ('attribs' in el) {
      for (const [name, value] of Object.entries(el.attribs)) {
        if (predicate(name, value)) {
          found = true;
          return false;
        }
      }
    }
  });
  return found;
}

/**
 * Check if SVG contains elements whose tag name matches a predicate.
 */
export async function hasElementMatching(
  svg: string,
  selector: string,
  predicate: (tagName: string) => boolean
): Promise<boolean> {
  const $ = cheerio.load(svg, { xmlMode: true });
  let found = false;
  $(selector).each((_, el) => {
    if (found) return false;
    if (el.type === 'tag' && predicate(el.name)) {
      found = true;
      return false;
    }
  });
  return found;
}
