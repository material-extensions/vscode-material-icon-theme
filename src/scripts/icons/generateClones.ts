import {
  fileIcons,
  folderIcons,
  generateConfiguredFileIconClones,
  generateConfiguredFolderIconClones,
  generateConfiguredLanguageIconClones,
  generateManifest,
  languageIcons,
} from '../../core';
import { yellow } from '../helpers/painter';

/**
 * This file is meant to be executed exclusively by npm scripts.
 */
try {
  console.log('> Material Icon Theme:', yellow('Generating icon clones...'));
  const manifest = generateManifest();
  generateConfiguredFileIconClones(fileIcons, manifest);
  generateConfiguredFolderIconClones(folderIcons, manifest);
  generateConfiguredLanguageIconClones(languageIcons, manifest);
} catch (error) {
  console.error(error);
  throw Error('Could not generate clones!');
}
