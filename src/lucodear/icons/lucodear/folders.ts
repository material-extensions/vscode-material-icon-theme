import { LucodearFolderIcon } from '../../model';
import { lucodear } from '../utils';

export const folders = lucodear('lucodear', [
  {
    name: 'kurv',
    folderNames: ['kurv'],
    light: true,
  },
  {
    name: 'lucodear',
    folderNames: ['lucodear', 'lucode', 'lucode.ar'],
  },
  {
    name: 'lucode-template',
    folderNames: [
      '.lucode-template',
      '.template',
      '.lc-tmpl',
      '.lctmpl',
      '.lctemplate',
      '.lc-template',
    ],
  },
  {
    name: 'pest',
    folderNames: ['pest'],
    light: true,
  },
] as LucodearFolderIcon[]);
