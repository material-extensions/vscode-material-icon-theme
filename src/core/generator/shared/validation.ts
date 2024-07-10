/**
 * Validate the HEX color code
 * @param color HEX code
 */
export const validateHEXColorCode = (color: string = '') => {
  const hexPattern = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
  return color.length > 0 && hexPattern.test(color);
};
