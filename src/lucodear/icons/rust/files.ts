import { LucodearFileIcon } from '../../model';
import { lucodear } from '../utils';

export const files = lucodear('rust', [
  {
    name: 'rust',
    fileExtensions: ['rs'],
  },
  {
    name: 'rust-mod',
    fileNames: ['mod.rs'],
  },
] as LucodearFileIcon[]);
