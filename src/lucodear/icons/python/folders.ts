import { IconPack } from '../../../models';
import { LucodearFolderIcon } from '../../model';
import { lucodear } from '../utils';

const pyprefix = (...x: string[]) => x.flatMap((x) => [x, `_${x}`, `__${x}`]);
const pyfolder = (icon: string, names: string[], light: boolean = false) => ({
  name: `py-${icon}`,
  folderNames: pyprefix(...[icon, ...names]),
  light,
});

export const common = lucodear('python', [
  {
    name: 'py',
    folderNames: ['python', '__pycache__', '.pytest_cache'],
  },
  pyfolder(
    'jupyter',
    ['jupyter-notebook', 'jupyter-notebooks', 'notebook', 'notebooks', 'ipynb'],
    true
  ),
  pyfolder('abc', ['abstract', 'abstracts'], true),
  pyfolder('dataclass', ['dataclasses']),
  pyfolder('dict', ['dicts', 'dictionary', 'dictionaries']),
  pyfolder('protocol', ['protocols', 'interface', 'interfaces'], true),
  pyfolder('typing', ['types', 'type', 'typings']),
] as LucodearFolderIcon[]);

export const pestPack = lucodear('python', IconPack.Pest, [
  {
    name: 'pest-py-fastapi',
    folderNames: ['fastapi', 'fast_api', 'api', 'fast'],
  },
] as LucodearFolderIcon[]);

export const folders: LucodearFolderIcon[] = [...common, ...pestPack];
