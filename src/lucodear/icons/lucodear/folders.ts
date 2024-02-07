import { LucodearFolderIcon } from '../../model';
import { prefix, subpath } from '../utils';

export const folders: LucodearFolderIcon[] = prefix(
  subpath('lucodear', [
    {
      name: 'folder-lucodear',
      folderNames: ['lucodear'],
    },
    {
      name: 'folder-pest',
      folderNames: ['pest'],
      light: true,
    },
  ] as LucodearFolderIcon[])
);
