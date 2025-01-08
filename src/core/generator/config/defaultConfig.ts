import { merge } from '../../helpers/object';
import type { Config } from '../../models/icons/config';
import type { RecursivePartial } from '../../types/recursivePartial';

/**
 * The options control the generator and decide which icons are disabled or not.
 */
export const getDefaultConfig = (): Required<Config> => ({
  folders: {
    theme: 'specific',
    color: '#90a4ae',
    associations: {},
    customClones: [],
  },
  activeIconPack: 'angular',
  hidesExplorerArrows: false,
  opacity: 1,
  saturation: 1,
  files: {
    color: '#90a4ae',
    associations: {},
    customClones: [],
  },
  languages: { associations: {}, customClones: [] },
  enableLogging: false,
  logLevel: 'info',
});

/**
 * Fill in missing configuration values with the default values.
 *
 * @param config Configuration object
 * @returns New configuration object with default values
 */
export const padWithDefaultConfig = (
  config?: RecursivePartial<Config>
): Config => {
  const withDefaultConfig = merge(getDefaultConfig(), config ?? {}) as Config;

  return withDefaultConfig;
};
