import { readFileSync } from 'fs';
import { INode, parseSync, stringify } from 'svgson';
import { CustomClone, IconConfiguration } from '../../../../models';
import { getColorList, replacementMap } from './color/colors';

export function traverse(node: INode, callback: (node: INode) => void) {
  callback(node);
  if (node.children) {
    node.children.forEach((child) => traverse(child, callback));
  }
}

export function readIcon(path: string, hash: string): string {
  try {
    return readFileSync(path, 'utf8');
  } catch (error) {
    const unhashedPath = path.replace(hash, '');
    return readFileSync(unhashedPath, 'utf8');
  }
}

export function cloneIcon(
  path: string,
  hash: string,
  cloneOpts: CustomClone
): string {
  const baseContent = readIcon(path, hash);
  const svg = parseSync(baseContent);
  const replacements = replacementMap(cloneOpts.color, getColorList(svg));
  replaceColors(svg, replacements);
  return stringify(svg);
}

export function getStyle(node: INode) {
  if (node && node.attributes && node.attributes.style) {
    return parseStyle(node.attributes.style);
  }
  return {};
}

function parseStyle(css: string) {
  const rules = css.split(';');
  const result: Record<string, string> = {};
  rules.forEach((rule) => {
    const [key, value] = rule.split(':');
    result[key.trim()] = value.trim();
  });
  return result;
}

export function stringifyStyle(css: Record<string, string>) {
  return Object.entries(css)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
}

export function replaceColors(node: INode, replacements: Map<string, string>) {
  traverse(node, (node) => {
    // replace colors in style attribute
    const style = getStyle(node);
    if (style) {
      if (style.fill && replacements.has(style.fill)) {
        style.fill = replacements.get(style.fill)!;
        node.attributes.style = stringifyStyle(style);
      }

      if (style.stroke && replacements.has(style.stroke)) {
        style.stroke = replacements.get(style.stroke)!;
        node.attributes.style = stringifyStyle(style);
      }
    }

    // replace colors in attributes
    if (node.attributes) {
      if (node.attributes.fill && replacements.has(node.attributes.fill)) {
        node.attributes.fill = replacements.get(node.attributes.fill)!;
      }

      if (node.attributes.stroke && replacements.has(node.attributes.stroke)) {
        node.attributes.stroke = replacements.get(node.attributes.stroke)!;
      }

      if (
        node.attributes['stop-color'] &&
        replacements.has(node.attributes['stop-color'])
      ) {
        node.attributes['stop-color'] = replacements.get(
          node.attributes['stop-color']
        )!;
      }
    }
  });
}

export function createCloneConfig() {
  const config = new IconConfiguration();
  config.light = {
    fileExtensions: {},
    fileNames: {},
    folderNames: {},
    folderNamesExpanded: {},
  };

  return config;
}
