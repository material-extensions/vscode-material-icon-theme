import chroma, { type Color } from 'chroma-js';
import { collectColors } from '../../../../helpers/svg';
import {
  closerMaterialColorTo,
  getMaterialColorByKey,
} from './materialPalette';

/** Get all the colors used in an SVG string as a `Set` list. */
export const getColorList = async (svg: string) => {
  return collectColors(svg);
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
export const isValidColor = (color?: string): boolean => {
  if (color === undefined) {
    return false;
  }
  return chroma.valid(color);
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

    // if it's a simple, 2-color icon, we also retain the saturation
    // from the base color. This helps us better adhere to the
    // same-palette rule in the extension's guidelines; keeping both
    // colors within the same "color column" of the material palette.
    // This mainly affects folder icons, which usually have 2-color
    // designs.
    if (orderedColors.length === 2) {
      newColor = newColor.set('hsl.s', baseColorChroma.get('hsl.s'));
    }

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
