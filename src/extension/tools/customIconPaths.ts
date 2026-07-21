import { dirname, join, relative } from 'node:path';
import type { Config, IconAssociations } from '../../core';

type WorkspaceFolderLike = {
  name: string;
  path: string;
};

type NormalizeCustomIconPathOptions = {
  extensionPath: string;
  workspaceFolders: readonly WorkspaceFolderLike[];
};

const workspaceFolderPattern = /^\$\{workspaceFolder(?::([^}]+))?\}(.*)$/;

const toPosixPath = (path: string): string => {
  return path.replace(/\\/g, '/');
};

const resolveWorkspaceFolderPath = (
  pathValue: string,
  workspaceFolders: readonly WorkspaceFolderLike[]
): string | undefined => {
  const match = pathValue.match(workspaceFolderPattern);
  if (!match) {
    return undefined;
  }

  const [, workspaceFolderName, suffix = ''] = match;
  const workspaceFolder = workspaceFolderName
    ? workspaceFolders.find((folder) => folder.name === workspaceFolderName)
    : workspaceFolders.length === 1
      ? workspaceFolders[0]
      : undefined;

  if (!workspaceFolder) {
    return undefined;
  }

  return join(workspaceFolder.path, suffix);
};

const toThemeCustomIconPath = (
  targetPath: string,
  extensionPath: string
): string => {
  const relativeFromExtensionsDir = toPosixPath(
    relative(dirname(extensionPath), targetPath)
  );

  return relativeFromExtensionsDir
    ? `../../${relativeFromExtensionsDir}`
    : '../../';
};

export const normalizeCustomIconAssociations = (
  associations: IconAssociations = {},
  options: NormalizeCustomIconPathOptions
): IconAssociations => {
  return Object.fromEntries(
    Object.entries(associations).map(([pattern, iconName]) => {
      const workspaceTargetPath = resolveWorkspaceFolderPath(
        iconName,
        options.workspaceFolders
      );

      return [
        pattern,
        workspaceTargetPath
          ? toThemeCustomIconPath(workspaceTargetPath, options.extensionPath)
          : iconName,
      ];
    })
  );
};

export const normalizeCustomIconConfigPaths = (
  config: Config,
  options: NormalizeCustomIconPathOptions
): Config => {
  return {
    ...config,
    files: {
      ...config.files,
      associations: normalizeCustomIconAssociations(
        config.files.associations,
        options
      ),
    },
  };
};
