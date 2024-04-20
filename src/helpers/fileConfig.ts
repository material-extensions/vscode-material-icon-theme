import { getDefaultIconOptions } from '../icons';
import { IconJsonOptions } from '../models';

/**
 * Generate a config hashed string that is appended to each icon file name.
 * @param config Icon Configuration object
 */
export const getFileConfigHash = (options: IconJsonOptions): string => {
  try {
    const defaults = getDefaultIconOptions();
    let fileConfigString = '';
    if (
      options.saturation !== defaults.saturation ||
      options.opacity !== defaults.opacity ||
      options.folders?.color !== defaults.folders.color ||
      options.files?.color !== defaults.files.color
    ) {
      fileConfigString += `~${getHash(JSON.stringify(options))}`;
    }
    return fileConfigString;
  } catch (error) {
    console.error(error);
    return '';
  }
};

const getHash = (value: string) => {
  let hash = 0;
  let chr = 0;

  if (value.length === 0) return hash;
  for (let i = 0; i < value.length; i++) {
    chr = value.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
