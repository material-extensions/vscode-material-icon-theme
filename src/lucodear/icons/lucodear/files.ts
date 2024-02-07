import { LucodearFileIcon } from '../../model';
import { subpath } from '../utils';

export const files: LucodearFileIcon[] = subpath('lucodear', [
  {
    name: 'coco',
    fileExtensions: ['cocorc'],
    fileNames: ['coco.yml', 'coco.yaml'],
  },
  {
    name: 'kurv',
    fileExtensions: ['kurv', 'egg', 'eggs'],
  },
  {
    name: 'kurv-config',
    fileExtensions: ['kurvrc', 'kurvconf', 'kurvconfig'],
    fileNames: [
      'kurv.config.yml',
      'kurvrc.yml',
      'kurvconf.yml',
      'kurv.config.yaml',
      'kurvrc.yaml',
      'kurvconf.yaml',
    ],
  },
] as LucodearFileIcon[]);
