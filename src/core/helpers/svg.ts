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

/** Options for collecting colors from an SVG. */
export interface CollectColorsOptions {
  /** Whether to respect data-mit-no-recolor="true" attributes. Default: true */
  respectNoRecolor?: boolean;
}

/** A map of attribute replacements to apply (attribute name -> old value -> new value). */
export type ColorReplacements = Map<string, string>;

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

// ─── Color Helpers (for clone system) ────────────────────────────────────────

/**
 * Collect all colors used in an SVG (from fill, stroke, stop-color attributes
 * and inline style).
 *
 * Respects `data-mit-no-recolor="true"` — elements inside such groups are skipped.
 *
 * @example
 * ```ts
 * const colors = await collectColors(svg);
 * // Set { '#757575', '#c8e6c9' }
 * ```
 */
export async function collectColors(
  svg: string,
  options: CollectColorsOptions = {}
): Promise<Set<string>> {
  const { respectNoRecolor = true } = options;
  const colors = new Set<string>();
  let noRecolorDepth = 0;

  const rewriter = new HTMLRewriter().on('*', {
    element(el) {
      if (respectNoRecolor) {
        if (noRecolorDepth > 0) {
          // Track nested end tags for elements inside no-recolor zones
          try {
            el.onEndTag(() => {});
          } catch {
            // Self-closing — no action needed
          }
          return;
        }

        if (el.getAttribute('data-mit-no-recolor') === 'true') {
          // Skip this element and its children
          noRecolorDepth++;
          try {
            el.onEndTag(() => {
              noRecolorDepth--;
            });
          } catch {
            // Self-closing element — decrement immediately (no children)
            noRecolorDepth--;
          }
          return;
        }
      }

      // Check direct attributes
      const fill = el.getAttribute('fill');
      if (fill && isColorValue(fill)) colors.add(fill);

      const stroke = el.getAttribute('stroke');
      if (stroke && isColorValue(stroke)) colors.add(stroke);

      const stopColor = el.getAttribute('stop-color');
      if (stopColor && isColorValue(stopColor)) colors.add(stopColor);

      // Check inline style
      const style = el.getAttribute('style');
      if (style) {
        const styleColors = extractColorsFromStyle(style);
        for (const c of styleColors) colors.add(c);
      }
    },
  });

  await rewriter.transform(new Response(svg)).text();
  return colors;
}

/**
 * Replace colors in an SVG using a replacement map.
 *
 * Respects `data-mit-no-recolor="true"` — elements inside such groups are not modified.
 *
 * @example
 * ```ts
 * const replacements = new Map([['#757575', '#2196f3'], ['#c8e6c9', '#bbdefb']]);
 * const result = await replaceColors(svg, replacements);
 * ```
 */
export async function replaceColors(
  svg: string,
  replacements: ColorReplacements
): Promise<string> {
  let noRecolorDepth = 0;

  const rewriter = new HTMLRewriter().on('*', {
    element(el) {
      if (noRecolorDepth > 0) {
        try {
          el.onEndTag(() => {});
        } catch {
          // Self-closing — no action needed
        }
        return;
      }

      if (el.getAttribute('data-mit-no-recolor') === 'true') {
        noRecolorDepth++;
        try {
          el.onEndTag(() => {
            noRecolorDepth--;
          });
        } catch {
          // Self-closing element — decrement immediately
          noRecolorDepth--;
        }
        return;
      }

      // Replace direct attributes
      const fill = el.getAttribute('fill');
      if (fill && replacements.has(fill)) {
        el.setAttribute('fill', replacements.get(fill)!);
      }

      const stroke = el.getAttribute('stroke');
      if (stroke && replacements.has(stroke)) {
        el.setAttribute('stroke', replacements.get(stroke)!);
      }

      const stopColor = el.getAttribute('stop-color');
      if (stopColor && replacements.has(stopColor)) {
        el.setAttribute('stop-color', replacements.get(stopColor)!);
      }

      // Replace in inline style
      const style = el.getAttribute('style');
      if (style) {
        const newStyle = replaceColorsInStyle(style, replacements);
        if (newStyle !== style) {
          el.setAttribute('style', newStyle);
        }
      }
    },
  });

  return rewriter.transform(new Response(svg)).text();
}

// ─── Internal Utilities ──────────────────────────────────────────────────────

/** Check if a string looks like a color value (hex, rgb, named). */
function isColorValue(value: string): boolean {
  return (
    value.startsWith('#') ||
    value.startsWith('rgb') ||
    /^[a-z]{3,}$/i.test(value)
  );
}

/** Extract color values from a CSS style string. */
function extractColorsFromStyle(style: string): string[] {
  const colors: string[] = [];
  const colorProps = ['fill', 'stroke', 'stop-color'];

  for (const prop of colorProps) {
    const regex = new RegExp(`${prop}\\s*:\\s*([^;]+)`, 'i');
    const match = style.match(regex);
    if (match) {
      const value = match[1].trim();
      if (isColorValue(value)) {
        colors.push(value);
      }
    }
  }

  return colors;
}

/** Replace color values within a CSS style string. */
function replaceColorsInStyle(
  style: string,
  replacements: ColorReplacements
): string {
  let result = style;
  const colorProps = ['fill', 'stroke', 'stop-color'];

  for (const prop of colorProps) {
    const regex = new RegExp(`(${prop}\\s*:\\s*)([^;]+)`, 'i');
    const match = result.match(regex);
    if (match) {
      const value = match[2].trim();
      if (replacements.has(value)) {
        result = result.replace(regex, `$1${replacements.get(value)!}`);
      }
    }
  }

  return result;
}
