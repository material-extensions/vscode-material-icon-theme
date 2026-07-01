import type { RequireAtLeastOne } from '../../../types/requiredAtLeastOne';
import type { DefaultIcon } from '../defaultIcon';
import type { IconPack } from '../iconPack';
import type { LightSettingsWithCloneOptions } from '../lightSettings';

type BasicFolderIcon = DefaultIcon &
  LightSettingsWithCloneOptions & {
    /**
     * Define the folder names that should apply the icon.
     * E.g. `['src', 'source']`
     *
     * Names are automatically extended with dot, underscore, dash, and
     * dunder variants (e.g. `'src'` also matches `.src`, `_src`, `-src`, `__src__`).
     */
    folderNames: string[];

    /**
     * Define the workspace (root) folder names that should apply the icon.
     * E.g. `['database']`
     *
     * Names are automatically extended with dot, underscore, dash, and
     * dunder variants (e.g. `'database'` also matches `.database`, `_database`, `-database`, `__database__`).
     */
    rootFolderNames?: string[];

    /**
     * Define if the icon should be disabled.
     */
    disabled?: boolean;

    /**
     * Defines a pack to which this icon belongs. A pack can be toggled and all icons inside this pack can be enabled or disabled together.
     */
    enabledFor?: IconPack[];
  };

type RequireAtLeastOneFolderIcon<T> = T extends BasicFolderIcon
  ? RequireAtLeastOne<T, 'folderNames' | 'rootFolderNames'>
  : never;

/**
 * Type for a `FileIcon`. In addition to the `name` property, either a `fileExtensions`, `fileNames`, or `patterns` property is required.
 */
export type FolderIcon = RequireAtLeastOneFolderIcon<BasicFolderIcon>;
