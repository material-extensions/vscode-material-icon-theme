import type { RequireAtLeastOne } from '../../../types/requiredAtLeastOne';
import type { DefaultIcon } from '../defaultIcon';
import type { IconPack } from '../iconPack';
import type { LightSettingsWithCloneOptions } from '../lightSettings';
import type { Patterns } from '../patterns/patterns';

type BasicFileIcon = DefaultIcon &
  LightSettingsWithCloneOptions & {
    /**
     * Define the file extensions that should use this icon.
     * E.g. `['js']`
     */
    fileExtensions?: string[];

    /**
     * Define if there are some static file names that should apply this icon.
     * E.g. `['sample.js']`
     */
    fileNames?: string[];

    /**
     * Define patterns for file names. Patterns are used to generate common file names and file extensions based on a key.
     */
    patterns?: Patterns;

    /**
     * Define if the icon should be disabled.
     */
    disabled?: boolean;

    /**
     * Defines a pack to which this icon belongs. A pack can be toggled and all icons inside this pack can be enabled or disabled together.
     */
    enabledFor?: IconPack[];
  };

type RequireAtLeastOneFileIcon<T> = T extends BasicFileIcon
  ? RequireAtLeastOne<T, 'fileExtensions' | 'fileNames' | 'patterns'>
  : never;

/**
 * Type for a `FileIcon`. In addition to the `name` property, either a `fileExtensions`, `fileNames`, or `patterns` property is required.
 */
export type FileIcon = RequireAtLeastOneFileIcon<BasicFileIcon>;
