export {
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
export { validateOpacityValue } from './generator/iconOpacity';
export { validateSaturationValue } from './generator/iconSaturation';
export {
  applyConfigurationToIcons,
  generateManifest,
  renameIconFiles,
} from './generator/jsonGenerator';
export { validateHEXColorCode } from './generator/shared/validation';
export { resolvePath } from './helpers/resolvePath';
export { capitalizeFirstLetter, toTitleCase } from './helpers/titlecase';
export { initTranslations, translate } from './i18n/translate';
export { fileIcons } from './icons/fileIcons';
export { folderIcons } from './icons/folderIcons';
export { languageIcons } from './icons/languageIcons';
export type { CloneOptions } from './models/icons/cloneOptions';
export type { Config } from './models/icons/configuration';
export type { DefaultIcon } from './models/icons/defaultIcon';
export type { FileIcon } from './models/icons/files/fileIcon';
export type { FileIcons } from './models/icons/files/fileTypes';
export type { FolderIcon } from './models/icons/folders/folderIcon';
export type { FolderTheme } from './models/icons/folders/folderTheme';
export { IconPack } from './models/icons/iconPack';
export type { LanguageIcon } from './models/icons/languages/languageIdentifier';
export { FileNamePattern } from './models/icons/patterns/patterns';
export { parseByPattern } from './patterns/patterns';
export { customClonesIcons } from './generator/clones/clonesGenerator';
