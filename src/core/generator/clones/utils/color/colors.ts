import chroma, { type Color, valid } from 'chroma-js';
import { type INode } from 'svgson';
import { getStyle, traverse } from '../cloning';
import {
  closerMaterialColorTo,
  getMaterialColorByKey,
} from './materialPalette';

/** Get all the colors used in the SVG node as a `Set` list. **/
export const getColorList = (node: INode) => {
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

    // check colors in svg attributes
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
};

/** given a set of colors, orders them from dark to light. **/
export const orderDarkToLight = (colors: Set<string>) => {
  const colorArray = Array.from(colors);
  return colorArray.sort((a, b) => {
    // sort by lightness
    const lA = chroma(a).get('hsl.l');
    const lB = chroma(b).get('hsl.l');

    if (lA < lB) {
      return -1;
    } else if (lA > lB) {
      return 1;
    } else {
      return 0;
    }
  });
};

/** Lightens a color by a given percentage. **/
const lighten = (color: Color, hslPercent: number) =>
  color.set('hsl.l', color.get('hsl.l') + hslPercent);

/** checks if a string is a valid color. **/
export const isValidColor = (color: string | undefined): boolean => {
  if (color === undefined) {
    return false;
  }
  return valid(color);
};

/**
 * Creates a map of color replacements based on the base color and
 * the list of colors.
 *
 * Orders the list of colors from dark to light and replaces the darkest
 * color with the base color. Then uses the hue of the base color and
 * the material palette to find the most appropriate color for the rest
 * in the list.
 */
export const replacementMap = (baseColor: string, colors: Set<string>) => {
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

  // keep track of the latest color to determine if the next color
  // should be lightened or not.
  let latestColor = baseColorChroma;

  for (let i = 1; i < orderedColors.length; i++) {
    const color = chroma(orderedColors[i]);
    let newColor = color.set('hsl.h', baseHue);

    // the idea is to keep the paths with the same relative darkness
    // as the original icon, but with different hues. So if the
    // new color results in a darker color (as we are looping from
    // dark to light), we set the lightness to the latest color and
    // then lighten it a bit so that it's brighter than the latest one.
    if (newColor.luminance() < latestColor.luminance()) {
      newColor = newColor.set('hsl.l', latestColor.get('hsl.l'));
      newColor = lighten(newColor, 0.1);
    }

    const matCol = closerMaterialColorTo(newColor.hex());
    latestColor = chroma(matCol);

    replacement.set(orderedColors[i], matCol);
  }

  return replacement;
};
