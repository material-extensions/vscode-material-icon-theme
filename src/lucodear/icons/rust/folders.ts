import { LucodearFolderIcon } from '../../model';
import { lucodear } from '../utils';

export const folders = lucodear('rust', [
  {
    name: 'rust',
    folderNames: ['rust'],
  },
  {
    name: 'cargo',
    folderNames: ['cargo', '.cargo', 'crates', '.crates'],
  },
] as LucodearFolderIcon[]);
