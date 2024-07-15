export {
  customClonesIcons,
  generateConfiguredClones,
  hasCustomClones,
} from './generator/clones/clonesGenerator';
export { clearCloneFolder } from './generator/clones/utils/cloneData';
export { getDefaultConfiguration } from './generator/config/defaultConfig';
export {
  extensionName,
  highContrastColorFileEnding,
  lightColorFileEnding,
  manifestName,
  openedFolder,
} from './generator/constants';
export { generateFileIcons } from './generator/fileGenerator';
export { generateFolderIcons } from './generator/folderGenerator';
export { validateOpacityValue } from './generator/iconOpacity';
export { validateSaturationValue } from './generator/iconSaturation';
export {
  applyConfigurationToIcons,
  generateManifest,
  renameIconFiles,
  type ManifestConfig,
} from './generator/jsonGenerator';
export { validateHEXColorCode } from './generator/shared/validation';
export { availableIconPacks } from './helpers/iconPacks';
export { resolvePath } from './helpers/resolvePath';
export { capitalizeFirstLetter, toTitleCase } from './helpers/titlecase';
export { initTranslations, translate } from './i18n/translate';
export { fileIcons } from './icons/fileIcons';
export { folderIcons } from './icons/folderIcons';
export { languageIcons } from './icons/languageIcons';
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
export { Manifest } from './models/manifest';
export { parseByPattern } from './patterns/patterns';
