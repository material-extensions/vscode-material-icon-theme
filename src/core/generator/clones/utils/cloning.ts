import { readFile } from 'node:fs/promises';
import { type INode, parse, stringify } from 'svgson';
import { createEmptyManifest } from '../../../models/manifest';
import { getColorList, replacementMap } from './color/colors';

/**
 * Recursively walks through an SVG node tree and its children,
 * calling a callback on each node.
 *
 * @param node - The SVG node to traverse.
 * @param callback - The callback function to call on each node.
 * @param filter - Whether to filter nodes with 'data-mit-no-recolor' attribute.
 */
export const traverse = (
  node: INode,
  callback: (node: INode) => void,
  filter: boolean = true
) => {
  if (node.attributes['data-mit-no-recolor'] !== 'true' || !filter) {
    callback(node);

    if (node.children) {
      node.children.forEach((child) => traverse(child, callback, filter));
    }
  }
};

/**
 * Reads an icon from the file system and returns its content.
 *
 * @param path - The path to the icon file.
 * @param hash - The hash to be replaced in the path if the file is not found.
 * @returns A promise that resolves to the content of the icon file.
 */
export const readIcon = async (path: string, hash: string): Promise<string> => {
  try {
    return await readFile(path, 'utf8');
  } catch {
    const unhashedPath = path.replace(hash, '');
    return await readFile(unhashedPath, 'utf8');
  }
};

/**
 * Clones an icon and changes its colors according to the clone options.
 *
 * @param path - The path to the icon file.
 * @param color - The color to replace in the icon.
 * @param hash - The hash to be replaced in the path if the file is not found.
 * @returns A promise that resolves to the content of the cloned icon.
 */
export const cloneIcon = async (
  path: string,
  color: string,
  hash = ''
): Promise<string> => {
  const baseContent = await readIcon(path, hash);
  const svg = await parse(baseContent);
  const replacements = replacementMap(color, getColorList(svg));
  replaceColors(svg, replacements);
  return stringify(svg);
};

/**
 * Gets the style attribute of an SVG node if it exists.
 *
 * @param node - The SVG node to get the style attribute from.
 * @returns The style attribute as an object.
 */
export const getStyle = (node: INode) => {
  if (node && node.attributes && node.attributes.style) {
    return parseStyle(node.attributes.style);
  }
  return {};
};

/**
 * Parses the style attribute of an SVG node.
 *
 * @param css - The style attribute as a string.
 * @returns The style attribute as an object.
 */
const parseStyle = (css: string) => {
  const rules = css.split(';');
  const result: Record<string, string> = {};
  rules.forEach((rule) => {
    const [key, value] = rule.split(':');
    result[key.trim()] = value.trim();
  });
  return result;
};

/**
 * Converts object to css style string.
 *
 * @param css - The style attribute as an object.
 * @returns The style attribute as a string.
 */
export const stringifyStyle = (css: Record<string, string>) => {
  return Object.entries(css)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
};

/**
 * Replaces colors in an SVG node using a replacement map.
 *
 * @param node - The SVG node to replace colors in.
 * @param replacements - The map of colors to replace.
 */
export const replaceColors = (
  node: INode,
  replacements: Map<string, string>
) => {
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
};

/**
 * Creates a clone configuration with empty light object.
 *
 * @returns A manifest object with empty light object.
 */
export const createCloneConfig = () => {
  const manifest = createEmptyManifest();
  manifest.light = {
    fileExtensions: {},
    fileNames: {},
    folderNames: {},
    folderNamesExpanded: {},
    languageIds: {},
  };

  return manifest;
};
