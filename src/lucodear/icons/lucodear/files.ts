import { LucodearFileIcon } from '../../model';
import { lucodear } from '../utils';

const nameAndExtension = (...files: string[]) => ({
  fileExtensions: files,
  fileNames: files,
});

export const files = lucodear('lucodear', [
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
  {
    name: 'lucode',
    fileNames: [
      'lucode.toml',
      'lucoderc.toml',
      'lc.toml',
      'lucodear.toml',
      'lucodearrc.toml',
    ],
    fileExtensions: ['lucode', 'lucoderc', 'lc', 'lucodear', 'lucodearrc'],
  },
  {
    name: 'lucode-json',
    ...nameAndExtension(
      'lucode.json',
      'lucode.jsonc',
      'lucoderc.json',
      'lucoderc.jsonc',
      'lc.json',
      'lc.jsonc',
      'lucodear.json',
      'lucodear.jsonc'
    ),
    light: true,
  },
  {
    name: 'lucode-yaml',
    ...nameAndExtension(
      'lucode.yml',
      'lucode.yaml',
      'lucoderc.yml',
      'lucoderc.yaml',
      'lc.yml',
      'lc.yaml',
      'lucodear.yml',
      'lucodear.yaml'
    ),
  },
] as LucodearFileIcon[]);
