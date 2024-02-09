import { IconPack } from '../../../models';
import { LucodearFileIcon } from '../../model';
import { lucodear } from '../utils';

const prefixpy = (...x: string[]) => x.flatMap((x) => [x, `_${x}`, `__${x}`]);

const pyfile = (
  name: string,
  others: string[] = [],
  light: boolean = false,
  prefix: string = ''
): LucodearFileIcon[] => [
  {
    name: `${prefix}py-${name}`,
    fileNames: prefixpy(...[`${name}.py`, ...others.map((x) => `${x}.py`)]),
    fileExtensions: [`${name}/py`, ...others.map((x) => `${x}/py`)],
    light,
  },
  {
    name: `${prefix}py-${name}-init`,
    fileNames: [
      `${name}/__init__.py`,
      ...others.map((x) => `${x}/__init__.py`),
    ],
    light,
  },
];

// #region python
const common = lucodear('python', [
  {
    name: 'py',
    fileExtensions: ['py'],
  },
  {
    name: 'py-init',
    fileNames: ['__init__.py'],
  },
  {
    name: 'pytest',
    fileNames: ['conftest.py'],
  },
  {
    name: 'ruff',
    fileNames: ['ruff.toml', '.ruff.toml'],
    light: true,
  },
] as LucodearFileIcon[]);
// #endregion

// #region python file variants
const pythonFiles: LucodearFileIcon[] = lucodear('python', [
  ...pyfile('abc', ['abstract', 'abstracts'], false),
  ...pyfile('dataclass', ['dataclasses'], false),
  ...pyfile('dict', ['dicts', 'dictionary', 'dictionaries'], false),
  {
    name: 'py-main',
    fileNames: prefixpy('main.py', 'app.py', 'run.py', 'application.py'),
  },
  ...pyfile('protocol', ['protocols', 'interface', 'interfaces'], false),
  ...pyfile('script', ['scripts'], false),
  ...pyfile('test', ['tests', 'spec', 'specs'], false),
  ...pyfile('tool', ['tools'], false),
  ...pyfile('typing', ['types', 'type', 'typings'], false),
  ...pyfile('utils', ['util', 'utility', 'utilities'], false),
]);
// #endregion

// #region pest pack 🐀
const pestPack = lucodear('python', IconPack.Pest, [
  ...pyfile('aggregate', ['aggregates', 'aggs', 'agg'], false, 'pest-'),
  ...pyfile('controller', ['controllers', 'ctrl'], false, 'pest-'),
  ...pyfile('dto', ['dtos'], true, 'pest-'),
  ...pyfile('middleware', ['middlewares', 'mdw'], false, 'pest-'),
  ...pyfile('model', ['models', 'entities', 'entity'], false, 'pest-'),
  ...pyfile('module', ['modules', 'mod', 'domain', 'domains'], false, 'pest-'),
  ...pyfile(
    'provider',
    ['providers', 'infra', 'infrastructure', 'infrastructures'],
    false,
    'pest-'
  ),
  ...pyfile('service', ['services', 'srv', 'svc'], false, 'pest-'),
] as LucodearFileIcon[]);
// #endregion

// #region exports
export const files: LucodearFileIcon[] = [
  ...common,
  ...pythonFiles,
  ...pestPack,
];
// #endregion
