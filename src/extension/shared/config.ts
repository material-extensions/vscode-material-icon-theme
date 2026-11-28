import {
  type ConfigurationScope,
  ConfigurationTarget,
  extensions,
  type WorkspaceFolder,
  window,
  workspace,
} from 'vscode';
import {
  type Config,
  extensionName,
  extensionPublisher,
  type IconPackValue,
  padWithDefaultConfig,
} from '../../core';
import { set } from '../../core/helpers/object';
import type { RecursivePartial } from '../../core/types/recursivePartial';
import { mergeConfigLayers, resolveProjectIconsConfig } from './projectConfig';

/** Get configuration of vs code. */
export const getConfig = (
  section?: string,
  scope?: ConfigurationScope | null
) => {
  return workspace.getConfiguration(section, scope);
};

/** Get list of configuration entries of package.json */
export const getConfigProperties = (): { [config: string]: unknown } => {
  return (
    extensions.getExtension(`${extensionPublisher}.${extensionName}`)
      ?.packageJSON?.contributes?.configuration?.properties ?? {}
  );
};

/** Get list of all configuration properties */
export const configPropertyNames = Object.keys(getConfigProperties());

/** Update configuration of vs code. */
export const setConfig = (
  section: string,
  value: unknown,
  global = false,
  scope?: ConfigurationScope | null
) => {
  return getConfig(undefined, scope).update(section, value, global);
};

/**
 * Resolve the active VS Code configuration scope, workspace folder,
 * and active file path (for monorepo / multi-root workspace resolution).
 */
export const resolveActiveProjectContext = (): {
  scope?: ConfigurationScope;
  workspaceFolder?: WorkspaceFolder;
  activeFilePath?: string;
} => {
  const activeUri = window?.activeTextEditor?.document?.uri;
  if (activeUri && typeof workspace.getWorkspaceFolder === 'function') {
    const folder = workspace.getWorkspaceFolder(activeUri);
    if (folder) {
      return {
        scope: activeUri,
        workspaceFolder: folder,
        activeFilePath:
          activeUri.scheme === 'file' ? activeUri.fsPath : undefined,
      };
    }
  }

  const firstFolder = workspace.workspaceFolders?.[0];
  return {
    scope: firstFolder?.uri,
    workspaceFolder: firstFolder,
    activeFilePath: undefined,
  };
};

/** Get current configuration of the theme from the vscode config */
export const getThemeConfig = <T>(
  section: string,
  scope?: ConfigurationScope | null
): T | undefined => {
  const targetScope = scope ?? resolveActiveProjectContext().scope;
  const themeConfig = getConfig(extensionName, targetScope).inspect<T>(section);
  return getConfigValue<T | undefined>(themeConfig);
};

/**
 * Set the config of the theme.
 * When `global` is true but the setting is overridden at workspace or workspace-folder level,
 * update the most specific active override so commands take effect in the current project.
 */
export const setThemeConfig = (
  section: string,
  value: unknown,
  global = false
) => {
  const { scope } = resolveActiveProjectContext();
  const config = getConfig(extensionName, scope);

  if (global) {
    const inspected = config.inspect(section);
    if (inspected?.workspaceFolderValue !== undefined && scope) {
      return config.update(section, value, ConfigurationTarget.WorkspaceFolder);
    }
    if (inspected?.workspaceValue !== undefined) {
      return config.update(section, value, ConfigurationTarget.Workspace);
    }
  }

  return config.update(section, value, global);
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

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Returns the value of a specific configuration by checking the workspace folder,
 * workspace, and user configuration in descending specificity order,
 * falling back to the default value.
 *
 * @param themeConfig Theme configuration
 * @returns Actual theme configuration value
 */
export const getConfigValue = <T>(
  themeConfig: Partial<
    | {
        globalValue: T;
        workspaceValue: T;
        workspaceFolderValue: T;
        defaultValue: T;
      }
    | undefined
  >
): T | undefined => {
  if (themeConfig === undefined) {
    return undefined;
  }

  const layers = [
    themeConfig.globalValue,
    themeConfig.workspaceValue,
    themeConfig.workspaceFolderValue,
  ];

  const hasObjectLayer = layers.some((layer) => isPlainObject(layer));
  if (hasObjectLayer) {
    let merged: Record<string, unknown> = {};
    for (const layer of layers) {
      if (isPlainObject(layer)) {
        merged = { ...merged, ...layer };
      }
    }
    return merged as T;
  }

  return (
    themeConfig.workspaceFolderValue ??
    themeConfig.workspaceValue ??
    themeConfig.globalValue ??
    themeConfig.defaultValue
  );
};

/**
 * Get the current configuration of the theme, merging VS Code user/workspace
 * settings with project-level `.vscode/icons.json` configuration.
 *
 * @returns Current configuration
 */
export const getCurrentConfig = (scope?: ConfigurationScope | null): Config => {
  const activeContext = resolveActiveProjectContext();
  const targetScope = scope ?? activeContext.scope;
  const propertyNames = Object.keys(getConfigProperties());

  const vsCodeConfig = propertyNames.reduce<Record<string, unknown>>(
    (acc, configNameWithExtensionId) => {
      const configName = configNameWithExtensionId.replace(
        `${extensionName}.`,
        ''
      );
      const configValue = getThemeConfig(configName, targetScope) ?? null;
      set(acc, configName, configValue);
      return acc;
    },
    {}
  ) as RecursivePartial<Config>;

  if ((vsCodeConfig.activeIconPack as string) === 'none') {
    vsCodeConfig.activeIconPack = '' as IconPackValue;
  }

  const workspaceFolderPath =
    activeContext.workspaceFolder?.uri?.scheme === 'file'
      ? activeContext.workspaceFolder.uri.fsPath
      : undefined;

  const projectIconsConfig = resolveProjectIconsConfig(
    workspaceFolderPath,
    activeContext.activeFilePath
  );

  const mergedConfig = mergeConfigLayers(vsCodeConfig, projectIconsConfig);
  return padWithDefaultConfig(mergedConfig);
};
