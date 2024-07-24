import type { Config } from '../models/icons/config';
import { getDefaultConfig } from './config/defaultConfig';
import { generateFileIcons } from './fileGenerator';
import { generateFolderIcons } from './folderGenerator';
import { setIconOpacity } from './iconOpacity';
import { setIconSaturation } from './iconSaturation';

/**
 * Apply the configuration to the icons. But only if the configuration has changed.
 * If the affectedConfig is not set then all icons will be updated.
 *
 * @param config Configuration that customizes the icons and the manifest.
 * @param affectedConfig Set of configuration keys that have changed so that not all functions need to be executed.
 */
export const applyConfigToIcons = async (
  config: Config,
  affectedConfig?: Set<string>,
  oldConfig?: Config
) => {
  if (
    (affectedConfig?.has('files.color') &&
      config?.files.color !== oldConfig?.files.color) ||
    (!affectedConfig && config.files.color !== getDefaultConfig().files.color)
  ) {
    await generateFileIcons(
      config.files.color,
      config.opacity,
      config.saturation
    );
  }
  if (
    (affectedConfig?.has('folders.color') &&
      config.folders.color !== oldConfig?.files.color) ||
    (!affectedConfig &&
      config.folders.color !== getDefaultConfig().folders.color)
  ) {
    await generateFolderIcons(
      config.folders.color,
      config.opacity,
      config.saturation
    );
  }

  if (
    (affectedConfig?.has('opacity') && config.opacity !== oldConfig?.opacity) ||
    (!affectedConfig && config.opacity !== getDefaultConfig().opacity)
  ) {
    await setIconOpacity(config.opacity, config.files.associations);
  }
  if (
    (affectedConfig?.has('saturation') &&
      config.saturation !== oldConfig?.saturation) ||
    (!affectedConfig && config.saturation !== getDefaultConfig().saturation)
  ) {
    await setIconSaturation(config.saturation, config.files.associations);
  }
};
