import { describe, expect, it } from 'bun:test';
import { getDefaultConfig } from '../../core';
import {
  normalizeCustomIconAssociations,
  normalizeCustomIconConfigPaths,
} from './customIconPaths';

describe('custom icon paths', () => {
  const extensionPath =
    '/home/test/.vscode/extensions/pkief.material-icon-theme-1.0.0';

  it('should normalize workspace file icon paths', () => {
    const associations = normalizeCustomIconAssociations(
      {
        '*.sample': '${workspaceFolder}/icons/sample',
      },
      {
        extensionPath,
        workspaceFolders: [{ name: 'app', path: '/home/test/workspace' }],
      }
    );

    expect(associations['*.sample']).toBe('../../../../workspace/icons/sample');
  });

  it('should normalize named workspace folder paths', () => {
    const associations = normalizeCustomIconAssociations(
      {
        '*.sample': '${workspaceFolder:docs}/icons/sample',
      },
      {
        extensionPath,
        workspaceFolders: [
          { name: 'app', path: '/home/test/workspace-app' },
          { name: 'docs', path: '/home/test/workspace-docs' },
        ],
      }
    );

    expect(associations['*.sample']).toBe(
      '../../../../workspace-docs/icons/sample'
    );
  });

  it('should leave ambiguous workspaceFolder paths unchanged', () => {
    const associations = normalizeCustomIconAssociations(
      {
        '*.sample': '${workspaceFolder}/icons/sample',
      },
      {
        extensionPath,
        workspaceFolders: [
          { name: 'app', path: '/home/test/workspace-app' },
          { name: 'docs', path: '/home/test/workspace-docs' },
        ],
      }
    );

    expect(associations['*.sample']).toBe('${workspaceFolder}/icons/sample');
  });

  it('should normalize file config associations', () => {
    const config = getDefaultConfig();
    config.files.associations = {
      '*.sample': '${workspaceFolder}/icons/sample',
    };

    const normalizedConfig = normalizeCustomIconConfigPaths(config, {
      extensionPath,
      workspaceFolders: [{ name: 'app', path: '/home/test/workspace' }],
    });

    expect(normalizedConfig.files.associations['*.sample']).toBe(
      '../../../../workspace/icons/sample'
    );
    expect(normalizedConfig.folders.associations).toStrictEqual(
      config.folders.associations
    );
    expect(normalizedConfig.rootFolders.associations).toStrictEqual(
      config.rootFolders.associations
    );
  });
});
