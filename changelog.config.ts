import { type ChangelogConfig } from 'changelogen';

/**
 * Changelogen configuration
 *
 * @see https://github.com/unjs/changelogen
 * @see https://github.com/unjs/changelogen/blob/3c3adbba396ae2b6aafc2f1eb58a25689bf235d4/src/config.ts
 */
const ChangelogenConfig: Partial<ChangelogConfig> = {
  types: {
    feat: {
      title: '✨ Enhancements',
    },
  },
  output: 'CHANGELOG.md',
};

export default ChangelogenConfig;
