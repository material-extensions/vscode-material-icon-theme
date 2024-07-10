import type { Config } from 'core/models/icons/configuration';
import { getDefaultConfiguration } from '../generator/config/defaultConfig';

/**
 * Generate a config hashed string that is appended to each icon file name.
 * @param config Icon Configuration object
 */
export const getFileConfigHash = (config: Partial<Config>): string => {
  try {
    const defaults = getDefaultConfiguration();
    let fileConfigString = '';
    if (
      config.saturation !== defaults.saturation ||
      config.opacity !== defaults.opacity ||
      config.folders?.color !== defaults.folders.color ||
      config.files?.color !== defaults.files.color ||
      (config.files?.customClones?.length ?? 0) > 0 ||
      (config.folders?.customClones?.length ?? 0) > 0
    ) {
      fileConfigString += `~${getHash(JSON.stringify(config))}`;
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
