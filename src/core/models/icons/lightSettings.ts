import type { CloneOptions } from './cloneOptions';

/**
 * Settings for light mode, determining the behavior of `clone` and `lightColor` based on `light`.
 */
export type LightSettingsWithCloneOptions =
  | {
      /** Enables light mode; requires `clone` with `lightColor`. */
      light: true;

      /** Clone configuration with a required `lightColor`. */
      clone: CloneOptions & {
        /** Specifies the color for light mode (required). */
        lightColor: string;
      };
    }
  | {
      /** Enables light mode; `clone` is not provided. */
      light: true;

      /** No clone configuration when absent in light mode. */
      clone?: never;
    }
  | {
      /** Disables light mode; prohibits `lightColor` in `clone`. */
      light?: false;

      /** Optional clone configuration for dark mode. */
      clone?: CloneOptions & {
        /** Must not exist when `light` is `false`. */
        lightColor?: never;
      };
    };
