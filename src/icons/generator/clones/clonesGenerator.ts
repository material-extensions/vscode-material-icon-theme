import { IconConfiguration, IconJsonOptions } from '../../../models';
import { clearCloneFolder } from './utils/paths';
import merge from 'lodash.merge';
import { getFileConfigHash } from '../../../helpers/fileConfig';
import { cloneFolderIcon } from './folderClone';
import { cloneFileIcon } from './fileClone';

/**
 * Creates custom icons by cloning already existing icons and changing
 * their colors, allowing users create their own variations.
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
