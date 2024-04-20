import { readFileSync } from 'fs';
import { join } from 'path';
import { extensions, workspace } from 'vscode';
import { iconJsonName } from '../icons/index';
import { IconConfiguration } from '../models/index';

/** Get configuration of vs code. */
export const getConfig = (section?: string) => {
  return workspace.getConfiguration(section);
};

/** Get list of configuration entries of package.json */
export const getConfigProperties = (): { [config: string]: unknown } => {
  return extensions.getExtension('PKief.material-icon-theme')?.packageJSON
    ?.contributes?.configuration?.properties;
};

/** Update configuration of vs code. */
export const setConfig = (
  section: string,
  value: any,
  global: boolean = false
) => {
  return getConfig().update(section, value, global);
};

export const getThemeConfig = (section: string) => {
  return getConfig('material-icon-theme').inspect(section);
};

/** Set the config of the theme. */
export const setThemeConfig = (
  section: string,
  value: any,
  global: boolean = false
) => {
  return getConfig('material-icon-theme').update(section, value, global);
};

/**
 * Checks if the theme is the active icon theme
 * @param{boolean} global false by default
 */
export const isThemeActivated = (global: boolean = false): boolean => {
  return global
    ? getConfig().inspect('workbench.iconTheme')?.globalValue ===
        'material-icon-theme'
    : getConfig().inspect('workbench.iconTheme')?.workspaceValue ===
        'material-icon-theme';
};

/** Checks if the theme is not the active icon theme */
export const isThemeNotVisible = (): boolean => {
  const config = getConfig().inspect('workbench.iconTheme');
  return (
    (!isThemeActivated(true) && !config?.workspaceValue) || // no workspace and not global
    (!isThemeActivated() && !!config?.workspaceValue)
  );
};

/** Return the path of the extension in the file system. */
const getExtensionPath = () =>
  extensions.getExtension('PKief.material-icon-theme')?.extensionPath ?? '';

/** Get the configuration of the icons as JSON Object */
export const getMaterialIconsJSON = (): IconConfiguration => {
  const iconJSONPath = join(getExtensionPath(), 'dist', iconJsonName);

  try {
    const data = readFileSync(iconJSONPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return {};
  }
};

/** Capitalize the first letter of a string */
export const capitalizeFirstLetter = (name: string): string =>
  name.charAt(0).toUpperCase() + name.slice(1);

/** TitleCase all words in a string */
export const toTitleCase = (value: string) => {
  return value.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
  );
};
