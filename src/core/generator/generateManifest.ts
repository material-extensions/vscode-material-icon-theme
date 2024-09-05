import { merge } from '../helpers/object';
import { fileIcons } from '../icons/fileIcons';
import { folderIcons } from '../icons/folderIcons';
import { languageIcons } from '../icons/languageIcons';
import {
  type Manifest,
  type ManifestConfig,
  createEmptyManifest,
} from '../models/manifest';
import { padWithDefaultConfig } from './config/defaultConfig';
import { loadFileIconDefinitions } from './fileGenerator';
import { loadFolderIconDefinitions } from './folderGenerator';
import { loadLanguageIconDefinitions } from './languageGenerator';

/**
 * Generate the manifest that will be written as JSON file.
 */
export const generateManifest = (config?: ManifestConfig): Manifest => {
  const refinedConfig = padWithDefaultConfig(config);
  const manifest = createEmptyManifest();
  const languageIconDefinitions = loadLanguageIconDefinitions(
    languageIcons,
    refinedConfig,
    manifest
  );
  const fileIconDefinitions = loadFileIconDefinitions(
    fileIcons,
    refinedConfig,
    manifest
  );
  const folderIconDefinitions = loadFolderIconDefinitions(
    folderIcons,
    refinedConfig,
    manifest
  );

  return merge<Manifest>(
    languageIconDefinitions,
    fileIconDefinitions,
    folderIconDefinitions
  );
};
