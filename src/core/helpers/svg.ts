/**
 * SVG manipulation helpers built on top of Bun's HTMLRewriter.
 *
 * Provides a simple API for reading, modifying, and querying SVG files
 * without external dependencies.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

/** Collected information about an SVG element during rewriting. */
export interface SvgElementInfo {
  tagName: string;
  attributes: Record<string, string>;
}

// ─── Core Helpers ────────────────────────────────────────────────────────────

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
  const rewriter = new HTMLRewriter().on(selector, {
    element(el) {
      el.setAttribute(attribute, newValue);
    },
  });
  return rewriter.transform(new Response(svg)).text();
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
  const values: string[] = [];
  const rewriter = new HTMLRewriter().on(selector, {
    element(el) {
      const val = el.getAttribute(attribute);
      if (val !== null) {
        values.push(val);
      }
    },
  });
  await rewriter.transform(new Response(svg)).text();
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
  let count = 0;
  const rewriter = new HTMLRewriter().on(selector, {
    element() {
      count++;
    },
  });
  await rewriter.transform(new Response(svg)).text();
  return count;
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
  const elements: SvgElementInfo[] = [];
  const rewriter = new HTMLRewriter().on(selector, {
    element(el) {
      const attributes: Record<string, string> = {};
      for (const [name, value] of el.attributes) {
        attributes[name] = value;
      }
      elements.push({ tagName: el.tagName, attributes });
    },
  });
  await rewriter.transform(new Response(svg)).text();
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
  let found = false;
  const rewriter = new HTMLRewriter().on(selector, {
    element(el) {
      if (found) return;
      for (const [name, value] of el.attributes) {
        if (predicate(name, value)) {
          found = true;
          return;
        }
      }
    },
  });
  await rewriter.transform(new Response(svg)).text();
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
  let found = false;
  const rewriter = new HTMLRewriter().on(selector, {
    element(el) {
      if (found) return;
      if (predicate(el.tagName)) {
        found = true;
      }
    },
  });
  await rewriter.transform(new Response(svg)).text();
  return found;
}
