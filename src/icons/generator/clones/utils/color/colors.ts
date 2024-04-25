import { INode } from 'svgson';
import { getStyle, traverse } from '../cloning';
import chroma, { valid } from 'chroma-js';
import {
  closerMaterialColorTo,
  getMaterialColorByKey,
} from './material-palette';

export function getColorList(node: INode) {
  const colors = new Set<string>();

  traverse(node, (node) => {
    // check colors in style attribute
    const style = getStyle(node);
    if (style) {
      if (style.fill && isValidColor(style.fill)) {
        colors.add(style.fill);
      }

      if (style.stroke && isValidColor(style.stroke)) {
        colors.add(style.stroke);
      }
    }

    // check colors in attributes
    if (node.attributes) {
      if (node.attributes.fill && isValidColor(node.attributes.fill)) {
        colors.add(node.attributes.fill);
      }

      if (node.attributes.stroke && isValidColor(node.attributes.stroke)) {
        colors.add(node.attributes.stroke);
      }

      if (
        node.attributes['stop-color'] &&
        isValidColor(node.attributes['stop-color'])
      ) {
        colors.add(node.attributes['stop-color']);
      }
    }
  });

  return colors;
}

function orderDarkToLight(colors: Set<string>) {
  const colorArray = Array.from(colors);
  return colorArray.sort((a, b) => {
    const colorA = chroma(a);
    const colorB = chroma(b);

    // determine which one is darker based on saturation and lightness
    const aDarkness = colorA.get('hsl.l') * colorA.get('hsl.s');
    const bDarkness = colorB.get('hsl.l') * colorB.get('hsl.s');

    return aDarkness - bDarkness;
  });
}

export function isValidColor(hexColor: string | undefined): boolean {
  if (hexColor === undefined) {
    return false;
  }
  return valid(hexColor);
}

/**
 * receives a base color and a list of colors, orders the list of colors from dark to light
 * and replaces the darkest color (first in the list) with the base color, then grabs the hue
 * of the base color and applies it to the rest of the colors in the list.
 */
export function replacementMap(baseColor: string, colors: Set<string>) {
  if (!isValidColor(baseColor)) {
    // try to get it from the material palette by key
    const matCol = getMaterialColorByKey(baseColor);
    if (matCol === undefined) {
      throw new Error(`Invalid color: ${baseColor}`);
    }

    baseColor = matCol;
  }

  const orderedColors = orderDarkToLight(colors);
  const baseColorChroma = chroma(baseColor);
  const baseHue = baseColorChroma.get('hsl.h');

  const replacement = new Map<string, string>();
  replacement.set(orderedColors[0], baseColor);

  for (let i = 1; i < orderedColors.length; i++) {
    const color = chroma(orderedColors[i]);
    const newColor = color.set('hsl.h', baseHue).hex();
    const matCol = closerMaterialColorTo(newColor);
    replacement.set(orderedColors[i], matCol);
  }

  return replacement;
}
