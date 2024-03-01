import { IconPack } from '../../../models';
import { LucodearFileIcon } from '../../model';
import { lucodear } from '../utils';

const rustDefault = lucodear('rust', [
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
    name: 'rust-main',
    fileNames: ['main.rs'],
    light: true,
  },
  {
    name: 'rust-mod',
    fileNames: ['mod.rs'],
    light: true,
  },
] as LucodearFileIcon[]);

/** Uses Ferris the crab just for main and lib (`main.rs` and `lib.rs`) files. */
const rustFerrisMinimal = lucodear('rust', IconPack.RustFerrisMinimal, [
  {
    name: 'rust-ferris',
    fileNames: ['main.rs'],
  },
  {
    name: 'rust-ferris-lib',
    fileNames: ['lib.rs'],
    light: true,
  },
] as LucodearFileIcon[]);

/** Uses Ferris the crab for special rust files (main.rs, lib.rs, mod.rs) */
const rustFerris = lucodear('rust', IconPack.RustFerris, [
  {
    name: 'rust-ferris',
    fileNames: ['main.rs'],
  },
  {
    name: 'rust-ferris-lib',
    fileNames: ['lib.rs'],
    light: true,
  },
  {
    name: 'rust-ferris-mod',
    fileNames: ['mod.rs'],
    light: true,
  },
] as LucodearFileIcon[]);

/** Uses Ferris the crab for all rust files */
const rustFerrisFull = lucodear('rust', IconPack.RustFerrisFull, [
  {
    name: 'rust-ferris',
    fileExtensions: ['rs'],
  },
  {
    name: 'rust-ferris-main',
    fileNames: ['main.rs'],
    light: true,
  },
  {
    name: 'rust-ferris-lib',
    fileNames: ['lib.rs'],
    light: true,
  },
  {
    name: 'rust-ferris-mod',
    fileNames: ['mod.rs'],
    light: true,
  },
] as LucodearFileIcon[]);

export const files: LucodearFileIcon[] = [
  ...rustDefault,
  ...rustFerrisMinimal,
  ...rustFerris,
  ...rustFerrisFull,
];
