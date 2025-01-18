export { applyConfigToIcons } from './generator/applyConfigToIcons';
export {
  customClonesIcons,
  generateConfiguredFileIconClones,
  generateConfiguredFolderIconClones,
  generateConfiguredLanguageIconClones,
  hasCustomClones,
} from './generator/clones/clonesGenerator';
export { clearCloneFolder } from './generator/clones/utils/cloneData';
export {
  getDefaultConfig,
  padWithDefaultConfig,
} from './generator/config/defaultConfig';
export {
  extensionName,
  extensionPublisher,
  highContrastColorFileEnding,
  lightColorFileEnding,
  logEventKey,
  manifestName,
  openedFolder,
} from './generator/constants';
export { generateFileIcons } from './generator/fileGenerator';
export { generateFolderIcons } from './generator/folderGenerator';
export { generateManifest } from './generator/generateManifest';
export { validateOpacityValue } from './generator/iconOpacity';
export { validateSaturationValue } from './generator/iconSaturation';
export { renameIconFiles } from './generator/renameIconFiles';
export { validateHEXColorCode } from './generator/shared/validation';
export { availableIconPacks } from './helpers/iconPacks';
export { get, merge, set } from './helpers/object';
export { resolvePath } from './helpers/resolvePath';
export { capitalizeFirstLetter, toTitleCase } from './helpers/titlecase';
export { writeToFile } from './helpers/writeFile';
export { initTranslations, translate } from './i18n/translate';
export { fileIcons } from './icons/fileIcons';
export { folderIcons } from './icons/folderIcons';
export { languageIcons } from './icons/languageIcons';
export {
  createLoggingObserver,
  logger,
  type LogEvent,
  type LogLevel,
} from './logging/logger';
export type { CloneOptions } from './models/icons/cloneOptions';
export type { Config, IconAssociations } from './models/icons/config';
export type { DefaultIcon } from './models/icons/defaultIcon';
export type { FileIcon } from './models/icons/files/fileIcon';
export type { FileIcons } from './models/icons/files/fileTypes';
export type { FolderIcon } from './models/icons/folders/folderIcon';
export type {
  FolderTheme,
  FolderThemeName,
} from './models/icons/folders/folderTheme';
export { IconPack, type IconPackValue } from './models/icons/iconPack';
export type { LanguageIcon } from './models/icons/languages/languageIdentifier';
export { FileNamePattern } from './models/icons/patterns/patterns';
export { type Manifest, type ManifestConfig } from './models/manifest';
export { parseByPattern } from './patterns/patterns';
