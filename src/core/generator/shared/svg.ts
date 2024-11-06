import { join } from 'node:path';
import { resolvePath } from '../../helpers/resolvePath';
import { writeToFile } from '../../helpers/writeFile';
import { logger } from '../../logging/logger';
import { iconFolderPath } from '../constants';
import { updateSVGOpacity } from '../iconOpacity';
import { adjustSVGSaturation } from '../iconSaturation';

export const writeSVGFiles = async (
  iconName: string,
  svg: string,
  opacity: number,
  saturation: number
) => {
  // Update the opacity and saturation of the SVG
  const updatedOpacity = updateSVGOpacity(svg, opacity);
  const updatedSaturation = adjustSVGSaturation(updatedOpacity, saturation);

  const iconsPath = resolvePath(iconFolderPath);
  const iconsFolderPath = join(iconsPath, `${iconName}.svg`);
  try {
    await writeToFile(iconsFolderPath, updatedSaturation);
  } catch (error) {
    logger.error(error);
  }
};

export const getPath = (d: string, color: string) =>
  `<path d="${d}" fill="${color}" />`;

export const getSVG = (path: string, viewBoxSize = 32) =>
  `<svg viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" xmlns="http://www.w3.org/2000/svg">${path}</svg>`;
