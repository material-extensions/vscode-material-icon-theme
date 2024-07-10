import { generateConfiguredClones, generateManifest } from '@core';
import { fileIcons, folderIcons } from '@icon-definitions';

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
