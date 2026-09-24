import chroma from 'chroma-js';

export type ColorReplacements = Map<string, string>;

export interface CollectColorsOptions {
  respectNoRecolor?: boolean;
}

const colorProperties = ['fill', 'stroke', 'stop-color'];

export function collectColors(
  svg: string,
  options: CollectColorsOptions = {}
): Set<string> {
  const { respectNoRecolor = true } = options;
  const content = respectNoRecolor ? stripNoRecolorElements(svg) : svg;
  const colors = new Set<string>();

  for (const prop of colorProperties) {
    for (const m of content.matchAll(xmlAttribute(prop))) {
      if (chroma.valid(m[1])) colors.add(m[1]);
    }
    for (const m of content.matchAll(cssProperty(prop))) {
      const value = m[1].trim();
      if (chroma.valid(value)) colors.add(value);
    }
  }

  return colors;
}

export function replaceColors(
  svg: string,
  replacements: ColorReplacements
): string {
  if (replacements.size === 0) return svg;

  const noRecolorRanges = getNoRecolorRanges(svg);

  let result = svg;
  for (const prop of colorProperties) {
    result = result.replace(
      xmlAttributeWithCaptures(prop),
      (full, before, value, after, offset) => {
        if (isInsideRanges(offset, noRecolorRanges)) return full;
        return replacements.has(value)
          ? before + replacements.get(value)! + after
          : full;
      }
    );
    result = result.replace(
      cssPropertyWithCaptures(prop),
      (full, before, value, offset) => {
        if (isInsideRanges(offset, noRecolorRanges)) return full;
        const trimmed = value.trim();
        return replacements.has(trimmed)
          ? before + replacements.get(trimmed)!
          : full;
      }
    );
  }

  return result;
}

function xmlAttribute(prop: string): RegExp {
  return new RegExp(`\\b${prop}="([^"]*)"`, 'gi');
}

function xmlAttributeWithCaptures(prop: string): RegExp {
  return new RegExp(`(\\b${prop}=")([^"]*)(")`, 'gi');
}

function cssProperty(prop: string): RegExp {
  return new RegExp(`(?<![\\w-])${prop}\\s*:\\s*([^;}"]+)`, 'gi');
}

function cssPropertyWithCaptures(prop: string): RegExp {
  return new RegExp(`((?<![\\w-])${prop}\\s*:\\s*)([^;}"]+)`, 'gi');
}

function stripNoRecolorElements(svg: string): string {
  const ranges = getNoRecolorRanges(svg);
  if (ranges.length === 0) return svg;

  let result = svg;
  for (let i = ranges.length - 1; i >= 0; i--) {
    result = result.slice(0, ranges[i].start) + result.slice(ranges[i].end);
  }
  return result;
}

interface TextRange {
  start: number;
  end: number;
}

function getNoRecolorRanges(svg: string): TextRange[] {
  const ranges: TextRange[] = [];
  const attr = 'data-mit-no-recolor="true"';
  let cursor = 0;

  while (true) {
    const attrIndex = svg.indexOf(attr, cursor);
    if (attrIndex === -1) break;

    const tagStart = svg.lastIndexOf('<', attrIndex);
    if (tagStart === -1) {
      cursor = attrIndex + attr.length;
      continue;
    }

    const openTagEnd = svg.indexOf('>', attrIndex);
    if (openTagEnd === -1) {
      cursor = attrIndex + attr.length;
      continue;
    }

    if (svg[openTagEnd - 1] === '/') {
      ranges.push({ start: tagStart, end: openTagEnd + 1 });
      cursor = openTagEnd + 1;
    } else {
      const tagName = svg.slice(tagStart + 1, svg.indexOf(' ', tagStart + 1));
      const closingTag = `</${tagName}>`;
      const closingIndex = svg.indexOf(closingTag, openTagEnd);
      const end =
        closingIndex === -1 ? openTagEnd + 1 : closingIndex + closingTag.length;
      ranges.push({ start: tagStart, end });
      cursor = end;
    }
  }

  return ranges;
}

function isInsideRanges(position: number, ranges: TextRange[]): boolean {
  return ranges.some((r) => position >= r.start && position < r.end);
}
