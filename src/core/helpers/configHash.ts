import { getDefaultConfig } from '../generator/config/defaultConfig';
import { logger } from '../logging/logger';
import type { Config } from '../models/icons/config';

/**
 * Generate a config hashed string that is appended to each icon file name.
 * @param config Icon Configuration object
 */
export const getFileConfigHash = (config: Partial<Config>): string => {
  try {
    const defaults = getDefaultConfig();
    let fileConfigString = '';
    if (
      config.saturation !== defaults.saturation ||
      config.opacity !== defaults.opacity ||
      config.folders?.color !== defaults.folders.color ||
      config.files?.color !== defaults.files.color ||
      (config.files?.customClones?.length ?? 0) > 0 ||
      (config.folders?.customClones?.length ?? 0) > 0
    ) {
      // Any changes that are hashed will trigger a refresh of the icon in the VS Code UI
      fileConfigString += `~${getHash(
        JSON.stringify({
          saturation: config.saturation,
          opacity: config.opacity,
          foldersColor: config.folders?.color,
          filesColor: config.files?.color,
          fileClones: config.files?.customClones,
          folderClones: config.folders?.customClones,
        })
      )}`;
    }
    return fileConfigString;
  } catch (error) {
    logger.error(error);
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
