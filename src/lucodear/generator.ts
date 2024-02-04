import { IconConfiguration, IconJsonOptions } from '../models';
import merge from 'lodash.merge';
/**
 * Get addons icon definitions as object.
 */
export const loadLucodearAddonIconDefinitions = (
  config: IconConfiguration,
  _options: IconJsonOptions
): IconConfiguration => {
  config = merge({}, config);
  // TODO :)

  return config;
};
