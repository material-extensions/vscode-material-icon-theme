import { extensions, workspace } from 'vscode';
import { type Config, extensionName, extensionPublisher } from '../../core';
import { merge, set } from '../../core/helpers/object';

/** Get configuration of vs code. */
export const getConfig = (section?: string) => {
  return workspace.getConfiguration(section);
};

/** Get list of configuration entries of package.json */
export const getConfigProperties = (): { [config: string]: unknown } => {
  return extensions.getExtension(`${extensionPublisher}.${extensionName}`)
    ?.packageJSON?.contributes?.configuration?.properties;
};

/** Get list of all configration properties */
export const configPropertyNames = Object.keys(getConfigProperties());

/** Update configuration of vs code. */
export const setConfig = (section: string, value: unknown, global = false) => {
  return getConfig().update(section, value, global);
};

/** Get current configuration of the theme from the vscode config */
export const getThemeConfig = <T>(section: string): T | undefined => {
  const themeConfig = getConfig(extensionName).inspect<T>(section);
  return getConfigValue<T | undefined>(themeConfig);
};

/** Set the config of the theme. */
export const setThemeConfig = (
  section: string,
  value: unknown,
  global = false
) => {
  return getConfig(extensionName).update(section, value, global);
};

/**
 * Checks if the theme is the active icon theme
 * @param{boolean} global false by default
 */
export const isThemeActivated = (global = false): boolean => {
  return global
    ? getConfig().inspect('workbench.iconTheme')?.globalValue === extensionName
    : getConfig().inspect('workbench.iconTheme')?.workspaceValue ===
        extensionName;
};

/** Checks if the theme is not the active icon theme */
export const isThemeNotVisible = (): boolean => {
  const config = getConfig().inspect('workbench.iconTheme');
  return (
    (!isThemeActivated(true) && !config?.workspaceValue) || // no workspace and not global
    (!isThemeActivated() && !!config?.workspaceValue)
  );
};

/**
 * Returns the value of a specific configuration by checking the workspace and the user configuration and fallback to the default value.
 *
 * @param themeConfig Theme configuration
 * @returns Actual theme configuration value
 */
const getConfigValue = <T>(
  themeConfig: Partial<
    | {
        globalValue: T;
        workspaceValue: T;
        defaultValue: T;
      }
    | undefined
  >
) => {
  let configValue: T | undefined;
  if (themeConfig === undefined) {
    return undefined;
  }
  if (
    typeof themeConfig.workspaceValue === 'object' &&
    themeConfig.workspaceValue &&
    themeConfig.globalValue
  ) {
    configValue = merge(themeConfig.workspaceValue, themeConfig.globalValue);
  } else {
    configValue =
      themeConfig.workspaceValue ??
      themeConfig.globalValue ??
      themeConfig.defaultValue;
  }
  return configValue;
};

/**
 * Get the current configuration of the theme.
 *
 * @returns Current configuration
 */
export const getCurrentConfig = (): Config => {
  const updatedConfig = configPropertyNames.reduce<Record<string, unknown>>(
    (acc, configNameWithExtensionId) => {
      const configName = configNameWithExtensionId.replace(
        `${extensionName}.`,
        ''
      );
      const configValue = getThemeConfig(configName) ?? null;
      set(acc, configName, configValue);
      return acc;
    },
    {}
  );

  return updatedConfig as Config;
};
