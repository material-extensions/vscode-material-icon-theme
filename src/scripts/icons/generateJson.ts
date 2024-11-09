/**
 * This file is meant to be executed exclusively by npm scripts.
 */

import {
  generateFileIcons,
  generateFolderIcons,
  generateManifest,
  getDefaultConfig,
} from '../../core';

try {
  // Generate default file and folder icons
  const config = getDefaultConfig();
  generateFileIcons(config.files.color, config.opacity, config.saturation);
  generateFolderIcons(config.folders.color, config.opacity, config.saturation);

  const manifest = generateManifest();
  // Print manifest to stdout so that scripts can consume it
  console.log(JSON.stringify(manifest));
} catch (error) {
  console.error(error);
  throw Error('An error while generating the manifest occurred!');
}
