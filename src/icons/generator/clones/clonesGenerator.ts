import { IconConfiguration, IconJsonOptions } from '../../../models';
import { clearCloneFolder } from './utils/paths';
import merge from 'lodash.merge';
import { getFileConfigHash } from '../../../helpers/fileConfig';
import { cloneFolderIcon } from './folderClone';
import { cloneFileIcon } from './fileClone';

/**
 * This function applies custom colors to the svg icon, respecting
 * the different tones of the original icon based on a provided
 * "base" color.
 */
export function customClonesIcons(
  config: IconConfiguration,
  options: IconJsonOptions
): IconConfiguration {
  clearCloneFolder(hasCustomClones(options));

  let clonedIconsConfig: IconConfiguration = new IconConfiguration();
  const hash = getFileConfigHash(options);

  options.folders?.customClones?.forEach((clone) => {
    const cloneIcon = cloneFolderIcon(clone, config, hash);
    clonedIconsConfig = merge(clonedIconsConfig, cloneIcon);
  });

  options.files?.customClones?.forEach((clone) => {
    const cloneIcon = cloneFileIcon(clone, config, hash);
    clonedIconsConfig = merge(clonedIconsConfig, cloneIcon);
  });

  return clonedIconsConfig;
}

export function hasCustomClones(options: IconJsonOptions): boolean {
  return (
    (options.folders?.customClones?.length ?? 0) > 0 ||
    (options.files?.customClones?.length ?? 0) > 0
  );
}
