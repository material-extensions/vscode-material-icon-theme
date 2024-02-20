import { LucodearFileIcon } from '../../model';
import { lucodear } from '../utils';

export const files = lucodear('rust', [
  {
    name: 'rust',
    fileExtensions: ['rs'],
  },
  {
    name: 'rust-cargo',
    fileNames: ['Cargo.toml', 'cargo.toml'],
    light: true,
  },
  {
    name: 'rust-lib',
    fileNames: ['lib.rs'],
    light: true,
  },
  {
    name: 'rust-mod',
    fileNames: ['mod.rs'],
    light: true,
  },
] as LucodearFileIcon[]);
