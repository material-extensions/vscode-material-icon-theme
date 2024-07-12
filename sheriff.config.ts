import { type SheriffConfig } from '@softarc/sheriff-core';

export const sheriffConfig: SheriffConfig = {
  entryFile: 'src/module/index.ts',
  version: 1,
  autoTagging: true,
  tagging: {
    'src/extension': 'extension',
    'src/core': 'core',
    'src/module': 'module',
  },
  depRules: {
    module: ['core'],
    core: ['icons', 'core'],
  },
};
