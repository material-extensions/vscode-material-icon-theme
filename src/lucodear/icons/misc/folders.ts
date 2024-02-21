import { LucodearFolderIcon } from '../../model';
import { lucodear } from '../utils';

export const folders = lucodear('misc', [
  {
    name: 'aggregate',
    folderNames: ['aggregate', 'aggregates', 'aggs', 'agg'],
  },
  {
    name: 'azure',
    folderNames: ['azure', 'az'],
  },
  {
    name: 'controller',
    folderNames: ['controller', 'controllers', 'ctrl'],
  },
  {
    name: 'subcommand',
    folderNames: [
      'subcommand',
      'subcommands',
      'subcmd',
      'subcmds',
      'sub-cmd',
      'sub-cmds',
    ],
    light: true,
  },
  {
    name: 'decorator',
    folderNames: ['decorator', 'decorators'],
  },
  {
    name: 'di',
    folderNames: [
      'di',
      'ioc',
      'injection',
      'injector',
      'injections',
      'container',
    ],
  },
  {
    name: 'dto',
    folderNames: ['dto', 'dtos'],
  },
  {
    name: 'exceptions',
    folderNames: [
      'exceptions',
      'exception',
      'errors',
      'error',
      'faults',
      'fault',
      'failures',
      'failure',
    ],
  },
  {
    name: 'factory',
    folderNames: ['factory', 'factories'],
  },
  {
    name: 'idea',
    folderNames: ['idea', 'ideas', '.idea', '.ideas', '💡'],
  },
  {
    name: 'metadata',
    folderNames: ['metadata', 'meta', 'data', 'tags', 'tag'],
  },
  {
    name: 'middleware',
    folderNames: ['middleware', 'middlewares', 'mdw'],
  },
  {
    name: 'model',
    folderNames: ['model', 'models', 'entities', 'entity'],
  },
  {
    name: 'module',
    folderNames: ['module', 'modules', 'mod', 'domain', 'domains'],
  },
  {
    name: 'oracle',
    folderNames: ['oracle', 'osb', 'soa'],
  },
  {
    name: 'provider',
    folderNames: [
      'provider',
      'providers',
      'infra',
      'infrastructure',
      'infrastructures',
    ],
  },
  {
    name: 'result',
    folderNames: ['result', 'results', 'res'],
  },
  {
    name: 'runtime',
    folderNames: ['runtime', 'runtimes', 'rt', 'realtime', 'real-time'],
  },
  {
    name: 'service',
    folderNames: ['service', 'services', 'srv', 'svc'],
  },
  {
    name: 'tasks',
    folderNames: ['tasks', 'task', 'todo', 'todos'],
  },
  {
    name: 'transformation',
    folderNames: [
      'transformations',
      'transformation',
      'transformer',
      'transformers',
      'trx',
      'convert',
      'conversion',
    ],
  },
  {
    name: 'workflow',
    folderNames: ['workflow', 'workflows', 'flow', 'flows'],
  },
] as LucodearFolderIcon[]);
