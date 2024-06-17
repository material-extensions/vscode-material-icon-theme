import { setThemeConfig } from './../helpers';

/** Restore all configurations to default. */
export const restoreDefaultConfig = async () => {
  await setThemeConfig('activeIconPack', undefined, true);
  await setThemeConfig('folders.theme', undefined, true);
  await setThemeConfig('folders.color', undefined, true);
  await setThemeConfig('files.color', undefined, true);
  await setThemeConfig('hidesExplorerArrows', undefined, true);
  await setThemeConfig('opacity', undefined, true);
  await setThemeConfig('saturation', undefined, true);
  await setThemeConfig('files.associations', undefined, true);
  await setThemeConfig('folders.associations', undefined, true);
  await setThemeConfig('languages.associations', undefined, true);
};
