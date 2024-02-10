import { IconPack } from '../../../models';
import { LucodearFolderIcon } from '../../model';
import { lucodear } from '../utils';

export const common = lucodear('python', [
  {
    name: 'py',
    folderNames: ['python', '__pycache__', '.pytest_cache'],
  },
  {
    name: 'py-jupyter',
    folderNames: [
      'jupyter',
      'jupyter-notebook',
      'jupyter-notebooks',
      'notebook',
      'notebooks',
      'ipynb',
    ],
  },
  {
    name: 'py-abc',
    folderNames: ['abc', 'abstract', 'abstracts'],
  },
  {
    name: 'py-dataclass',
    folderNames: ['dataclass', 'dataclasses'],
  },
  {
    name: 'py-dict',
    folderNames: ['dict', 'dicts', 'dictionary', 'dictionaries'],
  },
  {
    name: 'py-protocol',
    folderNames: ['protocol', 'protocols', 'interface', 'interfaces'],
  },
  {
    name: 'py-typing',
    folderNames: ['types', 'typing', 'type', 'typings'],
  },
] as LucodearFolderIcon[]);

export const pestPack = lucodear('python', IconPack.Pest, [
  {
    name: 'pest-py-fastapi',
    folderNames: ['fastapi', 'fast_api', 'api', 'fast'],
  },
] as LucodearFolderIcon[]);

export const folders: LucodearFolderIcon[] = [...common, ...pestPack];
