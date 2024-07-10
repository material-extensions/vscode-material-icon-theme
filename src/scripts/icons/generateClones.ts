import { fileIcons, folderIcons, generateManifest } from '../../icons';
import { generateConfiguredClones } from '../../icons/generator/clones/clonesGenerator';

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
