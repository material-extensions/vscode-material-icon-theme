/** Capitalize the first letter of a string */
export const capitalizeFirstLetter = (name: string): string =>
  name.charAt(0).toUpperCase() + name.slice(1);

/** TitleCase all words in a string */
export const toTitleCase = (value: string) => {
  return value.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};
