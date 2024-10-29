import {
  fileIcons,
  folderIcons,
  generateConfiguredClones,
  generateManifest,
} from '../../core';

/**
 * This file is meant to be executed exclusively by npm scripts.
 */
try {
  console.log('Generating icon clones...');
  const manifest = generateManifest();
  generateConfiguredClones(folderIcons, manifest);
  generateConfiguredClones(fileIcons, manifest);
} catch (error) {
  console.error(error);
  throw Error('Could not generate clones!');
}
