/** Capitalize the first letter of a string */
export const capitalizeFirstLetter = (name: string): string =>
  name.charAt(0).toUpperCase() + name.slice(1);

/** Convert a string to Title Case (first letter of each word uppercase) */
export const toTitleCase = (value: string): string =>
  value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
