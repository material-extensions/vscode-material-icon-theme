import { setThemeConfig } from './../helpers';

/** Restore all configurations to default. */
export const restoreDefaultConfig = () => {
  setThemeConfig('activeIconPack', undefined, true);
  setThemeConfig('folders.theme', undefined, true);
  setThemeConfig('folders.color', undefined, true);
  setThemeConfig('hidesExplorerArrows', undefined, true);
  setThemeConfig('opacity', undefined, true);
  setThemeConfig('saturation', undefined, true);
  setThemeConfig('files.associations', undefined, true);
  setThemeConfig('folders.associations', undefined, true);
  setThemeConfig('languages.associations', undefined, true);
};
